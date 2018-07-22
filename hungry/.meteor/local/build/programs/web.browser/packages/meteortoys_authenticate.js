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
var Accounts = Package['accounts-base'].Accounts;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var MeteorToys, target, value, MTAuthenticate, previous, userId, user;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/meteortoys_authenticate/client/template.main.js                                                  //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //

Template.__checkName("MeteorToys_accounts");
Template["MeteorToys_accounts"] = new Template("Template.MeteorToys_accounts", (function() {
  var view = this;
  return Blaze._TemplateWith(function() {
    return {
      name: Spacebars.call("MeteorToys_accounts")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("MeteorToy"), function() {
      return [ "\n\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_accounts_header")), "\n\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_accounts_content")), "\n\t" ];
    });
  });
}));

Template.__checkName("MeteorToys_accounts_header");
Template["MeteorToys_accounts_header"] = new Template("Template.MeteorToys_accounts_header", (function() {
  var view = this;
  return HTML.DIV({
    class: "MeteorToys_accounts_header MeteorToys-background-overlay1"
  }, HTML.Raw('\n\t\t<div class="MeteorToys_sub_button MeteorToys-border-color-red MeteorToys_action" id="MeteorToys_accounts_search">Search</div>\n\t\n\t\t'), Blaze.If(function() {
    return Spacebars.call(view.lookup("sessionIsEndable"));
  }, function() {
    return [ "\n\t\t\t", HTML.DIV({
      class: "MeteorToys_sub_button MeteorToys-border-color-red MeteorToys_action",
      id: "MeteorToys_tempLogout"
    }, "End Session"), "\n\t\t" ];
  }), HTML.Raw('\n\n\t\t<div class="MeteorToys_name"><strong>Authenticate</strong></div>\n\t'));
}));

Template.__checkName("MeteorToys_accounts_content");
Template["MeteorToys_accounts_content"] = new Template("Template.MeteorToys_accounts_content", (function() {
  var view = this;
  return HTML.DIV({
    class: "MeteorToys_accounts_content"
  }, "\n\t\t", Blaze.Each(function() {
    return Spacebars.call(view.lookup("account"));
  }, function() {
    return [ "\n\t\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_accounts_account")), "\n\t\t" ];
  }, function() {
    return [ "\n\t\t\t", HTML.DIV({
      style: "padding-top: 4px"
    }, "\n\t\t\t\tWhenever you authenticate an account, it will be logged here. You will be able to re-authenticate it by clicking on it.\n\t\t\t"), "\n\t\t" ];
  }), "\n\t");
}));

Template.__checkName("MeteorToys_accounts_account");
Template["MeteorToys_accounts_account"] = new Template("Template.MeteorToys_accounts_account", (function() {
  var view = this;
  return HTML.DIV({
    class: "MeteorToys_row MeteorToys_row_hoverable"
  }, "\n\t\t", Blaze.If(function() {
    return Spacebars.call(view.lookup("authenticated"));
  }, function() {
    return [ "\n\t\t\t", HTML.DIV({
      class: "MeteorToys_impersonate_check MeteorToys-background-green"
    }, "\n\t\t\t"), "\n\t\t" ];
  }), "\n\t\t", Blaze.If(function() {
    return Spacebars.call(view.lookup("active"));
  }, function() {
    return [ "\n\t\t\t", HTML.DIV({
      class: "MeteorToys_impersonate_check MeteorToys-background-green"
    }, "\n\t\t\t"), "\n\t\t" ];
  }), "\n\t\t", Blaze.View("lookup:identifier", function() {
    return Spacebars.mustache(view.lookup("identifier"));
  }), HTML.Raw("<br>\n\t\t_id: "), Blaze.View("lookup:userID", function() {
    return Spacebars.mustache(view.lookup("userID"));
  }), HTML.Raw("<br>\n\t"));
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/meteortoys_authenticate/client/main.js                                                           //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
var _0x9072=["\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x74\x6F\x79\x6B\x69\x74","\x61\x63\x63\x6F\x75\x6E\x74\x73\x2D\x62\x61\x73\x65","\x73\x74\x61\x72\x74\x54\x72\x61\x63\x6B\x65\x72\x73","\x73\x74\x61\x72\x74\x75\x70","\x75\x73\x65\x72\x49\x44","\x69\x6D\x70\x65\x72\x73\x6F\x6E\x61\x74\x65","\x65\x76\x65\x6E\x74\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x61\x63\x63\x6F\x75\x6E\x74\x73\x5F\x63\x6F\x6E\x74\x65\x6E\x74","\x65\x6E\x64\x53\x65\x73\x73\x69\x6F\x6E","\x50\x6C\x65\x61\x73\x65\x20\x65\x6E\x74\x65\x72\x20\x74\x68\x65\x20\x69\x64\x2C\x20\x65\x6D\x61\x69\x6C\x20\x6F\x72\x20\x75\x73\x65\x72\x6E\x61\x6D\x65\x20\x6F\x66\x20\x74\x68\x65\x20\x61\x63\x63\x6F\x75\x6E\x74\x20\x79\x6F\x75\x20\x61\x72\x65\x20\x6C\x6F\x6F\x6B\x69\x6E\x67\x20\x66\x6F\x72\x2E","\x72\x75\x6E\x53\x65\x61\x72\x63\x68","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x61\x63\x63\x6F\x75\x6E\x74\x73\x5F\x68\x65\x61\x64\x65\x72","\x75\x73\x65\x72","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x69\x6D\x70\x65\x72\x73\x6F\x6E\x61\x74\x65","\x67\x65\x74","\x68\x65\x6C\x70\x65\x72\x73","\x66\x69\x6E\x64","\x49\x6D\x70\x65\x72\x73\x6F\x6E\x61\x74\x65","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x44\x61\x74\x61","\x75\x73\x65\x72\x49\x64","\x65\x71\x75\x61\x6C\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x61\x63\x63\x6F\x75\x6E\x74\x73\x5F\x61\x63\x63\x6F\x75\x6E\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x69\x6D\x70\x65\x72\x73\x6F\x6E\x61\x74\x65\x5F\x70\x72\x65\x76\x69\x6F\x75\x73","\x73\x65\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x63\x75\x72\x72\x65\x6E\x74","\x66\x6F\x63\x75\x73","\x54\x6F\x79\x4B\x69\x74","\x73\x65\x74\x55\x73\x65\x72\x49\x64","\x63\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x63\x61\x6C\x6C","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x64\x6E\x69","\x54\x68\x65\x72\x65\x20\x20\x77\x61\x73\x20\x61\x6E\x20\x65\x72\x72\x6F\x72\x2E\x20\x50\x6C\x65\x61\x73\x65\x20\x74\x72\x79\x20\x61\x67\x61\x69\x6E\x20\x6C\x61\x74\x65\x72\x2E","\x4E\x6F\x20\x73\x75\x63\x68\x20\x61\x63\x63\x6F\x75\x6E\x74\x20\x66\x6F\x75\x6E\x64\x2E","\x63\x6C\x6F\x73\x65\x54\x6F\x79","\x61\x75\x74\x6F\x72\x75\x6E","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x69\x6D\x70\x65\x72\x73\x6F\x6E\x61\x74\x65\x5F\x61\x63\x63\x6F\x75\x6E\x74","\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74"];MeteorToys= Package[_0x9072[1]][_0x9072[0]];Meteor[_0x9072[4]](function(){if(Package[_0x9072[2]]){MTAuthenticate[_0x9072[3]]()}});Template[_0x9072[8]][_0x9072[7]]({"\x63\x6C\x69\x63\x6B\x20\x2E\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x72\x6F\x77":function(){target= this[_0x9072[5]];MTAuthenticate[_0x9072[6]](target)}});Template[_0x9072[12]][_0x9072[7]]({"\x63\x6C\x69\x63\x6B\x20\x23\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x74\x65\x6D\x70\x4C\x6F\x67\x6F\x75\x74":function(){MTAuthenticate[_0x9072[9]]()},"\x63\x6C\x69\x63\x6B\x20\x23\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x61\x63\x63\x6F\x75\x6E\x74\x73\x5F\x73\x65\x61\x72\x63\x68":function(){value= prompt(_0x9072[10]);if(value){MTAuthenticate[_0x9072[11]](value)}}});Template[_0x9072[12]][_0x9072[16]]({sessionIsEndable:function(){if(Meteor[_0x9072[13]]()){if(MeteorToys[_0x9072[15]](_0x9072[14])){return true}}}});Template[_0x9072[8]][_0x9072[16]]({account:function(){return Package[_0x9072[1]][_0x9072[19]][_0x9072[18]][_0x9072[17]]({},{sort:{date:-1}})}});Template[_0x9072[22]][_0x9072[16]]({authenticated:function(){if(Meteor[_0x9072[20]]()=== this[_0x9072[5]]){return true}},active:function(){if(Meteor[_0x9072[20]]()=== target){if(MeteorToys[_0x9072[21]](_0x9072[14],this[_0x9072[5]])){return true}}}});MTAuthenticate= {"\x69\x6D\x70\x65\x72\x73\x6F\x6E\x61\x74\x65":function(_0x1bc5x1){if(MeteorToys[_0x9072[15]](_0x9072[23])=== undefined){if(Meteor[_0x9072[20]]()){MeteorToys[_0x9072[24]](_0x9072[23],Meteor[_0x9072[20]]())}else {MeteorToys[_0x9072[24]](_0x9072[23],false)}};MeteorToys[_0x9072[24]](_0x9072[14],false);MeteorToys[_0x9072[24]](_0x9072[14],_0x1bc5x1);MeteorToys[_0x9072[24]](_0x9072[25],null);Package[_0x9072[1]][_0x9072[27]][_0x9072[24]](_0x9072[26])},"\x65\x6E\x64\x53\x65\x73\x73\x69\x6F\x6E":function(){previous= MeteorToys[_0x9072[15]](_0x9072[23]);if(previous){Meteor[_0x9072[30]](_0x9072[14],previous,function(_0x1bc5x2,_0x1bc5x3){if(!_0x1bc5x2){Meteor[_0x9072[29]][_0x9072[28]](previous)}})}else {Meteor[_0x9072[29]][_0x9072[28]]()};MeteorToys[_0x9072[24]](_0x9072[14],false)},"\x72\x75\x6E\x53\x65\x61\x72\x63\x68":function(_0x1bc5x4){Meteor[_0x9072[30]](_0x9072[31],_0x1bc5x4,function(_0x1bc5x2,_0x1bc5x3){if(_0x1bc5x2){alert(_0x9072[32])}else {if(_0x1bc5x3){MeteorToys[_0x9072[24]](_0x9072[14],false);MeteorToys[_0x9072[24]](_0x9072[14],_0x1bc5x3);MeteorToys[_0x9072[24]](_0x9072[25],null);Package[_0x9072[1]][_0x9072[27]][_0x9072[24]](_0x9072[26])}else {alert(_0x9072[33])}}})},"\x73\x74\x61\x72\x74\x54\x72\x61\x63\x6B\x65\x72\x73":function(){Tracker[_0x9072[35]](function(){userId= MeteorToys[_0x9072[15]](_0x9072[14]);if(userId){Meteor[_0x9072[30]](_0x9072[14],userId,function(_0x1bc5x2,_0x1bc5x3){if(!_0x1bc5x2){Meteor[_0x9072[29]][_0x9072[28]](userId);MeteorToys[_0x9072[34]]();MeteorToys[_0x9072[24]](_0x9072[14],userId)}})}});Tracker[_0x9072[35]](function(){user= Meteor[_0x9072[20]]();if(user){MeteorToys[_0x9072[24]](_0x9072[25],null);window[_0x9072[37]](function(){Meteor[_0x9072[30]](_0x9072[36],function(_0x1bc5x2,_0x1bc5x3){})},2000)}})}}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("meteortoys:authenticate", {
  MTAuthenticate: MTAuthenticate
});

})();
