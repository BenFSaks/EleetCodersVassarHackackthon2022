require("https://maps.googleapis.com/maps/api/js?key=AIzaSyDSHtNiuqGxHsCgOxB0DyXR59lrk9KkaHo&callback=initMap")

var map;
    class NearBy{
        constructor(country, city, state) {
            this.innerHTML = `<tr>
                                <td>${country}</td>
                                <td>${city}</td>
                                <td><i class="fa-solid fa-circle-info" id="view"></i></td>
                            </tr>`;
        }
    }

    const nearByForm = document.getElementById('nearby-form');
    nearByForm.addEventListener('submit', getNearbyLocations);

    const locations = []

  function getNearbyLocations(e){
        e.preventDefault();
        let country = document.getElementById('country').value;
        let city = document.getElementById('city').value;
        let state = document.getElementById('state').value;

        locations.forEach(location => {
            let newNearBy = new NearBy(country, city, state);
            document.getElementById('table-data').innerHTML = newNearBy.innerHTML;
        });

        //call request, set to locations
    }

    window.onload = () => {
        let view = document.querySelectorAll('#view');
        view.forEach(v => {
            v.addEventListener('click', () => {
                map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: location.data.location.coordinates[0],
                    lng: location.data.location.coordinates[1]
                },
                zoom: 4
                })
            });
        });
    }

    export function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
    }

        // var marker = new google.maps.Marker({
        //     position: {lat: -34.397, lng: 150.644},
        //     map: map,
        //     title: 'Hello World!'
        // });

        // var infoWindow = new google.maps.InfoWindow({
        //     content: '<h1>Hello World!</h1>'
        // });

        // marker.addListener('click', function() {
        //     infoWindow.open(map, marker);
        // });

        // var markers = [
        //     {
        //         coords: {lat: 42.4668, lng: -70.9495},
        //         content: '<h1>Lynn MA</h1>'
        //     }
        // ]

        // var markers = locations.map(location => {
        //     var marker = new google.maps.Marker({
        //         position: {
        //             lat: location.data.location.coordinates[0],
        //             lng: location.data.location.coordinates[1]
        //         },
        //         map: map,
        //     });

        //     marker.addListener('click', function() {
        //         infoWindow.setContent(location.data.location.city);
        //         infoWindow.open(map, marker);
        //     });

        //     if(props.iconImage){
        //         marker.setIcon(props.iconImage);
        //     }
        // });

        // for (var i = 0; i < markers.length; i++) {
        //     addMarker(markers[i]);
        // }

        // function addMarker(props){
        //     var marker = new google.maps.Marker({
        //         position: props.coords,
        //         map: map
        //     });

        //     if(props.iconImage){
        //         marker.setIcon(props.iconImage);
        //     }

        //     if(props.content){
        //         var infoWindow = new google.maps.InfoWindow({
        //             content: props.content
        //         });

        //         marker.addListener('click', function(){
        //             infoWindow.open(map, marker);
        //         });
        //     }
        //}            
    //}

    // const nearByForm = document.getElementById('nearby-form');
    // nearByForm.addEventListener('submit', getNearbyLocations);

    // const locations = []

    // function getNearbyLocations(e){
    //     e.preventDefault();
    //     let country = document.getElementById('country').value;
    //     let city = document.getElementById('city').value;
    //     let state = document.getElementById('state').value;

    //     document.getElementById('table-data').innerHTML = locations.map(location => {
    //         return(
    //             `<td>${location.data.city}</td>
    //             <td>${location.pollution.aqius}</td>
    //             <td><i class="fa-solid fa-circle-info"></i></td>`
    //         )
    //     })
    // }

    // const view = document.getElementById('view');
    // view.addEventListener('click', function(){
    //     map = new google.maps.Map(document.getElementById('map'), {
    //         center: {}
    //         {lat: -34.397, lng: 150.644},
    //         zoom: 2
    //     });
    // })
