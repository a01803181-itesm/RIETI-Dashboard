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
            throw new Error(`Error al obtener las estadísticas por autoridad:`, error);
        }

        return await response.json();
    } catch(error) {
        console.error('Error al obtener las estad´siticas por autoridad:', error);
        throw error;
    }
}