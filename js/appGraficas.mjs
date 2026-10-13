// js/app.mjs
import {
  obtenerReportesPorEstatus,
  obtenerReportesAtravesTiempo,
  obtenerReportesPorMunicipio,
  obtenerReportesPorAutoridad,
  obtenerCoordenadas,
  obtenerEstadisticasPromedioResolucion,
  obtenerReportesPendientesUltimaSemana,
  obtenerPorcentajeReportesEnProceso,
  obtenerPorcentajeReportesPendientes,
} from './api_service.mjs';
import {
  canvasEstadoReportes,
  canvasReportesTiempo,
  canvasReportesMunicipio,
  canvasReportesAutoridad,
  canvasCoordenadas,
  datoPromedioResolucion,
  datoPendientesUltimaSemana,
  datoPorcentajeEstadisticasEnProceso,
  datoPorcentajeEstadisticasPendientes
} from './graficas.mjs';

/**
 * Inicializa el dashboard principal de la aplicación.
 * Realiza peticiones concurrentes para obtener todas las estadísticas necesarias
 * y posteriormente renderiza cada una de las gráficas correspondientes.
 * 
 * @async
 * @function inicializarDashboard
 * @returns {Promise<void>} No retorna ningún valor, solo ejecuta efectos secundarios en la interfaz.
 * @throws {Error} Captura y registra en consola si ocurre un error al cargar o renderizar las estadísticas.
 */
async function inicializarDashboard() {
  try {
    const [
      reportesPorEstatus,
      reportesTiempo,
      reportesMunicipio,
      reportesAutoridad,
      reportesCoordenadas
    ] = await Promise.all([
      obtenerReportesPorEstatus(),
      obtenerReportesAtravesTiempo(),
      obtenerReportesPorMunicipio(),
      obtenerReportesPorAutoridad(),
      obtenerCoordenadas()
    ]);
    console.log('Reportes por estatus:', reportesPorEstatus);
    console.log('Reportes a través del tiempo:', reportesTiempo);
    console.log('Reportes por municipio:', reportesMunicipio);
    console.log('Reportes por autoridad', reportesAutoridad);
    console.log('Reportes coordenadas (mapa de calor)', reportesCoordenadas);


    //Renderizar las graficas 
    canvasEstadoReportes(reportesPorEstatus);
    canvasReportesTiempo(reportesTiempo);
    canvasReportesMunicipio(reportesMunicipio);
    canvasReportesAutoridad(reportesAutoridad);
    canvasCoordenadas(reportesCoordenadas);
    
  } catch (error) {
    console.error('No se pudieron cargar las estadísticas:', error);
  }
}


async function inicializarDatos() {
  try {
    const [
      promedioResolucion,
      pendientesUltimaSemana,
      porcentajeReportesEnProceso,
      porcentajeReportesPendientes
    ] = await Promise.all([
      obtenerEstadisticasPromedioResolucion(),
      obtenerReportesPendientesUltimaSemana(),
      obtenerPorcentajeReportesEnProceso(),
      obtenerPorcentajeReportesPendientes()
    ]);
    console.log('Promedio de resolución:', promedioResolucion);
    console.log('Pendientes última semana:', pendientesUltimaSemana);
    console.log('Porcentaje en proceso:', porcentajeReportesEnProceso);
    console.log('Porcentaje pendientes:', porcentajeReportesPendientes);

    datoPromedioResolucion(promedioResolucion);
    datoPendientesUltimaSemana(pendientesUltimaSemana);
    datoPorcentajeEstadisticasEnProceso(porcentajeReportesEnProceso);
    datoPorcentajeEstadisticasPendientes(porcentajeReportesPendientes);

  } catch (error) {
    console.error('No se pudieron cargar los datos de las estadísticas:', error);
  }
}


/**
 * Escucha el estado del DOM para asegurar que la página esté completamente cargada 
 * antes de inicializar el dashboard. Si el documento ya está listo, lo ejecuta de inmediato.
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarDashboard);
} else {
  inicializarDashboard();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarDatos);
} else {
  inicializarDatos();
}