(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var EJSON = Package.ejson.EJSON;
var Spacebars = Package.spacebars.Spacebars;
var BaseComponent = Package['peerlibrary:base-component'].BaseComponent;
var BaseComponentDebug = Package['peerlibrary:base-component'].BaseComponentDebug;
var assert = Package['peerlibrary:assert'].assert;
var ReactiveField = Package['peerlibrary:reactive-field'].ReactiveField;
var ComputedField = Package['peerlibrary:computed-field'].ComputedField;
var DataLookup = Package['peerlibrary:data-lookup'].DataLookup;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var __coffeescriptShare, Template, AttributeHandler, ElementAttributesUpdater, BlazeComponent, BlazeComponentDebug;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/template.coffee.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
             

Template = Blaze.Template;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/compatibility/templating.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* This file is needed to backport this pull request: https://github.com/meteor/meteor/pull/5903
   If it is a copy of templating.js file wrapped into a condition.

   TODO: Remove this file eventually.
 */

if (!Blaze.Template.__checkName) {
  // Packages and apps add templates on to this object.

  /**
   * @summary The class for defining templates
   * @class
   * @instanceName Template.myTemplate
   */
  Template = Blaze.Template;

  var RESERVED_TEMPLATE_NAMES = "__proto__ name".split(" ");

  // Check for duplicate template names and illegal names that won't work.
  Template.__checkName = function (name) {
    // Some names can't be used for Templates. These include:
    //  - Properties Blaze sets on the Template object.
    //  - Properties that some browsers don't let the code to set.
    //    These are specified in RESERVED_TEMPLATE_NAMES.
    if (name in Template || _.contains(RESERVED_TEMPLATE_NAMES, name)) {
      if ((Template[name] instanceof Template) && name !== "body")
        throw new Error("There are multiple templates named '" + name + "'. Each template needs a unique name.");
      throw new Error("This template name is reserved: " + name);
    }
  };

  // XXX COMPAT WITH 0.8.3
  Template.__define__ = function (name, renderFunc) {
    Template.__checkName(name);
    Template[name] = new Template("Template." + name, renderFunc);
    // Exempt packages built pre-0.9.0 from warnings about using old
    // helper syntax, because we can.  It's not very useful to get a
    // warning about someone else's code (like a package on Atmosphere),
    // and this should at least put a bit of a dent in number of warnings
    // that come from packages that haven't been updated lately.
    Template[name]._NOWARN_OLDSTYLE_HELPERS = true;
  };

  // Define a template `Template.body` that renders its
  // `contentRenderFuncs`.  `<body>` tags (of which there may be
  // multiple) will have their contents added to it.

  /**
   * @summary The [template object](#templates_api) representing your `<body>`
   * tag.
   * @locus Client
   */
  Template.body = new Template('body', function () {
    var view = this;
    return _.map(Template.body.contentRenderFuncs, function (func) {
      return func.apply(view);
    });
  });
  Template.body.contentRenderFuncs = []; // array of Blaze.Views
  Template.body.view = null;

  Template.body.addContent = function (renderFunc) {
    Template.body.contentRenderFuncs.push(renderFunc);
  };

  // This function does not use `this` and so it may be called
  // as `Meteor.startup(Template.body.renderIntoDocument)`.
  Template.body.renderToDocument = function () {
    // Only do it once.
    if (Template.body.view)
      return;

    var view = Blaze.render(Template.body, document.body);
    Template.body.view = view;
  };

  // XXX COMPAT WITH 0.9.0
  UI.body = Template.body;

  // XXX COMPAT WITH 0.9.0
  // (<body> tags in packages built with 0.9.0)
  Template.__body__ = Template.body;
  Template.__body__.__contentParts = Template.body.contentViews;
  Template.__body__.__instantiate = Template.body.renderToDocument;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/compatibility/template.dynamic.js                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("__dynamicBackport");
Template["__dynamicBackport"] = new Template("Template.__dynamicBackport", (function() {
  var view = this;
  return [ Blaze.View("lookup:checkContext", function() {
    return Spacebars.mustache(view.lookup("checkContext"));
  }), "\n  ", Blaze.If(function() {
    return Spacebars.call(view.lookup("dataContextPresent"));
  }, function() {
    return [ "\n    ", Spacebars.include(view.lookupTemplate("__dynamicWithDataContext"), function() {
      return Blaze._InOuterTemplateScope(view, function() {
        return Spacebars.include(function() {
          return Spacebars.call(view.templateContentBlock);
        });
      });
    }), "\n  " ];
  }, function() {
    return [ "\n    \n    ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("template")),
        data: Spacebars.call(view.lookup(".."))
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("__dynamicWithDataContext"), function() {
        return Blaze._InOuterTemplateScope(view, function() {
          return Spacebars.include(function() {
            return Spacebars.call(view.templateContentBlock);
          });
        });
      });
    }), "\n  " ];
  }) ];
}));

Template.__checkName("__dynamicWithDataContextBackport");
Template["__dynamicWithDataContextBackport"] = new Template("Template.__dynamicWithDataContextBackport", (function() {
  var view = this;
  return Spacebars.With(function() {
    return Spacebars.dataMustache(view.lookup("chooseTemplate"), view.lookup("template"));
  }, function() {
    return [ "\n    \n    ", Blaze._TemplateWith(function() {
      return Spacebars.call(Spacebars.dot(view.lookup(".."), "data"));
    }, function() {
      return Spacebars.include(view.lookupTemplate(".."), function() {
        return Blaze._InOuterTemplateScope(view, function() {
          return Spacebars.include(function() {
            return Spacebars.call(view.templateContentBlock);
          });
        });
      });
    }), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/compatibility/dynamic.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* This file is needed to backport this pull request: https://github.com/meteor/meteor/pull/5903
   If it is a copy of dynamic.js file wrapped into a condition with renaming of backported templates.

   TODO: Remove this file eventually.
 */

if (!Blaze.Template.__dynamicWithDataContext) {
  Blaze.Template.__dynamicWithDataContext = Blaze.Template.__dynamicWithDataContextBackport;
  Blaze.Template.__dynamicWithDataContext.viewName = 'Template.__dynamicWithDataContext';
  Blaze.Template.__dynamic = Blaze.Template.__dynamicBackport;
  Blaze.Template.__dynamic.viewName = 'Template.__dynamic';

  var Template = Blaze.Template;

  /**
   * @isTemplate true
   * @memberOf Template
   * @function dynamic
   * @summary Choose a template to include dynamically, by name.
   * @locus Templates
   * @param {String} template The name of the template to include.
   * @param {Object} [data] Optional. The data context in which to include the
   * template.
   */

  Template.__dynamicWithDataContext.helpers({
    chooseTemplate: function (name) {
      return Blaze._getTemplate(name, function () {
        return Template.instance();
      });
    }
  });

  Template.__dynamic.helpers({
    dataContextPresent: function () {
      return _.has(this, "data");
    },
    checkContext: function () {
      if (!_.has(this, "template")) {
        throw new Error("Must specify name in the 'template' argument " +
          "to {{> Template.dynamic}}.");
      }

      _.each(this, function (v, k) {
        if (k !== "template" && k !== "data") {
          throw new Error("Invalid argument to {{> Template.dynamic}}: " +
            k);
        }
      });
    }
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/compatibility/lookup.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* This file backports Blaze lookup.js from Meteor 1.2 so that required Blaze features to support Blaze
   Components are available also in older Meteor versions.
   It is a copy of lookup.js file from Meteor 1.2 with lexical scope lookup commented out.

   TODO: Remove this file eventually.
 */

// Check if we are not running Meteor 1.2+.
if (! Blaze._getTemplate) {
  // If `x` is a function, binds the value of `this` for that function
  // to the current data context.
  var bindDataContext = function (x) {
    if (typeof x === 'function') {
      return function () {
        var data = Blaze.getData();
        if (data == null)
          data = {};
        return x.apply(data, arguments);
      };
    }
    return x;
  };

  Blaze._getTemplateHelper = function (template, name, tmplInstanceFunc) {
    // XXX COMPAT WITH 0.9.3
    var isKnownOldStyleHelper = false;

    if (template.__helpers.has(name)) {
      var helper = template.__helpers.get(name);
      if (helper === Blaze._OLDSTYLE_HELPER) {
        isKnownOldStyleHelper = true;
      } else if (helper != null) {
        return wrapHelper(bindDataContext(helper), tmplInstanceFunc);
      } else {
        return null;
      }
    }

    // old-style helper
    if (name in template) {
      // Only warn once per helper
      if (!isKnownOldStyleHelper) {
        template.__helpers.set(name, Blaze._OLDSTYLE_HELPER);
        if (!template._NOWARN_OLDSTYLE_HELPERS) {
          Blaze._warn('Assigning helper with `' + template.viewName + '.' +
            name + ' = ...` is deprecated.  Use `' + template.viewName +
            '.helpers(...)` instead.');
        }
      }
      if (template[name] != null) {
        return wrapHelper(bindDataContext(template[name]), tmplInstanceFunc);
      }
    }

    return null;
  };

  var wrapHelper = function (f, templateFunc) {
    // XXX COMPAT WITH METEOR 1.0.3.2
    if (!Blaze.Template._withTemplateInstanceFunc) {
      return Blaze._wrapCatchingExceptions(f, 'template helper');
    }

    if (typeof f !== "function") {
      return f;
    }

    return function () {
      var self = this;
      var args = arguments;

      return Blaze.Template._withTemplateInstanceFunc(templateFunc, function () {
        return Blaze._wrapCatchingExceptions(f, 'template helper').apply(self, args);
      });
    };
  };

  // templateInstance argument is provided to be available for possible
  // alternative implementations of this function by 3rd party packages.
  Blaze._getTemplate = function (name, templateInstance) {
    if ((name in Blaze.Template) && (Blaze.Template[name] instanceof Blaze.Template)) {
      return Blaze.Template[name];
    }
    return null;
  };

  Blaze._getGlobalHelper = function (name, templateInstance) {
    if (Blaze._globalHelpers[name] != null) {
      return wrapHelper(bindDataContext(Blaze._globalHelpers[name]), templateInstance);
    }
    return null;
  };

  Blaze.View.prototype.lookup = function (name, _options) {
    var template = this.template;
    var lookupTemplate = _options && _options.template;
    var helper;
    var binding;
    var boundTmplInstance;
    var foundTemplate;

    if (this.templateInstance) {
      boundTmplInstance = _.bind(this.templateInstance, this);
    }

    // 0. looking up the parent data context with the special "../" syntax
    if (/^\./.test(name)) {
      // starts with a dot. must be a series of dots which maps to an
      // ancestor of the appropriate height.
      if (!/^(\.)+$/.test(name))
        throw new Error("id starting with dot must be a series of dots");

      return Blaze._parentData(name.length - 1, true /*_functionWrapped*/);

    }

    // 1. look up a helper on the current template
    if (template && ((helper = Blaze._getTemplateHelper(template, name, boundTmplInstance)) != null)) {
      return helper;
    }

    // 2. look up a binding by traversing the lexical view hierarchy inside the
    // current template
    /*if (template && (binding = Blaze._lexicalBindingLookup(Blaze.currentView, name)) != null) {
      return binding;
    }*/

    // 3. look up a template by name
    if (lookupTemplate && ((foundTemplate = Blaze._getTemplate(name, boundTmplInstance)) != null)) {
      return foundTemplate;
    }

    // 4. look up a global helper
    if ((helper = Blaze._getGlobalHelper(name, boundTmplInstance)) != null) {
      return helper;
    }

    // 5. look up in a data context
    return function () {
      var isCalledAsFunction = (arguments.length > 0);
      var data = Blaze.getData();
      var x = data && data[name];
      if (!x) {
        if (lookupTemplate) {
          throw new Error("No such template: " + name);
        } else if (isCalledAsFunction) {
          throw new Error("No such function: " + name);
        } /*else if (name.charAt(0) === '@' && ((x === null) ||
          (x === undefined))) {
          // Throw an error if the user tries to use a `@directive`
          // that doesn't exist.  We don't implement all directives
          // from Handlebars, so there's a potential for confusion
          // if we fail silently.  On the other hand, we want to
          // throw late in case some app or package wants to provide
          // a missing directive.
          throw new Error("Unsupported directive: " + name);
        }*/
      }
      if (!data) {
        return null;
      }
      if (typeof x !== 'function') {
        if (isCalledAsFunction) {
          throw new Error("Can't call non-function: " + x);
        }
        return x;
      }
      return x.apply(data, arguments);
    };
  };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/compatibility/attrs.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* This file is needed to backport this pull request: https://github.com/meteor/meteor/pull/5893
   It is a copy of attrs.js file with the changes from the above pull request merged in.

   TODO: Remove this file eventually.
 */

var jsUrlsAllowed = false;
Blaze._allowJavascriptUrls = function () {
  jsUrlsAllowed = true;
};
Blaze._javascriptUrlsAllowed = function () {
  return jsUrlsAllowed;
};

// An AttributeHandler object is responsible for updating a particular attribute
// of a particular element.  AttributeHandler subclasses implement
// browser-specific logic for dealing with particular attributes across
// different browsers.
//
// To define a new type of AttributeHandler, use
// `var FooHandler = AttributeHandler.extend({ update: function ... })`
// where the `update` function takes arguments `(element, oldValue, value)`.
// The `element` argument is always the same between calls to `update` on
// the same instance.  `oldValue` and `value` are each either `null` or
// a Unicode string of the type that might be passed to the value argument
// of `setAttribute` (i.e. not an HTML string with character references).
// When an AttributeHandler is installed, an initial call to `update` is
// always made with `oldValue = null`.  The `update` method can access
// `this.name` if the AttributeHandler class is a generic one that applies
// to multiple attribute names.
//
// AttributeHandlers can store custom properties on `this`, as long as they
// don't use the names `element`, `name`, `value`, and `oldValue`.
//
// AttributeHandlers can't influence how attributes appear in rendered HTML,
// only how they are updated after materialization as DOM.

AttributeHandler = function (name, value) {
  this.name = name;
  this.value = value;
};
Blaze._AttributeHandler = AttributeHandler;

AttributeHandler.prototype.update = function (element, oldValue, value) {
  if (value === null) {
    if (oldValue !== null)
      element.removeAttribute(this.name);
  } else {
    element.setAttribute(this.name, value);
  }
};

AttributeHandler.extend = function (options) {
  var curType = this;
  var subType = function AttributeHandlerSubtype(/*arguments*/) {
    AttributeHandler.apply(this, arguments);
  };
  subType.prototype = new curType;
  subType.extend = curType.extend;
  if (options)
    _.extend(subType.prototype, options);
  return subType;
};

/// Apply the diff between the attributes of "oldValue" and "value" to "element."
//
// Each subclass must implement a parseValue method which takes a string
// as an input and returns a dict of attributes. The keys of the dict
// are unique identifiers (ie. css properties in the case of styles), and the
// values are the entire attribute which will be injected into the element.
//
// Extended below to support classes, SVG elements and styles.

Blaze._DiffingAttributeHandler = AttributeHandler.extend({
  update: function (element, oldValue, value) {
    if (!this.getCurrentValue || !this.setValue || !this.parseValue)
      throw new Error("Missing methods in subclass of 'DiffingAttributeHandler'");

    var oldAttrsMap = oldValue ? this.parseValue(oldValue) : {};
    var newAttrsMap = value ? this.parseValue(value) : {};

    // the current attributes on the element, which we will mutate.

    var attrString = this.getCurrentValue(element);
    var attrsMap = attrString ? this.parseValue(attrString) : {};

    _.each(_.keys(oldAttrsMap), function (t) {
      if (! (t in newAttrsMap))
        delete attrsMap[t];
    });

    _.each(_.keys(newAttrsMap), function (t) {
      attrsMap[t] = newAttrsMap[t];
    });

    this.setValue(element, _.values(attrsMap).join(' '));
  }
});

var ClassHandler = Blaze._DiffingAttributeHandler.extend({
  // @param rawValue {String}
  getCurrentValue: function (element) {
    return element.className;
  },
  setValue: function (element, className) {
    element.className = className;
  },
  parseValue: function (attrString) {
    var tokens = {};

    _.each(attrString.split(' '), function(token) {
      if (token)
        tokens[token] = token;
    });
    return tokens;
  }
});

var SVGClassHandler = ClassHandler.extend({
  getCurrentValue: function (element) {
    return element.className.baseVal;
  },
  setValue: function (element, className) {
    element.setAttribute('class', className);
  }
});

var StyleHandler = Blaze._DiffingAttributeHandler.extend({
  getCurrentValue: function (element) {
    return element.getAttribute('style');
  },
  setValue: function (element, style) {
    if (style === '') {
      element.removeAttribute('style');
    } else {
      element.setAttribute('style', style);
    }
  },

  // Parse a string to produce a map from property to attribute string.
  //
  // Example:
  // "color:red; foo:12px" produces a token {color: "color:red", foo:"foo:12px"}
  parseValue: function (attrString) {
    var tokens = {};

    // Regex for parsing a css attribute declaration, taken from css-parse:
    // https://github.com/reworkcss/css-parse/blob/7cef3658d0bba872cde05a85339034b187cb3397/index.js#L219
    var regex = /(\*?[-#\/\*\\\w]+(?:\[[0-9a-z_-]+\])?)\s*:\s*(?:\'(?:\\\'|.)*?\'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+[;\s]*/g;
    var match = regex.exec(attrString);
    while (match) {
      // match[0] = entire matching string
      // match[1] = css property
      // Prefix the token to prevent conflicts with existing properties.

      // XXX No `String.trim` on Safari 4. Swap out $.trim if we want to
      // remove strong dep on jquery.
      tokens[' ' + match[1]] = match[0].trim ?
        match[0].trim() : $.trim(match[0]);

      match = regex.exec(attrString);
    }

    return tokens;
  }
});

var BooleanHandler = AttributeHandler.extend({
  update: function (element, oldValue, value) {
    var name = this.name;
    if (value == null) {
      if (oldValue != null)
        element[name] = false;
    } else {
      element[name] = true;
    }
  }
});

var DOMPropertyHandler = AttributeHandler.extend({
  update: function (element, oldValue, value) {
    var name = this.name;
    if (value !== element[name])
      element[name] = value;
  }
});

// attributes of the type 'xlink:something' should be set using
// the correct namespace in order to work
var XlinkHandler = AttributeHandler.extend({
  update: function(element, oldValue, value) {
    var NS = 'http://www.w3.org/1999/xlink';
    if (value === null) {
      if (oldValue !== null)
        element.removeAttributeNS(NS, this.name);
    } else {
      element.setAttributeNS(NS, this.name, this.value);
    }
  }
});

// cross-browser version of `instanceof SVGElement`
var isSVGElement = function (elem) {
  return 'ownerSVGElement' in elem;
};

var isUrlAttribute = function (tagName, attrName) {
  // Compiled from http://www.w3.org/TR/REC-html40/index/attributes.html
  // and
  // http://www.w3.org/html/wg/drafts/html/master/index.html#attributes-1
  var urlAttrs = {
    FORM: ['action'],
    BODY: ['background'],
    BLOCKQUOTE: ['cite'],
    Q: ['cite'],
    DEL: ['cite'],
    INS: ['cite'],
    OBJECT: ['classid', 'codebase', 'data', 'usemap'],
    APPLET: ['codebase'],
    A: ['href'],
    AREA: ['href'],
    LINK: ['href'],
    BASE: ['href'],
    IMG: ['longdesc', 'src', 'usemap'],
    FRAME: ['longdesc', 'src'],
    IFRAME: ['longdesc', 'src'],
    HEAD: ['profile'],
    SCRIPT: ['src'],
    INPUT: ['src', 'usemap', 'formaction'],
    BUTTON: ['formaction'],
    BASE: ['href'],
    MENUITEM: ['icon'],
    HTML: ['manifest'],
    VIDEO: ['poster']
  };

  if (attrName === 'itemid') {
    return true;
  }

  var urlAttrNames = urlAttrs[tagName] || [];
  return _.contains(urlAttrNames, attrName);
};

// To get the protocol for a URL, we let the browser normalize it for
// us, by setting it as the href for an anchor tag and then reading out
// the 'protocol' property.
if (Meteor.isClient) {
  var anchorForNormalization = document.createElement('A');
}

var getUrlProtocol = function (url) {
  if (Meteor.isClient) {
    anchorForNormalization.href = url;
    return (anchorForNormalization.protocol || "").toLowerCase();
  } else {
    throw new Error('getUrlProtocol not implemented on the server');
  }
};

// UrlHandler is an attribute handler for all HTML attributes that take
// URL values. It disallows javascript: URLs, unless
// Blaze._allowJavascriptUrls() has been called. To detect javascript:
// urls, we set the attribute on a dummy anchor element and then read
// out the 'protocol' property of the attribute.
var origUpdate = AttributeHandler.prototype.update;
var UrlHandler = AttributeHandler.extend({
  update: function (element, oldValue, value) {
    var self = this;
    var args = arguments;

    if (Blaze._javascriptUrlsAllowed()) {
      origUpdate.apply(self, args);
    } else {
      var isJavascriptProtocol = (getUrlProtocol(value) === "javascript:");
      if (isJavascriptProtocol) {
        Blaze._warn("URLs that use the 'javascript:' protocol are not " +
                    "allowed in URL attribute values. " +
                    "Call Blaze._allowJavascriptUrls() " +
                    "to enable them.");
        origUpdate.apply(self, [element, oldValue, null]);
      } else {
        origUpdate.apply(self, args);
      }
    }
  }
});

// XXX make it possible for users to register attribute handlers!
Blaze._makeAttributeHandler = function (elem, name, value) {
  // generally, use setAttribute but certain attributes need to be set
  // by directly setting a JavaScript property on the DOM element.
  if (name === 'class') {
    if (isSVGElement(elem)) {
      return new SVGClassHandler(name, value);
    } else {
      return new ClassHandler(name, value);
    }
  } else if (name === 'style') {
    return new StyleHandler(name, value);
  } else if ((elem.tagName === 'OPTION' && name === 'selected') ||
             (elem.tagName === 'INPUT' && name === 'checked')) {
    return new BooleanHandler(name, value);
  } else if ((elem.tagName === 'TEXTAREA' || elem.tagName === 'INPUT')
             && name === 'value') {
    // internally, TEXTAREAs tracks their value in the 'value'
    // attribute just like INPUTs.
    return new DOMPropertyHandler(name, value);
  } else if (name.substring(0,6) === 'xlink:') {
    return new XlinkHandler(name.substring(6), value);
  } else if (isUrlAttribute(elem.tagName, name)) {
    return new UrlHandler(name, value);
  } else {
    return new AttributeHandler(name, value);
  }

  // XXX will need one for 'style' on IE, though modern browsers
  // seem to handle setAttribute ok.
};


ElementAttributesUpdater = function (elem) {
  this.elem = elem;
  this.handlers = {};
};

// Update attributes on `elem` to the dictionary `attrs`, whose
// values are strings.
ElementAttributesUpdater.prototype.update = function(newAttrs) {
  var elem = this.elem;
  var handlers = this.handlers;

  for (var k in handlers) {
    if (! _.has(newAttrs, k)) {
      // remove attributes (and handlers) for attribute names
      // that don't exist as keys of `newAttrs` and so won't
      // be visited when traversing it.  (Attributes that
      // exist in the `newAttrs` object but are `null`
      // are handled later.)
      var handler = handlers[k];
      var oldValue = handler.value;
      handler.value = null;
      handler.update(elem, oldValue, null);
      delete handlers[k];
    }
  }

  for (var k in newAttrs) {
    var handler = null;
    var oldValue;
    var value = newAttrs[k];
    if (! _.has(handlers, k)) {
      if (value !== null) {
        // make new handler
        handler = Blaze._makeAttributeHandler(elem, k, value);
        handlers[k] = handler;
        oldValue = null;
      }
    } else {
      handler = handlers[k];
      oldValue = handler.value;
    }
    if (oldValue !== value) {
      handler.value = value;
      handler.update(elem, oldValue, value);
      if (value === null)
        delete handlers[k];
    }
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/compatibility/materializer.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* This file is needed to backport this pull request: https://github.com/meteor/meteor/pull/5893
   It is a copy of the materializer.js file and is needed because it references symbols from attrs.js.

   TODO: Remove this file eventually.
 */

// Turns HTMLjs into DOM nodes and DOMRanges.
//
// - `htmljs`: the value to materialize, which may be any of the htmljs
//   types (Tag, CharRef, Comment, Raw, array, string, boolean, number,
//   null, or undefined) or a View or Template (which will be used to
//   construct a View).
// - `intoArray`: the array of DOM nodes and DOMRanges to push the output
//   into (required)
// - `parentView`: the View we are materializing content for (optional)
// - `_existingWorkStack`: optional argument, only used for recursive
//   calls when there is some other _materializeDOM on the call stack.
//   If _materializeDOM called your function and passed in a workStack,
//   pass it back when you call _materializeDOM (such as from a workStack
//   task).
//
// Returns `intoArray`, which is especially useful if you pass in `[]`.
Blaze._materializeDOM = function (htmljs, intoArray, parentView,
                                  _existingWorkStack) {
  // In order to use fewer stack frames, materializeDOMInner can push
  // tasks onto `workStack`, and they will be popped off
  // and run, last first, after materializeDOMInner returns.  The
  // reason we use a stack instead of a queue is so that we recurse
  // depth-first, doing newer tasks first.
  var workStack = (_existingWorkStack || []);
  materializeDOMInner(htmljs, intoArray, parentView, workStack);

  if (! _existingWorkStack) {
    // We created the work stack, so we are responsible for finishing
    // the work.  Call each "task" function, starting with the top
    // of the stack.
    while (workStack.length) {
      // Note that running task() may push new items onto workStack.
      var task = workStack.pop();
      task();
    }
  }

  return intoArray;
};

var materializeDOMInner = function (htmljs, intoArray, parentView, workStack) {
  if (htmljs == null) {
    // null or undefined
    return;
  }

  switch (typeof htmljs) {
  case 'string': case 'boolean': case 'number':
    intoArray.push(document.createTextNode(String(htmljs)));
    return;
  case 'object':
    if (htmljs.htmljsType) {
      switch (htmljs.htmljsType) {
      case HTML.Tag.htmljsType:
        intoArray.push(materializeTag(htmljs, parentView, workStack));
        return;
      case HTML.CharRef.htmljsType:
        intoArray.push(document.createTextNode(htmljs.str));
        return;
      case HTML.Comment.htmljsType:
        intoArray.push(document.createComment(htmljs.sanitizedValue));
        return;
      case HTML.Raw.htmljsType:
        // Get an array of DOM nodes by using the browser's HTML parser
        // (like innerHTML).
        var nodes = Blaze._DOMBackend.parseHTML(htmljs.value);
        for (var i = 0; i < nodes.length; i++)
          intoArray.push(nodes[i]);
        return;
      }
    } else if (HTML.isArray(htmljs)) {
      for (var i = htmljs.length-1; i >= 0; i--) {
        workStack.push(_.bind(Blaze._materializeDOM, null,
                              htmljs[i], intoArray, parentView, workStack));
      }
      return;
    } else {
      if (htmljs instanceof Blaze.Template) {
        htmljs = htmljs.constructView();
        // fall through to Blaze.View case below
      }
      if (htmljs instanceof Blaze.View) {
        Blaze._materializeView(htmljs, parentView, workStack, intoArray);
        return;
      }
    }
  }

  throw new Error("Unexpected object in htmljs: " + htmljs);
};

var materializeTag = function (tag, parentView, workStack) {
  var tagName = tag.tagName;
  var elem;
  if ((HTML.isKnownSVGElement(tagName) || isSVGAnchor(tag))
      && document.createElementNS) {
    // inline SVG
    elem = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  } else {
    // normal elements
    elem = document.createElement(tagName);
  }

  var rawAttrs = tag.attrs;
  var children = tag.children;
  if (tagName === 'textarea' && tag.children.length &&
      ! (rawAttrs && ('value' in rawAttrs))) {
    // Provide very limited support for TEXTAREA tags with children
    // rather than a "value" attribute.
    // Reactivity in the form of Views nested in the tag's children
    // won't work.  Compilers should compile textarea contents into
    // the "value" attribute of the tag, wrapped in a function if there
    // is reactivity.
    if (typeof rawAttrs === 'function' ||
        HTML.isArray(rawAttrs)) {
      throw new Error("Can't have reactive children of TEXTAREA node; " +
                      "use the 'value' attribute instead.");
    }
    rawAttrs = _.extend({}, rawAttrs || null);
    rawAttrs.value = Blaze._expand(children, parentView);
    children = [];
  }

  if (rawAttrs) {
    var attrUpdater = new ElementAttributesUpdater(elem);
    var updateAttributes = function () {
      var expandedAttrs = Blaze._expandAttributes(rawAttrs, parentView);
      var flattenedAttrs = HTML.flattenAttributes(expandedAttrs);
      var stringAttrs = {};
      for (var attrName in flattenedAttrs) {
        stringAttrs[attrName] = Blaze._toText(flattenedAttrs[attrName],
                                              parentView,
                                              HTML.TEXTMODE.STRING);
      }
      attrUpdater.update(stringAttrs);
    };
    var updaterComputation;
    if (parentView) {
      updaterComputation =
        parentView.autorun(updateAttributes, undefined, 'updater');
    } else {
      updaterComputation = Tracker.nonreactive(function () {
        return Tracker.autorun(function () {
          Tracker._withCurrentView(parentView, updateAttributes);
        });
      });
    }
    Blaze._DOMBackend.Teardown.onElementTeardown(elem, function attrTeardown() {
      updaterComputation.stop();
    });
  }

  if (children.length) {
    var childNodesAndRanges = [];
    // push this function first so that it's done last
    workStack.push(function () {
      for (var i = 0; i < childNodesAndRanges.length; i++) {
        var x = childNodesAndRanges[i];
        if (x instanceof Blaze._DOMRange)
          x.attach(elem);
        else
          elem.appendChild(x);
      }
    });
    // now push the task that calculates childNodesAndRanges
    workStack.push(_.bind(Blaze._materializeDOM, null,
                          children, childNodesAndRanges, parentView,
                          workStack));
  }

  return elem;
};


var isSVGAnchor = function (node) {
  // We generally aren't able to detect SVG <a> elements because
  // if "A" were in our list of known svg element names, then all
  // <a> nodes would be created using
  // `document.createElementNS`. But in the special case of <a
  // xlink:href="...">, we can at least detect that attribute and
  // create an SVG <a> tag in that case.
  //
  // However, we still have a general problem of knowing when to
  // use document.createElementNS and when to use
  // document.createElement; for example, font tags will always
  // be created as SVG elements which can cause other
  // problems. #1977
  return (node.tagName === "a" &&
          node.attrs &&
          node.attrs["xlink:href"] !== undefined);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/lib.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var ComponentsNamespaceReference, HTMLJSExpander, REQUIRE_RENDERED_INSTANCE, SUPPORTS_REACTIVE_INSTANCE, addEvents, argumentsConstructor, bindComponent, bindDataContext, callTemplateBaseHooks, contentAsFunc, contentAsView, currentViewIfRendering, expand, expandView, getTemplateBase, getTemplateInstance, getTemplateInstanceFunction, method, methodName, originalDot, originalFlattenAttributes, originalGetTemplate, originalInclude, originalVisitTag, ref, registerFirstCreatedHook, registerHooks, templateInstanceToComponent, withTemplateInstanceFunc, wrapHelper, wrapViewAndTemplate,                
  slice = [].slice,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

getTemplateInstance = function(view, skipBlockHelpers) {
  while (view && !view._templateInstance) {
    if (skipBlockHelpers) {
      view = view.parentView;
    } else {
      view = view.originalParentView || view.parentView;
    }
  }
  return view != null ? view._templateInstance : void 0;
};

templateInstanceToComponent = function(templateInstanceFunc, skipBlockHelpers) {
  var templateInstance;
  templateInstance = typeof templateInstanceFunc === "function" ? templateInstanceFunc() : void 0;
  templateInstance = getTemplateInstance(templateInstance != null ? templateInstance.view : void 0, skipBlockHelpers);
  while (templateInstance) {
    if ('component' in templateInstance) {
      return templateInstance.component;
    }
    if (skipBlockHelpers) {
      templateInstance = getTemplateInstance(templateInstance.view.parentView, skipBlockHelpers);
    } else {
      templateInstance = getTemplateInstance(templateInstance.view.originalParentView || templateInstance.view.parentView, skipBlockHelpers);
    }
  }
  return null;
};

getTemplateInstanceFunction = function(view, skipBlockHelpers) {
  var templateInstance;
  templateInstance = getTemplateInstance(view, skipBlockHelpers);
  return function() {
    return templateInstance;
  };
};

ComponentsNamespaceReference = (function() {
  function ComponentsNamespaceReference(namespace, templateInstance1) {
    this.namespace = namespace;
    this.templateInstance = templateInstance1;
  }

  return ComponentsNamespaceReference;

})();

originalDot = Spacebars.dot;

Spacebars.dot = function() {
  var args, value;
  value = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  if (value instanceof ComponentsNamespaceReference) {
    return Blaze._getTemplate(value.namespace + "." + (args.join('.')), value.templateInstance);
  }
  return originalDot.apply(null, [value].concat(slice.call(args)));
};

originalInclude = Spacebars.include;

Spacebars.include = function() {
  var args, templateOrFunction;
  templateOrFunction = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  if (templateOrFunction instanceof ComponentsNamespaceReference) {
    templateOrFunction = Blaze._getTemplate(templateOrFunction.namespace, templateOrFunction.templateInstance);
  }
  return originalInclude.apply(null, [templateOrFunction].concat(slice.call(args)));
};

Blaze._getTemplateHelper = function(template, name, templateInstance) {
  var component, helper, isKnownOldStyleHelper, mixinOrComponent, ref, ref1, ref2;
  isKnownOldStyleHelper = false;
  if (template.__helpers.has(name)) {
    helper = template.__helpers.get(name);
    if (helper === Blaze._OLDSTYLE_HELPER) {
      isKnownOldStyleHelper = true;
    } else if (helper != null) {
      return wrapHelper(bindDataContext(helper), templateInstance);
    } else {
      return null;
    }
  }
  if (name in template) {
    if (!isKnownOldStyleHelper) {
      template.__helpers.set(name, Blaze._OLDSTYLE_HELPER);
      if (!template._NOWARN_OLDSTYLE_HELPERS) {
        Blaze._warn("Assigning helper with `" + template.viewName + "." + name + " = ...` is deprecated.  Use `" + template.viewName + ".helpers(...)` instead.");
      }
    }
    if (template[name] != null) {
      return wrapHelper(bindDataContext(template[name]), templateInstance);
    } else {
      return null;
    }
  }
  if (!templateInstance) {
    return null;
  }
  if ((ref = template.viewName) === 'Template.__dynamicWithDataContext' || ref === 'Template.__dynamic') {
    return null;
  }
  component = Tracker.nonreactive(function() {
    return templateInstanceToComponent(templateInstance, true);
  });
  if (component) {
    if (mixinOrComponent = component.getFirstWith(null, name)) {
      return wrapHelper(bindComponent(mixinOrComponent, mixinOrComponent[name]), templateInstance);
    }
  }
  if (name && name in BlazeComponent.components) {
    return new ComponentsNamespaceReference(name, templateInstance);
  }
  if (component) {
    if ((helper = (ref1 = component._componentInternals) != null ? (ref2 = ref1.templateBase) != null ? ref2.__helpers.get(name) : void 0 : void 0) != null) {
      return wrapHelper(bindDataContext(helper), templateInstance);
    }
  }
  return null;
};

share.inExpandAttributes = false;

bindComponent = function(component, helper) {
  if (_.isFunction(helper)) {
    return function() {
      var args, name, result, value;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      result = helper.apply(component, args);
      if (share.inExpandAttributes && _.isObject(result)) {
        for (name in result) {
          value = result[name];
          if (share.EVENT_HANDLER_REGEX.test(name)) {
            if (_.isFunction(value)) {
              result[name] = _.bind(value, component);
            } else if (_.isArray(value)) {
              result[name] = _.map(value, function(fun) {
                if (_.isFunction(fun)) {
                  return _.bind(fun, component);
                } else {
                  return fun;
                }
              });
            }
          }
        }
      }
      return result;
    };
  } else {
    return helper;
  }
};

bindDataContext = function(helper) {
  if (_.isFunction(helper)) {
    return function() {
      var data;
      data = Blaze.getData();
      if (data == null) {
        data = {};
      }
      return helper.apply(data, arguments);
    };
  } else {
    return helper;
  }
};

wrapHelper = function(f, templateFunc) {
  if (!Blaze.Template._withTemplateInstanceFunc) {
    return Blaze._wrapCatchingExceptions(f, 'template helper');
  }
  if (!_.isFunction(f)) {
    return f;
  }
  return function() {
    var args, self;
    self = this;
    args = arguments;
    return Blaze.Template._withTemplateInstanceFunc(templateFunc, function() {
      return Blaze._wrapCatchingExceptions(f, 'template helper').apply(self, args);
    });
  };
};

if (Blaze.Template._withTemplateInstanceFunc) {
  withTemplateInstanceFunc = Blaze.Template._withTemplateInstanceFunc;
} else {
  withTemplateInstanceFunc = function(templateInstance, f) {
    return f();
  };
}

getTemplateBase = function(component) {
  return Tracker.nonreactive(function() {
    var componentTemplate, templateBase;
    componentTemplate = component.template();
    if (_.isString(componentTemplate)) {
      templateBase = Template[componentTemplate];
      if (!templateBase) {
        throw new Error("Template '" + componentTemplate + "' cannot be found.");
      }
    } else if (componentTemplate) {
      templateBase = componentTemplate;
    } else {
      throw new Error("Template for the component '" + (component.componentName() || 'unnamed') + "' not provided.");
    }
    return templateBase;
  });
};

callTemplateBaseHooks = function(component, hookName) {
  var callbacks, templateInstance;
  if (component._componentInternals == null) {
    component._componentInternals = {};
  }
  if (!component._componentInternals.templateInstance) {
    return;
  }
  templateInstance = Tracker.nonreactive(function() {
    return component._componentInternals.templateInstance();
  });
  callbacks = component._componentInternals.templateBase._getCallbacks(hookName);
  Template._withTemplateInstanceFunc(function() {
    return templateInstance;
  }, function() {
    var callback, i, len, results;
    results = [];
    for (i = 0, len = callbacks.length; i < len; i++) {
      callback = callbacks[i];
      results.push(callback.call(templateInstance));
    }
    return results;
  });
};

wrapViewAndTemplate = function(currentView, f) {
  var templateInstance;
  templateInstance = getTemplateInstanceFunction(currentView, true);
  return withTemplateInstanceFunc(templateInstance, function() {
    return Blaze._withCurrentView(currentView, function() {
      return f();
    });
  });
};

addEvents = function(view, component) {
  var eventMap, events, eventsList, fn, handler, i, len, spec;
  eventsList = component.events();
  if (!_.isArray(eventsList)) {
    throw new Error("'events' method from the component '" + (component.componentName() || 'unnamed') + "' did not return a list of event maps.");
  }
  for (i = 0, len = eventsList.length; i < len; i++) {
    events = eventsList[i];
    eventMap = {};
    fn = function(spec, handler) {
      return eventMap[spec] = function() {
        var args, currentView, event;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        event = args[0];
        currentView = Blaze.getView(event.currentTarget);
        wrapViewAndTemplate(currentView, function() {
          return handler.apply(component, args);
        });
      };
    };
    for (spec in events) {
      handler = events[spec];
      fn(spec, handler);
    }
    Blaze._addEventMap(view, eventMap, view);
  }
};

originalGetTemplate = Blaze._getTemplate;

Blaze._getTemplate = function(name, templateInstance) {
  var template;
  template = Tracker.nonreactive(function() {
    var parentComponent, ref;
    if (Blaze.currentView) {
      parentComponent = BlazeComponent.currentComponent();
    } else {
      parentComponent = templateInstanceToComponent(templateInstance, false);
    }
    return (ref = BlazeComponent.getComponent(name)) != null ? ref.renderComponent(parentComponent) : void 0;
  });
  if (template && (template instanceof Blaze.Template || _.isFunction(template))) {
    return template;
  }
  return originalGetTemplate(name);
};

registerHooks = function(template, hooks) {
  if (template.onCreated) {
    template.onCreated(hooks.onCreated);
    template.onRendered(hooks.onRendered);
    return template.onDestroyed(hooks.onDestroyed);
  } else {
    template.created = hooks.onCreated;
    template.rendered = hooks.onRendered;
    return template.destroyed = hooks.onDestroyed;
  }
};

registerFirstCreatedHook = function(template, onCreated) {
  var oldCreated;
  if (template._callbacks) {
    return template._callbacks.created.unshift(onCreated);
  } else {
    oldCreated = template.created;
    return template.created = function() {
      onCreated.call(this);
      return oldCreated != null ? oldCreated.call(this) : void 0;
    };
  }
};

Template.__dynamicWithDataContext.__helpers.set('chooseTemplate', function(name) {
  return Blaze._getTemplate(name, (function(_this) {
    return function() {
      return Template.instance();
    };
  })(this));
});

argumentsConstructor = function() {
  return assert(false);
};

Template.registerHelper('args', function() {
  var obj;
  obj = {};
  obj.constructor = argumentsConstructor;
  obj._arguments = arguments;
  return obj;
});

share.EVENT_HANDLER_REGEX = /^on[A-Z]/;

share.isEventHandler = function(fun) {
  return _.isFunction(fun) && fun.eventHandler;
};

originalFlattenAttributes = HTML.flattenAttributes;

HTML.flattenAttributes = function(attrs) {
  var name, value;
  if (attrs = originalFlattenAttributes(attrs)) {
    for (name in attrs) {
      value = attrs[name];
      if (!(share.EVENT_HANDLER_REGEX.test(name))) {
        continue;
      }
      if (share.isEventHandler(value)) {
        continue;
      }
      if (_.isArray(value) && _.some(value, share.isEventHandler)) {
        continue;
      }
      if (_.isArray(value)) {
        attrs[name] = _.map(value, Spacebars.event);
      } else {
        attrs[name] = Spacebars.event(value);
      }
    }
  }
  return attrs;
};

Spacebars.event = function() {
  var args, eventHandler, fun;
  eventHandler = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  if (!_.isFunction(eventHandler)) {
    throw new Error("Event handler not a function: " + eventHandler);
  }
  args = Spacebars.mustacheImpl.apply(Spacebars, [(function() {
    var xs;
    xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return xs;
  })].concat(slice.call(args)));
  fun = function() {
    var currentView, event, eventArgs;
    event = arguments[0], eventArgs = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    currentView = Blaze.getView(event.currentTarget);
    return wrapViewAndTemplate(currentView, function() {
      return eventHandler.apply(null, [event].concat(args, eventArgs));
    });
  };
  fun.eventHandler = true;
  return fun;
};

originalVisitTag = HTML.ToHTMLVisitor.prototype.visitTag;

HTML.ToHTMLVisitor.prototype.visitTag = function(tag) {
  var attrs, name;
  if (attrs = tag.attrs) {
    attrs = HTML.flattenAttributes(attrs);
    for (name in attrs) {
      if (share.EVENT_HANDLER_REGEX.test(name)) {
        delete attrs[name];
      }
    }
    tag.attrs = attrs;
  }
  return originalVisitTag.call(this, tag);
};

currentViewIfRendering = function() {
  var view;
  view = Blaze.currentView;
  if (view != null ? view._isInRender : void 0) {
    return view;
  } else {
    return null;
  }
};

contentAsFunc = function(content) {
  if (!_.isFunction(content)) {
    return function() {
      return content;
    };
  }
  return content;
};

contentAsView = function(content) {
  if (content instanceof Blaze.Template) {
    return content.constructView();
  } else if (content instanceof Blaze.View) {
    return content;
  } else {
    return Blaze.View('render', contentAsFunc(content));
  }
};

HTMLJSExpander = Blaze._HTMLJSExpander.extend();

HTMLJSExpander.def({
  visitObject: function(x) {
    if (x instanceof Blaze.Template) {
      x = x.constructView();
    }
    if (x instanceof Blaze.View) {
      return expandView(x, this.parentView);
    }
    return HTML.TransformingVisitor.prototype.visitObject.call(this, x);
  }
});

expand = function(htmljs, parentView) {
  parentView = parentView || currentViewIfRendering();
  return (new HTMLJSExpander({
    parentView: parentView
  })).visit(htmljs);
};

expandView = function(view, parentView) {
  var htmljs, result;
  Blaze._createView(view, parentView, true);
  view._isInRender = true;
  htmljs = Blaze._withCurrentView(view, function() {
    return view._render();
  });
  view._isInRender = false;
  Tracker.flush();
  result = expand(htmljs, view);
  Tracker.flush();
  if (Tracker.active) {
    Tracker.onInvalidate(function() {
      return Blaze._destroyView(view);
    });
  } else {
    Blaze._destroyView(view);
  }
  Tracker.flush();
  return result;
};

BlazeComponent = (function(superClass) {
  extend(BlazeComponent, superClass);

  function BlazeComponent() {
    return BlazeComponent.__super__.constructor.apply(this, arguments);
  }

  BlazeComponent.getComponentForElement = function(domElement) {
    var templateInstance;
    if (!domElement) {
      return null;
    }
    if (domElement.nodeType !== Node.ELEMENT_NODE) {
      throw new Error("Expected DOM element.");
    }
    templateInstance = getTemplateInstanceFunction(Blaze.getView(domElement), true);
    return templateInstanceToComponent(templateInstance, true);
  };

  BlazeComponent.prototype.mixins = function() {
    return [];
  };

  BlazeComponent.prototype.mixinParent = function(mixinParent) {
    if (this._componentInternals == null) {
      this._componentInternals = {};
    }
    if (mixinParent) {
      this._componentInternals.mixinParent = mixinParent;
      return this;
    }
    return this._componentInternals.mixinParent || null;
  };

  BlazeComponent.prototype.requireMixin = function(nameOrMixin) {
    var ref;
    assert((ref = this._componentInternals) != null ? ref.mixins : void 0);
    Tracker.nonreactive((function(_this) {
      return function() {
        var base, mixinInstance, mixinInstanceComponent, ref1, ref2, ref3;
        if (_this.getMixin(nameOrMixin)) {
          return;
        }
        if (_.isString(nameOrMixin)) {
          if (_this.constructor.getComponent) {
            mixinInstanceComponent = _this.constructor.getComponent(nameOrMixin);
          } else {
            mixinInstanceComponent = BlazeComponent.getComponent(nameOrMixin);
          }
          if (!mixinInstanceComponent) {
            throw new Error("Unknown mixin '" + nameOrMixin + "'.");
          }
          mixinInstance = new mixinInstanceComponent();
        } else if (_.isFunction(nameOrMixin)) {
          mixinInstance = new nameOrMixin();
        } else {
          mixinInstance = nameOrMixin;
        }
        _this._componentInternals.mixins.push(mixinInstance);
        if (mixinInstance.mixinParent) {
          mixinInstance.mixinParent(_this);
        }
        if (typeof mixinInstance.createMixins === "function") {
          mixinInstance.createMixins();
        }
        if ((base = _this._componentInternals).templateInstance == null) {
          base.templateInstance = new ReactiveField(null, function(a, b) {
            return a === b;
          });
        }
        if (!((ref1 = _this._componentInternals.templateInstance()) != null ? ref1.view.isDestroyed : void 0)) {
          if (!_this._componentInternals.inOnCreated && ((ref2 = _this._componentInternals.templateInstance()) != null ? ref2.view.isCreated : void 0)) {
            if (typeof mixinInstance.onCreated === "function") {
              mixinInstance.onCreated();
            }
          }
          if (!_this._componentInternals.inOnRendered && ((ref3 = _this._componentInternals.templateInstance()) != null ? ref3.view.isRendered : void 0)) {
            return typeof mixinInstance.onRendered === "function" ? mixinInstance.onRendered() : void 0;
          }
        }
      };
    })(this));
    return this;
  };

  BlazeComponent.prototype.createMixins = function() {
    var i, len, mixin, ref;
    if (this._componentInternals == null) {
      this._componentInternals = {};
    }
    if (this._componentInternals.mixins) {
      return;
    }
    this._componentInternals.mixins = [];
    ref = this.mixins();
    for (i = 0, len = ref.length; i < len; i++) {
      mixin = ref[i];
      this.requireMixin(mixin);
    }
    return this;
  };

  BlazeComponent.prototype.getMixin = function(nameOrMixin) {
    var i, j, len, len1, mixin, mixinComponentName, ref, ref1, ref2;
    assert((ref = this._componentInternals) != null ? ref.mixins : void 0);
    if (_.isString(nameOrMixin)) {
      ref1 = this._componentInternals.mixins;
      for (i = 0, len = ref1.length; i < len; i++) {
        mixin = ref1[i];
        mixinComponentName = (typeof mixin.componentName === "function" ? mixin.componentName() : void 0) || null;
        if (mixinComponentName && mixinComponentName === nameOrMixin) {
          return mixin;
        }
      }
    } else {
      ref2 = this._componentInternals.mixins;
      for (j = 0, len1 = ref2.length; j < len1; j++) {
        mixin = ref2[j];
        if (mixin.constructor === nameOrMixin) {
          return mixin;
        } else if (mixin === nameOrMixin) {
          return mixin;
        }
      }
    }
    return null;
  };

  BlazeComponent.prototype.callFirstWith = function() {
    var afterComponentOrMixin, args, mixin, propertyName;
    afterComponentOrMixin = arguments[0], propertyName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    mixin = this.getFirstWith(afterComponentOrMixin, propertyName);
    if (!mixin) {
      return;
    }
    if (_.isFunction(mixin[propertyName])) {
      return mixin[propertyName].apply(mixin, args);
    } else {
      return mixin[propertyName];
    }
  };

  BlazeComponent.prototype.getFirstWith = function(afterComponentOrMixin, propertyName) {
    var found, i, len, mixin, ref, ref1;
    assert((ref = this._componentInternals) != null ? ref.mixins : void 0);
    if (!afterComponentOrMixin) {
      if (propertyName in this) {
        return this;
      }
      found = true;
    } else if (afterComponentOrMixin && afterComponentOrMixin === this) {
      found = true;
    } else {
      found = false;
    }
    ref1 = this._componentInternals.mixins;
    for (i = 0, len = ref1.length; i < len; i++) {
      mixin = ref1[i];
      if (found && propertyName in mixin) {
        return mixin;
      }
      if (mixin === afterComponentOrMixin) {
        found = true;
      }
    }
    return null;
  };

  BlazeComponent.renderComponent = function(parentComponent) {
    return Tracker.nonreactive((function(_this) {
      return function() {
        var componentClass, data;
        componentClass = _this;
        if (Blaze.currentView) {
          data = Template.currentData();
        } else {
          data = null;
        }
        if ((data != null ? data.constructor : void 0) !== argumentsConstructor) {
          return wrapViewAndTemplate(Blaze.currentView, function() {
            var component;
            component = new componentClass();
            return component.renderComponent(parentComponent);
          });
        }
        return function() {
          var currentWith, nonreactiveArguments, reactiveArguments;
          assert(Tracker.active);
          currentWith = Blaze.getView('with');
          reactiveArguments = new ComputedField(function() {
            data = currentWith.dataVar.get();
            assert.equal(data != null ? data.constructor : void 0, argumentsConstructor);
            return data._arguments;
          }, EJSON.equals);
          nonreactiveArguments = reactiveArguments();
          return Tracker.nonreactive(function() {
            var template;
            template = Blaze._withCurrentView(Blaze.currentView.parentView.parentView, (function(_this) {
              return function() {
                return wrapViewAndTemplate(Blaze.currentView, function() {
                  var component;
                  component = (function(func, args, ctor) {
                    ctor.prototype = func.prototype;
                    var child = new ctor, result = func.apply(child, args);
                    return Object(result) === result ? result : child;
                  })(componentClass, nonreactiveArguments, function(){});
                  return component.renderComponent(parentComponent);
                });
              };
            })(this));
            registerFirstCreatedHook(template, function() {
              this.view.originalParentView = this.view.parentView;
              return this.view.parentView = this.view.parentView.parentView.parentView;
            });
            return template;
          });
        };
      };
    })(this));
  };

  BlazeComponent.prototype.renderComponent = function(parentComponent) {
    return Tracker.nonreactive((function(_this) {
      return function() {
        var component, template, templateBase;
        component = _this;
        component.createMixins();
        templateBase = getTemplateBase(component);
        template = new Blaze.Template("BlazeComponent." + (component.componentName() || 'unnamed'), templateBase.renderFunction);
        if (component._componentInternals == null) {
          component._componentInternals = {};
        }
        component._componentInternals.templateBase = templateBase;
        registerHooks(template, {
          onCreated: function() {
            var base, base1, base2, base3, componentOrMixin, results;
            if (parentComponent) {
              Tracker.nonreactive((function(_this) {
                return function() {
                  assert(!component.parentComponent());
                  component.parentComponent(parentComponent);
                  return parentComponent.addChildComponent(component);
                };
              })(this));
            }
            this.view._onViewRendered((function(_this) {
              return function() {
                var componentOrMixin, results;
                if (_this.view.renderCount !== 1) {
                  return;
                }
                componentOrMixin = null;
                results = [];
                while (componentOrMixin = _this.component.getFirstWith(componentOrMixin, 'events')) {
                  results.push(addEvents(_this.view, componentOrMixin));
                }
                return results;
              };
            })(this));
            this.component = component;
            assert(!Tracker.nonreactive((function(_this) {
              return function() {
                var base;
                return typeof (base = _this.component._componentInternals).templateInstance === "function" ? base.templateInstance() : void 0;
              };
            })(this)));
            if ((base = this.component._componentInternals).templateInstance == null) {
              base.templateInstance = new ReactiveField(this, function(a, b) {
                return a === b;
              });
            }
            this.component._componentInternals.templateInstance(this);
            if ((base1 = this.component._componentInternals).isCreated == null) {
              base1.isCreated = new ReactiveField(true);
            }
            this.component._componentInternals.isCreated(true);
            if ((base2 = this.component._componentInternals).isRendered == null) {
              base2.isRendered = new ReactiveField(false);
            }
            this.component._componentInternals.isRendered(false);
            if ((base3 = this.component._componentInternals).isDestroyed == null) {
              base3.isDestroyed = new ReactiveField(false);
            }
            this.component._componentInternals.isDestroyed(false);
            try {
              this.component._componentInternals.inOnCreated = true;
              componentOrMixin = null;
              results = [];
              while (componentOrMixin = this.component.getFirstWith(componentOrMixin, 'onCreated')) {
                results.push(componentOrMixin.onCreated());
              }
              return results;
            } finally {
              delete this.component._componentInternals.inOnCreated;
            }
          },
          onRendered: function() {
            var base, componentOrMixin, results;
            if ((base = this.component._componentInternals).isRendered == null) {
              base.isRendered = new ReactiveField(true);
            }
            this.component._componentInternals.isRendered(true);
            Tracker.nonreactive((function(_this) {
              return function() {
                return assert.equal(_this.component._componentInternals.isCreated(), true);
              };
            })(this));
            try {
              this.component._componentInternals.inOnRendered = true;
              componentOrMixin = null;
              results = [];
              while (componentOrMixin = this.component.getFirstWith(componentOrMixin, 'onRendered')) {
                results.push(componentOrMixin.onRendered());
              }
              return results;
            } finally {
              delete this.component._componentInternals.inOnRendered;
            }
          },
          onDestroyed: function() {
            return this.autorun((function(_this) {
              return function(computation) {
                if (_this.component.childComponents().length) {
                  return;
                }
                computation.stop();
                return Tracker.nonreactive(function() {
                  var base, base1, componentOrMixin;
                  assert.equal(_this.component._componentInternals.isCreated(), true);
                  _this.component._componentInternals.isCreated(false);
                  if ((base = _this.component._componentInternals).isRendered == null) {
                    base.isRendered = new ReactiveField(false);
                  }
                  _this.component._componentInternals.isRendered(false);
                  if ((base1 = _this.component._componentInternals).isDestroyed == null) {
                    base1.isDestroyed = new ReactiveField(true);
                  }
                  _this.component._componentInternals.isDestroyed(true);
                  componentOrMixin = null;
                  while (componentOrMixin = _this.component.getFirstWith(componentOrMixin, 'onDestroyed')) {
                    componentOrMixin.onDestroyed();
                  }
                  if (parentComponent) {
                    component.parentComponent(null);
                    parentComponent.removeChildComponent(component);
                  }
                  return _this.component._componentInternals.templateInstance(null);
                });
              };
            })(this));
          }
        });
        return template;
      };
    })(this));
  };

  BlazeComponent.prototype.removeComponent = function() {
    if (this.isRendered()) {
      return Blaze.remove(this._componentInternals.templateInstance().view);
    }
  };

  BlazeComponent.renderComponentToHTML = function(parentComponent, parentView, data) {
    var component;
    component = Tracker.nonreactive((function(_this) {
      return function() {
        var componentClass;
        componentClass = _this;
        parentView = parentView || currentViewIfRendering() || ((parentComponent != null ? parentComponent.isRendered() : void 0) && parentComponent._componentInternals.templateInstance().view) || null;
        return wrapViewAndTemplate(parentView, function() {
          return new componentClass();
        });
      };
    })(this));
    if (arguments.length > 2) {
      return component.renderComponentToHTML(parentComponent, parentView, data);
    } else {
      return component.renderComponentToHTML(parentComponent, parentView);
    }
  };

  BlazeComponent.prototype.renderComponentToHTML = function(parentComponent, parentView, data) {
    var expandedView, template;
    template = Tracker.nonreactive((function(_this) {
      return function() {
        parentView = parentView || currentViewIfRendering() || ((parentComponent != null ? parentComponent.isRendered() : void 0) && parentComponent._componentInternals.templateInstance().view) || null;
        return wrapViewAndTemplate(parentView, function() {
          return _this.renderComponent(parentComponent);
        });
      };
    })(this));
    if (arguments.length > 2) {
      expandedView = expandView(Blaze._TemplateWith(data, contentAsFunc(template)), parentView);
    } else {
      expandedView = expandView(contentAsView(template), parentView);
    }
    return HTML.toHTML(expandedView);
  };

  BlazeComponent.prototype.template = function() {
    return this.callFirstWith(this, 'template') || this.constructor.componentName();
  };

  BlazeComponent.prototype.onCreated = function() {
    return callTemplateBaseHooks(this, 'created');
  };

  BlazeComponent.prototype.onRendered = function() {
    return callTemplateBaseHooks(this, 'rendered');
  };

  BlazeComponent.prototype.onDestroyed = function() {
    return callTemplateBaseHooks(this, 'destroyed');
  };

  BlazeComponent.prototype.isCreated = function() {
    var base;
    if (this._componentInternals == null) {
      this._componentInternals = {};
    }
    if ((base = this._componentInternals).isCreated == null) {
      base.isCreated = new ReactiveField(false);
    }
    return this._componentInternals.isCreated();
  };

  BlazeComponent.prototype.isRendered = function() {
    var base;
    if (this._componentInternals == null) {
      this._componentInternals = {};
    }
    if ((base = this._componentInternals).isRendered == null) {
      base.isRendered = new ReactiveField(false);
    }
    return this._componentInternals.isRendered();
  };

  BlazeComponent.prototype.isDestroyed = function() {
    var base;
    if (this._componentInternals == null) {
      this._componentInternals = {};
    }
    if ((base = this._componentInternals).isDestroyed == null) {
      base.isDestroyed = new ReactiveField(false);
    }
    return this._componentInternals.isDestroyed();
  };

  BlazeComponent.prototype.insertDOMElement = function(parent, node, before) {
    if (before == null) {
      before = null;
    }
    if (parent && node && (node.parentNode !== parent || node.nextSibling !== before)) {
      parent.insertBefore(node, before);
    }
  };

  BlazeComponent.prototype.moveDOMElement = function(parent, node, before) {
    if (before == null) {
      before = null;
    }
    if (parent && node && (node.parentNode !== parent || node.nextSibling !== before)) {
      parent.insertBefore(node, before);
    }
  };

  BlazeComponent.prototype.removeDOMElement = function(parent, node) {
    if (parent && node && node.parentNode === parent) {
      parent.removeChild(node);
    }
  };

  BlazeComponent.prototype.events = function() {
    var eventMap, events, fn, handler, i, len, ref, results, spec, templateInstance, view;
    if (this._componentInternals == null) {
      this._componentInternals = {};
    }
    if (!this._componentInternals.templateInstance) {
      return [];
    }
    view = Tracker.nonreactive((function(_this) {
      return function() {
        return _this._componentInternals.templateInstance().view;
      };
    })(this));
    templateInstance = getTemplateInstanceFunction(view, true);
    ref = this._componentInternals.templateBase.__eventMaps;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      events = ref[i];
      eventMap = {};
      fn = function(spec, handler) {
        return eventMap[spec] = function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return withTemplateInstanceFunc(templateInstance, function() {
            return Blaze._withCurrentView(view, function() {
              return handler.apply(view, args);
            });
          });
        };
      };
      for (spec in events) {
        handler = events[spec];
        fn(spec, handler);
      }
      results.push(eventMap);
    }
    return results;
  };

  BlazeComponent.prototype.data = function(path, equalsFunc) {
    var base, ref, view;
    if (this._componentInternals == null) {
      this._componentInternals = {};
    }
    if ((base = this._componentInternals).templateInstance == null) {
      base.templateInstance = new ReactiveField(null, function(a, b) {
        return a === b;
      });
    }
    if (view = (ref = this._componentInternals.templateInstance()) != null ? ref.view : void 0) {
      if (path != null) {
        return DataLookup.get((function(_this) {
          return function() {
            return Blaze.getData(view);
          };
        })(this), path, equalsFunc);
      } else {
        return Blaze.getData(view);
      }
    }
    return void 0;
  };

  BlazeComponent.currentData = function(path, equalsFunc) {
    var currentView;
    if (!Blaze.currentView) {
      return void 0;
    }
    currentView = Blaze.currentView;
    if (_.isString(path)) {
      path = path.split('.');
    } else if (!_.isArray(path)) {
      return Blaze.getData(currentView);
    }
    return DataLookup.get((function(_this) {
      return function() {
        var lexicalData, result;
        if (Blaze._lexicalBindingLookup && (lexicalData = Blaze._lexicalBindingLookup(currentView, path[0]))) {
          result = {};
          result[path[0]] = lexicalData;
          return result;
        }
        return Blaze.getData(currentView);
      };
    })(this), path, equalsFunc);
  };

  BlazeComponent.prototype.currentData = function(path, equalsFunc) {
    return this.constructor.currentData(path, equalsFunc);
  };

  BlazeComponent.prototype.component = function() {
    return this;
  };

  BlazeComponent.currentComponent = function() {
    var templateInstance;
    templateInstance = getTemplateInstanceFunction(Blaze.currentView, false);
    return templateInstanceToComponent(templateInstance, false);
  };

  BlazeComponent.prototype.currentComponent = function() {
    return this.constructor.currentComponent();
  };

  BlazeComponent.prototype.firstNode = function() {
    if (this.isRendered()) {
      return this._componentInternals.templateInstance().view._domrange.firstNode();
    }
    return void 0;
  };

  BlazeComponent.prototype.lastNode = function() {
    if (this.isRendered()) {
      return this._componentInternals.templateInstance().view._domrange.lastNode();
    }
    return void 0;
  };

  BlazeComponent.prototype.autorun = function(runFunc) {
    var templateInstance;
    templateInstance = Tracker.nonreactive((function(_this) {
      return function() {
        var ref;
        return (ref = _this._componentInternals) != null ? typeof ref.templateInstance === "function" ? ref.templateInstance() : void 0 : void 0;
      };
    })(this));
    if (!templateInstance) {
      throw new Error("The component has to be created before calling 'autorun'.");
    }
    return templateInstance.autorun(_.bind(runFunc, this));
  };

  return BlazeComponent;

})(BaseComponent);

SUPPORTS_REACTIVE_INSTANCE = ['subscriptionsReady'];

REQUIRE_RENDERED_INSTANCE = ['$', 'find', 'findAll'];

ref = Blaze.TemplateInstance.prototype;
for (methodName in ref) {
  method = ref[methodName];
  if (!(methodName in BlazeComponent.prototype)) {
    (function(methodName, method) {
      if (indexOf.call(SUPPORTS_REACTIVE_INSTANCE, methodName) >= 0) {
        return BlazeComponent.prototype[methodName] = function() {
          var args, base, templateInstance;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this._componentInternals == null) {
            this._componentInternals = {};
          }
          if ((base = this._componentInternals).templateInstance == null) {
            base.templateInstance = new ReactiveField(null, function(a, b) {
              return a === b;
            });
          }
          if (templateInstance = this._componentInternals.templateInstance()) {
            return templateInstance[methodName].apply(templateInstance, args);
          }
          return void 0;
        };
      } else if (indexOf.call(REQUIRE_RENDERED_INSTANCE, methodName) >= 0) {
        return BlazeComponent.prototype[methodName] = function() {
          var args, ref1;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.isRendered()) {
            return (ref1 = this._componentInternals.templateInstance())[methodName].apply(ref1, args);
          }
          return void 0;
        };
      } else {
        return BlazeComponent.prototype[methodName] = function() {
          var args, templateInstance;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          templateInstance = Tracker.nonreactive((function(_this) {
            return function() {
              var ref1;
              return (ref1 = _this._componentInternals) != null ? typeof ref1.templateInstance === "function" ? ref1.templateInstance() : void 0 : void 0;
            };
          })(this));
          if (!templateInstance) {
            throw new Error("The component has to be created before calling '" + methodName + "'.");
          }
          return templateInstance[methodName].apply(templateInstance, args);
        };
      }
    })(methodName, method);
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/debug.coffee.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var                     
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

BlazeComponentDebug = (function(superClass) {
  extend(BlazeComponentDebug, superClass);

  function BlazeComponentDebug() {
    return BlazeComponentDebug.__super__.constructor.apply(this, arguments);
  }

  BlazeComponentDebug.startComponent = function(component) {
    BlazeComponentDebug.__super__.constructor.startComponent.apply(this, arguments);
    return console.log(component.data());
  };

  BlazeComponentDebug.startMarkedComponent = function(component) {
    BlazeComponentDebug.__super__.constructor.startMarkedComponent.apply(this, arguments);
    return console.log(component.data());
  };

  BlazeComponentDebug.dumpComponentSubtree = function(rootComponentOrElement) {
    if ('nodeType' in rootComponentOrElement && rootComponentOrElement.nodeType === Node.ELEMENT_NODE) {
      rootComponentOrElement = BlazeComponent.getComponentForElement(rootComponentOrElement);
    }
    return BlazeComponentDebug.__super__.constructor.dumpComponentSubtree.apply(this, arguments);
  };

  BlazeComponentDebug.dumpComponentTree = function(rootComponentOrElement) {
    if ('nodeType' in rootComponentOrElement && rootComponentOrElement.nodeType === Node.ELEMENT_NODE) {
      rootComponentOrElement = BlazeComponent.getComponentForElement(rootComponentOrElement);
    }
    return BlazeComponentDebug.__super__.constructor.dumpComponentTree.apply(this, arguments);
  };

  BlazeComponentDebug.dumpAllComponents = function() {
    var allRootComponents, j, len, rootComponent;
    allRootComponents = [];
    $('*').each((function(_this) {
      return function(i, element) {
        var component, rootComponent;
        component = BlazeComponent.getComponentForElement(element);
        if (!component) {
          return;
        }
        rootComponent = _this.componentRoot(component);
        if (indexOf.call(allRootComponents, rootComponent) < 0) {
          return allRootComponents.push(rootComponent);
        }
      };
    })(this));
    for (j = 0, len = allRootComponents.length; j < len; j++) {
      rootComponent = allRootComponents[j];
      this.dumpComponentSubtree(rootComponent);
    }
  };

  return BlazeComponentDebug;

})(BaseComponentDebug);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/server.coffee.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template.body.renderToDocument = function() {};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("peerlibrary:blaze-components", {
  Template: Template,
  BlazeComponent: BlazeComponent,
  BlazeComponentDebug: BlazeComponentDebug
});

})();

//# sourceURL=meteor://💻app/packages/peerlibrary_blaze-components.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcGVlcmxpYnJhcnlfYmxhemUtY29tcG9uZW50cy90ZW1wbGF0ZS5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3BlZXJsaWJyYXJ5X2JsYXplLWNvbXBvbmVudHMvbGliLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcGVlcmxpYnJhcnlfYmxhemUtY29tcG9uZW50cy9kZWJ1Zy5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3BlZXJsaWJyYXJ5X2JsYXplLWNvbXBvbmVudHMvc2VydmVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUFBLFdBQVcsS0FBSyxDQUFDLFFBQWpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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OzZCQUFBOztHQURnQyxtQkFBbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQ0EsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZCxHQUFpQyxhQUFqQyIsImZpbGUiOiIvcGFja2FnZXMvcGVlcmxpYnJhcnlfYmxhemUtY29tcG9uZW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlRlbXBsYXRlID0gQmxhemUuVGVtcGxhdGVcbiIsImdldFRlbXBsYXRlSW5zdGFuY2UgPSAodmlldywgc2tpcEJsb2NrSGVscGVycykgLT5cbiAgd2hpbGUgdmlldyBhbmQgbm90IHZpZXcuX3RlbXBsYXRlSW5zdGFuY2VcbiAgICBpZiBza2lwQmxvY2tIZWxwZXJzXG4gICAgICB2aWV3ID0gdmlldy5wYXJlbnRWaWV3XG4gICAgZWxzZVxuICAgICAgdmlldyA9IHZpZXcub3JpZ2luYWxQYXJlbnRWaWV3IG9yIHZpZXcucGFyZW50Vmlld1xuXG4gIHZpZXc/Ll90ZW1wbGF0ZUluc3RhbmNlXG5cbiMgTW9yZSBvciBsZXNzIHRoZSBzYW1lIGFzIGFsZGVlZDp0ZW1wbGF0ZS1leHRlbnNpb24ncyB0ZW1wbGF0ZS5nZXQoJ2NvbXBvbmVudCcpIGp1c3Qgc3BlY2lhbGl6ZWQuXG4jIEl0IGFsbG93cyB1cyB0byBub3QgaGF2ZSBhIGRlcGVuZGVuY3kgb24gdGVtcGxhdGUtZXh0ZW5zaW9uIHBhY2thZ2UgYW5kIHRoYXQgd2UgY2FuIHdvcmsgd2l0aCBJcm9uXG4jIFJvdXRlciB3aGljaCBoYXMgaXRzIG93biBEeW5hbWljVGVtcGxhdGUgY2xhc3Mgd2hpY2ggaXMgbm90IHBhdGNoZWQgYnkgdGVtcGxhdGUtZXh0ZW5zaW9uIGFuZCB0aHVzXG4jIGRvZXMgbm90IGhhdmUgLmdldCgpIG1ldGhvZC5cbnRlbXBsYXRlSW5zdGFuY2VUb0NvbXBvbmVudCA9ICh0ZW1wbGF0ZUluc3RhbmNlRnVuYywgc2tpcEJsb2NrSGVscGVycykgLT5cbiAgdGVtcGxhdGVJbnN0YW5jZSA9IHRlbXBsYXRlSW5zdGFuY2VGdW5jPygpXG5cbiAgIyBJcm9uIFJvdXRlciB1c2VzIGl0cyBvd24gRHluYW1pY1RlbXBsYXRlIHdoaWNoIGlzIG5vdCBhIHByb3BlciB0ZW1wbGF0ZSBpbnN0YW5jZSwgYnV0IGl0IGlzXG4gICMgcGFzc2VkIGluIGFzIHN1Y2gsIHNvIHdlIHdhbnQgdG8gZmluZCB0aGUgcmVhbCBvbmUgYmVmb3JlIHdlIHN0YXJ0IHNlYXJjaGluZyBmb3IgdGhlIGNvbXBvbmVudC5cbiAgdGVtcGxhdGVJbnN0YW5jZSA9IGdldFRlbXBsYXRlSW5zdGFuY2UgdGVtcGxhdGVJbnN0YW5jZT8udmlldywgc2tpcEJsb2NrSGVscGVyc1xuXG4gIHdoaWxlIHRlbXBsYXRlSW5zdGFuY2VcbiAgICByZXR1cm4gdGVtcGxhdGVJbnN0YW5jZS5jb21wb25lbnQgaWYgJ2NvbXBvbmVudCcgb2YgdGVtcGxhdGVJbnN0YW5jZVxuXG4gICAgaWYgc2tpcEJsb2NrSGVscGVyc1xuICAgICAgdGVtcGxhdGVJbnN0YW5jZSA9IGdldFRlbXBsYXRlSW5zdGFuY2UgdGVtcGxhdGVJbnN0YW5jZS52aWV3LnBhcmVudFZpZXcsIHNraXBCbG9ja0hlbHBlcnNcbiAgICBlbHNlXG4gICAgICB0ZW1wbGF0ZUluc3RhbmNlID0gZ2V0VGVtcGxhdGVJbnN0YW5jZSAodGVtcGxhdGVJbnN0YW5jZS52aWV3Lm9yaWdpbmFsUGFyZW50VmlldyBvciB0ZW1wbGF0ZUluc3RhbmNlLnZpZXcucGFyZW50VmlldyksIHNraXBCbG9ja0hlbHBlcnNcblxuICBudWxsXG5cbmdldFRlbXBsYXRlSW5zdGFuY2VGdW5jdGlvbiA9ICh2aWV3LCBza2lwQmxvY2tIZWxwZXJzKSAtPlxuICB0ZW1wbGF0ZUluc3RhbmNlID0gZ2V0VGVtcGxhdGVJbnN0YW5jZSB2aWV3LCBza2lwQmxvY2tIZWxwZXJzXG4gIC0+XG4gICAgdGVtcGxhdGVJbnN0YW5jZVxuXG5jbGFzcyBDb21wb25lbnRzTmFtZXNwYWNlUmVmZXJlbmNlXG4gIGNvbnN0cnVjdG9yOiAoQG5hbWVzcGFjZSwgQHRlbXBsYXRlSW5zdGFuY2UpIC0+XG5cbiMgV2UgZXh0ZW5kIHRoZSBvcmlnaW5hbCBkb3Qgb3BlcmF0b3IgdG8gc3VwcG9ydCB7ez4gRm9vLkJhcn19LiBUaGlzIGdvZXMgdGhyb3VnaCBhIGdldFRlbXBsYXRlSGVscGVyIHBhdGgsIGJ1dFxuIyB3ZSB3YW50IHRvIHJlZGlyZWN0IGl0IHRvIHRoZSBnZXRUZW1wbGF0ZSBwYXRoLiBTbyB3ZSBtYXJrIGl0IGluIGdldFRlbXBsYXRlSGVscGVyIGFuZCB0aGVuIGhlcmUgY2FsbCBnZXRUZW1wbGF0ZS5cbm9yaWdpbmFsRG90ID0gU3BhY2ViYXJzLmRvdFxuU3BhY2ViYXJzLmRvdCA9ICh2YWx1ZSwgYXJncy4uLikgLT5cbiAgaWYgdmFsdWUgaW5zdGFuY2VvZiBDb21wb25lbnRzTmFtZXNwYWNlUmVmZXJlbmNlXG4gICAgcmV0dXJuIEJsYXplLl9nZXRUZW1wbGF0ZSBcIiN7dmFsdWUubmFtZXNwYWNlfS4je2FyZ3Muam9pbiAnLid9XCIsIHZhbHVlLnRlbXBsYXRlSW5zdGFuY2VcblxuICBvcmlnaW5hbERvdCB2YWx1ZSwgYXJncy4uLlxuXG5vcmlnaW5hbEluY2x1ZGUgPSBTcGFjZWJhcnMuaW5jbHVkZVxuU3BhY2ViYXJzLmluY2x1ZGUgPSAodGVtcGxhdGVPckZ1bmN0aW9uLCBhcmdzLi4uKSAtPlxuICAjIElmIENvbXBvbmVudHNOYW1lc3BhY2VSZWZlcmVuY2UgZ2V0cyBhbGwgdGhlIHdheSB0byB0aGUgU3BhY2ViYXJzLmluY2x1ZGUgaXQgbWVhbnMgdGhhdCB3ZSBhcmUgaW4gdGhlIHNpdHVhdGlvblxuICAjIHdoZXJlIHRoZXJlIGlzIGJvdGggbmFtZXNwYWNlIGFuZCBjb21wb25lbnQgd2l0aCB0aGUgc2FtZSBuYW1lLCBhbmQgdXNlciBpcyBpbmNsdWRpbmcgYSBjb21wb25lbnQuIEJ1dCBuYW1lc3BhY2VcbiAgIyByZWZlcmVuY2UgaXMgY3JlYXRlZCBpbnN0ZWFkIChiZWNhdXNlIHdlIGRvIG5vdCBrbm93IGluIGFkdmFuY2UgdGhhdCB0aGVyZSBpcyBubyBTcGFjZWJhcnMuZG90IGNhbGwgYXJvdW5kIGxvb2t1cFxuICAjIGNhbGwpLiBTbyB3ZSBkZXJlZmVyZW5jZSB0aGUgcmVmZXJlbmNlIGFuZCB0cnkgdG8gcmVzb2x2ZSBhIHRlbXBsYXRlLiBPZiBjb3Vyc2UsIGEgY29tcG9uZW50IG1pZ2h0IG5vdCByZWFsbHkgZXhpc3QuXG4gIGlmIHRlbXBsYXRlT3JGdW5jdGlvbiBpbnN0YW5jZW9mIENvbXBvbmVudHNOYW1lc3BhY2VSZWZlcmVuY2VcbiAgICB0ZW1wbGF0ZU9yRnVuY3Rpb24gPSBCbGF6ZS5fZ2V0VGVtcGxhdGUgdGVtcGxhdGVPckZ1bmN0aW9uLm5hbWVzcGFjZSwgdGVtcGxhdGVPckZ1bmN0aW9uLnRlbXBsYXRlSW5zdGFuY2VcblxuICBvcmlnaW5hbEluY2x1ZGUgdGVtcGxhdGVPckZ1bmN0aW9uLCBhcmdzLi4uXG5cbiMgV2Ugb3ZlcnJpZGUgdGhlIG9yaWdpbmFsIGxvb2t1cCBtZXRob2Qgd2l0aCBhIHNpbWlsYXIgb25lLCB3aGljaCBzdXBwb3J0cyBjb21wb25lbnRzIGFzIHdlbGwuXG4jXG4jIE5vdyB0aGUgb3JkZXIgb2YgdGhlIGxvb2t1cCB3aWxsIGJlLCBpbiBvcmRlcjpcbiMgICBhIGhlbHBlciBvZiB0aGUgY3VycmVudCB0ZW1wbGF0ZVxuIyAgIGEgcHJvcGVydHkgb2YgdGhlIGN1cnJlbnQgY29tcG9uZW50IChub3QgdGhlIEJsYXplQ29tcG9uZW50LmN1cnJlbnRDb21wb25lbnQoKSB0aG91Z2gsIGJ1dCBAY29tcG9uZW50KCkpXG4jICAgYSBoZWxwZXIgb2YgdGhlIGN1cnJlbnQgY29tcG9uZW50J3MgYmFzZSB0ZW1wbGF0ZSAobm90IHRoZSBCbGF6ZUNvbXBvbmVudC5jdXJyZW50Q29tcG9uZW50KCkgdGhvdWdoLCBidXQgQGNvbXBvbmVudCgpKVxuIyAgIHRoZSBuYW1lIG9mIGEgY29tcG9uZW50XG4jICAgdGhlIG5hbWUgb2YgYSB0ZW1wbGF0ZVxuIyAgIGdsb2JhbCBoZWxwZXJcbiMgICBhIHByb3BlcnR5IG9mIHRoZSBkYXRhIGNvbnRleHRcbiNcbiMgUmV0dXJucyBhIGZ1bmN0aW9uLCBhIG5vbi1mdW5jdGlvbiB2YWx1ZSwgb3IgbnVsbC4gSWYgYSBmdW5jdGlvbiBpcyBmb3VuZCwgaXQgaXMgYm91bmQgYXBwcm9wcmlhdGVseS5cbiNcbiMgTk9URTogVGhpcyBmdW5jdGlvbiBtdXN0IG5vdCBlc3RhYmxpc2ggYW55IHJlYWN0aXZlIGRlcGVuZGVuY2llcyBpdHNlbGYuICBJZiB0aGVyZSBpcyBhbnkgcmVhY3Rpdml0eVxuIyBpbiB0aGUgdmFsdWUsIGxvb2t1cCBzaG91bGQgcmV0dXJuIGEgZnVuY3Rpb24uXG4jXG4jIFRPRE86IFNob3VsZCB3ZSBhbHNvIGxvb2t1cCBmb3IgYSBwcm9wZXJ0eSBvZiB0aGUgY29tcG9uZW50LWxldmVsIGRhdGEgY29udGV4dCAoYW5kIHRlbXBsYXRlLWxldmVsIGRhdGEgY29udGV4dCk/XG5cbkJsYXplLl9nZXRUZW1wbGF0ZUhlbHBlciA9ICh0ZW1wbGF0ZSwgbmFtZSwgdGVtcGxhdGVJbnN0YW5jZSkgLT5cbiAgaXNLbm93bk9sZFN0eWxlSGVscGVyID0gZmFsc2VcbiAgaWYgdGVtcGxhdGUuX19oZWxwZXJzLmhhcyBuYW1lXG4gICAgaGVscGVyID0gdGVtcGxhdGUuX19oZWxwZXJzLmdldCBuYW1lXG4gICAgaWYgaGVscGVyIGlzIEJsYXplLl9PTERTVFlMRV9IRUxQRVJcbiAgICAgIGlzS25vd25PbGRTdHlsZUhlbHBlciA9IHRydWVcbiAgICBlbHNlIGlmIGhlbHBlcj9cbiAgICAgIHJldHVybiB3cmFwSGVscGVyIGJpbmREYXRhQ29udGV4dChoZWxwZXIpLCB0ZW1wbGF0ZUluc3RhbmNlXG4gICAgZWxzZVxuICAgICAgcmV0dXJuIG51bGxcblxuICAjIE9sZC1zdHlsZSBoZWxwZXIuXG4gIGlmIG5hbWUgb2YgdGVtcGxhdGVcbiAgICAjIE9ubHkgd2FybiBvbmNlIHBlciBoZWxwZXIuXG4gICAgdW5sZXNzIGlzS25vd25PbGRTdHlsZUhlbHBlclxuICAgICAgdGVtcGxhdGUuX19oZWxwZXJzLnNldCBuYW1lLCBCbGF6ZS5fT0xEU1RZTEVfSEVMUEVSXG4gICAgICB1bmxlc3MgdGVtcGxhdGUuX05PV0FSTl9PTERTVFlMRV9IRUxQRVJTXG4gICAgICAgIEJsYXplLl93YXJuIFwiQXNzaWduaW5nIGhlbHBlciB3aXRoIGBcIiArIHRlbXBsYXRlLnZpZXdOYW1lICsgXCIuXCIgKyBuYW1lICsgXCIgPSAuLi5gIGlzIGRlcHJlY2F0ZWQuICBVc2UgYFwiICsgdGVtcGxhdGUudmlld05hbWUgKyBcIi5oZWxwZXJzKC4uLilgIGluc3RlYWQuXCJcbiAgICBpZiB0ZW1wbGF0ZVtuYW1lXT9cbiAgICAgIHJldHVybiB3cmFwSGVscGVyIGJpbmREYXRhQ29udGV4dCh0ZW1wbGF0ZVtuYW1lXSksIHRlbXBsYXRlSW5zdGFuY2VcbiAgICBlbHNlXG4gICAgICByZXR1cm4gbnVsbFxuXG4gIHJldHVybiBudWxsIHVubGVzcyB0ZW1wbGF0ZUluc3RhbmNlXG5cbiAgIyBEbyBub3QgcmVzb2x2ZSBjb21wb25lbnQgaGVscGVycyBpZiBpbnNpZGUgVGVtcGxhdGUuZHluYW1pYy4gVGhlIHJlYXNvbiBpcyB0aGF0IFRlbXBsYXRlLmR5bmFtaWMgdXNlcyBhIGRhdGEgY29udGV4dFxuICAjIHZhbHVlIHdpdGggbmFtZSBcInRlbXBsYXRlXCIgaW50ZXJuYWxseS4gQnV0IHdoZW4gdXNlZCBpbnNpZGUgYSBjb21wb25lbnQgdGhlIGRhdGEgY29udGV4dCBsb29rdXAgaXMgdGhlbiByZXNvbHZlZFxuICAjIGludG8gYSBjdXJyZW50IGNvbXBvbmVudCdzIHRlbXBsYXRlIG1ldGhvZCBhbmQgbm90IHRoZSBkYXRhIGNvbnRleHQgXCJ0ZW1wbGF0ZVwiLiBUbyBmb3JjZSB0aGUgZGF0YSBjb250ZXh0IHJlc29sdmluZ1xuICAjIFRlbXBsYXRlLmR5bmFtaWMgc2hvdWxkIHVzZSBcInRoaXMudGVtcGxhdGVcIiBpbiBpdHMgdGVtcGxhdGVzLCBidXQgaXQgZG9lcyBub3QsIHNvIHdlIGhhdmUgYSBzcGVjaWFsIGNhc2UgaGVyZSBmb3IgaXQuXG4gIHJldHVybiBudWxsIGlmIHRlbXBsYXRlLnZpZXdOYW1lIGluIFsnVGVtcGxhdGUuX19keW5hbWljV2l0aERhdGFDb250ZXh0JywgJ1RlbXBsYXRlLl9fZHluYW1pYyddXG5cbiAgIyBCbGF6ZS5WaWV3Ojpsb29rdXAgc2hvdWxkIG5vdCBpbnRyb2R1Y2UgYW55IHJlYWN0aXZlIGRlcGVuZGVuY2llcywgYnV0IHdlIGNhbiBzaW1wbHkgaWdub3JlIHJlYWN0aXZpdHkgaGVyZSBiZWNhdXNlXG4gICMgdGVtcGxhdGUgaW5zdGFuY2UgcHJvYmFibHkgY2Fubm90IGNoYW5nZSB3aXRob3V0IHJlY29uc3RydWN0aW5nIHRoZSBjb21wb25lbnQgYXMgd2VsbC5cbiAgY29tcG9uZW50ID0gVHJhY2tlci5ub25yZWFjdGl2ZSAtPlxuICAgICMgV2Ugd2FudCB0byBza2lwIGFueSBibG9jayBoZWxwZXIuIHt7bWV0aG9kfX0gc2hvdWxkIHJlc29sdmUgdG9cbiAgICAjIHt7Y29tcG9uZW50Lm1ldGhvZH19IGFuZCBub3QgdG8ge3tjdXJyZW50Q29tcG9uZW50Lm1ldGhvZH19LlxuICAgIHRlbXBsYXRlSW5zdGFuY2VUb0NvbXBvbmVudCB0ZW1wbGF0ZUluc3RhbmNlLCB0cnVlXG5cbiAgIyBDb21wb25lbnQuXG4gIGlmIGNvbXBvbmVudFxuICAgICMgVGhpcyB3aWxsIGZpcnN0IHNlYXJjaCBvbiB0aGUgY29tcG9uZW50IGFuZCB0aGVuIGNvbnRpbnVlIHdpdGggbWl4aW5zLlxuICAgIGlmIG1peGluT3JDb21wb25lbnQgPSBjb21wb25lbnQuZ2V0Rmlyc3RXaXRoIG51bGwsIG5hbWVcbiAgICAgIHJldHVybiB3cmFwSGVscGVyIGJpbmRDb21wb25lbnQobWl4aW5PckNvbXBvbmVudCwgbWl4aW5PckNvbXBvbmVudFtuYW1lXSksIHRlbXBsYXRlSW5zdGFuY2VcblxuICAjIEEgc3BlY2lhbCBjYXNlIHRvIHN1cHBvcnQge3s+IEZvby5CYXJ9fS4gVGhpcyBnb2VzIHRocm91Z2ggYSBnZXRUZW1wbGF0ZUhlbHBlciBwYXRoLCBidXQgd2Ugd2FudCB0byByZWRpcmVjdFxuICAjIGl0IHRvIHRoZSBnZXRUZW1wbGF0ZSBwYXRoLiBTbyB3ZSBtYXJrIGl0IGFuZCBsZWF2ZSB0byBTcGFjZWJhcnMuZG90IHRvIGNhbGwgZ2V0VGVtcGxhdGUuXG4gICMgVE9ETzogV2Ugc2hvdWxkIHByb3ZpZGUgYSBCYXNlQ29tcG9uZW50LmdldENvbXBvbmVudHNOYW1lc3BhY2UgbWV0aG9kIGluc3RlYWQgb2YgYWNjZXNzaW5nIGNvbXBvbmVudHMgZGlyZWN0bHkuXG4gIGlmIG5hbWUgYW5kIG5hbWUgb2YgQmxhemVDb21wb25lbnQuY29tcG9uZW50c1xuICAgIHJldHVybiBuZXcgQ29tcG9uZW50c05hbWVzcGFjZVJlZmVyZW5jZSBuYW1lLCB0ZW1wbGF0ZUluc3RhbmNlXG5cbiAgIyBNYXliZSBhIHByZWV4aXN0aW5nIHRlbXBsYXRlIGhlbHBlciBvbiB0aGUgY29tcG9uZW50J3MgYmFzZSB0ZW1wbGF0ZS5cbiAgaWYgY29tcG9uZW50XG4gICAgaWYgKGhlbHBlciA9IGNvbXBvbmVudC5fY29tcG9uZW50SW50ZXJuYWxzPy50ZW1wbGF0ZUJhc2U/Ll9faGVscGVycy5nZXQgbmFtZSk/XG4gICAgICByZXR1cm4gd3JhcEhlbHBlciBiaW5kRGF0YUNvbnRleHQoaGVscGVyKSwgdGVtcGxhdGVJbnN0YW5jZVxuXG4gIG51bGxcblxuc2hhcmUuaW5FeHBhbmRBdHRyaWJ1dGVzID0gZmFsc2VcblxuYmluZENvbXBvbmVudCA9IChjb21wb25lbnQsIGhlbHBlcikgLT5cbiAgaWYgXy5pc0Z1bmN0aW9uIGhlbHBlclxuICAgIChhcmdzLi4uKSAtPlxuICAgICAgcmVzdWx0ID0gaGVscGVyLmFwcGx5IGNvbXBvbmVudCwgYXJnc1xuXG4gICAgICAjIElmIHdlIGFyZSBleHBhbmRpbmcgYXR0cmlidXRlcyBhbmQgdGhpcyBpcyBhbiBvYmplY3Qgd2l0aCBkeW5hbWljIGF0dHJpYnV0ZXMsXG4gICAgICAjIHRoZW4gd2Ugd2FudCB0byBiaW5kIGFsbCBwb3NzaWJsZSBldmVudCBoYW5kbGVycyB0byB0aGUgY29tcG9uZW50IGFzIHdlbGwuXG4gICAgICBpZiBzaGFyZS5pbkV4cGFuZEF0dHJpYnV0ZXMgYW5kIF8uaXNPYmplY3QgcmVzdWx0XG4gICAgICAgIGZvciBuYW1lLCB2YWx1ZSBvZiByZXN1bHQgd2hlbiBzaGFyZS5FVkVOVF9IQU5ETEVSX1JFR0VYLnRlc3QgbmFtZVxuICAgICAgICAgIGlmIF8uaXNGdW5jdGlvbiB2YWx1ZVxuICAgICAgICAgICAgcmVzdWx0W25hbWVdID0gXy5iaW5kIHZhbHVlLCBjb21wb25lbnRcbiAgICAgICAgICBlbHNlIGlmIF8uaXNBcnJheSB2YWx1ZVxuICAgICAgICAgICAgcmVzdWx0W25hbWVdID0gXy5tYXAgdmFsdWUsIChmdW4pIC0+XG4gICAgICAgICAgICAgIGlmIF8uaXNGdW5jdGlvbiBmdW5cbiAgICAgICAgICAgICAgICBfLmJpbmQgZnVuLCBjb21wb25lbnRcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGZ1blxuXG4gICAgICByZXN1bHRcbiAgZWxzZVxuICAgIGhlbHBlclxuXG5iaW5kRGF0YUNvbnRleHQgPSAoaGVscGVyKSAtPlxuICBpZiBfLmlzRnVuY3Rpb24gaGVscGVyXG4gICAgLT5cbiAgICAgIGRhdGEgPSBCbGF6ZS5nZXREYXRhKClcbiAgICAgIGRhdGEgPz0ge31cbiAgICAgIGhlbHBlci5hcHBseSBkYXRhLCBhcmd1bWVudHNcbiAgZWxzZVxuICAgIGhlbHBlclxuXG53cmFwSGVscGVyID0gKGYsIHRlbXBsYXRlRnVuYykgLT5cbiAgIyBYWFggQ09NUEFUIFdJVEggTUVURU9SIDEuMC4zLjJcbiAgcmV0dXJuIEJsYXplLl93cmFwQ2F0Y2hpbmdFeGNlcHRpb25zIGYsICd0ZW1wbGF0ZSBoZWxwZXInIHVubGVzcyBCbGF6ZS5UZW1wbGF0ZS5fd2l0aFRlbXBsYXRlSW5zdGFuY2VGdW5jXG5cbiAgcmV0dXJuIGYgdW5sZXNzIF8uaXNGdW5jdGlvbiBmXG5cbiAgLT5cbiAgICBzZWxmID0gQFxuICAgIGFyZ3MgPSBhcmd1bWVudHNcblxuICAgIEJsYXplLlRlbXBsYXRlLl93aXRoVGVtcGxhdGVJbnN0YW5jZUZ1bmMgdGVtcGxhdGVGdW5jLCAtPlxuICAgICAgQmxhemUuX3dyYXBDYXRjaGluZ0V4Y2VwdGlvbnMoZiwgJ3RlbXBsYXRlIGhlbHBlcicpLmFwcGx5IHNlbGYsIGFyZ3NcblxuaWYgQmxhemUuVGVtcGxhdGUuX3dpdGhUZW1wbGF0ZUluc3RhbmNlRnVuY1xuICB3aXRoVGVtcGxhdGVJbnN0YW5jZUZ1bmMgPSBCbGF6ZS5UZW1wbGF0ZS5fd2l0aFRlbXBsYXRlSW5zdGFuY2VGdW5jXG5lbHNlXG4gICMgWFhYIENPTVBBVCBXSVRIIE1FVEVPUiAxLjAuMy4yLlxuICB3aXRoVGVtcGxhdGVJbnN0YW5jZUZ1bmMgPSAodGVtcGxhdGVJbnN0YW5jZSwgZikgLT5cbiAgICBmKClcblxuZ2V0VGVtcGxhdGVCYXNlID0gKGNvbXBvbmVudCkgLT5cbiAgIyBXZSBkbyBub3QgYWxsb3cgdGVtcGxhdGUgdG8gYmUgYSByZWFjdGl2ZSBtZXRob2QuXG4gIFRyYWNrZXIubm9ucmVhY3RpdmUgLT5cbiAgICBjb21wb25lbnRUZW1wbGF0ZSA9IGNvbXBvbmVudC50ZW1wbGF0ZSgpXG4gICAgaWYgXy5pc1N0cmluZyBjb21wb25lbnRUZW1wbGF0ZVxuICAgICAgdGVtcGxhdGVCYXNlID0gVGVtcGxhdGVbY29tcG9uZW50VGVtcGxhdGVdXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJUZW1wbGF0ZSAnI3tjb21wb25lbnRUZW1wbGF0ZX0nIGNhbm5vdCBiZSBmb3VuZC5cIiB1bmxlc3MgdGVtcGxhdGVCYXNlXG4gICAgZWxzZSBpZiBjb21wb25lbnRUZW1wbGF0ZVxuICAgICAgdGVtcGxhdGVCYXNlID0gY29tcG9uZW50VGVtcGxhdGVcbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJUZW1wbGF0ZSBmb3IgdGhlIGNvbXBvbmVudCAnI3tjb21wb25lbnQuY29tcG9uZW50TmFtZSgpIG9yICd1bm5hbWVkJ30nIG5vdCBwcm92aWRlZC5cIlxuXG4gICAgdGVtcGxhdGVCYXNlXG5cbmNhbGxUZW1wbGF0ZUJhc2VIb29rcyA9IChjb21wb25lbnQsIGhvb2tOYW1lKSAtPlxuICBjb21wb25lbnQuX2NvbXBvbmVudEludGVybmFscyA/PSB7fVxuXG4gICMgSW4gbWl4aW5zIHdlIGRvIG5vdCBoYXZlIGEgdGVtcGxhdGUgaW5zdGFuY2UuIFRoZXJlIGlzIGFsc29cbiAgIyBubyByZWFzb24gZm9yIGEgdGVtcGxhdGUgaW5zdGFuY2UgdG8gZXh0ZW5kIGEgQmxhemUgdGVtcGxhdGUuXG4gIHJldHVybiB1bmxlc3MgY29tcG9uZW50Ll9jb21wb25lbnRJbnRlcm5hbHMudGVtcGxhdGVJbnN0YW5jZVxuXG4gIHRlbXBsYXRlSW5zdGFuY2UgPSBUcmFja2VyLm5vbnJlYWN0aXZlIC0+XG4gICAgY29tcG9uZW50Ll9jb21wb25lbnRJbnRlcm5hbHMudGVtcGxhdGVJbnN0YW5jZSgpXG4gIGNhbGxiYWNrcyA9IGNvbXBvbmVudC5fY29tcG9uZW50SW50ZXJuYWxzLnRlbXBsYXRlQmFzZS5fZ2V0Q2FsbGJhY2tzIGhvb2tOYW1lXG4gIFRlbXBsYXRlLl93aXRoVGVtcGxhdGVJbnN0YW5jZUZ1bmMoXG4gICAgLT5cbiAgICAgIHRlbXBsYXRlSW5zdGFuY2VcbiAgLFxuICAgIC0+XG4gICAgICBmb3IgY2FsbGJhY2sgaW4gY2FsbGJhY2tzXG4gICAgICAgIGNhbGxiYWNrLmNhbGwgdGVtcGxhdGVJbnN0YW5jZVxuICApXG5cbiAgcmV0dXJuXG5cbndyYXBWaWV3QW5kVGVtcGxhdGUgPSAoY3VycmVudFZpZXcsIGYpIC0+XG4gICMgRm9yIHRlbXBsYXRlIGNvbnRlbnQgd3JhcHBlZCBpbnNpZGUgdGhlIGJsb2NrIGhlbHBlciwgd2Ugd2FudCB0byBza2lwIHRoZSBibG9ja1xuICAjIGhlbHBlciB3aGVuIHNlYXJjaGluZyBmb3IgY29ycmVzcG9uZGluZyB0ZW1wbGF0ZS4gVGhpcyBtZWFucyB0aGF0IFRlbXBsYXRlLmluc3RhbmNlKClcbiAgIyB3aWxsIHJldHVybiB0aGUgY29tcG9uZW50J3MgdGVtcGxhdGUsIHdoaWxlIEJsYXplQ29tcG9uZW50LmN1cnJlbnRDb21wb25lbnQoKSB3aWxsXG4gICMgcmV0dXJuIHRoZSBjb21wb25lbnQgaW5zaWRlLlxuICB0ZW1wbGF0ZUluc3RhbmNlID0gZ2V0VGVtcGxhdGVJbnN0YW5jZUZ1bmN0aW9uIGN1cnJlbnRWaWV3LCB0cnVlXG5cbiAgIyBXZSBzZXQgdGVtcGxhdGUgaW5zdGFuY2UgdG8gbWF0Y2ggdGhlIGN1cnJlbnQgdmlldyAobW9zdGx5LCBvbmx5IG5vdCB3aGVuIGluc2lkZVxuICAjIHRoZSBibG9jayBoZWxwZXIpLiBUaGUgbGF0dGVyIHdlIHVzZSBmb3IgQmxhemVDb21wb25lbnQuY3VycmVudENvbXBvbmVudCgpLCBidXRcbiAgIyBpdCBpcyBnb29kIHRoYXQgYm90aCB0ZW1wbGF0ZSBpbnN0YW5jZSBhbmQgY3VycmVudCB2aWV3IGNvcnJlc3BvbmQgdG8gZWFjaCBvdGhlclxuICAjIGFzIG11Y2ggYXMgcG9zc2libGUuXG4gIHdpdGhUZW1wbGF0ZUluc3RhbmNlRnVuYyB0ZW1wbGF0ZUluc3RhbmNlLCAtPlxuICAgICMgV2Ugc2V0IHZpZXcgYmFzZWQgb24gdGhlIGN1cnJlbnQgdmlldyBzbyB0aGF0IGluc2lkZSBldmVudCBoYW5kbGVyc1xuICAgICMgQmxhemVDb21wb25lbnQuY3VycmVudERhdGEoKSAoYW5kIEJsYXplLmdldERhdGEoKSBhbmQgVGVtcGxhdGUuY3VycmVudERhdGEoKSlcbiAgICAjIHJldHVybnMgZGF0YSBjb250ZXh0IG9mIGV2ZW50IHRhcmdldCBhbmQgbm90IGNvbXBvbmVudC90ZW1wbGF0ZS4gTW9yZW92ZXIsXG4gICAgIyBpbnNpZGUgZXZlbnQgaGFuZGxlcnMgQmxhemVDb21wb25lbnQuY3VycmVudENvbXBvbmVudCgpIHJldHVybnMgdGhlIGNvbXBvbmVudFxuICAgICMgb2YgZXZlbnQgdGFyZ2V0LlxuICAgIEJsYXplLl93aXRoQ3VycmVudFZpZXcgY3VycmVudFZpZXcsIC0+XG4gICAgICBmKClcblxuYWRkRXZlbnRzID0gKHZpZXcsIGNvbXBvbmVudCkgLT5cbiAgZXZlbnRzTGlzdCA9IGNvbXBvbmVudC5ldmVudHMoKVxuXG4gIHRocm93IG5ldyBFcnJvciBcIidldmVudHMnIG1ldGhvZCBmcm9tIHRoZSBjb21wb25lbnQgJyN7Y29tcG9uZW50LmNvbXBvbmVudE5hbWUoKSBvciAndW5uYW1lZCd9JyBkaWQgbm90IHJldHVybiBhIGxpc3Qgb2YgZXZlbnQgbWFwcy5cIiB1bmxlc3MgXy5pc0FycmF5IGV2ZW50c0xpc3RcblxuICBmb3IgZXZlbnRzIGluIGV2ZW50c0xpc3RcbiAgICBldmVudE1hcCA9IHt9XG5cbiAgICBmb3Igc3BlYywgaGFuZGxlciBvZiBldmVudHNcbiAgICAgIGRvIChzcGVjLCBoYW5kbGVyKSAtPlxuICAgICAgICBldmVudE1hcFtzcGVjXSA9IChhcmdzLi4uKSAtPlxuICAgICAgICAgIGV2ZW50ID0gYXJnc1swXVxuXG4gICAgICAgICAgY3VycmVudFZpZXcgPSBCbGF6ZS5nZXRWaWV3IGV2ZW50LmN1cnJlbnRUYXJnZXRcbiAgICAgICAgICB3cmFwVmlld0FuZFRlbXBsYXRlIGN1cnJlbnRWaWV3LCAtPlxuICAgICAgICAgICAgaGFuZGxlci5hcHBseSBjb21wb25lbnQsIGFyZ3NcblxuICAgICAgICAgICMgTWFrZSBzdXJlIENvZmZlZVNjcmlwdCBkb2VzIG5vdCByZXR1cm4gYW55dGhpbmcuXG4gICAgICAgICAgIyBSZXR1cm5pbmcgZnJvbSBldmVudCBoYW5kbGVycyBpcyBkZXByZWNhdGVkLlxuICAgICAgICAgIHJldHVyblxuXG4gICAgQmxhemUuX2FkZEV2ZW50TWFwIHZpZXcsIGV2ZW50TWFwLCB2aWV3XG5cbiAgcmV0dXJuXG5cbm9yaWdpbmFsR2V0VGVtcGxhdGUgPSBCbGF6ZS5fZ2V0VGVtcGxhdGVcbkJsYXplLl9nZXRUZW1wbGF0ZSA9IChuYW1lLCB0ZW1wbGF0ZUluc3RhbmNlKSAtPlxuICAjIEJsYXplLlZpZXc6Omxvb2t1cCBzaG91bGQgbm90IGludHJvZHVjZSBhbnkgcmVhY3RpdmUgZGVwZW5kZW5jaWVzLCBzbyB3ZSBhcmUgbWFraW5nIHN1cmUgaXQgaXMgc28uXG4gIHRlbXBsYXRlID0gVHJhY2tlci5ub25yZWFjdGl2ZSAtPlxuICAgIGlmIEJsYXplLmN1cnJlbnRWaWV3XG4gICAgICBwYXJlbnRDb21wb25lbnQgPSBCbGF6ZUNvbXBvbmVudC5jdXJyZW50Q29tcG9uZW50KClcbiAgICBlbHNlXG4gICAgICAjIFdlIGRvIG5vdCBza2lwIGJsb2NrIGhlbHBlcnMgdG8gYXNzdXJlIHRoYXQgd2hlbiBibG9jayBoZWxwZXJzIGFyZSB1c2VkLFxuICAgICAgIyBjb21wb25lbnQgdHJlZSBpbnRlZ3JhdGVzIHRoZW0gbmljZWx5IGludG8gYSB0cmVlLlxuICAgICAgcGFyZW50Q29tcG9uZW50ID0gdGVtcGxhdGVJbnN0YW5jZVRvQ29tcG9uZW50IHRlbXBsYXRlSW5zdGFuY2UsIGZhbHNlXG5cbiAgICBCbGF6ZUNvbXBvbmVudC5nZXRDb21wb25lbnQobmFtZSk/LnJlbmRlckNvbXBvbmVudCBwYXJlbnRDb21wb25lbnRcbiAgcmV0dXJuIHRlbXBsYXRlIGlmIHRlbXBsYXRlIGFuZCAodGVtcGxhdGUgaW5zdGFuY2VvZiBCbGF6ZS5UZW1wbGF0ZSBvciBfLmlzRnVuY3Rpb24gdGVtcGxhdGUpXG5cbiAgb3JpZ2luYWxHZXRUZW1wbGF0ZSBuYW1lXG5cbnJlZ2lzdGVySG9va3MgPSAodGVtcGxhdGUsIGhvb2tzKSAtPlxuICBpZiB0ZW1wbGF0ZS5vbkNyZWF0ZWRcbiAgICB0ZW1wbGF0ZS5vbkNyZWF0ZWQgaG9va3Mub25DcmVhdGVkXG4gICAgdGVtcGxhdGUub25SZW5kZXJlZCBob29rcy5vblJlbmRlcmVkXG4gICAgdGVtcGxhdGUub25EZXN0cm95ZWQgaG9va3Mub25EZXN0cm95ZWRcbiAgZWxzZVxuICAgICMgWFhYIENPTVBBVCBXSVRIIE1FVEVPUiAxLjAuMy4yLlxuICAgIHRlbXBsYXRlLmNyZWF0ZWQgPSBob29rcy5vbkNyZWF0ZWRcbiAgICB0ZW1wbGF0ZS5yZW5kZXJlZCA9IGhvb2tzLm9uUmVuZGVyZWRcbiAgICB0ZW1wbGF0ZS5kZXN0cm95ZWQgPSBob29rcy5vbkRlc3Ryb3llZFxuXG5yZWdpc3RlckZpcnN0Q3JlYXRlZEhvb2sgPSAodGVtcGxhdGUsIG9uQ3JlYXRlZCkgLT5cbiAgaWYgdGVtcGxhdGUuX2NhbGxiYWNrc1xuICAgIHRlbXBsYXRlLl9jYWxsYmFja3MuY3JlYXRlZC51bnNoaWZ0IG9uQ3JlYXRlZFxuICBlbHNlXG4gICAgIyBYWFggQ09NUEFUIFdJVEggTUVURU9SIDEuMC4zLjIuXG4gICAgb2xkQ3JlYXRlZCA9IHRlbXBsYXRlLmNyZWF0ZWRcbiAgICB0ZW1wbGF0ZS5jcmVhdGVkID0gLT5cbiAgICAgIG9uQ3JlYXRlZC5jYWxsIEBcbiAgICAgIG9sZENyZWF0ZWQ/LmNhbGwgQFxuXG4jIFdlIG1ha2UgVGVtcGxhdGUuZHluYW1pYyByZXNvbHZlIHRvIHRoZSBjb21wb25lbnQgaWYgY29tcG9uZW50IG5hbWUgaXMgc3BlY2lmaWVkIGFzIGEgdGVtcGxhdGUgbmFtZSwgYW5kIG5vdFxuIyB0byB0aGUgbm9uLWNvbXBvbmVudCB0ZW1wbGF0ZSB3aGljaCBpcyBwcm9iYWJseSB1c2VkIG9ubHkgZm9yIHRoZSBjb250ZW50LiBXZSBzaW1wbHkgcmV1c2UgQmxhemUuX2dldFRlbXBsYXRlLlxuIyBUT0RPOiBIb3cgdG8gcGFzcyBhcmdzP1xuIyAgICAgICBNYXliZSBzaW1wbHkgYnkgdXNpbmcgU3BhY2ViYXJzIG5lc3RlZCBleHByZXNzaW9ucyAoaHR0cHM6Ly9naXRodWIuY29tL21ldGVvci9tZXRlb3IvcHVsbC80MTAxKT9cbiMgICAgICAgVGVtcGxhdGUuZHluYW1pYyB0ZW1wbGF0ZT1cIi4uLlwiIGRhdGE9KGFyZ3MgLi4uKT8gQnV0IHRoaXMgZXhwb3NlcyB0aGUgZmFjdCB0aGF0IGFyZ3MgYXJlIHBhc3NlZCBhcyBkYXRhIGNvbnRleHQuXG4jICAgICAgIE1heWJlIHdlIHNob3VsZCBzaW1wbHkgb3ZlcnJpZGUgVGVtcGxhdGUuZHluYW1pYyBhbmQgYWRkIFwiYXJnc1wiIGFyZ3VtZW50P1xuIyBUT0RPOiBUaGlzIGNhbiBiZSByZW1vdmVkIG9uY2UgaHR0cHM6Ly9naXRodWIuY29tL21ldGVvci9tZXRlb3IvcHVsbC80MDM2IGlzIG1lcmdlZCBpbi5cblRlbXBsYXRlLl9fZHluYW1pY1dpdGhEYXRhQ29udGV4dC5fX2hlbHBlcnMuc2V0ICdjaG9vc2VUZW1wbGF0ZScsIChuYW1lKSAtPlxuICBCbGF6ZS5fZ2V0VGVtcGxhdGUgbmFtZSwgPT5cbiAgICBUZW1wbGF0ZS5pbnN0YW5jZSgpXG5cbmFyZ3VtZW50c0NvbnN0cnVjdG9yID0gLT5cbiAgIyBUaGlzIGNsYXNzIHNob3VsZCBuZXZlciByZWFsbHkgYmUgY3JlYXRlZC5cbiAgYXNzZXJ0IGZhbHNlXG5cbiMgVE9ETzogRmluZCBhIHdheSB0byBwYXNzIGFyZ3VtZW50cyB0byB0aGUgY29tcG9uZW50IHdpdGhvdXQgaGF2aW5nIHRvIGludHJvZHVjZSBvbmUgaW50ZXJtZWRpYXJ5IGRhdGEgY29udGV4dCBpbnRvIHRoZSBkYXRhIGNvbnRleHQgaGllcmFyY2h5LlxuIyAgICAgICAoSW4gZmFjdCB0d28gZGF0YSBjb250ZXh0cywgYmVjYXVzZSB3ZSBhZGQgb25lIG1vcmUgd2hlbiByZXN0b3JpbmcgdGhlIG9yaWdpbmFsIG9uZS4pXG5UZW1wbGF0ZS5yZWdpc3RlckhlbHBlciAnYXJncycsIC0+XG4gIG9iaiA9IHt9XG4gICMgV2UgdXNlIGN1c3RvbSBjb25zdHJ1Y3RvciB0byBrbm93IHRoYXQgaXQgaXMgbm90IGEgcmVhbCBkYXRhIGNvbnRleHQuXG4gIG9iai5jb25zdHJ1Y3RvciA9IGFyZ3VtZW50c0NvbnN0cnVjdG9yXG4gIG9iai5fYXJndW1lbnRzID0gYXJndW1lbnRzXG4gIG9ialxuXG5zaGFyZS5FVkVOVF9IQU5ETEVSX1JFR0VYID0gL15vbltBLVpdL1xuXG5zaGFyZS5pc0V2ZW50SGFuZGxlciA9IChmdW4pIC0+XG4gIF8uaXNGdW5jdGlvbihmdW4pIGFuZCBmdW4uZXZlbnRIYW5kbGVyXG5cbiMgV2hlbiBldmVudCBoYW5kbGVycyBhcmUgcHJvdmlkZWQgZGlyZWN0bHkgYXMgYXJncyB0aGV5IGFyZSBub3QgcGFzc2VkIHRocm91Z2hcbiMgU3BhY2ViYXJzLmV2ZW50IGJ5IHRoZSB0ZW1wbGF0ZSBjb21waWxlciwgc28gd2UgaGF2ZSB0byBkbyBpdCBvdXJzZWx2ZXMuXG5vcmlnaW5hbEZsYXR0ZW5BdHRyaWJ1dGVzID0gSFRNTC5mbGF0dGVuQXR0cmlidXRlc1xuSFRNTC5mbGF0dGVuQXR0cmlidXRlcyA9IChhdHRycykgLT5cbiAgaWYgYXR0cnMgPSBvcmlnaW5hbEZsYXR0ZW5BdHRyaWJ1dGVzIGF0dHJzXG4gICAgZm9yIG5hbWUsIHZhbHVlIG9mIGF0dHJzIHdoZW4gc2hhcmUuRVZFTlRfSEFORExFUl9SRUdFWC50ZXN0IG5hbWVcbiAgICAgICMgQWxyZWFkeSBwcm9jZXNzZWQgYnkgU3BhY2ViYXJzLmV2ZW50LlxuICAgICAgY29udGludWUgaWYgc2hhcmUuaXNFdmVudEhhbmRsZXIgdmFsdWVcbiAgICAgIGNvbnRpbnVlIGlmIF8uaXNBcnJheSh2YWx1ZSkgYW5kIF8uc29tZSB2YWx1ZSwgc2hhcmUuaXNFdmVudEhhbmRsZXJcblxuICAgICAgIyBXaGVuIGV2ZW50IGhhbmRsZXJzIGFyZSBwcm92aWRlZCBkaXJlY3RseSBhcyBhcmdzLFxuICAgICAgIyB3ZSByZXF1aXJlIHRoZW0gdG8gYmUganVzdCBldmVudCBoYW5kbGVycy5cbiAgICAgIGlmIF8uaXNBcnJheSB2YWx1ZVxuICAgICAgICBhdHRyc1tuYW1lXSA9IF8ubWFwIHZhbHVlLCBTcGFjZWJhcnMuZXZlbnRcbiAgICAgIGVsc2VcbiAgICAgICAgYXR0cnNbbmFtZV0gPSBTcGFjZWJhcnMuZXZlbnQgdmFsdWVcblxuICBhdHRyc1xuXG5TcGFjZWJhcnMuZXZlbnQgPSAoZXZlbnRIYW5kbGVyLCBhcmdzLi4uKSAtPlxuICB0aHJvdyBuZXcgRXJyb3IgXCJFdmVudCBoYW5kbGVyIG5vdCBhIGZ1bmN0aW9uOiAje2V2ZW50SGFuZGxlcn1cIiB1bmxlc3MgXy5pc0Z1bmN0aW9uIGV2ZW50SGFuZGxlclxuXG4gICMgRXhlY3V0ZSBhbGwgYXJndW1lbnRzLlxuICBhcmdzID0gU3BhY2ViYXJzLm11c3RhY2hlSW1wbCAoKHhzLi4uKSAtPiB4cyksIGFyZ3MuLi5cblxuICBmdW4gPSAoZXZlbnQsIGV2ZW50QXJncy4uLikgLT5cbiAgICBjdXJyZW50VmlldyA9IEJsYXplLmdldFZpZXcgZXZlbnQuY3VycmVudFRhcmdldFxuICAgIHdyYXBWaWV3QW5kVGVtcGxhdGUgY3VycmVudFZpZXcsIC0+XG4gICAgICAjIFdlIGRvIG5vdCBoYXZlIHRvIGJpbmQgXCJ0aGlzXCIgYmVjYXVzZSBldmVudCBoYW5kbGVycyBhcmUgcmVzb2x2ZWRcbiAgICAgICMgYXMgdGVtcGxhdGUgaGVscGVycyBhbmQgYXJlIGFscmVhZHkgYm91bmQuIFdlIGJpbmQgZXZlbnQgaGFuZGxlcnNcbiAgICAgICMgaW4gZHluYW1pYyBhdHRyaWJ1dGVzIGFscmVhZHkgYXMgd2VsbC5cbiAgICAgIGV2ZW50SGFuZGxlci5hcHBseSBudWxsLCBbZXZlbnRdLmNvbmNhdCBhcmdzLCBldmVudEFyZ3NcblxuICBmdW4uZXZlbnRIYW5kbGVyID0gdHJ1ZVxuXG4gIGZ1blxuXG4jIFdoZW4gY29udmVydGluZyB0aGUgY29tcG9uZW50IHRvIHRoZSBzdGF0aWMgSFRNTCwgcmVtb3ZlIGFsbCBldmVudCBoYW5kbGVycy5cbm9yaWdpbmFsVmlzaXRUYWcgPSBIVE1MLlRvSFRNTFZpc2l0b3I6OnZpc2l0VGFnXG5IVE1MLlRvSFRNTFZpc2l0b3I6OnZpc2l0VGFnID0gKHRhZykgLT5cbiAgaWYgYXR0cnMgPSB0YWcuYXR0cnNcbiAgICBhdHRycyA9IEhUTUwuZmxhdHRlbkF0dHJpYnV0ZXMgYXR0cnNcbiAgICBmb3IgbmFtZSBvZiBhdHRycyB3aGVuIHNoYXJlLkVWRU5UX0hBTkRMRVJfUkVHRVgudGVzdCBuYW1lXG4gICAgICBkZWxldGUgYXR0cnNbbmFtZV1cbiAgICB0YWcuYXR0cnMgPSBhdHRyc1xuXG4gIG9yaWdpbmFsVmlzaXRUYWcuY2FsbCBALCB0YWdcblxuY3VycmVudFZpZXdJZlJlbmRlcmluZyA9IC0+XG4gIHZpZXcgPSBCbGF6ZS5jdXJyZW50Vmlld1xuICBpZiB2aWV3Py5faXNJblJlbmRlclxuICAgIHZpZXdcbiAgZWxzZVxuICAgIG51bGxcblxuY29udGVudEFzRnVuYyA9IChjb250ZW50KSAtPlxuICAjIFdlIGRvIG5vdCBjaGVjayBjb250ZW50IGZvciB2YWxpZGl0eS5cblxuICBpZiAhXy5pc0Z1bmN0aW9uIGNvbnRlbnRcbiAgICByZXR1cm4gLT5cbiAgICAgIGNvbnRlbnRcblxuICBjb250ZW50XG5cbmNvbnRlbnRBc1ZpZXcgPSAoY29udGVudCkgLT5cbiAgIyBXZSBkbyBub3QgY2hlY2sgY29udGVudCBmb3IgdmFsaWRpdHkuXG5cbiAgaWYgY29udGVudCBpbnN0YW5jZW9mIEJsYXplLlRlbXBsYXRlXG4gICAgY29udGVudC5jb25zdHJ1Y3RWaWV3KClcbiAgZWxzZSBpZiBjb250ZW50IGluc3RhbmNlb2YgQmxhemUuVmlld1xuICAgIGNvbnRlbnRcbiAgZWxzZVxuICAgIEJsYXplLlZpZXcgJ3JlbmRlcicsIGNvbnRlbnRBc0Z1bmMgY29udGVudFxuXG5IVE1MSlNFeHBhbmRlciA9IEJsYXplLl9IVE1MSlNFeHBhbmRlci5leHRlbmQoKVxuSFRNTEpTRXhwYW5kZXIuZGVmXG4gICMgQmFzZWQgb24gQmxhemUuX0hUTUxKU0V4cGFuZGVyLCBidXQgY2FsbHMgb3VyIGV4cGFuZFZpZXcuXG4gIHZpc2l0T2JqZWN0OiAoeCkgLT5cbiAgICBpZiB4IGluc3RhbmNlb2YgQmxhemUuVGVtcGxhdGVcbiAgICAgIHggPSB4LmNvbnN0cnVjdFZpZXcoKVxuICAgIGlmIHggaW5zdGFuY2VvZiBCbGF6ZS5WaWV3XG4gICAgICByZXR1cm4gZXhwYW5kVmlldyB4LCBAcGFyZW50Vmlld1xuXG4gICAgSFRNTC5UcmFuc2Zvcm1pbmdWaXNpdG9yLnByb3RvdHlwZS52aXNpdE9iamVjdC5jYWxsIEAsIHhcblxuIyBCYXNlZCBvbiBCbGF6ZS5fZXhwYW5kLCBidXQgdXNlcyBvdXIgSFRNTEpTRXhwYW5kZXIuXG5leHBhbmQgPSAoaHRtbGpzLCBwYXJlbnRWaWV3KSAtPlxuICBwYXJlbnRWaWV3ID0gcGFyZW50VmlldyBvciBjdXJyZW50Vmlld0lmUmVuZGVyaW5nKClcblxuICAobmV3IEhUTUxKU0V4cGFuZGVyIHBhcmVudFZpZXc6IHBhcmVudFZpZXcpLnZpc2l0IGh0bWxqc1xuXG4jIEJhc2VkIG9uIEJsYXplLl9leHBhbmRWaWV3LCBidXQgd2l0aCBmbHVzaGluZy5cbmV4cGFuZFZpZXcgPSAodmlldywgcGFyZW50VmlldykgLT5cbiAgQmxhemUuX2NyZWF0ZVZpZXcgdmlldywgcGFyZW50VmlldywgdHJ1ZVxuXG4gIHZpZXcuX2lzSW5SZW5kZXIgPSB0cnVlXG4gIGh0bWxqcyA9IEJsYXplLl93aXRoQ3VycmVudFZpZXcgdmlldywgLT5cbiAgICB2aWV3Ll9yZW5kZXIoKVxuICB2aWV3Ll9pc0luUmVuZGVyID0gZmFsc2VcblxuICBUcmFja2VyLmZsdXNoKClcblxuICByZXN1bHQgPSBleHBhbmQgaHRtbGpzLCB2aWV3XG5cbiAgVHJhY2tlci5mbHVzaCgpXG5cbiAgaWYgVHJhY2tlci5hY3RpdmVcbiAgICBUcmFja2VyLm9uSW52YWxpZGF0ZSAtPlxuICAgICAgQmxhemUuX2Rlc3Ryb3lWaWV3IHZpZXdcbiAgZWxzZVxuICAgIEJsYXplLl9kZXN0cm95VmlldyB2aWV3XG5cbiAgVHJhY2tlci5mbHVzaCgpXG5cbiAgcmVzdWx0XG5cbmNsYXNzIEJsYXplQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxuICAjIFRPRE86IEZpZ3VyZSBvdXQgaG93IHRvIGRvIGF0IHRoZSBCYXNlQ29tcG9uZW50IGxldmVsP1xuICBAZ2V0Q29tcG9uZW50Rm9yRWxlbWVudDogKGRvbUVsZW1lbnQpIC0+XG4gICAgcmV0dXJuIG51bGwgdW5sZXNzIGRvbUVsZW1lbnRcblxuICAgICMgVGhpcyB1c2VzIHRoZSBzYW1lIGNoZWNrIGlmIHRoZSBhcmd1bWVudCBpcyBhIERPTSBlbGVtZW50IHRoYXQgQmxhemUuX0RPTVJhbmdlLmZvckVsZW1lbnQgZG9lcy5cbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJFeHBlY3RlZCBET00gZWxlbWVudC5cIiB1bmxlc3MgZG9tRWxlbWVudC5ub2RlVHlwZSBpcyBOb2RlLkVMRU1FTlRfTk9ERVxuXG4gICAgIyBGb3IgRE9NIGVsZW1lbnRzIHdlIHdhbnQgdG8gcmV0dXJuIHRoZSBjb21wb25lbnQgd2hpY2ggbWF0Y2hlcyB0aGUgdGVtcGxhdGVcbiAgICAjIHdpdGggdGhhdCBET00gZWxlbWVudCBhbmQgbm90IHRoZSBjb21wb25lbnQgY2xvc2VzdCBpbiB0aGUgY29tcG9uZW50IHRyZWUuXG4gICAgIyBTbyB3ZSBza2lwIHRoZSBibG9jayBoZWxwZXJzLiAoSWYgRE9NIGVsZW1lbnQgaXMgcmVuZGVyZWQgYnkgdGhlIGJsb2NrIGhlbHBlclxuICAgICMgdGhpcyB3aWxsIGZpbmQgdGhhdCBibG9jayBoZWxwZXIgdGVtcGxhdGUvY29tcG9uZW50LilcbiAgICB0ZW1wbGF0ZUluc3RhbmNlID0gZ2V0VGVtcGxhdGVJbnN0YW5jZUZ1bmN0aW9uIEJsYXplLmdldFZpZXcoZG9tRWxlbWVudCksIHRydWVcbiAgICB0ZW1wbGF0ZUluc3RhbmNlVG9Db21wb25lbnQgdGVtcGxhdGVJbnN0YW5jZSwgdHJ1ZVxuXG4gIG1peGluczogLT5cbiAgICBbXVxuXG4gICMgV2hlbiBhIGNvbXBvbmVudCBpcyB1c2VkIGFzIGEgbWl4aW4sIGNyZWF0ZU1peGlucyB3aWxsIGNhbGwgdGhpcyBtZXRob2QgdG8gc2V0IHRoZSBwYXJlbnRcbiAgIyBjb21wb25lbnQgdXNpbmcgdGhpcyBtaXhpbi4gRXh0ZW5kIHRoaXMgbWV0aG9kIGlmIHlvdSB3YW50IHRvIGRvIGFueSBhY3Rpb24gd2hlbiBwYXJlbnQgaXNcbiAgIyBzZXQsIGZvciBleGFtcGxlLCBhZGQgZGVwZW5kZW5jeSBtaXhpbnMgdG8gdGhlIHBhcmVudC4gTWFrZSBzdXJlIHlvdSBjYWxsIHN1cGVyIGFzIHdlbGwuXG4gIG1peGluUGFyZW50OiAobWl4aW5QYXJlbnQpIC0+XG4gICAgQF9jb21wb25lbnRJbnRlcm5hbHMgPz0ge31cblxuICAgICMgU2V0dGVyLlxuICAgIGlmIG1peGluUGFyZW50XG4gICAgICBAX2NvbXBvbmVudEludGVybmFscy5taXhpblBhcmVudCA9IG1peGluUGFyZW50XG4gICAgICAjIFRvIGFsbG93IGNoYWluaW5nLlxuICAgICAgcmV0dXJuIEBcblxuICAgICMgR2V0dGVyLlxuICAgIEBfY29tcG9uZW50SW50ZXJuYWxzLm1peGluUGFyZW50IG9yIG51bGxcblxuICByZXF1aXJlTWl4aW46IChuYW1lT3JNaXhpbikgLT5cbiAgICBhc3NlcnQgQF9jb21wb25lbnRJbnRlcm5hbHM/Lm1peGluc1xuXG4gICAgVHJhY2tlci5ub25yZWFjdGl2ZSA9PlxuICAgICAgIyBEbyBub3QgZG8gYW55dGhpbmcgaWYgbWl4aW4gaXMgYWxyZWFkeSByZXF1aXJlZC4gVGhpcyBhbGxvd3MgbXVsdGlwbGUgbWl4aW5zIHRvIGNhbGwgcmVxdWlyZU1peGluXG4gICAgICAjIGluIG1peGluUGFyZW50IG1ldGhvZCB0byBhZGQgZGVwZW5kZW5jaWVzLCBidXQgaWYgZGVwZW5kZW5jaWVzIGFyZSBhbHJlYWR5IHRoZXJlLCBub3RoaW5nIGhhcHBlbnMuXG4gICAgICByZXR1cm4gaWYgQGdldE1peGluIG5hbWVPck1peGluXG5cbiAgICAgIGlmIF8uaXNTdHJpbmcgbmFtZU9yTWl4aW5cbiAgICAgICAgIyBJdCBjb3VsZCBiZSB0aGF0IHRoZSBjb21wb25lbnQgaXMgbm90IGEgcmVhbCBpbnN0YW5jZSBvZiB0aGUgQmxhemVDb21wb25lbnQgY2xhc3MsXG4gICAgICAgICMgc28gaXQgbWlnaHQgbm90IGhhdmUgYSBjb25zdHJ1Y3RvciBwb2ludGluZyBiYWNrIHRvIGEgQmxhemVDb21wb25lbnQgc3ViY2xhc3MuXG4gICAgICAgIGlmIEBjb25zdHJ1Y3Rvci5nZXRDb21wb25lbnRcbiAgICAgICAgICBtaXhpbkluc3RhbmNlQ29tcG9uZW50ID0gQGNvbnN0cnVjdG9yLmdldENvbXBvbmVudCBuYW1lT3JNaXhpblxuICAgICAgICBlbHNlXG4gICAgICAgICAgbWl4aW5JbnN0YW5jZUNvbXBvbmVudCA9IEJsYXplQ29tcG9uZW50LmdldENvbXBvbmVudCBuYW1lT3JNaXhpblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IgXCJVbmtub3duIG1peGluICcje25hbWVPck1peGlufScuXCIgdW5sZXNzIG1peGluSW5zdGFuY2VDb21wb25lbnRcbiAgICAgICAgbWl4aW5JbnN0YW5jZSA9IG5ldyBtaXhpbkluc3RhbmNlQ29tcG9uZW50KClcbiAgICAgIGVsc2UgaWYgXy5pc0Z1bmN0aW9uIG5hbWVPck1peGluXG4gICAgICAgIG1peGluSW5zdGFuY2UgPSBuZXcgbmFtZU9yTWl4aW4oKVxuICAgICAgZWxzZVxuICAgICAgICBtaXhpbkluc3RhbmNlID0gbmFtZU9yTWl4aW5cblxuICAgICAgIyBXZSBhZGQgbWl4aW4gYmVmb3JlIHdlIGNhbGwgbWl4aW5QYXJlbnQgc28gdGhhdCBkZXBlbmRlbmNpZXMgY29tZSBhZnRlciB0aGlzIG1peGluLFxuICAgICAgIyBhbmQgdGhhdCB3ZSBwcmV2ZW50IHBvc3NpYmxlIGluZmluaXRlIGxvb3BzIGJlY2F1c2Ugb2YgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuICAgICAgIyBUT0RPOiBGb3Igbm93IHdlIGRvIG5vdCBwcm92aWRlIGFuIG9mZmljaWFsIEFQSSB0byBhZGQgZGVwZW5kZW5jaWVzIGJlZm9yZSB0aGUgbWl4aW4gaXRzZWxmLlxuICAgICAgQF9jb21wb25lbnRJbnRlcm5hbHMubWl4aW5zLnB1c2ggbWl4aW5JbnN0YW5jZVxuXG4gICAgICAjIFdlIGFsbG93IG1peGlucyB0byBub3QgYmUgY29tcG9uZW50cywgc28gbWV0aG9kcyBhcmUgbm90IG5lY2Vzc2FyeSBhdmFpbGFibGUuXG5cbiAgICAgICMgU2V0IG1peGluIHBhcmVudC5cbiAgICAgIGlmIG1peGluSW5zdGFuY2UubWl4aW5QYXJlbnRcbiAgICAgICAgbWl4aW5JbnN0YW5jZS5taXhpblBhcmVudCBAXG5cbiAgICAgICMgTWF5YmUgbWl4aW4gaGFzIGl0cyBvd24gbWl4aW5zIGFzIHdlbGwuXG4gICAgICBtaXhpbkluc3RhbmNlLmNyZWF0ZU1peGlucz8oKVxuXG4gICAgICBAX2NvbXBvbmVudEludGVybmFscy50ZW1wbGF0ZUluc3RhbmNlID89IG5ldyBSZWFjdGl2ZUZpZWxkIG51bGwsIChhLCBiKSAtPiBhIGlzIGJcblxuICAgICAgIyBJZiBhIG1peGluIGlzIGFkZGluZyBhIGRlcGVuZGVuY3kgdXNpbmcgcmVxdWlyZU1peGluIGFmdGVyIGl0cyBtaXhpblBhcmVudCBjbGFzcyAoZm9yIGV4YW1wbGUsIGluIG9uQ3JlYXRlKVxuICAgICAgIyBhbmQgdGhpcyBpcyB0aGlzIGRlcGVuZGVuY3kgbWl4aW4sIHRoZSB2aWV3IG1pZ2h0IGFscmVhZHkgYmUgY3JlYXRlZCBvciByZW5kZXJlZCBhbmQgY2FsbGJhY2tzIHdlcmVcbiAgICAgICMgYWxyZWFkeSBjYWxsZWQsIHNvIHdlIHNob3VsZCBjYWxsIHRoZW0gbWFudWFsbHkgaGVyZSBhcyB3ZWxsLiBCdXQgb25seSBpZiBoZSB2aWV3IGhhcyBub3QgYmVlbiBkZXN0cm95ZWRcbiAgICAgICMgYWxyZWFkeS4gRm9yIHRob3NlIG1peGlucyB3ZSBkbyBub3QgY2FsbCBhbnl0aGluZywgdGhlcmUgaXMgbGl0dGxlIHVzZSBmb3IgdGhlbSBub3cuXG4gICAgICB1bmxlc3MgQF9jb21wb25lbnRJbnRlcm5hbHMudGVtcGxhdGVJbnN0YW5jZSgpPy52aWV3LmlzRGVzdHJveWVkXG4gICAgICAgIG1peGluSW5zdGFuY2Uub25DcmVhdGVkPygpIGlmIG5vdCBAX2NvbXBvbmVudEludGVybmFscy5pbk9uQ3JlYXRlZCBhbmQgQF9jb21wb25lbnRJbnRlcm5hbHMudGVtcGxhdGVJbnN0YW5jZSgpPy52aWV3LmlzQ3JlYXRlZFxuICAgICAgICBtaXhpbkluc3RhbmNlLm9uUmVuZGVyZWQ/KCkgaWYgbm90IEBfY29tcG9uZW50SW50ZXJuYWxzLmluT25SZW5kZXJlZCBhbmQgQF9jb21wb25lbnRJbnRlcm5hbHMudGVtcGxhdGVJbnN0YW5jZSgpPy52aWV3LmlzUmVuZGVyZWRcblxuICAgICMgVG8gYWxsb3cgY2hhaW5pbmcuXG4gICAgQFxuXG4gICMgTWV0aG9kIHRvIGluc3RhbnRpYXRlIGFsbCBtaXhpbnMuXG4gIGNyZWF0ZU1peGluczogLT5cbiAgICBAX2NvbXBvbmVudEludGVybmFscyA/PSB7fVxuXG4gICAgIyBUbyBhbGxvdyBjYWxsaW5nIGl0IG11bHRpcGxlIHRpbWVzLCBidXQgbm9uLWZpcnN0IGNhbGxzIGFyZSBzaW1wbHkgaWdub3JlZC5cbiAgICByZXR1cm4gaWYgQF9jb21wb25lbnRJbnRlcm5hbHMubWl4aW5zXG4gICAgQF9jb21wb25lbnRJbnRlcm5hbHMubWl4aW5zID0gW11cblxuICAgIGZvciBtaXhpbiBpbiBAbWl4aW5zKClcbiAgICAgIEByZXF1aXJlTWl4aW4gbWl4aW5cblxuICAgICMgVG8gYWxsb3cgY2hhaW5pbmcuXG4gICAgQFxuXG4gIGdldE1peGluOiAobmFtZU9yTWl4aW4pIC0+XG4gICAgYXNzZXJ0IEBfY29tcG9uZW50SW50ZXJuYWxzPy5taXhpbnNcblxuICAgIGlmIF8uaXNTdHJpbmcgbmFtZU9yTWl4aW5cbiAgICAgIGZvciBtaXhpbiBpbiBAX2NvbXBvbmVudEludGVybmFscy5taXhpbnNcbiAgICAgICAgIyBXZSBkbyBub3QgcmVxdWlyZSBtaXhpbnMgdG8gYmUgY29tcG9uZW50cywgYnV0IGlmIHRoZXkgYXJlLCB0aGV5IGNhblxuICAgICAgICAjIGJlIHJlZmVyZW5jZWQgYmFzZWQgb24gdGhlaXIgY29tcG9uZW50IG5hbWUuXG4gICAgICAgIG1peGluQ29tcG9uZW50TmFtZSA9IG1peGluLmNvbXBvbmVudE5hbWU/KCkgb3IgbnVsbFxuICAgICAgICByZXR1cm4gbWl4aW4gaWYgbWl4aW5Db21wb25lbnROYW1lIGFuZCBtaXhpbkNvbXBvbmVudE5hbWUgaXMgbmFtZU9yTWl4aW5cblxuICAgIGVsc2VcbiAgICAgIGZvciBtaXhpbiBpbiBAX2NvbXBvbmVudEludGVybmFscy5taXhpbnNcbiAgICAgICAgIyBuYW1lT3JNaXhpbiBpcyBhIGNsYXNzLlxuICAgICAgICBpZiBtaXhpbi5jb25zdHJ1Y3RvciBpcyBuYW1lT3JNaXhpblxuICAgICAgICAgIHJldHVybiBtaXhpblxuXG4gICAgICAgICMgbmFtZU9yTWl4aW4gaXMgYW4gaW5zdGFuY2UsIG9yIHNvbWV0aGluZyBlbHNlLlxuICAgICAgICBlbHNlIGlmIG1peGluIGlzIG5hbWVPck1peGluXG4gICAgICAgICAgcmV0dXJuIG1peGluXG5cbiAgICBudWxsXG5cbiAgIyBDYWxscyB0aGUgY29tcG9uZW50IChpZiBhZnRlckNvbXBvbmVudE9yTWl4aW4gaXMgbnVsbCkgb3IgdGhlIGZpcnN0IG5leHQgbWl4aW5cbiAgIyBhZnRlciBhZnRlckNvbXBvbmVudE9yTWl4aW4gaXQgZmluZHMsIGFuZCByZXR1cm5zIHRoZSByZXN1bHQuXG4gIGNhbGxGaXJzdFdpdGg6IChhZnRlckNvbXBvbmVudE9yTWl4aW4sIHByb3BlcnR5TmFtZSwgYXJncy4uLikgLT5cbiAgICBtaXhpbiA9IEBnZXRGaXJzdFdpdGggYWZ0ZXJDb21wb25lbnRPck1peGluLCBwcm9wZXJ0eU5hbWVcblxuICAgICMgVE9ETzogU2hvdWxkIHdlIHRocm93IGFuIGVycm9yIGhlcmU/IFNvbWV0aGluZyBsaWtlIGNhbGxpbmcgYSBmdW5jdGlvbiB3aGljaCBkb2VzIG5vdCBleGlzdD9cbiAgICByZXR1cm4gdW5sZXNzIG1peGluXG5cbiAgICBpZiBfLmlzRnVuY3Rpb24gbWl4aW5bcHJvcGVydHlOYW1lXVxuICAgICAgcmV0dXJuIG1peGluW3Byb3BlcnR5TmFtZV0gYXJncy4uLlxuICAgIGVsc2VcbiAgICAgIHJldHVybiBtaXhpbltwcm9wZXJ0eU5hbWVdXG5cbiAgZ2V0Rmlyc3RXaXRoOiAoYWZ0ZXJDb21wb25lbnRPck1peGluLCBwcm9wZXJ0eU5hbWUpIC0+XG4gICAgYXNzZXJ0IEBfY29tcG9uZW50SW50ZXJuYWxzPy5taXhpbnNcblxuICAgICMgSWYgYWZ0ZXJDb21wb25lbnRPck1peGluIGlzIG5vdCBwcm92aWRlZCwgd2Ugc3RhcnQgd2l0aCB0aGUgY29tcG9uZW50LlxuICAgIGlmIG5vdCBhZnRlckNvbXBvbmVudE9yTWl4aW5cbiAgICAgIHJldHVybiBAIGlmIHByb3BlcnR5TmFtZSBvZiBAXG4gICAgICAjIEFuZCBjb250aW51ZSB3aXRoIG1peGlucy5cbiAgICAgIGZvdW5kID0gdHJ1ZVxuICAgICMgSWYgYWZ0ZXJDb21wb25lbnRPck1peGluIGlzIHRoZSBjb21wb25lbnQsIHdlIHN0YXJ0IHdpdGggbWl4aW5zLlxuICAgIGVsc2UgaWYgYWZ0ZXJDb21wb25lbnRPck1peGluIGFuZCBhZnRlckNvbXBvbmVudE9yTWl4aW4gaXMgQFxuICAgICAgZm91bmQgPSB0cnVlXG4gICAgZWxzZVxuICAgICAgZm91bmQgPSBmYWxzZVxuXG4gICAgIyBUT0RPOiBJbXBsZW1lbnQgd2l0aCBhIG1hcCBiZXR3ZWVuIG1peGluIC0+IHBvc2l0aW9uLCBzbyB0aGF0IHdlIGRvIG5vdCBoYXZlIHRvIHNlZWsgdG8gZmluZCBhIG1peGluLlxuICAgIGZvciBtaXhpbiBpbiBAX2NvbXBvbmVudEludGVybmFscy5taXhpbnNcbiAgICAgIHJldHVybiBtaXhpbiBpZiBmb3VuZCBhbmQgcHJvcGVydHlOYW1lIG9mIG1peGluXG5cbiAgICAgIGZvdW5kID0gdHJ1ZSBpZiBtaXhpbiBpcyBhZnRlckNvbXBvbmVudE9yTWl4aW5cblxuICAgIG51bGxcblxuICAjIFRoaXMgY2xhc3MgbWV0aG9kIG1vcmUgb3IgbGVzcyBqdXN0IGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgYSBjb21wb25lbnQgYW5kIGNhbGxzIGl0cyByZW5kZXJDb21wb25lbnRcbiAgIyBtZXRob2QuIEJ1dCBiZWNhdXNlIHdlIHdhbnQgdG8gYWxsb3cgcGFzc2luZyBhcmd1bWVudHMgdG8gdGhlIGNvbXBvbmVudCBpbiB0ZW1wbGF0ZXMsIHdlIGhhdmUgc29tZVxuICAjIGNvbXBsaWNhdGVkIGNvZGUgYXJvdW5kIHRvIGV4dHJhY3QgYW5kIHBhc3MgdGhvc2UgYXJndW1lbnRzLiBJdCBpcyBzaW1pbGFyIHRvIGhvdyBkYXRhIGNvbnRleHQgaXNcbiAgIyBwYXNzZWQgdG8gYmxvY2sgaGVscGVycy4gSW4gYSBkYXRhIGNvbnRleHQgdmlzaWJsZSBvbmx5IHRvIHRoZSBibG9jayBoZWxwZXIgdGVtcGxhdGUuXG4gICMgVE9ETzogVGhpcyBjb3VsZCBiZSBtYWRlIGxlc3MgaGFja3kuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWV0ZW9yL21ldGVvci9pc3N1ZXMvMzkxM1xuICBAcmVuZGVyQ29tcG9uZW50OiAocGFyZW50Q29tcG9uZW50KSAtPlxuICAgIFRyYWNrZXIubm9ucmVhY3RpdmUgPT5cbiAgICAgIGNvbXBvbmVudENsYXNzID0gQFxuXG4gICAgICBpZiBCbGF6ZS5jdXJyZW50Vmlld1xuICAgICAgICAjIFdlIGNoZWNrIGRhdGEgY29udGV4dCBpbiBhIG5vbi1yZWFjdGl2ZSB3YXksIGJlY2F1c2Ugd2Ugd2FudCBqdXN0IHRvIHBlZWsgaW50byBpdFxuICAgICAgICAjIGFuZCBkZXRlcm1pbmUgaWYgZGF0YSBjb250ZXh0IGNvbnRhaW5zIGNvbXBvbmVudCBhcmd1bWVudHMgb3Igbm90LiBBbmQgd2hpbGVcbiAgICAgICAgIyBjb21wb25lbnQgYXJndW1lbnRzIG1pZ2h0IGNoYW5nZSB0aHJvdWdoIHRpbWUsIHRoZSBmYWN0IHRoYXQgdGhleSBhcmUgdGhlcmUgYXRcbiAgICAgICAgIyBhbGwgb3Igbm90IChcImFyZ3NcIiB0ZW1wbGF0ZSBoZWxwZXIgd2FzIHVzZWQgb3Igbm90KSBkb2VzIG5vdCBjaGFuZ2UgdGhyb3VnaCB0aW1lLlxuICAgICAgICAjIFNvIHdlIGNhbiBjaGVjayB0aGF0IG5vbi1yZWFjdGl2ZWx5LlxuICAgICAgICBkYXRhID0gVGVtcGxhdGUuY3VycmVudERhdGEoKVxuICAgICAgZWxzZVxuICAgICAgICAjIFRoZXJlIGlzIG5vIGN1cnJlbnQgdmlldyB3aGVuIHRoZXJlIGlzIG5vIGRhdGEgY29udGV4dCB5ZXQsIHRodXMgYWxzbyBubyBhcmd1bWVudHNcbiAgICAgICAgIyB3ZXJlIHByb3ZpZGVkIHRocm91Z2ggXCJhcmdzXCIgdGVtcGxhdGUgaGVscGVyLCBzbyB3ZSBqdXN0IGNvbnRpbnVlIG5vcm1hbGx5LlxuICAgICAgICBkYXRhID0gbnVsbFxuXG4gICAgICBpZiBkYXRhPy5jb25zdHJ1Y3RvciBpc250IGFyZ3VtZW50c0NvbnN0cnVjdG9yXG4gICAgICAgICMgU28gdGhhdCBjdXJyZW50Q29tcG9uZW50IGluIHRoZSBjb25zdHJ1Y3RvciBjYW4gcmV0dXJuIHRoZSBjb21wb25lbnRcbiAgICAgICAgIyBpbnNpZGUgd2hpY2ggdGhpcyBjb21wb25lbnQgaGFzIGJlZW4gY29uc3RydWN0ZWQuXG4gICAgICAgIHJldHVybiB3cmFwVmlld0FuZFRlbXBsYXRlIEJsYXplLmN1cnJlbnRWaWV3LCA9PlxuICAgICAgICAgIGNvbXBvbmVudCA9IG5ldyBjb21wb25lbnRDbGFzcygpXG5cbiAgICAgICAgICByZXR1cm4gY29tcG9uZW50LnJlbmRlckNvbXBvbmVudCBwYXJlbnRDb21wb25lbnRcblxuICAgICAgIyBBcmd1bWVudHMgd2VyZSBwcm92aWRlZCB0aHJvdWdoIFwiYXJnc1wiIHRlbXBsYXRlIGhlbHBlci5cblxuICAgICAgIyBXZSB3YW50IHRvIHJlYWN0aXZlbHkgZGVwZW5kIG9uIHRoZSBkYXRhIGNvbnRleHQgZm9yIGFyZ3VtZW50cywgc28gd2UgcmV0dXJuIGEgZnVuY3Rpb25cbiAgICAgICMgaW5zdGVhZCBvZiBhIHRlbXBsYXRlLiBGdW5jdGlvbiB3aWxsIGJlIHJ1biBpbnNpZGUgYW4gYXV0b3J1biwgYSByZWFjdGl2ZSBjb250ZXh0LlxuICAgICAgLT5cbiAgICAgICAgYXNzZXJ0IFRyYWNrZXIuYWN0aXZlXG5cbiAgICAgICAgIyBXZSBjYW5ub3QgdXNlIFRlbXBsYXRlLmdldERhdGEoKSBpbnNpZGUgYSBub3JtYWwgYXV0b3J1biBiZWNhdXNlIGN1cnJlbnQgdmlldyBpcyBub3QgZGVmaW5lZCBpbnNpZGVcbiAgICAgICAgIyBhIG5vcm1hbCBhdXRvcnVuLiBCdXQgd2UgZG8gbm90IHJlYWxseSBoYXZlIHRvIGRlcGVuZCByZWFjdGl2ZWx5IG9uIHRoZSBjdXJyZW50IHZpZXcsIG9ubHkgb24gdGhlXG4gICAgICAgICMgZGF0YSBjb250ZXh0IG9mIGEga25vd24gKHRoZSBjbG9zZXN0IEJsYXplLldpdGgpIHZpZXcuIFNvIHdlIGdldCB0aGlzIHZpZXcgYnkgb3Vyc2VsdmVzLlxuICAgICAgICBjdXJyZW50V2l0aCA9IEJsYXplLmdldFZpZXcgJ3dpdGgnXG5cbiAgICAgICAgIyBCeSBkZWZhdWx0IGRhdGFWYXIgaW4gdGhlIEJsYXplLldpdGggdmlldyB1c2VzIFJlYWN0aXZlVmFyIHdpdGggZGVmYXVsdCBlcXVhbGl0eSBmdW5jdGlvbiB3aGljaFxuICAgICAgICAjIHNlZXMgYWxsIG9iamVjdHMgYXMgZGlmZmVyZW50LiBTbyBpbnZhbGlkYXRpb25zIGFyZSB0cmlnZ2VyZWQgZm9yIGV2ZXJ5IGRhdGEgY29udGV4dCBhc3NpZ25tZW50c1xuICAgICAgICAjIGV2ZW4gaWYgZGF0YSBoYXMgbm90IHJlYWxseSBjaGFuZ2VkLiBUaGlzIGlzIHdoeSB3cmFwIGl0IGludG8gYSBDb21wdXRlZEZpZWxkIHdpdGggRUpTT04uZXF1YWxzLlxuICAgICAgICAjIEJlY2F1c2UgaXQgdXNlcyBFSlNPTi5lcXVhbHMgaXQgd2lsbCBpbnZhbGlkYXRlIG91ciBmdW5jdGlvbiBvbmx5IGlmIHJlYWxseSBjaGFuZ2VzLlxuICAgICAgICAjIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWV0ZW9yL21ldGVvci9pc3N1ZXMvNDA3M1xuICAgICAgICByZWFjdGl2ZUFyZ3VtZW50cyA9IG5ldyBDb21wdXRlZEZpZWxkIC0+XG4gICAgICAgICAgZGF0YSA9IGN1cnJlbnRXaXRoLmRhdGFWYXIuZ2V0KClcbiAgICAgICAgICBhc3NlcnQuZXF1YWwgZGF0YT8uY29uc3RydWN0b3IsIGFyZ3VtZW50c0NvbnN0cnVjdG9yXG4gICAgICAgICAgZGF0YS5fYXJndW1lbnRzXG4gICAgICAgICxcbiAgICAgICAgICBFSlNPTi5lcXVhbHNcblxuICAgICAgICAjIEhlcmUgd2UgcmVnaXN0ZXIgYSByZWFjdGl2ZSBkZXBlbmRlbmN5IG9uIHRoZSBDb21wdXRlZEZpZWxkLlxuICAgICAgICBub25yZWFjdGl2ZUFyZ3VtZW50cyA9IHJlYWN0aXZlQXJndW1lbnRzKClcblxuICAgICAgICBUcmFja2VyLm5vbnJlYWN0aXZlIC0+XG4gICAgICAgICAgIyBBcmd1bWVudHMgd2VyZSBwYXNzZWQgaW4gYXMgYSBkYXRhIGNvbnRleHQuIFdlIHdhbnQgY3VycmVudERhdGEgaW4gdGhlIGNvbnN0cnVjdG9yIHRvIHJldHVybiB0aGVcbiAgICAgICAgICAjIG9yaWdpbmFsIChwYXJlbnQpIGRhdGEgY29udGV4dC4gTGlrZSB3ZSB3ZXJlIG5vdCBwYXNzaW5nIGluIGFyZ3VtZW50cyBhcyBhIGRhdGEgY29udGV4dC5cbiAgICAgICAgICB0ZW1wbGF0ZSA9IEJsYXplLl93aXRoQ3VycmVudFZpZXcgQmxhemUuY3VycmVudFZpZXcucGFyZW50Vmlldy5wYXJlbnRWaWV3LCA9PlxuICAgICAgICAgICAgIyBTbyB0aGF0IGN1cnJlbnRDb21wb25lbnQgaW4gdGhlIGNvbnN0cnVjdG9yIGNhbiByZXR1cm4gdGhlIGNvbXBvbmVudFxuICAgICAgICAgICAgIyBpbnNpZGUgd2hpY2ggdGhpcyBjb21wb25lbnQgaGFzIGJlZW4gY29uc3RydWN0ZWQuXG4gICAgICAgICAgICByZXR1cm4gd3JhcFZpZXdBbmRUZW1wbGF0ZSBCbGF6ZS5jdXJyZW50VmlldywgPT5cbiAgICAgICAgICAgICAgIyBVc2UgYXJndW1lbnRzIGZvciB0aGUgY29uc3RydWN0b3IuXG4gICAgICAgICAgICAgIGNvbXBvbmVudCA9IG5ldyBjb21wb25lbnRDbGFzcyBub25yZWFjdGl2ZUFyZ3VtZW50cy4uLlxuXG4gICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQucmVuZGVyQ29tcG9uZW50IHBhcmVudENvbXBvbmVudFxuXG4gICAgICAgICAgIyBJdCBoYXMgdG8gYmUgdGhlIGZpcnN0IGNhbGxiYWNrIHNvIHRoYXQgb3RoZXIgaGF2ZSBhIGNvcnJlY3QgZGF0YSBjb250ZXh0LlxuICAgICAgICAgIHJlZ2lzdGVyRmlyc3RDcmVhdGVkSG9vayB0ZW1wbGF0ZSwgLT5cbiAgICAgICAgICAgICMgQXJndW1lbnRzIHdlcmUgcGFzc2VkIGluIGFzIGEgZGF0YSBjb250ZXh0LiBSZXN0b3JlIG9yaWdpbmFsIChwYXJlbnQpIGRhdGFcbiAgICAgICAgICAgICMgY29udGV4dC4gU2FtZSBsb2dpYyBhcyBpbiBCbGF6ZS5fSW5PdXRlclRlbXBsYXRlU2NvcGUuXG4gICAgICAgICAgICBAdmlldy5vcmlnaW5hbFBhcmVudFZpZXcgPSBAdmlldy5wYXJlbnRWaWV3XG4gICAgICAgICAgICBAdmlldy5wYXJlbnRWaWV3ID0gQHZpZXcucGFyZW50Vmlldy5wYXJlbnRWaWV3LnBhcmVudFZpZXdcblxuICAgICAgICAgIHRlbXBsYXRlXG5cbiAgcmVuZGVyQ29tcG9uZW50OiAocGFyZW50Q29tcG9uZW50KSAtPlxuICAgICMgVG8gbWFrZSBzdXJlIHdlIGRvIG5vdCBpbnRyb2R1Y2UgYW55IHJlYWN0aXZlIGRlcGVuZGVuY3kuIFRoaXMgaXMgYSBjb25zY2lvdXMgZGVzaWduIGRlY2lzaW9uLlxuICAgICMgUmVhY3Rpdml0eSBzaG91bGQgYmUgY2hhbmdpbmcgZGF0YSBjb250ZXh0LCBidXQgY29tcG9uZW50cyBzaG91bGQgYmUgbW9yZSBzdGFibGUsIG9ubHkgY2hhbmdpbmdcbiAgICAjIHdoZW4gc3RydWN0dXJlIGNoYW5nZSBpbiByZW5kZXJlZCBET00uIFlvdSBjYW4gY2hhbmdlIHRoZSBjb21wb25lbnQgeW91IGFyZSBpbmNsdWRpbmcgKG9yIHBhc3NcbiAgICAjIGRpZmZlcmVudCBhcmd1bWVudHMpIHJlYWN0aXZlbHkgdGhvdWdoLlxuICAgIFRyYWNrZXIubm9ucmVhY3RpdmUgPT5cbiAgICAgIGNvbXBvbmVudCA9IEBcblxuICAgICAgIyBJZiBtaXhpbnMgaGF2ZSBub3QgeWV0IGJlZW4gY3JlYXRlZC5cbiAgICAgIGNvbXBvbmVudC5jcmVhdGVNaXhpbnMoKVxuXG4gICAgICB0ZW1wbGF0ZUJhc2UgPSBnZXRUZW1wbGF0ZUJhc2UgY29tcG9uZW50XG5cbiAgICAgICMgQ3JlYXRlIGEgbmV3IGNvbXBvbmVudCB0ZW1wbGF0ZSBiYXNlZCBvbiB0aGUgQmxhemUgdGVtcGxhdGUuIFdlIHdhbnQgb3VyIG93biB0ZW1wbGF0ZVxuICAgICAgIyBiZWNhdXNlIHRoZSBzYW1lIEJsYXplIHRlbXBsYXRlIGNvdWxkIGJlIHJldXNlZCBiZXR3ZWVuIG11bHRpcGxlIGNvbXBvbmVudHMuXG4gICAgICAjIFRPRE86IFNob3VsZCB3ZSBjYWNoZSB0aGVzZSB0ZW1wbGF0ZXMgYmFzZWQgb24gKGNvbXBvbmVudE5hbWUsIHRlbXBsYXRlQmFzZSkgcGFpcj8gV2UgY291bGQgdXNlIHR3byBsZXZlbHMgb2YgRVMyMDE1IE1hcHMsIGNvbXBvbmVudE5hbWUgLT4gdGVtcGxhdGVCYXNlIC0+IHRlbXBsYXRlLiBXaGF0IGFib3V0IGNvbXBvbmVudCBhcmd1bWVudHMgY2hhbmdpbmc/XG4gICAgICB0ZW1wbGF0ZSA9IG5ldyBCbGF6ZS5UZW1wbGF0ZSBcIkJsYXplQ29tcG9uZW50LiN7Y29tcG9uZW50LmNvbXBvbmVudE5hbWUoKSBvciAndW5uYW1lZCd9XCIsIHRlbXBsYXRlQmFzZS5yZW5kZXJGdW5jdGlvblxuXG4gICAgICAjIFdlIGxvb2t1cCBwcmVleGlzdGluZyB0ZW1wbGF0ZSBoZWxwZXJzIGluIEJsYXplLl9nZXRUZW1wbGF0ZUhlbHBlciwgaWYgdGhlIGNvbXBvbmVudCBkb2VzIG5vdCBoYXZlXG4gICAgICAjIGEgcHJvcGVydHkgd2l0aCB0aGUgc2FtZSBuYW1lLiBQcmVleGlzdGluZyBldmVudCBoYW5kbGVycyBhbmQgbGlmZS1jeWNsZSBob29rcyBhcmUgdGFrZW4gY2FyZSBvZlxuICAgICAgIyBpbiB0aGUgcmVsYXRlZCBtZXRob2RzIGluIHRoZSBiYXNlIGNsYXNzLlxuXG4gICAgICBjb21wb25lbnQuX2NvbXBvbmVudEludGVybmFscyA/PSB7fVxuICAgICAgY29tcG9uZW50Ll9jb21wb25lbnRJbnRlcm5hbHMudGVtcGxhdGVCYXNlID0gdGVtcGxhdGVCYXNlXG5cbiAgICAgIHJlZ2lzdGVySG9va3MgdGVtcGxhdGUsXG4gICAgICAgIG9uQ3JlYXRlZDogLT5cbiAgICAgICAgICAjIEAgaXMgYSB0ZW1wbGF0ZSBpbnN0YW5jZS5cblxuICAgICAgICAgIGlmIHBhcmVudENvbXBvbmVudFxuICAgICAgICAgICAgIyBjb21wb25lbnQucGFyZW50Q29tcG9uZW50IGlzIHJlYWN0aXZlLCBzbyB3ZSB1c2UgVHJhY2tlci5ub25yZWFjdGl2ZSBqdXN0IHRvIG1ha2Ugc3VyZSB3ZSBkbyBub3QgbGVhayBhbnkgcmVhY3Rpdml0eSBoZXJlLlxuICAgICAgICAgICAgVHJhY2tlci5ub25yZWFjdGl2ZSA9PlxuICAgICAgICAgICAgICAjIFRPRE86IFNob3VsZCB3ZSBzdXBwb3J0IHRoYXQgdGhlIHNhbWUgY29tcG9uZW50IGNhbiBiZSByZW5kZXJlZCBtdWx0aXBsZSB0aW1lcyBpbiBwYXJhbGxlbD8gSG93IGNvdWxkIHdlIGRvIHRoYXQ/IEZvciBkaWZmZXJlbnQgY29tcG9uZW50IHBhcmVudHMgb3Igb25seSB0aGUgc2FtZSBvbmU/XG4gICAgICAgICAgICAgIGFzc2VydCBub3QgY29tcG9uZW50LnBhcmVudENvbXBvbmVudCgpXG5cbiAgICAgICAgICAgICAgIyBXZSBzZXQgdGhlIHBhcmVudCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBpcyBjcmVhdGVkLCBub3QganVzdCBjb25zdHJ1Y3RlZC5cbiAgICAgICAgICAgICAgY29tcG9uZW50LnBhcmVudENvbXBvbmVudCBwYXJlbnRDb21wb25lbnRcbiAgICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LmFkZENoaWxkQ29tcG9uZW50IGNvbXBvbmVudFxuXG4gICAgICAgICAgQHZpZXcuX29uVmlld1JlbmRlcmVkID0+XG4gICAgICAgICAgICAjIEF0dGFjaCBldmVudHMgdGhlIGZpcnN0IHRpbWUgdGVtcGxhdGUgaW5zdGFuY2UgcmVuZGVycy5cbiAgICAgICAgICAgIHJldHVybiB1bmxlc3MgQHZpZXcucmVuZGVyQ291bnQgaXMgMVxuXG4gICAgICAgICAgICAjIFdlIGZpcnN0IGFkZCBldmVudCBoYW5kbGVycyBmcm9tIHRoZSBjb21wb25lbnQsIHRoZW4gbWl4aW5zLlxuICAgICAgICAgICAgY29tcG9uZW50T3JNaXhpbiA9IG51bGxcbiAgICAgICAgICAgIHdoaWxlIGNvbXBvbmVudE9yTWl4aW4gPSBAY29tcG9uZW50LmdldEZpcnN0V2l0aCBjb21wb25lbnRPck1peGluLCAnZXZlbnRzJ1xuICAgICAgICAgICAgICBhZGRFdmVudHMgQHZpZXcsIGNvbXBvbmVudE9yTWl4aW5cblxuICAgICAgICAgIEBjb21wb25lbnQgPSBjb21wb25lbnRcblxuICAgICAgICAgICMgVE9ETzogU2hvdWxkIHdlIHN1cHBvcnQgdGhhdCB0aGUgc2FtZSBjb21wb25lbnQgY2FuIGJlIHJlbmRlcmVkIG11bHRpcGxlIHRpbWVzIGluIHBhcmFsbGVsPyBIb3cgY291bGQgd2UgZG8gdGhhdD8gRm9yIGRpZmZlcmVudCBjb21wb25lbnQgcGFyZW50cyBvciBvbmx5IHRoZSBzYW1lIG9uZT9cbiAgICAgICAgICBhc3NlcnQgbm90IFRyYWNrZXIubm9ucmVhY3RpdmUgPT4gQGNvbXBvbmVudC5fY29tcG9uZW50SW50ZXJuYWxzLnRlbXBsYXRlSW5zdGFuY2U/KClcblxuICAgICAgICAgIEBjb21wb25lbnQuX2NvbXBvbmVudEludGVybmFscy50ZW1wbGF0ZUluc3RhbmNlID89IG5ldyBSZWFjdGl2ZUZpZWxkIEAsIChhLCBiKSAtPiBhIGlzIGJcbiAgICAgICAgICBAY29tcG9uZW50Ll9jb21wb25lbnRJbnRlcm5hbHMudGVtcGxhdGVJbnN0YW5jZSBAXG5cbiAgICAgICAgICBAY29tcG9uZW50Ll9jb21wb25lbnRJbnRlcm5hbHMuaXNDcmVhdGVkID89IG5ldyBSZWFjdGl2ZUZpZWxkIHRydWVcbiAgICAgICAgICBAY29tcG9uZW50Ll9jb21wb25lbnRJbnRlcm5hbHMuaXNDcmVhdGVkIHRydWVcblxuICAgICAgICAgICMgTWF5YmUgd2UgYXJlIHJlLXJlbmRlcmluZyB0aGUgY29tcG9uZW50LiBTbyBsZXQncyBpbml0aWFsaXplIHZhcmlhYmxlcyBqdXN0IHRvIGJlIHN1cmUuXG5cbiAgICAgICAgICBAY29tcG9uZW50Ll9jb21wb25lbnRJbnRlcm5hbHMuaXNSZW5kZXJlZCA/PSBuZXcgUmVhY3RpdmVGaWVsZCBmYWxzZVxuICAgICAgICAgIEBjb21wb25lbnQuX2NvbXBvbmVudEludGVybmFscy5pc1JlbmRlcmVkIGZhbHNlXG5cbiAgICAgICAgICBAY29tcG9uZW50Ll9jb21wb25lbnRJbnRlcm5hbHMuaXNEZXN0cm95ZWQgPz0gbmV3IFJlYWN0aXZlRmllbGQgZmFsc2VcbiAgICAgICAgICBAY29tcG9uZW50Ll9jb21wb25lbnRJbnRlcm5hbHMuaXNEZXN0cm95ZWQgZmFsc2VcblxuICAgICAgICAgIHRyeVxuICAgICAgICAgICAgIyBXZSBoYXZlIHRvIGtub3cgaWYgd2Ugc2hvdWxkIGNhbGwgb25DcmVhdGVkIG9uIHRoZSBtaXhpbiBpbnNpZGUgdGhlIHJlcXVpcmVNaXhpbiBvciBub3QuIFdlIHdhbnQgdG8gY2FsbFxuICAgICAgICAgICAgIyBpdCBvbmx5IG9uY2UuIElmIGl0IHJlcXVpcmVNaXhpbiBpcyBjYWxsZWQgZnJvbSBvbkNyZWF0ZWQgb2YgYW5vdGhlciBtaXhpbiwgdGhlbiBpdCB3aWxsIGJlIGFkZGVkIGF0IHRoZVxuICAgICAgICAgICAgIyBlbmQgYW5kIHdlIHdpbGwgZ2V0IGl0IGhlcmUgYXQgdGhlIGVuZC4gU28gd2Ugc2hvdWxkIG5vdCBjYWxsIG9uQ3JlYXRlZCBpbnNpZGUgcmVxdWlyZU1peGluIGJlY2F1c2UgdGhlblxuICAgICAgICAgICAgIyBvbkNyZWF0ZWQgd291bGQgYmUgY2FsbGVkIHR3aWNlLlxuICAgICAgICAgICAgQGNvbXBvbmVudC5fY29tcG9uZW50SW50ZXJuYWxzLmluT25DcmVhdGVkID0gdHJ1ZVxuICAgICAgICAgICAgY29tcG9uZW50T3JNaXhpbiA9IG51bGxcbiAgICAgICAgICAgIHdoaWxlIGNvbXBvbmVudE9yTWl4aW4gPSBAY29tcG9uZW50LmdldEZpcnN0V2l0aCBjb21wb25lbnRPck1peGluLCAnb25DcmVhdGVkJ1xuICAgICAgICAgICAgICBjb21wb25lbnRPck1peGluLm9uQ3JlYXRlZCgpXG4gICAgICAgICAgZmluYWxseVxuICAgICAgICAgICAgZGVsZXRlIEBjb21wb25lbnQuX2NvbXBvbmVudEludGVybmFscy5pbk9uQ3JlYXRlZFxuXG4gICAgICAgIG9uUmVuZGVyZWQ6IC0+XG4gICAgICAgICAgIyBAIGlzIGEgdGVtcGxhdGUgaW5zdGFuY2UuXG5cbiAgICAgICAgICBAY29tcG9uZW50Ll9jb21wb25lbnRJbnRlcm5hbHMuaXNSZW5kZXJlZCA/PSBuZXcgUmVhY3RpdmVGaWVsZCB0cnVlXG4gICAgICAgICAgQGNvbXBvbmVudC5fY29tcG9uZW50SW50ZXJuYWxzLmlzUmVuZGVyZWQgdHJ1ZVxuXG4gICAgICAgICAgVHJhY2tlci5ub25yZWFjdGl2ZSA9PlxuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsIEBjb21wb25lbnQuX2NvbXBvbmVudEludGVybmFscy5pc0NyZWF0ZWQoKSwgdHJ1ZVxuXG4gICAgICAgICAgdHJ5XG4gICAgICAgICAgICAjIFNhbWUgYXMgZm9yIG9uQ3JlYXRlZCBhYm92ZS5cbiAgICAgICAgICAgIEBjb21wb25lbnQuX2NvbXBvbmVudEludGVybmFscy5pbk9uUmVuZGVyZWQgPSB0cnVlXG4gICAgICAgICAgICBjb21wb25lbnRPck1peGluID0gbnVsbFxuICAgICAgICAgICAgd2hpbGUgY29tcG9uZW50T3JNaXhpbiA9IEBjb21wb25lbnQuZ2V0Rmlyc3RXaXRoIGNvbXBvbmVudE9yTWl4aW4sICdvblJlbmRlcmVkJ1xuICAgICAgICAgICAgICBjb21wb25lbnRPck1peGluLm9uUmVuZGVyZWQoKVxuICAgICAgICAgIGZpbmFsbHlcbiAgICAgICAgICAgIGRlbGV0ZSBAY29tcG9uZW50Ll9jb21wb25lbnRJbnRlcm5hbHMuaW5PblJlbmRlcmVkXG5cbiAgICAgICAgb25EZXN0cm95ZWQ6IC0+XG4gICAgICAgICAgQGF1dG9ydW4gKGNvbXB1dGF0aW9uKSA9PlxuICAgICAgICAgICAgIyBAIGlzIGEgdGVtcGxhdGUgaW5zdGFuY2UuXG5cbiAgICAgICAgICAgICMgV2Ugd2FpdCBmb3IgYWxsIGNoaWxkcmVuIGNvbXBvbmVudHMgdG8gYmUgZGVzdHJveWVkIGZpcnN0LlxuICAgICAgICAgICAgIyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21ldGVvci9tZXRlb3IvaXNzdWVzLzQxNjZcbiAgICAgICAgICAgIHJldHVybiBpZiBAY29tcG9uZW50LmNoaWxkQ29tcG9uZW50cygpLmxlbmd0aFxuICAgICAgICAgICAgY29tcHV0YXRpb24uc3RvcCgpXG5cbiAgICAgICAgICAgIFRyYWNrZXIubm9ucmVhY3RpdmUgPT5cbiAgICAgICAgICAgICAgYXNzZXJ0LmVxdWFsIEBjb21wb25lbnQuX2NvbXBvbmVudEludGVybmFscy5pc0NyZWF0ZWQoKSwgdHJ1ZVxuXG4gICAgICAgICAgICAgIEBjb21wb25lbnQuX2NvbXBvbmVudEludGVybmFscy5pc0NyZWF0ZWQgZmFsc2VcblxuICAgICAgICAgICAgICBAY29tcG9uZW50Ll9jb21wb25lbnRJbnRlcm5hbHMuaXNSZW5kZXJlZCA/PSBuZXcgUmVhY3RpdmVGaWVsZCBmYWxzZVxuICAgICAgICAgICAgICBAY29tcG9uZW50Ll9jb21wb25lbnRJbnRlcm5hbHMuaXNSZW5kZXJlZCBmYWxzZVxuXG4gICAgICAgICAgICAgIEBjb21wb25lbnQuX2NvbXBvbmVudEludGVybmFscy5pc0Rlc3Ryb3llZCA/PSBuZXcgUmVhY3RpdmVGaWVsZCB0cnVlXG4gICAgICAgICAgICAgIEBjb21wb25lbnQuX2NvbXBvbmVudEludGVybmFscy5pc0Rlc3Ryb3llZCB0cnVlXG5cbiAgICAgICAgICAgICAgY29tcG9uZW50T3JNaXhpbiA9IG51bGxcbiAgICAgICAgICAgICAgd2hpbGUgY29tcG9uZW50T3JNaXhpbiA9IEBjb21wb25lbnQuZ2V0Rmlyc3RXaXRoIGNvbXBvbmVudE9yTWl4aW4sICdvbkRlc3Ryb3llZCdcbiAgICAgICAgICAgICAgICBjb21wb25lbnRPck1peGluLm9uRGVzdHJveWVkKClcblxuICAgICAgICAgICAgICBpZiBwYXJlbnRDb21wb25lbnRcbiAgICAgICAgICAgICAgICAjIFRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLCBjbGVhciB1cCB0aGUgcGFyZW50LlxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5wYXJlbnRDb21wb25lbnQgbnVsbFxuICAgICAgICAgICAgICAgIHBhcmVudENvbXBvbmVudC5yZW1vdmVDaGlsZENvbXBvbmVudCBjb21wb25lbnRcblxuICAgICAgICAgICAgICAjIFJlbW92ZSB0aGUgcmVmZXJlbmNlIHNvIHRoYXQgaXQgaXMgY2xlYXIgdGhhdCB0ZW1wbGF0ZSBpbnN0YW5jZSBpcyBub3QgYXZhaWxhYmxlIGFueW1vcmUuXG4gICAgICAgICAgICAgIEBjb21wb25lbnQuX2NvbXBvbmVudEludGVybmFscy50ZW1wbGF0ZUluc3RhbmNlIG51bGxcblxuICAgICAgdGVtcGxhdGVcblxuICByZW1vdmVDb21wb25lbnQ6IC0+XG4gICAgQmxhemUucmVtb3ZlIEBfY29tcG9uZW50SW50ZXJuYWxzLnRlbXBsYXRlSW5zdGFuY2UoKS52aWV3IGlmIEBpc1JlbmRlcmVkKClcblxuICBAcmVuZGVyQ29tcG9uZW50VG9IVE1MOiAocGFyZW50Q29tcG9uZW50LCBwYXJlbnRWaWV3LCBkYXRhKSAtPlxuICAgIGNvbXBvbmVudCA9IFRyYWNrZXIubm9ucmVhY3RpdmUgPT5cbiAgICAgIGNvbXBvbmVudENsYXNzID0gQFxuXG4gICAgICBwYXJlbnRWaWV3ID0gcGFyZW50VmlldyBvciBjdXJyZW50Vmlld0lmUmVuZGVyaW5nKCkgb3IgKHBhcmVudENvbXBvbmVudD8uaXNSZW5kZXJlZCgpIGFuZCBwYXJlbnRDb21wb25lbnQuX2NvbXBvbmVudEludGVybmFscy50ZW1wbGF0ZUluc3RhbmNlKCkudmlldykgb3IgbnVsbFxuXG4gICAgICB3cmFwVmlld0FuZFRlbXBsYXRlIHBhcmVudFZpZXcsID0+XG4gICAgICAgIG5ldyBjb21wb25lbnRDbGFzcygpXG5cbiAgICBpZiBhcmd1bWVudHMubGVuZ3RoID4gMlxuICAgICAgY29tcG9uZW50LnJlbmRlckNvbXBvbmVudFRvSFRNTCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFZpZXcsIGRhdGFcbiAgICBlbHNlXG4gICAgICBjb21wb25lbnQucmVuZGVyQ29tcG9uZW50VG9IVE1MIHBhcmVudENvbXBvbmVudCwgcGFyZW50Vmlld1xuXG4gIHJlbmRlckNvbXBvbmVudFRvSFRNTDogKHBhcmVudENvbXBvbmVudCwgcGFyZW50VmlldywgZGF0YSkgLT5cbiAgICB0ZW1wbGF0ZSA9IFRyYWNrZXIubm9ucmVhY3RpdmUgPT5cbiAgICAgIHBhcmVudFZpZXcgPSBwYXJlbnRWaWV3IG9yIGN1cnJlbnRWaWV3SWZSZW5kZXJpbmcoKSBvciAocGFyZW50Q29tcG9uZW50Py5pc1JlbmRlcmVkKCkgYW5kIHBhcmVudENvbXBvbmVudC5fY29tcG9uZW50SW50ZXJuYWxzLnRlbXBsYXRlSW5zdGFuY2UoKS52aWV3KSBvciBudWxsXG5cbiAgICAgIHdyYXBWaWV3QW5kVGVtcGxhdGUgcGFyZW50VmlldywgPT5cbiAgICAgICAgQHJlbmRlckNvbXBvbmVudCBwYXJlbnRDb21wb25lbnRcblxuICAgIGlmIGFyZ3VtZW50cy5sZW5ndGggPiAyXG4gICAgICBleHBhbmRlZFZpZXcgPSBleHBhbmRWaWV3IEJsYXplLl9UZW1wbGF0ZVdpdGgoZGF0YSwgY29udGVudEFzRnVuYyB0ZW1wbGF0ZSksIHBhcmVudFZpZXdcbiAgICBlbHNlXG4gICAgICBleHBhbmRlZFZpZXcgPSBleHBhbmRWaWV3IGNvbnRlbnRBc1ZpZXcodGVtcGxhdGUpLCBwYXJlbnRWaWV3XG5cbiAgICBIVE1MLnRvSFRNTCBleHBhbmRlZFZpZXdcblxuICB0ZW1wbGF0ZTogLT5cbiAgICBAY2FsbEZpcnN0V2l0aChALCAndGVtcGxhdGUnKSBvciBAY29uc3RydWN0b3IuY29tcG9uZW50TmFtZSgpXG5cbiAgb25DcmVhdGVkOiAtPlxuICAgIGNhbGxUZW1wbGF0ZUJhc2VIb29rcyBALCAnY3JlYXRlZCdcblxuICBvblJlbmRlcmVkOiAtPlxuICAgIGNhbGxUZW1wbGF0ZUJhc2VIb29rcyBALCAncmVuZGVyZWQnXG5cbiAgb25EZXN0cm95ZWQ6IC0+XG4gICAgY2FsbFRlbXBsYXRlQmFzZUhvb2tzIEAsICdkZXN0cm95ZWQnXG5cbiAgaXNDcmVhdGVkOiAtPlxuICAgIEBfY29tcG9uZW50SW50ZXJuYWxzID89IHt9XG4gICAgQF9jb21wb25lbnRJbnRlcm5hbHMuaXNDcmVhdGVkID89IG5ldyBSZWFjdGl2ZUZpZWxkIGZhbHNlXG5cbiAgICBAX2NvbXBvbmVudEludGVybmFscy5pc0NyZWF0ZWQoKVxuXG4gIGlzUmVuZGVyZWQ6IC0+XG4gICAgQF9jb21wb25lbnRJbnRlcm5hbHMgPz0ge31cbiAgICBAX2NvbXBvbmVudEludGVybmFscy5pc1JlbmRlcmVkID89IG5ldyBSZWFjdGl2ZUZpZWxkIGZhbHNlXG5cbiAgICBAX2NvbXBvbmVudEludGVybmFscy5pc1JlbmRlcmVkKClcblxuICBpc0Rlc3Ryb3llZDogLT5cbiAgICBAX2NvbXBvbmVudEludGVybmFscyA/PSB7fVxuICAgIEBfY29tcG9uZW50SW50ZXJuYWxzLmlzRGVzdHJveWVkID89IG5ldyBSZWFjdGl2ZUZpZWxkIGZhbHNlXG5cbiAgICBAX2NvbXBvbmVudEludGVybmFscy5pc0Rlc3Ryb3llZCgpXG5cbiAgaW5zZXJ0RE9NRWxlbWVudDogKHBhcmVudCwgbm9kZSwgYmVmb3JlKSAtPlxuICAgIGJlZm9yZSA/PSBudWxsXG4gICAgaWYgcGFyZW50IGFuZCBub2RlIGFuZCAobm9kZS5wYXJlbnROb2RlIGlzbnQgcGFyZW50IG9yIG5vZGUubmV4dFNpYmxpbmcgaXNudCBiZWZvcmUpXG4gICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlIG5vZGUsIGJlZm9yZVxuXG4gICAgcmV0dXJuXG5cbiAgbW92ZURPTUVsZW1lbnQ6IChwYXJlbnQsIG5vZGUsIGJlZm9yZSkgLT5cbiAgICBiZWZvcmUgPz0gbnVsbFxuICAgIGlmIHBhcmVudCBhbmQgbm9kZSBhbmQgKG5vZGUucGFyZW50Tm9kZSBpc250IHBhcmVudCBvciBub2RlLm5leHRTaWJsaW5nIGlzbnQgYmVmb3JlKVxuICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSBub2RlLCBiZWZvcmVcblxuICAgIHJldHVyblxuXG4gIHJlbW92ZURPTUVsZW1lbnQ6IChwYXJlbnQsIG5vZGUpIC0+XG4gICAgaWYgcGFyZW50IGFuZCBub2RlIGFuZCBub2RlLnBhcmVudE5vZGUgaXMgcGFyZW50XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQgbm9kZVxuXG4gICAgcmV0dXJuXG5cbiAgZXZlbnRzOiAtPlxuICAgIEBfY29tcG9uZW50SW50ZXJuYWxzID89IHt9XG5cbiAgICAjIEluIG1peGlucyB3ZSBkbyBub3QgaGF2ZSBhIHRlbXBsYXRlIGluc3RhbmNlLiBUaGVyZSBpcyBhbHNvXG4gICAgIyBubyByZWFzb24gZm9yIGEgdGVtcGxhdGUgaW5zdGFuY2UgdG8gZXh0ZW5kIGEgQmxhemUgdGVtcGxhdGUuXG4gICAgcmV0dXJuIFtdIHVubGVzcyBAX2NvbXBvbmVudEludGVybmFscy50ZW1wbGF0ZUluc3RhbmNlXG5cbiAgICB2aWV3ID0gVHJhY2tlci5ub25yZWFjdGl2ZSA9PlxuICAgICAgQF9jb21wb25lbnRJbnRlcm5hbHMudGVtcGxhdGVJbnN0YW5jZSgpLnZpZXdcbiAgICAjIFdlIHNraXAgYmxvY2sgaGVscGVycyB0byBtYXRjaCBCbGF6ZSBiZWhhdmlvci5cbiAgICB0ZW1wbGF0ZUluc3RhbmNlID0gZ2V0VGVtcGxhdGVJbnN0YW5jZUZ1bmN0aW9uIHZpZXcsIHRydWVcblxuICAgIGZvciBldmVudHMgaW4gQF9jb21wb25lbnRJbnRlcm5hbHMudGVtcGxhdGVCYXNlLl9fZXZlbnRNYXBzXG4gICAgICBldmVudE1hcCA9IHt9XG5cbiAgICAgIGZvciBzcGVjLCBoYW5kbGVyIG9mIGV2ZW50c1xuICAgICAgICBkbyAoc3BlYywgaGFuZGxlcikgLT5cbiAgICAgICAgICBldmVudE1hcFtzcGVjXSA9IChhcmdzLi4uKSAtPlxuICAgICAgICAgICAgIyBJbiB0ZW1wbGF0ZSBldmVudCBoYW5kbGVycyB2aWV3IGFuZCB0ZW1wbGF0ZSBpbnN0YW5jZSBhcmUgbm90IGJhc2VkIG9uIHRoZSBjdXJyZW50IHRhcmdldFxuICAgICAgICAgICAgIyAobGlrZSBCbGF6ZSBDb21wb25lbnRzIGV2ZW50IGhhbmRsZXJzIGFyZSkgYnV0IGl0IGlzIGJhc2VkIG9uIHRoZSB0ZW1wbGF0ZS1sZXZlbCB2aWV3LlxuICAgICAgICAgICAgIyBJbiBhIHdheSB3ZSBhcmUgcmV2ZXJ0aW5nIGhlcmUgd2hhdCBhZGRFdmVudHMgZG9lcy5cbiAgICAgICAgICAgIHdpdGhUZW1wbGF0ZUluc3RhbmNlRnVuYyB0ZW1wbGF0ZUluc3RhbmNlLCAtPlxuICAgICAgICAgICAgICBCbGF6ZS5fd2l0aEN1cnJlbnRWaWV3IHZpZXcsIC0+XG4gICAgICAgICAgICAgICAgaGFuZGxlci5hcHBseSB2aWV3LCBhcmdzXG5cbiAgICAgIGV2ZW50TWFwXG5cbiAgIyBDb21wb25lbnQtbGV2ZWwgZGF0YSBjb250ZXh0LiBSZWFjdGl2ZS4gVXNlIHRoaXMgdG8gYWx3YXlzIGdldCB0aGVcbiAgIyB0b3AtbGV2ZWwgZGF0YSBjb250ZXh0IHVzZWQgdG8gcmVuZGVyIHRoZSBjb21wb25lbnQuIElmIHBhdGggaXNcbiAgIyBwcm92aWRlZCwgaXQgcmV0dXJucyBvbmx5IHRoZSB2YWx1ZSB1bmRlciB0aGF0IHBhdGgsIHdpdGggcmVhY3Rpdml0eVxuICAjIGxpbWl0ZWQgdG8gY2hhbmdlcyBvZiB0aGF0IHZhbHVlIG9ubHkuXG4gIGRhdGE6IChwYXRoLCBlcXVhbHNGdW5jKSAtPlxuICAgIEBfY29tcG9uZW50SW50ZXJuYWxzID89IHt9XG4gICAgQF9jb21wb25lbnRJbnRlcm5hbHMudGVtcGxhdGVJbnN0YW5jZSA/PSBuZXcgUmVhY3RpdmVGaWVsZCBudWxsLCAoYSwgYikgLT4gYSBpcyBiXG5cbiAgICBpZiB2aWV3ID0gQF9jb21wb25lbnRJbnRlcm5hbHMudGVtcGxhdGVJbnN0YW5jZSgpPy52aWV3XG4gICAgICBpZiBwYXRoP1xuICAgICAgICByZXR1cm4gRGF0YUxvb2t1cC5nZXQgPT5cbiAgICAgICAgICBCbGF6ZS5nZXREYXRhIHZpZXdcbiAgICAgICAgLFxuICAgICAgICAgIHBhdGgsIGVxdWFsc0Z1bmNcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIEJsYXplLmdldERhdGEgdmlld1xuXG4gICAgdW5kZWZpbmVkXG5cbiAgIyBDYWxsZXItbGV2ZWwgZGF0YSBjb250ZXh0LiBSZWFjdGl2ZS4gVXNlIHRoaXMgdG8gZ2V0IGluIGV2ZW50IGhhbmRsZXJzIHRoZSBkYXRhXG4gICMgY29udGV4dCBhdCB0aGUgcGxhY2Ugd2hlcmUgZXZlbnQgb3JpZ2luYXRlZCAodGFyZ2V0IGNvbnRleHQpLiBJbiB0ZW1wbGF0ZSBoZWxwZXJzXG4gICMgdGhlIGRhdGEgY29udGV4dCB3aGVyZSB0ZW1wbGF0ZSBoZWxwZXJzIHdlcmUgY2FsbGVkLiBJbiBvbkNyZWF0ZWQsIG9uUmVuZGVyZWQsXG4gICMgYW5kIG9uRGVzdHJveWVkLCB0aGUgc2FtZSBhcyBAZGF0YSgpLiBJbnNpZGUgYSB0ZW1wbGF0ZSB0aGlzIGlzIHRoZSBzYW1lIGFzIHRoaXMuXG4gICMgSWYgcGF0aCBpcyBwcm92aWRlZCwgaXQgcmV0dXJucyBvbmx5IHRoZSB2YWx1ZSB1bmRlciB0aGF0IHBhdGgsIHdpdGggcmVhY3Rpdml0eVxuICAjIGxpbWl0ZWQgdG8gY2hhbmdlcyBvZiB0aGF0IHZhbHVlIG9ubHkuIE1vcmVvdmVyLCBpZiBwYXRoIGlzIHByb3ZpZGVkIGlzIGFsc29cbiAgIyBsb29rcyBpbnRvIHRoZSBjdXJyZW50IGxleGljYWwgc2NvcGUgZGF0YS5cbiAgQGN1cnJlbnREYXRhOiAocGF0aCwgZXF1YWxzRnVuYykgLT5cbiAgICByZXR1cm4gdW5kZWZpbmVkIHVubGVzcyBCbGF6ZS5jdXJyZW50Vmlld1xuXG4gICAgY3VycmVudFZpZXcgPSBCbGF6ZS5jdXJyZW50Vmlld1xuXG4gICAgaWYgXy5pc1N0cmluZyBwYXRoXG4gICAgICBwYXRoID0gcGF0aC5zcGxpdCAnLidcbiAgICBlbHNlIGlmIG5vdCBfLmlzQXJyYXkgcGF0aFxuICAgICAgcmV0dXJuIEJsYXplLmdldERhdGEgY3VycmVudFZpZXdcblxuICAgIERhdGFMb29rdXAuZ2V0ID0+XG4gICAgICBpZiBCbGF6ZS5fbGV4aWNhbEJpbmRpbmdMb29rdXAgYW5kIGxleGljYWxEYXRhID0gQmxhemUuX2xleGljYWxCaW5kaW5nTG9va3VwIGN1cnJlbnRWaWV3LCBwYXRoWzBdXG4gICAgICAgICMgV2UgcmV0dXJuIGN1c3RvbSBkYXRhIG9iamVjdCBzbyB0aGF0IHdlIGNhbiByZXVzZSB0aGUgc2FtZVxuICAgICAgICAjIGxvb2t1cCBsb2dpYyBmb3IgYm90aCBsZXhpY2FsIGFuZCB0aGUgbm9ybWFsIGRhdGEgY29udGV4dCBjYXNlLlxuICAgICAgICByZXN1bHQgPSB7fVxuICAgICAgICByZXN1bHRbcGF0aFswXV0gPSBsZXhpY2FsRGF0YVxuICAgICAgICByZXR1cm4gcmVzdWx0XG5cbiAgICAgIEJsYXplLmdldERhdGEgY3VycmVudFZpZXdcbiAgICAsXG4gICAgICBwYXRoLCBlcXVhbHNGdW5jXG5cbiAgIyBNZXRob2Qgc2hvdWxkIG5ldmVyIGJlIG92ZXJyaWRkZW4uIFRoZSBpbXBsZW1lbnRhdGlvbiBzaG91bGQgYWx3YXlzIGJlIGV4YWN0bHkgdGhlIHNhbWUgYXMgY2xhc3MgbWV0aG9kIGltcGxlbWVudGF0aW9uLlxuICBjdXJyZW50RGF0YTogKHBhdGgsIGVxdWFsc0Z1bmMpIC0+XG4gICAgQGNvbnN0cnVjdG9yLmN1cnJlbnREYXRhIHBhdGgsIGVxdWFsc0Z1bmNcblxuICAjIFVzZWZ1bCBpbiB0ZW1wbGF0ZXMgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBjb21wb25lbnQuXG4gIGNvbXBvbmVudDogLT5cbiAgICBAXG5cbiAgIyBDYWxsZXItbGV2ZWwgY29tcG9uZW50LiBJbiBtb3N0IGNhc2VzIHRoZSBzYW1lIGFzIEAsIGJ1dCBpbiBldmVudCBoYW5kbGVyc1xuICAjIGl0IHJldHVybnMgdGhlIGNvbXBvbmVudCBhdCB0aGUgcGxhY2Ugd2hlcmUgZXZlbnQgb3JpZ2luYXRlZCAodGFyZ2V0IGNvbXBvbmVudCkuXG4gICMgSW5zaWRlIHRlbXBsYXRlIGNvbnRlbnQgd3JhcHBlZCB3aXRoIGEgYmxvY2sgaGVscGVyIGNvbXBvbmVudCwgaXQgaXMgdGhlIGNsb3Nlc3RcbiAgIyBibG9jayBoZWxwZXIgY29tcG9uZW50LlxuICBAY3VycmVudENvbXBvbmVudDogLT5cbiAgICAjIFdlIGFyZSBub3Qgc2tpcHBpbmcgYmxvY2sgaGVscGVycyBiZWNhdXNlIG9uZSBvZiBtYWluIHJlYXNvbnMgZm9yIEBjdXJyZW50Q29tcG9uZW50KClcbiAgICAjIGlzIHRoYXQgd2UgY2FuIGdldCBob2xkIG9mIHRoZSBibG9jayBoZWxwZXIgY29tcG9uZW50IGluc3RhbmNlLlxuICAgIHRlbXBsYXRlSW5zdGFuY2UgPSBnZXRUZW1wbGF0ZUluc3RhbmNlRnVuY3Rpb24gQmxhemUuY3VycmVudFZpZXcsIGZhbHNlXG4gICAgdGVtcGxhdGVJbnN0YW5jZVRvQ29tcG9uZW50IHRlbXBsYXRlSW5zdGFuY2UsIGZhbHNlXG5cbiAgIyBNZXRob2Qgc2hvdWxkIG5ldmVyIGJlIG92ZXJyaWRkZW4uIFRoZSBpbXBsZW1lbnRhdGlvbiBzaG91bGQgYWx3YXlzIGJlIGV4YWN0bHkgdGhlIHNhbWUgYXMgY2xhc3MgbWV0aG9kIGltcGxlbWVudGF0aW9uLlxuICBjdXJyZW50Q29tcG9uZW50OiAtPlxuICAgIEBjb25zdHJ1Y3Rvci5jdXJyZW50Q29tcG9uZW50KClcblxuICBmaXJzdE5vZGU6IC0+XG4gICAgcmV0dXJuIEBfY29tcG9uZW50SW50ZXJuYWxzLnRlbXBsYXRlSW5zdGFuY2UoKS52aWV3Ll9kb21yYW5nZS5maXJzdE5vZGUoKSBpZiBAaXNSZW5kZXJlZCgpXG5cbiAgICB1bmRlZmluZWRcblxuICBsYXN0Tm9kZTogLT5cbiAgICByZXR1cm4gQF9jb21wb25lbnRJbnRlcm5hbHMudGVtcGxhdGVJbnN0YW5jZSgpLnZpZXcuX2RvbXJhbmdlLmxhc3ROb2RlKCkgaWYgQGlzUmVuZGVyZWQoKVxuXG4gICAgdW5kZWZpbmVkXG5cbiAgIyBUaGUgc2FtZSBhcyBpdCB3b3VsZCBiZSBnZW5lcmF0ZWQgYXV0b21hdGljYWxseSwgb25seSB0aGF0IHRoZSBydW5GdW5jIGdldHMgYm91bmQgdG8gdGhlIGNvbXBvbmVudC5cbiAgYXV0b3J1bjogKHJ1bkZ1bmMpIC0+XG4gICAgdGVtcGxhdGVJbnN0YW5jZSA9IFRyYWNrZXIubm9ucmVhY3RpdmUgPT5cbiAgICAgIEBfY29tcG9uZW50SW50ZXJuYWxzPy50ZW1wbGF0ZUluc3RhbmNlPygpXG5cbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJUaGUgY29tcG9uZW50IGhhcyB0byBiZSBjcmVhdGVkIGJlZm9yZSBjYWxsaW5nICdhdXRvcnVuJy5cIiB1bmxlc3MgdGVtcGxhdGVJbnN0YW5jZVxuXG4gICAgdGVtcGxhdGVJbnN0YW5jZS5hdXRvcnVuIF8uYmluZCBydW5GdW5jLCBAXG5cblNVUFBPUlRTX1JFQUNUSVZFX0lOU1RBTkNFID0gW1xuICAnc3Vic2NyaXB0aW9uc1JlYWR5J1xuXVxuXG5SRVFVSVJFX1JFTkRFUkVEX0lOU1RBTkNFID0gW1xuICAnJCcsXG4gICdmaW5kJyxcbiAgJ2ZpbmRBbGwnXG5dXG5cbiMgV2UgY29weSB1dGlsaXR5IG1ldGhvZHMgKCQsIGZpbmRBbGwsIHN1YnNjcmliZSwgZXRjLikgZnJvbSB0aGUgdGVtcGxhdGUgaW5zdGFuY2UgcHJvdG90eXBlLFxuIyBpZiBhIG1ldGhvZCB3aXRoIHRoZSBzYW1lIG5hbWUgZG9lcyBub3QgZXhpc3QgYWxyZWFkeS5cbmZvciBtZXRob2ROYW1lLCBtZXRob2Qgb2YgKEJsYXplLlRlbXBsYXRlSW5zdGFuY2U6Oikgd2hlbiBtZXRob2ROYW1lIG5vdCBvZiAoQmxhemVDb21wb25lbnQ6OilcbiAgZG8gKG1ldGhvZE5hbWUsIG1ldGhvZCkgLT5cbiAgICBpZiBtZXRob2ROYW1lIGluIFNVUFBPUlRTX1JFQUNUSVZFX0lOU1RBTkNFXG4gICAgICBCbGF6ZUNvbXBvbmVudDo6W21ldGhvZE5hbWVdID0gKGFyZ3MuLi4pIC0+XG4gICAgICAgIEBfY29tcG9uZW50SW50ZXJuYWxzID89IHt9XG4gICAgICAgIEBfY29tcG9uZW50SW50ZXJuYWxzLnRlbXBsYXRlSW5zdGFuY2UgPz0gbmV3IFJlYWN0aXZlRmllbGQgbnVsbCwgKGEsIGIpIC0+IGEgaXMgYlxuXG4gICAgICAgIGlmIHRlbXBsYXRlSW5zdGFuY2UgPSBAX2NvbXBvbmVudEludGVybmFscy50ZW1wbGF0ZUluc3RhbmNlKClcbiAgICAgICAgICByZXR1cm4gdGVtcGxhdGVJbnN0YW5jZVttZXRob2ROYW1lXSBhcmdzLi4uXG5cbiAgICAgICAgdW5kZWZpbmVkXG5cbiAgICBlbHNlIGlmIG1ldGhvZE5hbWUgaW4gUkVRVUlSRV9SRU5ERVJFRF9JTlNUQU5DRVxuICAgICAgQmxhemVDb21wb25lbnQ6OlttZXRob2ROYW1lXSA9IChhcmdzLi4uKSAtPlxuICAgICAgICByZXR1cm4gQF9jb21wb25lbnRJbnRlcm5hbHMudGVtcGxhdGVJbnN0YW5jZSgpW21ldGhvZE5hbWVdIGFyZ3MuLi4gaWYgQGlzUmVuZGVyZWQoKVxuXG4gICAgICAgIHVuZGVmaW5lZFxuXG4gICAgZWxzZVxuICAgICAgQmxhemVDb21wb25lbnQ6OlttZXRob2ROYW1lXSA9IChhcmdzLi4uKSAtPlxuICAgICAgICB0ZW1wbGF0ZUluc3RhbmNlID0gVHJhY2tlci5ub25yZWFjdGl2ZSA9PlxuICAgICAgICAgIEBfY29tcG9uZW50SW50ZXJuYWxzPy50ZW1wbGF0ZUluc3RhbmNlPygpXG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yIFwiVGhlIGNvbXBvbmVudCBoYXMgdG8gYmUgY3JlYXRlZCBiZWZvcmUgY2FsbGluZyAnI3ttZXRob2ROYW1lfScuXCIgdW5sZXNzIHRlbXBsYXRlSW5zdGFuY2VcblxuICAgICAgICB0ZW1wbGF0ZUluc3RhbmNlW21ldGhvZE5hbWVdIGFyZ3MuLi5cbiIsImNsYXNzIEJsYXplQ29tcG9uZW50RGVidWcgZXh0ZW5kcyBCYXNlQ29tcG9uZW50RGVidWdcbiAgQHN0YXJ0Q29tcG9uZW50OiAoY29tcG9uZW50KSAtPlxuICAgIHN1cGVyXG5cbiAgICBjb25zb2xlLmxvZyBjb21wb25lbnQuZGF0YSgpXG5cbiAgQHN0YXJ0TWFya2VkQ29tcG9uZW50OiAoY29tcG9uZW50KSAtPlxuICAgIHN1cGVyXG5cbiAgICBjb25zb2xlLmxvZyBjb21wb25lbnQuZGF0YSgpXG5cbiAgQGR1bXBDb21wb25lbnRTdWJ0cmVlOiAocm9vdENvbXBvbmVudE9yRWxlbWVudCkgLT5cbiAgICBpZiAnbm9kZVR5cGUnIG9mIHJvb3RDb21wb25lbnRPckVsZW1lbnQgYW5kIHJvb3RDb21wb25lbnRPckVsZW1lbnQubm9kZVR5cGUgaXMgTm9kZS5FTEVNRU5UX05PREVcbiAgICAgIHJvb3RDb21wb25lbnRPckVsZW1lbnQgPSBCbGF6ZUNvbXBvbmVudC5nZXRDb21wb25lbnRGb3JFbGVtZW50IHJvb3RDb21wb25lbnRPckVsZW1lbnRcblxuICAgIHN1cGVyXG5cbiAgQGR1bXBDb21wb25lbnRUcmVlOiAocm9vdENvbXBvbmVudE9yRWxlbWVudCkgLT5cbiAgICBpZiAnbm9kZVR5cGUnIG9mIHJvb3RDb21wb25lbnRPckVsZW1lbnQgYW5kIHJvb3RDb21wb25lbnRPckVsZW1lbnQubm9kZVR5cGUgaXMgTm9kZS5FTEVNRU5UX05PREVcbiAgICAgIHJvb3RDb21wb25lbnRPckVsZW1lbnQgPSBCbGF6ZUNvbXBvbmVudC5nZXRDb21wb25lbnRGb3JFbGVtZW50IHJvb3RDb21wb25lbnRPckVsZW1lbnRcblxuICAgIHN1cGVyXG5cbiAgQGR1bXBBbGxDb21wb25lbnRzOiAtPlxuICAgIGFsbFJvb3RDb21wb25lbnRzID0gW11cblxuICAgICQoJyonKS5lYWNoIChpLCBlbGVtZW50KSA9PlxuICAgICAgY29tcG9uZW50ID0gQmxhemVDb21wb25lbnQuZ2V0Q29tcG9uZW50Rm9yRWxlbWVudCBlbGVtZW50XG4gICAgICByZXR1cm4gdW5sZXNzIGNvbXBvbmVudFxuICAgICAgcm9vdENvbXBvbmVudCA9IEBjb21wb25lbnRSb290IGNvbXBvbmVudFxuICAgICAgYWxsUm9vdENvbXBvbmVudHMucHVzaCByb290Q29tcG9uZW50IHVubGVzcyByb290Q29tcG9uZW50IGluIGFsbFJvb3RDb21wb25lbnRzXG5cbiAgICBmb3Igcm9vdENvbXBvbmVudCBpbiBhbGxSb290Q29tcG9uZW50c1xuICAgICAgQGR1bXBDb21wb25lbnRTdWJ0cmVlIHJvb3RDb21wb25lbnRcblxuICAgIHJldHVyblxuIiwiIyBOby1vcCBvbiB0aGUgc2VydmVyLlxuVGVtcGxhdGUuYm9keS5yZW5kZXJUb0RvY3VtZW50ID0gLT5cbiJdfQ==
