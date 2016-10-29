/**
 * 
 */

L.mapbox.accessToken = 'pk.eyJ1IjoicmJzYSIsImEiOiJjaWZsM2x5enZlbjJnczRtN3Nja2Q3dHB4In0.s4I-R9ypSGhpEpPWe4AG-w';
var map = L.mapbox.map('map', 'mapbox.streets-satellite'
		[ -8.059505821843583, -34.95068550109863 ], 21);

var marker = L.marker([ -8.059505821843583, -34.95068550109863 ], {
	icon : L.mapbox.marker.icon({
		'marker-color' : '#f86767'
	}),
	draggable : true
}).bindPopup('IFPE Campus Recife DC').addTo(map);

var featureLayer = L.mapbox.featureLayer().addTo(map);

map.on('ready', function() {

	var geojson = [
			{
				"type" : "Feature",
				"geometry" : {
					"type" : "Polygon",
					"coordinates" : [ [
							[ -34.95050810998927, -8.058954676442397 ],
							[ -34.95045947183699, -8.058954676442397 ],
							[ -34.95045947183699, -8.058873086313941 ],
							[ -34.95050713419914, -8.058873760747108 ],
							[ -34.95050713419914, -8.058954676442397 ] ] ]
				},
				"properties" : {
					"title" : "proext_proden",
					"description" : "Proreitoria de Extensão",
					"stroke" : "#000",
					"stroke-opacity" : 0.5,
					"stroke-width" : 4
				}
			},

	];
	featureLayer.setGeoJSON(geojson);
});
