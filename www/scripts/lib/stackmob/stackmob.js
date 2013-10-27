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
  schemaName: 'sticker'  //schemaName must be lowercase
});

var CollectReport = StackMob.Collection.extend({
  model: Report
});

var fr = function consultReport(callback){
	var results = new CollectReport();
	results.fetch({
	  success: function(model, result, options) { //StackMob.Collection is returned
	    console.debug(model.toJSON());
      console.debug("StackMob");
      console.debug(result);
      callback(results);
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


