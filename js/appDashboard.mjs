/**
 * @fileoverview Obtiene y presenta los indicadores y reportes del dashboard administrativo.
 * @author Cassandra Vanessa Padilla Barovier (A01753547, ITC)
 * @author Giancarlo Moreno Vázquez (A01803172, ITC)
 * @author Alexander Mejia Tovar (A01803181, ITC)
 * @author César Ariel Rodríguez Sandoval (A01802924, ITC)
 * @author Santiago Abraham Rios Palacios (A01802727, ITC)
 */
import {
    obtenerCantidadesDeReportes,
    obtenerDetallesReportes
} from './api_service.mjs';

import {
    datosCantidadDeReportes,
    detallesReportes
} from './dashboard.mjs';

/**
 * Consulta en paralelo los conteos y reportes recientes y actualiza el dashboard.
 * Los fallos se registran sin interrumpir la carga de otros módulos de la página.
 * @returns {Promise<void>}
 */
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


// Espera a que los destinos HTML existan antes de actualizar el dashboard.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarDatos);
} else {
    inicializarDatos();
}