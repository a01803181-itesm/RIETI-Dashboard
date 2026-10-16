import {
    obtenerCantidadesDeReportes,
    obtenerDetallesReportes
} from './api_service.mjs';

import {
    datosCantidadDeReportes,
    detallesReportes
} from './dashboard.mjs';

async function inicializarDatos() {
    try {
        const [
            cantidadReportes,
            reportes
        ] = await Promise.all([
            obtenerCantidadesDeReportes(),
            obtenerDetallesReportes()
        ]);
        console.log('Cantidad de reportes:', cantidadReportes);
        console.log('Reportes: ', reportes);

        datosCantidadDeReportes(cantidadReportes);
        detallesReportes(reportes);
    } catch (error) {
        console.error('No se pudieron cargar los datos:', error);
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarDatos);
} else {
    inicializarDatos();
}