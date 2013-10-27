var albumId;
var cantPintar;
var initialLatitude;
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

var albums = function consultReport(callback){
	var results = new CollectReport();
	results.fetch({
	  success: function(result) { //StackMob.Collection is returned
	    console.debug(result.toJSON());
      callback(result);
	  },
	  error: function(model, error, options) {
	      console.debug("Error", error.error); 
	      //document.getElementById("statusSave").innerHTML = error.error; 
      }
	});
}


//The above schemaName: 'userinfo' tells StackMob to save 'userInfo' data under a schema named 'userinfo' on the server side.
//Create an Object - Save an instance of your 'userinfo' object to the server.
//Create new instance of uInfo
function createRegistry(data){
  // Create new instance of Todo

  var instance = new Report({
    name: data.name,
    description: data.description,
    photo: data.photo,
    limit: data.limit,
    cantStickers: data.cantStickers,
    done: true
  });
   
  // Persist the object to StackMob
  instance.create({
    success: function(model, result, options) { 
      // console.debug(model.toJSON()); 
      //document.getElementById("statusSave").innerHTML = "OK"; 
      $('#form-album .ui-btn-text').trigger('click');
      $('#name').val('');
      $('#description').val('');
      $('#file').val('');
    },
    error: function(model, error, options) {
      console.debug("Error", error.error); 
      //document.getElementById("statusSave").innerHTML = error.error; 
    }
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
    photo: photoDirectory+fullDateTime.toString()+".jpg"
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

function validatePass(p1, p2) {
  if (p1.value != p2.value) {
    p2.setCustomValidity('Las dos contraseñas deben ser iguales.');
  } else if (p1.value.length < 5) {
    p2.setCustomValidity('La contraseña debe de ser mínimo 5 caracteres');
  } else if (p1.value == p2.value){
    p2.setCustomValidity('');
  }

}

$(document).ready(
  function (event, ui ){
    
    $('#limit').change(function(){
        var activeLimit = $(this).val();
        if( activeLimit === 'true' ){
            console.log('true')
            $( 'input[name="number"]' ).removeClass('mobile-textinput-disabled').removeClass('ui-state-disabled').removeAttr('disabled').parent().removeClass('ui-disabled');
        }else{
            console.log('false')
            $( 'input[name="number"]' ).addClass('mobile-textinput-disabled').addClass('ui-state-disabled').attr('disabled', 'disabled').parent().addClass('ui-disabled');
            
        }
    })

  $("#btn-send-album").click(function(event){
      event.preventDefault();
      console.log('entra');
      var limit = $('#limit').val();
        if (limit === "true") {
          limit = true;
        }
        else{
          limit = false; 
        };
        var data = {
          name: $('#name').val(),
          description: $('#description').val(),
          photo: $('#file').val(),
          limit: limit,
          cantStickers: parseInt($('#cant-stickers').val())
        }
        console.log('data', data);
        createRegistry(data);
    }); 
   

  $("#botonRegistro").click(function(event){
      event.preventDefault();
      createUser();
    }); 


  $("#botonLogin").click(function(event){
      event.preventDefault();
      loginUser();
    }); 

    getAlbums();

}); 

function createUser(){


  var Customer = StackMob.User.extend({
    schemaName: 'user',
    loginField: 'email',
    passwordField: 'password'
  });
   
  var c = new Customer({
    email: $('#form-registro #email').val(),
    passwordField: $('#form-registro #p1').val(),
    username: $('#form-registro #username').val()
  });
  c.create({
    success: function(){
      $('#registro .ui-btn-text').trigger('click');
      $('#email').val('');
      $('#username').val('');
      $('#p1').val('');
      $('#p2').val('');
    }
  }); //saves to "customer"

}

function loginUser(){
  var user = new StackMob.User({ username: $('#formulario-login #nombredeusuario').val(), password: $('#formulario-login #clave').val() });
  user.login(false, {
    success: function(model, result, options) {
      console.log("QAP");
    },
    error: function(model, result, options) {
      console.error("error", model, result, options); //or print out the error
    }
  });
}


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



function getAlbums(){
      json = albums(function(data){
        console.debug(data);
      $('.albums-list li').remove();
      for (var i = 0; i < data.models.length; i++){
          var albumIdfn = data.models[i].get('album_id');
          var cantSticker = albumIdfn + '-' + data.models[i].get('cantStickers');
          console.log('cantSticker', cantSticker);
          var li_html = '<li><a href="#album-sticker" data-id="123" onClick="saveAlbumId('+albumIdfn+')">';
          li_html += '<img src='+data.models[i].get('photo')+'>';
          li_html += '<h2>'+data.models[i].get('name')+'</h2>';
          li_html += '<p>'+data.models[i].get('description')+'</p>';
          if (data.models[i].get('limit') == true) {
            li_html += '<span class="ui-li-count">'+data.models[i].get('cantStickers')+'</span>';
          }
         else{
            li_html += '<span class="ui-li-count">Ilimitadas</span>'; 
          };
          li_html += '</li>';
          li_html += '</ul>';
          $('.albums-list').append(li_html);
      }
      setTimeout("updteList()",100);
    });
}

function updteList(){
  $(".albums-list").listview('refresh');
}

function saveAlbumId(id){
    console.log('entraaaaaaa');
    albumId = id;
}

var Sticker = StackMob.Model.extend({
  schemaName: 'sticker'  //schemaName must be lowercase
});

var CollectStickers = StackMob.Collection.extend({
  model: Sticker
});

function getStickers(){
    var stickers = new CollectStickers();
    console.log('pintar', cantPintar);
    console.log('pintar', albumId);

    stickers.fetch({
	  success: function(result) { //StackMob.Collection is returned
	    console.log(result);
        var cantStickers = _.filter(result.models, function(stick){
            /*console.log('stick', stick);*/
            return stick.get('album_id') == '123456';
        })
        console.log('cant stickers', cantStickers);
	  },
	  error: function(model, error, options) {
	      console.debug("Error", error.error); 
	      //document.getElementById("statusSave").innerHTML = error.error; 
      }
    })
}
$( "#album-sticker" ).on( "pageshow", function( event, ui ) {
    /*getStickers();*/
    getLocation();
    createSticker();
})
$( "#page-albums" ).on( "pageshow", function( event, ui ) {
  getAlbums();
})

