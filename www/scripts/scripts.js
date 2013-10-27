<html>
<head>
	<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
	<script type="text/javascript" src="/jquery.ui.map.js"></script>

<script type="text/javascript">
$('#map_canvas').gmap().bind('init', function(ev, map) {
	$('#map_canvas').gmap('addMarker', {'position': '57.7973333,12.0502107', 'bounds': true}).click(function() {
		$('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World!'}, this);
	});
});
</script>

</head>


<body>
	<div id="map_canvas" class="map"></div>
</body>
</html>
