/**
 * @fileoverview Gestiona el inicio de sesión OAuth con PKCE y la redirección por rol.
 * @author Cassandra Vanessa Padilla Barovier (A01753547, ITC)
 * @author Giancarlo Moreno Vázquez (A01803172, ITC)
 * @author Alexander Mejia Tovar (A01803181, ITC)
 * @author César Ariel Rodríguez Sandoval (A01802924, ITC)
 * @author Santiago Abraham Rios Palacios (A01802727, ITC)
 */
import { COGNITO_CONFIG } from "./config.mjs";

const COGNITO_DOMAIN = COGNITO_CONFIG.domain;
const CLIENT_ID = COGNITO_CONFIG.clientId;
const REDIRECT_URI = COGNITO_CONFIG.redirectUri;
const API_URL = "https://nyazu3k2shty7f2hmhqnrae3fq0cvdjz.lambda-url.us-east-1.on.aws";



console.log ("Configuración de Cognito funcionando")

/**
 * Codifica bytes en Base64 URL-safe para usarlos en parámetros OAuth.
 * @param {Uint8Array} bytes Bytes que se convertirán.
 * @returns {string} Cadena Base64 sin relleno y apta para URL.
 */
function base64url (bytes){
    return btoa (String.fromCharCode(...bytes))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

/**
 * Genera un valor aleatorio criptográficamente seguro para PKCE y el parámetro state.
 * @returns {string} Cadena aleatoria codificada en Base64 URL-safe.
 */
function generarCodigoAleatorio (){
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return base64url(bytes);
}

/**
 * Calcula el challenge SHA-256 requerido por el flujo PKCE.
 * @param {string} verificador Código secreto temporal generado para la sesión.
 * @returns {Promise<string>} Challenge codificado en Base64 URL-safe.
 */
async function generarChallenge (verificador) {
    const datos = new TextEncoder().encode(verificador);
    const hash = await crypto.subtle.digest("SHA-256", datos);
    return base64url (new Uint8Array(hash))
    
}

/**
 * Guarda el verificador y state, y redirige al proveedor para autorizar el inicio de sesión.
 * @returns {Promise<void>}
 */
async function iniciarSesion() {
    const verificador = generarCodigoAleatorio();
    const challenge = await generarChallenge(verificador);
    const state = generarCodigoAleatorio();

    sessionStorage.setItem("pkce_verifier", verificador);
    sessionStorage.setItem("oauth_state", state);


    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: "code",
        scope: "openid email",
        redirect_uri: REDIRECT_URI,
        code_challenge_method: "S256",
        code_challenge: challenge,
        state: state
    });

    window.location.href =
        `${COGNITO_DOMAIN}/oauth2/authorize?${params.toString()}`;
}

document.addEventListener("DOMContentLoaded", async () => {
    const parametros = new URLSearchParams(window.location.search);

    if (parametros.has("code")) {
        await procesarCallback();
    } else if (parametros.has("error")) {
        console.error("Error de Cognito:", parametros.get("error"));
    } else {
        await iniciarSesion();
    }
});

/**
 * Valida el callback OAuth, intercambia el código, consulta el rol y redirige al panel.
 * @returns {Promise<void>}
 */
async function procesarCallback () {
    const parametros = new URLSearchParams(window.location.search);

    const codigo = parametros.get("code");
    const stateRecibido = parametros.get("state");

    if (!codigo) return;

    const stateGuardado = sessionStorage.getItem("oauth_state");
    const verificador = sessionStorage.getItem("pkce_verifier");

    if (!stateGuardado || !verificador || stateRecibido!==stateGuardado){
        alert ("La sesion no es valida, porfavor vuelva a inciar sesión");
        return;
    }

    try {
        const respuesta = await fetch ( `${COGNITO_DOMAIN}/oauth2/token`, 
            {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: CLIENT_ID,
                    code: codigo,
                    redirect_uri: REDIRECT_URI,
                    code_verifier: verificador
        })
    }
);

if (!respuesta.ok){
    throw new Error (
        `Error: ${respuesta.status}`
    );
}

const tokens = await respuesta.json();
sessionStorage.setItem ("access_token", tokens.access_token);

        sessionStorage.removeItem("oauth_state");
        sessionStorage.removeItem("pkce_verifier");

        window.history.replaceState(
            {},
            "",
            REDIRECT_URI
        );

        const respuestaIdentidad =await fetch(
            `${API_URL}/v1/auth/identity`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${tokens.access_token}`
                }
            }
        );

        if (!respuestaIdentidad.ok){
            const error = await respuestaIdentidad.text();

            throw new Error (
                `Error al consultar identidad: ${respuestaIdentidad.status} - ${error}`
            );
        }

        const identidad = await respuestaIdentidad.json();

        console.log ("Rol de usuario:", identidad.rol);

        if (identidad.rol ==="admin"){
            window.location.replace("./dashboard.html");
        }
        else if (identidad.rol === "alimentador") {
            window.location.replace("./dashboard_procurador.html");
        }
        else {
            throw new Error ("No rol");
        }
    } catch (error){
        console.error("error con cognito", error);
        alert("No se pudo completar la autentificación");
    }

}
