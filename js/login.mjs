import { COGNITO_CONFIG } from "./config.mjs";

const COGNITO_DOMAIN = COGNITO_CONFIG.domain;
const CLIENT_ID = COGNITO_CONFIG.clientId;
const REDIRECT_URI = COGNITO_CONFIG.redirectUri;
const API_URL = "https://nyazu3k2shty7f2hmhqnrae3fq0cvdjz.lambda-url.us-east-1.on.aws";



console.log ("Configuración de Cognito funcionando")

function base64url (bytes){
    return btoa (String.fromCharCode(...bytes))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

function generarCodigoAleatorio (){
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return base64url(bytes);
}

async function generarChallenge (verificador) {
    const datos = new TextEncoder().encode(verificador);
    const hash = await crypto.subtle.digest("SHA-256", datos);
    return base64url (new Uint8Array(hash))
    
}

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
