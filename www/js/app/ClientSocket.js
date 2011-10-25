dojo.provide('app.ClientSocket');

//Start 'ClientSocket' Connecting to server
var socketFunction = function(){
    console.log('Inside ClientSocket');
    var socket = io.connect('http://127.0.0.1:8080');
      
    socket.on('info', function (data) {
	console.log('Info Receieved: ' + dojo.toJson(data));
	socket.emit('info', { message: 'Successfully Connected' });
    });
    
    console.log(" welcome to B+L Backup Handling Page");

    dojo.connect(dijit.byId('backUpButtonId'),"onClick",function(e) {
	if (dijit.byId("backUpForm").validate()){
                if(confirm("Ready to submit data")){	
		//dijit.byId('backUpButtonId').setLabel('Backing Up...');          
 		socket.emit('backUp',//dijit.byId('accessKeyId').attr('value'),
			//dijit.byId('secretKeyId').get('value'), 
         	        //dijit.byId('directoryPathId').get('value'), 
			//dijit.byId('bucketId').get('value'),
			//dijit.byId('folderId').get('value'), 
			    dojo.formToJson('backUpForm'),
			function(data){
			    alert(dojo.toJson(data));
			    });
		    console.log('Form Data is ' + dojo.formToJson('backUpForm'));
		}
	}
	else{
	alert("Correct the necessary fields");
	//dijit.byId('backUpButtonId').cancel();
	}
    });

/*    socket.on('done',function(data){
	console.log(dojo.toJson(data));
	dijit.byId('backUpButtonId').cancel();
    });*/

    socket.on('note',function(data){
	alert(dojo.toJson(data));
    });
}
