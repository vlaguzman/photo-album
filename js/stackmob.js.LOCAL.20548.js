//Call init to initialize the StackMob library. This is required before you use StackMob's JS SDK further
StackMob.init({
  // publicKey: "e92381ae-561c-420e-a109-a7d73f724e6f",
  publicKey: "6b5723e7-06f5-4994-b2cd-d9bdc6dfceb2",
  // publicKey: "73938e24-9c5a-490c-accd-40f416c092fa",
  apiVersion: 0
});

//Persist objects to the datastore and retrieve them 
//Associates Model with the Schema
var Report = StackMob.Model.extend({
  schemaName: 'album'  //schemaName must be lowercase
});

var CollectReport = StackMob.Collection.extend({
  model: Report
});

function consultReport(){
	var results = new CollectReport();
	results.fetch({
	  success: function(results) { //StackMob.Collection is returned
	    console.debug(results.toJSON());
	  },
	  error: function(model, error, options) {
	      console.debug(error.error); 
	      document.getElementById("statusSave").innerHTML = error.error; }
	});
}


//The above schemaName: 'userinfo' tells StackMob to save 'userInfo' data under a schema named 'userinfo' on the server side.
//Create an Object - Save an instance of your 'userinfo' object to the server.
//Create new instance of uInfo
function createRegistry(){
  // Create new instance of Todo
  var instance = new Report({
    country: "país",
    city: "ciudad",
    address: "dirección",
    photo: "Foto",
    done: true
  });
   
  // Persist the object to StackMob
  instance.create({
    success: function(model, result, options) { 
      // console.debug(model.toJSON()); 
      document.getElementById("statusSave").innerHTML = "OK"; },
    error: function(model, error, options) {
      console.debug(error.error); 
      document.getElementById("statusSave").innerHTML = error.error; }
  });
}

function createSticker(){
  //Persist objects to the datastore and retrieve them 
  //Associates Model with the Schema
  var Sticker = StackMob.Model.extend({
    schemaName: 'sticker'  //schemaName must be lowercase
  });  

  var instance = new Sticker({
    access: "access",
    address: document.getElementById("IAddress").value,
    album_id: "album_id", 
    city: cityReport.toString(),
    country: countryReport.toString(),
    error: true,
    lat: initialLatitude.toString(),
    lng: initialLongitude.toString(),
    photo: photoDirectory+fullDateTime.toString()+".jpg",
  });
   
  // Persist the object to StackMob
  instance.create({
    success: function(model, result, options) { 
      // console.debug(model.toJSON()); 
      document.getElementById("statusSave").innerHTML = "OK"; 
      sendImage();
    },
      
    error: function(model, error, options) {
      console.debug(error.error); 
      document.getElementById("statusSave").innerHTML = error.error; }
  });
}

Lungo.Events.init({
 /*'tap section#splash article div a#enter': function(){
    // FALTA VALIDAR EL USUARIO CONTRA LA BD
    // getLocation();
 },*/

 'tap section#main article div a#sendReportNow': function(){
    // var license = false;
    // var address = false;
    // var photo = false;

    // photo = validateData(document.getElementById('filesToUpload').value, "Foto", "picture");
    // address = validateData(document.getElementById('IAddress').value, "Dirección", "pushpin");
    // license = validateData(document.getElementById('ILicensePlate').value, "Placa", "truck");
    
    createRegistry();
    

    // if(license && address && photo) {
    //   createReport();
    //   //VERIFICAR NOTIFICACIÓN PARA SEGURARSE DE LA CREACIÓN CORRECTA DEL REPORTE (LADO SERVIDOR)
    //   Lungo.Notification.success("Gracias", "¡Reporte enviado!", "trophy", 3);
    //   // clearData();
    //   showPhotos();
    // }
  },

  'tap section#main article div a#consultReport': function(){
    // var license = false;
    // var address = false;
    // var photo = false;

    // photo = validateData(document.getElementById('filesToUpload').value, "Foto", "picture");
    // address = validateData(document.getElementById('IAddress').value, "Dirección", "pushpin");
    // license = validateData(document.getElementById('ILicensePlate').value, "Placa", "truck");
    
    consultReport();
    

    // if(license && address && photo) {
    //   createReport();
    //   //VERIFICAR NOTIFICACIÓN PARA SEGURARSE DE LA CREACIÓN CORRECTA DEL REPORTE (LADO SERVIDOR)
    //   Lungo.Notification.success("Gracias", "¡Reporte enviado!", "trophy", 3);
    //   // clearData();
    //   showPhotos();
    // }
  },

  'tap section#splash article div a#enter': function(){
    // loginUser();
    getLocation();
  },

  'tap section#main article div a#createSticker': function(){
    // var license = false;
    // var address = false;
    // var photo = false;

    // photo = validateData(document.getElementById('filesToUpload').value, "Foto", "picture");
    // address = validateData(document.getElementById('IAddress').value, "Dirección", "pushpin");
    // license = validateData(document.getElementById('ILicensePlate').value, "Placa", "truck");
    
    createSticker();
    

    // if(license && address && photo) {
    //   createReport();
    //   //VERIFICAR NOTIFICACIÓN PARA SEGURARSE DE LA CREACIÓN CORRECTA DEL REPORTE (LADO SERVIDOR)
    //   Lungo.Notification.success("Gracias", "¡Reporte enviado!", "trophy", 3);
    //   // clearData();
    //   showPhotos();
    // }
  },
});


var cityReport = "";
var countryReport = "";
var photoDirectory = "http://www.drive2in.com/angelhack/photos/";
var currentdate = new Date();
var year = currentdate.getFullYear().toString();
var month = (currentdate.getMonth()+1) < 10 ? "0"+(currentdate.getMonth()+1) : (currentdate.getMonth()+1);
var day = currentdate.getDate() < 10 ? "0"+currentdate.getDate() : currentdate.getDate();
var hours = currentdate.getHours() < 10 ? "0"+currentdate.getHours() : currentdate.getHours();
var minutes = currentdate.getMinutes() < 10 ? "0"+currentdate.getMinutes() : currentdate.getMinutes();
var seconds = currentdate.getSeconds() < 10 ? "0"+currentdate.getSeconds() : currentdate.getSeconds();
var miliseconds = currentdate.getMilliseconds() < 10 ? "0"+currentdate.getMilliseconds() : currentdate.getMilliseconds();
var fullDateTime = year.toString()+month.toString()+day.toString()+"_"+hours.toString()+minutes.toString()+seconds.toString()+miliseconds.toString();

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
  // var displayText = position.coords.latitude+","+position.coords.longitude;

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

function sendImage(){
  if (window.File && window.FileReader && window.FileList && window.Blob) {
      // if (document.getElementById('filesInfo').hasChildNodes() ) {
      //   while (document.getElementById('filesInfo').childNodes.length >= 1 ) {
      //     document.getElementById('filesInfo').removeChild( document.getElementById('filesInfo').firstChild );       
      //   }
      // }
      var files = document.getElementById('filesToUpload').files;
      for(var i = 0; i < files.length; i++) {
        resizeAndUpload(files[i], files.length);
      }
      /*document.getElementById('filesToUpload').onchange = function() {
          var files = document.getElementById('filesToUpload').files;
          for(var i = 0; i < files.length; i++) {
            resizeAndUpload(files[i], files.length);
          }
      };*/
  } else {
      alert('The File APIs are not fully supported in this browser.');
  }
}

function resizeAndUpload(file, length){

var reader = new FileReader();
    reader.onloadend = function() {
 
    var tempImg = new Image();
    tempImg.src = reader.result;
    tempImg.onload = function() {
 
        var MAX_WIDTH = 960;
        var MAX_HEIGHT = 960;
        var tempW = tempImg.width;
        var tempH = tempImg.height;
        
        if (tempW > tempH) {
            if (tempW > MAX_WIDTH) {
               tempH *= MAX_WIDTH / tempW;
               tempW = MAX_WIDTH;
            }
        } else {
            if (tempH > MAX_HEIGHT) {
               tempW *= MAX_HEIGHT / tempH;
               tempH = MAX_HEIGHT;
            }
        }

        var canvas = document.createElement('canvas');
        canvas.width = tempW;
        canvas.height = tempH;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0, tempH, tempW);
        var dataURL = canvas.toDataURL("image/jpeg");
 
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(ev){
          if(length > 1)
            document.getElementById('filesInfo').innerHTML = 'Imágenes Enviadas';
          else
            document.getElementById('filesInfo').innerHTML = 'Imagen Enviada';
        };
        xhr.open('POST', 'upload.php', true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        var data = 'image=' +dataURL+ '&filename=' +fullDateTime.toString();
        xhr.send(data);
        // xhr.close();
      }
   }
   reader.readAsDataURL(file);
}