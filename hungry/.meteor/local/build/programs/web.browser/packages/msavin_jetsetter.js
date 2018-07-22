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
var Session = Package.session.Session;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var MeteorToysDict, JetSetter, CloseJetSetter, value, stringed, colorize, targetDict, target, varName, currentDict, name, contents, Dictionaries, DictNames, dictionaryName;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/msavin_jetsetter/client/template.main.js                                                               //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //

Template.__checkName("JetSetter");
Template["JetSetter"] = new Template("Template.JetSetter", (function() {
  var view = this;
  return HTML.DIV({
    id: "JetSetter",
    class: function() {
      return [ "MeteorToys ", Spacebars.mustache(view.lookup("expanded")), " MeteorToys_hide_JetSetter MeteorToysReset" ];
    },
    oncontextmenu: 'Package["msavin:jetsetter"].CloseJetSetter(); return false;'
  }, "\n\t\t\n\t\t", Blaze.If(function() {
    return Spacebars.call(view.lookup("MeteorToys_Pro"));
  }, function() {
    return [ "\t\n\t\t\t", Spacebars.include(view.lookupTemplate("JetSetter_header_pro")), "\n\t\t" ];
  }, function() {
    return [ "\n\t\t\t", Spacebars.include(view.lookupTemplate("JetSetter_header")), "\n\t\t" ];
  }), "\n\t\t\n\t\t", Blaze.If(function() {
    return Spacebars.call(view.lookup("JetSetter_oldSession"));
  }, function() {
    return [ "\n\t\t\t", Spacebars.include(view.lookupTemplate("JetSetterSession")), "\n\t\t" ];
  }), "\n\t\t\n\t\t", Spacebars.include(view.lookupTemplate("JetSetter_reactive")), "\n\n\t");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/msavin_jetsetter/client/main.js                                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _0x2fb9=["\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x44\x69\x63\x74","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x74\x6F\x79\x6B\x69\x74","\x6B\x65\x79\x73","\x67\x65\x74\x4F\x77\x6E\x50\x72\x6F\x70\x65\x72\x74\x79\x4E\x61\x6D\x65\x73","\x4D\x65\x74\x65\x6F\x72\x2E","\x61\x72\x72\x61\x79\x43\x6C\x65\x61\x6E\x65\x72","\x4A\x65\x74\x53\x65\x74\x74\x65\x72","\x73\x65\x74","\x6C\x65\x6E\x67\x74\x68","\x73\x75\x62\x73\x74\x72","\x73\x70\x6C\x69\x63\x65","\x4A\x65\x74\x53\x65\x74\x74\x65\x72\x5F\x63\x75\x72\x72\x65\x6E\x74","\x67\x65\x74","\x4A\x65\x74\x53\x65\x74\x74\x65\x72\x5F\x65\x78\x70\x61\x6E\x64","\x61\x6C\x6C","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x68\x65\x6C\x70\x65\x72\x73","\x4A\x65\x74\x53\x65\x74\x74\x65\x72\x5F\x70\x72\x65\x76\x69\x65\x77\x4D\x6F\x64\x65","\x61\x64\x64\x43\x6C\x61\x73\x73","\x23\x4A\x65\x74\x53\x65\x74\x74\x65\x72","\x72\x65\x6D\x6F\x76\x65\x43\x6C\x61\x73\x73","\x65\x76\x65\x6E\x74\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73","\x63\x6C\x6F\x73\x65","\x53\x65\x73\x73\x69\x6F\x6E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x73\x65\x73\x73\x69\x6F\x6E","\x73\x74\x61\x72\x74\x75\x70"];MeteorToysDict= Package[_0x2fb9[1]][_0x2fb9[0]];JetSetter= {getKeys:function(){var _0xa36fx1=Object[_0x2fb9[3]](Session[_0x2fb9[2]]);_0xa36fx1= JetSetter[_0x2fb9[5]](_0xa36fx1,_0x2fb9[4]);MeteorToysDict[_0x2fb9[7]](_0x2fb9[6],_0xa36fx1)},arrayCleaner:function(_0xa36fx2,_0xa36fx3){var _0xa36fx4=_0xa36fx3[_0x2fb9[8]];for(var _0xa36fx5=0;_0xa36fx5< _0xa36fx2[_0x2fb9[8]];_0xa36fx5++){if(_0xa36fx2[_0xa36fx5][_0x2fb9[9]](0,_0xa36fx4)=== _0xa36fx3){_0xa36fx2[_0x2fb9[10]](_0xa36fx5,1);_0xa36fx5--}};return _0xa36fx2}};Template[_0x2fb9[6]][_0x2fb9[16]]({expanded:function(){var _0xa36fx6=MeteorToysDict[_0x2fb9[12]](_0x2fb9[11]);if(_0xa36fx6){return _0x2fb9[13]}},JetSetter_oldSession:function(){if( typeof Session[_0x2fb9[14]]== _0x2fb9[15]){return false}else {return true}}});Template[_0x2fb9[6]][_0x2fb9[21]]({"\x6D\x6F\x75\x73\x65\x6F\x76\x65\x72":function(){$(_0x2fb9[19])[_0x2fb9[18]](_0x2fb9[17])},"\x6D\x6F\x75\x73\x65\x6F\x75\x74":function(){$(_0x2fb9[19])[_0x2fb9[20]](_0x2fb9[17])}});CloseJetSetter= function(){if(Package[_0x2fb9[1]][_0x2fb9[22]][_0x2fb9[12]](_0x2fb9[11])){Package[_0x2fb9[1]][_0x2fb9[22]][_0x2fb9[7]](_0x2fb9[11])}else {MeteorToys[_0x2fb9[23]]()}};Meteor[_0x2fb9[27]](function(){if( typeof window[_0x2fb9[24]]=== _0x2fb9[25]){if(Package[_0x2fb9[26]]){window[_0x2fb9[24]]= Package[_0x2fb9[26]][_0x2fb9[24]]}}})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/msavin_jetsetter/client/row/template.main.js                                                           //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //

Template.__checkName("JetSetter_reactiveVar_row");
Template["JetSetter_reactiveVar_row"] = new Template("Template.JetSetter_reactiveVar_row", (function() {
  var view = this;
  return Blaze._TemplateWith(function() {
    return {
      name: Spacebars.call(view.lookup("componentName"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("JetSetter_Component"), function() {
      return [ "\n\t\t", HTML.DIV({
        class: "JetSetter_dictTitle"
      }, "\n\t\t\t", Blaze.View("lookup:..key", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "key"));
      }), HTML.SPAN({
        class: "JetSetter_value_preview"
      }, ": ", Blaze.View("lookup:value", function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("value")));
      })), "\n\t\t"), "\n\t\t", Spacebars.include(view.lookupTemplate("JetSetter_reactiveVar_editor")), "\n\t" ];
    });
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/msavin_jetsetter/client/row/main.js                                                                    //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //

Template.JetSetter_reactiveVar_row.helpers({
	'value': function () {
		try { 
			value = window[this.parent].get(this.key);
			return JSON.stringify(value)
		} catch (e) {
			return "<em>undefined</em>";
		}
	},
	'componentName': function () {
		return this.parent + "_" + this.key;
	}
})





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/msavin_jetsetter/client/row_editor/template.JetSetter_editor.js                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //

Template.__checkName("JetSetter_reactiveVar_editor");
Template["JetSetter_reactiveVar_editor"] = new Template("Template.JetSetter_reactiveVar_editor", (function() {
  var view = this;
  return HTML.DIV({
    class: "JetSetter_editor"
  }, "\n\t\t", Blaze.If(function() {
    return Spacebars.call(view.lookup("editing"));
  }, function() {
    return [ "\n\t\t\t", HTML.DIV({
      class: "JetSetter_editor_header"
    }, "\n\t\t\t\t", HTML.DIV({
      class: "JetSetter_editor_button JetSetter_button_save"
    }, "Save"), "\n\t\t\t\t", HTML.DIV({
      class: "JetSetter_editor_button JetSetter_button_cancel"
    }, "Cancel"), "\n\t\t\t\tValue \n\t\t\t"), "\n\t\t\t", HTML.DIV({
      class: "JetSetter_editor_content JetSetter_editor_content_editing",
      id: function() {
        return [ "JetSetter_editor_", Spacebars.mustache(view.lookup("editorName")) ];
      },
      contenteditable: "true"
    }, "\n\t\t\t\t", HTML.PRE(Blaze.View("lookup:editingContent", function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("editingContent")));
    })), "\n\t\t\t"), "\n\t\t" ];
  }, function() {
    return [ "\n\t\t\t", HTML.DIV({
      class: "JetSetter_editor_header"
    }, "\n\t\t\t\t", HTML.DIV({
      class: "JetSetter_editor_button JetSetter_button_edit MeteorToys_action"
    }, "Edit"), "\n\t\t\t\t", HTML.DIV({
      class: "JetSetter_editor_button JetSetter_button_drop MeteorToys_action"
    }, "Nullify"), "\n\t\t\t\tValue \n\t\t\t"), "\n\t\t\t", HTML.DIV({
      class: "JetSetter_editor_content"
    }, "\n\t\t\t\t", HTML.PRE(Blaze.View("lookup:content", function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("content")));
    })), "\n\t\t\t"), "\n\t\t" ];
  }), "\n\t");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/msavin_jetsetter/client/row_editor/JetSetter_editor.js                                                 //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _0x4982=["\x6B\x65\x79","\x67\x65\x74","\x70\x61\x72\x65\x6E\x74","\x73\x74\x72\x69\x6E\x67\x69\x66\x79","\x63\x6F\x6C\x6F\x72\x69\x7A\x65","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x74\x6F\x79\x6B\x69\x74","\x4A\x65\x74\x53\x65\x74\x74\x65\x72\x5F\x73\x65\x74\x74\x69\x6E\x67\x73\x5F\x65\x64\x69\x74","\x5F","\x68\x65\x6C\x70\x65\x72\x73","\x4A\x65\x74\x53\x65\x74\x74\x65\x72\x5F\x72\x65\x61\x63\x74\x69\x76\x65\x56\x61\x72\x5F\x65\x64\x69\x74\x6F\x72","\x74\x65\x78\x74","\x23\x4A\x65\x74\x53\x65\x74\x74\x65\x72\x5F\x65\x64\x69\x74\x6F\x72\x5F","\x70\x61\x72\x73\x65","\x4A\x65\x74\x53\x65\x74\x74\x65\x72\x5F\x66\x61\x69\x6C\x65\x64\x5F\x63\x68\x61\x6E\x67\x65","\x73\x65\x74","\x4A\x65\x74\x53\x65\x74\x74\x65\x72\x5F\x63\x75\x72\x72\x65\x6E\x74","\x65\x76\x65\x6E\x74\x73"];Template[_0x4982[10]][_0x4982[9]]({"\x63\x6F\x6E\x74\x65\x6E\x74":function(){value= undefined;try{value= window[this[_0x4982[2]]][_0x4982[1]](this[_0x4982[0]])}catch(e){};stringed= JSON[_0x4982[3]](value,null,2);colorize= Package[_0x4982[6]][_0x4982[5]][_0x4982[4]](stringed);return colorize},"\x65\x64\x69\x74\x69\x6E\x67\x43\x6F\x6E\x74\x65\x6E\x74":function(){value= undefined;try{value= window[this[_0x4982[2]]][_0x4982[1]](this[_0x4982[0]])}catch(e){};stringed= JSON[_0x4982[3]](value,null,2);return stringed},"\x65\x64\x69\x74\x69\x6E\x67":function(){return MeteorToysDict[_0x4982[1]](_0x4982[7])},"\x65\x64\x69\x74\x6F\x72\x4E\x61\x6D\x65":function(){return this[_0x4982[2]]+ _0x4982[8]+ this[_0x4982[0]]}});Template[_0x4982[10]][_0x4982[17]]({"\x63\x6C\x69\x63\x6B\x20\x2E\x4A\x65\x74\x53\x65\x74\x74\x65\x72\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x73\x61\x76\x65":function(){var _0x2e35x1=$(_0x4982[12]+ String(this[_0x4982[2]])+ _0x4982[8]+ String(this[_0x4982[0]]))[_0x4982[11]]();var _0x2e35x2=false;try{_0x2e35x2= JSON[_0x4982[13]](_0x2e35x1)}catch(error){var _0x2e35x2=_0x4982[14]};if(_0x2e35x2=== _0x4982[14]){}else {targetDict= window[this[_0x4982[2]]];window[this[_0x4982[2]]][_0x4982[15]](this[_0x4982[0]],_0x2e35x2)};MeteorToysDict[_0x4982[15]](_0x4982[7],false)},"\x63\x6C\x69\x63\x6B\x20\x2E\x4A\x65\x74\x53\x65\x74\x74\x65\x72\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x63\x61\x6E\x63\x65\x6C":function(){MeteorToysDict[_0x4982[15]](_0x4982[7],false)},"\x63\x6C\x69\x63\x6B\x20\x2E\x4A\x65\x74\x53\x65\x74\x74\x65\x72\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x65\x64\x69\x74":function(){MeteorToysDict[_0x4982[15]](_0x4982[7],true)},"\x63\x6C\x69\x63\x6B\x20\x2E\x4A\x65\x74\x53\x65\x74\x74\x65\x72\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x64\x72\x6F\x70":function(){target= window[this[_0x4982[2]]];if(target[_0x4982[1]](this[_0x4982[0]])=== null){MeteorToysDict[_0x4982[15]](_0x4982[16],false)}else {target[_0x4982[15]](this[_0x4982[0]],null)}}})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/msavin_jetsetter/client/row_header/template.JetSetter_header.js                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //

Template.__checkName("JetSetter_header");
Template["JetSetter_header"] = new Template("Template.JetSetter_header", (function() {
  var view = this;
  return Blaze._TemplateWith(function() {
    return {
      name: Spacebars.call("header")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("JetSetter_Component"), function() {
      return [ "\n\t\t", HTML.STRONG("JetSetter"), "\n\t\t", HTML.DIV({
        class: "JetSetter_editor"
      }, "\n\t\t\t", HTML.DIV({
        class: "JetSetter_editor_header"
      }, "\n\t\t\t\tIn-App Session Editor\n\t\t\t"), "\n\t\t\t", HTML.DIV({
        class: "JetSetter_editor_content"
      }, "\n", HTML.PRE({
        class: "MeteorToys-off"
      }, "{ \n  ", HTML.SPAN({
        class: "MeteorToys_key"
      }, '"created_by"'), ': "', HTML.A({
        href: "http://maxsavin.com"
      }, "Max Savin"), '",\n  ', HTML.SPAN({
        class: "MeteorToys_key"
      }, '"docs_at"'), ':    "', HTML.A({
        href: "https://meteor.toys"
      }, "Meteor Toys"), '",\n  ', HTML.SPAN({
        class: "MeteorToys_key"
      }, '"license"'), ':    "', HTML.A({
        href: "https://github.com/MeteorToys/allthings/blob/master/LICENSE.md"
      }, "MT License"), '",\n}\n'), "\n\t\t\t"), "\n\t\t"), "\n\t" ];
    });
  });
}));

Template.__checkName("JetSetter_header_pro");
Template["JetSetter_header_pro"] = new Template("Template.JetSetter_header_pro", (function() {
  var view = this;
  return Blaze._TemplateWith(function() {
    return {
      name: Spacebars.call("header2")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("JetSetter_Component"), function() {
      return [ "\n\n\t\t", HTML.STRONG("JetSetter Pro"), "\n\t\t", HTML.DIV({
        class: "JetSetter_editor"
      }, "\n\t\t\t", HTML.DIV({
        class: "JetSetter_editor_header"
      }, "\n\t\t\t\t", HTML.DIV({
        class: "JetSetter_editor_button JetSetter_button_drop"
      }, "\n\t\t\t\t\tAdd\n\t\t\t\t"), "\n\t\t\t\tReactive Dictionaries\n\t\t\t"), "\n\t\t\t", HTML.DIV({
        class: "JetSetter_editor_content",
        style: "padding-top: 4px"
      }, "\n\t\t\t\t", Blaze.Each(function() {
        return Spacebars.call(view.lookup("ReactiveVar"));
      }, function() {
        return [ "\n\t\t\t\t\t", HTML.DIV({
          class: "MeteorToys_row"
        }, "\n\t\t\t\t\t\t", HTML.DIV({
          class: "MeteorToys_row_remove"
        }, HTML.CharRef({
          html: "&times;",
          str: "×"
        })), "\n\t\t\t\t\t\t", Blaze.View("lookup:name", function() {
          return Spacebars.mustache(view.lookup("name"));
        }), "\n\t\t\t\t\t"), "\n\t\t\t\t" ];
      }, function() {
        return [ "\n\t\t\t\t\tYou are not watching any", HTML.BR(), " reactive dictionaries.\n\t\t\t\t\tTo watch,", HTML.BR(), ' simply press the "Add" button.', HTML.BR(), "\n\t\t\t\t" ];
      }), "\n\t\t\t"), "\n\t\t"), "\n\t\t\n\t" ];
    });
  });
}));

Template.__checkName("JetSetter_reactiveDict_header");
Template["JetSetter_reactiveDict_header"] = new Template("Template.JetSetter_reactiveDict_header", (function() {
  var view = this;
  return Blaze._TemplateWith(function() {
    return {
      name: Spacebars.call(view.lookup("componentName"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("JetSetter_Component"), function() {
      return [ "\n\t\t\n\t\t", HTML.DIV({
        class: "JetSetter_dictTitle"
      }, "\n\t\t\t", HTML.STRONG(Blaze.View("lookup:..name", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));
      })), "\n\t\t\t", HTML.DIV("\n\t\t\t\t", HTML.STRONG("+"), "\n\t\t\t"), "\n\t\t"), "\n\t\t\n\t\t", HTML.DIV({
        class: "JetSetter_editor"
      }, "\n\t\t\t", HTML.DIV({
        class: "JetSetter_editor_header"
      }, "\n\t\t\t\t", HTML.INPUT({
        type: "text",
        class: "JetSetter_editor_title",
        id: function() {
          return [ "JetSetter_new_name_", Spacebars.mustache(Spacebars.dot(view.lookup("."), "name")) ];
        },
        placeholder: "Enter Name"
      }), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), "\n\t\t\t\t", HTML.DIV({
        class: "JetSetter_editor_button JetSetter_button_new MeteorToys_action"
      }, "\n\t\t\t\t\tSet\n\t\t\t\t"), "\n\t\t\t"), "\n\t\t\t", HTML.DIV({
        class: "JetSetter_editor_content JetSetter_editor_create",
        id: function() {
          return [ "JetSetter_new_", Spacebars.mustache(Spacebars.dot(view.lookup("."), "name")) ];
        },
        contenteditable: "true",
        style: "cursor: text"
      }), "\n\t\t"), "\n\n\t" ];
    });
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/msavin_jetsetter/client/row_header/JetSetter_header.js                                                 //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
Template.JetSetter_header_pro.events({
	'click .JetSetter_editor_button': function () {
		
		varName = prompt("What's it called?");
		target  = window[varName];

		if (typeof target === "undefined") {
			alert("The variable you specified does not exist. Please try again.");
			return;
		}
		
		if (typeof target.all === "undefined") {
			alert("Invalid variable specified. Please try again");
		} else {
			Package["meteortoys:toykit"].MeteorToysData.JetSetter.insert({
				'name': varName
			});
		}

	},
	'click .MeteorToys_row': function () {

		var varID = Package["meteortoys:toykit"].MeteorToysData.JetSetter.findOne({
			'name': this.name
		})._id;

		Package["meteortoys:toykit"].MeteorToysData.JetSetter.remove(varID);

	}
});

Template.JetSetter_header_pro.helpers({
	ReactiveVar: function () {
		return Package["meteortoys:toykit"].MeteorToysData.JetSetter.find();
	}
});

Template.JetSetter_reactiveDict_header.events({
	'click .JetSetter_dictTitle': function() {
		$("#JetSetter_new_name_" + this.name).focus();
	},
	'click .JetSetter_button_new': function () {
		
		// Capture the Reactive Dictionary
		currentDict = window[this.name];

		// Get all the values
		name     = $('#JetSetter_new_name_' + this.name).val();
		contents = $('#JetSetter_new_' + this.name).text();
		value 	 = Package["meteortoys:toykit"].MeteorToys_JSON.parse(contents);

		// Set the value
		currentDict.set(name, value);

		// Open the box
		var item    = "JetSetter_" + String(this.name) + "_" + name;
		MeteorToysDict.set("JetSetter_current", item);

		// Clear the inputs
		$('#JetSetter_new_name_' + this.name).val("");
		$('#JetSetter_new_' + this.name).html = "";

	}
})

Template.JetSetter_reactiveDict_header.helpers({
	'componentName': function () {
		return "header_" + this.name;
	}
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/msavin_jetsetter/client/row_dict/template.main.js                                                      //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //

Template.__checkName("JetSetter_reactive");
Template["JetSetter_reactive"] = new Template("Template.JetSetter_reactive", (function() {
  var view = this;
  return Blaze.Each(function() {
    return Spacebars.call(view.lookup("ReactiveDrill"));
  }, function() {
    return [ "\n\t\t", Spacebars.include(view.lookupTemplate("JetSetter_reactiveDict_header")), "\n\t\t", Blaze.Each(function() {
      return Spacebars.call(view.lookup("keys"));
    }, function() {
      return [ "\n\t\t\t", Spacebars.include(view.lookupTemplate("JetSetter_reactiveVar_row")), "\n\t\t" ];
    }), "\n\t" ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/msavin_jetsetter/client/row_dict/main.js                                                               //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _0xf974=["\x73\x65\x73\x73\x69\x6F\x6E","\x61\x6C\x6C","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x6B\x65\x79\x73","\x53\x65\x73\x73\x69\x6F\x6E","\x70\x75\x73\x68","\x66\x6F\x72\x45\x61\x63\x68","\x61\x75\x74\x68\x65\x6E\x74\x69\x63\x61\x74\x65\x64","\x65\x71\x75\x61\x6C\x73","\x54\x6F\x79\x4B\x69\x74","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x74\x6F\x79\x6B\x69\x74","\x66\x65\x74\x63\x68","\x66\x69\x6E\x64","\x4A\x65\x74\x53\x65\x74\x74\x65\x72","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x44\x61\x74\x61","\x6E\x61\x6D\x65","\x68\x65\x6C\x70\x65\x72\x73","\x4A\x65\x74\x53\x65\x74\x74\x65\x72\x5F\x72\x65\x61\x63\x74\x69\x76\x65"];Template[_0xf974[17]][_0xf974[16]]({ReactiveDrill:function(){Dictionaries= [];if(Package[_0xf974[0]]){if( typeof Session[_0xf974[1]]== _0xf974[2]){var _0xb9a5x1=[];var _0xb9a5x2=Object[_0xf974[3]](Session[_0xf974[1]]());_0xb9a5x2[_0xf974[6]](function(_0xb9a5x3){_0xb9a5x1[_0xf974[5]]({parent:_0xf974[4],key:_0xb9a5x3})});Dictionaries[_0xf974[5]]({name:_0xf974[4],keys:_0xb9a5x1})}};if(Package[_0xf974[10]][_0xf974[9]][_0xf974[8]](_0xf974[7],true)){DictNames= Package[_0xf974[10]][_0xf974[14]][_0xf974[13]][_0xf974[12]]()[_0xf974[11]]();DictNames[_0xf974[6]](function(_0xb9a5x4){dictionaryName= _0xb9a5x4[_0xf974[15]];_0xb9a5x1= [];_0xb9a5x2= Object[_0xf974[3]](window[_0xb9a5x4[_0xf974[15]]][_0xf974[1]]());_0xb9a5x2[_0xf974[6]](function(_0xb9a5x3){_0xb9a5x1[_0xf974[5]]({parent:dictionaryName,key:_0xb9a5x3})});Dictionaries[_0xf974[5]]({name:dictionaryName,keys:_0xb9a5x1})})};return Dictionaries}})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/msavin_jetsetter/client/_component/template.component.js                                               //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //

Template.__checkName("JetSetter_Component");
Template["JetSetter_Component"] = new Template("Template.JetSetter_Component", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "JetSetter_row ", Spacebars.mustache(view.lookup("expand")) ];
    },
    id: function() {
      return [ "JetSetter_", Spacebars.mustache(view.lookup("name")) ];
    }
  }, "\n\t\t", Blaze._InOuterTemplateScope(view, function() {
    return Spacebars.include(function() {
      return Spacebars.call(view.templateContentBlock);
    });
  }), "\n\t");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/msavin_jetsetter/client/_component/component.js                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
Template.JetSetter_Component.helpers({
	expand: function () {
	    
	    var current = String(MeteorToysDict.get("JetSetter_current"));
	    var item    = "JetSetter_" + String(this.name);

	    if (current === item) {
	        return "JetSetter_row_expand";
	    }

	}
});

Template.JetSetter_Component.events({
	'click .JetSetter_row': function () {

		var current = String(MeteorToysDict.get("JetSetter_current"));
		var target  = "JetSetter_" + String(this.name);

		if (current === target) {
			MeteorToysDict.set("JetSetter_current", null);
		} else {
			MeteorToysDict.set("JetSetter_current", target);
		}

		// ensure editing is set to false
		MeteorToysDict.set("JetSetter_settings_edit", false)

		// remove hover element
		$("#JetSetter").removeClass("JetSetter_previewMode");
		
		
	},
	'click .JetSetter_editor': function (e, t) {
	    e.stopPropagation();
	}
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("msavin:jetsetter", {
  JetSetter: JetSetter,
  CloseJetSetter: CloseJetSetter
});

})();
