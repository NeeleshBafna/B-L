scriptExec();

function scriptExec(){
console.log('Inside Script Exec');

var sys = require('sys');
var fs = require('fs');
var exec = require('child_process').exec;
var pwd = __dirname;

function callBackFn(error, stdout, stderr){ 
    if(stdout)console.log('stdout is: ' + stdout);
    if(stderr)console.log('stderr is: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
 }

    fs.readFile(pwd+'/arguments.txt',function(err,buf){
	if(err){
	    throw err;
	}else{
	    data = JSON.parse(buf);
	    hour = data.scheduleTime.slice(1,3);
            min = data.scheduleTime.slice(4,6);
	    var command = min+' '+hour+' '+data.day+' '+data.month+' '+data.week+' '+pwd+'/duplicityScript.sh '+data.accessKey+' '+data.secretKey+' '+data.bucket+' '+data.directoryToBackUp +' >> ' + pwd+'/backupLog'+'\n';
	    console.log('command is ' + command);
	    fs.open(pwd+'/scheduler','a+',undefined,function(err,fd){
		if(err)throw err;
		else{
		    fs.write(fd,command,undefined,undefined,function(err,written){
		   	if (err) throw err;
			exec('cat ~/BL/scheduler | crontab -', callBackFn);
			console.log('It\'s saved!');
			// fs.close(fd);
		    });
		}
	    });
	}
	exec('rm ~/BL/arguments.txt', callBackFn);
  });
  
}
