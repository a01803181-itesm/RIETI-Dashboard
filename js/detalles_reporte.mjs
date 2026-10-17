document.addEventListener('DOMContentLoaded', () => {
    const datosGuardados = sessionStorage.getItem('reporteSeleccionado');

    if(!datosGuardados) {
        console.error('No se encontraron los datos del reporte.');
        return;
    }

    const reporte = JSON.parse(datosGuardados);

    document.getElementById('folio-reporte').textContent = reporte.folio;
    document.getElementById('estatus-reporte').textContent = reporte.estatus;
    document.getElementById('nombre-usuario').textContent = reporte.nombre + ' ' + reporte.ap_paterno + ' ' + reporte.ap_materno;
    document.getElementById('correo-usuario').textContent = reporte.correoU;
    document.getElementById('cantidad-ninos').textContent = reporte.numNinios;
    document.getElementById('edad').textContent = reporte.edad;
    document.getElementById('horario').textContent = reporte.dia;
    document.getElementById('tipo-trabajo').textContent = reporte.tipoTrabajo;
    document.getElementById('detalles').textContent = reporte.detalles_adicionales;

    const statusSpan = document.getElementById('estado-detalles');
    if (statusSpan && reporte.estatus) {
        const claseCSS = reporte.estatus.split('_').slice(1).join('-').toLowerCase();
        statusSpan.className = `status`

    }
})