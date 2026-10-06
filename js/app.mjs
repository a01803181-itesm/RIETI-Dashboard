// js/app.mjs
import { obtenerReportesPorEstatus } from './api_service.mjs';
import { canvasEstadoReportes } from './graficas.mjs';

async function inicializarDashboard() {
  try {
    const reportesPorEstatus = await obtenerReportesPorEstatus();
    console.log('Datos recibidos:', reportesPorEstatus);

    canvasEstadoReportes(reportesPorEstatus);
  } catch (error) {
    console.error('No se pudieron cargar las estadísticas:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarDashboard);
} else {
  inicializarDashboard();
}