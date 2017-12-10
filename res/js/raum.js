			/*var sound = new Audio("../res/vid/barcode.wav");

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

			});*/
					
//------------------------JSON--------------------------			
$(function() {
				
	$(document).ready(function(){

			$.getJSON( "../res/json/rooms.json", function( data ) {
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

			
	$("#clear").click(function(){
		$("#xml-list").children().remove();		//vorhandene Daten löschen
	});
	$("#xmlbtn").click(function(){
						
			$("#xml-list").children().remove();		//vorhandene Daten löschen
			
			var tablehead = '<tr><th>Datum</th> <th>Belegt von (Stunde)</th> <th>bis (Stunde)</th> <th>Lektoren</th> <th>Gruppen</th> <th>Lehrfach</th> <th>Anmerkungen</th></tr>'
			$("#xml-list").append(tablehead);			//Tabellenüberschriften
			
			
			
			var selectedRoom = $('#room').find(":selected").val();	//finde in JSON gewählten Raum	
			
			var whatRoom;
			
			if (selectedRoom == "Raum1"){
				whatRoom = "../res/xml/edva206.xml";
			}
			else if (selectedRoom == "Raum2"){
				whatRoom = "../res/xml/edva207.xml";
			}
			else if (selectedRoom == "Raum3"){
				whatRoom = "../res/xml/edva508.xml";
			}
			else if (selectedRoom == "Raum4"){
				whatRoom = "../res/xml/edva608.xml";
			}
			else if (selectedRoom == "Raum5"){
				whatRoom = "../res/xml/edva609.xml";
			}
			else if (selectedRoom == "Raum6"){
				whatRoom = "../res/xml/edva610.xml";
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

					


//---------------------------FORMULAR-----------------------------------------

	$("#checkEingabe").click(function(){
		
		
		var chosenOne = document.getElementById('theChosenOne').value;	//finde eingegebenen Raumnamen
		var validation = 0;
		var thatRoom;
		
		if (chosenOne == "Raum1"){
			thatRoom = "../res/xml/edva206.xml";
			validation = 1;
		}
		else if (chosenOne == "Raum2"){
			thatRoom = "../res/xml/edva207.xml";
			validation = 1;
		}
		else if (chosenOne == "Raum3"){
			thatRoom = "../res/xml/edva508.xml";
			validation = 1;
		}
		else if (chosenOne == "Raum4"){
			thatRoom = "../res/xml/edva608.xml";
			validation = 1;
		}
		else if (chosenOne == "Raum5"){
			thatRoom = "../res/xml/edva609.xml";
			validation = 1;
		}
		else if (chosenOne == "Raum6"){
			thatRoom = "../res/xml/edva610.xml";
			validation = 1;
		}
		
		if (validation == 1){
			
			$("#xml-list").children().remove();		//vorhandene Daten löschen
							
			var tablehead = '<tr><th>Datum</th> <th>Belegt von (Stunde)</th> <th>bis (Stunde)</th> <th>Lektoren</th> <th>Gruppen</th> <th>Lehrfach</th> <th>Anmerkungen</th></tr>'
			$("#xml-list").append(tablehead);			//Tabellenüberschriften
			
			$.ajax({
				type: "GET",
				url: thatRoom,
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
			
		}
		else {
			alert("Ungültiger Raumname!");
		}
		
		
	});

});

