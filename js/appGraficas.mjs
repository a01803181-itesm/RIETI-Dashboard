// js/app.mjs
/**
 * @fileoverview Carga las métricas administrativas y conecta los datos con sus gráficas.
 * @author Cassandra Vanessa Padilla Barovier (A01753547, ITC)
 * @author Giancarlo Moreno Vázquez (A01803172, ITC)
 * @author Alexander Mejia Tovar (A01803181, ITC)
 * @author César Ariel Rodríguez Sandoval (A01802924, ITC)
 * @author Santiago Abraham Rios Palacios (A01802727, ITC)
 */
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
  obtenerReportesRangoHora,
  obtenerReportesPorTipoTrabajo

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
  datoPorcentajeEstadisticasPendientes,
  canvasReportesRangoHora,
  canvaReportesTipoTrabajo
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
      reportesCoordenadas,
      reportesHora,
      reportesTrabajo
    ] = await Promise.all([
      obtenerReportesPorEstatus(),
      obtenerReportesAtravesTiempo(),
      obtenerReportesPorMunicipio(),
      obtenerReportesPorAutoridad(),
      obtenerCoordenadas(),
      obtenerReportesRangoHora(),
      obtenerReportesPorTipoTrabajo()
    ]);
    console.log('Reportes por estatus:', reportesPorEstatus);
    console.log('Reportes a través del tiempo:', reportesTiempo);
    console.log('Reportes por municipio:', reportesMunicipio);
    console.log('Reportes por autoridad', reportesAutoridad);
    console.log('Reportes coordenadas (mapa de calor)', reportesCoordenadas);
    console.log('Reportes por rango de hora', reportesHora);
    console.log('Reportes por tipo de trabajo', reportesTrabajo);


    //Renderizar las graficas 
    canvasEstadoReportes(reportesPorEstatus);
    canvasReportesTiempo(reportesTiempo);
    canvasReportesMunicipio(reportesMunicipio);
    canvasReportesAutoridad(reportesAutoridad);
    canvasCoordenadas(reportesCoordenadas);
    canvasReportesRangoHora(reportesHora);
    canvaReportesTipoTrabajo(reportesTrabajo);
    
  }catch(error) {
    console.error('No se pudieron cargar las estadísticas:', error);
  }
}


/**
 * Carga los indicadores numéricos y los coloca en sus elementos HTML.
 * @returns {Promise<void>}
 */
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
// Inicializa cada grupo de componentes después de que se construya el DOM.
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