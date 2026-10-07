// js/app.mjs
import { obtenerReportesPorEstatus, obtenerReportesTravesTiempo } from './api_service.mjs';
import { canvasEstadoReportes, canvasReportesTiempo } from './graficas.mjs';

async function inicializarDashboard() {
  try {
    const [reportesPorEstatus, reportesTiempo] = await Promise.all([
      obtenerReportesPorEstatus(),
      obtenerReportesTravesTiempo()
    ]);
    console.log('Reportes por estatus:', reportesPorEstatus);
    console.log('Reportes a través del tiempo:', reportesTiempo);

    //Renderizar las graficas 
    canvasEstadoReportes(reportesPorEstatus);
    canvasReportesTiempo(reportesTiempo);
  } catch (error) {
    console.error('No se pudieron cargar las estadísticas:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarDashboard);
} else {
  inicializarDashboard();
}