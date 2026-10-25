/**
 * @fileoverview Funciones de acceso HTTP a estadísticas, coordenadas y reportes de RIETI.
 * Cada operación devuelve los datos JSON del servicio y propaga los errores de petición.
 * @author Cassandra Vanessa Padilla Barovier (A01753547, ITC)
 * @author Giancarlo Moreno Vázquez (A01803172, ITC)
 * @author Alexander Mejia Tovar (A01803181, ITC)
 * @author César Ariel Rodríguez Sandoval (A01802924, ITC)
 * @author Santiago Abraham Rios Palacios (A01802727, ITC)
 */
import { API_URL } from './api_url.mjs';




// OBTENER REPORTES POR FECHA

/**
 * Obtiene la cantidad del tiempo a través del tiempo.
 * @async
 * @function obtenerReportesAtravesTiempo
 * @returns {Promise<Object>} Promesa que resuelve con los datos por mes.
 * @throws {Error} Si la petición HTTP falla.
 */
export async function obtenerReportesAtravesTiempo(){
    try{
        const response = await fetch(`${API_URL}/v1/reportes/estadisticas/fecha`);
        if(!response.ok){
            throw new Error(`Error en la peticion: ${response.status}`);

        }

        return await response.json();
    }catch(error){
        console.error('Error al obtener las estadisticas por estatus:', error);
        throw error;
    }
}

// OBTENER REPORTES POR MUNICIPIO

/**
 * Obtiene las estadísticas de reportes agrupados por municipio.
 * @async
 * @function obtenerReportesPorMunicipio
 * @returns {Promise<Object>} Promesa que resuelve con los datos por municipio.
 * @throws {Error} Si la petición HTTP falla.
 */
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

// OBTENER REPORTES POR AUTORIDAD

/**
 * Obtiene las estadísticas de reportes agrupados por autoridad.
 * @async
 * @function obtenerReportesPorAutoridad
 * @returns {Promise<Object>} Promesa que resuelve con los datos por autoridad.
 * @throws {Error} Si la petición HTTP falla.
 */
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

// OBTENER COORDENADAS (MAPA DE CALOR)

/**
 * Obtiene las coordenadas geográficas para generar un mapa de calor con los reportes.
 * @async
 * @function obtenerCoordenadas
 * @returns {Promise<Array>} Promesa que resuelve con la lista de coordenadas.
 * @throws {Error} Si la petición HTTP falla
 */
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

// OBTENER REPORTES POR ESTATUS

/**
 * @async
 * @function obtenerReportesPorEstatus
 * @returns {Promise<Object>} Promesa que resuelve con los datos por estatus.
 * @throws {Error} Si la petición HTTP falla
 */
export async function obtenerReportesPorEstatus(){
    try{
        const response = await fetch(`${API_URL}/v1/reportes/estadisticas/por-estatus`);
        if(!response.ok){
            throw new Error(`Error en la petición: ${response.status}`);

        }

        return await response.json();
    }catch(error){
        console.error('Error al obtener las estadísticas por estatus:', error);
        throw error;
    }
}

// OBTENER PROMEDIO RESOLUCIÓN

/**
 * @async
 * @function obtenerEstadisticasPromedioResolucion
 * @returns {Promise<Object>} Promesa que resuelve con los datos de tiempo promedio de resolución.
 * @throws {Error} Si la petición HTTP falla.
 */
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

// OBTENER REPORTES PENDIENTES DE LA ULTIMA SEMANA

/**
 * @async
 * @function obtenerReportesPendientesUltimaSemana
 * @returns {Promise<Array>} Promesa que resuelve con los reportes pendientes recientes.
 * @throws {Error} Si la petición HTTP falla.
 */
export async function obtenerReportesPendientesUltimaSemana() {
    try {
        const response = await fetch(`${API_URL}/v1/reportes/estadisticas/pendientes-ultima-semana`);
        if(!response.ok) {
            throw new Error(`Error al obtener los reportes pendientes de la última semana: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error('Error al obtener los reportes de la última semana:', error);
        throw error;
    }
}

// OBTENER REPORTES PORCENTAJE DE REPORTES PENDIENTES

/**
 * Obtiene el porcentaje total de reportes que se encuentran pendientes.
 * @async
 * @function obtenerPorcentajeReportesPendientes
 * @returns {Promise<Object>} Promesa que resuelve con el porcentaje de pendientes.
 * @throws {Error} Si la petición HTTP falla
 */
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

// OBTENER REPORTES PORCENTAJE DE REPORTES EN PROCESO

/**
 * @async
 * @function obtenerPorcentajeReportesEnProceso
 * @returns {Promise<Object>} Promesa que resuelve con el porcentaje en proceso.
 * @throws {Error} Si la petición HTTP falla.
 */
export async function obtenerPorcentajeReportesEnProceso() {
    try {
        const response = await fetch(`${API_URL}/v1/reportes/en-proceso`);
        if(!response.ok) {
            throw new Error(`Error al obtener el porcentaje de reportes en proceso: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error('Error al obtener el porcentaje de reportes en proceso:', error);
        throw error;
    }
}

/**
 * Obtiene los conteos globales de reportes agrupados por estatus.
 * @returns {Promise<Object>} Cantidades por estado.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerCantidadesDeReportes() {
    try {
        const response = await fetch(`${API_URL}/v1/reportes/por-estatus/cantidad`);
        if(!response.ok) {
            throw new Error(`Error al obtener la cantidad de reportes por estado: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error('Error al obtener la cantidad de reportes por estado:', error);
        throw error;
    }
}

/**
 * Obtiene la distribución global de reportes por rango horario.
 * @returns {Promise<Array<Object>>} Categorías horarias y cantidades.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerReportesRangoHora() {
    try{
        const response = await fetch(`${API_URL}/v1/reportes/estadisticas/por-rango-hora`);
        if(!response.ok){
            throw new Error(`Error al obtener los reportes por hora: ${response.status}`);  
        }
        return await response.json();
    }catch(error){
        console.error('Error al obtener la cantidad de reportes por estado: ', error);
        throw error;
    }
    
}

/**
 * Obtiene los conteos por estatus del ámbito municipal de un alimentador.
 * @param {string} correoAlimentador Correo que identifica al alimentador.
 * @returns {Promise<Array<Object>>} Conteos agrupados por estatus.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerEstatusPorAlimentador(correoAlimentador) {
  try {
    const response = await fetch(
      `${API_URL}/v1/reportes/estadisticas/estatus-por-alimentador/${encodeURIComponent(correoAlimentador)}`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener estatus por alimentador: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener estatus por alimentador:', error);
    throw error;
  }
}

/**
 * Obtiene la serie temporal mensual de reportes de un alimentador.
 * @param {string} correoAlimentador Correo que identifica al alimentador.
 * @returns {Promise<Array<Object>>} Totales de reportes por periodo.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerReportesPorTiempoPorAlimentador(correoAlimentador) {
  try {
    const response = await fetch(
      `${API_URL}/v1/reportes/estadisticas/fecha-por-alimentador/${encodeURIComponent(correoAlimentador)}`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener los reportes por mes: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener los reportes por mes:', error);
    throw error;
  }
}

/**
 * Obtiene la distribución horaria de reportes del alimentador.
 * @param {string} correoAlimentador Correo que identifica al alimentador.
 * @returns {Promise<Array<Object>>} Totales agrupados por hora.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerReportesRangoHoraPorAlimentador(correoAlimentador) {
  try {
    const response = await fetch(
      `${API_URL}/v1/reportes/estadisticas/por-rango-hora-por-alimentador/${encodeURIComponent(correoAlimentador)}`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener los reportes por rango de hora: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener los reportes por rango de hora:', error);
    throw error;
  }
}

/**
 * Obtiene coordenadas de reportes para el mapa de calor municipal.
 * @param {string} correoAlimentador Correo que identifica al alimentador.
 * @returns {Promise<Array<Object>>} Coordenadas geográficas de los reportes.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerCoordenadasMapaPorAlimentador(correoAlimentador) {
  try {
    const response = await fetch(
      `${API_URL}/v1/reportes/mapa-calor/por-alimentador/${encodeURIComponent(correoAlimentador)}`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener coordenadas para el mapa: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener coordenadas para el mapa:', error);
    throw error;
  }
}

/**
 * Obtiene el promedio de resolución de reportes en el ámbito del alimentador.
 * @param {string} correoAlimentador Correo que identifica al alimentador.
 * @returns {Promise<Object>} Métrica de promedio de resolución.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerPromedioResolucionPorAlimentador(correoAlimentador) {
  try {
    const response = await fetch(
      `${API_URL}/v1/reportes/estadisticas/promedio-resolucion/por-alimentador/${encodeURIComponent(correoAlimentador)}`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener el promedio de resolución: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener el promedio de resolución:', error);
    throw error;
  }
}

/**
 * Obtiene el indicador de reportes pendientes de la última semana para el alimentador.
 * @param {string} correoAlimentador Correo que identifica al alimentador.
 * @returns {Promise<Object>} Métrica de reportes pendientes recientes.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerPendientesUltimaSemanaPorAlimentador(correoAlimentador) {
  try {
    const response = await fetch(
      `${API_URL}/v1/reportes/estadisticas/pendientes-ultima-semana/por-alimentador/${encodeURIComponent(correoAlimentador)}`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener reportes pendientes de la última semana: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener reportes pendientes de la última semana:', error);
    throw error;
  }
}

/**
 * Obtiene el porcentaje de reportes en proceso para el ámbito municipal.
 * @param {string} correoAlimentador Correo que identifica al alimentador.
 * @returns {Promise<Object>} Porcentaje de reportes en proceso.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerPorcentajeEnProcesoPorAlimentador(correoAlimentador) {
  try {
    const response = await fetch(
      `${API_URL}/v1/reportes/en-proceso/por-alimentador/${encodeURIComponent(correoAlimentador)}`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener el porcentaje de reportes en proceso: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener el porcentaje de reportes en proceso:', error);
    throw error;
  }
}

/**
 * Obtiene el porcentaje de reportes pendientes para el ámbito municipal.
 * @param {string} correoAlimentador Correo que identifica al alimentador.
 * @returns {Promise<Object>} Porcentaje de reportes pendientes.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerPorcentajePendientesPorAlimentador(correoAlimentador) {
  try {
    const response = await fetch(
      `${API_URL}/v1/reportes/pendientes/por-alimentador/${encodeURIComponent(correoAlimentador)}`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener el porcentaje de reportes pendientes: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener el porcentaje de reportes pendientes:', error);
    throw error;
  }
}

/**
 * Obtiene la colección de reportes con sus datos de detalle y estatus.
 * @returns {Promise<Array<Object>>} Reportes listos para alimentar las tablas.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerDetallesReportes() {
    try{
        const response = await fetch(`${API_URL}/v1/reportes/detalles/estatus`);
        if(!response.ok){
            throw new Error(`Error al obtener los detalles de los reportes con estatus: ${response.status}`);
        }
        return await response.json();
    }catch(error){
        console.error('Error al obtener los detalles de los reportes: ', error);
        throw error;
    }
}

/**
 * Obtiene los datos de un reporte identificado por folio.
 * @param {string} folio Identificador único del reporte.
 * @returns {Promise<Object>} Datos del reporte.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerDetallesReportePorFolio(folio) {
  try {
    const response = await fetch(`${API_URL}/v1/reportes/${encodeURIComponent(folio)}`);
    if(!response.ok) {
      throw new Error(`Error al obtener los detalles del reporte con folio ${folio}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error al obtener los detalles del reporte ${folio}: `, error);
    throw error;
  }
}


/**
 * Obtiene la distribución global de reportes por tipo de trabajo.
 * @returns {Promise<Array<Object>>} Categorías y cantidades de reportes.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerReportesPorTipoTrabajo() {
  try {
    const response = await fetch(`${API_URL}/v1/reportes/estadisticas/tipo-trabajo`);
    if (!response.ok) {
      throw new Error(`Error al obtener los reportes por tipo de trabajo: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener los reportes por tipo de trabajo:', error);
    throw error;
  }
}

/**
 * Obtiene estadísticas por tipo de trabajo del ámbito del alimentador.
 * @param {string} correoAlimentador Correo que identifica al alimentador.
 * @returns {Promise<Array<Object>>} Categorías y cantidades municipales.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerReportesPorTipoTrabajoPorAlimentador(correoAlimentador) {
  try {
    const response = await fetch(
      `${API_URL}/v1/reportes/estadisticas/tipo-trabajo-por-alimentador/${encodeURIComponent(correoAlimentador)}`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener reportes por tipo de trabajo por alimentador: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener reportes por tipo de trabajo por alimentador:', error);
    throw error;
  }
}

/**
 * Obtiene la distribución de reportes por autoridad para el alimentador.
 * @param {string} correoAlimentador Correo que identifica al alimentador.
 * @returns {Promise<Array<Object>>} Autoridades y cantidades.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerReportesPorAutoridadPorAlimentador(correoAlimentador) {
  try {
    const response = await fetch(
      `${API_URL}/v1/reportes/estadisticas/por-autoridad-por-alimentador/${encodeURIComponent(correoAlimentador)}`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener reportes por autoridad por alimentador: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener reportes por autoridad por alimentador:', error);
    throw error;
  }
}

/**
 * Obtiene el detalle del reporte, incluyendo su estatus actual.
 * @param {string} folio Identificador único del reporte.
 * @returns {Promise<Object>} Datos del reporte con estado.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerDetallesReportePorFolioConEstatus(folio) {
  try {
    const response = await fetch(`${API_URL}/v1/reportes/detalles/estatus/${encodeURIComponent(folio)}`);
    if(!response.ok) {
      throw new Error(`Error al obtener los detalles del reporte con folio ${folio}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error al obtener los detalles del reporte ${folio}: `, error);
    throw error;
  }
}

/**
 * Obtiene los reportes con estatus asignados al ámbito de un alimentador.
 * @param {string} correoAlimentador Correo que identifica al alimentador.
 * @returns {Promise<Array<Object>>} Reportes municipales con sus estados.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerReportesConEstatusPorAlimentador(correoAlimentador) {
    try {
        const response = await fetch(
            `${API_URL}/v1/reportes/detalles/estatus/por-alimentador/${encodeURIComponent(correoAlimentador)}`
        );
        if (!response.ok) {
            throw new Error(`Error al obtener los reportes con estatus por alimentador: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al obtener los reportes con estatus por alimentador:', error);
        throw error;
    }
}

/**
 * Obtiene los conteos municipales consolidados por estatus.
 * @param {string} correoAlimentador Correo que identifica al alimentador.
 * @returns {Promise<Object>} Totales, completados, en proceso y pendientes.
 * @throws {Error} Si falla la solicitud HTTP o la lectura de la respuesta.
 */
export async function obtenerCantidadesDeReportesPorAlimentador(correoAlimentador) {
  try {
    const response = await fetch(
      `${API_URL}/v1/reportes/por-estatus/cantidad/por-alimentador/${encodeURIComponent(correoAlimentador)}`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener cantidades de reportes por alimentador: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener cantidades de reportes por alimentador:', error);
    throw error;
  }
}
