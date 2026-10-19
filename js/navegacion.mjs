/**
 * Configura los eventos de navegación y filtrado para la interfaz de gestión o visualización de reportes.
 */

// Ver listado completo de reportes

import { API_URL } from "./api_url.mjs";

const botonVerTodosListadoReportes = document.getElementById('boton-ver-todos');

if(botonVerTodosListadoReportes){
    botonVerTodosListadoReportes.addEventListener('click', function() {
        window.location.href = 'gestion_de_reportes.html'
    });
}



// Ver detalles de un reporte
const botonVerReporteIndividual = document.querySelectorAll('.boton-ver');

if(botonVerReporteIndividual){
    botonVerReporteIndividual.forEach(boton => {
        boton.addEventListener('click', function() {
            alert('Botón presionado');
            window.location.href = 'detalles_reporte.html';
        });
    });
}


// Botones Acciones Rápidas
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

/**
 * Escucha el evento de carga del DOM para verificar si existen parámetros de URL 
 * y aplicar automáticamente el filtro correspondiente en la tabla al cargar la página.
 */
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const filtroURL = urlParams.get('filtro');

    if(filtroURL === 'pendiente') {
        filtrarReportes('pendiente');
    }

    if(filtroURL === 'completado') {
        filtrarReportes('completado');
    }

    if(filtroURL === 'en progreso') {
        filtrarReportes('en progreso');
    }
});

/**
 * Filtra las filas de una tabla HTML basándose en el estado de los reportes.
 * Oculta las filas que no coincidan con el estado especificado y muestra las que sí.
 * 
 * @function filtrarReportes
 * @param {string} estadoFiltro - El estado por el cual se desea filtrar (ej. 'pendiente', 'completado', 'en progreso').
 * @returns {void}
 */
function filtrarReportes(estadoFiltro) {
    const filas = document.querySelectorAll('table tbody tr');

    filas.forEach(fila => {
        const estadoCelda = fila.cells[3];

        if(estadoCelda) {
            const estado = estadoCelda.textContent.trim().toLowerCase();

            if(estado.includes(estadoFiltro.toLowerCase())) {
                fila.computedStyleMap.display = '';
            } else {
                fila.style.display = 'none'
            }
        }
    });
}

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





