import {
    obtenerDetallesReportes
} from './api_service.mjs';

import {
    detallesReportesGestion
} from './gestionReportes.mjs';

async function inicializarDatos() {
    try {
        const [
            reportes
        ] = await Promise.all([
            obtenerDetallesReportes()
        ]);
        console.log('Reportes:', reportes);

        detallesReportesGestion(reportes);
    } catch (error) {
        console.error('No se pudieron cargar los datos:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarDatos);
} else {
    inicializarDatos();
}