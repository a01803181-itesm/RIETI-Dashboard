// js/appDashboard.mjs
import { 
    obtenerCantidadesDeReportesPorAlimentador,
    obtenerPromedioResolucionPorAlimentador 
} from './api_service.mjs';

import { 
    renderizarTarjetasMetricas,
    renderizarPromedioResolucion 
} from './dashboardAlimentador.mjs';

// Obtener el correo del alimentador autenticado (con fallback)
const correoAlimentador = localStorage.getItem('correoAlimentador') || 'giancarlo.morenov@gmail.com';

/**
 * Inicializa y carga todos los datos del Dashboard Municipal.
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

// Escuchar la carga del DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarAppDashboard);
} else {
    inicializarAppDashboard();
}