const botonInicioSesion = document.getElementById('botonIniciarSesion');
const inputCorreo = document.getElementById('email');
const inputTel = document.getElementById('telefono');


botonInicioSesion.addEventListener('click', function() {
    const correo = inputCorreo.value.trim();
    const telefono = inputTel.value.trim();

    if(correo === "" || telefono === ""){
        alert('¡Debes llenar ambos campos!');
        return;
    } 
    
    if(correo === "rieti@admin.com" && telefono === "1234567890"){
        window.location.href = 'index.html'
    } 
    else if (correo === "rieti@alimentador.com" && telefono === "1234567890"){
        window.location.href = 'index_procurador.html'
    } 
    else {
        alert('¡Credenciales incorrectas!');
        return;
    }
});