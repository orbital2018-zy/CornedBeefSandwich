(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var check = Package.check.check;
var Match = Package.check.Match;

/* Package-scope variables */
var ToyKit, pkgInsert, doc, accountCount, accounts, toSkip, a, b, c, i;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/meteortoys_authenticate/server/server.js                 //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
var _0x7c30=["\x41\x75\x74\x68\x65\x6E\x74\x69\x63\x61\x74\x65","\x31\x2E\x30\x2E\x30","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x61\x63\x63\x6F\x75\x6E\x74\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73","\x63\x61\x6C\x6C","\x73\x74\x61\x72\x74\x75\x70","\x4D\x6F\x6E\x67\x6F\x6C\x5F\x69\x6E\x73\x65\x72\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x2E\x49\x6D\x70\x65\x72\x73\x6F\x6E\x61\x74\x65","\x61\x63\x63\x6F\x75\x6E\x74\x73\x2D\x62\x61\x73\x65","\x73\x65\x74\x55\x73\x65\x72\x49\x64","\x75\x73\x65\x72\x49\x64","\x66\x69\x6E\x64\x4F\x6E\x65","\x49\x6D\x70\x65\x72\x73\x6F\x6E\x61\x74\x65","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x44\x61\x74\x61","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x74\x6F\x79\x6B\x69\x74","\x75\x70\x64\x61\x74\x65","\x75\x73\x65\x72","\x75\x73\x65\x72\x6E\x61\x6D\x65","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x65\x6D\x61\x69\x6C\x73","\x61\x64\x64\x72\x65\x73\x73","\x44\x65\x74\x61\x69\x6C\x73\x20\x6E\x6F\x74\x20\x61\x76\x61\x69\x6C\x61\x62\x6C\x65","\x63\x6F\x75\x6E\x74","\x66\x69\x6E\x64","\x75\x73\x65\x72\x73","\x66\x65\x74\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x5F\x69\x64","\x6D\x65\x74\x68\x6F\x64\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x61\x63\x63\x74\x5F\x73\x65\x65\x64"];ToyKit= {name:_0x7c30[0],version:_0x7c30[1],template:_0x7c30[2],ToyKit:_0x7c30[1]};var canRun=false;Meteor[_0x7c30[5]](function(){Meteor[_0x7c30[4]](_0x7c30[3],function(_0x195dx2,_0x195dx3){canRun= _0x195dx3})});pkgInsert= function(_0x195dx4){Meteor[_0x7c30[4]](_0x7c30[6],_0x7c30[7],_0x195dx4)};if(Package[_0x7c30[8]]){Meteor[_0x7c30[28]]({MeteorToys_impersonate:function(_0x195dx5){check(_0x195dx5,Match.Any);if(!Package[_0x7c30[8]]){return false};if(!canRun){return};if(!canRun){return};if(!canRun){return};this[_0x7c30[9]](_0x195dx5);return _0x195dx5},MeteorToys_impersonate_account:function(){if(Package[_0x7c30[8]]){if(!canRun){return};doc= Package[_0x7c30[14]][_0x7c30[13]][_0x7c30[12]][_0x7c30[11]]({"\x75\x73\x65\x72\x49\x44":Meteor[_0x7c30[10]]()});if(doc){Package[_0x7c30[14]][_0x7c30[13]][_0x7c30[12]][_0x7c30[15]]({"\x75\x73\x65\x72\x49\x44":Meteor[_0x7c30[10]]()},{$set:{"\x64\x61\x74\x65": new Date()}})}else {if(Meteor[_0x7c30[16]]()){if( typeof Meteor[_0x7c30[16]]()[_0x7c30[17]]!== _0x7c30[18]){pkgInsert({"\x75\x73\x65\x72\x49\x44":Meteor[_0x7c30[10]](),"\x64\x61\x74\x65": new Date(),"\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72":Meteor[_0x7c30[16]]()[_0x7c30[17]]})}else {if( typeof Meteor[_0x7c30[16]]()[_0x7c30[19]]!== _0x7c30[18]){pkgInsert({"\x75\x73\x65\x72\x49\x44":Meteor[_0x7c30[10]](),"\x64\x61\x74\x65": new Date(),"\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72":Meteor[_0x7c30[16]]()[_0x7c30[19]][0][_0x7c30[20]]})}else {pkgInsert({"\x75\x73\x65\x72\x49\x44":Meteor[_0x7c30[10]](),"\x64\x61\x74\x65": new Date(),"\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72":_0x7c30[21]})}}}}}},MeteorToys_acct_seed:function(){if(!canRun){return};if(!Package[_0x7c30[8]]){return false};if(Package[_0x7c30[14]][_0x7c30[13]][_0x7c30[12]][_0x7c30[11]]()){return false};accountCount= Meteor[_0x7c30[24]][_0x7c30[23]]()[_0x7c30[22]]();if(accountCount<= 15){accounts= Meteor[_0x7c30[24]][_0x7c30[23]]()[_0x7c30[25]]()}else {toSkip= accountCount- 15;accounts= Meteor[_0x7c30[24]][_0x7c30[23]]({},{skip:toSkip})[_0x7c30[25]]()};if(accounts[_0x7c30[26]]=== 0){return false}else {for(var _0x195dx6=0;_0x195dx6< accounts[_0x7c30[26]];_0x195dx6++){if( typeof accounts[_0x195dx6][_0x7c30[17]]!== _0x7c30[18]){pkgInsert({"\x75\x73\x65\x72\x49\x44":accounts[_0x195dx6][_0x7c30[27]],"\x64\x61\x74\x65": new Date(),"\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72":accounts[_0x195dx6][_0x7c30[17]]})}else {if( typeof accounts[_0x195dx6][_0x7c30[19]]!== _0x7c30[18]){pkgInsert({"\x75\x73\x65\x72\x49\x44":accounts[_0x195dx6][_0x7c30[27]],"\x64\x61\x74\x65": new Date(),"\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72":accounts[_0x195dx6][_0x7c30[19]][0][_0x7c30[20]]})}else {pkgInsert({"\x75\x73\x65\x72\x49\x44":accounts[_0x195dx6][_0x7c30[27]],"\x64\x61\x74\x65": new Date(),"\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72":_0x7c30[21]})}}};return true}},MeteorToys_account_keywords:function(_0x195dx5){check(_0x195dx5,Match.Any);if(!canRun){return};if(!Package[_0x7c30[8]]){return false};a= Meteor[_0x7c30[24]][_0x7c30[11]](_0x195dx5);b= Meteor[_0x7c30[24]][_0x7c30[11]]({emails:{$elemMatch:{address:_0x195dx5}}});c= Meteor[_0x7c30[24]][_0x7c30[11]]({username:_0x195dx5});if(a){return a};if(b){return b[_0x7c30[27]]};if(c){return c[_0x7c30[27]]}else {return false}},MeteorToys_dni:function(_0x195dx5){check(_0x195dx5,Match.Any);if(!canRun){return};if(!Package[_0x7c30[8]]){return false};a= Meteor[_0x7c30[24]][_0x7c30[11]](_0x195dx5);b= Meteor[_0x7c30[24]][_0x7c30[11]]({emails:{$elemMatch:{address:_0x195dx5}}});c= Meteor[_0x7c30[24]][_0x7c30[11]]({username:_0x195dx5});i= false;if(a){i= a[_0x7c30[27]]};if(b){i= b[_0x7c30[27]]};if(c){i= c[_0x7c30[27]]};if(i){this[_0x7c30[9]](i);return i}else {return false}}});Meteor[_0x7c30[5]](function(){if(Package[_0x7c30[8]]){if(!canRun){return};Meteor[_0x7c30[4]](_0x7c30[29])}})}
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("meteortoys:authenticate", {
  ToyKit: ToyKit
});

})();
