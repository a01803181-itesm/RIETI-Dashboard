/**
 * @fileoverview Coordina la consulta y representación de reportes para administración.
 * @author Cassandra Vanessa Padilla Barovier (A01753547, ITC)
 * @author Giancarlo Moreno Vázquez (A01803172, ITC)
 * @author Alexander Mejia Tovar (A01803181, ITC)
 * @author César Ariel Rodríguez Sandoval (A01802924, ITC)
 * @author Santiago Abraham Rios Palacios (A01802727, ITC)
 */
import {
    obtenerDetallesReportes
} from './api_service.mjs';

import {
    detallesReportesGestion
} from './gestionReportes.mjs';

/**
 * Obtiene reportes, aplica el filtro opcional de la URL y genera las filas de la tabla.
 * @returns {Promise<void>}
 */
async function inicializarDatos() {
    try {
        const [ reportes ] = await Promise.all([ obtenerDetallesReportes() ]);
        
        const urlParams = new URLSearchParams(window.location.search);
        const filtro = urlParams.get('filtro')?.toLowerCase().trim();

        let reportesAFiltrar = reportes;

        // Traduce las categorías resumidas de la interfaz a los estatus de la API.
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

// Asegura que la tabla esté creada antes de insertar los reportes.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarDatos);
} else {
    inicializarDatos();
}