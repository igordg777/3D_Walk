
mapboxgl.accessToken = 'pk.eyJ1IjoiaWdvcjc3N2lnb3I3NzciLCJhIjoiY2tjYWthczA0MWZwejMzbng0ZTMwaWZlaCJ9.CPAdaBVjYktsUyYy60ixTg';
var mapNew = new mapboxgl.Map({
    container: 'mapNew',
    // style: 'mapbox://styles/mapbox/light-v10',
    style: 'mapbox://styles/mapbox/streets-v9',

    
    zoom: 15.3,
    center: [ 37.604548931121826,
        55.692293896284056],
    pitch: 0,
    bearing: 0
});




var geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [37.60551989078521,
                55.69028316035624]
        },
        properties: {
            title: 'Выход 2 на МЦК Крымской',
            description: 'Выходим и сразу переходим через дорогу по пешеходному переходу',
            size: '10px'
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [37.60241389274597,
                55.69177383615392]
        },
        properties: {
            title: 'Перекресток',
            description: 'Здесь поворачиваем направо'
        }
    }, {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [37.6046347618103,
                55.69260834789042]
        },
        properties: {
            title: 'Пешеходный переход',
            description: 'Переходим через дорогу на пешеходном переходе',
            size: '10px'
        }
    }, {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [ 37.604312896728516,
                55.69282604367479]
        },
        properties: {
            title: 'Уже рядом =)',
            description: 'Теперь поворачиваем направо и идем около 30 мтров',
            size: '10px'
        }
    }, {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [37.604795694351196,
                55.69300140884171]
        },
        properties: {
            title: 'Финишная прямая',
            description: 'Здесь уже виден it.rooms',
            size: '10px'
        }
    }, {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [37.60291814804077,
                55.69446477025397]
        },
        properties: {
            title: 'Добро пожаловать',
            description: '',
            size: '10px'
        }
    }
    ]
};


// add markers to map
geojson.features.forEach(function (marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
        .addTo(mapNew);
});



// var marker = new mapboxgl.Marker()
//     .setLngLat([37.604312896728516,
//         55.69282604367479])
//     .addTo(mapNew);

// var marker = new mapboxgl.Marker()
//     .setLngLat([37.41454124450683,
//         55.96231770300549])
//     .addTo(mapNew);

// var marker = new mapboxgl.Marker()
//     .setLngLat([37.44269371032715,
//         55.97509495142305])
//     .addTo(mapNew);

// var marker = new mapboxgl.Marker()
//     .setLngLat([37.408618927001946,
//         55.97826459282861])
//     .addTo(mapNew);



// var marker = new mapboxgl.Marker()
//     .setLngLat([37.37943649291992,
//         55.96793829071513])
//     .addTo(mapNew);



let navNew = new mapboxgl.NavigationControl({
    showCompass: true,
    showZoom: true
})

mapNew.addControl(navNew, 'top-left')

mapNew.on('load', function () {
    mapNew.addSource('points', {
        'type': 'geojson',
        'data': pointMain
    });
    mapNew.addLayer({
        'id': 'Названия',
        'type': 'symbol',
        'source': 'points',
        'layout': {
            // get the icon name from the source's "icon" property
            // concatenate the name to get an icon from the style's sprite sheet
            'icon-image': ['concat', ['get', 'icon'], '-15'],
            // get the title name from the source's "title" property
            'text-field': ['get', 'title'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top'
        }
    });


    // mapNew.addSource('lines', {
    //     'type': 'geojson',
    //     'data': {
    //         'type': 'FeatureCollection',
    //         'features': [
    //             {
    //                 'type': 'Feature',
    //                 'properties': {
    //                     'color': '#F7455D' // red
    //                 },
    //                 'geometry': {
    //                     'type': 'LineString',
    //                     'coordinates': linesMain
    //                 }
    //             }, {
    //                 'type': 'Feature',
    //                 'properties': {
    //                     'color': 'green',

    //                 },
    //                 'geometry': {
    //                     'type': 'LineString',
    //                     'coordinates': lines3
    //                 }
    //             },
    //             {
    //                 'type': 'Feature',
    //                 'properties': {
    //                     'color': '#33C9EB',

    //                 },
    //                 'geometry': {
    //                     'type': 'LineString',
    //                     'coordinates': lines4
    //                 }
    //             }
    //         ]
    //     }
    // });
    // mapNew.addLayer({
    //     'id': 'Линии',
    //     'type': 'line',
    //     'source': 'lines',
    //     'paint': {
    //         'line-width': 3,
    //         // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
    //         // to set the line-color to a feature property value.
    //         'line-color': ['get', 'color'],
    //         "line-dasharray": [2, 1]
    //     }
    // });

    mapNew.addLayer({
        "id": "Маршрутная линия",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": linesMain
        },
        "Layout": {
            "line-join": "round",
            "line-cap": "round",

        },
        "paint": {
            "line-color": "black",
            "line-width": 1,

        }
    })

    mapNew.addLayer({
        "id": "Участок 1",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": line1
        },
        "Layout": {
            "line-join": "round",
            "line-cap": "round",

        },
        "paint": {
            "line-color": "blue",
            "line-width": 5,
            "line-dasharray": [2, 1]

        }
    })

    mapNew.addLayer({
        "id": "Участок 2",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": line2
        },
        "Layout": {
            "line-join": "round",
            "line-cap": "round",

        },
        "paint": {
            "line-color": "green",
            "line-width": 5,
            "line-dasharray": [2, 1]

        }
    })

    mapNew.addLayer({
        "id": "Участок 3",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": line3
        },
        "Layout": {
            "line-join": "round",
            "line-cap": "round",

        },
        "paint": {
            "line-color": "red",
            "line-width": 5,
            "line-dasharray": [2, 1]

        }
    })

    mapNew.addLayer({
        "id": "Участок 4",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": line4
        },
        "Layout": {
            "line-join": "round",
            "line-cap": "round",

        },
        "paint": {
            "line-color": "yellow",
            "line-width": 5,
            "line-dasharray": [2, 1]

        }
    })

    mapNew.addLayer({
        "id": "Участок 5",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": line5
        },
        "Layout": {
            "line-join": "round",
            "line-cap": "round",

        },
        "paint": {
            "line-color": "black",
            "line-width": 5,
            "line-dasharray": [2, 1]

        }
    })

    // mapNew.addLayer({
    //     "id": "Маршрут № 6",
    //     "type": "line",
    //     "source": {
    //         "type": "geojson",
    //         "data": line6
    //     },
    //     "Layout": {
    //         "line-join": "round",
    //         "line-cap": "round",

    //     },
    //     "paint": {
    //         "line-color": "orange",
    //         "line-width": 5,
    //         "line-dasharray": [2, 1]

    //     }
    // })


    // mapNew.addLayer({
    //     "id": "Полигон",
    //     "type": "fill",
    //     "source": {
    //         "type": "geojson",
    //         "data": polygones
    //     },
    //     "Layout": {},
    //     "paint": {
    //         "fill-color": "lightgreen",
    //         "fill-opacity": 0.3,

    //     }
    // })
})

let arr1 = [
    37.60551989078521,
                55.69028316035624
]
let arr2 = [
    37.60241389274597,
                55.69177383615392
]
let arr3 =
    [[
        37.6046347618103,
                55.69260834789042
    ],
    [
        37.604312896728516,
        55.69282604367479
    ],
    [
        37.604795694351196,
        55.69300140884171
    ]]
let arr = []
let flag = ''
document.getElementById('fly').addEventListener('click', function () {
    if (flag === '') {
        flag = 1
        mapNew.flyTo({
            center: [
                37.60551989078521,
                55.69028316035624
            ],
            zoom: 17,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    } else if (flag === 1) {
        flag = 2
        mapNew.flyTo({
            center: [
                37.60241389274597,
                55.69177383615392
            ],
            zoom: 17,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    } else if (flag === 2) {
        flag = 3
        mapNew.flyTo({
            center: [
                37.6046347618103,
                55.69260834789042
            ],
            zoom: 17,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    } else if (flag === 3) {
        flag = 4
        mapNew.flyTo({
            center: [
                37.604312896728516,
                55.69282604367479
            ],
            zoom: 17,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    } else if (flag === 4) {
        flag = 5
        mapNew.flyTo({
            center: [
                37.604795694351196,
                55.69300140884171
            ],
            zoom: 17,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    } else if (flag === 5) {
        flag = 6
        mapNew.flyTo({
            center: [
                37.60291814804077,
                55.69446477025397
            ],
            zoom: 17,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    } else if (flag === 6) {
        flag = ''
        mapNew.flyTo({
            center: [
                37.604312896728516,
                55.69282604367479
            ],
            zoom: 14,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    }


});




if( window.innerWidth >= 600 ){
 
var toggleableLayerIds = ['Названия', 'Участок 1', 'Участок 2', 'Участок 3', 'Участок 4', 'Участок 5', 'Маршрутная линия'];

// set up the corresponding toggle button for each layer
for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';


    link.textContent = id;
    // mapNew.setLayoutProperty(toggleableLayerIds[i], 'visibility', 'visible')
    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        console.log(clickedLayer)
        e.preventDefault();
        e.stopPropagation();

        var visibility = mapNew.getLayoutProperty(clickedLayer, 'visibility');

        // toggle layer visibility by changing the layout object's visibility property
        if (visibility === 'visible' || !visibility) {
            mapNew.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            mapNew.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}

   
}
