const contenedorMapaDetalle = document.getElementById('mapa-detalle-reporte');

if (contenedorMapaDetalle) {
    // Coordenadas del reporte específico (Latitud, Longitud)
    const latitudReporte = 19.596646;
    const longitudReporte = -99.227921;

    // 1. Crear el mapa centrado en la ubicación del caso
    const mapaDetalle = L.map('mapa-detalle-reporte').setView([latitudReporte, longitudReporte], 15);

    // 2. Capa base de mapas (CartoDB Positron)
    // L.tileLayer('https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(mapaDetalle);
   L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(mapaDetalle);

    // 3. Crear el Pin / Marcador en la dirección exacta
    const marcador = L.marker([latitudReporte, longitudReporte]).addTo(mapaDetalle);

    // 4. (Opcional) Agregar un globo con información al hacer clic en el pin
    marcador.bindPopup(`
        <div style="font-size: 13px;">
            <strong>Folio:</strong> RIETI2025100FE544<br>
            <strong>Ubicación:</strong> Atizapán de Zaragoza
        </div>
    `).openPopup(); // .openPopup() hace que aparezca abierto por defecto
}