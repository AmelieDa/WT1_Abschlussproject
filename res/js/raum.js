
					
//------------------------JSON--------------------------			
$(function() {
				
	//bp: ist dasselbe wie oben (shorthand), also doppelte ready-function, siehe auch:
	//https://learn.jquery.com/using-jquery-core/document-ready/
	//$(document).ready(function(){

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
	
	//});	
				
					
//------------------------XML--------------------------

			
	$("#clear").click(function(){
		$("#xml-list").children().remove();		//vorhandene Daten löschen
	});
	$("#xmlbtn").click(function(){
			
			var selectedRoom = $('#room').val();	//finde in JSON gewählten Raum	

			//bp: laden d. xml-files in eigene methode ausgelagert
			//diese wird nun bei auswahl d. selects wie auch text-eingabe ausgeführt
			loadXMLRoomData(selectedRoom);
			
		});	

					


//---------------------------FORMULAR-----------------------------------------

	$("#checkEingabe").click(function(){
		
		var chosenOne = document.getElementById('theChosenOne').value;	//finde eingegebenen Raumnamen		
		//bp: laden d. xml-files in eigene methode ausgelagert
		//diese wird nun bei auswahl d. selects wie auch text-eingabe ausgeführt
		//validation-variable wurde hie rnicht berücksichtigt, eventuell nachziehen in funktion loadXMLRoomData
		loadXMLRoomData(chosenOne);
		
	});

});

function loadXMLRoomData(r){
	console.log("Gewählter Raum: "+r);
	var raum = r;
	
	$("#xml-list").children().remove();		//vorhandene Daten löschen
			
	var tablehead = '<tr><th>Datum</th> <th>Belegt von (Stunde)</th> <th>bis (Stunde)</th> <th>Lektoren</th> <th>Gruppen</th> <th>Lehrfach</th> <th>Anmerkungen</th></tr>'
	$("#xml-list").append(tablehead);			//Tabellenüberschriften
			
	var whatRoom;
			
			if (raum == "Raum1"){
				whatRoom = "edva206.xml";
			}
			else if (raum == "Raum2"){
				whatRoom = "edva207.xml";
			}
			else if (raum == "Raum3"){
				whatRoom = "edva508.xml";
			}
			else if (raum == "Raum4"){
				whatRoom = "edva608.xml";
			}
			else if (raum == "Raum5"){
				whatRoom = "edva609.xml";
			}
			else if (raum == "Raum6"){
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

			

}

