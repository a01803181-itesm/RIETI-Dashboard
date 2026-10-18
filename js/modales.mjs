import { API_URL } from "./api_url.mjs";

let filaSeleccionada = null;
let folioSeleccionado = null;

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