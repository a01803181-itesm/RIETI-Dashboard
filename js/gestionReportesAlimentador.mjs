/**
 * Pinta los reportes en la tabla sin modales ni menú desplegable.
 * @param {Array} reportes Lista de objetos de reportes recibidos del backend.
 */
export function detallesReportesGestionAlimentador(reportes) {
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    if (!cuerpoTabla) return;

    cuerpoTabla.innerHTML = ''; // Limpiar filas estáticas

    if (!reportes || reportes.length === 0) {
        cuerpoTabla.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #64748b; padding: 20px;">
                    No se encontraron reportes asignados a este municipio.
                </td>
            </tr>
        `;
        return;
    }

    reportes.forEach(reporte => {
        const tr = document.createElement('tr');

        // Formato y normalización del Estatus
        const estatusBruto = reporte.estatus || '1_Registrado';
        const estatusLimpio = estatusBruto.split('_').slice(1).join(' ');
        const claseEstatus = estatusBruto.split('_').slice(1).join('-').toLowerCase();

        // Formato de Fecha
        const fechaFormateada = reporte.dia ? reporte.dia.split('T')[0] : 'N/A';
        const municipioNombre = (reporte.municipio || '').split('_').join(' ');

        tr.innerHTML = `
            <td>${reporte.folio}</td>
            <td>${municipioNombre}</td>
            <td>${fechaFormateada}</td>
            <td>
                <span class="status status-${claseEstatus}" data-status="${estatusBruto}">
                    ${estatusLimpio}
                </span>
            </td>
            <td>
                <button class="boton-ver-detalle" style="width: 100%; border-radius: 6px; padding: 6px 12px; cursor: pointer;">
                    Ver
                </button>
            </td>
        `;

        // Evento directo para abrir detalles en una nueva pestaña
        const botonVer = tr.querySelector('.boton-ver-detalle');
        botonVer.addEventListener('click', () => {
            sessionStorage.setItem('reporteSeleccionado', JSON.stringify(reporte));
            window.open('detalles_reporte_procurador.html', '_blank');
        });

        cuerpoTabla.appendChild(tr);
    });
}