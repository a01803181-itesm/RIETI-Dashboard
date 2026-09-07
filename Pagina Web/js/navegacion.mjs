// Ver listado completo de reportes
const botonVerTodosListadoReportes = document.getElementById('boton-ver-todos');

if(botonVerTodosListadoReportes){
    botonVerTodosListadoReportes.addEventListener('click', function() {
        window.location.href = 'gestion_de_reportes.html'
    });
}



// Ver detalles de un reporte
const botonVerReporteIndividual = document.getElementById('RIETI2025100FE544');

if(botonVerReporteIndividual){
    botonVerReporteIndividual.addEventListener('click', function() {
        window.location.href = 'detalles_reporte.html'
    });
}


