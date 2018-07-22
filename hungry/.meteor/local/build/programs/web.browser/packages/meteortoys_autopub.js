//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Template = Package['templating-runtime'].Template;
var Mongo = Package.mongo.Mongo;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var MeteorToysDict;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/meteortoys_autopub/client/template.main.js                                                  //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //

Template.__checkName("MeteorToys_autopub");
Template["MeteorToys_autopub"] = new Template("Template.MeteorToys_autopub", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "MeteorToys_orb MeteorToys_button ", Spacebars.mustache(view.lookup("autopub_state")) ];
    },
    id: "MeteorToys_autopub",
    oncontextmenu: "Package['meteortoys:toykit'].MeteorToys.closeToy();return false;"
  }, HTML.Raw('\t\n\t\t<div class="MeteorToys_icon"></div>\n\t\t<div class="MeteorToys_orb_filler_wrapper"></div>\n\t'));
}));

//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/meteortoys_autopub/client/main.js                                                           //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var _0x4482=["\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x44\x69\x63\x74","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x74\x6F\x79\x6B\x69\x74","\x63\x6F\x75\x6E\x74","\x66\x69\x6E\x64","\x41\x75\x74\x6F\x50\x75\x62","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x44\x61\x74\x61","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x61\x75\x74\x6F\x70\x75\x62\x6C\x69\x73\x68\x5F\x70\x65\x72\x73\x69\x73\x74\x65\x6E\x74","\x73\x65\x74","\x61\x75\x74\x6F\x72\x75\x6E","\x67\x65\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x61\x75\x74\x6F\x70\x75\x62\x6C\x69\x73\x68\x5F\x69\x73\x6F\x6C\x61\x74\x65\x64","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x61\x75\x74\x6F\x70\x75\x62\x6C\x69\x73\x68","\x63\x74\x72\x6C\x4B\x65\x79","\x6D\x65\x74\x61\x4B\x65\x79","\x73\x68\x69\x66\x74\x4B\x65\x79","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x61\x75\x74\x6F\x70\x75\x62","\x54\x68\x65\x72\x65\x20\x68\x61\x73\x20\x62\x65\x65\x6E\x20\x61\x6E\x20\x65\x72\x72\x6F\x72\x20\x65\x6E\x61\x62\x6C\x69\x6E\x67\x20\x70\x65\x72\x73\x69\x73\x74\x65\x6E\x74\x20\x41\x75\x74\x6F\x50\x75\x62\x2E","\x63\x61\x6C\x6C","\x66\x6F\x63\x75\x73","\x54\x6F\x79\x4B\x69\x74","\x65\x76\x65\x6E\x74\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x41\x75\x74\x6F\x50\x75\x62\x5F\x70\x65\x72\x73\x69\x73\x74\x65\x6E\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x41\x75\x74\x6F\x50\x75\x62\x5F\x61\x63\x74\x69\x76\x65","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x41\x75\x74\x6F\x50\x75\x62","\x68\x65\x6C\x70\x65\x72\x73"];MeteorToysDict= Package[_0x4482[1]][_0x4482[0]];Tracker[_0x4482[8]](function(){if(Package[_0x4482[1]][_0x4482[5]][_0x4482[4]][_0x4482[3]]()[_0x4482[2]]()=== 1){MeteorToysDict[_0x4482[7]](_0x4482[6],true)}else {MeteorToysDict[_0x4482[7]](_0x4482[6],false)}});Tracker[_0x4482[8]](function(){var _0x92e7x1=MeteorToysDict[_0x4482[9]](_0x4482[6]);var _0x92e7x2=MeteorToysDict[_0x4482[9]](_0x4482[10]);if(_0x92e7x1){MeteorToysDict[_0x4482[7]](_0x4482[11],true)}else {if(_0x92e7x2){MeteorToysDict[_0x4482[7]](_0x4482[11],true)}else {MeteorToysDict[_0x4482[7]](_0x4482[11],false)}}});Template[_0x4482[15]][_0x4482[20]]({"\x63\x6C\x69\x63\x6B":function(_0x92e7x3,_0x92e7x4){if(_0x92e7x3[_0x4482[12]]|| _0x92e7x3[_0x4482[13]]|| _0x92e7x3[_0x4482[14]]){Meteor[_0x4482[17]](_0x4482[15],function(_0x92e7x3,_0x92e7x5){if(_0x92e7x3){alert(_0x4482[16])}})}else {if(MeteorToysDict[_0x4482[9]](_0x4482[10])){MeteorToysDict[_0x4482[7]](_0x4482[10],false)}else {MeteorToysDict[_0x4482[7]](_0x4482[10],true)}}},"\x6D\x6F\x75\x73\x65\x6F\x76\x65\x72":function(){Package[_0x4482[1]][_0x4482[19]][_0x4482[7]](_0x4482[18],_0x4482[15])},"\x6D\x6F\x75\x73\x65\x6F\x75\x74":function(){Package[_0x4482[1]][_0x4482[19]][_0x4482[7]](_0x4482[18])}});Template[_0x4482[15]][_0x4482[24]]({autopub_state:function(){if(MeteorToysDict[_0x4482[9]](_0x4482[6])){return _0x4482[21]}else {if(MeteorToysDict[_0x4482[9]](_0x4482[10])){return _0x4482[22]}else {return _0x4482[23]}}}})
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("meteortoys:autopub");

})();
