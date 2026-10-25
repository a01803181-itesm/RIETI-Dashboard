/**
 * @fileoverview Coordina la consulta y representación de reportes municipales.
 * @author Cassandra Vanessa Padilla Barovier (A01753547, ITC)
 * @author Giancarlo Moreno Vázquez (A01803172, ITC)
 * @author Alexander Mejia Tovar (A01803181, ITC)
 * @author César Ariel Rodríguez Sandoval (A01802924, ITC)
 * @author Santiago Abraham Rios Palacios (A01802727, ITC)
 */
import {
    obtenerReportesConEstatusPorAlimentador
} from './api_service.mjs';

import {
    detallesReportesGestionAlimentador
} from './gestionReportesAlimentador.mjs';

// Limita la consulta de reportes al alimentador guardado para la sesión actual.
const correoAlimentador = localStorage.getItem('correoAlimentador') || 'giancarlo.morenov@gmail.com';

/**
 * Consulta los reportes municipales, aplica el filtro de URL y presenta el resultado.
 * @returns {Promise<void>}
 */
async function inicializarDatos() {
    try {
        // Se le pasa correoAlimentador a la función del servicio
        const [ reportes ] = await Promise.all([ obtenerReportesConEstatusPorAlimentador(correoAlimentador) ]);
        
        const urlParams = new URLSearchParams(window.location.search);
        const filtro = urlParams.get('filtro')?.toLowerCase().trim();

        let reportesAFiltrar = reportes;

        // Agrupa los estatus detallados de la API en las categorías del buscador.
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
        detallesReportesGestionAlimentador(reportesAFiltrar);

    } catch (error) {
        console.error('No se pudieron cargar los datos:', error);
    }
}

// Espera a que exista el cuerpo de la tabla antes de renderizar.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarDatos);
} else {
    inicializarDatos();
}