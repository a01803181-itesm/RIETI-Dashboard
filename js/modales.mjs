import { API_URL } from "./api_url.mjs";
import { agregarPuntoHistorial } from "./detalles_reporte.mjs";

let filaSeleccionada = null;
let folioSeleccionado = null;

// ------------------------------------ ASIGNAR ESTADO ------------------------------------
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



document.getElementById('guardarEstado').addEventListener('click', async function () {
    const selectNuevoEstado = document.getElementById('nuevoEstado');
    const nuevoEstado = selectNuevoEstado.value;

    if (!folioSeleccionado) {
        console.error("No se encontró el folio asociado a este reporte.");
        alert("Error: No se identificó el folio.");
        return;
    }

    // Recuperamos el token de autenticación (prioriza sessionStorage o localStorage)
    const token = sessionStorage.getItem('access_token') || localStorage.getItem('access_token');

    if (!token) {
        alert('No hay una sesión activa de Cognito.');
        return;
    }

<<<<<<< Updated upstream
    const response = await fetch(
        `${API_URL}/v1/reportes/${encodeURIComponent(folioSeleccionado)}/estatus`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ estatus: nuevoEstado })
        }
    );

    if (!response.ok) {
        const detalle = await response.text();
        throw new Error(`HTTP ${response.status}: ${detalle}`);
    }

    if (estado) {
        const codigo = nuevoEstado.split('_').slice(1).join('-').toLowerCase();

        estado.textContent = nuevoEstado.split('_').slice(1).join(' ');
        estado.className = `status status-${codigo}`;
    }

    document.getElementById('modal-estado').style.display = 'none';

    console.log(`Estado del folio ${folioSeleccionado} actualizado a ${nuevoEstado}`);

} catch (error) {
    console.error('Error al guardar el cambio de estado:', error);
    alert('Ocurrió un error al guardar el cambio en el servidor.');
}

=======
    try {
        const response = await fetch(
            `${API_URL}/v1/reportes/${encodeURIComponent(folioSeleccionado)}/estatus`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ estatus: nuevoEstado })
            }
        );

        if (!response.ok) {
            const detalle = await response.text();
            throw new Error(`HTTP ${response.status}: ${detalle}`);
        }

        const estatusLimpio = nuevoEstado.split('_').slice(1).join(' ');
        const codigoCSS = nuevoEstado.split('_').slice(1).join('-').toLowerCase();

        // 1. Si la modal se abrió desde la tabla, actualizamos el badge de la fila
        if (typeof filaSeleccionada !== 'undefined' && filaSeleccionada) {
            const estadoBadge = filaSeleccionada.querySelector('.status');
            if (estadoBadge) {
                estadoBadge.textContent = estatusLimpio;
                estadoBadge.className = `status status-${codigoCSS}`;
            }
        }

        // 2. Si el badge principal de la vista de detalles existe, lo actualizamos
        const statusSpanDetalle = document.getElementById('estatus-reporte');
        if (statusSpanDetalle) {
            statusSpanDetalle.textContent = estatusLimpio;
            statusSpanDetalle.className = `status status-${codigoCSS}`;
        }

        // 3. Agregar el nuevo evento al historial dinámicamente si el <ul> está presente
        agregarPuntoHistorial(`El estado cambió a: ${estatusLimpio}`, null, 'cambio_estatus');

        // 4. Cerrar el modal
        document.getElementById('modal-estado').style.display = 'none';
        console.log(`Estado del folio ${folioSeleccionado} actualizado a ${nuevoEstado}`);

    } catch (error) {
        console.error('Error al guardar el cambio de estado:', error);
        alert('Ocurrió un error al guardar el cambio en el servidor.');
    }
>>>>>>> Stashed changes
});


document.getElementById('cerrar-estado').addEventListener('click', function() {
    document.getElementById('modal-estado').style.display = 'none';
});

document.getElementById('boton-cancelar-modal').addEventListener('click', function() {
    document.getElementById('modal-estado').style.display = 'none';
});



// ------------------------------------ ASIGNAR AUTORIDAD ------------------------------------
const selectNuevaAutoridad = document.getElementById('nuevaAutoridad');

document.addEventListener('click', async function(event) {
    const botonAsignarAutoridad = event.target.closest('.boton-asignar-autoridad');

    if (botonAsignarAutoridad) {
        filaSeleccionada = botonAsignarAutoridad.closest('tr');
        const municipio = filaSeleccionada.children[1].textContent;
        folioSeleccionado = filaSeleccionada.children[0].textContent;
        console.log(municipio);
        console.log(folioSeleccionado);

        
        // PETICIÓN PARA OBTENER ALIMENTADOR ASIGNADO AL REPORTE
        try {
            const responseDetalleReporte = await fetch(`${API_URL}/v1/reportes/detalles/alimentador/${encodeURIComponent(folioSeleccionado)}`);
            console.log(`Solicitando detalles del reporte: ${folioSeleccionado}`);

            if (!responseDetalleReporte.ok) {
                throw new Error(`Error en la petición: ${responseDetalleReporte.status}`);
            }
            const detalles = await responseDetalleReporte.json();

            const autoridadAsignada = document.getElementById('autoridad-actual-modal');
            
            if (detalles.nombre === "") {
                autoridadAsignada.textContent = 'Ninguna';
            } else {
                autoridadAsignada.textContent = detalles.nombre + ' ' + detalles.ap_paterno + ' ' + detalles.ap_materno;
            }
            
        } catch(error) {
            console.error('Error al obtener los detalles del reporte:', error);
        }

        // PETICIÓN PARA OBTENER ALIMENTADORES POR MUNICIPIO
        try {
            const responseAlimentadores = await fetch(`${API_URL}/v1/alimentadores/municipio/${encodeURIComponent(municipio)}`);
            console.log('Haciendo petición para obtener listado de alimentadores');

            if (!responseAlimentadores.ok) {
                throw new Error(`Error en la petición: ${responseAlimentadores.status}`);
            }

            const alimentadores = await responseAlimentadores.json();

            selectNuevaAutoridad.replaceChildren();

            const opcionInicial = document.createElement('option');
            opcionInicial.value = '';
            opcionInicial.textContent = 'Selecciona una autoridad';
            selectNuevaAutoridad.appendChild(opcionInicial);
            
            alimentadores.forEach(alimentador => {
                const option = document.createElement('option');

                option.value = alimentador.correoAl;
                option.textContent = alimentador.nombre + ' ' + alimentador.ap_paterno + ' ' + alimentador.ap_materno;

                console.log(option.value);
                selectNuevaAutoridad.appendChild(option);
            });
            // mostrarOpcionesAlimentador(alimentadores);
            // // alimentadores.map( alimentador => {
            // //     console.log(alimentador.nombre);
            // // })

            document.getElementById('modal-asignacion').style.display = 'block';
        
        } catch(error) {
            console.error('Error al obtener los detalles de los alimentadores:', error);
        }
    }
});


document.getElementById('guardarAsignacion').addEventListener('click', async function () {
    const selectNuevaAutoridad = document.getElementById('nuevaAutoridad');
    const nuevaAutoridad = selectNuevaAutoridad.value;
    const comentarioTexto = document.getElementById('comentarios-asignacion').value.trim();
    console.log(selectNuevaAutoridad.textContent);
    console.log(nuevaAutoridad);
    console.log(comentarioTexto);

    if (!folioSeleccionado) {
        console.error("No se encontró el folio asociado a este reporte.");
        alert("Error: No se identificó el folio.")
        return;
    }

    const token = sessionStorage.getItem('access_token');

    if (!token) {
        alert('No hay una sesión activa de Cognito.');
        return;
    }
    
    document.getElementById('modal-asignacion').style.display = 'none';

    console.log(`Enviando petición PATCH para folio: ${folioSeleccionado} con alimentador: ${nuevaAutoridad}`);


    try {
        const response = await fetch(`${API_URL}/v1/reportes/${encodeURIComponent(folioSeleccionado)}/estatus`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                correoAl: nuevaAutoridad || null,
                comentario: comentarioTexto || null
            })
        });

        if (!response.ok) {
            throw new Error('No se pudo actualizar en la base de datos');
        }

        console.log(`Autoridad del folio ${folioSeleccionado} actualizada a ${nuevaAutoridad}`);

        document.getElementById('comentarios-asignacion').value = '';

    } catch(error) {
        console.error('Error al guardar el cambio de autoridad:', error);
        alert('Ocurió un error al guardar el cambio en el servidor.');
    }
});

document.getElementById('cerrar-asignacion').addEventListener('click', function() {
    document.getElementById('modal-asignacion').style.display = 'none';
});

document.getElementById('boton-cancelar-modal-asignacion').addEventListener('click', function() {
    document.getElementById('modal-asignacion').style.display = 'none';
});