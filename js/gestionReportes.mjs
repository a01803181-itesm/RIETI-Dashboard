import {
    API_URL
} from './api_url.mjs';


/**
 * @fileoverview Presenta las filas de reportes y controles de gestión administrativos.
 * @author Cassandra Vanessa Padilla Barovier (A01753547, ITC)
 * @author Giancarlo Moreno Vázquez (A01803172, ITC)
 * @author Alexander Mejia Tovar (A01803181, ITC)
 * @author César Ariel Rodríguez Sandoval (A01802924, ITC)
 * @author Santiago Abraham Rios Palacios (A01802727, ITC)
 */
/**
 * Actualiza la etiqueta de estatus que aparece en el modal de gestión.
 * @param {string} estado Texto de estado normalizado que se mostrará.
 * @returns {void}
 */
export function modificarDetallesModal(estado) {
    const estadoModal = document.getElementById('estado-actual-modal');
    estadoModal.textContent = estado;
}

/**
 * Construye las filas de la tabla de administración y normaliza fecha y estatus.
 * @param {Array<Object>} datos Reportes a representar.
 * @returns {void}
 */
export function detallesReportesGestion(datos) {
    // DATOS TABLA
    const tbody = document.getElementById('cuerpo-tabla');

    const filasHTML = datos.map(item => {

        const folio = item.folio;
        const municipio = item.municipio;

        const initialEstatus = item.estatus;
        const estatusSplited = initialEstatus.split('_');
        const estatus = estatusSplited.slice(1).join(' ');
        const classEstatus = estatusSplited.slice(1).join('-').toLowerCase();

        const initialFecha = item.dia;
        const fechaSplited = initialFecha.split('T')[0];
        const fechaTemp = fechaSplited.split('-')
        const fecha = fechaTemp[2] + '-' + fechaTemp[1] + '-' + fechaTemp[0];

        const accion = `
        <td>
            <div class="contenedor-boton-split">
                <button class="boton-ver">Ver</button>
                <div class="dropdown">
                    <button type="button" class="boton-dropdown">
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>
                    <div class="contenido-dropdown">
                        <button type="button" class="opciones-contenido boton-asignar-estado">
                            <i class="fa-solid fa-user-shield"></i>
                            Asignar Estado
                        </button>
                        <button type="button" class="opciones-contenido boton-asignar-autoridad">
                            <i class="fa-solid fa-user-shield"></i>
                            Asignar Autoridad
                        </button>
                        <hr class="divisor-dropdown">
                        <button type="button" class="opciones-contenido boton-eliminar">
                            <i class="fa-solid fa-trash"></i>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </td>
        `;

        modificarDetallesModal(estatus);

        return `
        <tr>
            <td>${folio}</td>
            <td>${municipio}</td>
            <td>${fecha}</td>
            <td><span class="status status-${classEstatus}">${estatus}</span></td>
            ${accion}
        </tr>
        `;
    }).join('');

    tbody.innerHTML = filasHTML;
}

// -------------------------------- BUSCADOR --------------------------------
const botonBuscar = document.getElementById('botonBuscar');
const buscador = document.getElementById('buscador');

// Filtra las filas ya renderizadas comparando todo su texto con el término ingresado.
botonBuscar.addEventListener('click', function() {
    const valor = buscador.value.trim().toLowerCase();
    const rows = document.querySelectorAll('#cuerpo-tabla tr');
    
    rows.forEach(row => {
        const textoFila = row.textContent.toLowerCase();

        if(textoFila.includes(valor)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    })
});


// -------------------------------- LIMPIAR BUSCADOR --------------------------------
// Al borrar la búsqueda, vuelve a mostrar todas las filas de la tabla.
buscador.addEventListener('input', function() {
    const valor = this.value.trim().toLowerCase();
    const rows = document.querySelectorAll('#cuerpo-tabla tr');

    if (valor === '') {
        rows.forEach(row => {
            row.style.display = '';
        });
    }
});


// -------------------------------- FUNCIONAMIENTO DE BUSCADOR CON ENTER --------------------------------
// Permite ejecutar la búsqueda con Enter sin enviar o recargar la página.
buscador.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        botonBuscar.click();
    }
});


// -------------------------------- BOTON VER --------------------------------
// Atiende botones de detalle creados dinámicamente y abre el reporte por folio.
document.addEventListener('click', async function(event) {
    const botonVer = event.target.closest('.boton-ver');
    // const padre = ((botonVer.parentElement).parentElement).parentElement;
    const padre = botonVer.closest('tr');
    const hijo = padre.children[0];
    const folio = hijo.textContent;

    if(botonVer) {
        console.log('Ver detalles del folio:', folio);
        console.log('El elemento padre es: ', padre);
        console.log('El elemento hijo es: ', hijo);


        window.open(`detalles_reporte.html?folio=?${encodeURIComponent(folio)}`, '_blank');
    }
})
