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
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var MeteorToysDict, count, msg;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/meteortoys_listen/client/template.main.js                                                          //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //

Template.__checkName("MeteorToys_intercept");
Template["MeteorToys_intercept"] = new Template("Template.MeteorToys_intercept", (function() {
  var view = this;
  return Blaze._TemplateWith(function() {
    return {
      name: Spacebars.call("MeteorToys_intercept")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("MeteorToy"), function() {
      return [ "\n\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_intercept_header")), "\n\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_intercept_content")), "\n\t" ];
    });
  });
}));

Template.__checkName("MeteorToys_intercept_header");
Template["MeteorToys_intercept_header"] = new Template("Template.MeteorToys_intercept_header", (function() {
  var view = this;
  return HTML.DIV({
    class: "MeteorToys_intercept_header MeteorToys-background-overlay1"
  }, "\n\t\t", Blaze.Unless(function() {
    return Spacebars.call(view.lookup("running"));
  }, function() {
    return [ "\n\t\t\t", HTML.DIV({
      class: "MeteorToys_intercept_button MeteorToys_intercept_start MeteorToys_action"
    }, "Start"), "\n\t\t" ];
  }, function() {
    return [ "\n\t\t\t", HTML.DIV({
      class: "MeteorToys_intercept_button MeteorToys_intercept_stop MeteorToys_action"
    }, "Stop"), "\n\t\t" ];
  }), HTML.Raw('\n\t\t<div class="MeteorToys_name"><strong>Listen</strong></div>\n\t'));
}));

Template.__checkName("MeteorToys_intercept_content");
Template["MeteorToys_intercept_content"] = new Template("Template.MeteorToys_intercept_content", (function() {
  var view = this;
  return HTML.DIV({
    class: "MeteorToys_intercept_content"
  }, "\n\t\t", Blaze.Unless(function() {
    return Spacebars.call(view.lookup("running"));
  }, function() {
    return [ "\n\t\t\tTo get started:\n\t\t\t", HTML.DIV({
      class: "MeteorToys_intercept_row"
    }, "\n\t\t\t\t", HTML.DIV({
      class: "MeteorToys_intercept_icon MeteorToys-background-overlay1"
    }, "1"), "\n\t\t\t\tOpen your browser console through the debugger\n\t\t\t"), "\n\t\t\t", HTML.DIV({
      class: "MeteorToys_intercept_row"
    }, "\n\t\t\t\t", HTML.DIV({
      class: "MeteorToys_intercept_icon MeteorToys-background-overlay1"
    }, "2"), '\n\t\t\t\tClick "start" in the top-right corner\n\t\t\t'), "\n\t\t\t", HTML.DIV({
      class: "MeteorToys_intercept_row"
    }, "\n\t\t\t\t", HTML.DIV({
      class: "MeteorToys_intercept_icon MeteorToys-background-overlay1"
    }, "3"), "\n\t\t\t\tObserve how DDP flows in and out of your app\n\t\t\t"), "\n\t\t" ];
  }, function() {
    return [ "\n\t\t\tDDP\n\t\t\t", HTML.SPAN({
      style: "color: #A6E22D"
    }, HTML.CharRef({
      html: "&#x25BC;",
      str: "▼"
    })), " ", Blaze.View("lookup:downCount", function() {
      return Spacebars.mustache(view.lookup("downCount"));
    }), "\n\t\t\t", HTML.SPAN({
      style: "color: #EB4C16"
    }, HTML.CharRef({
      html: "&#x25B2;",
      str: "▲"
    })), " ", Blaze.View("lookup:upCount", function() {
      return Spacebars.mustache(view.lookup("upCount"));
    }), HTML.BR(), " \n\t\t" ];
  }), "\n\t\t\n\t\t\n\t");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/meteortoys_listen/client/main.js                                                                   //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _0x152c=["\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x44\x69\x63\x74","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x74\x6F\x79\x6B\x69\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x69\x6E\x74\x65\x72\x63\x65\x70\x74","\x73\x65\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6D\x6F\x6E\x6B\x65\x79\x50\x61\x74\x63\x68\x65\x64","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x69\x6E\x74\x65\x72\x63\x65\x70\x74\x5F\x64\x6F\x77\x6E","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x69\x6E\x74\x65\x72\x63\x65\x70\x74\x5F\x75\x70","\x6F\x6E","\x65\x71\x75\x61\x6C\x73","\x6F\x66\x66","\x65\x76\x65\x6E\x74\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x69\x6E\x74\x65\x72\x63\x65\x70\x74\x5F\x68\x65\x61\x64\x65\x72","\x68\x65\x6C\x70\x65\x72\x73","\x67\x65\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x69\x6E\x74\x65\x72\x63\x65\x70\x74\x5F\x63\x6F\x6E\x74\x65\x6E\x74","\x5F\x73\x65\x6E\x64","\x63\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x4F\x55\x54\x20","\x6D\x73\x67","\x6C\x6F\x67","\x63\x61\x6C\x6C","\x6D\x65\x73\x73\x61\x67\x65","\x70\x61\x72\x73\x65","\x49\x4E\x20\x20","\x5F\x73\x74\x72\x65\x61\x6D","\x4D\x65\x74\x65\x6F\x72\x20\x54\x6F\x79\x73\x20\x69\x6E\x74\x65\x72\x63\x65\x70\x74\x20\x73\x74\x61\x72\x74\x65\x64\x20\x61\x74\x20","\x4D\x65\x74\x65\x6F\x72\x20\x54\x6F\x79\x73\x20\x69\x6E\x74\x65\x72\x63\x65\x70\x74\x20\x73\x74\x6F\x70\x70\x65\x64\x20\x61\x74\x20","\x61\x75\x74\x6F\x72\x75\x6E"];MeteorToysDict= Package[_0x152c[1]][_0x152c[0]];MeteorToysDict[_0x152c[3]](_0x152c[2],false);MeteorToysDict[_0x152c[3]](_0x152c[4],false);MeteorToysDict[_0x152c[3]](_0x152c[5],0);MeteorToysDict[_0x152c[3]](_0x152c[6],0);Template[_0x152c[11]][_0x152c[10]]({"\x63\x6C\x69\x63\x6B\x20\x2E\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x69\x6E\x74\x65\x72\x63\x65\x70\x74\x5F\x73\x74\x61\x72\x74":function(){MeteorToysDict[_0x152c[3]](_0x152c[2],_0x152c[7]);if(MeteorToysDict[_0x152c[8]](_0x152c[4],false)){MeteorToysIntercept()}},"\x63\x6C\x69\x63\x6B\x20\x2E\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x69\x6E\x74\x65\x72\x63\x65\x70\x74\x5F\x73\x74\x6F\x70":function(){MeteorToysDict[_0x152c[3]](_0x152c[2],_0x152c[9])}});Template[_0x152c[11]][_0x152c[12]]({running:function(){if(MeteorToysDict[_0x152c[8]](_0x152c[2],_0x152c[7])){return true}}});Template[_0x152c[14]][_0x152c[12]]({running:function(){if(MeteorToysDict[_0x152c[8]](_0x152c[2],_0x152c[7])){return true}},downCount:function(){return MeteorToysDict[_0x152c[13]](_0x152c[5])},upCount:function(){return MeteorToysDict[_0x152c[13]](_0x152c[6])}});var MeteorToysIntercept=function(){var _0xd2c3x2=Meteor[_0x152c[16]][_0x152c[15]];Meteor[_0x152c[16]][_0x152c[15]]= function(_0xd2c3x3){if(MeteorToysDict[_0x152c[8]](_0x152c[2],_0x152c[7])){console[_0x152c[19]](_0x152c[17],_0xd2c3x3[_0x152c[18]],_0xd2c3x3);count= MeteorToysDict[_0x152c[13]](_0x152c[6])+ 1;MeteorToysDict[_0x152c[3]](_0x152c[6],count)};_0xd2c3x2[_0x152c[20]](this,_0xd2c3x3)};Meteor[_0x152c[16]][_0x152c[24]][_0x152c[7]](_0x152c[21],function(_0xd2c3x4){if(MeteorToysDict[_0x152c[8]](_0x152c[2],_0x152c[7])){msg= JSON[_0x152c[22]](_0xd2c3x4);console[_0x152c[19]](_0x152c[23],msg[_0x152c[18]],msg);count= MeteorToysDict[_0x152c[13]](_0x152c[5])+ 1;MeteorToysDict[_0x152c[3]](_0x152c[5],count)}})};Tracker[_0x152c[27]](function(){if(MeteorToysDict[_0x152c[8]](_0x152c[2],_0x152c[7])){console[_0x152c[19]](_0x152c[25]+ Date())};if(MeteorToysDict[_0x152c[8]](_0x152c[2],_0x152c[9])){console[_0x152c[19]](_0x152c[26]+ Date())}})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("meteortoys:listen");

})();
