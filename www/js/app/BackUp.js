dojo.provide('app.BackUp');

//Start the Back Up
//Presently NOT Using it. Will later Utilize this modularity
var backUp = function(socket){
	console.log(" welcome to B+L Backup Handling Page");

	dojo.connect(dijit.byId('backUpButtonId'),"onClick",function(e) {
	e.preventDefault();	
	if (dijit.byId("backUpForm").validate()){
                if(confirm("Ready to submit data")){	            
 		socket.emit('backUp',
			    dojo.formToJson('backUpForm'),
 			    function(data){
				alert(dojo.toJson(data));
			    });
		   //backUpForm.reset();
		}
	}
	else{
	alert("Correct the necessary fields");
	}
	});
}
