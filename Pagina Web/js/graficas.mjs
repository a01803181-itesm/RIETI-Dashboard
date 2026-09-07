// ----------------------------------------- GRÁFICA ESTADO DE LOS REPORTES -----------------------------------------
const canvasEstadoReportes = document.getElementById('grafica-estado-reportes');
if(canvasEstadoReportes) {
    const ctxEstadoReportes = canvasEstadoReportes.getContext('2d');
    
    const labelsEstadoReportes = ['Completados', 'En Progreso', 'Pendientes']
    const valoresEstadoReportes = [5, 2, 3]
    
    // Gráfica Estado Reportes
    new Chart(ctxEstadoReportes, {
        type: 'doughnut',
        data: {
            labels: labelsEstadoReportes,
            datasets: [{
                label: 'Municipio Atizapán de Zaragoza',
                data: valoresEstadoReportes,
                backgroundColor: [
                    'rgba(0, 208, 114, 0.5)',
                    'rgba(255, 255, 0, 0.5)',
                    'rgba(255, 0, 0, 0.5)'
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
                    text: 'Reportes por Municipio'
                }
            }
        }
    });
}


// ----------------------------------------- GRÁFICA REPORTES A TRAVÉS DEL TIEMPO -----------------------------------------
const canvasReportesTeimpo = document.getElementById('grafica-reportes-por-tiempo');
if(canvasReportesTeimpo) {
    const ctxReportesPorTiempo = canvasReportesTeimpo.getContext('2d');
    
    const labelsReportesPorTiempo = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const valoresReportesPorTiempo = [5.5, 5, 6.5, 6, 7.5, 7, 8.5, 8, 9.5, 9, 10.5, 10]

    // Gráfica Reportes por Tiempo
    new Chart(ctxReportesPorTiempo, {
        type: 'line',
        data: {
            labels: labelsReportesPorTiempo,
            datasets: [{
                label: 'Reportes Por Tiempo',
                data: valoresReportesPorTiempo,
                borderColor: '#0284c7',
                backgroundColor: 'rgba(2, 132, 199, 0.1)',
                fill: true
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
                    beginAtZero: true
                }

            }
        }
    });
}

// ----------------------------------------- GRÁFICA REPORTES POR MUNICIPIO -----------------------------------------
const canvasReportesMunicipio = document.getElementById('grafica-reportes-por-municipio');
if(canvasReportesMunicipio) {
    const ctxReportesMunicipio = canvasReportesMunicipio.getContext('2d');

    const labelResportesMunicipio = ['Naucalpan', 'Atizapán', 'Izcalli', 'Ecatepec', 'Jilotzingo', 'Tultitlán', 'Coacalco']
    const valoresReportesMunicipio = [10, 2, 6, 4, 12, 5, 7]

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
const canvasReportesRangoHora = document.getElementById('grafica-reportes-rango-hora');
if(canvasReportesRangoHora) {
    const ctxReportesRangoHora = canvasReportesRangoHora.getContext('2d');

    const labelResportesRangoHora = ['8:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00', '20:00 - 22:00']
    const valoresReporteRangoHora = [10, 2, 6, 4, 12, 5, 7]

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
const canvasRendimientoAutoridad = document.getElementById('grafica-rendimiento-por-autoridad');
if(canvasRendimientoAutoridad) {
    const ctxRendimientoAutoridad = canvasRendimientoAutoridad.getContext('2d');
    
    const labelsRendimientoAutoridad = ['Pedro Vázquez', 'Alexander Mejía', 'Giancarlo Moreno', 'César Rodríguez']
    const valoresRendimientoAutoridad = [63, 47, 52, 81]

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
const contenedorMapa = document.getElementById('contenedor-mapa-calor');

if (contenedorMapa) {
    // 1. Inicializar mapa centrado en el Estado de México (Coordenadas: Lat, Lng, Zoom)
    const mapa = L.map('contenedor-mapa-calor').setView([19.36, -99.45], 9);

    // 2. Capa base de mapa (OpenStreetMap con estilo claro/neutro)
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
        

    // 3. Matriz de puntos de reportes [Latitud, Longitud, Intensidad (0.0 a 1.0)]
    const puntosReportes = [
        // Ecatepec (Alta concentración)
        [19.6018, -99.0506, 0.9],
        [19.6050, -99.0480, 0.8],
        [19.5980, -99.0550, 1.0],
        [19.6100, -99.0400, 0.7],

        // Naucalpan de Juárez
        [19.4785, -99.2396, 0.8],
        [19.4820, -99.2310, 0.6],
        [19.4700, -99.2450, 0.9],

        // Atizapán de Zaragoza
        [19.5574, -99.2543, 0.5],
        [19.5610, -99.2500, 0.4],

        // Cuautitlán Izcalli
        [19.6480, -99.2132, 0.7],
        [19.6520, -99.2100, 0.6],

        // Toluca
        [19.2826, -99.6557, 0.8],
        [19.2880, -99.6500, 0.7],
        [19.2750, -99.6600, 0.9],

        // Jilotzingo
        [19.5218, -99.3900, 0.3],

        // Tultitlán
        [19.6350, -99.1680, 0.6]
    ];

    // 4. Configurar e instanciar la capa de mapa de calor
    const mapaCalor = L.heatLayer(puntosReportes, {
        radius: 25,       // Radio de alcance de cada punto en píxeles
        blur: 15,         // Nivel de difuminado del calor
        maxZoom: 13,      // Zoom máximo donde el calor alcanza máxima intensidad
        max: 1.0,         // Valor máximo de densidad
        gradient: {       // Escala de colores según la densidad (de 0.0 a 1.0)
            0.2: '#0284c7', // Azul (Baja densidad)
            0.5: '#f59e0b', // Amarillo/Naranja (Media densidad)
            0.8: '#ef4444', // Rojo (Alta densidad)
            1.0: '#991b1b'  // Rojo Oscuro (Crítico)
        }
    }).addTo(mapa);
}