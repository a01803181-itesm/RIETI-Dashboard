import {
    obtenerReportesConEstatusPorAlimentador
} from './api_service.mjs';

import {
    detallesReportesGestionAlimentador
} from './gestionReportesAlimentador.mjs';

// Obtener el correo del alimentador (desde localStorage o valor por defecto)
const correoAlimentador = localStorage.getItem('correoAlimentador') || 'giancarlo.morenov@gmail.com';

async function inicializarDatos() {
    try {
        // Se le pasa correoAlimentador a la función del servicio
        const [ reportes ] = await Promise.all([ obtenerReportesConEstatusPorAlimentador(correoAlimentador) ]);
        
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
        detallesReportesGestionAlimentador(reportesAFiltrar);

    } catch (error) {
        console.error('No se pudieron cargar los datos:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarDatos);
} else {
    inicializarDatos();
}