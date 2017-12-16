
	$(function() {
		
			//JSON
			$(document).ready(function(){

					$.getJSON( "../json/rooms.json", function( data ) {
					  var items = [];
					  $.each( data, function( key, val ) {
						  $.each( val, function( key2, val2 ) {
							items.push( "<li id='" + key2 + "'>" + val2 + "<br/></li>" );
						  });
					  });

					  $( "<ul/>", {
						"class": "my-new-list",
						html: items.join( "" )
					  }).appendTo( "#my-list" );
	 
					});		
			
			});
			
			//XML
			function roomData(){
					$.ajax({
						url: "edva206.xml",
						dataType: "xml",
						success:function roomfinder(data){
									$("ul").children().remove();
										$(data).find("LVDaten").each(function (){
											
											var info = '<li>Datum: ' + $(this).find("Datum").text() + 
											'</br>Belegt von ' + $(this).find("Von").text() +
											'(Stunde: ' + $(this).find("StundeVon").text() +
											') bis ' + $(this).find("Bis").text() +
											'(Stunde: ' + $(this).find("StundeBis").text() +
											')<br/>Lektoren: ' + $(this).find("Lektoren").text() +
											'<br/>Gruppen: ' + $(this).find("Gruppen").text() +
											'<br/>Lehrfach: ' + $(this).find("Lehrfach").text() +
											'<br/>Eventuelle Anmerkungen: ' + $(this).find("Anmerkung").text() + '</li>';
													
											$("ul").append(info);
													
										});
								} 
					});
			}
				
			$("#testbutton").click(function(){
				roomData();
			});
			
	});