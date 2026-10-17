// ----------------------------------------- GRÁFICA REPORTES POR ESTATUS (ALIMENTADOR) -----------------------------------------

/**
 * Renderiza una gráfica de dona con la distribución de los reportes por estatus para el alimentador.
 * Destruye la instancia previa del canvas si existe.
 * 
 * @function canvasEstadoReportes
 * @param {Array<Object>} datos Lista de objetos { categoria: string, total: number }
 */
export function canvasEstadoReportes(datos) {
    const canvas = document.getElementById('grafica-estado-reportes');
    if (!canvas || !Array.isArray(datos)) return;

    // Formatear etiquetas (ej: "1_Registrado" -> "Registrado")
    const labelsEstado = datos.map(item =>
        item.categoria.replace(/^\d+_/, '').replace(/_/g, ' ')
    );
    const valoresEstado = datos.map(item => item.total);

    // Destruir instancia previa de Chart.js si existe
    const chartExistente = Chart.getChart(canvas);
    if (chartExistente) {
        chartExistente.destroy();
    }

    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labelsEstado,
            datasets: [{
                label: 'Reportes por Estatus',
                data: valoresEstado,
                backgroundColor: [
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
                    text: 'Estatus de Reportes en tu Municipio'
                }
            }
        }
    });
}

// ----------------------------------------- GRÁFICA REPORTES A TRAVÉS DEL TIEMPO (ALIMENTADOR) -----------------------------------------

/**
 * Renderiza una gráfica de líneas para la evolución de los reportes por mes.
 * 
 * @function canvasReportesTiempo
 * @param {Array<Object>} datos Lista de objetos { categoria: string, total: number }
 */
export function canvasReportesTiempo(datos) {
    const canvas = document.getElementById('grafica-reportes-por-tiempo');
    if (!canvas || !Array.isArray(datos)) return;

    const chartExistente = Chart.getChart(canvas);
    if (chartExistente) {
        chartExistente.destroy();
    }

    const ctx = canvas.getContext('2d');

    // Invertir copia para orden cronológico
    const datosOrdenados = [...datos].reverse();

    const labels = datosOrdenados.map(item => item.categoria);
    const valores = datosOrdenados.map(item => item.total);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Reportes por mes',
                data: valores,
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
            plugins: {
                title: {
                    display: true,
                    text: 'Reportes a lo Largo del Tiempo'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// ----------------------------------------- GRÁFICA REPORTES POR RANGO DE HORA (ALIMENTADOR) -----------------------------------------

/**
 * Renderiza una gráfica de barras con la distribución por hora del día.
 * 
 * @function canvasReportesRangoHora
 * @param {Array<Object>} datos Lista de objetos { categoria: string, total: number }
 */
export function canvasReportesRangoHora(datos) {
    const canvas = document.getElementById('grafica-reportes-rango-hora');
    if (!canvas || !Array.isArray(datos)) return;

    const chartExistente = Chart.getChart(canvas);
    if (chartExistente) {
        chartExistente.destroy();
    }

    const ctx = canvas.getContext('2d');

    const labels = datos.map(item => `${item.categoria}:00 hrs`);
    const valores = datos.map(item => item.total);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Frecuencia de Reportes por Hora',
                data: valores,
                borderColor: '#b002c7',
                backgroundColor: 'rgba(189, 2, 199, 0.4)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Distribución por Rango Horario'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// ----------------------------------------- MAPA DE CALOR (ALIMENTADOR) -----------------------------------------

let instanciaMapaLeaflet = null;

/**
 * Inicializa un mapa interactivo de Leaflet y dibuja la capa de calor para el municipio.
 * 
 * @function canvasCoordenadas
 * @param {Array<Object>} datos Lista de objetos { lat: number, lng: number }
 */
export function canvasCoordenadas(datos) {
    const contenedorMapa = document.getElementById('contenedor-mapa-calor');
    if (!contenedorMapa || !Array.isArray(datos)) return;

    // Si ya existía una instancia del mapa, la destruimos antes de re-inicializar
    if (instanciaMapaLeaflet) {
        instanciaMapaLeaflet.remove();
        instanciaMapaLeaflet = null;
    }

    // Coordenadas iniciales por defecto (o tomadas del primer punto disponible)
    const centroLat = datos.length > 0 ? datos[0].lat : 19.55;
    const centroLng = datos.length > 0 ? datos[0].lng : -99.20;

    instanciaMapaLeaflet = L.map('contenedor-mapa-calor').setView([centroLat, centroLng], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(instanciaMapaLeaflet);

    const puntosReportes = datos.map(item => [item.lat, item.lng, 1.0]);

    L.heatLayer(puntosReportes, {
        radius: 25,
        blur: 15,
        maxZoom: 13,
        max: 3.0,
        gradient: {
            0.2: '#0284c7',
            0.5: '#f59e0b',
            0.8: '#ef4444',
            1.0: '#991b1b'
        }
    }).addTo(instanciaMapaLeaflet);
}

// ----------------------------------------- INDICADORES NUMÉRICOS / KPIS -----------------------------------------

export function datoPorcentajeEstadisticasPendientes({ data = 0 } = {}) {
    const elemento = document.getElementById('porcentaje-reportes-pendientes');
    if (elemento) {
        elemento.textContent = `${Number(data).toFixed(1)}%`;
    }
}

export function datoPorcentajeEstadisticasEnProceso({ data = 0 } = {}) {
    const elemento = document.getElementById('porcentaje-reportes-en-proceso');
    if (elemento) {
        elemento.textContent = `${Number(data).toFixed(1)}%`;
    }
}

export function datoPromedioResolucion({ data = 0 } = {}) {
    const elemento = document.getElementById('dias-promedio-resolucion');
    if (elemento) {
        elemento.textContent = `${Number(data).toFixed(1)} días`;
    }
}

export function datoPendientesUltimaSemana({ data = 0 } = {}) {
    const elemento = document.getElementById('pendientes-ultima-semana');
    if (elemento) {
        elemento.textContent = `${Number(data)}`;
    }
}

// ----------------------------------------- GRÁFICA REPORTES POR TIPO DE TRABAJO (BARRAS VERTICALES) -----------------------------------------

/**
 * Renderiza una gráfica de barras verticales con la distribución de reportes por tipo de trabajo.
 * 
 * @function canvasReportesTipoTrabajo
 * @param {Array<Object>} datos Lista de objetos { categoria: string, total: number }
 */
export function canvasReportesTipoTrabajo(datos) {
  const canvas = document.getElementById('grafica-reportes-por-categoria');
  if (!canvas || !Array.isArray(datos)) return;

  const chartExistente = Chart.getChart(canvas);
  if (chartExistente) {
    chartExistente.destroy();
  }

  const ctx = canvas.getContext('2d');

  // Formatear etiquetas (ej. "VENTA_AMBULANTE" -> "VENTA AMBULANTE")
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

// ----------------------------------------- GRÁFICA RENDIMIENTO POR AUTORIDAD (BARRAS HORIZONTALES) -----------------------------------------

/**
 * Renderiza una gráfica de barras HORIZONTALES con el total de reportes asignados por autoridad/alimentador.
 * 
 * @function canvasReportesPorAutoridad
 * @param {Array<Object>} datos Lista de objetos { categoria: string, total: number }
 */
export function canvasReportesPorAutoridad(datos) {
  const canvas = document.getElementById('grafica-rendimiento-por-autoridad');
  if (!canvas || !Array.isArray(datos)) return;

  const chartExistente = Chart.getChart(canvas);
  if (chartExistente) {
    chartExistente.destroy();
  }

  const ctx = canvas.getContext('2d');

  const labels = datos.map(item => item.categoria);
  const valores = datos.map(item => item.total);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Reportes Asignados',
        data: valores,
        borderColor: '#5b02c7',
        backgroundColor: 'rgba(107, 2, 199, 0.4)',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y', // Convertir la gráfica de barras en Horizontal
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: 'Carga de Trabajo por Autoridad Local'
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { stepSize: 1 }
        }
      }
    }
  });
}