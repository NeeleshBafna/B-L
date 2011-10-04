var Client = require('./KnoxClient');
function backUp(socket){
    console.log('Inside BackUp Logic');
    socket.on('backUp',function(accessKey,secretKey,filePath,bucket,callbackfn){
	Client.knoxClient(accessKey,secretKey,filePath,bucket,callbackfn);
    });
}

exports.backUp = backUp;