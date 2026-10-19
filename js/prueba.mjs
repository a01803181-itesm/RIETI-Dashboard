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




// SE VA A BORRAR ESTO DE AQUI
document.addEventListener('click', function(event) {
    const botonAsignarEstado = event.target.closest('.boton-asignar-estado');

    if (botonAsignarEstado) {
        filaSeleccionada = botonAsignarEstado.closest('tr');
        const estado = filaSeleccionada.children[3].textContent;
        folioSeleccionado = filaSeleccionada.children[0].textContent;
        console.log(folioSeleccionado);
        
        const estadoModal = document.getElementById('estado-actual-modal');
        estadoModal.textContent = estado;

        const classCSS = estado.split(' ').join('-').toLowerCase();
        estadoModal.className = `badge-status status-${classCSS}`;

        document.getElementById('modal-estado').style.display = 'block';
        
        console.log(estado);

    }
});


document.getElementById('guardarEstado').addEventListener('click', async function() {
    const selectNuevoEstado = document.getElementById('nuevoEstado');
    const nuevoEstado = selectNuevoEstado.value;
    console.log(nuevoEstado);
    
    if (!folioSeleccionado) {
        console.error("No se encontró el folio asociado a este reporte.");
        alert("Error: No se indentificó el folio.");
        return;
    }

    console.log(`Enviando petición PATCH para folio: ${folioSeleccionado} con estatus: ${nuevoEstado}`);

    const estado = filaSeleccionada.querySelector('.status');

    if (estado) {
        const codigo = nuevoEstado.split('_').slice(1).join('-').toLowerCase();

        estado.textContent = nuevoEstado.split('_').slice(1).join(' ');
        estado.className = `status status-${codigo}`;
    }

    document.getElementById('modal-estado').style.display = 'none';



    try {
        const response = await fetch(`${API_URL}/v1/reportes/${encodeURIComponent(folioSeleccionado)}/estatus`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estatus: nuevoEstado })
        });

        if (!response.ok) {
            throw new Error('No se pudo actualizar en la base de datos');
        }

        console.log(`Estado del folio ${folioSeleccionado} actualizado a ${nuevoEstado}`);
    } catch (error){
        console.error('Error al guardar el cambio de estado:', error);
        alert('Ocurrió un error al guardar el cambio en el servidor.');
    }

});

document.getElementById('cerrar-estado').addEventListener('click', function() {
    document.getElementById('modal-estado').style.display = 'none';
});

document.getElementById('boton-cancelar-modal').addEventListener('click', function() {
    document.getElementById('modal-estado').style.display = 'none';
});

