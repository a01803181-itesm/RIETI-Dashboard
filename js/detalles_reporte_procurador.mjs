/**
 * @fileoverview Consulta y muestra el detalle y la evidencia del reporte municipal seleccionado.
 * @author Cassandra Vanessa Padilla Barovier (A01753547, ITC)
 * @author Giancarlo Moreno Vázquez (A01803172, ITC)
 * @author Alexander Mejia Tovar (A01803181, ITC)
 * @author César Ariel Rodríguez Sandoval (A01802924, ITC)
 * @author Santiago Abraham Rios Palacios (A01802727, ITC)
 */
import { API_URL } from "./api_url.mjs";

// Oculta el indicador visual cuando el navegador termina de cargar la página.
window.addEventListener('load', function() {
    const pantallaCarga = document.getElementById('pantalla-carga');
    if (pantallaCarga) {
        pantallaCarga.style.display = 'none';
    }
});

// Prioriza el folio de URL; si falta, recupera el reporte seleccionado desde sessionStorage.
document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const folioOriginal = urlParams.get('folio');
    const folio = folioOriginal?.replace(/^\?+/, '').trim();

    // 1. Intento por parámetro URL
    if (folio) {
        console.log('Cargando reporte por Folio en URL:', folio);
        try {
            const response = await fetch(`${API_URL}/v1/reportes/detalles/estatus/${encodeURIComponent(folio)}`);

            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }

            const reporte = await response.json();
            mostrarDetalles(reporte);
            MostrarEvidencia(reporte.folio);
            return;
        } catch(error) {
            console.error('Error al obtener los detalles del reporte por API:', error);
        }
    }

    // 2. Respaldo por sessionStorage si se abrió desde la vista de gestión
    const reporteGuardado = sessionStorage.getItem('reporteSeleccionado');
    if (reporteGuardado) {
        try {
            const reporte = JSON.parse(reporteGuardado);
            console.log('Cargando reporte desde sessionStorage:', reporte.folio);
            mostrarDetalles(reporte);
            MostrarEvidencia(reporte.folio);
            return;
        } catch (e) {
            console.error('Error al parsear el reporte de sessionStorage:', e);
        }
    }

    console.error('No se especificó un folio válido en la URL ni en sessionStorage');
});

/**
 * Presenta los datos del reporte, su estado, ubicación e historial en la página.
 * @param {Object} reporte Datos del reporte provenientes del API o sessionStorage.
 * @returns {void}
 */
function mostrarDetalles(reporte) {
    if (!reporte) return;

    document.getElementById('folio-reporte').textContent = reporte.folio || 'Sin Folio';

    // Nombre del Denunciante
    const nombre = document.getElementById('nombre-denunciante');
    const nombreCompleto = [reporte.nombre, reporte.ap_paterno, reporte.ap_materno]
        .filter(Boolean)
        .join(' ')
        .trim();

    if (nombre) {
        nombre.textContent = nombreCompleto !== '' ? nombreCompleto : 'Anónimo';
    }

    document.getElementById('correo-usuario').textContent = reporte.correoU || 'Sin correo registrado';
    document.getElementById('cantidad-ninos').textContent = reporte.numNinios ?? 'N/A';
    document.getElementById('edad').textContent = reporte.edad || 'No especificado';
    document.getElementById('horario').textContent = reporte.dia || 'No especificado';
    document.getElementById('tipo-trabajo').textContent = reporte.tipoTrabajo || 'No especificado';
    document.getElementById('detalles').textContent = reporte.detalles_adicionales || 'Sin observaciones adicionales';
    document.getElementById('direccion-caso').textContent = reporte.direccion || 'Dirección no disponible';

    // Formato de Estatus
    const statusSpan = document.getElementById('estatus-reporte');
    if (statusSpan && reporte.estatus) {
        const estatusLimpio = reporte.estatus.split('_').slice(1).join(' ');
        const claseCSS = reporte.estatus.split('_').slice(1).join('-').toLowerCase();
        
        statusSpan.textContent = estatusLimpio;
        statusSpan.className = `status status-${claseCSS}`;
    }

    // ------------------------------------------ MAPA ------------------------------------------
    const contenedorMapaDetalle = document.getElementById('mapa-detalle-reporte');

    if (contenedorMapaDetalle && reporte.latitud && reporte.longitud && typeof L !== 'undefined') {
        const latitudReporte = parseFloat(reporte.latitud);
        const longitudReporte = parseFloat(reporte.longitud);

        const municipio = (reporte.municipio || '').split('_').join(' ');

        // Inicializar mapa de Leaflet
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
    const historialAutor = document.getElementById('historial-autor');

    if (historialAutor) {
        historialAutor.textContent = nombreCompleto !== ''
            ? `${nombreCompleto} envió reporte`
            : 'Un usuario anónimo envió reporte';
    }
}

/**
 * Recupera y renderiza las evidencias fotográficas vinculadas con un folio.
 * @param {string} folio Identificador del reporte.
 * @returns {Promise<void>}
 */
async function MostrarEvidencia(folio) {
    const contenedor = document.getElementById("evidencia-reporte");
    if (!contenedor) return;

    contenedor.style.display = "flex";
    contenedor.style.flexDirection = "column";
    contenedor.style.alignItems = "center";
    
    contenedor.replaceChildren();
    contenedor.textContent = "Cargando fotografía/s...";

    try {
        const response = await fetch(`${API_URL}/v1/evidencias/by-folio/${encodeURIComponent(folio)}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const evidencias = await response.json();
        contenedor.replaceChildren();

        if (!Array.isArray(evidencias) || evidencias.length === 0) {
            contenedor.textContent = "Este reporte no contiene evidencias fotográficas.";
            return;
        }

        evidencias.forEach(evidencia => {
            const imagen = document.createElement("img");
            imagen.src = evidencia.url;
            imagen.alt = "Evidencia fotográfica del reporte";
            imagen.style.maxWidth = "100%";
            imagen.style.borderRadius = "8px";
            imagen.style.marginTop = "8px";

            contenedor.appendChild(imagen);
        });

    } catch (error) {
        console.error("Error al cargar fotos:", error);
        contenedor.textContent = "No se pudieron cargar las imágenes de evidencia.";
    }
}