(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var WebApp = Package.webapp.WebApp;
var WebAppInternals = Package.webapp.WebAppInternals;
var main = Package.webapp.main;
var check = Package.check.check;
var Match = Package.check.Match;

/* Package-scope variables */
var ToyKit;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/meteortoys_shell/server/main.js                          //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
var _0xc7dc=["\x53\x68\x65\x6C\x6C","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x73\x68\x65\x6C\x6C","\x6F\x72\x62","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73","\x63\x61\x6C\x6C","\x73\x74\x61\x72\x74\x75\x70","\x62\x6F\x6F\x6C\x65\x61\x6E","\x28\x66\x75\x6E\x63\x74\x69\x6F\x6E\x28\x29\x20\x7B","\x7D\x29\x28\x29\x3B","\x54\x6F\x20\x65\x6E\x61\x62\x6C\x65\x20\x53\x68\x65\x6C\x6C\x2C\x20\x20\x79\x6F\x75\x20\x6D\x75\x73\x74\x20\x73\x65\x74\x20\x4D\x45\x54\x45\x4F\x52\x54\x4F\x59\x53\x53\x48\x45\x4C\x4C\x45\x4E\x41\x42\x4C\x45\x44\x20\x61\x73\x20\x61\x20\x60\x74\x72\x75\x65\x60\x20\x67\x6C\x6F\x62\x61\x6C\x20\x76\x61\x72\x69\x61\x62\x6C\x65\x20\x6F\x6E\x20\x74\x68\x65\x20\x73\x65\x72\x76\x65\x72\x2E","\x6D\x65\x74\x68\x6F\x64\x73"];ToyKit= {name:_0xc7dc[0],template:_0xc7dc[1],type:_0xc7dc[2]};var canRun=false;Meteor[_0xc7dc[5]](function(){Meteor[_0xc7dc[4]](_0xc7dc[3],function(_0xc5a5x2,_0xc5a5x3){canRun= _0xc5a5x3})});Meteor[_0xc7dc[10]]({MeteorToys_sh:function(_0xc5a5x4){check(_0xc5a5x4,Match.Any);if(!canRun){return};if( typeof METEORTOYSSHELLENABLED=== _0xc7dc[6]){if(METEORTOYSSHELLENABLED=== true){return eval(_0xc7dc[7]+ _0xc5a5x4+ _0xc7dc[8])}}else {return _0xc7dc[9]}}})
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("meteortoys:shell", {
  ToyKit: ToyKit
});

})();
