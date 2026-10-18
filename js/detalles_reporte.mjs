import { API_URL } from "./api_url.mjs";


// Pantalla de carga
window.addEventListener('load', function() {
    const pantallaCarga = document.getElementById('pantalla-carga');
    
    pantallaCarga.style.display = 'none'
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


// Función para mostrar detalles
function mostrarDetalles(reporte) {
    document.getElementById('folio-reporte').textContent = reporte.folio;
    // document.getElementById('estatus-reporte').textContent = reporte.estatus;

    //Nombre
    const nombre = document.getElementById('nombre-usuario');
    if (reporte.nombre === "") {
        nombre.textContent = 'anónimo';
    } else {
        nombre.textContent = reporte.nombre + ' ' + reporte.ap_paterno + ' ' + reporte.ap_materno;
    }
    
    document.getElementById('correo-usuario').textContent = reporte.correoU;
    document.getElementById('cantidad-ninos').textContent = reporte.numNinios;
    document.getElementById('edad').textContent = reporte.edad;
    document.getElementById('horario').textContent = reporte.dia;
    document.getElementById('tipo-trabajo').textContent = reporte.tipoTrabajo;
    document.getElementById('detalles').textContent = reporte.detalles_adicionales;
    document.getElementById('direccion-caso').textContent = reporte.direccion;

    const statusSpan = document.getElementById('estatus-reporte');
    if (statusSpan && reporte.estatus) {
        const claseCSS = reporte.estatus.split('_').slice(1).join('-').toLowerCase();
        statusSpan.textContent = reporte.estatus.split('_').slice(1).join(' ');
        statusSpan.className = `status status-${claseCSS}`;
    }

    // ------------------------------------------ MAPA ------------------------------------------
    const contenedorMapaDetalle = document.getElementById('mapa-detalle-reporte');

    if (contenedorMapaDetalle) {
        // Coordenadas del reporte específico (Latitud, Longitud)
        const latitudReporte = reporte.latitud;
        const longitudReporte = reporte.longitud;

        const municipio = reporte.municipio.split('_').join(' ');

        // 1. Crear el mapa centrado en la ubicación del caso
        const mapaDetalle = L.map('mapa-detalle-reporte').setView([latitudReporte, longitudReporte], 15);

        // 2. Capa base de mapas (CartoDB Positron)
        // L.tileLayer('https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        //     maxZoom: 19,
        //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        // }).addTo(mapaDetalle);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        //attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(mapaDetalle);

        // 3. Crear el Pin / Marcador en la dirección exacta
        const marcador = L.marker([latitudReporte, longitudReporte]).addTo(mapaDetalle);

        // 4. (Opcional) Agregar un globo con información al hacer clic en el pin
        marcador.bindPopup(`
            <div style="font-size: 13px;">
                <strong>Folio:</strong> ${reporte.folio}<br>
                <strong>Ubicación:</strong> ${municipio}
            </div>
        `).openPopup(); // .openPopup() hace que aparezca abierto por defecto
    }

    // ------------------------------------------ HISTORIAL ------------------------------------------
    // const historial = 
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