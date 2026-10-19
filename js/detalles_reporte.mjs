import { API_URL } from "./api_url.mjs";


// Pantalla de carga
window.addEventListener('load', function() {
    const pantallaCarga = document.getElementById('pantalla-carga');
    
    pantallaCarga.style.display = 'none';
})


// Acción al cargar la página
document.addEventListener('DOMContentLoaded', async function() {

    const urlParams = new URLSearchParams(window.location.search);
    const folio = urlParams.get('folio').slice(1);

    if (!folio) {
        console.error('No se especificó un folio en la URL');
        return;
    }

    try {
        console.log(folio);
        const response = await fetch(`${API_URL}/v1/reportes/detalles/estatus/${encodeURIComponent(folio)}`);

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const reporte = await response.json();

        mostrarDetalles(reporte);
        MostrarEvidencia(reporte.folio);

    } catch(error) {
        console.error('Error al obtener los detalles del reporte:', error);
    }
});


function mostrarDetalles(reporte) {
    document.getElementById('folio-reporte').textContent = reporte.folio;

    // Nombre del remitente
    const nombreU = !reporte.nombre ? 'Anónimo' : `${reporte.nombre} ${reporte.ap_paterno ?? ''} ${reporte.ap_materno ?? ''}`.trim();
    document.getElementById('nombre-usuario').textContent = nombreU;
    
    document.getElementById('correo-usuario').textContent = reporte.correoU ?? 'Sin correo';
    document.getElementById('cantidad-ninos').textContent = reporte.numNinios;
    document.getElementById('edad').textContent = reporte.edad;
    document.getElementById('horario').textContent = reporte.dia;
    document.getElementById('tipo-trabajo').textContent = reporte.tipoTrabajo;
    document.getElementById('detalles').textContent = reporte.detalles_adicionales ?? 'Sin detalles adicionales';
    document.getElementById('direccion-caso').textContent = reporte.direccion;

    // Estatus
    const statusSpan = document.getElementById('estatus-reporte');
    if (statusSpan && reporte.estatus) {
        const estatusLimpio = reporte.estatus.split('_').slice(1).join(' ');
        const claseCSS = reporte.estatus.split('_').slice(1).join('-').toLowerCase();
        
        statusSpan.textContent = estatusLimpio;
        statusSpan.className = `status status-${claseCSS}`;
    }

    // MAPA (Leaflet)
    const contenedorMapaDetalle = document.getElementById('mapa-detalle-reporte');
    if (contenedorMapaDetalle && reporte.latitud && reporte.longitud) {
        const latitudReporte = reporte.latitud;
        const longitudReporte = reporte.longitud;
        const municipio = (reporte.municipio ?? '').split('_').join(' ');

        const mapaDetalle = L.map('mapa-detalle-reporte').setView([latitudReporte, longitudReporte], 15);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 18
        }).addTo(mapaDetalle);

        const marcador = L.marker([latitudReporte, longitudReporte]).addTo(mapaDetalle);
        marcador.bindPopup(`
            <div style="font-size: 13px;">
                <strong>Folio:</strong> ${reporte.folio}<br>
                <strong>Ubicación:</strong> ${municipio}
            </div>
        `).openPopup();
    }

    // ------------------------------------------ HISTORIAL ------------------------------------------
    const historial = document.getElementById('historial-cambios');
    if (historial) {
        historial.innerHTML = ''; // Limpiamos elementos estáticos del HTML

        const fechaEnvio = reporte.dia ? reporte.dia.split('T')[0] : 'Fecha no registrada';
        const estatusActual = reporte.estatus ? reporte.estatus.split('_').slice(1).join(' ') : 'Registrado';

        // Evento 1: Creación
        agregarPuntoHistorial(`${nombreU} envió reporte`, fechaEnvio, 'creacion');

        // Evento 2: Estatus inicial
        agregarPuntoHistorial(`Estado asignado: ${estatusActual}`, fechaEnvio, 'cambio_estatus');
    }
}


// Función para adjuntar un nuevo evento al historial de manera segura
export function agregarPuntoHistorial(descripcion, fechaTexto = null, tipo = 'cambio_estatus') {
    const historial = document.getElementById('historial-cambios');
    if (!historial) return; // Si no existe el contenedor en la vista actual, ignora silenciosamente

    const li = document.createElement('li');
    li.className = `evento-${tipo}`;

    // Si no se pasa fecha, toma la fecha/hora actual
    let fechaMostrar = fechaTexto;
    if (!fechaMostrar) {
        const ahora = new Date();
        fechaMostrar = ahora.toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    li.innerHTML = `
        <div class="punto-historial">
            <p class="detalle-historial">${descripcion}</p>
            <p class="fecha-historial">${fechaMostrar}</p>
        </div>
    `;

    historial.appendChild(li);
}

async function MostrarEvidencia (folio) {
    const contenedor = document.getElementById("evidencia-reporte");
    
    contenedor.style.display = "flex";
    contenedor.style.flexDirection = "column";
    contenedor.style.alignItems = "center";

    if(!contenedor) return
    
    contenedor.replaceChildren();
    contenedor.textContent = "Cargando fotografía/s...";

    try{
       const response = await fetch(
        `${API_URL}/v1/evidencias/by-folio/${encodeURIComponent(folio)}`
       );
       
       if(!response.ok){
            throw new Error (`Error HTTP: ${response.status}`);
       }

       const evidencias = await response.json();

       contenedor.replaceChildren();

       if(evidencias.length === 0){
        contenedor.textContent = "Este reporte no tiene evidencias.";
        return;
       }

       evidencias.forEach (evidencia => {
        const imagen = document.createElement("img");

        imagen.src = evidencia.url;
        imagen.alt = "Evidencia de fotos del reporte";


        contenedor.appendChild(imagen);
       });

    } catch (error){
        console.error ("Error al cargar fotos: ", error);
        contenedor.textContent = "No se pudo cargar las fotos.";
    }
    
}