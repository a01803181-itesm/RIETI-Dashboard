import {
    obtenerDetallesReportePorFolio
} from './api_service.mjs';

export function detallesReportesGestion(datos) {
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

// ------------------------------------------------------------------------
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

buscador.addEventListener('input', function() {
    const valor = this.value.trim().toLowerCase();
    const rows = document.querySelectorAll('#cuerpo-tabla tr');

    if (valor === '') {
        rows.forEach(row => {
            row.style.display = '';
        });
    }
});


buscador.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        botonBuscar.click();
    }
});


document.addEventListener('click', function(event) {
    const botonVer = event.target.closest('.boton-ver');
    const padre = ((botonVer.parentElement).parentElement).parentElement;
    const hijo = padre.children[0];
    const folio = hijo.textContent;

    if(botonVer) {
        console.log('Ver detalles del folio:', folio);
        console.log('El elemento padre es: ', padre);
        console.log('El elemento hijo es: ', hijo);

        const paginaDetalles = window.open('detalles_reporte');

        try {
            const response = await fetch(`${API_URL}/v1/reportes/${encodeURIComponent(folio)}`);

            if (!response.ok) {
                throw new Error
            }
        }
    }
})