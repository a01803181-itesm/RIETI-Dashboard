// ----------------------------------------- GRÁFICA REPORTES SEGUN SU ESTADO -----------------------------------------

/**
 * Renderiza una gráfica de dona con la distribución de los reportes según su estatus.
 * Destruye cualquier instancia previa asociada al canvas para evitar conflictos de Chart.js.
 * 
 * @function canvasEstadoReportes
 * @param {Array<Object>} datos - Lista de objetos con la información de los reportes (ej. { categoria: "2_En_revision", total: 10 }).
 * @returns {void}
 */
export function canvasEstadoReportes(datos) {
    const canvas = document.getElementById('grafica-estado-reportes');
    if (!canvas) return;

    // Formatear etiquetas (ej: "2_En_revision" -> "En revision")
    const labelsEstadoReportes = datos.map(item =>
        item.categoria.replace(/^\d+_/, '').replace(/_/g, ' ')
    );
    const valoresEstadoReportes = datos.map(item => item.total);

    // Destruir instancia previa si el gráfico ya se había dibujado
    const chartExistente = Chart.getChart(canvas);
    if (chartExistente) {
        chartExistente.destroy();
    }

    const ctxEstadoReportes = canvas.getContext('2d');

    new Chart(ctxEstadoReportes, {
        type: 'doughnut',
        data: {
            labels: labelsEstadoReportes,
            datasets: [{
                label: 'Municipio Atizapán de Zaragoza',
                data: valoresEstadoReportes,
                backgroundColor: [
                    // 'rgba(0, 208, 114, 0.6)',
                    // 'rgba(255, 255, 0, 0.6)',
                    // 'rgba(255, 0, 0, 0.6)',
                    '#74fdb6',
                    '#f96868',
                    '#fcdd61',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 81, 209, 0.6)',
                    'rgb(0, 255, 238)'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Reportes por Estatus'
                }
            }
        }
    });
}
// ----------------------------------------- GRÁFICA REPORTES A TRAVÉS DEL TIEMPO -----------------------------------------
// js/graficas.mjs

/**
 * Renderiza una gráfica de líneas para mostrar la evolución de los reportes a lo largo del tiempo.
 * 
 * @function canvasReportesTiempo
 * @param {Array<Object>} datos - Lista de objetos con fecha/periodo y su respectivo total.
 * @returns {void}
 */
export function canvasReportesTiempo(datos) {
    const canvasReportesTiempo = document.getElementById('grafica-reportes-por-tiempo');
    if (!canvasReportesTiempo || !Array.isArray(datos)) return;

    const ctxReportesPorTiempo = canvasReportesTiempo.getContext('2d');

    // Invertimos una copia del arreglo para mostrar los meses de más antiguo a más reciente
    const datosOrdenados = [...datos].reverse();

    // Extraemos 'categoria' para los labels y 'total' para los valores
    const labelsReportesPorTiempo = datosOrdenados.map(item => item.categoria);
    const valoresReportesPorTiempo = datosOrdenados.map(item => item.total);

    new Chart(ctxReportesPorTiempo, {
        type: 'line',
        data: {
            labels: labelsReportesPorTiempo,
            datasets: [{
                label: 'Reportes por tiempo',
                data: valoresReportesPorTiempo,
                borderColor: '#0284c7',
                backgroundColor: 'rgba(2, 132, 199, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            stacked: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Reportes a lo largo del tiempo'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1 // Asegura que solo muestre números enteros para los reportes
                    }
                }
            }
        }
    });
}
// ----------------------------------------- GRÁFICA REPORTES POR MUNICIPIO -----------------------------------------

/**
 * Renderiza una gráfica de barras con la cantidad de reportes agrupados por municipio.
 * 
 * @function canvasReportesMunicipio
 * @param {Array<Object>} datos - Lista de objetos que contienen la categoría del municipio y el total.
 * @returns {void}
 */
export function canvasReportesMunicipio(datos) {
    const canvasReportesMunicipio = document.getElementById('grafica-reportes-por-municipio');
    if (!canvasReportesMunicipio || !Array.isArray(datos)) return;

    const ctxReportesMunicipio = canvasReportesMunicipio.getContext('2d');

    const labelResportesMunicipio = datos.map(item => item.categoria);
    const valoresReportesMunicipio = datos.map(item => item.total);

    //Gráficas Reportes por Municipio
    new Chart(ctxReportesMunicipio, {
        type: 'bar',
        data: {
            labels: labelResportesMunicipio,
            datasets: [
                {
                    label: 'Reportes por Municipio',
                    data: valoresReportesMunicipio,
                    borderColor: '#c77802',
                    backgroundColor: 'rgba(199, 107, 2, 0.4)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Reportes por Municipio'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

    });
}

// ----------------------------------------- GRÁFICA REPORTES POR RANGO DE HORA -----------------------------------------

/**
 * Renderiza una gráfica estática de barras con la distribución de reportes según el rango horario.
 */


export function canvasReportesRangoHora(datos) {
    const canvasReportesRangoHora = document.getElementById('grafica-reportes-rango-hora');
    if (!canvasReportesRangoHora || !Array.isArray(datos)) return;

    const ctxReportesRangoHora = canvasReportesRangoHora.getContext('2d');

    const labelResportesRangoHora = datos.map(item => item.categoria);
    const valoresReporteRangoHora = datos.map(item => item.total)

    //Gráficas Reportes por Municipio
    new Chart(ctxReportesRangoHora, {
        type: 'bar',
        data: {
            labels: labelResportesRangoHora,
            datasets: [
                {
                    label: 'Reportes por Municipio',
                    data: valoresReporteRangoHora,
                    borderColor: '#b002c7',
                    backgroundColor: 'rgba(189, 2, 199, 0.4)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Reportes por Municipio'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

    });
}

// ----------------------------------------- GRÁFICA RENDIMIENTO POR AUTORIDAD -----------------------------------------

/**
 * Renderiza una gráfica de barras horizontales con el rendimiento o carga de trabajo por autoridad.
 * 
 * @function canvasReportesAutoridad
 * @param {Array<Object>} datos - Lista de objetos con la autoridad correspondiente y su total de reportes.
 * @returns {void}
 */
export function canvasReportesAutoridad(datos) {
    const canvasRendimientoAutoridad = document.getElementById('grafica-rendimiento-por-autoridad');
    const ctxRendimientoAutoridad = canvasRendimientoAutoridad.getContext('2d');

    if (!canvasReportesMunicipio || !Array.isArray(datos)) return;


    const labelsRendimientoAutoridad = datos.map(item => item.categoria);
    const valoresRendimientoAutoridad = datos.map(item => item.total);

    //Gráfica Rendimiento por Autoridad
    new Chart(ctxRendimientoAutoridad, {
        type: 'bar',
        data: {
            labels: labelsRendimientoAutoridad,
            datasets: [
                {
                    label: 'Rendimiento por Autoridad',
                    data: valoresRendimientoAutoridad,
                    borderColor: '#5b02c7',
                    backgroundColor: 'rgba(107, 2, 199, 0.4)',

                }
            ]
        },
        options: {
            indexAxis: 'y',
            elements: {
                bar: {
                    borderWidth: 2
                },
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Gráfica Rendimiento por Autoridad'
                }
            }
        }
    })
}



// ----------------------------------------- MAPA DE CALOR -----------------------------------------

// js/graficas.mjs


/**
 * Inicializa un mapa interactivo de Leaflet y dibuja una capa de calor basada en las coordenadas de los reportes.
 * 
 * @function canvasCoordenadas
 * @param {Array<Object>} datos - Lista de objetos que contienen latitud y longitud (ej. { lat: 19.5, lng: -99.2 }).
 * @returns {void}
 */
export function canvasCoordenadas(datos) {
    const contenedorMapa = document.getElementById('contenedor-mapa-calor');

    if (contenedorMapa && Array.isArray(datos)) {
        // 1. Inicializar el mapa centrado en el Estado de México
        const mapa = L.map('contenedor-mapa-calor').setView([19.55, -99.20], 10);

        // 2. Capa base de mapa
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapa);

        // 3. Mapear los datos que vienen del servidor: [{lat, lng}, ...] a [lat, lng, intensidad]
        const puntosReportes = datos.map(item => [item.lat, item.lng, 1.0]);

        // 4. Instanciar el mapa de calor
        L.heatLayer(puntosReportes, {
            radius: 25,       // Radio en píxeles de cada punto
            blur: 15,         // Difuminado
            maxZoom: 13,      // Nivel de zoom donde el calor alcanza la máxima densidad
            max: 3.0,         // Define cuántos puntos superpuestos se necesitan para llegar al rojo oscuro
            gradient: {
                0.2: '#0284c7', // Azul
                0.5: '#f59e0b', // Amarillo / Naranja
                0.8: '#ef4444', // Rojo
                1.0: '#991b1b'  // Rojo Oscuro
            }
        }).addTo(mapa);
    }
}

// export function datoPorcentajeEstadisticasPendientes(dato) {
//     const porcentaje = document.getElementById('porcentaje-reportes-pendientes');

//     porcentaje.textContent = String(dato)
// }

export function datoPorcentajeEstadisticasPendientes({ data = 0 } = {}) {
    const elemento = document.getElementById('porcentaje-reportes-pendientes');
    if (elemento) {
        elemento.textContent = `${Number(data).toFixed(1)}`;
    }
}

// export function datoPorcentajeEstadisticasEnProceso(dato) {
//     const porcentaje = document.getElementById('porcentaje-reportes-en-proceso');

//     porcentaje.textContent = String(dato)
// }

export function datoPorcentajeEstadisticasEnProceso({ data = 0 } = {}) {
    const elemento = document.getElementById('porcentaje-reportes-en-proceso');
    if (elemento) {
        elemento.textContent = `${Number(data).toFixed(1)}`;
    }
}

// export function datoPromedioResolucion(dato) {
//     const porcentaje = document.getElementById('dias-promedio-resolucion');

//     porcentaje.textContent = String(dato)
// }

export function datoPromedioResolucion({ data = 0 } = {}) {
    const elemento = document.getElementById('dias-promedio-resolucion');
    if (elemento) {
        elemento.textContent = `${Number(data)}`;
    }
}

// export function datoPendientesUltimaSemana(dato) {
//     const porcentaje = document.getElementById('pendientes-ultima-semana');

//     porcentaje.textContent = String(dato)
// }

export function datoPendientesUltimaSemana({ data = 0 } = {}) {
    const elemento = document.getElementById('pendientes-ultima-semana');
    if (elemento) {
        elemento.textContent = `${Number(data)}`;
    }
}

// ----------------------------------------- GRÁFICA REPORTES POR TIPO DE TRABAJO -----------------------------------------

/**
 * Renderiza una gráfica de barras verticales con la distribución de reportes por tipo de trabajo.
 * 
 * @function canvasReportesTipoTrabajo
 * @param {Array<Object>} datos Lista de objetos { categoria: string, total: number }
 */


export function canvaReportesTipoTrabajo(datos) {
    // Busca la ID definida en tu HTML de estadísticas generales
    const canvas = document.getElementById('grafica-tipo-trabajo') || document.getElementById('grafica-reportes-por-categoria');
    if (!canvas || !Array.isArray(datos)) return;

    const chartExistente = Chart.getChart(canvas);
    if (chartExistente) {
        chartExistente.destroy();
    }

    const ctx = canvas.getContext('2d');

    const labels = datos.map(item => item.categoria.replace(/_/g, ' '));
    const valores = datos.map(item => item.total);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Reportes por Tipo de Trabajo',
                data: valores,
                borderColor: '#c77802',
                backgroundColor: 'rgba(199, 107, 2, 0.4)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Distribución por Tipo de Trabajo'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}