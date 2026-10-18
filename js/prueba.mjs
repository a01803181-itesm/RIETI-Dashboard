// Archivo de acciones rápidas

document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.querySelector('table');
    const modalEstado = document.getElementById('modal-estado');
    const modalAsignacion = document.getElementById('modal-asignacion');

    if (tabla) {
        tabla.addEventListener('click', (e) => {
            // Abrir Modal "Asignar Estado"
            if (e.target.closest('.boton-asignar-estado')) {
                modalEstado.style.display = 'block';
                
            }

            // Abrir Modal "Asignar Autoridad"
            if (e.target.closest('.boton-asignar-autoridad')) {
                modalAsignacion.style.display = 'block';
            }

            // Acción Eliminar
            if (e.target.closest('.boton-eliminar')) {
                const fila = e.target.closest('tr');
                const folio = fila.cells[0].textContent.trim();
                if (confirm(`¿Está seguro de eliminar el reporte ${folio}?`)) {
                    fila.remove();
                }
            }
        });
    }

    // Funciones para cerrar modales
    document.getElementById('boton-cancelar-modal')?.addEventListener('click', () => {
        modalEstado.style.display = 'none';
    });
    
    document.getElementById('cerrar-estado')?.addEventListener('click', () => {
        modalEstado.style.display = 'none';
    });

    document.getElementById('boton-cancelar-modal-asignacion')?.addEventListener('click', () => {
        modalAsignacion.style.display = 'none';
    });

    document.getElementById('cerrar-asignacion')?.addEventListener('click', () => {
        modalAsignacion.style.display = 'none';
    });


    // Funciones para guardar cambios
    const nuevoEstado = document.getElementById('nuevoEstado');
    document.getElementById('guardarEstado')?.addEventListener('click', () => {
        alert(`El estado cambió a ${nuevoEstado.value}`);
        modalEstado.style.display = 'none';
    });

    const nuevaAutoridad = document.getElementById('nuevaAutoridad');
    document.getElementById('guardarAsignacion')?.addEventListener('click', () => {
        alert(`Se asignó el reporte a ${nuevaAutoridad.value}`);
        modalAsignacion.style.display = 'none';
    });

    // Acciones rápidas
    
});

