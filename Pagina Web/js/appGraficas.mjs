// js/app.mjs
import {
  obtenerReportesPorEstatus,
  obtenerReportesTravesTiempo,
  obtenerReportesPorMunicipio,
  obtenerReportesPorAutoridad,
  obtenerCoordenadas
} from './api_service.mjs';
import {
  canvasEstadoReportes,
  canvasReportesTiempo,
  canvasReportesMunicipio,
  canvasReportesAutoridad,
  canvasCoordenadas
} from './graficas.mjs';

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
      obtenerReportesTravesTiempo(),
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarDashboard);
} else {
  inicializarDashboard();
}