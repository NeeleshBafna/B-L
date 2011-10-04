dojo.provide('app.ClientSocket');

//Start ClientSocket Connecting to server

var socketFunction = function(){
    console.log('Inside ClientSocket');
    var socket = io.connect('http://127.0.0.1:80');
      
    socket.on('info', function (data) {
	console.log('Info Receieved: ' + dojo.toJson(data));
	socket.emit('info', { message: 'Successfully Connected' });
    });
    
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
