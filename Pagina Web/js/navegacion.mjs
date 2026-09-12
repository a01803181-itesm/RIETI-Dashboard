// Ver listado completo de reportes
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




