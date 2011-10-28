var controller = function(formData){
var fs = require('fs');
var exec = require('child_process').exec;
var async = require('async');

function callBackFn(error, stdout, stderr){ 
    if(stdout)console.log('stdout is: ' + stdout);
    if(stderr)console.log('stderr is: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
 }

    fs.readFile(__dirname+'/config',function(err,buf){
	var configObject = JSON.parse(buf);
	var machineName= configObject.machines[0].machinename;
	var pswd = configObject.password;

	fs.writeFile('arguments.txt',formData,function(err){
	    if(err)throw err;
	    else console.log('Arguments Saved');
	});
   /*async.series([
	function(callBackFn){
	exec('sshpass -p '+pswd+' ssh '+machineName+' mkdir BL',callBackFn);},
	function(callBackFn){
	exec('sshpass -p '+pswd+' scp '+__dirname+'/* '+machineName+':~/BL/',callBackFn);},
	function(callBackFn){
	exec('sshpass -p '+pswd+' ssh '+machineName+' node ~/BL/remote.js',callBackFn);},
	],callBackFn);*/
	exec('sshpass -p '+pswd+' ssh '+machineName+' mkdir BL',function(error,stdout,stderr){
	    exec('sshpass -p '+pswd+' scp '+__dirname+'/* '+machineName+':~/BL/',function(error,stdout,stderr){
		console.log('Serial Callback');
		exec('sshpass -p '+pswd+' ssh '+machineName+' node ~/BL/remote.js',callBackFn);
	    });
	});
    });
};

exports.controller = controller;
