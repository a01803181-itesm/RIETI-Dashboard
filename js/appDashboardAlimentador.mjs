// js/appDashboard.mjs
/**
 * @fileoverview Coordina la carga de datos y componentes del dashboard municipal.
 * @author Cassandra Vanessa Padilla Barovier (A01753547, ITC)
 * @author Giancarlo Moreno Vázquez (A01803172, ITC)
 * @author Alexander Mejia Tovar (A01803181, ITC)
 * @author César Ariel Rodríguez Sandoval (A01802924, ITC)
 * @author Santiago Abraham Rios Palacios (A01802727, ITC)
 */
import {
    obtenerCantidadesDeReportesPorAlimentador,
    obtenerPromedioResolucionPorAlimentador 
} from './api_service.mjs';

import { 
    renderizarTarjetasMetricas,
    renderizarPromedioResolucion 
} from './dashboardAlimentador.mjs';

// Identifica el ámbito municipal de las consultas de métricas.
const correoAlimentador = localStorage.getItem('correoAlimentador') || 'giancarlo.morenov@gmail.com';

/**
 * Consulta las métricas municipales en paralelo y actualiza las tarjetas del dashboard.
 * @returns {Promise<void>}
 */
async function inicializarAppDashboard() {
    try {
        const [metricasConsolidadas, promedioResolucion] = await Promise.all([
            obtenerCantidadesDeReportesPorAlimentador(correoAlimentador),
            obtenerPromedioResolucionPorAlimentador(correoAlimentador)
        ]);

        console.log('Métricas consolidadas cargadas:', metricasConsolidadas);
        console.log('Promedio de resolución cargado:', promedioResolucion);

        // Actualizar los elementos en la interfaz
        renderizarTarjetasMetricas(metricasConsolidadas);
        renderizarPromedioResolucion(promedioResolucion);

    } catch (error) {
        console.error('Error al inicializar el Dashboard del alimentador:', error);
    }
}

// Ejecuta la carga cuando los elementos de las tarjetas ya están disponibles.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarAppDashboard);
} else {
    inicializarAppDashboard();
}