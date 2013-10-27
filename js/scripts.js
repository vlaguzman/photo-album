function getLocation() {
  // clearData();
  var decode = decodeURIComponent(document.location.search);
  // if(!decode.substring(1))  
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  // getActualDate();
}

function handleSuccess(position) {
  initialLatitude = position.coords.latitude;
  initialLongitude = position.coords.longitude; 
  var displayText = position.coords.latitude+","+position.coords.longitude;

  //display the string with initial car latitudeand longitude
  // document.getElementById("vehiclePosition").innerHTML = displayText;
  initialize(initialLatitude, initialLongitude);
}

function handleError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User did not share geolocation data");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Could not detect current position");
            break;
        case error.TIMEOUT:
            alert("Retrieving position timed out");
            break;
        default:
            alert("Unknown Error");
            break;
    }
}

function initialize(latitude, longitude) {
  //DirectionsRenderer object to render DirectionService results.
  directionsDisplay = new google.maps.DirectionsRenderer();
  
  //Locate latitude and longitude actual coords in map
  latlng = new google.maps.LatLng(latitude, longitude);
  var properties = {
    center:latlng,
    zoom:16,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  //Locate map div in HTML page and set map with the properties stablished
  //map = new google.maps.Map(document.getElementById("map"), properties);
  //directionsDisplay.setMap(map);

  //Create markup into the actual position
  marker = new google.maps.Marker({
  position:latlng,
  animation:google.maps.Animation.BOUNCE
  });

  //Geocoder inverse lets get address with latitude and longitute coords
  geocoder = new google.maps.Geocoder();
  infoWindow = new google.maps.InfoWindow();

  geocoder.geocode({'latLng': latlng}, function(results, status){
  if(status == google.maps.GeocoderStatus.OK){
    if(results[0])
      {
        map = new google.maps.Map(document.getElementById("map"), properties);
        //map.fitBounds(results[0].geometry.viewport);
        directionsDisplay.setMap(map);
          marker.setMap(map);
          marker.setPosition(latlng);

        //First split for descart Country,city
        var splitAddress = (results[0].formatted_address).split(',',2);
        //Second split for discard number '-' 
        var addressShort = splitAddress[0].split('-',2);
        var splitCity = (results[3].formatted_address).split(',',2);
                  
        document.getElementById("IAddress").value = addressShort[0];
        // document.getElementById("ICity").value = splitCity[0];
        cityReport = splitCity[0];
        // document.getElementById("ICountry").value = results[5].formatted_address;
        countryReport = results[5].formatted_address;

        //$('#address').text(results[0].formatted_address);
        //Is showed a dialog with the address in the map
        infoWindow.setContent(document.getElementById("IAddress").value);
        infoWindow.open(map, marker);
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent(document.getElementById("IAddress").value);
            infoWindow.open(map, marker);
        });
      }
      else {
        alert('No results found');
      }
    }
    else
    {
      alert("Error");
    }
   });
  
  //Draw markup into map
  //marker.setMap(map);

  //Route();
}