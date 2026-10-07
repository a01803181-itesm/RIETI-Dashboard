import { API_URL } from './api_url.mjs';

export async function obtenerReportesPorEstatus(){
    try{
        const response = await fetch(`${API_URL}/v1/reportes/estadisticas/por-estatus`);
        if(!response.ok){
            throw new Error(`Erorr en la peticion: ${response.status}`);

        }

        return await response.json();
    }catch(error){
        console.error('Error al obtener las estadisticas por estatus:', error);
        throw error;
    }
}

export async function obtenerReportesTravesTiempo(){
    try{
        const response = await fetch(`${API_URL}/v1/reportes/estadisticas/fecha`);
        if(!response.ok){
            throw new Error(`Erorr en la peticion: ${response.status}`);

        }

        return await response.json();
    }catch(error){
        console.error('Error al obtener las estadisticas por estatus:', error);
        throw error;
    }
}

export async function obtenerReportesPorMunicipio() {
    try {
        const response = await fetch(`${API_URL}/v1/reportes/estadisticas/municipio`);
        if(!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error('Error al obtener las estadísticas por municipio:', error);
        throw error;
    }
}

export async function obtenerReportesPorAutoridad() {
    try {
        const response = await fetch(`${API_URL}/v1/reportes/estadisticas/por-autoridad`);
        if(!response.ok) {
            throw new Error(`Error al obtener las estadísticas por autoridad: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error('Error al obtener las estad´siticas por autoridad:', error);
        throw error;
    }
}

export async function obtenerCoordenadas() {
    try {
        const response = await fetch(`${API_URL}/v1/reportes/mapa-calor`);
        if(!response.ok) {
            throw new Error(`Error al obtener las coordenadas de los reportes: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error('Error al obtener las coordenadas de los reportes:', error);
        throw error;
    }
}

export async function obtenerEstadisticasPromedioResolucion() {
    try {
        const response = await fetch(`${API_URL}/v1/reportes/estadisticas/promedio-resolucion`);
        if(!response.ok) {
            throw new Error(`Error al obtener las estadísticas de promedio de resolución: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error('Error al obtener las estadísticas del promedio de resolución:', error);
        throw error;
    }
}

export async function obtenerReportesPendientesUltimaSemana() {
    try {
        const response = await fetch(`${API_URL}/v1/reportes/pendientes-ultima-semana`);
        if(!response.ok) {
            throw new Error(`Error al obtener los reportes pendientes de la última semana: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error('Error al obtener los reportes de la última semana:', error);
        throw error;
    }
}

export async function obtenerPorcentajeReportesPendientes() {
    try {
        const response = await fetch(`${API_URL}/v1/reportes/pendientes`);
        if(!response.ok) {
            throw new Error(`Error al obtener el porcentaje de reportes pendientes: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error('Error al obtener el porcentaje de reportes pendientes:', error);
        throw error;
    }
}
