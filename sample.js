var StromDAONode = require("stromdao-businessobject");    
var Discovergy = require("./discovergy.js");



var node = new StromDAONode.Node({external_id:2110,testMode:true});

var ci_token ={ oauth_token: '279b9fb9f12b4b50b011baf2d0e575ac',
  oauth_token_secret: '8fb15049a772435d9193adb1764641d6',
  oauth_version: '1.0',
  oauth_options: 
   { requestUrl: 'https://api.discovergy.com/public/v1/oauth1/request_token',
     accessUrl: 'https://api.discovergy.com/public/v1/oauth1/access_token',
     consumerKey: 'u3tb6l77ek4itob9ee4lgvv0eg',
     consumerSecret: 'lqkvav2gncrt8oobrdt7to7pj9',
     signatureMethod: 'HMAC-SHA1',
     version: '1.0',
     clientOptions: 
      { accessTokenHttpMethod: 'POST',
        requestTokenHttpMethod: 'POST' } } };
	node.storage.setItemSync("ci_token",ci_token);
	
	
var dgy = new Discovergy("ci_token",node);
dgy.getMeterReading("EASYMETER_60176785", function(o) {
	
		console.log(o);
});

