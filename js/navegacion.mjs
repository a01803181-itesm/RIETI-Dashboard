/**
 * Configura los eventos de navegación y filtrado para la interfaz de gestión o visualización de reportes.
 * @fileoverview Actualiza la información del usuario y los elementos de navegación compartidos.
 * @author Cassandra Vanessa Padilla Barovier (A01753547, ITC)
 * @author Giancarlo Moreno Vázquez (A01803172, ITC)
 * @author Alexander Mejia Tovar (A01803181, ITC)
 * @author César Ariel Rodríguez Sandoval (A01802924, ITC)
 * @author Santiago Abraham Rios Palacios (A01802727, ITC)
 */

// Los accesos rápidos llevan al listado con una categoría de estatus en la URL.

import { API_URL } from "./api_url.mjs";

const botonVerTodosListadoReportes = document.getElementById('boton-ver-todos');

if(botonVerTodosListadoReportes){
    botonVerTodosListadoReportes.addEventListener('click', function() {
        window.location.href = 'gestion_de_reportes.html'
    });
}



// Conecta botones estáticos de detalle presentes en páginas que no generan filas dinámicas.
const botonVerReporteIndividual = document.querySelectorAll('.boton-ver');

if(botonVerReporteIndividual){
    botonVerReporteIndividual.forEach(boton => {
        boton.addEventListener('click', function() {
            alert('Botón presionado');
            window.location.href = 'detalles_reporte.html';
        });
    });
}


// Cada acción abre la gestión con el filtro correspondiente preseleccionado.
const botonRevisarReportesPendientes = document.getElementById('revisar-reportes-pendientes');

if(botonRevisarReportesPendientes) {
    botonRevisarReportesPendientes.addEventListener('click', function() {
        window.location.href = 'gestion_de_reportes.html?filtro=pendiente'
    });
}

const botonRevisarReportesCompletados = document.getElementById('revisar-reportes-completados');

if(botonRevisarReportesCompletados) {
    botonRevisarReportesCompletados.addEventListener('click', function() {
        window.location.href = 'gestion_de_reportes.html?filtro=completado'
    });
}

const botonRevisarReportesProgreso = document.getElementById('revisar-reportes-progreso');

if(botonRevisarReportesProgreso) {
    botonRevisarReportesProgreso.addEventListener('click', function() {
        window.location.href = 'gestion_de_reportes.html?filtro=en progreso'
    });
}

// /**
//  * Escucha el evento de carga del DOM para verificar si existen parámetros de URL 
//  * y aplicar automáticamente el filtro correspondiente en la tabla al cargar la página.
//  */
// document.addEventListener('DOMContentLoaded', () => {
//     // const urlParams = new URLSearchParams(window.location.search);
//     // const filtroURL = urlParams.get('filtro');

//     // if (filtroURL) {
//     //     // filtrarReportes(filtroURL.toLocaleLowerCase());
//     //     cargarReportesConFiltro();
//     // }
// });

/**
 * Consulta la identidad autenticada y muestra el nombre; sin token indica que no hay sesión.
 * @returns {Promise<void>}
 */
async function mostrarNombre() {
    const elementoNombre = document.getElementById("nombre-usuario");

    if (!elementoNombre) return;

    const token = sessionStorage.getItem("access_token");

    if (!token){
        elementoNombre.textContent = "sin sesión";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/v1/auth/identity`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error (`HTTP ${response.status}`);
        }

        const usuario = await response.json();

        elementoNombre.textContent = usuario.nombre || "Usuario";

        console.log ("Usuario:", usuario.nombre);
    }
    catch (error) {
        console.error ("error al obtener usuario", error);
        elementoNombre.textContent = "Usuario";
    }  
}

mostrarNombre ();



