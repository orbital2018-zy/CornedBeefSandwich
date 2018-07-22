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
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var MeteorToysDict;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/meteortoys_hotreload/client/template.main.js                                 //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //

Template.__checkName("MeteorToys_reload");
Template["MeteorToys_reload"] = new Template("Template.MeteorToys_reload", (function() {
  var view = this;
  return HTML.Raw('<div class="MeteorToys_orb MeteorToys_button" id="MeteorToys_reload" oncontextmenu="Package[\'meteortoys:toykit\'].MeteorToys.closeToy(); return false;">\t\n\t\t<div class="MeteorToys_icon"></div>\n\t\t<div class="MeteorToys_orb_filler_wrapper"></div>\n\t</div>');
}));

///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/meteortoys_hotreload/client/main.js                                          //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _0xe6bf=["\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x44\x69\x63\x74","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x74\x6F\x79\x6B\x69\x74","\x73\x74\x61\x72\x74\x75\x70","\x72\x65\x6C\x6F\x61\x64","\x5F\x72\x65\x6C\x6F\x61\x64","\x66\x6F\x63\x75\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x72\x65\x6C\x6F\x61\x64","\x73\x65\x74","\x54\x6F\x79\x4B\x69\x74","\x65\x76\x65\x6E\x74\x73"];Meteor[_0xe6bf[2]](function(){MeteorToysDict= Package[_0xe6bf[1]][_0xe6bf[0]]});Template[_0xe6bf[6]][_0xe6bf[9]]({"\x63\x6C\x69\x63\x6B":function(){Meteor[_0xe6bf[4]][_0xe6bf[3]]()},"\x6D\x6F\x75\x73\x65\x6F\x76\x65\x72":function(){Package[_0xe6bf[1]][_0xe6bf[8]][_0xe6bf[7]](_0xe6bf[5],_0xe6bf[6])},"\x6D\x6F\x75\x73\x65\x6F\x75\x74":function(){Package[_0xe6bf[1]][_0xe6bf[8]][_0xe6bf[7]](_0xe6bf[5])}})
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("meteortoys:hotreload");

})();
