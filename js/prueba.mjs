// const botonCambiarEstado = document.getElementById('boton-asignar-estado');
// const modalEstado = document.getElementById('modal-estado');
// const cerrarEstado = document.getElementById('cerrar-estado');
// const guardar = document.getElementById('guardarEstado');
// const seleccionarEstado = document.getElementById('nuevoEstado');

// botonCambiarEstado.addEventListener('click', function() {
//     modalEstado.style.display = 'block';
//     document.body.style.overflow = 'hidden';
// });

// cerrarEstado.addEventListener('click', function() {
//     modalEstado.style.display = 'none';
//     document.body.style.overflow = 'auto';
// });

// guardar.addEventListener('click', function() {
//     const nuevo = seleccionarEstado.value;
//     alert('Estado cambiado a: ' + nuevo);
//     modalEstado.style.display = 'none';
//     document.body.style.overflow = 'auto';
// });



// const botonAsignarAutoridad = document.getElementById('boton-asignar-autoridad');
// const modalAsignacion = document.getElementById('modal-asignacion');
// const cerrarAsignacion = document.getElementById('cerrar-asignacion');
// const cancelarAsignacion = document.getElementById('cancelarAsignacion');
// const seleccionarResponsable = document.getElementById('nuevaAutoridad');
// const botonAsignar =document.getElementById('guardarAsignacion')

// botonAsignarAutoridad.addEventListener('click', function() {
//     modalAsignacion.style.display = 'block';
//     document.body.style.overflow = 'hidden';
// });

// cerrarAsignacion.addEventListener('click', function() {
//     modalAsignacion.style.display = 'none';
//     document.body.style.overflow = 'auto';
// });

// botonAsignar.addEventListener('click', function() {
//     const nuevo = seleccionarResponsable.value;
//     alert('Responsable asignado: ' + nuevo);
//     modalAsignacion.style.display = 'none';
//     document.body.style.overflow = 'auto';
// });

// cancelarAsignacion.addEventListener('click', function() {
//     alert('Asignación cancelada.');
//     modalAsignacion.style.display = 'none';
//     document.body.style.overflow = 'auto';

// });

// const botonEliminar = document.getElementById('boton-eliminar');

// botonEliminar.addEventListener('click', function() {
//     alert('Reporte eliminado');
// });


// document.addEventListener('DOMContentLoaded', function() {
//     const tabla = document.querySelector('table');
//     const modalEstado = document.getElementById('modal-estado');
//     const modalAsignacion = document.getElementById('modal-asignacion');

//     if(tabla) {
//         tabla.addEventListener('click', (e) => {
//             if(e.target.closest('.boton-asignar-estado')) {
//                 modalEstado.style.display = 'block';
//             }

//             if(e.target.closest('.boton-asignar-autoridad')) {
//                 modalAsignacion.style.display = 'block';
//             }

//             if(e.target.closest('.boton-eliminar')) {
//                 const fila = e.target.closest('tr');
//                 const folio = fila.cells[0].textContent.trim();
//                 if(confirm(`¿Está seguro de eliminar el reporte ${folio}?`)) {
//                     fila.remove();
//                 }
//             }
//         });
//     }

//     document.getElementById('cerrar-estado')?.addEventListener('click', function() {
//         modalEstado.style.display = 'none';
//     });

//     document.getElementById('cerrar-asignacion')?.addEventListener('click', function() {
//         modalAsignacion.style.display = 'none';
//     });

// });

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

