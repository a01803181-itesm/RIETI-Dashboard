// js/app.mjs
import {
  obtenerReportesPorEstatus,
  obtenerReportesTravesTiempo,
  obtenerReportesPorMunicipio,
  obtenerReportesPorAutoridad
} from './api_service.mjs';
import {
  canvasEstadoReportes,
  canvasReportesTiempo,
  canvasReportesMunicipio,
  canvasReportesAutoridad
} from './graficas.mjs';

async function inicializarDashboard() {
  try {
    const [
      reportesPorEstatus,
      reportesTiempo,
      reportesMunicipio,
      reportesAutoridad
    ] = await Promise.all([
      obtenerReportesPorEstatus(),
      obtenerReportesTravesTiempo(),
      obtenerReportesPorMunicipio(),
      obtenerReportesPorAutoridad()
    ]);
    console.log('Reportes por estatus:', reportesPorEstatus);
    console.log('Reportes a través del tiempo:', reportesTiempo);
    console.log('Reportes por municipio:', reportesMunicipio);
    console.log('Reportes por autoridad', reportesAutoridad);


    //Renderizar las graficas 
    canvasEstadoReportes(reportesPorEstatus);
    canvasReportesTiempo(reportesTiempo);
    canvasReportesMunicipio(reportesMunicipio);
    canvasReportesAutoridad(reportesAutoridad)
  } catch (error) {
    console.error('No se pudieron cargar las estadísticas:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarDashboard);
} else {
  inicializarDashboard();
}