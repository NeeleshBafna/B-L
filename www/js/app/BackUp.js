dojo.provide('app.BackUp');

//Start the Back Up
var backUp = function(socket){
	console.log(" welcome to B+L Backup Handling Page");

	dojo.connect(dijit.byId('backUpButtonId'),"onClick",function(e) {
	e.preventDefault();	
	if (dijit.byId("backUpForm").validate()){
                if(confirm("Ready to submit data")){	            
 		socket.emit('backUp',dijit.byId('accessKeyId').attr('value'),
			dijit.byId('secretKeyId').attr('value'), 
         	        dijit.byId('filePathId').attr('value'), 
			dijit.byId('bucketId').attr('value'), 
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