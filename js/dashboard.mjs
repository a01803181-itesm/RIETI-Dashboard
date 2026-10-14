export function datosCantidadDeReportes({ total = 0, completados = 0, en_proceso = 0, pendientes = 0} = {}) {
    const cantidadTotal = document.getElementById('cantidad-total');
    const cantidadCompletados = document.getElementById('cantidad-completados');
    const cantidadEnProceso = document.getElementById('cantidad-en-proceso');
    // const cantidadPendientes = document.getElementById('cantidad-pendientes');
    const cantidadPendientes = document.querySelectorAll('.cantidad-pendientes');

    cantidadTotal.textContent = `${Number(total)}`;
    cantidadCompletados.textContent = `${Number(completados)}`;
    cantidadEnProceso.textContent = `${Number(en_proceso)}`;
    // cantidadPendientes.textContent = `${Number(pendientes)}`;
    cantidadPendientes.forEach(e => {
        e.textContent = `${Number(pendientes)}`;
    });
}