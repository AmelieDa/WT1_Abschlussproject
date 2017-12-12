
					
//------------------------JSON--------------------------			
$(function() {
				
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
		
				
					
//------------------------XML--------------------------

			
	$("#clear").click(function(){
		$("#xml-list").children().remove();		//vorhandene Daten löschen
	});
	
	$("#xmlbtn").click(function(){
			
			var selectedRoom = $('#room').val();	//finde in JSON gewählten Raum	

			loadXMLRoomData(selectedRoom);		//xml-files in eigene methode ausgelagert			
		});	

					


//---------------------------FORMULAR-----------------------------------------

	$("#checkEingabe").click(function(){
		
		var chosenOne = document.getElementById('theChosenOne').value;	//finde eingegebenen Raumnamen		
		loadXMLRoomData(chosenOne);
		
	});

});

function loadXMLRoomData(r){
	//console.log("Gewählter Raum: "+r);
	var raum = r;
	
	$("#xml-list").children().remove();		//vorhandene Daten löschen
			
	var tablehead = '<tr><th>Datum</th> <th>von (Stunde)</th> <th>bis (Stunde)</th> <th>Lektoren</th> <th>Gruppen</th> <th>Lehrfach</th> <th>Anmerkungen</th></tr>'
	$("#xml-list").append(tablehead);			//Tabellenüberschriften
			
	var whatRoom;
			
			if (raum == "Raum1" || raum == "EDV_A2.06" || raum == "EDVA206"){
				whatRoom = "../res/xml/edva206.xml";
			}
			else if (raum == "Raum2" || raum == "EDV_A2.07" || raum == "EDVA207"){
				whatRoom = "../res/xml/edva207.xml";
			}
			else if (raum == "Raum3" || raum == "EDV_A5.08" || raum == "EDVA508"){
				whatRoom = "../res/xml/edva508.xml";
			}
			else if (raum == "Raum4" || raum == "EDV_A6.08" || raum == "EDVA608"){
				whatRoom = "../res/xml/edva608.xml";
			}
			else if (raum == "Raum5" || raum == "EDV_A6.09" || raum == "EDVA609"){
				whatRoom = "../res/xml/edva609.xml";
			}
			else if (raum == "Raum6" || raum == "EDV_A6.10" || raum == "EDVA610"){
				whatRoom = "../res/xml/edva610.xml";
			}
			else{
				alert("Verzeihung. Diesen Raum kennen wir nicht!");
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

			

}

