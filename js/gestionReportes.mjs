import {
    API_URL
} from './api_url.mjs';


export function modificarDetallesModal(estado) {
    const estadoModal = document.getElementById('estado-actual-modal');
    estadoModal.textContent = estado;
}

export function detallesReportesGestion(datos) {
    // DATOS TABLA
    const tbody = document.getElementById('cuerpo-tabla');

    const filasHTML = datos.map(item => {

        const folio = item.folio;
        const municipio = item.municipio;

        const initialEstatus = item.estatus;
        const estatusSplited = initialEstatus.split('_');
        const estatus = estatusSplited.slice(1).join(' ');
        const classEstatus = estatusSplited.slice(1).join('-').toLowerCase();

        const initialFecha = item.dia;
        const fechaSplited = initialFecha.split('T')[0];
        const fechaTemp = fechaSplited.split('-')
        const fecha = fechaTemp[2] + '-' + fechaTemp[1] + '-' + fechaTemp[0];

        const accion = `
        <td>
            <div class="contenedor-boton-split">
                <button class="boton-ver">Ver</button>
                <div class="dropdown">
                    <button type="button" class="boton-dropdown">
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>
                    <div class="contenido-dropdown">
                        <button type="button" class="opciones-contenido boton-asignar-estado">
                            <i class="fa-solid fa-user-shield"></i>
                            Asignar Estado
                        </button>
                        <button type="button" class="opciones-contenido boton-asignar-autoridad">
                            <i class="fa-solid fa-user-shield"></i>
                            Asignar Autoridad
                        </button>
                        <hr class="divisor-dropdown">
                        <button type="button" class="opciones-contenido boton-eliminar">
                            <i class="fa-solid fa-trash"></i>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </td>
        `;

        modificarDetallesModal(estatus);

        return `
        <tr>
            <td>${folio}</td>
            <td>${municipio}</td>
            <td>${fecha}</td>
            <td><span class="status status-${classEstatus}">${estatus}</span></td>
            ${accion}
        </tr>
        `;
    }).join('');

    tbody.innerHTML = filasHTML;
}

// -------------------------------- BUSCADOR --------------------------------
const botonBuscar = document.getElementById('botonBuscar');
const buscador = document.getElementById('buscador');

botonBuscar.addEventListener('click', function() {
    const valor = buscador.value.trim().toLowerCase();
    const rows = document.querySelectorAll('#cuerpo-tabla tr');
    
    rows.forEach(row => {
        const textoFila = row.textContent.toLowerCase();

        if(textoFila.includes(valor)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    })
});


// -------------------------------- LIMPIAR BUSCADOR --------------------------------
buscador.addEventListener('input', function() {
    const valor = this.value.trim().toLowerCase();
    const rows = document.querySelectorAll('#cuerpo-tabla tr');

    if (valor === '') {
        rows.forEach(row => {
            row.style.display = '';
        });
    }
});


// -------------------------------- FUNCIONAMIENTO DE BUSCADOR CON ENTER --------------------------------
buscador.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        botonBuscar.click();
    }
});


// -------------------------------- BOTON VER --------------------------------
document.addEventListener('click', async function(event) {
    const botonVer = event.target.closest('.boton-ver');
    // const padre = ((botonVer.parentElement).parentElement).parentElement;
    const padre = botonVer.closest('tr');
    const hijo = padre.children[0];
    const folio = hijo.textContent;

    if(botonVer) {
        console.log('Ver detalles del folio:', folio);
        console.log('El elemento padre es: ', padre);
        console.log('El elemento hijo es: ', hijo);


        window.open(`detalles_reporte.html?folio=?${encodeURIComponent(folio)}`, '_blank');
    }
})


// document.addEventListener('DOMContentLoaded', async () => {
//     // 1. Primero cargamos los reportes desde la API a la tabla
//     await cargarYRenderizarTabla();

//     // 2. UNA VEZ QUE LA TABLA YA TIENE FILAS, aplicamos el filtro de la URL
//     aplicarFiltroDesdeURL();
// });

// // Función para leer la URL y aplicar el filtro
// function aplicarFiltroDesdeURL() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const filtro = urlParams.get('filtro'); // Recupera 'pendiente', 'completado', etc.

//     if (!filtro) return; // Si no hay parámetro en la URL, no hace nada

//     console.log(`Aplicando filtro recibido por URL: ${filtro}`);

//     const filas = document.querySelectorAll('#cuerpo-tabla tr');

//     filas.forEach(fila => {
//         // La celda de estado está en el índice 3 (4ta columna)
//         const estadoCelda = fila.children[3]?.textContent.trim().toLowerCase();

//         if (estadoCelda) {
//             let mostrar = false;

//             if (filtro === 'pendiente') {
//                 // Mapeo para los nuevos estados de pendientes
//                 mostrar = estadoCelda.includes('registrado') || 
//                           estadoCelda.includes('revision') || 
//                           estadoCelda.includes('pendiente');
//             } else if (filtro === 'completado') {
//                 mostrar = estadoCelda.includes('concluido') || 
//                           estadoCelda.includes('canalizado') || 
//                           estadoCelda.includes('completado');
//             } else if (filtro === 'en progreso' || filtro === 'en proceso') {
//                 mostrar = estadoCelda.includes('seguimiento') || 
//                           estadoCelda.includes('proceso');
//             }

//             // Ocultar o mostrar la fila
//             fila.style.display = mostrar ? '' : 'none';
//         }
//     });
// }
