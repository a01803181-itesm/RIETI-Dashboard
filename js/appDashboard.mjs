import {
    obtenerCantidadesDeReportes
} from './api_service.mjs';

import {
    datosCantidadDeReportes
} from './dashboard.mjs';

async function inicializarDatos() {
    try {
        const [
            cantidadReportes
        ] = await Promise.all([
            obtenerCantidadesDeReportes()
        ]);
        console.log('Cantidad de reportes:', cantidadReportes);

        datosCantidadDeReportes(cantidadReportes);
    } catch (error) {
        console.error('No se pudieron cargar las cantidades de reportes por estado:', error);
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarDatos);
} else {
    inicializarDatos();
}