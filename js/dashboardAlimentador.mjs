/**
 * @fileoverview Renderiza las tarjetas y métricas del dashboard del alimentador municipal.
 * @author Cassandra Vanessa Padilla Barovier (A01753547, ITC)
 * @author Giancarlo Moreno Vázquez (A01803172, ITC)
 * @author Alexander Mejia Tovar (A01803181, ITC)
 * @author César Ariel Rodríguez Sandoval (A01802924, ITC)
 * @author Santiago Abraham Rios Palacios (A01802727, ITC)
 */
/**
 * Actualiza los cuatro conteos municipales en las tarjetas del dashboard.
 * @param {{total?: number, completados?: number, en_proceso?: number, pendientes?: number}} data
 * @returns {void}
 */
export function renderizarTarjetasMetricas(data = {}) {
    const elTotal = document.getElementById('cant-total');
    const elCompletados = document.getElementById('completados-reportes');
    const elEnProceso = document.getElementById('en-proceso-reportes');
    const elPendientes = document.getElementById('pendientes-reportes');

    if (elTotal) elTotal.textContent = data.total ?? 0;
    if (elCompletados) elCompletados.textContent = data.completados ?? 0;
    if (elEnProceso) elEnProceso.textContent = data.en_proceso ?? 0;
    if (elPendientes) elPendientes.textContent = data.pendientes ?? 0;
}

/**
 * Muestra el promedio de resolución municipal con un decimal y su unidad.
 * @param {{data?: number|string}} res Respuesta de la métrica del servicio.
 * @returns {void}
 */
export function renderizarPromedioResolucion(res = {}) {
    const elemento = document.getElementById('promedio-dias-resolucion');
    if (elemento) {
        const dias = Number(res.data || 0).toFixed(1);
        elemento.textContent = `${dias} días`;
    }
}