/**
 * @fileoverview Renderiza el resumen de métricas y el listado del dashboard administrativo.
 * @author Cassandra Vanessa Padilla Barovier (A01753547, ITC)
 * @author Giancarlo Moreno Vázquez (A01803172, ITC)
 * @author Alexander Mejia Tovar (A01803181, ITC)
 * @author César Ariel Rodríguez Sandoval (A01802924, ITC)
 * @author Santiago Abraham Rios Palacios (A01802727, ITC)
 */
/**
 * Actualiza los contadores del dashboard a partir de las cantidades recibidas del API.
 * @param {{total?: number, completados?: number, en_proceso?: number, pendientes?: number}} datos
 * @returns {void}
 */
export function datosCantidadDeReportes({ total = 0, completados = 0, en_proceso = 0, pendientes = 0} = {}) {
    const cantidadTotal = document.getElementById('cantidad-total');
    const cantidadCompletados = document.getElementById('cantidad-completados');
    const cantidadEnProceso = document.getElementById('cantidad-en-proceso');
    // const cantidadPendientes = document.getElementById('cantidad-pendientes');
    const cantidadPendientes = document.querySelectorAll('.cantidad-pendientes');

    cantidadTotal.textContent = `${Number(total)}`;
    cantidadCompletados.textContent = `${Number(completados)}`;
    cantidadEnProceso.textContent = `${Number(en_proceso)}`;
    // cantidadPendientes.textContent = `${Number(pendientes)}`;
    cantidadPendientes.forEach(e => {
        e.textContent = `${Number(pendientes)}`;
    });
}

/**
 * Inserta en la tabla del dashboard hasta cinco reportes recientes y sus acciones.
 * @param {Array<Object>} datos Reportes devueltos por el servicio.
 * @returns {void}
 */
export function detallesReportes(datos) {
    const tbody = document.getElementById('cuerpo-tabla');


    const reportesRecientes = datos.slice(0, 5);

    const filasHTML = reportesRecientes.map(item => {

        const folio = item.folio;
        const municipio = item.municipio;
        
        const initialEstatus = item.estatus;

        const initialFecha = item.dia;
        const fechaSplited = initialFecha.split('T')[0];
        const fechaTemp = fechaSplited.split('-')
        const fecha = fechaTemp[2] + '-' + fechaTemp[1] + '-' + fechaTemp[0];


        

        const estatusSplited = initialEstatus.split('_');        
        
        const estatus = estatusSplited.slice(1).join(' ');
        const classEstatus = estatusSplited.slice(1).join('-').toLowerCase();
        
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

// Delegación de eventos: los botones aparecen dinámicamente al generar las filas.
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