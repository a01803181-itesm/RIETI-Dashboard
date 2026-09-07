const botonCambiarEstado = document.getElementById('boton-asignar-estado');
const modalEstado = document.getElementById('modal-estado');
const cerrarEstado = document.getElementById('cerrar-estado');
const guardar = document.getElementById('guardarEstado');
const seleccionarEstado = document.getElementById('nuevoEstado');

botonCambiarEstado.addEventListener('click', function() {
    modalEstado.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

cerrarEstado.addEventListener('click', function() {
    modalEstado.style.display = 'none';
    document.body.style.overflow = 'auto';
});

guardar.addEventListener('click', function() {
    const nuevo = seleccionarEstado.value;
    alert('Estado cambiado a: ' + nuevo);
    modalEstado.style.display = 'none';
    document.body.style.overflow = 'auto';
});



const botonAsignarAutoridad = document.getElementById('boton-asignar-autoridad');
const modalAsignacion = document.getElementById('modal-asignacion');
const cerrarAsignacion = document.getElementById('cerrar-asignacion');
const cancelarAsignacion = document.getElementById('cancelarAsignacion');
const seleccionarResponsable = document.getElementById('nuevaAutoridad');
const botonAsignar =document.getElementById('guardarAsignacion')

botonAsignarAutoridad.addEventListener('click', function() {
    modalAsignacion.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

cerrarAsignacion.addEventListener('click', function() {
    modalAsignacion.style.display = 'none';
    document.body.style.overflow = 'auto';
});

botonAsignar.addEventListener('click', function() {
    const nuevo = seleccionarResponsable.value;
    alert('Responsable asignado: ' + nuevo);
    modalAsignacion.style.display = 'none';
    document.body.style.overflow = 'auto';
});

cancelarAsignacion.addEventListener('click', function() {
    alert('Asignación cancelada.');
    modalAsignacion.style.display = 'none';
    document.body.style.overflow = 'auto';

});

const botonEliminar = document.getElementById('boton-eliminar');

botonEliminar.addEventListener('click', function() {
    alert('Reporte eliminado');
});

