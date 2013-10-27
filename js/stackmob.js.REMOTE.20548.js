//Call init to initialize the StackMob library. This is required before you use StackMob's JS SDK further
var albumId;
var cantPintar;
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
    },
    error: function(model, error, options) {
      console.debug("Error", error.error); 
      //document.getElementById("statusSave").innerHTML = error.error; 
    }
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
      var limit = $('#limit').val()
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

    var User = StackMob.User.extend({
      schemaName: 'user',
      loginField: 'username',
      password: 'password'
    });
     
    var c = new User({
      email: $('#form-registro #nombredeusuario').val(),
      password: $('#form-registro #clave').val()
    });
  c.create();

  }

function loginUser(){
  var user = new StackMob.User({ username: $('#formulario-login #email').val(), password: $('#formulario-login #password').val() });
  user.login(false, {
    success: function(model, result, options) {
      console.log("QAP");
    },
    error: function(model, result, options) {
      console.error(result); //or print out the error
    }
  });
}

function getAlbums(){
      json = albums(function(data){
        console.log("getAlbums -----------", data);
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
    console.log('entraaaaaaa')
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
            return stick.get('album_id') == '123456'
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
    getStickers();
})
$( "#page-albums" ).on( "pageshow", function( event, ui ) {
  getAlbums();
  return false;
})
