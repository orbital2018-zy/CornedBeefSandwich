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
var check = Package.check.check;
var Match = Package.check.Match;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var Random = Package.random.Random;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Mongo = Package.mongo.Mongo;
var Template = Package['peerlibrary:blaze-components'].Template;
var BlazeComponent = Package['peerlibrary:blaze-components'].BlazeComponent;
var BlazeComponentDebug = Package['peerlibrary:blaze-components'].BlazeComponentDebug;
var EasySearch = Package['easysearch:core'].EasySearch;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var BaseComponent, SingleIndexComponent;

var require = meteorInstall({"node_modules":{"meteor":{"easysearch:components":{"lib":{"base.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/base.js                                                             //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

/**
 * The BaseComponent holds the base logic for EasySearch Components.
 *
 * @type {BaseComponent}
 */
BaseComponent =
/*#__PURE__*/
function (_BlazeComponent) {
  (0, _inheritsLoose2.default)(BaseComponent, _BlazeComponent);

  function BaseComponent() {
    return _BlazeComponent.apply(this, arguments) || this;
  }

  var _proto = BaseComponent.prototype;

  /**
   * Setup component on created.
   */
  _proto.onCreated = function () {
    function onCreated() {
      var _this = this;

      this.autorun(function () {
        return _this.initializeBase();
      });
    }

    return onCreated;
  }();

  _proto.initializeBase = function () {
    function initializeBase() {
      var _ref;

      var index = this.getData().index,
          indexes = [index];

      if (!index) {
        indexes = this.getData().indexes;
      }

      if (_.isEmpty(indexes)) {
        throw new Meteor.Error('no-index', 'Please provide an index for your component');
      }

      if (indexes.filter(function (index) {
        return index instanceof EasySearch.Index;
      }).length !== indexes.length) {
        throw new Meteor.Error('invalid-configuration', "Did not receive an index or an array of indexes: \"" + indexes.toString() + "\"");
      }

      this.indexes = indexes;
      this.options = _.defaults({}, (_ref = _).omit.apply(_ref, [this.getData()].concat((0, _toConsumableArray2.default)(BaseComponent.reserveredProperties))), this.defaultOptions);
      check(this.name, Match.Optional(String));
      check(this.options, Object);
      this.eachIndex(function (index, name) {
        if (!index.getComponentDict(name)) {
          index.registerComponent(name);
        }
      });
    }

    return initializeBase;
  }();
  /**
   * Return the default options.
   *
   * @returns {Object}
   */


  /**
   * @param {String} searchStr
   *
   * @returns {Boolean}
   */
  _proto.shouldShowDocuments = function () {
    function shouldShowDocuments(searchStr) {
      return !this.getData().noDocumentsOnEmpty || 0 < searchStr.length;
    }

    return shouldShowDocuments;
  }();
  /**
   * Search the component.
   *
   * @param {String} searchString String to search for
   */


  _proto.search = function () {
    function search(searchString) {
      check(searchString, String);
      var showDocuments = this.shouldShowDocuments(searchString);
      this.eachIndex(function (index, name) {
        index.getComponentDict(name).set('showDocuments', showDocuments);

        if (showDocuments) {
          index.getComponentMethods(name).search(searchString);
        }
      });
    }

    return search;
  }();
  /**
   * Return the data.
   *
   * @returns {Object}
   */


  _proto.getData = function () {
    function getData() {
      return this.data() || {};
    }

    return getData;
  }();
  /**
   * Return the dictionaries.
   *
   * @returns {Object}
   */


  /**
   * Loop through each index and apply a function
   *
   * @param {Function} func   Function to run
   * @param {String}   method Lodash method name
   *
   * @return mixed
   */
  _proto.eachIndex = function () {
    function eachIndex(func) {
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'each';
      var componentScope = this,
          logic = this.getData().logic;

      if (!_.isEmpty(logic)) {
        method = 'OR' === logic ? 'some' : 'every';
      }

      return _[method](this.indexes, function (index) {
        return func.apply(this, [index, componentScope.name]);
      });
    }

    return eachIndex;
  }();

  (0, _createClass2.default)(BaseComponent, [{
    key: "name",

    /**
     * Return the name of the component.
     *
     * @returns {String}
     */
    get: function () {
      return this.getData().name;
    }
    /**
     * Return an array of properties that are reserved to the base component.
     *
     * @returns {String[]}
     */

  }, {
    key: "defaultOptions",
    get: function () {
      return {};
    }
  }, {
    key: "dicts",
    get: function () {
      return this.eachIndex(function (index, name) {
        return index.getComponentDict(name);
      }, 'map');
    }
  }], [{
    key: "reserveredProperties",
    get: function () {
      return ['index', 'indexes', 'name', 'attributes'];
    }
  }]);
  return BaseComponent;
}(BlazeComponent);

EasySearch.BaseComponent = BaseComponent;
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"single-index.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/single-index.js                                                     //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

/**
 * The SingleIndexComponent holds logic for components that only can use one index.
 *
 * @type {SingleIndexComponent}
 */
SingleIndexComponent =
/*#__PURE__*/
function (_BaseComponent) {
  (0, _inheritsLoose2.default)(SingleIndexComponent, _BaseComponent);

  function SingleIndexComponent() {
    return _BaseComponent.apply(this, arguments) || this;
  }

  var _proto = SingleIndexComponent.prototype;

  /**
   * Setup component on created.
   */
  _proto.onCreated = function () {
    function onCreated() {
      _BaseComponent.prototype.onCreated.call(this);

      if (this.indexes.length > 1) {
        throw new Meteor.Error('only-single-index', 'Can only specify one index');
      }
    }

    return onCreated;
  }();
  /**
   * Return the index
   *
   * @returns {Index}
   */


  (0, _createClass2.default)(SingleIndexComponent, [{
    key: "index",
    get: function () {
      return _.first(this.indexes);
    }
    /**
     * Return the dictionary.
     *
     * @returns {Object}
     */

  }, {
    key: "dict",
    get: function () {
      return _.first(this.dicts);
    }
  }]);
  return SingleIndexComponent;
}(BaseComponent);

EasySearch.SingleIndexComponent = SingleIndexComponent;
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"component-methods.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/component-methods.js                                                //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
EasySearch._getComponentMethods = function (dict, index) {
  return {
    /**
     * Search a component for the given search string.
     *
     * @param {Object|String} searchDefinition Search definition
     */
    search: function (searchDefinition) {
      dict.set('searchOptions', {
        props: (dict.get('searchOptions') || {}).props
      });
      dict.set('searchDefinition', searchDefinition);
      dict.set('stopPublication', true);
    },

    /**
     * Return the EasySearch.Cursor for the current search.
     *
     * @returns {Cursor}
     */
    getCursor: function () {
      var searchDefinition = dict.get('searchDefinition') || '',
          options = dict.get('searchOptions') || {},
          showDocuments = dict.get('showDocuments');
      check(options, Match.Optional(Object));

      if (false === showDocuments) {
        dict.set('count', 0);
        dict.set('searching', false);
        dict.set('limit', 0);
        dict.set('skip', 0);
        dict.set('currentCount', 0);
        dict.set('stopPublication', false);
        return EasySearch.Cursor.emptyCursor;
      }

      var cursor = index.search(searchDefinition, options),
          searchOptions = index._getSearchOptions(options);

      dict.set('count', cursor.count());
      dict.set('searching', !cursor.isReady());
      dict.set('limit', searchOptions.limit);
      dict.set('skip', searchOptions.skip);
      dict.set('currentCount', cursor.mongoCursor.count());
      dict.set('stopPublication', false);
      return cursor;
    },

    /**
     * Return true if the current search string is empty.
     *
     * @returns {boolean}
     */
    searchIsEmpty: function () {
      var searchDefinition = dict.get('searchDefinition');
      return !searchDefinition || _.isString(searchDefinition) && 0 === searchDefinition.trim().length;
    },

    /**
     * Return true if the component has no results.
     *
     * @returns {boolean}
     */
    hasNoResults: function () {
      var count = dict.get('count'),
          showDocuments = dict.get('showDocuments');
      return false !== showDocuments && !dict.get('searching') && (!_.isNumber(count) || 0 === count);
    },

    /**
     * Return true if the component is being searched.
     *
     * @returns {boolean}
     */
    isSearching: function () {
      return !!dict.get('searching');
    },

    /**
     * Return true if the component has more documents than displayed right now.
     *
     * @returns {boolean}
     */
    hasMoreDocuments: function () {
      return dict.get('currentCount') < dict.get('count');
    },

    /**
     * Load more documents for the component.
     *
     * @param {Number} count Count of docs
     */
    loadMore: function (count) {
      check(count, Number);
      var currentCount = dict.get('currentCount'),
          options = dict.get('searchOptions') || {};
      options.limit = currentCount + count;
      dict.set('searchOptions', options);
    },

    /**
     * Paginate through documents for the given page.
     *
     * @param {Number} page Page number
     */
    paginate: function (page) {
      check(page, Number);
      var options = dict.get('searchOptions') || {},
          limit = dict.get('limit');
      options.skip = limit * (page - 1);
      dict.set('currentPage', page);
      dict.set('searchOptions', options);
      dict.set('stopPublication', true);
    },

    /**
     * Add custom properties for search.
     */
    addProps: function () {
      var options = dict.get('searchOptions') || {};
      options.props = options.props || {};

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (_.isObject(args[0])) {
        options.props = _.extend(options.props, args[0]);
      } else if (_.isString(args[0])) {
        options.props[args[0]] = args[1];
      }

      dict.set('searchOptions', options);
      this.paginate(1);
    },

    /**
     * Remove custom properties for search.
     */
    removeProps: function () {
      var options = dict.get('searchOptions') || {};

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (!_.isEmpty(args)) {
        options.props = _.omit(options.props, args) || {};
      } else {
        options.props = {};
      }

      dict.set('searchOptions', options);
      this.paginate(1);
    },

    /**
     * Reset the search.
     */
    reset: function () {
      this.search('');
      this.paginate(1);
      dict.set('searchOptions', {});
    }
  };
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"core.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/core.js                                                             //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

/**
 * Extend EasySearch.Index with component functionality.
 *
 * @type {Index}
 */
EasySearch.Index =
/*#__PURE__*/
function (_EasySearch$Index) {
  (0, _inheritsLoose2.default)(Index, _EasySearch$Index);

  /**
   * Constructor.
   */
  function Index() {
    var _this;

    _this = _EasySearch$Index.apply(this, arguments) || this;
    _this.components = {};
    return _this;
  }
  /**
   * Return static default name for components.
   *
   * @returns {String}
   */


  var _proto = Index.prototype;

  /**
   * Register a component on the index.
   *
   * @param {String} componentName Optional name of the component
   */
  _proto.registerComponent = function () {
    function registerComponent() {
      var componentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EasySearch.Index.COMPONENT_DEFAULT_NAME;
      this.components[componentName] = new ReactiveDict("easySearchComponent_" + this.config.name + "_" + componentName + "_" + Random.id());
    }

    return registerComponent;
  }();
  /**
   * Get the reactive dictionary for a component.
   *
   * @param {String} componentName Optional name of the component
   */


  _proto.getComponentDict = function () {
    function getComponentDict() {
      var componentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EasySearch.Index.COMPONENT_DEFAULT_NAME;
      return this.components[componentName];
    }

    return getComponentDict;
  }();
  /**
   * Get component methods that are useful for implementing search behaviour.
   *
   * @param componentName
   */


  _proto.getComponentMethods = function () {
    function getComponentMethods() {
      var componentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EasySearch.Index.COMPONENT_DEFAULT_NAME;
      var dict = this.getComponentDict(componentName);

      if (!dict) {
        throw new Meteor.Error('no-component', "Component with name '" + componentName + "' not found");
      }

      return EasySearch._getComponentMethods(dict, this);
    }

    return getComponentMethods;
  }();

  (0, _createClass2.default)(Index, null, [{
    key: "COMPONENT_DEFAULT_NAME",
    get: function () {
      return '__default';
    }
  }]);
  return Index;
}(EasySearch.Index);
/**
 * Return true if the current page is valid.
 *
 * @param {Number} totalPagesLength Count of all pages available
 * @param {Number} currentPage      Current page to check
 *
 * @returns {boolean}
 */


function isValidPage(totalPagesLength, currentPage) {
  return currentPage <= totalPagesLength && currentPage > 0;
}
/**
 * Helper method to get the pages for pagination as an array.
 *
 * @param totalCount   Total count of results
 * @param pageCount    Count of results per page
 * @param currentPage  Current page
 * @param prevAndNext  True if Next and Previous buttons should appear
 * @param maxPages     Maximum count of pages to show
 *
 * @private
 *
 * @returns {Array}
 */


EasySearch._getPagesForPagination = function (_ref) {
  var totalCount = _ref.totalCount,
      pageCount = _ref.pageCount,
      currentPage = _ref.currentPage,
      prevAndNext = _ref.prevAndNext,
      maxPages = _ref.maxPages;

  var pages = _.range(1, Math.ceil(totalCount / pageCount) + 1),
      pagesLength = pages.length;

  if (!isValidPage(pagesLength, currentPage)) {
    throw new Meteor.Error('invalid-page', 'Current page is not in valid range');
  }

  if (maxPages) {
    var startSlice = currentPage > maxPages / 2 ? currentPage - 1 - Math.floor(maxPages / 2) : 0,
        endSlice = startSlice + maxPages;

    if (endSlice > pagesLength) {
      pages = pages.slice(-maxPages);
    } else {
      pages = pages.slice(startSlice, startSlice + maxPages);
    }
  }

  var pageData = _.map(pages, function (page) {
    var isCurrentPage = page === currentPage;
    return {
      page: page,
      content: page.toString(),
      current: isCurrentPage,
      disabled: isCurrentPage
    };
  });

  if (prevAndNext) {
    // Previous
    var prevPage = isValidPage(pagesLength, currentPage - 1) ? currentPage - 1 : null;
    pageData.unshift({
      page: prevPage,
      content: 'Prev',
      current: false,
      disabled: 1 === currentPage
    }); // Next

    var nextPage = isValidPage(pagesLength, currentPage + 1) ? currentPage + 1 : null;
    pageData.push({
      page: nextPage,
      content: 'Next',
      current: false,
      disabled: null == nextPage || pagesLength + 1 === currentPage
    });
  }

  return pageData;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"input":{"template.input.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/input/template.input.js                                             //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //

Template.__checkName("EasySearch.Input");
Template["EasySearch.Input"] = new Template("Template.EasySearch.Input", (function() {
  var view = this;
  return HTML.INPUT(HTML.Attrs(function() {
    return Spacebars.attrMustache(view.lookup("inputAttributes"));
  }));
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"input.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/input/input.js                                                      //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

/**
 * The InputComponent lets you search through configured indexes.
 *
 * @type {InputComponent}
 */
EasySearch.InputComponent =
/*#__PURE__*/
function (_BaseComponent) {
  (0, _inheritsLoose2.default)(InputComponent, _BaseComponent);

  function InputComponent() {
    return _BaseComponent.apply(this, arguments) || this;
  }

  var _proto = InputComponent.prototype;

  /**
   * Setup input onCreated.
   */
  _proto.onCreated = function () {
    function onCreated() {
      var _this = this;

      _BaseComponent.prototype.onCreated.apply(this, arguments);

      this.search(this.inputAttributes().value); // create a reactive dependency to the cursor

      this.debouncedSearch = _.debounce(function (searchString) {
        searchString = searchString.trim();

        if (_this.searchString !== searchString) {
          _this.searchString = searchString;

          _this.eachIndex(function (index, name) {
            index.getComponentDict(name).set('currentPage', 1);
          });

          _this.search(searchString);
        }
      }, this.options.timeout);
    }

    return onCreated;
  }();
  /**
   * Event map.
   *
   * @returns {Object}
   */


  _proto.events = function () {
    function events() {
      return [{
        'keyup input': function (e) {
          if ('enter' == this.getData().event && e.keyCode != 13) {
            return;
          }

          var value = $(e.target).val();

          if (value.length >= this.options.charLimit) {
            this.debouncedSearch($(e.target).val());
          }
        }
      }];
    }

    return events;
  }();
  /**
   * Return the attributes to set on the input (class, id).
   *
   * @returns {Object}
   */


  _proto.inputAttributes = function () {
    function inputAttributes() {
      return _.defaults({}, this.getData().attributes, InputComponent.defaultAttributes);
    }

    return inputAttributes;
  }();
  /**
   * Return the default attributes.
   *
   * @returns {Object}
   */


  (0, _createClass2.default)(InputComponent, [{
    key: "defaultOptions",

    /**
     * Return the default options.
     *
     * @returns {Object}
     */
    get: function () {
      return {
        timeout: 50,
        charLimit: 0
      };
    }
  }], [{
    key: "defaultAttributes",
    get: function () {
      return {
        type: 'text',
        value: ''
      };
    }
  }]);
  return InputComponent;
}(BaseComponent);

EasySearch.InputComponent.register('EasySearch.Input');
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"field-input":{"template.field-input.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/field-input/template.field-input.js                                 //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //

Template.__checkName("EasySearch.FieldInput");
Template["EasySearch.FieldInput"] = new Template("Template.EasySearch.FieldInput", (function() {
  var view = this;
  return HTML.INPUT(HTML.Attrs(function() {
    return Spacebars.attrMustache(view.lookup("inputAttributes"));
  }));
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"field-input.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/field-input/field-input.js                                          //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

/**
 * The FieldInputComponent lets you search through configured indexes for a specified fild.
 *
 * @type {FieldInputComponent}
 */
EasySearch.FieldInputComponent =
/*#__PURE__*/
function (_EasySearch$InputComp) {
  (0, _inheritsLoose2.default)(FieldInputComponent, _EasySearch$InputComp);

  function FieldInputComponent() {
    return _EasySearch$InputComp.apply(this, arguments) || this;
  }

  var _proto = FieldInputComponent.prototype;

  /**
   * Setup component on created.
   */
  _proto.onCreated = function () {
    function onCreated() {
      _EasySearch$InputComp.prototype.onCreated.call(this);

      if (_.isEmpty(this.getData().field)) {
        throw new Meteor.Error('no-field', 'Please provide a field for your field input component');
      }
    }

    return onCreated;
  }();
  /**
   * Search the component.
   *
   * @param {String} searchString String to search for
   */


  _proto.search = function () {
    function search(searchString) {
      var _this = this;

      check(searchString, String);
      this.eachIndex(function (index, name) {
        var searchDefinition = index.getComponentDict(name).get('searchDefinition') || {};

        if (_.isString(searchDefinition)) {
          throw new Meteor.Error('You can either EasySearch.FieldInput or EasySearch.Input');
        }

        if (_this.options.field) {
          searchDefinition[_this.options.field] = searchString;
          index.getComponentMethods(name).search(searchDefinition);
        }
      });
    }

    return search;
  }();

  return FieldInputComponent;
}(EasySearch.InputComponent);

EasySearch.FieldInputComponent.register('EasySearch.FieldInput');
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"each":{"template.each.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/each/template.each.js                                               //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //

Template.__checkName("EasySearch.Each");
Template["EasySearch.Each"] = new Template("Template.EasySearch.Each", (function() {
  var view = this;
  return Blaze.Each(function() {
    return Spacebars.call(view.lookup("doc"));
  }, function() {
    return [ "\n      ", Blaze._InOuterTemplateScope(view, function() {
      return Blaze._TemplateWith(function() {
        return Spacebars.dataMustache(view.lookup("dataScope"), view.lookup("."), view.lookup("@index"));
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(view.templateContentBlock);
        });
      });
    }), "\n    " ];
  });
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"each.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/each/each.js                                                        //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

/**
 * The EachComponent allows to loop through the search results found.
 *
 * @type {EachComponent}
 */
EasySearch.EachComponent =
/*#__PURE__*/
function (_SingleIndexComponent) {
  (0, _inheritsLoose2.default)(EachComponent, _SingleIndexComponent);

  function EachComponent() {
    return _SingleIndexComponent.apply(this, arguments) || this;
  }

  var _proto = EachComponent.prototype;

  /**
   * Return the mongo cursor for the search.
   *
   * @returns {Mongo.Cursor}
   */
  _proto.doc = function () {
    function doc() {
      var stopPublication = this.index.getComponentDict(this.name).get('stopPublication');
      this.cursor && stopPublication && this.cursor.stop();
      this.cursor = this.index.getComponentMethods(this.name).getCursor();
      return this.cursor.mongoCursor;
    }

    return doc;
  }();
  /**
   * Return the datascope for each document.
   *
   * @param {Object} scope
   * @param {Number} index
   *
   * @returns {Object}
   */


  _proto.dataScope = function () {
    function dataScope(scope, index) {
      scope['@index'] = index;
      return scope;
    }

    return dataScope;
  }();

  return EachComponent;
}(SingleIndexComponent);

EasySearch.EachComponent.register('EasySearch.Each');
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"if-input-empty":{"template.if-input-empty.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/if-input-empty/template.if-input-empty.js                           //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //

Template.__checkName("EasySearch.IfInputEmpty");
Template["EasySearch.IfInputEmpty"] = new Template("Template.EasySearch.IfInputEmpty", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("inputEmpty"));
  }, function() {
    return [ "\n        ", Blaze._InOuterTemplateScope(view, function() {
      return Spacebars.include(function() {
        return Spacebars.call(view.templateContentBlock);
      });
    }), "\n    " ];
  }, function() {
    return [ "\n        ", Blaze.If(function() {
      return Spacebars.call(view.templateElseBlock);
    }, function() {
      return [ "\n            ", Blaze._InOuterTemplateScope(view, function() {
        return Spacebars.include(function() {
          return Spacebars.call(view.templateElseBlock);
        });
      }), "\n        " ];
    }), "\n    " ];
  });
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"if-input-empty.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/if-input-empty/if-input-empty.js                                    //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

/**
 * The IfInputEmptyComponent lets you display content when the input is empty.
 *
 * @type {IfInputEmptyComponent}
 */
EasySearch.IfInputEmptyComponent =
/*#__PURE__*/
function (_BaseComponent) {
  (0, _inheritsLoose2.default)(IfInputEmptyComponent, _BaseComponent);

  function IfInputEmptyComponent() {
    return _BaseComponent.apply(this, arguments) || this;
  }

  var _proto = IfInputEmptyComponent.prototype;

  /**
   * Return true if the input is empty.
   *
   * @returns {boolean}
   */
  _proto.inputEmpty = function () {
    function inputEmpty() {
      return !!this.eachIndex(function (index, name) {
        return index.getComponentMethods(name).searchIsEmpty();
      }, 'every');
    }

    return inputEmpty;
  }();

  return IfInputEmptyComponent;
}(BaseComponent);

EasySearch.IfInputEmptyComponent.register('EasySearch.IfInputEmpty');
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"if-no-results":{"template.if-no-results.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/if-no-results/template.if-no-results.js                             //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //

Template.__checkName("EasySearch.IfNoResults");
Template["EasySearch.IfNoResults"] = new Template("Template.EasySearch.IfNoResults", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("noResults"));
  }, function() {
    return [ "\n        ", Blaze._InOuterTemplateScope(view, function() {
      return Spacebars.include(function() {
        return Spacebars.call(view.templateContentBlock);
      });
    }), "\n    " ];
  }, function() {
    return [ "\n        ", Blaze.If(function() {
      return Spacebars.call(view.templateElseBlock);
    }, function() {
      return [ "\n            ", Blaze._InOuterTemplateScope(view, function() {
        return Spacebars.include(function() {
          return Spacebars.call(view.templateElseBlock);
        });
      }), "\n        " ];
    }), "\n    " ];
  });
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"if-no-results.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/if-no-results/if-no-results.js                                      //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

/**
 * The IfNoResultsComponent lets you display content when there are no results.
 *
 * @type {IfNoResultsComponent}
 */
EasySearch.IfNoResultsComponent =
/*#__PURE__*/
function (_BaseComponent) {
  (0, _inheritsLoose2.default)(IfNoResultsComponent, _BaseComponent);

  function IfNoResultsComponent() {
    return _BaseComponent.apply(this, arguments) || this;
  }

  var _proto = IfNoResultsComponent.prototype;

  /**
   * Return true if there are no results.
   *
   * @returns {boolean}
   */
  _proto.noResults = function () {
    function noResults() {
      return !!this.eachIndex(function (index, name) {
        return index.getComponentMethods(name).hasNoResults();
      }, 'every');
    }

    return noResults;
  }();

  return IfNoResultsComponent;
}(BaseComponent);

EasySearch.IfNoResultsComponent.register('EasySearch.IfNoResults');
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"if-searching":{"template.if-searching.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/if-searching/template.if-searching.js                               //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //

Template.__checkName("EasySearch.IfSearching");
Template["EasySearch.IfSearching"] = new Template("Template.EasySearch.IfSearching", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("searching"));
  }, function() {
    return [ "\n        ", Blaze._InOuterTemplateScope(view, function() {
      return Spacebars.include(function() {
        return Spacebars.call(view.templateContentBlock);
      });
    }), "\n    " ];
  }, function() {
    return [ "\n        ", Blaze.If(function() {
      return Spacebars.call(view.templateElseBlock);
    }, function() {
      return [ "\n            ", Blaze._InOuterTemplateScope(view, function() {
        return Spacebars.include(function() {
          return Spacebars.call(view.templateElseBlock);
        });
      }), "\n        " ];
    }), "\n    " ];
  });
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"if-searching.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/if-searching/if-searching.js                                        //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

/**
 * The IfSearchingComponent lets you display content when the component is being searched.
 *
 * @type {IfSearchingComponent}
 */
EasySearch.IfSearchingComponent =
/*#__PURE__*/
function (_BaseComponent) {
  (0, _inheritsLoose2.default)(IfSearchingComponent, _BaseComponent);

  function IfSearchingComponent() {
    return _BaseComponent.apply(this, arguments) || this;
  }

  var _proto = IfSearchingComponent.prototype;

  /**
   * Return true if the component is being searched.
   *
   * @returns {boolean}
   */
  _proto.searching = function () {
    function searching() {
      return !!this.eachIndex(function (index, name) {
        return index.getComponentMethods(name).isSearching();
      }, 'every');
    }

    return searching;
  }();

  return IfSearchingComponent;
}(BaseComponent);

EasySearch.IfSearchingComponent.register('EasySearch.IfSearching');
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"load-more":{"template.load-more.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/load-more/template.load-more.js                                     //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //

Template.__checkName("EasySearch.LoadMore");
Template["EasySearch.LoadMore"] = new Template("Template.EasySearch.LoadMore", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("moreDocuments"));
  }, function() {
    return [ "\n        ", HTML.BUTTON(HTML.Attrs(function() {
      return Spacebars.attrMustache(view.lookup("attributes"));
    }), Blaze.View("lookup:content", function() {
      return Spacebars.mustache(view.lookup("content"));
    })), "\n    " ];
  });
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"load-more.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/load-more/load-more.js                                              //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

/**
 * The LoadMoreComponent lets you load more documents through a button.
 *
 * @type {LoadMoreComponent}
 */
EasySearch.LoadMoreComponent =
/*#__PURE__*/
function (_SingleIndexComponent) {
  (0, _inheritsLoose2.default)(LoadMoreComponent, _SingleIndexComponent);

  function LoadMoreComponent() {
    return _SingleIndexComponent.apply(this, arguments) || this;
  }

  var _proto = LoadMoreComponent.prototype;

  /**
   * Load more documents.
   */
  _proto.loadMore = function () {
    function loadMore() {
      this.index.getComponentMethods(this.name).loadMore(this.options.count);
    }

    return loadMore;
  }();
  /**
   * Content of the component.
   *
   * @returns string
   */


  _proto.content = function () {
    function content() {
      return this.options.content;
    }

    return content;
  }();
  /**
   * Attributes of the component.
   *
   * @returns string
   */


  _proto.attributes = function () {
    function attributes() {
      return this.getData().attributes || {};
    }

    return attributes;
  }();
  /**
   * Return true if there are more documents to load.
   *
   * @returns {Boolean}
   */


  _proto.moreDocuments = function () {
    function moreDocuments() {
      return this.index.getComponentMethods(this.name).hasMoreDocuments();
    }

    return moreDocuments;
  }();
  /**
   * Event map.
   *
   * @returns {Object}
   */


  _proto.events = function () {
    function events() {
      return [{
        'click button': function () {
          this.loadMore();
        }
      }];
    }

    return events;
  }();
  /**
   * Return the default options.
   *
   * @returns {Object}
   */


  (0, _createClass2.default)(LoadMoreComponent, [{
    key: "defaultOptions",
    get: function () {
      return {
        content: 'Load more',
        count: 10
      };
    }
  }]);
  return LoadMoreComponent;
}(SingleIndexComponent);

EasySearch.LoadMoreComponent.register('EasySearch.LoadMore');
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"pagination":{"template.pagination.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/pagination/template.pagination.js                                   //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //

Template.__checkName("EasySearch.Pagination");
Template["EasySearch.Pagination"] = new Template("Template.EasySearch.Pagination", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("moreDocuments"));
  }, function() {
    return [ "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("customRenderPagination"));
    }, function() {
      return [ "\n            ", Blaze._TemplateWith(function() {
        return {
          template: Spacebars.call(view.lookup("customRenderPagination"))
        };
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(Template.__dynamic);
        });
      }), "\n        " ];
    }, function() {
      return [ "\n            ", HTML.UL({
        "class": "pagination"
      }, "\n                ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("page"));
      }, function() {
        return [ "\n                    ", HTML.LI({
          "class": function() {
            return [ "page ", Spacebars.mustache(view.lookup("pageClasses"), view.lookup(".")) ];
          }
        }, "\n                        ", Blaze.View("lookup:content", function() {
          return Spacebars.mustache(view.lookup("content"));
        }), "\n                    "), "\n                " ];
      }), "\n            "), "\n        " ];
    }), "\n    " ];
  });
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pagination.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/pagination/pagination.js                                            //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

/**
 * The PaginationComponent lets you paginate through documents.
 *
 * @type {PaginationComponent}
 */
EasySearch.PaginationComponent =
/*#__PURE__*/
function (_SingleIndexComponent) {
  (0, _inheritsLoose2.default)(PaginationComponent, _SingleIndexComponent);

  function PaginationComponent() {
    return _SingleIndexComponent.apply(this, arguments) || this;
  }

  var _proto = PaginationComponent.prototype;

  /**
   * Setup component on created.
   */
  _proto.onCreated = function () {
    function onCreated() {
      _SingleIndexComponent.prototype.onCreated.call(this);

      this.index.getComponentMethods(this.name).paginate(1);
    }

    return onCreated;
  }();
  /**
   * Get pages for displaying the pagination.
   *
   * @returns {Array}
   */


  _proto.page = function () {
    function page() {
      var totalCount = this.dict.get('count'),
          pageCount = this.dict.get('limit'),
          currentPage = this.dict.get('currentPage'),
          maxPages = this.options.maxPages,
          prevAndNext = this.options.prevAndNext;

      if (!pageCount || !totalCount) {
        return [];
      }

      return this.options.transformPages(EasySearch._getPagesForPagination({
        totalCount: totalCount,
        pageCount: pageCount,
        currentPage: currentPage,
        maxPages: maxPages,
        prevAndNext: prevAndNext
      }));
    }

    return page;
  }();

  _proto.customRenderPagination = function () {
    function customRenderPagination() {
      return this.getData().customRenderPagination;
    }

    return customRenderPagination;
  }();
  /**
   * Paginate documents.
   */


  _proto.paginate = function () {
    function paginate(page) {
      check(page, Number);
      this.index.getComponentMethods(this.name).paginate(page);
    }

    return paginate;
  }();
  /**
   * Return page classes.
   *
   * @param {Object} data Data for the current page
   *
   * @returns {String}
   */


  _proto.pageClasses = function () {
    function pageClasses(data) {
      return ((data.disabled ? 'disabled' : '') + " " + (data.current ? 'current' : '')).trim();
    }

    return pageClasses;
  }();
  /**
   * Return true if there are more documents to load.
   *
   * @returns {Boolean}
   */


  _proto.moreDocuments = function () {
    function moreDocuments() {
      return this.index.getComponentMethods(this.name).hasMoreDocuments();
    }

    return moreDocuments;
  }();
  /**
   * Event map.
   *
   * @returns {Object}
   */


  _proto.events = function () {
    function events() {
      return [{
        'click .page:not(.disabled)': function (e) {
          var currentPage = this.currentData().page;
          this.dict.set('currentPage', currentPage);
          this.paginate(currentPage);
          e.preventDefault();
        }
      }];
    }

    return events;
  }();
  /**
   * Return the default options.
   *
   * @returns {Object}
   */


  (0, _createClass2.default)(PaginationComponent, [{
    key: "defaultOptions",
    get: function () {
      return {
        prevAndNext: true,
        maxPages: null,
        transformPages: function (pages) {
          return pages;
        }
      };
    }
  }]);
  return PaginationComponent;
}(SingleIndexComponent);

EasySearch.PaginationComponent.register('EasySearch.Pagination');
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"main.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/easysearch_components/lib/main.js                                                             //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
module.export({
  Index: function () {
    return Index;
  },
  SingleIndexComponent: function () {
    return SingleIndexComponent;
  },
  BaseComponent: function () {
    return BaseComponent;
  },
  FieldInputComponent: function () {
    return FieldInputComponent;
  },
  EachComponent: function () {
    return EachComponent;
  },
  IfInputEmptyComponent: function () {
    return IfInputEmptyComponent;
  },
  IfNoResultsComponent: function () {
    return IfNoResultsComponent;
  },
  IfSearchingComponent: function () {
    return IfSearchingComponent;
  },
  InputComponent: function () {
    return InputComponent;
  },
  LoadMoreComponent: function () {
    return LoadMoreComponent;
  },
  PaginationComponent: function () {
    return PaginationComponent;
  }
});
var _EasySearch = EasySearch,
    Index = _EasySearch.Index,
    SingleIndexComponent = _EasySearch.SingleIndexComponent,
    BaseComponent = _EasySearch.BaseComponent,
    FieldInputComponent = _EasySearch.FieldInputComponent,
    EachComponent = _EasySearch.EachComponent,
    IfInputEmptyComponent = _EasySearch.IfInputEmptyComponent,
    IfNoResultsComponent = _EasySearch.IfNoResultsComponent,
    IfSearchingComponent = _EasySearch.IfSearchingComponent,
    InputComponent = _EasySearch.InputComponent,
    LoadMoreComponent = _EasySearch.LoadMoreComponent,
    PaginationComponent = _EasySearch.PaginationComponent;
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".html"
  ]
});
require("/node_modules/meteor/easysearch:components/lib/base.js");
require("/node_modules/meteor/easysearch:components/lib/single-index.js");
require("/node_modules/meteor/easysearch:components/lib/component-methods.js");
require("/node_modules/meteor/easysearch:components/lib/core.js");
require("/node_modules/meteor/easysearch:components/lib/input/template.input.js");
require("/node_modules/meteor/easysearch:components/lib/input/input.js");
require("/node_modules/meteor/easysearch:components/lib/field-input/template.field-input.js");
require("/node_modules/meteor/easysearch:components/lib/field-input/field-input.js");
require("/node_modules/meteor/easysearch:components/lib/each/template.each.js");
require("/node_modules/meteor/easysearch:components/lib/each/each.js");
require("/node_modules/meteor/easysearch:components/lib/if-input-empty/template.if-input-empty.js");
require("/node_modules/meteor/easysearch:components/lib/if-input-empty/if-input-empty.js");
require("/node_modules/meteor/easysearch:components/lib/if-no-results/template.if-no-results.js");
require("/node_modules/meteor/easysearch:components/lib/if-no-results/if-no-results.js");
require("/node_modules/meteor/easysearch:components/lib/if-searching/template.if-searching.js");
require("/node_modules/meteor/easysearch:components/lib/if-searching/if-searching.js");
require("/node_modules/meteor/easysearch:components/lib/load-more/template.load-more.js");
require("/node_modules/meteor/easysearch:components/lib/load-more/load-more.js");
require("/node_modules/meteor/easysearch:components/lib/pagination/template.pagination.js");
require("/node_modules/meteor/easysearch:components/lib/pagination/pagination.js");
var exports = require("/node_modules/meteor/easysearch:components/lib/main.js");

/* Exports */
Package._define("easysearch:components", exports, {
  EasySearch: EasySearch
});

})();
