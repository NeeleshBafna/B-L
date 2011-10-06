dojo.provide('app.Base');

dojo.require("dijit.form.Form");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.FilteringSelect");

// Load the dojo.fx module
dojo.require("dojo.fx");
dojo.require("dojo.parser");
dojo.require("dojox.form.BusyButton");
//dojo.require("dojox.form.FileInputFlash");

dojo.require('app.ClientSocket');
//dojo.require('app.BackUp');
dojo.ready(function(){
    socketFunction();
  //  backUp;	
});
