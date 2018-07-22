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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var MeteorToys, data, DaData, result, ToyKit, BlueprintAPI;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/meteortoys_blueprint/client/template.main.js                                                     //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //

Template.__checkName("MeteorToys_template");
Template["MeteorToys_template"] = new Template("Template.MeteorToys_template", (function() {
  var view = this;
  return Blaze._TemplateWith(function() {
    return {
      name: Spacebars.call("MeteorToys_template")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("MeteorToy"), function() {
      return [ "\n\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_template_header")), "\n\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_template_content")), "\n\t" ];
    });
  });
}));

Template.__checkName("MeteorToys_template_header");
Template["MeteorToys_template_header"] = new Template("Template.MeteorToys_template_header", (function() {
  var view = this;
  return HTML.DIV({
    class: "MeteorToys_template_header MeteorToys-background-overlay1"
  }, "\n\t\t", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasData"));
  }, function() {
    return [ "\n\t\t\t", HTML.DIV({
      class: "MeteorToys_template_button MeteorToys_template_next"
    }, HTML.STRONG(HTML.CharRef({
      html: "&rsaquo;",
      str: "›"
    }))), "\n\t\t\t", HTML.DIV({
      class: "MeteorToys_template_button MeteorToys_template_prev"
    }, HTML.STRONG(HTML.CharRef({
      html: "&lsaquo;",
      str: "‹"
    }))), "\n\t\t" ];
  }), "\n\t\t", HTML.DIV({
    class: "MeteorToys_name"
  }, HTML.STRONG(Blaze.View("lookup:header", function() {
    return Spacebars.mustache(view.lookup("header"));
  }))), "\n\t");
}));

Template.__checkName("MeteorToys_template_content");
Template["MeteorToys_template_content"] = new Template("Template.MeteorToys_template_content", (function() {
  var view = this;
  return HTML.DIV({
    class: "MeteorToys_template_content"
  }, "\n\t", Blaze.If(function() {
    return Spacebars.call(view.lookup("content"));
  }, function() {
    return [ "\n\n", HTML.PRE("{ \n  Helpers: ", Blaze.View("lookup:helpers", function() {
      return Spacebars.mustache(view.lookup("helpers"));
    }), ",\n  Events: ", Blaze.View("lookup:events", function() {
      return Spacebars.mustache(view.lookup("events"));
    }), "\n}, ", Blaze.View("lookup:content", function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("content")));
    })), "\n\t" ];
  }, function() {
    return [ "\n\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_template_tree")), "\n\t" ];
  }), "\n\t");
}));

Template.__checkName("MeteorToys_template_tree");
Template["MeteorToys_template_tree"] = new Template("Template.MeteorToys_template_tree", (function() {
  var view = this;
  return Blaze.Each(function() {
    return Spacebars.call(view.lookup("item"));
  }, function() {
    return [ "\n\t\t", HTML.DIV({
      class: "MeteorToys_row",
      style: "pointer-events: none"
    }, Blaze.View("lookup:.", function() {
      return Spacebars.mustache(view.lookup("."));
    })), "\n\t" ];
  });
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/meteortoys_blueprint/client/main.js                                                              //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
var _0x539f=["\x67\x77\x65\x6E\x64\x61\x6C\x6C\x3A\x62\x6F\x64\x79\x65\x76\x65\x6E\x74\x73","\x65\x76\x65\x6E\x74\x73","\x62\x6F\x64\x79","\x2C","\x73\x70\x6C\x69\x74","\x74\x72\x69\x6D","\x20","\x6C\x65\x6E\x67\x74\x68","\x61\x70\x70\x6C\x79","\x6F\x6E","\x6A\x6F\x69\x6E","\x73\x6C\x69\x63\x65","\x67\x65\x74","\x63\x75\x72\x72\x65\x6E\x74\x54\x61\x72\x67\x65\x74","\x67\x65\x74\x44\x61\x74\x61","\x67\x65\x74\x56\x69\x65\x77","\x5F\x74\x65\x6D\x70\x6C\x61\x74\x65\x49\x6E\x73\x74\x61\x6E\x63\x65","\x64\x65\x6C\x65\x67\x61\x74\x65","\x66\x6F\x72\x45\x61\x63\x68","\x74\x61\x72\x67\x65\x74","\x42\x6C\x75\x65\x70\x72\x69\x6E\x74\x2F\x73\x74\x61\x74\x75\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x74\x6F\x79\x6B\x69\x74","\x63\x75\x72\x72\x65\x6E\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x74\x65\x6D\x70\x6C\x61\x74\x65","\x65\x71\x75\x61\x6C\x73","\x54\x6F\x79\x4B\x69\x74","\x74\x61\x67\x4E\x61\x6D\x65","\x42\x4F\x44\x59","\x42\x6C\x75\x65\x70\x72\x69\x6E\x74\x5F\x44\x61\x74\x61","\x73\x65\x74","\x42\x6C\x75\x65\x70\x72\x69\x6E\x74\x5F\x44\x61\x74\x61\x5F\x68\x65\x6C\x70\x65\x72\x73","\x42\x6C\x75\x65\x70\x72\x69\x6E\x74\x5F\x44\x61\x74\x61\x5F\x65\x76\x65\x6E\x74\x73","\x42\x6C\x75\x65\x70\x72\x69\x6E\x74\x2F\x74\x65\x6D\x70\x6C\x61\x74\x65","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x74\x65\x6D\x70\x6C\x61\x74\x65","\x5F\x5F\x68\x65\x6C\x70\x65\x72\x73","\x6B\x65\x79\x73","\x6E\x61\x6D\x65","\x5F\x5F\x65\x76\x65\x6E\x74\x4D\x61\x70\x73","\x42\x6C\x75\x65\x70\x72\x69\x6E\x74\x2F\x69\x6E\x73\x69\x64\x65","\x6F\x62\x6A\x65\x63\x74","\x73\x74\x72\x69\x6E\x67\x69\x66\x79","\x63\x6F\x6C\x6F\x72\x69\x7A\x65","\x3C\x65\x6D\x3E\x4E\x6F\x20\x44\x61\x74\x61\x3C\x2F\x65\x6D\x3E","","\x68\x65\x6C\x70\x65\x72\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x74\x65\x6D\x70\x6C\x61\x74\x65\x5F\x63\x6F\x6E\x74\x65\x6E\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79","\x69\x6E\x64\x65\x78\x4F\x66","\x42\x6C\x75\x65\x70\x72\x69\x6E\x74","\x54\x65\x6D\x70\x6C\x61\x74\x65\x2E","\x72\x65\x70\x6C\x61\x63\x65","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x74\x65\x6D\x70\x6C\x61\x74\x65\x5F\x68\x65\x61\x64\x65\x72","\x42\x6C\x75\x65\x70\x72\x69\x6E\x74\x5F\x44\x61\x74\x61\x5F\x74\x72\x65\x65","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x74\x65\x6D\x70\x6C\x61\x74\x65\x5F\x74\x72\x65\x65","\x73\x75\x62\x73\x74\x72","\x73\x70\x6C\x69\x63\x65","\x4D\x65\x74\x65\x6F\x72\x43\x61\x6E\x64\x79","\x4D\x6F\x6E\x67\x6F\x6C","\x4A\x65\x74\x53\x65\x74\x74\x65\x72","\x5F\x5F\x64\x79\x6E\x61\x6D\x69\x63","\x5F\x5F\x63\x75\x72\x72\x65\x6E\x74\x54\x65\x6D\x70\x6C\x61\x74\x65","\x63\x75\x72\x72\x65\x6E\x74\x44\x61\x74\x61","\x70\x61\x72\x65\x6E\x74\x44\x61\x74\x61","\x72\x65\x67\x69\x73\x74\x65\x72\x48\x65\x6C\x70\x65\x72","\x5F\x5F\x64\x65\x66\x69\x6E\x65","\x5F\x5F\x63\x68\x65\x63\x6B\x4E\x61\x6D\x65","\x5F\x5F\x62\x6F\x64\x79\x5F\x5F","\x6F\x6E\x43\x72\x65\x61\x74\x65\x64","\x6F\x6E\x52\x65\x6E\x64\x65\x72\x65\x64","\x6F\x6E\x44\x65\x73\x74\x72\x6F\x79\x65\x64","\x5F\x5F\x49\x72\x6F\x6E","\x69\x6E\x73\x74\x61\x6E\x63\x65","\x5F\x77\x69\x74\x68\x54\x65\x6D\x70\x6C\x61\x74\x65","\x5F\x63\x75\x72\x72\x65\x6E\x74\x54\x65\x6D\x70\x6C\x61\x74\x65","\x63\x6C\x65\x61\x6E\x41\x72\x72\x61\x79","\x6D\x61\x70","\x73\x6F\x72\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x63\x75\x72\x72\x65\x6E\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x66\x61\x64\x65\x5F\x4D\x6F\x6E\x67\x6F\x6C","\x61\x64\x64\x43\x6C\x61\x73\x73","\x23\x4D\x6F\x6E\x67\x6F\x6C","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x66\x61\x64\x65\x5F\x4A\x65\x74\x53\x65\x74\x74\x65\x72","\x23\x4A\x65\x74\x53\x65\x74\x74\x65\x72","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x66\x61\x64\x65\x5F\x4F\x72\x62","\x2E\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6F\x72\x62","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x66\x61\x64\x65\x5F\x4E\x6F\x74\x69\x66\x69\x63\x61\x74\x69\x6F\x6E\x73","\x2E\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6E\x6F\x74\x69\x66\x69\x63\x61\x74\x69\x6F\x6E\x73","\x66\x65\x74\x63\x68\x54\x65\x6D\x70\x6C\x61\x74\x65\x73","\x72\x65\x6D\x6F\x76\x65\x43\x6C\x61\x73\x73","\x23\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x74\x65\x6D\x70\x6C\x61\x74\x65","\x73\x74\x61\x72\x74\x75\x70","\x6F\x70\x65\x6E\x41\x6E\x69\x6D\x61\x74\x69\x6F\x6E","\x63\x6C\x6F\x73\x65\x41\x6E\x69\x6D\x61\x74\x69\x6F\x6E","\x61\x75\x74\x6F\x72\x75\x6E","\x64\x69\x73\x70\x6C\x61\x79","\x66\x6F\x63\x75\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x74\x72\x65\x65","\x77\x68\x69\x63\x68","\x63\x74\x72\x6C\x4B\x65\x79","\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74","\x6B\x65\x79\x70\x72\x65\x73\x73"];if(Package[_0x539f[0]]){}else {Template[_0x539f[2]][_0x539f[1]]= function(_0x49e3x1){for(var _0x49e3x2 in _0x49e3x1){(function(_0x49e3x1,_0x49e3x2){var _0x49e3x3=_0x49e3x1[_0x49e3x2];var _0x49e3x4=_0x49e3x2[_0x539f[4]](_0x539f[3]);_0x49e3x4[_0x539f[18]](function(_0x49e3x5){_0x49e3x5= $[_0x539f[5]](_0x49e3x5);var _0x49e3x6=_0x49e3x5[_0x539f[4]](_0x539f[6]);var _0x49e3x7=_0x49e3x6[0];if(_0x49e3x6[_0x539f[7]]=== 1){$(document)[_0x539f[9]](_0x49e3x7,function(_0x49e3x8){var _0x49e3x9={};_0x49e3x3[_0x539f[8]](this,[_0x49e3x8,_0x49e3x9])})}else {var _0x49e3xa=_0x49e3x6[_0x539f[11]](1)[_0x539f[10]](_0x539f[6]);$(document)[_0x539f[17]](_0x49e3xa,_0x49e3x7,function(_0x49e3x8){var _0x49e3xb=$(_0x49e3x8[_0x539f[13]])[_0x539f[12]](0);var _0x49e3x9=Blaze[_0x539f[14]](_0x49e3xb);var _0x49e3xc=(Blaze[_0x539f[15]](_0x49e3xb)&& Meteor._get(Blaze[_0x539f[15]](_0x49e3xb),_0x539f[16]))|| {};_0x49e3x3[_0x539f[8]](this,[_0x49e3x8,_0x49e3x9,_0x49e3xc])})}})})(_0x49e3x1,_0x49e3x2)}}};Template[_0x539f[2]][_0x539f[1]]({"\x6D\x6F\x75\x73\x65\x6F\x76\x65\x72":function(_0x49e3x8,_0x49e3xd){try{var _0x49e3xe=$(_0x49e3x8[_0x539f[19]])[0];if(Package[_0x539f[22]][_0x539f[21]][_0x539f[12]](_0x539f[20])){return};if(MeteorToys[_0x539f[26]][_0x539f[25]](_0x539f[23],_0x539f[24])){if(_0x49e3x8[_0x539f[19]][_0x539f[27]]=== _0x539f[28]){MeteorToys[_0x539f[30]](_0x539f[29],false);MeteorToys[_0x539f[30]](_0x539f[31],null);MeteorToys[_0x539f[30]](_0x539f[32],null);MeteorToys[_0x539f[30]](_0x539f[33],null)}else {var _0x49e3xe=$(_0x49e3x8[_0x539f[19]])[0];MeteorToys[_0x539f[30]](_0x539f[29],Blaze[_0x539f[14]](_0x49e3xe));var _0x49e3xf=Blaze[_0x539f[15]](_0x49e3xe);if( typeof _0x49e3xf=== _0x539f[34]){}else {if( typeof _0x49e3xf[_0x539f[35]]=== _0x539f[34]){}else {if( typeof _0x49e3xf[_0x539f[35]][_0x539f[36]]=== _0x539f[34]){}else {MeteorToys[_0x539f[30]](_0x539f[31],Object[_0x539f[37]](_0x49e3xf[_0x539f[35]].__helpers));MeteorToys[_0x539f[30]](_0x539f[33],_0x49e3xf[_0x539f[38]])};if( typeof _0x49e3xf[_0x539f[35]][_0x539f[39]]=== _0x539f[34]){}else {MeteorToys[_0x539f[30]](_0x539f[32],Object[_0x539f[37]](_0x49e3xf[_0x539f[35]].__eventMaps));MeteorToys[_0x539f[30]](_0x539f[33],_0x49e3xf[_0x539f[38]])}}}}}}catch(_0x49e3x8){}}});MeteorToys= Package[_0x539f[22]][_0x539f[21]];Template[_0x539f[47]][_0x539f[46]]({content:function(){data= MeteorToys[_0x539f[12]](_0x539f[29]);if( typeof data=== _0x539f[34]){return false};if(data=== _0x539f[24]){return false};if(MeteorToys[_0x539f[12]](_0x539f[40])){if(Package[_0x539f[22]][_0x539f[21]][_0x539f[12]](_0x539f[20])){}else {return false}};if( typeof data=== _0x539f[41]){if(data=== null){}else {if( typeof data[_0x539f[38]]=== _0x539f[34]){}else {if(data[_0x539f[38]]=== _0x539f[24]){return false}}}};DaData= JSON[_0x539f[42]](data,null,2);var _0x49e3x10=Package[_0x539f[22]][_0x539f[21]][_0x539f[43]](DaData);return _0x49e3x10},helpers:function(){data= MeteorToys[_0x539f[12]](_0x539f[31]);if( typeof data=== _0x539f[34]){return _0x539f[44]}else {return data}},events:function(){data= MeteorToys[_0x539f[12]](_0x539f[32]);if( typeof data=== _0x539f[34]|| data=== null|| data=== _0x539f[45]|| data=== []){return _0x539f[44]}else {return data}}});Template[_0x539f[24]][_0x539f[1]]({"\x6D\x6F\x75\x73\x65\x6F\x76\x65\x72":function(){MeteorToys[_0x539f[30]](_0x539f[40],true)},"\x6D\x6F\x75\x73\x65\x6F\x75\x74":function(){MeteorToys[_0x539f[30]](_0x539f[40],false)}});Template[_0x539f[53]][_0x539f[46]]({header:function(){var _0x49e3x9=MeteorToys[_0x539f[12]](_0x539f[33]);if(_0x49e3x9){if(_0x49e3x9[_0x539f[49]](_0x539f[48])>  -1){return _0x539f[50]}else {result= _0x49e3x9[_0x539f[52]](_0x539f[51],_0x539f[45]);return result}}else {return _0x539f[50]}}});Template[_0x539f[55]][_0x539f[46]]({item:function(){return MeteorToys[_0x539f[12]](_0x539f[54])}});MeteorToys= Package[_0x539f[22]][_0x539f[21]];ToyKit= Package[_0x539f[22]][_0x539f[26]];if(ToyKit[_0x539f[25]](_0x539f[23],_0x539f[24])){ToyKit[_0x539f[30]](_0x539f[23],null)};BlueprintAPI= {cleanArray:function(_0x49e3x11,_0x49e3x12){var _0x49e3x13=_0x49e3x12[_0x539f[7]];for(var _0x49e3x14=0;_0x49e3x14< _0x49e3x11[_0x539f[7]];_0x49e3x14++){if(_0x49e3x11[_0x49e3x14][_0x539f[56]](0,_0x49e3x13)=== _0x49e3x12){_0x49e3x11[_0x539f[57]](_0x49e3x14,1);_0x49e3x14--}};return _0x49e3x11},fetchTemplates:function(){var _0x49e3x15=Object[_0x539f[37]](Template),_0x49e3x16=[_0x539f[48],_0x539f[58],_0x539f[59],_0x539f[60],_0x539f[61],_0x539f[62],_0x539f[63],_0x539f[64],_0x539f[65],_0x539f[66],_0x539f[67],_0x539f[68],_0x539f[69],_0x539f[70],_0x539f[71],_0x539f[18],_0x539f[72],_0x539f[73],_0x539f[74],_0x539f[75]];_0x49e3x16[_0x539f[77]](function(_0x49e3x17){_0x49e3x15= BlueprintAPI[_0x539f[76]](_0x49e3x15,_0x49e3x17)});_0x49e3x15[_0x539f[78]]();MeteorToys[_0x539f[30]](_0x539f[54],_0x49e3x15)},startup:function(){MeteorToys[_0x539f[30]](_0x539f[29],null);MeteorToys[_0x539f[30]](_0x539f[54],null);if(MeteorToys[_0x539f[25]](_0x539f[79],_0x539f[24])){MeteorToys[_0x539f[30]](_0x539f[79],false)}},openAnimation:function(){$(_0x539f[82])[_0x539f[81]](_0x539f[80]);$(_0x539f[84])[_0x539f[81]](_0x539f[83]);$(_0x539f[86])[_0x539f[81]](_0x539f[85]);$(_0x539f[88])[_0x539f[81]](_0x539f[87]);BlueprintAPI[_0x539f[89]]()},closeAnimation:function(){$(_0x539f[91])[_0x539f[90]](_0x539f[85]);$(_0x539f[82])[_0x539f[90]](_0x539f[80]);$(_0x539f[84])[_0x539f[90]](_0x539f[83]);$(_0x539f[86])[_0x539f[90]](_0x539f[85]);$(_0x539f[88])[_0x539f[90]](_0x539f[87])}};Meteor[_0x539f[92]](function(){BlueprintAPI[_0x539f[92]]()});Tracker[_0x539f[95]](function(){if(MeteorToys[_0x539f[26]][_0x539f[25]](_0x539f[23],_0x539f[24])){BlueprintAPI[_0x539f[93]]()}else {BlueprintAPI[_0x539f[94]]()}});Tracker[_0x539f[95]](function(){if(MeteorToys[_0x539f[26]][_0x539f[25]](_0x539f[96],false)){if(MeteorToys[_0x539f[26]][_0x539f[25]](_0x539f[23],_0x539f[24])){MeteorToys[_0x539f[26]][_0x539f[30]](_0x539f[23],null);MeteorToys[_0x539f[26]][_0x539f[30]](_0x539f[97],null);MeteorToys[_0x539f[30]](_0x539f[98],null)}}});Package[_0x539f[22]][_0x539f[21]][_0x539f[30]](_0x539f[20],false);$(window)[_0x539f[102]](function(_0x49e3x7){if(!(_0x49e3x7[_0x539f[99]]== 115&& _0x49e3x7[_0x539f[100]])&&  !(_0x49e3x7[_0x539f[99]]== 19)){return true};if(Package[_0x539f[22]][_0x539f[26]][_0x539f[25]](_0x539f[23],_0x539f[24])){if(Package[_0x539f[22]][_0x539f[21]][_0x539f[12]](_0x539f[20])){Package[_0x539f[22]][_0x539f[21]][_0x539f[30]](_0x539f[20],false)}else {Package[_0x539f[22]][_0x539f[21]][_0x539f[30]](_0x539f[20],true)}};_0x49e3x7[_0x539f[101]]();return false})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("meteortoys:blueprint");

})();
