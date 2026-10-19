// js/dashboardAlimentador.mjs

/**
 * Pinta los conteos numéricos en las tarjetas superiores del Dashboard.
 * @param {Object} data - Objeto con las métricas { total, completados, en_proceso, pendientes }
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
 * Pinta el promedio de días de resolución en el elemento correspondiente.
 * @param {Object} res - Objeto con la propiedad data
 */
export function renderizarPromedioResolucion(res = {}) {
    const elemento = document.getElementById('promedio-dias-resolucion');
    if (elemento) {
        const dias = Number(res.data || 0).toFixed(1);
        elemento.textContent = `${dias} días`;
    }
}