			var sound = new Audio("barcode.wav");

			$(document).ready(function() {

				barcode.config.start = 0.1;
				barcode.config.end = 0.9;
				barcode.config.video = '#barcodevideo';
				barcode.config.canvas = '#barcodecanvas';
				barcode.config.canvasg = '#barcodecanvasg';
				barcode.setHandler(function(barcode) {
					$('#result').html(barcode);
				});
				barcode.init();

				$('#result').bind('DOMSubtreeModified', function(e) {
					sound.play();	
				});

			});
					
//------------------------JSON--------------------------			
			$(function() {
				
				$(document).ready(function(){

						$.getJSON( "rooms.json", function( data ) {
						  var items = [];
						  $.each( data, function( key, val ) {
							  $.each( val, function( key2, val2 ) {
								items.push( "<option value='" + key2 + "'>" + val2 +  "</option>" );
							  });
						  });
						
						  $( "<select/>", {
							"id": "room",
							html: items.join( "" )
						  }).appendTo( "#jsonlist" );
		 
						});		
				
				});	
				
					
//------------------------XML--------------------------

			
			
			$("#xmlbtn").click(function(){
								
					$("#xml-list").children().remove();		//vorhandene Daten löschen
					
					var tablehead = '<tr><th>Datum</th> <th>Belegt von (Stunde)</th> <th>bis (Stunde)</th> <th>Lektoren</th> <th>Gruppen</th> <th>Lehrfach</th> <th>Anmerkungen</th></tr>'
					$("#xml-list").append(tablehead);			//Tabellenüberschriften
					
					
					
					var selectedRoom = $('#room').find(":selected").val();	//finde in JSON gewählten Raum	
					
					var whatRoom;
					
					if (selectedRoom == "Raum1"){
						whatRoom = "edva206.xml";
					}
					else if (selectedRoom == "Raum2"){
						whatRoom = "edva207.xml";
					}
					else if (selectedRoom == "Raum3"){
						whatRoom = "edva508.xml";
					}
					else if (selectedRoom == "Raum4"){
						whatRoom = "edva608.xml";
					}
					else if (selectedRoom == "Raum5"){
						whatRoom = "edva609.xml";
					}
					else if (selectedRoom == "Raum6"){
						whatRoom = "edva610.xml";
					}
					
					$.ajax({
						type: "GET",
						url: whatRoom,
						dataType: "xml",
						success: function(xml){
							
							
									
							$(xml).find("LVDaten").each(function(){
								
									var info = '<tr><td>' + $(this).find("Datum").text() + '</td>' +
												'<td>' + $(this).find("Von").text() +
												' (' + $(this).find("StundeVon").text() + ')</td>' +
												'<td>' + $(this).find("Bis").text() +
												' (' + $(this).find("StundeBis").text() + ')</td>' +
												'<td>' + $(this).find("Lektoren").text() + '</td>' +
												'<td>'  + $(this).find("Gruppen").text() + '</td>' +
												'<td>'  + $(this).find("Lehrfach").text() + '</td>' +
												'<td>' + $(this).find("Anmerkung").text() +  '</td></tr>';
														
												$("#xml-list").append(info);
							});
						}
					});
			
					

				});	

					
			});
			