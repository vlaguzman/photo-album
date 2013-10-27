//Call init to initialize the StackMob library. This is required before you use StackMob's JS SDK further
StackMob.init({
  // publicKey: "e92381ae-561c-420e-a109-a7d73f724e6f",
  publicKey: "e92381ae-561c-420e-a109-a7d73f724e6f",
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
});