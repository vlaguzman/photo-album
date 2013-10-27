var json;
var page_ = {};
page_.models = {};
page_.controllers = {};
page_.views = {};

var marcas = [];
  //['tunjuelito', 4.60971,-74.08175, 4],
  //['usaquen', 4.70971,-75.08175, 5]
//];



// jQuery global controller
$(document).ready(function () {
  
    new page_.views.Map().init();
  

});        //fin ready


page_.views.Map = function () {
	 this.init = function () {
      	  
		this.map_canvas();

	 }//fin init

	 this.map_canvas = function(){

	  
       
			var map;
			//function initialize() {
			  var mapOptions = {
				 zoom: 16,
				 center: new google.maps.LatLng(4.689618535678233,-74.07072347561879),
				 //center: new google.maps.LatLng(-74.08175,4.60971),
				// draggableCursor:"crosshair",
         	 overviewMapControl: true,
          	 overviewMapControlOptions: {
       			opened: true
     			 }
			  };
				  map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    		     var limits = new google.maps.LatLngBounds();

		

				json = fr(function(data){
					console.debug("map.js");
					console.debug(data);
					console.debug('models',data.models);
					for (var i = 0; i < data.models.length; i++){

					  var image = {
							 url: 'img/icon_map/build.png'//,
		 			  };
  
					  var shape = {
							coord: [1, 1, 1, 20, 18, 20, 18 , 1],
							type: 'poly'
					  };


 					  var lat = data.models[i].get('lat');
 					  var lng = data.models[i].get('lng');

 					 
					  //alert(photo);

					  
 			
					  var myLatLng = new google.maps.LatLng(lat, lng);
		           var marker = new google.maps.Marker({
						  position: myLatLng,
						  map: map,
						  icon: image,
						  shape: shape,
						  title: 'dar clic',//place[0],
						  zIndex: i //place[3]
					  });

					   google.maps.event.addListener(marker, 'mousedown', function(){
			  	           // this.setIcon('http://gmaps-samples.googlecode.com/svn/trunk/markers/red/blank.png');
			  	        //	$("#modal_iconmap").modal();

			  	        console.log("marker mosedown", marker.position.lb, marker.position.mb);

                    var q = new StackMob.Collection.Query();
			  	        console.log(q);

						  q.equals('lat', marker.position.lb);//.equals('lng', marker.position.mb); //you can 							
							var todos = new CollectReport();
							todos.query(q, {
							  success: function(collection) {
								 console.debug("StackMob.Collection.Query", collection.toJSON());

								 var result = collection.toJSON();

                         $.each(result, function(k, v){

                              console.log("k", k);
									   console.log("v", v);

									   // alert(v.photo);

 					 				 $("#imglogo").attr("src", v.photo);

 					  				  
 					  					console.log(v.city);

				     					$("#city").html(v.city);
				     					$("#direccion").html(v.address);


                         });

								 
							  }
							});
							
			  	        
			  	         $.fancybox({
               			 'content': $("#modal_iconmap").html()
            			});
			  	        //alert("");
			  	      });
			  	
                 
					 } //fin for

					 // map.fitBounds(limits);
				});

				google.maps.event.addDomListener(window, 'load', this); 

	 }//fin function map_canvas
/*
	 this.set_markers = function(map, locations){

	   alert("entro");

		console.log(map);
		console.log("locations " , locations);
 
		  var image = {
			 url: 'img/icon_map/comida.png'//,
			
		  };
  
		  var shape = {
				coord: [1, 1, 1, 20, 18, 20, 18 , 1],
				type: 'poly'
		  };

		  
		  for (var i = 0; i < locations.length; i++) {
			 //var place = locations[i];

           //alert("place" + place);
          
			// console.log("place", parseFloat(locations[i].get('lat'));
			 
			var myLatLng = new google.maps.LatLng(parseFloat(locations[i].get('lat'), parseFloat(locations[i].get('lng'));
			 var marker = new google.maps.Marker({
				  position: myLatLng,
				  map: map,
				  icon: image,
				  shape: shape,
				  title: 'sssss',//place[0],
				  zIndex: i //place[3]
			 });
		  }

	 }//fin markers

	 */

};//fin page view



function test(){
	console.log(json);
}
