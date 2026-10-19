import {
    obtenerDetallesReportes
} from './api_service.mjs';

import {
    detallesReportesGestion
} from './gestionReportes.mjs';

async function inicializarDatos() {
    try {
        const [ reportes ] = await Promise.all([ obtenerDetallesReportes() ]);
        
        const urlParams = new URLSearchParams(window.location.search);
        const filtro = urlParams.get('filtro')?.toLowerCase().trim();

        let reportesAFiltrar = reportes;

        if (filtro) {
            reportesAFiltrar = reportes.filter(reporte => {
                const estatus = (reporte.estatus || '').toLowerCase();

                if (filtro === 'pendiente') {
                    return estatus.includes('registrado') || estatus.includes('revision');
                }
                if (filtro === 'en progreso' || filtro === 'en proceso') {
                    return estatus.includes('seguimiento');
                }
                if (filtro === 'completado' || filtro === 'concluido') {
                    return estatus.includes('concluido') || estatus.includes('canalizado');
                }
                return true;
            });
        }

        // Se pintan únicamente los reportes que pasaron el filtro
        detallesReportesGestion(reportesAFiltrar);


    } catch (error) {
        console.error('No se pudieron cargar los datos:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarDatos);
} else {
    inicializarDatos();
}