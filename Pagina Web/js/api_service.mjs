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