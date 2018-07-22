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
var MeteorToys, value, thing, Thing;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/meteortoys_shell/client/template.main.js                                                   //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //

Template.__checkName("MeteorToys_shell");
Template["MeteorToys_shell"] = new Template("Template.MeteorToys_shell", (function() {
  var view = this;
  return Blaze._TemplateWith(function() {
    return {
      name: Spacebars.call("MeteorToys_shell")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("MeteorToy"), function() {
      return [ "\n\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_shell_header")), "\n\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_shell_content")), "\n\t" ];
    });
  });
}));

Template.__checkName("MeteorToys_shell_header");
Template["MeteorToys_shell_header"] = new Template("Template.MeteorToys_shell_header", (function() {
  var view = this;
  return HTML.DIV({
    class: "MeteorToys_shell_header MeteorToys-background-overlay1"
  }, HTML.Raw('\n\t\t<div id="MeteoToys_shell_run" class="MeteorToys_shell_button ">Run</div>\n\t\t'), Blaze.If(function() {
    return Spacebars.call(view.lookup("clearable"));
  }, function() {
    return [ "\n\t\t\t", HTML.DIV({
      id: "MeteoToys_shell_clear",
      class: "MeteorToys_shell_button "
    }, "Clear"), "\n\t\t" ];
  }), HTML.Raw('\n\t\t<div class="MeteorToys_name"><strong>Shell</strong></div>\n\t'));
}));

Template.__checkName("MeteorToys_shell_content");
Template["MeteorToys_shell_content"] = new Template("Template.MeteorToys_shell_content", (function() {
  var view = this;
  return HTML.DIV({
    class: "MeteorToys_shell_content"
  }, "\n\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_shell_input")), "\n\t");
}));

Template.__checkName("MeteorToys_shell_input");
Template["MeteorToys_shell_input"] = new Template("Template.MeteorToys_shell_input", (function() {
  var view = this;
  return HTML.TEXTAREA({
    id: "MeteorToys_shell_input",
    tabindex: "-1",
    placeholder: "Enter code here to run it as a method. Results will appear in console."
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/meteortoys_shell/client/main.js                                                            //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _0xe38c=["\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x74\x6F\x79\x6B\x69\x74","\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74","\x76\x61\x6C","\x23\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x73\x68\x65\x6C\x6C\x5F\x69\x6E\x70\x75\x74","\x50\x6C\x65\x61\x73\x65\x20\x65\x6E\x74\x65\x72\x20\x63\x6F\x64\x65\x20\x74\x6F\x20\x72\x75\x6E","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x73\x68","\x54\x68\x65\x72\x65\x20\x77\x61\x73\x20\x61\x6E\x20\x65\x72\x72\x6F\x72\x2E","\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D","\x6C\x6F\x67","\x53\x68\x65\x6C\x6C\x20\x45\x72\x72\x6F\x72","\x4D\x65\x74\x65\x6F\x72\x20\x54\x6F\x79\x73\x20\x72\x61\x6E\x20\x74\x68\x65\x20\x66\x6F\x6C\x6C\x6F\x77\x69\x6E\x67\x20\x6D\x65\x74\x68\x6F\x64\x3A","\x4D\x65\x74\x68\x6F\x64\x20\x3D\x20\x66\x75\x6E\x63\x74\x69\x6F\x6E\x20\x28\x29\x20\x7B\x20\x0A","\x0A\x7D","\x54\x68\x65\x20\x72\x65\x73\x75\x6C\x74\x73\x20\x61\x72\x65","","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x73\x68\x65\x6C\x6C","\x69\x6E\x73\x65\x72\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x52\x65\x73\x75\x6C\x74","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x72\x65\x73\x75\x6C\x74","\x63\x61\x6C\x6C","\x53\x68\x65\x6C\x6C\x5F\x43\x6C\x65\x61\x72\x61\x62\x6C\x65","\x73\x65\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x73\x68\x65\x6C\x6C","\x72\x65\x6D\x6F\x76\x65\x49\x74\x65\x6D","\x66\x6F\x63\x75\x73","\x65\x76\x65\x6E\x74\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x73\x68\x65\x6C\x6C\x5F\x68\x65\x61\x64\x65\x72","\x67\x65\x74","\x68\x65\x6C\x70\x65\x72\x73","\x73\x65\x74\x49\x74\x65\x6D","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x73\x68\x65\x6C\x6C\x5F\x69\x6E\x70\x75\x74","\x72\x65\x6E\x64\x65\x72\x65\x64","\x67\x65\x74\x49\x74\x65\x6D","\x54\x6F\x79\x4B\x69\x74","\x63\x75\x72\x72\x65\x6E\x74","\x65\x71\x75\x61\x6C\x73","\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74","\x61\x75\x74\x6F\x72\x75\x6E"];MeteorToys= Package[_0xe38c[1]][_0xe38c[0]];Template[_0xe38c[27]][_0xe38c[26]]({"\x63\x6C\x69\x63\x6B\x20\x23\x4D\x65\x74\x65\x6F\x54\x6F\x79\x73\x5F\x73\x68\x65\x6C\x6C\x5F\x72\x75\x6E":function(_0xe479x1,_0xe479x2){_0xe479x1[_0xe38c[2]]();var _0xe479x3=String($(_0xe38c[4])[_0xe38c[3]]());if(_0xe479x3== false){alert(_0xe38c[5]);return false};Meteor[_0xe38c[20]](_0xe38c[6],_0xe479x3,function(_0xe479x1,_0xe479x4){if(_0xe479x1){alert(_0xe38c[7]);console[_0xe38c[9]](_0xe38c[8]);console[_0xe38c[9]](_0xe38c[10]);console[_0xe38c[9]](_0xe479x1);console[_0xe38c[9]](_0xe38c[8])}else {console[_0xe38c[9]](_0xe38c[8]);console[_0xe38c[9]](_0xe38c[11]);console[_0xe38c[9]](_0xe38c[12]+ _0xe479x3+ _0xe38c[13]);console[_0xe38c[9]](_0xe38c[14]);console[_0xe38c[9]](_0xe479x4);console[_0xe38c[9]](_0xe38c[8]);$(_0xe38c[4])[_0xe38c[3]](_0xe38c[15]);Package[_0xe38c[19]][_0xe38c[18]][_0xe38c[17]](_0xe479x4,_0xe38c[16],_0xe479x3)}})},"\x63\x6C\x69\x63\x6B\x20\x23\x4D\x65\x74\x65\x6F\x54\x6F\x79\x73\x5F\x73\x68\x65\x6C\x6C\x5F\x63\x6C\x65\x61\x72":function(){$(_0xe38c[4])[_0xe38c[3]](_0xe38c[15]);MeteorToys[_0xe38c[22]](_0xe38c[21],false);localStorage[_0xe38c[24]](_0xe38c[23]);$(_0xe38c[4])[_0xe38c[25]]()}});Template[_0xe38c[27]][_0xe38c[29]]({clearable:function(){return MeteorToys[_0xe38c[28]](_0xe38c[21])}});Template[_0xe38c[31]][_0xe38c[26]]({"\x6B\x65\x79\x75\x70":function(){value= String($(_0xe38c[4])[_0xe38c[3]]())|| _0xe38c[15];localStorage[_0xe38c[30]](_0xe38c[23],value);if(value=== _0xe38c[15]){MeteorToys[_0xe38c[22]](_0xe38c[21],false)}else {MeteorToys[_0xe38c[22]](_0xe38c[21],true)}}});Template[_0xe38c[31]][_0xe38c[32]]= function(){thing= localStorage[_0xe38c[33]](_0xe38c[23])|| _0xe38c[15];$(_0xe38c[4])[_0xe38c[3]](thing);if(thing=== _0xe38c[15]){MeteorToys[_0xe38c[22]](_0xe38c[21],false)}else {MeteorToys[_0xe38c[22]](_0xe38c[21],true)}};Thing= Package[_0xe38c[1]][_0xe38c[34]];Tracker[_0xe38c[38]](function(){if(Thing[_0xe38c[36]](_0xe38c[35],_0xe38c[23])){window[_0xe38c[37]](function(){$(_0xe38c[4])[_0xe38c[25]]()},300)}})
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("meteortoys:shell");

})();
