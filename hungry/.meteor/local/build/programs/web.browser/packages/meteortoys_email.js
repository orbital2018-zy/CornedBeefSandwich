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
var MeteorToysDict, MeteorToysGoTo, currentEmail, nextEmail, emailCount, lastEmail, resultCount, current, thing, doc;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/meteortoys_email/client/template.main.js                                                   //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //

Template.__checkName("MeteorToys_email");
Template["MeteorToys_email"] = new Template("Template.MeteorToys_email", (function() {
  var view = this;
  return Blaze._TemplateWith(function() {
    return {
      name: Spacebars.call("MeteorToys_email")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("MeteorToy"), function() {
      return [ "\n\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_email_header")), "\n\t\t", Spacebars.include(view.lookupTemplate("MeteorToys_email_content")), "\n\t" ];
    });
  });
}));

Template.__checkName("MeteorToys_email_content");
Template["MeteorToys_email_content"] = new Template("Template.MeteorToys_email_content", (function() {
  var view = this;
  return HTML.DIV({
    class: "MeteorToys_email_content"
  }, "\n", Blaze.If(function() {
    return Spacebars.call(view.lookup("content"));
  }, function() {
    return [ "\n", Spacebars.With(function() {
      return Spacebars.call(view.lookup("content"));
    }, function() {
      return [ "\n\t", HTML.DIV({
        class: "MeteorToys_content"
      }, "\n\t\t", HTML.DIV({
        class: "MeteorToys_content_name"
      }, "To "), "\n\t\t", HTML.DIV({
        class: "MeteorToys_content_content"
      }, Blaze.View("lookup:to", function() {
        return Spacebars.mustache(view.lookup("to"));
      })), "\n\t"), "\n\t", HTML.DIV({
        class: "MeteorToys_content"
      }, "\n\t\t", HTML.DIV({
        class: "MeteorToys_content_name"
      }, "From "), "\n\t\t", HTML.DIV({
        class: "MeteorToys_content_content"
      }, Blaze.View("lookup:from", function() {
        return Spacebars.mustache(view.lookup("from"));
      })), "\n\t"), "\n\t", HTML.DIV({
        class: "MeteorToys_content"
      }, "\n\t\t", HTML.DIV({
        class: "MeteorToys_content_name"
      }, "Subject "), "\n\t\t", HTML.DIV({
        class: "MeteorToys_content_content"
      }, Blaze.View("lookup:subject", function() {
        return Spacebars.mustache(view.lookup("subject"));
      })), "\n\t"), "\n\t", HTML.DIV({
        class: "MeteorToys_content"
      }, "\n\t\t", HTML.DIV({
        class: "MeteorToys_content_name"
      }, "Time "), "\n\t\t", HTML.DIV({
        class: "MeteorToys_content_content"
      }, Blaze.View("lookup:timestamp", function() {
        return Spacebars.mustache(view.lookup("timestamp"));
      })), "\n\t"), "\n\t", HTML.DIV({
        class: "MeteorToys_content"
      }, "\n\t\t", HTML.DIV({
        class: "MeteorToys_content_name"
      }, "Body "), "\n\t\t", HTML.DIV({
        class: "MeteorToys_content_content"
      }, Blaze.View("lookup:body", function() {
        return Spacebars.mustache(view.lookup("body"));
      })), "\n\t"), "\n" ];
    }), "\n\t", HTML.Comment(" <pre>{{{content}}}</pre> "), "\n" ];
  }, function() {
    return [ "\n\t", HTML.DIV({
      style: "padding: 5px 8px"
    }, "\n\t\tWhenever your application sends", HTML.BR(), "\n\t\tan email, it will be captured", HTML.BR(), "\n\t\tand displayed here.\n\t"), "\n" ];
  }), "\n\t");
}));

Template.__checkName("MeteorToys_email_header");
Template["MeteorToys_email_header"] = new Template("Template.MeteorToys_email_header", (function() {
  var view = this;
  return HTML.DIV({
    class: "MeteorToys_email_header MeteorToys-background-overlay1"
  }, "\n\t\t", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasData"));
  }, function() {
    return [ "\n\t\t\t", HTML.DIV({
      class: "MeteorToys_email_button MeteorToys_email_next MeteorToys_action"
    }, HTML.CharRef({
      html: "&rsaquo;",
      str: "›"
    })), "\n\t\t\t", HTML.DIV({
      class: "MeteorToys_email_button MeteorToys_email_prev MeteorToys_action"
    }, HTML.CharRef({
      html: "&lsaquo;",
      str: "‹"
    })), "\n\t\t" ];
  }), "\n\t\t", HTML.DIV({
    class: "MeteorToys_name"
  }, HTML.Raw("<strong>Email</strong>"), " ", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasData"));
  }, function() {
    return [ Blaze.View("lookup:current", function() {
      return Spacebars.mustache(view.lookup("current"));
    }), " of ", Blaze.View("lookup:total", function() {
      return Spacebars.mustache(view.lookup("total"));
    }) ];
  })), "\n\t");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/meteortoys_email/client/main.js                                                            //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _0xa374=["\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x44\x69\x63\x74","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x74\x6F\x79\x6B\x69\x74","\x63\x75\x72\x72\x65\x6E\x74\x45\x6D\x61\x69\x6C","\x73\x65\x74","\x67\x65\x74","\x63\x6F\x75\x6E\x74","\x66\x69\x6E\x64","\x45\x6D\x61\x69\x6C","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x44\x61\x74\x61","\x6C\x61\x73\x74","\x70\x72\x65\x76","\x66\x69\x72\x73\x74","\x6E\x65\x78\x74","\x65\x76\x65\x6E\x74\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x65\x6D\x61\x69\x6C\x5F\x68\x65\x61\x64\x65\x72","\x68\x65\x6C\x70\x65\x72\x73","\x66\x65\x74\x63\x68","\x68\x74\x6D\x6C","\x74\x65\x78\x74","\x74\x69\x6D\x65\x73\x74\x61\x6D\x70","\x74\x6F\x4C\x6F\x63\x61\x6C\x65\x54\x69\x6D\x65\x53\x74\x72\x69\x6E\x67","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x65\x6D\x61\x69\x6C\x5F\x63\x6F\x6E\x74\x65\x6E\x74"];MeteorToysDict= Package[_0xa374[1]][_0xa374[0]];MeteorToysDict[_0xa374[3]](_0xa374[2],0);MeteorToysGoTo= {"\x6E\x65\x78\x74":function(){currentEmail= MeteorToysDict[_0xa374[4]](_0xa374[2])+ 1;nextEmail= MeteorToysDict[_0xa374[4]](_0xa374[2])+ 1;MeteorToysDict[_0xa374[3]](_0xa374[2],nextEmail)},"\x70\x72\x65\x76":function(){nextEmail= MeteorToysDict[_0xa374[4]](_0xa374[2])- 1;MeteorToysDict[_0xa374[3]](_0xa374[2],nextEmail)},"\x66\x69\x72\x73\x74":function(){MeteorToysDict[_0xa374[3]](_0xa374[2],0)},"\x6C\x61\x73\x74":function(){emailCount= Package[_0xa374[1]][_0xa374[8]][_0xa374[7]][_0xa374[6]]()[_0xa374[5]]();lastEmail= emailCount- 1;MeteorToysDict[_0xa374[3]](_0xa374[2],lastEmail)}};Template[_0xa374[14]][_0xa374[13]]({"\x63\x6C\x69\x63\x6B\x20\x2E\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x65\x6D\x61\x69\x6C\x5F\x70\x72\x65\x76":function(_0xf0bfx1,_0xf0bfx2){currentEmail= MeteorToysDict[_0xa374[4]](_0xa374[2]);if(currentEmail=== 0){MeteorToysGoTo[_0xa374[9]]()}else {MeteorToysGoTo[_0xa374[10]]()}},"\x63\x6C\x69\x63\x6B\x20\x2E\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x65\x6D\x61\x69\x6C\x5F\x6E\x65\x78\x74":function(){emailCount= Package[_0xa374[1]][_0xa374[8]][_0xa374[7]][_0xa374[6]]()[_0xa374[5]]();currentEmail= MeteorToysDict[_0xa374[4]](_0xa374[2])+ 1;if(emailCount=== currentEmail){MeteorToysGoTo[_0xa374[11]]()}else {MeteorToysGoTo[_0xa374[12]]()}}});Template[_0xa374[14]][_0xa374[15]]({current:function(){currentEmail= MeteorToysDict[_0xa374[4]](_0xa374[2])+ 1;return currentEmail},total:function(){emailCount= Package[_0xa374[1]][_0xa374[8]][_0xa374[7]][_0xa374[6]]()[_0xa374[5]]();return emailCount},hasData:function(){resultCount= Package[_0xa374[1]][_0xa374[8]][_0xa374[7]][_0xa374[6]]()[_0xa374[5]]();if(resultCount<= 1){return false}else {return true}}});Template[_0xa374[21]][_0xa374[15]]({"\x63\x6F\x6E\x74\x65\x6E\x74":function(){current= MeteorToysDict[_0xa374[4]](_0xa374[2]);thing= Package[_0xa374[1]][_0xa374[8]][_0xa374[7]][_0xa374[6]]({},{sort:{"\x74\x69\x6D\x65\x73\x74\x61\x6D\x70":-1}});doc= thing[_0xa374[16]]()[current];return doc},"\x62\x6F\x64\x79":function(){current= MeteorToysDict[_0xa374[4]](_0xa374[2]);thing= Package[_0xa374[1]][_0xa374[8]][_0xa374[7]][_0xa374[6]]({},{sort:{"\x74\x69\x6D\x65\x73\x74\x61\x6D\x70":-1}});doc= thing[_0xa374[16]]()[current];if(doc[_0xa374[17]]){return doc[_0xa374[17]]}else {return doc[_0xa374[18]]}},"\x74\x69\x6D\x65\x73\x74\x61\x6D\x70":function(){var _0xf0bfx3=this[_0xa374[19]];return _0xf0bfx3[_0xa374[20]]()}})
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("meteortoys:email");

})();
