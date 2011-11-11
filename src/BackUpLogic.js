var control = require('./controller');

function backUp(socket){
    console.log('Inside BackUp Logic');
    socket.on('backUp',function(formData,callbackfn){
	console.log('Form data is ' + formData);	
	control.controller(formData,callbackfn);
    });
}

exports.backUp = backUp;
