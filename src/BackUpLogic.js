var Client = require('./KnoxClient');

function backUp(socket){
    console.log('Inside BackUp Logic');

    socket.on('backUp',function(accessKey,secretKey,directoryPath,bucket,folder,callbackfn){
	Client.knoxClient(socket,accessKey,secretKey,directoryPath,bucket,folder,callbackfn);
    });
}

exports.backUp = backUp;
