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

/* Package-scope variables */
var searchDefinition, searchString, EasySearch;

var require = meteorInstall({"node_modules":{"meteor":{"easysearch:core":{"lib":{"core":{"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/easysearch_core/lib/core/index.js                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Mongo;
module.watch(require("meteor/mongo"), {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
let Engine;
module.watch(require("./engine"), {
  default(v) {
    Engine = v;
  }

}, 1);

/**
 * An Index represents the main entry point for searching with EasySearch. It relies on
 * the given engine to have the search functionality and defines the data that should be searchable.
 *
 * @type {Index}
 */
class Index {
  /**
   * Constructor
   *
   * @param {Object} config Configuration
   *
   * @constructor
   */
  constructor(config) {
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


  static get defaultConfiguration() {
    return {
      permission: () => true,
      defaultSearchOptions: {},
      countUpdateIntervalMs: 2000
    };
  }
  /**
   * Search the index.
   *
   * @param {Object|String} searchDefinition Search definition
   * @param {Object}        options          Options
   *
   * @returns {Cursor}
   */


  search(searchDefinition) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
  /**
   * Returns the search options based on the given options.
   *
   * @param {Object} options Options to use
   *
   * @returns {Object}
   */


  _getSearchOptions(options) {
    if (!Meteor.isServer) {
      delete options.userId;
    }

    if (typeof options.userId === "undefined" && Meteor.userId) {
      options.userId = Meteor.userId();
    }

    return _.defaults(options, this.defaultSearchOptions);
  }

}

module.exportDefault(Index);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"engine.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/easysearch_core/lib/core/engine.js                                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/**
 * An Engine is the technology used for searching with EasySearch, with
 * customizable configuration to how it interacts with the data from the Index.
 *
 * @type {Engine}
 */
class Engine {
  /**
   * Constructor
   *
   * @param {Object} config configuration
   *
   * @constructor
   */
  constructor() {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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


  defaultConfiguration() {
    return {};
  }
  /**
   * Call a configuration method with the engine scope.
   *
   * @param {String} methodName Method name
   * @param {Object} args       Arguments for the method
   *
   * @returns {*}
   */


  callConfigMethod(methodName) {
    check(methodName, String);
    let func = this.config[methodName];

    if (func) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return func.apply(this, args);
    }
  }
  /**
   * Check the given search parameter for validity
   *
   * @param search
   */


  checkSearchParam(search) {
    check(search, String);
  }
  /**
   *Code to run on index creation
   *
   * @param {Object} indexConfig Index configuraction
   */


  onIndexCreate(indexConfig) {
    if (!indexConfig.allowedFields) {
      indexConfig.allowedFields = indexConfig.fields;
    }
  }

}

module.exportDefault(Engine);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reactive-engine.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/easysearch_core/lib/core/reactive-engine.js                                                             //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let SearchCollection;
module.watch(require("./search-collection"), {
  default(v) {
    SearchCollection = v;
  }

}, 0);
let Engine;
module.watch(require("./engine"), {
  default(v) {
    Engine = v;
  }

}, 1);

/**
 * A ReactiveEngine handles the reactive logic, such as subscribing
 * and publishing documents into a self contained collection.
 *
 * @type {ReactiveEngine}
 */
class ReactiveEngine extends Engine {
  /**
   * Constructor.
   *
   * @param {Object} config Configuration
   *
   * @constructor
   */
  constructor(config) {
    super(config);

    if (this === this.constructor) {
      throw new Error('Cannot initialize instance of ReactiveEngine');
    }

    if (!_.isFunction(this.getSearchCursor)) {
      throw new Error('Reactive engine needs to implement getSearchCursor method');
    }
  }
  /**
   * Return default configuration.
   *
   * @returns {Object}
   */


  defaultConfiguration() {
    return _.defaults({}, {
      transform: doc => doc,
      beforePublish: (event, doc) => doc
    }, super.defaultConfiguration());
  }
  /**
   * Code to run on index creation
   *
   * @param {Object} indexConfig Index configuration
   */


  onIndexCreate(indexConfig) {
    super.onIndexCreate(indexConfig);
    indexConfig.searchCollection = new SearchCollection(indexConfig, this);
    indexConfig.mongoCollection = indexConfig.searchCollection._collection;
  }
  /**
   * Transform the search definition.
   *
   * @param {String|Object} searchDefinition Search definition
   * @param {Object}        options          Search and index options
   *
   * @returns {Object}
   */


  transformSearchDefinition(searchDefinition, options) {
    if (_.isString(searchDefinition)) {
      let obj = {};

      _.each(options.index.fields, function (field) {
        obj[field] = searchDefinition;
      });

      searchDefinition = obj;
    }

    return searchDefinition;
  }
  /**
   * Check the given search parameter for validity
   *
   * @param search
   * @param indexOptions
   */


  checkSearchParam(search, indexOptions) {
    check(search, Match.OneOf(String, Object));

    if (_.isObject(search)) {
      _.each(search, function (val, field) {
        check(val, String);

        if (-1 === _.indexOf(indexOptions.allowedFields, field)) {
          throw new Meteor.Error("Not allowed to search over field \"".concat(field, "\""));
        }
      });
    }
  }
  /**
   * Reactively search on the collection.
   *
   * @param {Object} searchDefinition Search definition
   * @param {Object} options          Options
   *
   * @returns {Cursor}
   */


  search(searchDefinition, options) {
    if (Meteor.isClient) {
      return options.index.searchCollection.find(searchDefinition, options.search);
    } else {
      return this.getSearchCursor(this.transformSearchDefinition(searchDefinition, options), options);
    }
  }

}

module.exportDefault(ReactiveEngine);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cursor.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/easysearch_core/lib/core/cursor.js                                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/**
 * A Cursor represents a pointer to the search results. Since it's specific
 * to EasySearch it can also be used to check for valid return values.
 *
 * @type {Cursor}
 */
class Cursor {
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
  constructor(mongoCursor, count) {
    let isReady = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    let publishHandle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
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


  fetch() {
    return this._mongoCursor.fetch();
  }
  /**
   * Stop the subscription handle associated with the cursor.
   */


  stop() {
    if (this._publishHandle) {
      return this._publishHandle.stop();
    }
  }
  /**
   * Return count of all documents found
   *
   * @returns {Number}
   */


  count() {
    return this._count;
  }
  /**
   * Return if the cursor is ready.
   *
   * @returns {Boolean}
   */


  isReady() {
    return this._isReady;
  }
  /**
   * Return the raw mongo cursor.
   *
   * @returns {Mongo.Cursor}
   */


  get mongoCursor() {
    return this._mongoCursor;
  }
  /**
   * Return a fake empty cursor, without data.
   *
   * @returns {Object}
   */


  static get emptyCursor() {
    return {
      fetch: () => [],
      observe: () => {
        return {
          stop: () => null
        };
      },
      stop: () => {}
    };
  }

}

module.exportDefault(Cursor);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"search-collection.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/easysearch_core/lib/core/search-collection.js                                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Mongo;
module.watch(require("meteor/mongo"), {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
let Cursor;
module.watch(require("./cursor"), {
  default(v) {
    Cursor = v;
  }

}, 1);
let ReactiveEngine;
module.watch(require("./reactive-engine"), {
  default(v) {
    ReactiveEngine = v;
  }

}, 2);

/**
 * A search collection represents a reactive collection on the client,
 * which is used by the ReactiveEngine for searching.
 *
 * @type {SearchCollection}
 */
class SearchCollection {
  /**
   * Constructor
   *
   * @param {Object}         indexConfiguration Index configuration
   * @param {ReactiveEngine} engine             Reactive Engine
   *
   * @constructor
   */
  constructor(indexConfiguration, engine) {
    check(indexConfiguration, Object);
    check(indexConfiguration.name, Match.OneOf(String, null));

    if (!(engine instanceof ReactiveEngine)) {
      throw new Meteor.Error('invalid-engine', 'engine needs to be instanceof ReactiveEngine');
    }

    this._indexConfiguration = indexConfiguration;
    this._name = "".concat(indexConfiguration.name, "/easySearch");
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


  get name() {
    return this._name;
  }
  /**
   * Get engine
   *
   * @returns {ReactiveEngine}
   */


  get engine() {
    return this._engine;
  }
  /**
   * Find documents on the client.
   *
   * @param {Object} searchDefinition Search definition
   * @param {Object} options          Options
   *
   * @returns {Cursor}
   */


  find(searchDefinition, options) {
    if (!Meteor.isClient) {
      throw new Error('find can only be used on client');
    }

    let publishHandle = Meteor.subscribe(this.name, searchDefinition, options);

    let count = this._getCount(searchDefinition);

    let mongoCursor = this._getMongoCursor(searchDefinition, options);

    if (!_.isNumber(count)) {
      return new Cursor(mongoCursor, 0, false);
    }

    return new Cursor(mongoCursor, count, true, publishHandle);
  }
  /**
   * Get the count of the cursor.
   *
   * @params {Object} searchDefinition Search definition
   *
   * @returns {Cursor.count}
   *
   * @private
   */


  _getCount(searchDefinition) {
    let countDoc = this._collection.findOne('searchCount' + JSON.stringify(searchDefinition));

    if (countDoc) {
      return countDoc.count;
    }
  }
  /**
   * Get the mongo cursor on the client.
   *
   * @param {Object} searchDefinition Search definition
   * @param {Object} options          Search options
   *
   * @returns {Cursor}
   * @private
   */


  _getMongoCursor(searchDefinition, options) {
    const clientSort = this.engine.callConfigMethod('clientSort', searchDefinition, options);
    return this._collection.find({
      __searchDefinition: JSON.stringify(searchDefinition),
      __searchOptions: JSON.stringify(options.props)
    }, {
      transform: doc => {
        delete doc.__searchDefinition;
        delete doc.__searchOptions;
        delete doc.__sortPosition;
        doc = this.engine.config.transform(doc);
        return doc;
      },
      sort: clientSort ? clientSort : ['__sortPosition']
    });
  }
  /**
   * Return a unique document id for publication.
   *
   * @param {Document} doc
   *
   * @returns string
   */


  generateId(doc) {
    return doc._id + doc.__searchDefinition + doc.__searchOptions;
  }
  /**
   * Add custom fields to the given document
   *
   * @param {Document} doc
   * @param {Object}   data
   * @returns {*}
   */


  addCustomFields(doc, data) {
    _.forEach(data, function (val, key) {
      doc['__' + key] = val;
    });

    return doc;
  }
  /**
   * Set up publication.
   *
   * @private
   */


  _setUpPublication() {
    var collectionScope = this,
        collectionName = this.name;
    Meteor.publish(collectionName, function (searchDefinition, options) {
      check(searchDefinition, Match.OneOf(String, Object));
      check(options, Object);
      let definitionString = JSON.stringify(searchDefinition),
          optionsString = JSON.stringify(options.props);
      options.userId = this.userId;
      options.publicationScope = this;

      if (!collectionScope._indexConfiguration.permission(options)) {
        throw new Meteor.Error('not-allowed', "You're not allowed to search this index!");
      }

      collectionScope.engine.checkSearchParam(searchDefinition, collectionScope._indexConfiguration);
      let cursor = collectionScope.engine.search(searchDefinition, {
        search: options,
        index: collectionScope._indexConfiguration
      });
      const count = cursor.count();
      this.added(collectionName, 'searchCount' + definitionString, {
        count
      });
      let intervalID;

      if (collectionScope._indexConfiguration.countUpdateIntervalMs) {
        intervalID = Meteor.setInterval(() => this.changed(collectionName, 'searchCount' + definitionString, {
          count: cursor.mongoCursor.count && cursor.mongoCursor.count() || 0
        }), collectionScope._indexConfiguration.countUpdateIntervalMs);
      }

      this.onStop(function () {
        intervalID && Meteor.clearInterval(intervalID);
        resultsHandle && resultsHandle.stop();
      });
      let observedDocs = [];

      const updateDocWithCustomFields = (doc, sortPosition) => collectionScope.addCustomFields(doc, {
        originalId: doc._id,
        sortPosition,
        searchDefinition: definitionString,
        searchOptions: optionsString
      });

      let resultsHandle = cursor.mongoCursor.observe({
        addedAt: (doc, atIndex, before) => {
          doc = collectionScope.engine.config.beforePublish('addedAt', doc, atIndex, before);
          doc = updateDocWithCustomFields(doc, atIndex);
          this.added(collectionName, collectionScope.generateId(doc), doc);
          /*
           * Reorder all observed docs to keep valid sorting. Here we adjust the
           * sortPosition number field to give space for the newly added doc
           */

          if (observedDocs.map(d => d.__sortPosition).includes(atIndex)) {
            observedDocs = observedDocs.map((doc, docIndex) => {
              if (doc.__sortPosition >= atIndex) {
                doc = collectionScope.addCustomFields(doc, {
                  sortPosition: doc.__sortPosition + 1
                }); // do not throw changed event on last doc as it will be removed from cursor

                if (docIndex < observedDocs.length) {
                  this.changed(collectionName, collectionScope.generateId(doc), doc);
                }
              }

              return doc;
            });
          }

          observedDocs = [...observedDocs, doc];
        },
        changedAt: (doc, oldDoc, atIndex) => {
          doc = collectionScope.engine.config.beforePublish('changedAt', doc, oldDoc, atIndex);
          doc = collectionScope.addCustomFields(doc, {
            searchDefinition: definitionString,
            searchOptions: optionsString,
            sortPosition: atIndex,
            originalId: doc._id
          });
          this.changed(collectionName, collectionScope.generateId(doc), doc);
        },
        movedTo: (doc, fromIndex, toIndex, before) => {
          doc = collectionScope.engine.config.beforePublish('movedTo', doc, fromIndex, toIndex, before);
          doc = updateDocWithCustomFields(doc, toIndex);

          let beforeDoc = collectionScope._indexConfiguration.collection.findOne(before);

          if (beforeDoc) {
            beforeDoc = collectionScope.addCustomFields(beforeDoc, {
              searchDefinition: definitionString,
              searchOptions: optionsString,
              sortPosition: fromIndex
            });
            this.changed(collectionName, collectionScope.generateId(beforeDoc), beforeDoc);
          }

          this.changed(collectionName, collectionScope.generateId(doc), doc);
        },
        removedAt: (doc, atIndex) => {
          doc = collectionScope.engine.config.beforePublish('removedAt', doc, atIndex);
          doc = collectionScope.addCustomFields(doc, {
            searchDefinition: definitionString,
            searchOptions: optionsString
          });
          this.removed(collectionName, collectionScope.generateId(doc));
          /*
           * Adjust sort position for all docs after the removed doc and
           * remove the doc from the observed docs array
           */

          observedDocs = observedDocs.map(doc => {
            if (doc.__sortPosition > atIndex) {
              doc.__sortPosition -= 1;
            }

            return doc;
          }).filter(d => collectionScope.generateId(d) !== collectionScope.generateId(doc));
        }
      });
      this.onStop(function () {
        resultsHandle.stop();
      });
      this.ready();
    });
  }

}

module.exportDefault(SearchCollection);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"engines":{"mongo-db.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/easysearch_core/lib/engines/mongo-db.js                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Cursor;
module.watch(require("../core/cursor"), {
  default(v) {
    Cursor = v;
  }

}, 0);
let ReactiveEngine;
module.watch(require("../core/reactive-engine"), {
  default(v) {
    ReactiveEngine = v;
  }

}, 1);

/**
 * The MongoDBEngine lets you search the index on the server side with MongoDB. Subscriptions and publications
 * are handled within the Engine.
 *
 * @type {MongoDBEngine}
 */
class MongoDBEngine extends ReactiveEngine {
  /**
   * Return default configuration.
   *
   * @returns {Object}
   */
  defaultConfiguration() {
    return _.defaults({}, MongoDBEngine.defaultMongoConfiguration(this), super.defaultConfiguration());
  }
  /**
   * Default mongo configuration, used in constructor and MinimongoEngine to get the configuration.
   *
   * @param {Object} engineScope Scope of the engine
   *
   * @returns {Object}
   */


  static defaultMongoConfiguration(engineScope) {
    return {
      aggregation: '$or',

      selector(searchObject, options, aggregation) {
        const selector = {};
        selector[aggregation] = [];

        _.each(searchObject, (searchString, field) => {
          const fieldSelector = engineScope.callConfigMethod('selectorPerField', field, searchString, options);

          if (fieldSelector) {
            selector[aggregation].push(fieldSelector);
          }
        });

        return selector;
      },

      selectorPerField(field, searchString) {
        const selector = {};
        searchString = searchString.replace(/(\W{1})/g, '\\$1');
        selector[field] = {
          '$regex': ".*".concat(searchString, ".*"),
          '$options': 'i'
        };
        return selector;
      },

      sort(searchObject, options) {
        return options.index.fields;
      }

    };
  }
  /**
   * Return the find options for the mongo find query.
   *
   * @param {String} searchDefinition Search definition
   * @param {Object} options          Search and index options
   */


  getFindOptions(searchDefinition, options) {
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
  /**
   * Return the reactive search cursor.
   *
   * @param {String} searchDefinition Search definition
   * @param {Object} options          Search and index options
   */


  getSearchCursor(searchDefinition, options) {
    const selector = this.callConfigMethod('selector', searchDefinition, options, this.config.aggregation),
          findOptions = this.getFindOptions(searchDefinition, options),
          collection = options.index.collection;
    check(options, Object);
    check(selector, Object);
    check(findOptions, Object);
    return new Cursor(collection.find(selector, findOptions), collection.find(selector).count());
  }

}

module.exportDefault(MongoDBEngine);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"minimongo.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/easysearch_core/lib/engines/minimongo.js                                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Engine;
module.watch(require("../core/engine"), {
  default(v) {
    Engine = v;
  }

}, 0);
let ReactiveEngine;
module.watch(require("../core/reactive-engine"), {
  default(v) {
    ReactiveEngine = v;
  }

}, 1);
let MongoDBEngine;
module.watch(require("./mongo-db"), {
  default(v) {
    MongoDBEngine = v;
  }

}, 2);

/**
 * The MinimongEngine lets you search the index on the client-side.
 *
 * @type {MinimongoEngine}
 */
class MinimongoEngine extends Engine {
  /**
   * Return default configuration.
   *
   * @returns {Object}
   */
  defaultConfiguration() {
    return _.defaults({}, MongoDBEngine.defaultMongoConfiguration(this), super.defaultConfiguration());
  }
  /**
   * Search the index.
   *
   * @param {Object} searchDefinition Search definition
   * @param {Object} options          Object of options
   *
   * @returns {cursor}
   */


  search(searchDefinition, options) {
    if (!Meteor.isClient) {
      throw new Meteor.Error('only-client', 'Minimongo can only be used on the client');
    }

    searchDefinition = this.transformSearchDefinition(searchDefinition, options); // check() calls are in getSearchCursor method

    return MongoDBEngine.prototype.getSearchCursor.apply(this, [searchDefinition, options]);
  }

}

MinimongoEngine.prototype.checkSearchParam = ReactiveEngine.prototype.checkSearchParam;
MinimongoEngine.prototype.transformSearchDefinition = ReactiveEngine.prototype.transformSearchDefinition;

MinimongoEngine.prototype.getFindOptions = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  let findOptions = MongoDBEngine.prototype.getFindOptions.apply(this, args);
  findOptions.transform = this.config.transform;
  return findOptions;
};

module.exportDefault(MinimongoEngine);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"mongo-text-index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/easysearch_core/lib/engines/mongo-text-index.js                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let ReactiveEngine;
module.watch(require("../core/reactive-engine"), {
  default(v) {
    ReactiveEngine = v;
  }

}, 0);
let MongoDBEngine;
module.watch(require("./mongo-db"), {
  default(v) {
    MongoDBEngine = v;
  }

}, 1);

/**
 * The MongoTextIndexEngine lets you search the index with Mongo text indexes.
 *
 * @type {MongoTextIndexEngine}
 */
class MongoTextIndexEngine extends ReactiveEngine {
  /**
   * Return default configuration.
   *
   * @returns {Object}
   */
  defaultConfiguration() {
    let mongoConfiguration = MongoDBEngine.defaultMongoConfiguration(this);

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

    return _.defaults({}, mongoConfiguration, super.defaultConfiguration());
  }
  /**
   * Setup the index on creation.
   *
   * @param {Object} indexConfig Index configuration
   */


  onIndexCreate(indexConfig) {
    super.onIndexCreate(indexConfig);

    if (Meteor.isServer) {
      let textIndexesConfig = {};

      _.each(indexConfig.fields, function (field) {
        textIndexesConfig[field] = 'text';
      });

      if (indexConfig.weights) {
        textIndexesConfig.weights = options.weights();
      }

      indexConfig.collection._ensureIndex(textIndexesConfig);
    }
  }
  /**
   * Transform the search definition.
   *
   * @param {String|Object} searchDefinition Search definition
   * @param {Object}        options          Search and index options
   *
   * @returns {Object}
   */


  transformSearchDefinition(searchDefinition, options) {
    return searchDefinition;
  }
  /**
   * Check the given search parameter for validity
   *
   * @param search
   */


  checkSearchParam(search) {
    check(search, String);
  }

} // Explicitely inherit getSearchCursor method functionality


MongoTextIndexEngine.prototype.getSearchCursor = MongoDBEngine.prototype.getSearchCursor;
MongoTextIndexEngine.prototype.getFindOptions = MongoDBEngine.prototype.getFindOptions;
module.exportDefault(MongoTextIndexEngine);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"globals.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/easysearch_core/lib/globals.js                                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Index, Engine, ReactiveEngine, Cursor, MongoDBEngine, MinimongoEngine, MongoTextIndexEngine;
module.watch(require("./main"), {
  Index(v) {
    Index = v;
  },

  Engine(v) {
    Engine = v;
  },

  ReactiveEngine(v) {
    ReactiveEngine = v;
  },

  Cursor(v) {
    Cursor = v;
  },

  MongoDBEngine(v) {
    MongoDBEngine = v;
  },

  MinimongoEngine(v) {
    MinimongoEngine = v;
  },

  MongoTextIndexEngine(v) {
    MongoTextIndexEngine = v;
  }

}, 0);
EasySearch = {
  // Core
  Index,
  Engine,
  ReactiveEngine,
  Cursor,
  // Engines
  MongoDB: MongoDBEngine,
  Minimongo: MinimongoEngine,
  MongoTextIndex: MongoTextIndexEngine
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/easysearch_core/lib/main.js                                                                             //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  Index: () => Index,
  Engine: () => Engine,
  ReactiveEngine: () => ReactiveEngine,
  Cursor: () => Cursor,
  MongoDBEngine: () => MongoDBEngine,
  MinimongoEngine: () => MinimongoEngine,
  MongoTextIndexEngine: () => MongoTextIndexEngine
});
let Index;
module.watch(require("./core/index"), {
  default(v) {
    Index = v;
  }

}, 0);
let Engine;
module.watch(require("./core/engine"), {
  default(v) {
    Engine = v;
  }

}, 1);
let ReactiveEngine;
module.watch(require("./core/reactive-engine"), {
  default(v) {
    ReactiveEngine = v;
  }

}, 2);
let Cursor;
module.watch(require("./core/cursor"), {
  default(v) {
    Cursor = v;
  }

}, 3);
let MongoDBEngine;
module.watch(require("./engines/mongo-db"), {
  default(v) {
    MongoDBEngine = v;
  }

}, 4);
let MinimongoEngine;
module.watch(require("./engines/minimongo"), {
  default(v) {
    MinimongoEngine = v;
  }

}, 5);
let MongoTextIndexEngine;
module.watch(require("./engines/mongo-text-index"), {
  default(v) {
    MongoTextIndexEngine = v;
  }

}, 6);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
