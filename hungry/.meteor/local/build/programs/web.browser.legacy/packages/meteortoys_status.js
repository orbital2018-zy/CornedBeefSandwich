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
// packages/meteortoys_status/client/template.main.js                                    //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //

Template.__checkName("MeteorToys_status");
Template["MeteorToys_status"] = new Template("Template.MeteorToys_status", (function() {
  var view = this;
  return HTML.DIV({
    class: "MeteorToys_orb MeteorToys_button",
    id: "MeteorToys_status",
    oncontextmenu: "Package['meteortoys:toykit'].MeteorToys.closeToy(); return false;"
  }, "\t\n\t\t", HTML.DIV({
    class: function() {
      return [ "MeteorToys_icon ", Spacebars.mustache(view.lookup("state")) ];
    }
  }), HTML.Raw('\n\t\t<div class="MeteorToys_orb_filler_wrapper"></div>\n\t'));
}));

///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/meteortoys_status/client/main.js                                             //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var _0x2a7e=["\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x44\x69\x63\x74","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x74\x6F\x79\x6B\x69\x74","\x63\x6F\x6E\x6E\x65\x63\x74\x65\x64","\x73\x74\x61\x74\x75\x73","\x64\x69\x73\x63\x6F\x6E\x6E\x65\x63\x74","\x72\x65\x63\x6F\x6E\x6E\x65\x63\x74","\x66\x6F\x63\x75\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x73\x74\x61\x74\x75\x73","\x73\x65\x74","\x54\x6F\x79\x4B\x69\x74","\x65\x76\x65\x6E\x74\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x69\x63\x6F\x6E\x5F","\x68\x65\x6C\x70\x65\x72\x73"];MeteorToysDict= Package[_0x2a7e[1]][_0x2a7e[0]];Template[_0x2a7e[7]][_0x2a7e[10]]({"\x63\x6C\x69\x63\x6B":function(_0x55ffx1,_0x55ffx2){if(Meteor[_0x2a7e[3]]()[_0x2a7e[2]]){Meteor[_0x2a7e[4]]()}else {Meteor[_0x2a7e[5]]()}},"\x6D\x6F\x75\x73\x65\x6F\x76\x65\x72":function(){Package[_0x2a7e[1]][_0x2a7e[9]][_0x2a7e[8]](_0x2a7e[6],_0x2a7e[7])},"\x6D\x6F\x75\x73\x65\x6F\x75\x74":function(){Package[_0x2a7e[1]][_0x2a7e[9]][_0x2a7e[8]](_0x2a7e[6])}});Template[_0x2a7e[7]][_0x2a7e[12]]({state:function(){return _0x2a7e[11]+ Meteor[_0x2a7e[3]]()[_0x2a7e[3]]}})
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("meteortoys:status");

})();
