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
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var MeteorToys, target;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/meteortoys_mobile/client/template.main.js                                                            //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //

Template.__checkName("MeteorToysMobile");
Template["MeteorToysMobile"] = new Template("Template.MeteorToysMobile", (function() {
  var view = this;
  return HTML.DIV({
    id: "MeteorToys_Cordova",
    class: "MeteorToys MeteorToys_notification_symbol"
  }, "\n\t\t", HTML.DIV({
    class: "MeteorToys_Cordova_wrapper MeteorToys-background-foundation"
  }, "\n\t\t\t", HTML.DIV({
    class: "MeteorToys_Cordova_header MeteorToys-background-overlay1 "
  }, "\t\n\t\t\t\t", Spacebars.include(view.lookupTemplate("MeteorToysMobileSession")), "\n\t\t\t\t", HTML.Raw('<div class="MeteorToys_name">\n\t\t\t\t\t<strong>Authenticate</strong>\n\t\t\t\t</div>'), "\n\t\t\t"), "\n\t\t\t", HTML.Raw('<!-- <div class="MeteorToys_Cordova_content "> -->'), "\n\t\t\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_mobile_account")), "\n\t\t\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_mobile_connection")), "\n\t\t\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_mobile_reloader")), "\n\t\t\t", HTML.Raw("<!-- </div> -->"), "\n\t\t"), "\n\t");
}));

Template.__checkName("MeteorToys_mobile_account");
Template["MeteorToys_mobile_account"] = new Template("Template.MeteorToys_mobile_account", (function() {
  var view = this;
  return Blaze.Each(function() {
    return Spacebars.call(view.lookup("account"));
  }, function() {
    return [ "\n\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_mobile_account_row")), "\n\t" ];
  }, function() {
    return [ "\n\t\t", HTML.DIV({
      class: "MeteorToys_row"
    }, "\n\t\t\tNo accounts present.\n\t\t"), "\n\t" ];
  });
}));

Template.__checkName("MeteorToysMobileSession");
Template["MeteorToysMobileSession"] = new Template("Template.MeteorToysMobileSession", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("SessionEndable"));
  }, function() {
    return [ "\n\t\t", HTML.DIV({
      class: "MeteorToys_logout_temp MeteorToys-border-color-overlay2",
      id: "MeteorToys_logout_temp"
    }, "\n\t\t\tEnd Session\n\t\t"), "\n\t" ];
  });
}));

Template.__checkName("MeteorToys_mobile_account_row");
Template["MeteorToys_mobile_account_row"] = new Template("Template.MeteorToys_mobile_account_row", (function() {
  var view = this;
  return HTML.DIV({
    class: "MeteorToys_row"
  }, "\n\t\t", Blaze.If(function() {
    return Spacebars.call(view.lookup("auth"));
  }, function() {
    return [ "\n\t\t\t", HTML.DIV({
      class: "MeteorToys_mobile_check MeteorToys-background-green"
    }, "\n\t\t\t"), "\n\t\t" ];
  }), "\n\t\t", Blaze.If(function() {
    return Spacebars.call(view.lookup("imp"));
  }, function() {
    return [ "\n\t\t\t", HTML.DIV({
      class: "MeteorToys_mobile_check MeteorToys-background-green"
    }, "\n\t\t\t"), "\n\t\t" ];
  }), "\n\t\t", Blaze.View("lookup:identifier", function() {
    return Spacebars.mustache(view.lookup("identifier"));
  }), "\n\t");
}));

Template.__checkName("MeteorToys_mobile_reloader");
Template["MeteorToys_mobile_reloader"] = new Template("Template.MeteorToys_mobile_reloader", (function() {
  var view = this;
  return [ HTML.Raw('<div class="MeteorToys_Cordova_header MeteorToys-background-overlay1" style="margin-top: -1px"><strong>Other Options</strong></div>\n\t<div class="MeteorToys_row" id="MeteorToys_reload_hot">\n\t\tHot Reload\n\t</div>\n\t<div class="MeteorToys_row" id="MeteorToys_reload_window">\n\t\tReload\n\t</div>\n\t'), Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n\t\t", HTML.DIV({
      class: "MeteorToys_row",
      id: "MeteorToys_logout"
    }, "\n\t\t\tLogout\n\t\t"), "\n\t" ];
  }), HTML.Raw('\n\t<div class="MeteorToys_row" id="MeteorToys_close">\n\t\tClose Toy\n\t</div>') ];
}));

Template.__checkName("MeteorToys_mobile_connection");
Template["MeteorToys_mobile_connection"] = new Template("Template.MeteorToys_mobile_connection", (function() {
  var view = this;
  return [ HTML.DIV({
    class: "MeteorToys_Cordova_header MeteorToys-background-overlay1",
    style: "margin-top: -1px"
  }, "\n\t\t", HTML.Raw("<strong>Connection Status:</strong>"), " ", Blaze.View("lookup:status", function() {
    return Spacebars.mustache(view.lookup("status"));
  }), "\n\t"), HTML.Raw('\n\t<div class="MeteorToys_row" id="MeteorToys_forceReconnect">\n\t\tForce Connect\n\t</div>\n\t<div class="MeteorToys_row" id="MeteorToys_forceDisconnect">\n\t\tForce Disconnect\n\t</div>') ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/meteortoys_mobile/client/main.js                                                                     //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
var _0xb1c6=["\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x74\x6F\x79\x6B\x69\x74","\x73\x74\x61\x72\x74\x75\x70","\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74","\x73\x74\x6F\x70\x50\x72\x6F\x70\x61\x67\x61\x74\x69\x6F\x6E","\x61","\x6C\x6F\x67","\x65\x6E\x64\x53\x65\x73\x73\x69\x6F\x6E","\x4D\x54\x41\x75\x74\x68\x65\x6E\x74\x69\x63\x61\x74\x65","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x61\x75\x74\x68\x65\x6E\x74\x69\x63\x61\x74\x65","\x62","\x65\x76\x65\x6E\x74\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x4D\x6F\x62\x69\x6C\x65\x53\x65\x73\x73\x69\x6F\x6E","\x75\x73\x65\x72","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x69\x6D\x70\x65\x72\x73\x6F\x6E\x61\x74\x65","\x67\x65\x74","\x68\x65\x6C\x70\x65\x72\x73","\x72\x65\x6E\x64\x65\x72\x65\x64","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x4D\x6F\x62\x69\x6C\x65","\x68\x69\x64\x65\x54\x6F\x67\x67\x6C\x65","\x73\x65\x74","\x73\x74\x61\x74\x75\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6D\x6F\x62\x69\x6C\x65\x5F\x63\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x61\x63\x63\x6F\x75\x6E\x74\x73\x2D\x62\x61\x73\x65","\x66\x69\x6E\x64","\x49\x6D\x70\x65\x72\x73\x6F\x6E\x61\x74\x65","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x44\x61\x74\x61","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6D\x6F\x62\x69\x6C\x65\x5F\x61\x63\x63\x6F\x75\x6E\x74","\x75\x73\x65\x72\x49\x44","\x69\x6D\x70\x65\x72\x73\x6F\x6E\x61\x74\x65","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6D\x6F\x62\x69\x6C\x65\x5F\x61\x63\x63\x6F\x75\x6E\x74\x5F\x72\x6F\x77","\x75\x73\x65\x72\x49\x64","\x65\x71\x75\x61\x6C\x73","\x72\x65\x63\x6F\x6E\x6E\x65\x63\x74","\x64\x69\x73\x63\x6F\x6E\x6E\x65\x63\x74","\x72\x65\x6C\x6F\x61\x64","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x5F\x72\x65\x6C\x6F\x61\x64","\x6C\x6F\x67\x6F\x75\x74","\x63\x6C\x6F\x73\x65","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6D\x6F\x62\x69\x6C\x65\x5F\x72\x65\x6C\x6F\x61\x64\x65\x72"];Meteor[_0xb1c6[2]](function(){MeteorToys= Package[_0xb1c6[1]][_0xb1c6[0]]});Template[_0xb1c6[12]][_0xb1c6[11]]({"\x63\x6C\x69\x63\x6B":function(_0x7782x1,_0x7782x2){_0x7782x1[_0xb1c6[3]]();_0x7782x1[_0xb1c6[4]]();console[_0xb1c6[6]](_0xb1c6[5]);Package[_0xb1c6[9]][_0xb1c6[8]][_0xb1c6[7]]();console[_0xb1c6[6]](_0xb1c6[10])}});Template[_0xb1c6[12]][_0xb1c6[16]]({SessionEndable:function(){if(Meteor[_0xb1c6[13]]()){if(MeteorToys[_0xb1c6[15]](_0xb1c6[14])){return true}}}});Template[_0xb1c6[18]][_0xb1c6[17]]= function(){MeteorToys[_0xb1c6[20]](_0xb1c6[19],false)};Template[_0xb1c6[22]][_0xb1c6[16]]({status:function(){return Meteor[_0xb1c6[21]]()[_0xb1c6[21]]}});Template[_0xb1c6[27]][_0xb1c6[16]]({account:function(){if(Package[_0xb1c6[23]]){if(Package[_0xb1c6[9]]){return Package[_0xb1c6[1]][_0xb1c6[26]][_0xb1c6[25]][_0xb1c6[24]]({},{sort:{date:-1}})}}}});Template[_0xb1c6[30]][_0xb1c6[11]]({"\x63\x6C\x69\x63\x6B":function(){target= this[_0xb1c6[28]];Package[_0xb1c6[9]][_0xb1c6[8]][_0xb1c6[29]](target)}});Template[_0xb1c6[30]][_0xb1c6[16]]({auth:function(){target= this[_0xb1c6[28]];if(Meteor[_0xb1c6[31]]()=== target){return true}},imp:function(){target= this[_0xb1c6[28]];if(Meteor[_0xb1c6[31]]()=== target){if(MeteorToys[_0xb1c6[32]](_0xb1c6[14],target)){return true}}}});Template[_0xb1c6[22]][_0xb1c6[11]]({"\x63\x6C\x69\x63\x6B\x20\x23\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x66\x6F\x72\x63\x65\x52\x65\x63\x6F\x6E\x6E\x65\x63\x74":function(){Meteor[_0xb1c6[33]]()},"\x63\x6C\x69\x63\x6B\x20\x23\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x66\x6F\x72\x63\x65\x44\x69\x73\x63\x6F\x6E\x6E\x65\x63\x74":function(){Meteor[_0xb1c6[34]]()}});Template[_0xb1c6[40]][_0xb1c6[11]]({"\x63\x6C\x69\x63\x6B\x20\x23\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x72\x65\x6C\x6F\x61\x64\x5F\x77\x69\x6E\x64\x6F\x77":function(){window[_0xb1c6[36]][_0xb1c6[35]]()},"\x63\x6C\x69\x63\x6B\x20\x23\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x72\x65\x6C\x6F\x61\x64\x5F\x68\x6F\x74":function(){Meteor[_0xb1c6[37]][_0xb1c6[35]]()},"\x63\x6C\x69\x63\x6B\x20\x23\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6C\x6F\x67\x6F\x75\x74":function(){Meteor[_0xb1c6[38]]()},"\x63\x6C\x69\x63\x6B\x20\x23\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x63\x6C\x6F\x73\x65":function(){window[_0xb1c6[0]][_0xb1c6[39]]()}})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("meteortoys:mobile");

})();
