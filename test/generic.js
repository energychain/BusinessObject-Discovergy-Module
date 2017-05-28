/**
  * StromDAO Business Object - Discovergy Module
  * Generic Test
*/

var assert = require('assert');
var StromDAONode = require("stromdao-businessobject");    
var Discovergy = require("../discovergy.js");

describe('StromDAO: Discovegy Module', function() {
	this.timeout(300000);
    var external_id = Math.random()*10000000; 
	var node = new StromDAONode.Node({external_id:external_id,testMode:true});
	var ci_token ={ oauth_token: '8347c186a0de4843b9134b779de99465',
  oauth_token_secret: '6a943bf9a63e4c7f9382f4fe9f460f00',
  oauth_version: '1.0',
  oauth_options: 
   { requestUrl: 'https://api.discovergy.com/public/v1/oauth1/request_token',
     accessUrl: 'https://api.discovergy.com/public/v1/oauth1/access_token',
     consumerKey: 'glsrq8ah4j2nverk59inc11am7',
     consumerSecret: '7sq2ov5g80hdk2rjkoqlh706gs',
     signatureMethod: 'HMAC-SHA1',
     version: '1.0',
     clientOptions: 
      { accessTokenHttpMethod: 'POST',
        requestTokenHttpMethod: 'POST' } } };
	node.storage.setItemSync("ci_token",ci_token);
	var reading_1=0;
	var reading_2=0;
	var reading_3=0;
	var address_1="";
	var address_2="";
	var address_3="";
	
	describe('Connect to Discovergy API', function() {

		it('Get Meter Reading for 1039000671 and commit as ExtID 1039000671', function(done) {
						var dgy = new Discovergy("ci_token",node);
						dgy.getMeterReading("EASYMETER_1039000671", function(o) {
								var values = o.values;
								
								if(typeof values != "undefined") {	
									var energy = ""+values.energy+"";
									energy=energy.substr(0,energy.length-7);
													
									reading_1=energy*1;
									console.log("    Reading #1",reading_1);
									var node = new StromDAONode.Node({external_id:"1039000671",testMode:true});
									node.mpr().then(function(mpr) {
											mpr.storeReading(reading_1).then( function(tx) {
											
											console.log("    @MP Address",node.wallet.address);
											address_1=node.wallet.address;
											assert.equal(tx.length,66);
											assert.equal(reading_1>0,true);
											done();	
									 });
									});								
								}
						});
		});	
		it('Get Meter Reading for 60176785 (Consumption) and commit as ExtID 60176785_OUT', function(done) {
						var dgy = new Discovergy("ci_token",node);
						dgy.getMeterReading("EASYMETER_60176785", function(o) {
								var values = o.values;
								
								if(typeof values != "undefined") {	
									var energy = ""+values.energy+"";
									energy=energy.substr(0,energy.length-7);
													
									reading_2=energy*1;
									console.log("    Reading #2",reading_2);
									var node = new StromDAONode.Node({external_id:"60176785_OUT",testMode:true});
									node.mpr().then(function(mpr) {
											mpr.storeReading(reading_2).then( function(tx) {
											
											console.log("    @MP Address",node.wallet.address);
											address_2=node.wallet.address;
											assert.equal(tx.length,66);
											assert.equal(reading_2>0,true);
											done();	
									 });
									});								
								}
						});
		});	
		it('Get Meter Reading for 60176785 (Generation) and commit as ExtID 60176785_IN', function(done) {
						var dgy = new Discovergy("ci_token",node);
						dgy.getMeterReading("EASYMETER_60176785", function(o) {
								var values = o.values;
								
								if(typeof values != "undefined") {	
									var energy = ""+values.energyOut+"";
									energy=energy.substr(0,energy.length-7);
													
									reading_3=energy*1;
									console.log("    Reading #3",reading_3);
									var node = new StromDAONode.Node({external_id:"60176785_IN",testMode:true});
									node.mpr().then(function(mpr) {
											mpr.storeReading(reading_3).then( function(tx) {
											console.log("    @MP Address",node.wallet.address);
											address_3=node.wallet.address;
											assert.equal(tx.length,66);
											assert.equal(reading_2>0,true);
											done();	
									 });
									});								
								}
						});
		});			
		it('Check BC Consens Meter 1 (1039000671)', function(done) {
									var node = new StromDAONode.Node({external_id:external_id,testMode:true});
									node.mpr().then(function(mpr) {
											mpr.readings(address_1).then( function(tx) {	
											assert.equal(tx.power.toString()*1,reading_1);											
											done();	
									 });
									});																
		});			
		it('Check BC Consens Meter 2 (60176785_OUT)', function(done) {
									var node = new StromDAONode.Node({external_id:external_id,testMode:true});
									node.mpr().then(function(mpr) {
											mpr.readings(address_2).then( function(tx) {										
											assert.equal(tx.power.toString()*1,reading_2);											
											done();	
									 });
									});																
		});		
		it('Check BC Consens Meter 3 (60176785_IN)', function(done) {
									var node = new StromDAONode.Node({external_id:external_id,testMode:true});
									node.mpr().then(function(mpr) {
											mpr.readings(address_3).then( function(tx) {										
											assert.equal(tx.power.toString()*1,reading_3);											
											done();	
									 });
									});																
		});								
	});
});	
