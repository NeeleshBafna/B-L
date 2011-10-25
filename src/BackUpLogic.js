var control = require('./controller');

function backUp(socket){
    console.log('Inside BackUp Logic');
    socket.on('backUp',function(formData,callbackfn){
	console.log('Form data is ' + formData);
		
	//Handle Callback Properly
	control.controller(formData);
    });
}

exports.backUp = backUp;
