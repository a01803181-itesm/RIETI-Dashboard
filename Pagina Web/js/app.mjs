// js/app.mjs
import { obtenerReportesPorEstatus, obtenerReportesTravesTiempo, obtenerReportesPorMunicipio } from './api_service.mjs';
import { canvasEstadoReportes, canvasReportesTiempo, canvasReportesMunicipio } from './graficas.mjs';

async function inicializarDashboard() {
  try {
    const [reportesPorEstatus, reportesTiempo, reportesMunicipio] = await Promise.all([
      obtenerReportesPorEstatus(),
      obtenerReportesTravesTiempo(),
      obtenerReportesPorMunicipio()
    ]);
    console.log('Reportes por estatus:', reportesPorEstatus);
    console.log('Reportes a través del tiempo:', reportesTiempo);
    console.log('Reportes a través del tiempo:', reportesTiempo);


    //Renderizar las graficas 
    canvasEstadoReportes(reportesPorEstatus);
    canvasReportesTiempo(reportesTiempo);
    canvasReportesMunicipio(reportesMunicipio);
  } catch (error) {
    console.error('No se pudieron cargar las estadísticas:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarDashboard);
} else {
  inicializarDashboard();
}