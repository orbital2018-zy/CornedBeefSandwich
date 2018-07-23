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
var Mongo = Package.mongo.Mongo;
var _ = Package.underscore._;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var EasySearch;

var require = meteorInstall({"node_modules":{"meteor":{"easysearch:core":{"lib":{"core":{"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/easysearch_core/lib/core/index.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Mongo;
module.watch(require("meteor/mongo"), {
  Mongo: function (v) {
    Mongo = v;
  }
}, 0);
var Engine;
module.watch(require("./engine"), {
  "default": function (v) {
    Engine = v;
  }
}, 1);

/**
 * An Index represents the main entry point for searching with EasySearch. It relies on
 * the given engine to have the search functionality and defines the data that should be searchable.
 *
 * @type {Index}
 */
var Index =
/*#__PURE__*/
function () {
  /**
   * Constructor
   *
   * @param {Object} config Configuration
   *
   * @constructor
   */
  function Index(config) {
    check(config, Object);
    check(config.fields, [String]);
    if (!config.ignoreCollectionCheck) check(config.collection, Mongo.Collection);

    if (!(config.engine instanceof Engine)) {
      throw new Meteor.Error('invalid-engine', 'engine needs to be instanceof Engine');
    }

    if (!config.name) config.name = (config.collection._name || '').toLowerCase();
    this.config = _.extend(Index.defaultConfiguration, config);
    this.defaultSearchOptions = _.defaults({}, this.config.defaultSearchOptions, {
      limit: 10,
      skip: 0,
      props: {}
    }); // Engine specific code on index creation

    config.engine.onIndexCreate(this.config);
  }
  /**
   * Default configuration for an index.
   *
   * @returns {Object}
   */


  var _proto = Index.prototype;

  /**
   * Search the index.
   *
   * @param {Object|String} searchDefinition Search definition
   * @param {Object}        options          Options
   *
   * @returns {Cursor}
   */
  _proto.search = function () {
    function search(searchDefinition) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.config.engine.checkSearchParam(searchDefinition, this.config);
      check(options, {
        limit: Match.Optional(Number),
        skip: Match.Optional(Number),
        props: Match.Optional(Object),
        userId: Match.Optional(Match.OneOf(String, null))
      });
      options = {
        search: this._getSearchOptions(options),
        index: this.config
      };

      if (!this.config.permission(options.search)) {
        throw new Meteor.Error('not-allowed', "Not allowed to search this index!");
      }

      return this.config.engine.search(searchDefinition, options);
    }

    return search;
  }();
  /**
   * Returns the search options based on the given options.
   *
   * @param {Object} options Options to use
   *
   * @returns {Object}
   */


  _proto._getSearchOptions = function () {
    function _getSearchOptions(options) {
      if (!Meteor.isServer) {
        delete options.userId;
      }

      if (typeof options.userId === "undefined" && Meteor.userId) {
        options.userId = Meteor.userId();
      }

      return _.defaults(options, this.defaultSearchOptions);
    }

    return _getSearchOptions;
  }();

  (0, _createClass2.default)(Index, null, [{
    key: "defaultConfiguration",
    get: function () {
      return {
        permission: function () {
          return true;
        },
        defaultSearchOptions: {},
        countUpdateIntervalMs: 2000
      };
    }
  }]);
  return Index;
}();

module.exportDefault(Index);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"engine.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/easysearch_core/lib/core/engine.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**
 * An Engine is the technology used for searching with EasySearch, with
 * customizable configuration to how it interacts with the data from the Index.
 *
 * @type {Engine}
 */
var Engine =
/*#__PURE__*/
function () {
  /**
   * Constructor
   *
   * @param {Object} config configuration
   *
   * @constructor
   */
  function Engine() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this.constructor === Engine) {
      throw new Error('Cannot initialize instance of Engine');
    }

    if (!_.isFunction(this.search)) {
      throw new Error('Engine needs to implement search method');
    }

    this.config = _.defaults({}, config, this.defaultConfiguration());
  }
  /**
   * Return default configuration.
   *
   * @returns {Object}
   */


  var _proto = Engine.prototype;

  _proto.defaultConfiguration = function () {
    function defaultConfiguration() {
      return {};
    }

    return defaultConfiguration;
  }();
  /**
   * Call a configuration method with the engine scope.
   *
   * @param {String} methodName Method name
   * @param {Object} args       Arguments for the method
   *
   * @returns {*}
   */


  _proto.callConfigMethod = function () {
    function callConfigMethod(methodName) {
      check(methodName, String);
      var func = this.config[methodName];

      if (func) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return func.apply(this, args);
      }
    }

    return callConfigMethod;
  }();
  /**
   * Check the given search parameter for validity
   *
   * @param search
   */


  _proto.checkSearchParam = function () {
    function checkSearchParam(search) {
      check(search, String);
    }

    return checkSearchParam;
  }();
  /**
   *Code to run on index creation
   *
   * @param {Object} indexConfig Index configuraction
   */


  _proto.onIndexCreate = function () {
    function onIndexCreate(indexConfig) {
      if (!indexConfig.allowedFields) {
        indexConfig.allowedFields = indexConfig.fields;
      }
    }

    return onIndexCreate;
  }();

  return Engine;
}();

module.exportDefault(Engine);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reactive-engine.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/easysearch_core/lib/core/reactive-engine.js                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var SearchCollection;
module.watch(require("./search-collection"), {
  "default": function (v) {
    SearchCollection = v;
  }
}, 0);
var Engine;
module.watch(require("./engine"), {
  "default": function (v) {
    Engine = v;
  }
}, 1);

/**
 * A ReactiveEngine handles the reactive logic, such as subscribing
 * and publishing documents into a self contained collection.
 *
 * @type {ReactiveEngine}
 */
var ReactiveEngine =
/*#__PURE__*/
function (_Engine) {
  (0, _inheritsLoose2.default)(ReactiveEngine, _Engine);

  /**
   * Constructor.
   *
   * @param {Object} config Configuration
   *
   * @constructor
   */
  function ReactiveEngine(config) {
    var _this;

    _this = _Engine.call(this, config) || this;

    if ((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)) === _this.constructor) {
      throw new Error('Cannot initialize instance of ReactiveEngine');
    }

    if (!_.isFunction(_this.getSearchCursor)) {
      throw new Error('Reactive engine needs to implement getSearchCursor method');
    }

    return _this;
  }
  /**
   * Return default configuration.
   *
   * @returns {Object}
   */


  var _proto = ReactiveEngine.prototype;

  _proto.defaultConfiguration = function () {
    function defaultConfiguration() {
      return _.defaults({}, {
        transform: function (doc) {
          return doc;
        },
        beforePublish: function (event, doc) {
          return doc;
        }
      }, _Engine.prototype.defaultConfiguration.call(this));
    }

    return defaultConfiguration;
  }();
  /**
   * Code to run on index creation
   *
   * @param {Object} indexConfig Index configuration
   */


  _proto.onIndexCreate = function () {
    function onIndexCreate(indexConfig) {
      _Engine.prototype.onIndexCreate.call(this, indexConfig);

      indexConfig.searchCollection = new SearchCollection(indexConfig, this);
      indexConfig.mongoCollection = indexConfig.searchCollection._collection;
    }

    return onIndexCreate;
  }();
  /**
   * Transform the search definition.
   *
   * @param {String|Object} searchDefinition Search definition
   * @param {Object}        options          Search and index options
   *
   * @returns {Object}
   */


  _proto.transformSearchDefinition = function () {
    function transformSearchDefinition(searchDefinition, options) {
      if (_.isString(searchDefinition)) {
        var obj = {};

        _.each(options.index.fields, function (field) {
          obj[field] = searchDefinition;
        });

        searchDefinition = obj;
      }

      return searchDefinition;
    }

    return transformSearchDefinition;
  }();
  /**
   * Check the given search parameter for validity
   *
   * @param search
   * @param indexOptions
   */


  _proto.checkSearchParam = function () {
    function checkSearchParam(search, indexOptions) {
      check(search, Match.OneOf(String, Object));

      if (_.isObject(search)) {
        _.each(search, function (val, field) {
          check(val, String);

          if (-1 === _.indexOf(indexOptions.allowedFields, field)) {
            throw new Meteor.Error("Not allowed to search over field \"" + field + "\"");
          }
        });
      }
    }

    return checkSearchParam;
  }();
  /**
   * Reactively search on the collection.
   *
   * @param {Object} searchDefinition Search definition
   * @param {Object} options          Options
   *
   * @returns {Cursor}
   */


  _proto.search = function () {
    function search(searchDefinition, options) {
      if (Meteor.isClient) {
        return options.index.searchCollection.find(searchDefinition, options.search);
      } else {
        return this.getSearchCursor(this.transformSearchDefinition(searchDefinition, options), options);
      }
    }

    return search;
  }();

  return ReactiveEngine;
}(Engine);

module.exportDefault(ReactiveEngine);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cursor.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/easysearch_core/lib/core/cursor.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * A Cursor represents a pointer to the search results. Since it's specific
 * to EasySearch it can also be used to check for valid return values.
 *
 * @type {Cursor}
 */
var Cursor =
/*#__PURE__*/
function () {
  /**
   * Constructor
   *
   * @param {Mongo.Cursor} mongoCursor   Referenced mongo cursor
   * @param {Number}       count         Count of all documents found
   * @param {Boolean}      isReady       Cursor is ready
   * @param {Object}       publishHandle Publish handle to stop if on client
   *
   * @constructor
   *
   */
  function Cursor(mongoCursor, count) {
    var isReady = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var publishHandle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    check(mongoCursor.fetch, Function);
    check(count, Number);
    check(isReady, Match.Optional(Boolean));
    check(publishHandle, Match.OneOf(null, Object));
    this._mongoCursor = mongoCursor;
    this._count = count;
    this._isReady = isReady;
    this._publishHandle = publishHandle;
  }
  /**
   * Fetch the search results.
   *
   * @returns {[Object]}
   */


  var _proto = Cursor.prototype;

  _proto.fetch = function () {
    function fetch() {
      return this._mongoCursor.fetch();
    }

    return fetch;
  }();
  /**
   * Stop the subscription handle associated with the cursor.
   */


  _proto.stop = function () {
    function stop() {
      if (this._publishHandle) {
        return this._publishHandle.stop();
      }
    }

    return stop;
  }();
  /**
   * Return count of all documents found
   *
   * @returns {Number}
   */


  _proto.count = function () {
    function count() {
      return this._count;
    }

    return count;
  }();
  /**
   * Return if the cursor is ready.
   *
   * @returns {Boolean}
   */


  _proto.isReady = function () {
    function isReady() {
      return this._isReady;
    }

    return isReady;
  }();
  /**
   * Return the raw mongo cursor.
   *
   * @returns {Mongo.Cursor}
   */


  (0, _createClass2.default)(Cursor, [{
    key: "mongoCursor",
    get: function () {
      return this._mongoCursor;
    }
    /**
     * Return a fake empty cursor, without data.
     *
     * @returns {Object}
     */

  }], [{
    key: "emptyCursor",
    get: function () {
      return {
        fetch: function () {
          return [];
        },
        observe: function () {
          return {
            stop: function () {
              return null;
            }
          };
        },
        stop: function () {}
      };
    }
  }]);
  return Cursor;
}();

module.exportDefault(Cursor);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"search-collection.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/easysearch_core/lib/core/search-collection.js                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Mongo;
module.watch(require("meteor/mongo"), {
  Mongo: function (v) {
    Mongo = v;
  }
}, 0);
var Cursor;
module.watch(require("./cursor"), {
  "default": function (v) {
    Cursor = v;
  }
}, 1);
var ReactiveEngine;
module.watch(require("./reactive-engine"), {
  "default": function (v) {
    ReactiveEngine = v;
  }
}, 2);

/**
 * A search collection represents a reactive collection on the client,
 * which is used by the ReactiveEngine for searching.
 *
 * @type {SearchCollection}
 */
var SearchCollection =
/*#__PURE__*/
function () {
  /**
   * Constructor
   *
   * @param {Object}         indexConfiguration Index configuration
   * @param {ReactiveEngine} engine             Reactive Engine
   *
   * @constructor
   */
  function SearchCollection(indexConfiguration, engine) {
    check(indexConfiguration, Object);
    check(indexConfiguration.name, Match.OneOf(String, null));

    if (!(engine instanceof ReactiveEngine)) {
      throw new Meteor.Error('invalid-engine', 'engine needs to be instanceof ReactiveEngine');
    }

    this._indexConfiguration = indexConfiguration;
    this._name = indexConfiguration.name + "/easySearch";
    this._engine = engine;

    if (Meteor.isClient) {
      this._collection = new Mongo.Collection(this._name);
    } else if (Meteor.isServer) {
      this._setUpPublication();
    }
  }
  /**
   * Get name
   *
   * @returns {String}
   */


  var _proto = SearchCollection.prototype;

  /**
   * Find documents on the client.
   *
   * @param {Object} searchDefinition Search definition
   * @param {Object} options          Options
   *
   * @returns {Cursor}
   */
  _proto.find = function () {
    function find(searchDefinition, options) {
      if (!Meteor.isClient) {
        throw new Error('find can only be used on client');
      }

      var publishHandle = Meteor.subscribe(this.name, searchDefinition, options);

      var count = this._getCount(searchDefinition);

      var mongoCursor = this._getMongoCursor(searchDefinition, options);

      if (!_.isNumber(count)) {
        return new Cursor(mongoCursor, 0, false);
      }

      return new Cursor(mongoCursor, count, true, publishHandle);
    }

    return find;
  }();
  /**
   * Get the count of the cursor.
   *
   * @params {Object} searchDefinition Search definition
   *
   * @returns {Cursor.count}
   *
   * @private
   */


  _proto._getCount = function () {
    function _getCount(searchDefinition) {
      var countDoc = this._collection.findOne('searchCount' + JSON.stringify(searchDefinition));

      if (countDoc) {
        return countDoc.count;
      }
    }

    return _getCount;
  }();
  /**
   * Get the mongo cursor on the client.
   *
   * @param {Object} searchDefinition Search definition
   * @param {Object} options          Search options
   *
   * @returns {Cursor}
   * @private
   */


  _proto._getMongoCursor = function () {
    function _getMongoCursor(searchDefinition, options) {
      var _this = this;

      var clientSort = this.engine.callConfigMethod('clientSort', searchDefinition, options);
      return this._collection.find({
        __searchDefinition: JSON.stringify(searchDefinition),
        __searchOptions: JSON.stringify(options.props)
      }, {
        transform: function (doc) {
          delete doc.__searchDefinition;
          delete doc.__searchOptions;
          delete doc.__sortPosition;
          doc = _this.engine.config.transform(doc);
          return doc;
        },
        sort: clientSort ? clientSort : ['__sortPosition']
      });
    }

    return _getMongoCursor;
  }();
  /**
   * Return a unique document id for publication.
   *
   * @param {Document} doc
   *
   * @returns string
   */


  _proto.generateId = function () {
    function generateId(doc) {
      return doc._id + doc.__searchDefinition + doc.__searchOptions;
    }

    return generateId;
  }();
  /**
   * Add custom fields to the given document
   *
   * @param {Document} doc
   * @param {Object}   data
   * @returns {*}
   */


  _proto.addCustomFields = function () {
    function addCustomFields(doc, data) {
      _.forEach(data, function (val, key) {
        doc['__' + key] = val;
      });

      return doc;
    }

    return addCustomFields;
  }();
  /**
   * Set up publication.
   *
   * @private
   */


  _proto._setUpPublication = function () {
    function _setUpPublication() {
      var collectionScope = this,
          collectionName = this.name;
      Meteor.publish(collectionName, function (searchDefinition, options) {
        var _this2 = this;

        check(searchDefinition, Match.OneOf(String, Object));
        check(options, Object);
        var definitionString = JSON.stringify(searchDefinition),
            optionsString = JSON.stringify(options.props);
        options.userId = this.userId;
        options.publicationScope = this;

        if (!collectionScope._indexConfiguration.permission(options)) {
          throw new Meteor.Error('not-allowed', "You're not allowed to search this index!");
        }

        collectionScope.engine.checkSearchParam(searchDefinition, collectionScope._indexConfiguration);
        var cursor = collectionScope.engine.search(searchDefinition, {
          search: options,
          index: collectionScope._indexConfiguration
        });
        var count = cursor.count();
        this.added(collectionName, 'searchCount' + definitionString, {
          count: count
        });
        var intervalID;

        if (collectionScope._indexConfiguration.countUpdateIntervalMs) {
          intervalID = Meteor.setInterval(function () {
            return _this2.changed(collectionName, 'searchCount' + definitionString, {
              count: cursor.mongoCursor.count && cursor.mongoCursor.count() || 0
            });
          }, collectionScope._indexConfiguration.countUpdateIntervalMs);
        }

        this.onStop(function () {
          intervalID && Meteor.clearInterval(intervalID);
          resultsHandle && resultsHandle.stop();
        });
        var observedDocs = [];

        var updateDocWithCustomFields = function (doc, sortPosition) {
          return collectionScope.addCustomFields(doc, {
            originalId: doc._id,
            sortPosition: sortPosition,
            searchDefinition: definitionString,
            searchOptions: optionsString
          });
        };

        var resultsHandle = cursor.mongoCursor.observe({
          addedAt: function (doc, atIndex, before) {
            doc = collectionScope.engine.config.beforePublish('addedAt', doc, atIndex, before);
            doc = updateDocWithCustomFields(doc, atIndex);

            _this2.added(collectionName, collectionScope.generateId(doc), doc);
            /*
             * Reorder all observed docs to keep valid sorting. Here we adjust the
             * sortPosition number field to give space for the newly added doc
             */


            if (observedDocs.map(function (d) {
              return d.__sortPosition;
            }).includes(atIndex)) {
              observedDocs = observedDocs.map(function (doc, docIndex) {
                if (doc.__sortPosition >= atIndex) {
                  doc = collectionScope.addCustomFields(doc, {
                    sortPosition: doc.__sortPosition + 1
                  }); // do not throw changed event on last doc as it will be removed from cursor

                  if (docIndex < observedDocs.length) {
                    _this2.changed(collectionName, collectionScope.generateId(doc), doc);
                  }
                }

                return doc;
              });
            }

            observedDocs = (0, _toConsumableArray2.default)(observedDocs).concat([doc]);
          },
          changedAt: function (doc, oldDoc, atIndex) {
            doc = collectionScope.engine.config.beforePublish('changedAt', doc, oldDoc, atIndex);
            doc = collectionScope.addCustomFields(doc, {
              searchDefinition: definitionString,
              searchOptions: optionsString,
              sortPosition: atIndex,
              originalId: doc._id
            });

            _this2.changed(collectionName, collectionScope.generateId(doc), doc);
          },
          movedTo: function (doc, fromIndex, toIndex, before) {
            doc = collectionScope.engine.config.beforePublish('movedTo', doc, fromIndex, toIndex, before);
            doc = updateDocWithCustomFields(doc, toIndex);

            var beforeDoc = collectionScope._indexConfiguration.collection.findOne(before);

            if (beforeDoc) {
              beforeDoc = collectionScope.addCustomFields(beforeDoc, {
                searchDefinition: definitionString,
                searchOptions: optionsString,
                sortPosition: fromIndex
              });

              _this2.changed(collectionName, collectionScope.generateId(beforeDoc), beforeDoc);
            }

            _this2.changed(collectionName, collectionScope.generateId(doc), doc);
          },
          removedAt: function (doc, atIndex) {
            doc = collectionScope.engine.config.beforePublish('removedAt', doc, atIndex);
            doc = collectionScope.addCustomFields(doc, {
              searchDefinition: definitionString,
              searchOptions: optionsString
            });

            _this2.removed(collectionName, collectionScope.generateId(doc));
            /*
             * Adjust sort position for all docs after the removed doc and
             * remove the doc from the observed docs array
             */


            observedDocs = observedDocs.map(function (doc) {
              if (doc.__sortPosition > atIndex) {
                doc.__sortPosition -= 1;
              }

              return doc;
            }).filter(function (d) {
              return collectionScope.generateId(d) !== collectionScope.generateId(doc);
            });
          }
        });
        this.onStop(function () {
          resultsHandle.stop();
        });
        this.ready();
      });
    }

    return _setUpPublication;
  }();

  (0, _createClass2.default)(SearchCollection, [{
    key: "name",
    get: function () {
      return this._name;
    }
    /**
     * Get engine
     *
     * @returns {ReactiveEngine}
     */

  }, {
    key: "engine",
    get: function () {
      return this._engine;
    }
  }]);
  return SearchCollection;
}();

module.exportDefault(SearchCollection);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"engines":{"mongo-db.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/easysearch_core/lib/engines/mongo-db.js                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Cursor;
module.watch(require("../core/cursor"), {
  "default": function (v) {
    Cursor = v;
  }
}, 0);
var ReactiveEngine;
module.watch(require("../core/reactive-engine"), {
  "default": function (v) {
    ReactiveEngine = v;
  }
}, 1);

/**
 * The MongoDBEngine lets you search the index on the server side with MongoDB. Subscriptions and publications
 * are handled within the Engine.
 *
 * @type {MongoDBEngine}
 */
var MongoDBEngine =
/*#__PURE__*/
function (_ReactiveEngine) {
  (0, _inheritsLoose2.default)(MongoDBEngine, _ReactiveEngine);

  function MongoDBEngine() {
    return _ReactiveEngine.apply(this, arguments) || this;
  }

  var _proto = MongoDBEngine.prototype;

  /**
   * Return default configuration.
   *
   * @returns {Object}
   */
  _proto.defaultConfiguration = function () {
    function defaultConfiguration() {
      return _.defaults({}, MongoDBEngine.defaultMongoConfiguration(this), _ReactiveEngine.prototype.defaultConfiguration.call(this));
    }

    return defaultConfiguration;
  }();
  /**
   * Default mongo configuration, used in constructor and MinimongoEngine to get the configuration.
   *
   * @param {Object} engineScope Scope of the engine
   *
   * @returns {Object}
   */


  MongoDBEngine.defaultMongoConfiguration = function () {
    function defaultMongoConfiguration(engineScope) {
      return {
        aggregation: '$or',
        selector: function (searchObject, options, aggregation) {
          var selector = {};
          selector[aggregation] = [];

          _.each(searchObject, function (searchString, field) {
            var fieldSelector = engineScope.callConfigMethod('selectorPerField', field, searchString, options);

            if (fieldSelector) {
              selector[aggregation].push(fieldSelector);
            }
          });

          return selector;
        },
        selectorPerField: function (field, searchString) {
          var selector = {};
          searchString = searchString.replace(/(\W{1})/g, '\\$1');
          selector[field] = {
            '$regex': ".*" + searchString + ".*",
            '$options': 'i'
          };
          return selector;
        },
        sort: function (searchObject, options) {
          return options.index.fields;
        }
      };
    }

    return defaultMongoConfiguration;
  }();
  /**
   * Return the find options for the mongo find query.
   *
   * @param {String} searchDefinition Search definition
   * @param {Object} options          Search and index options
   */


  _proto.getFindOptions = function () {
    function getFindOptions(searchDefinition, options) {
      return {
        skip: options.search.skip,
        limit: options.search.limit,
        disableOplog: this.config.disableOplog,
        pollingIntervalMs: this.config.pollingIntervalMs,
        pollingThrottleMs: this.config.pollingThrottleMs,
        sort: this.callConfigMethod('sort', searchDefinition, options),
        fields: this.callConfigMethod('fields', searchDefinition, options)
      };
    }

    return getFindOptions;
  }();
  /**
   * Return the reactive search cursor.
   *
   * @param {String} searchDefinition Search definition
   * @param {Object} options          Search and index options
   */


  _proto.getSearchCursor = function () {
    function getSearchCursor(searchDefinition, options) {
      var selector = this.callConfigMethod('selector', searchDefinition, options, this.config.aggregation),
          findOptions = this.getFindOptions(searchDefinition, options),
          collection = options.index.collection;
      check(options, Object);
      check(selector, Object);
      check(findOptions, Object);
      return new Cursor(collection.find(selector, findOptions), collection.find(selector).count());
    }

    return getSearchCursor;
  }();

  return MongoDBEngine;
}(ReactiveEngine);

module.exportDefault(MongoDBEngine);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"minimongo.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/easysearch_core/lib/engines/minimongo.js                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Engine;
module.watch(require("../core/engine"), {
  "default": function (v) {
    Engine = v;
  }
}, 0);
var ReactiveEngine;
module.watch(require("../core/reactive-engine"), {
  "default": function (v) {
    ReactiveEngine = v;
  }
}, 1);
var MongoDBEngine;
module.watch(require("./mongo-db"), {
  "default": function (v) {
    MongoDBEngine = v;
  }
}, 2);

/**
 * The MinimongEngine lets you search the index on the client-side.
 *
 * @type {MinimongoEngine}
 */
var MinimongoEngine =
/*#__PURE__*/
function (_Engine) {
  (0, _inheritsLoose2.default)(MinimongoEngine, _Engine);

  function MinimongoEngine() {
    return _Engine.apply(this, arguments) || this;
  }

  var _proto = MinimongoEngine.prototype;

  /**
   * Return default configuration.
   *
   * @returns {Object}
   */
  _proto.defaultConfiguration = function () {
    function defaultConfiguration() {
      return _.defaults({}, MongoDBEngine.defaultMongoConfiguration(this), _Engine.prototype.defaultConfiguration.call(this));
    }

    return defaultConfiguration;
  }();
  /**
   * Search the index.
   *
   * @param {Object} searchDefinition Search definition
   * @param {Object} options          Object of options
   *
   * @returns {cursor}
   */


  _proto.search = function () {
    function search(searchDefinition, options) {
      if (!Meteor.isClient) {
        throw new Meteor.Error('only-client', 'Minimongo can only be used on the client');
      }

      searchDefinition = this.transformSearchDefinition(searchDefinition, options); // check() calls are in getSearchCursor method

      return MongoDBEngine.prototype.getSearchCursor.apply(this, [searchDefinition, options]);
    }

    return search;
  }();

  return MinimongoEngine;
}(Engine);

MinimongoEngine.prototype.checkSearchParam = ReactiveEngine.prototype.checkSearchParam;
MinimongoEngine.prototype.transformSearchDefinition = ReactiveEngine.prototype.transformSearchDefinition;

MinimongoEngine.prototype.getFindOptions = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var findOptions = MongoDBEngine.prototype.getFindOptions.apply(this, args);
  findOptions.transform = this.config.transform;
  return findOptions;
};

module.exportDefault(MinimongoEngine);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"mongo-text-index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/easysearch_core/lib/engines/mongo-text-index.js                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var ReactiveEngine;
module.watch(require("../core/reactive-engine"), {
  "default": function (v) {
    ReactiveEngine = v;
  }
}, 0);
var MongoDBEngine;
module.watch(require("./mongo-db"), {
  "default": function (v) {
    MongoDBEngine = v;
  }
}, 1);

/**
 * The MongoTextIndexEngine lets you search the index with Mongo text indexes.
 *
 * @type {MongoTextIndexEngine}
 */
var MongoTextIndexEngine =
/*#__PURE__*/
function (_ReactiveEngine) {
  (0, _inheritsLoose2.default)(MongoTextIndexEngine, _ReactiveEngine);

  function MongoTextIndexEngine() {
    return _ReactiveEngine.apply(this, arguments) || this;
  }

  var _proto = MongoTextIndexEngine.prototype;

  /**
   * Return default configuration.
   *
   * @returns {Object}
   */
  _proto.defaultConfiguration = function () {
    function defaultConfiguration() {
      var mongoConfiguration = MongoDBEngine.defaultMongoConfiguration(this);

      mongoConfiguration.selector = function (searchString) {
        if (searchString.trim()) {
          return {
            $text: {
              $search: searchString
            }
          };
        }

        return {};
      };

      return _.defaults({}, mongoConfiguration, _ReactiveEngine.prototype.defaultConfiguration.call(this));
    }

    return defaultConfiguration;
  }();
  /**
   * Setup the index on creation.
   *
   * @param {Object} indexConfig Index configuration
   */


  _proto.onIndexCreate = function () {
    function onIndexCreate(indexConfig) {
      _ReactiveEngine.prototype.onIndexCreate.call(this, indexConfig);

      if (Meteor.isServer) {
        var textIndexesConfig = {};

        _.each(indexConfig.fields, function (field) {
          textIndexesConfig[field] = 'text';
        });

        if (indexConfig.weights) {
          textIndexesConfig.weights = options.weights();
        }

        indexConfig.collection._ensureIndex(textIndexesConfig);
      }
    }

    return onIndexCreate;
  }();
  /**
   * Transform the search definition.
   *
   * @param {String|Object} searchDefinition Search definition
   * @param {Object}        options          Search and index options
   *
   * @returns {Object}
   */


  _proto.transformSearchDefinition = function () {
    function transformSearchDefinition(searchDefinition, options) {
      return searchDefinition;
    }

    return transformSearchDefinition;
  }();
  /**
   * Check the given search parameter for validity
   *
   * @param search
   */


  _proto.checkSearchParam = function () {
    function checkSearchParam(search) {
      check(search, String);
    }

    return checkSearchParam;
  }();

  return MongoTextIndexEngine;
}(ReactiveEngine); // Explicitely inherit getSearchCursor method functionality


MongoTextIndexEngine.prototype.getSearchCursor = MongoDBEngine.prototype.getSearchCursor;
MongoTextIndexEngine.prototype.getFindOptions = MongoDBEngine.prototype.getFindOptions;
module.exportDefault(MongoTextIndexEngine);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"globals.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/easysearch_core/lib/globals.js                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Index, Engine, ReactiveEngine, Cursor, MongoDBEngine, MinimongoEngine, MongoTextIndexEngine;
module.watch(require("./main"), {
  Index: function (v) {
    Index = v;
  },
  Engine: function (v) {
    Engine = v;
  },
  ReactiveEngine: function (v) {
    ReactiveEngine = v;
  },
  Cursor: function (v) {
    Cursor = v;
  },
  MongoDBEngine: function (v) {
    MongoDBEngine = v;
  },
  MinimongoEngine: function (v) {
    MinimongoEngine = v;
  },
  MongoTextIndexEngine: function (v) {
    MongoTextIndexEngine = v;
  }
}, 0);
EasySearch = {
  // Core
  Index: Index,
  Engine: Engine,
  ReactiveEngine: ReactiveEngine,
  Cursor: Cursor,
  // Engines
  MongoDB: MongoDBEngine,
  Minimongo: MinimongoEngine,
  MongoTextIndex: MongoTextIndexEngine
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/easysearch_core/lib/main.js                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  Index: function () {
    return Index;
  },
  Engine: function () {
    return Engine;
  },
  ReactiveEngine: function () {
    return ReactiveEngine;
  },
  Cursor: function () {
    return Cursor;
  },
  MongoDBEngine: function () {
    return MongoDBEngine;
  },
  MinimongoEngine: function () {
    return MinimongoEngine;
  },
  MongoTextIndexEngine: function () {
    return MongoTextIndexEngine;
  }
});
var Index;
module.watch(require("./core/index"), {
  "default": function (v) {
    Index = v;
  }
}, 0);
var Engine;
module.watch(require("./core/engine"), {
  "default": function (v) {
    Engine = v;
  }
}, 1);
var ReactiveEngine;
module.watch(require("./core/reactive-engine"), {
  "default": function (v) {
    ReactiveEngine = v;
  }
}, 2);
var Cursor;
module.watch(require("./core/cursor"), {
  "default": function (v) {
    Cursor = v;
  }
}, 3);
var MongoDBEngine;
module.watch(require("./engines/mongo-db"), {
  "default": function (v) {
    MongoDBEngine = v;
  }
}, 4);
var MinimongoEngine;
module.watch(require("./engines/minimongo"), {
  "default": function (v) {
    MinimongoEngine = v;
  }
}, 5);
var MongoTextIndexEngine;
module.watch(require("./engines/mongo-text-index"), {
  "default": function (v) {
    MongoTextIndexEngine = v;
  }
}, 6);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("/node_modules/meteor/easysearch:core/lib/core/index.js");
require("/node_modules/meteor/easysearch:core/lib/core/engine.js");
require("/node_modules/meteor/easysearch:core/lib/core/reactive-engine.js");
require("/node_modules/meteor/easysearch:core/lib/core/cursor.js");
require("/node_modules/meteor/easysearch:core/lib/core/search-collection.js");
require("/node_modules/meteor/easysearch:core/lib/engines/mongo-db.js");
require("/node_modules/meteor/easysearch:core/lib/engines/minimongo.js");
require("/node_modules/meteor/easysearch:core/lib/engines/mongo-text-index.js");
require("/node_modules/meteor/easysearch:core/lib/globals.js");
var exports = require("/node_modules/meteor/easysearch:core/lib/main.js");

/* Exports */
Package._define("easysearch:core", exports, {
  EasySearch: EasySearch
});

})();
