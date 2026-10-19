// js/app_alimentador.mjs
import {
  obtenerEstatusPorAlimentador,
  obtenerReportesPorTiempoPorAlimentador,
  obtenerReportesRangoHoraPorAlimentador,
  obtenerCoordenadasMapaPorAlimentador,
  obtenerPromedioResolucionPorAlimentador,
  obtenerPendientesUltimaSemanaPorAlimentador,
  obtenerPorcentajeEnProcesoPorAlimentador,
  obtenerPorcentajePendientesPorAlimentador,
  obtenerReportesPorTipoTrabajoPorAlimentador,
  obtenerReportesPorAutoridadPorAlimentador
} from './api_service.mjs';

import {
  canvasEstadoReportes,
  canvasReportesTiempo,
  canvasCoordenadas,
  datoPromedioResolucion,
  datoPendientesUltimaSemana,
  datoPorcentajeEstadisticasEnProceso,
  datoPorcentajeEstadisticasPendientes,
  canvasReportesRangoHora,
  canvasReportesTipoTrabajo,
  canvasReportesPorAutoridad
} from './graficasAlimentador.mjs';

// Obtener el correo del alimentador autenticado
const correoAlimentador = localStorage.getItem('correoAlimentador') || 'giancarlo.morenov@gmail.com';

/**
 * Inicializa el dashboard de gráficas filtrado por el municipio del alimentador.
 * 
 * @async
 * @function inicializarDashboardAlimentador
 * @returns {Promise<void>}
 */
async function inicializarDashboardAlimentador() {
  try {
    const [
      reportesPorEstatus,
      reportesTiempo,
      reportesCoordenadas,
      reportesHora,
      reportesTipoTrabajo,
      reportesAutoridad
    ] = await Promise.all([
      obtenerEstatusPorAlimentador(correoAlimentador),
      obtenerReportesPorTiempoPorAlimentador(correoAlimentador),
      obtenerCoordenadasMapaPorAlimentador(correoAlimentador),
      obtenerReportesRangoHoraPorAlimentador(correoAlimentador),
      obtenerReportesPorTipoTrabajoPorAlimentador(correoAlimentador),
      obtenerReportesPorAutoridadPorAlimentador(correoAlimentador)
    ]);

    console.log('Reportes por estatus (Alimentador):', reportesPorEstatus);
    console.log('Reportes a través del tiempo (Alimentador):', reportesTiempo);
    console.log('Reportes coordenadas (Alimentador):', reportesCoordenadas);
    console.log('Reportes por rango de hora (Alimentador):', reportesHora);
    console.log('Reportes por tipo de trabajo (Alimentador):', reportesTipoTrabajo);
    console.log('Reportes por autoridad (Alimentador):', reportesAutoridad);

    // Renderizar las gráficas
    canvasEstadoReportes(reportesPorEstatus);
    canvasReportesTiempo(reportesTiempo);
    canvasCoordenadas(reportesCoordenadas);
    canvasReportesRangoHora(reportesHora);
    canvasReportesTipoTrabajo(reportesTipoTrabajo);
    canvasReportesPorAutoridad(reportesAutoridad);
    
  } catch (error) {
    console.error('No se pudieron cargar las gráficas del alimentador:', error);
  }
}

/**
 * Inicializa las tarjetas de KPIs/Métricas numéricas filtradas por el alimentador.
 * 
 * @async
 * @function inicializarDatosAlimentador
 * @returns {Promise<void>}
 */
async function inicializarDatosAlimentador() {
  try {
    const [
      promedioResolucion,
      pendientesUltimaSemana,
      porcentajeReportesEnProceso,
      porcentajeReportesPendientes
    ] = await Promise.all([
      obtenerPromedioResolucionPorAlimentador(correoAlimentador),
      obtenerPendientesUltimaSemanaPorAlimentador(correoAlimentador),
      obtenerPorcentajeEnProcesoPorAlimentador(correoAlimentador),
      obtenerPorcentajePendientesPorAlimentador(correoAlimentador)
    ]);

    console.log('Promedio de resolución (Alimentador):', promedioResolucion);
    console.log('Pendientes última semana (Alimentador):', pendientesUltimaSemana);
    console.log('Porcentaje en proceso (Alimentador):', porcentajeReportesEnProceso);
    console.log('Porcentaje pendientes (Alimentador):', porcentajeReportesPendientes);

    // Renderizar indicadores numéricos
    datoPromedioResolucion(promedioResolucion);
    datoPendientesUltimaSemana(pendientesUltimaSemana);
    datoPorcentajeEstadisticasEnProceso(porcentajeReportesEnProceso);
    datoPorcentajeEstadisticasPendientes(porcentajeReportesPendientes);

  } catch (error) {
    console.error('No se pudieron cargar las métricas del alimentador:', error);
  }
}

/**
 * Inicialización unificada de componentes cuando el DOM esté listo.
 */
function cargarDashboard() {
  inicializarDashboardAlimentador();
  inicializarDatosAlimentador();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', cargarDashboard);
} else {
  cargarDashboard();
}