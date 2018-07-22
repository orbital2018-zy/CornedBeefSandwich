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
var MeteorToys;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/meteortoys_toggle/client/template.main.js                                  //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //

Template.__checkName("MeteorToysToggle");
Template["MeteorToysToggle"] = new Template("Template.MeteorToysToggle", (function() {
  var view = this;
  return Blaze.Unless(function() {
    return Spacebars.call(view.lookup("hide"));
  }, function() {
    return [ "\n\t", HTML.DIV({
      id: "MeteorToys_Toggle",
      class: "MeteorToys-background-overlay1",
      oncontextmenu: "return false;",
      style: ""
    }), "\n\t" ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/meteortoys_toggle/client/main.js                                           //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
Meteor.startup(function() {
	MeteorToys = Package["meteortoys:toykit"].MeteorToys;
	MeteorToys.setDefault("hideToggle", false)
});

Template.MeteorToysToggle.events({
	'mouseenter #MeteorToys_Toggle': function (e,t) {
		e.preventDefault();
		e.stopPropagation();

		if (e.altKey) {
			window["MeteorToys"].close();
			MeteorToys.set("hideToggle", true);
			return;
		}

		if (e.shiftKey) {
			window["MeteorToys"].close();
			MeteorToys.set("hideToggle", true);
			return;
		}

		window["MeteorToys"].open();
	},
	'touchmove': function () {
		MeteorToys.set("hideToggle", true);
	}
});

Template.MeteorToysToggle.helpers({
	hide: function () {
		return MeteorToys.get("hideToggle")
	}
});
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("meteortoys:toggle");

})();
