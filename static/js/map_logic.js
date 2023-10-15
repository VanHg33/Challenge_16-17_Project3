console.log("map_logic.js")

// Build base map
// Use https://leaflet-extras.github.io/leaflet-providers/preview/
// basemap is Stadia.OSMBright
let basemap = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

// geomap is Esri.NatGeoWorldMap
var geomap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    maxZoom: 16
});

let myMap = L.map("map", {
    center: [
        -27, 133
    ],
    zoom: 4
});

geomap.addTo(myMap);

// Build the menu
let baseMaps = {
    "AU Map Boundaries and Capitals": basemap,
    "NatGeo AU Map": geomap
};

// Get Labels on Aus Map with Stadia.StamenTerrainLabels
let mapLabels = new L.LayerGroup();

let overlays = {
    "Job Listings per State": mapLabels,
};

L
    .control
    .layers(baseMaps, overlays, { collapsed: false })
    .addTo(myMap);
    

d3.json("http://127.0.0.1:5000/api/mapping").then(function (data) {
    console.log(data)

    for (i = 0; i < data.length; i++) {

        marker = L.marker([data[i].latitude, data[i].longitude])
        marker.bindPopup(data[i].state + '<hr>' + "Jobs posted: " + data[i].count).addTo(mapLabels);

        mapLabels.addTo(myMap)
    }

})


