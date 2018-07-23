(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var check = Package.check.check;
var Match = Package.check.Match;
var ECMAScript = Package.ecmascript.ECMAScript;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var _ = Package.underscore._;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var options, searchDefinition, searchString, EasySearch;

var require = meteorInstall({"node_modules":{"meteor":{"easysearch:core":{"lib":{"core":{"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/easysearch_core/lib/core/index.js                                                                   //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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


  search(searchDefinition, options = {}) {
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"engine.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/easysearch_core/lib/core/engine.js                                                                  //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  constructor(config = {}) {
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


  callConfigMethod(methodName, ...args) {
    check(methodName, String);
    let func = this.config[methodName];

    if (func) {
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reactive-engine.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/easysearch_core/lib/core/reactive-engine.js                                                         //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
          throw new Meteor.Error(`Not allowed to search over field "${field}"`);
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cursor.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/easysearch_core/lib/core/cursor.js                                                                  //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  constructor(mongoCursor, count, isReady = true, publishHandle = null) {
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"search-collection.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/easysearch_core/lib/core/search-collection.js                                                       //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    this._name = `${indexConfiguration.name}/easySearch`;
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"engines":{"mongo-db.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/easysearch_core/lib/engines/mongo-db.js                                                             //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
          '$regex': `.*${searchString}.*`,
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"minimongo.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/easysearch_core/lib/engines/minimongo.js                                                            //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

MinimongoEngine.prototype.getFindOptions = function (...args) {
  let findOptions = MongoDBEngine.prototype.getFindOptions.apply(this, args);
  findOptions.transform = this.config.transform;
  return findOptions;
};

module.exportDefault(MinimongoEngine);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"mongo-text-index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/easysearch_core/lib/engines/mongo-text-index.js                                                     //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"globals.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/easysearch_core/lib/globals.js                                                                      //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/easysearch_core/lib/main.js                                                                         //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//# sourceURL=meteor://💻app/packages/easysearch_core.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvZWFzeXNlYXJjaDpjb3JlL2xpYi9jb3JlL2luZGV4LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9lYXN5c2VhcmNoOmNvcmUvbGliL2NvcmUvZW5naW5lLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9lYXN5c2VhcmNoOmNvcmUvbGliL2NvcmUvcmVhY3RpdmUtZW5naW5lLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9lYXN5c2VhcmNoOmNvcmUvbGliL2NvcmUvY3Vyc29yLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9lYXN5c2VhcmNoOmNvcmUvbGliL2NvcmUvc2VhcmNoLWNvbGxlY3Rpb24uanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2Vhc3lzZWFyY2g6Y29yZS9saWIvZW5naW5lcy9tb25nby1kYi5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvZWFzeXNlYXJjaDpjb3JlL2xpYi9lbmdpbmVzL21pbmltb25nby5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvZWFzeXNlYXJjaDpjb3JlL2xpYi9lbmdpbmVzL21vbmdvLXRleHQtaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2Vhc3lzZWFyY2g6Y29yZS9saWIvZ2xvYmFscy5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvZWFzeXNlYXJjaDpjb3JlL2xpYi9tYWluLmpzIl0sIm5hbWVzIjpbIk1vbmdvIiwibW9kdWxlIiwid2F0Y2giLCJyZXF1aXJlIiwidiIsIkVuZ2luZSIsImRlZmF1bHQiLCJJbmRleCIsImNvbnN0cnVjdG9yIiwiY29uZmlnIiwiY2hlY2siLCJPYmplY3QiLCJmaWVsZHMiLCJTdHJpbmciLCJpZ25vcmVDb2xsZWN0aW9uQ2hlY2siLCJjb2xsZWN0aW9uIiwiQ29sbGVjdGlvbiIsImVuZ2luZSIsIk1ldGVvciIsIkVycm9yIiwibmFtZSIsIl9uYW1lIiwidG9Mb3dlckNhc2UiLCJfIiwiZXh0ZW5kIiwiZGVmYXVsdENvbmZpZ3VyYXRpb24iLCJkZWZhdWx0U2VhcmNoT3B0aW9ucyIsImRlZmF1bHRzIiwibGltaXQiLCJza2lwIiwicHJvcHMiLCJvbkluZGV4Q3JlYXRlIiwicGVybWlzc2lvbiIsImNvdW50VXBkYXRlSW50ZXJ2YWxNcyIsInNlYXJjaCIsInNlYXJjaERlZmluaXRpb24iLCJvcHRpb25zIiwiY2hlY2tTZWFyY2hQYXJhbSIsIk1hdGNoIiwiT3B0aW9uYWwiLCJOdW1iZXIiLCJ1c2VySWQiLCJPbmVPZiIsIl9nZXRTZWFyY2hPcHRpb25zIiwiaW5kZXgiLCJpc1NlcnZlciIsImV4cG9ydERlZmF1bHQiLCJpc0Z1bmN0aW9uIiwiY2FsbENvbmZpZ01ldGhvZCIsIm1ldGhvZE5hbWUiLCJhcmdzIiwiZnVuYyIsImFwcGx5IiwiaW5kZXhDb25maWciLCJhbGxvd2VkRmllbGRzIiwiU2VhcmNoQ29sbGVjdGlvbiIsIlJlYWN0aXZlRW5naW5lIiwiZ2V0U2VhcmNoQ3Vyc29yIiwidHJhbnNmb3JtIiwiZG9jIiwiYmVmb3JlUHVibGlzaCIsImV2ZW50Iiwic2VhcmNoQ29sbGVjdGlvbiIsIm1vbmdvQ29sbGVjdGlvbiIsIl9jb2xsZWN0aW9uIiwidHJhbnNmb3JtU2VhcmNoRGVmaW5pdGlvbiIsImlzU3RyaW5nIiwib2JqIiwiZWFjaCIsImZpZWxkIiwiaW5kZXhPcHRpb25zIiwiaXNPYmplY3QiLCJ2YWwiLCJpbmRleE9mIiwiaXNDbGllbnQiLCJmaW5kIiwiQ3Vyc29yIiwibW9uZ29DdXJzb3IiLCJjb3VudCIsImlzUmVhZHkiLCJwdWJsaXNoSGFuZGxlIiwiZmV0Y2giLCJGdW5jdGlvbiIsIkJvb2xlYW4iLCJfbW9uZ29DdXJzb3IiLCJfY291bnQiLCJfaXNSZWFkeSIsIl9wdWJsaXNoSGFuZGxlIiwic3RvcCIsImVtcHR5Q3Vyc29yIiwib2JzZXJ2ZSIsImluZGV4Q29uZmlndXJhdGlvbiIsIl9pbmRleENvbmZpZ3VyYXRpb24iLCJfZW5naW5lIiwiX3NldFVwUHVibGljYXRpb24iLCJzdWJzY3JpYmUiLCJfZ2V0Q291bnQiLCJfZ2V0TW9uZ29DdXJzb3IiLCJpc051bWJlciIsImNvdW50RG9jIiwiZmluZE9uZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjbGllbnRTb3J0IiwiX19zZWFyY2hEZWZpbml0aW9uIiwiX19zZWFyY2hPcHRpb25zIiwiX19zb3J0UG9zaXRpb24iLCJzb3J0IiwiZ2VuZXJhdGVJZCIsIl9pZCIsImFkZEN1c3RvbUZpZWxkcyIsImRhdGEiLCJmb3JFYWNoIiwia2V5IiwiY29sbGVjdGlvblNjb3BlIiwiY29sbGVjdGlvbk5hbWUiLCJwdWJsaXNoIiwiZGVmaW5pdGlvblN0cmluZyIsIm9wdGlvbnNTdHJpbmciLCJwdWJsaWNhdGlvblNjb3BlIiwiY3Vyc29yIiwiYWRkZWQiLCJpbnRlcnZhbElEIiwic2V0SW50ZXJ2YWwiLCJjaGFuZ2VkIiwib25TdG9wIiwiY2xlYXJJbnRlcnZhbCIsInJlc3VsdHNIYW5kbGUiLCJvYnNlcnZlZERvY3MiLCJ1cGRhdGVEb2NXaXRoQ3VzdG9tRmllbGRzIiwic29ydFBvc2l0aW9uIiwib3JpZ2luYWxJZCIsInNlYXJjaE9wdGlvbnMiLCJhZGRlZEF0IiwiYXRJbmRleCIsImJlZm9yZSIsIm1hcCIsImQiLCJpbmNsdWRlcyIsImRvY0luZGV4IiwibGVuZ3RoIiwiY2hhbmdlZEF0Iiwib2xkRG9jIiwibW92ZWRUbyIsImZyb21JbmRleCIsInRvSW5kZXgiLCJiZWZvcmVEb2MiLCJyZW1vdmVkQXQiLCJyZW1vdmVkIiwiZmlsdGVyIiwicmVhZHkiLCJNb25nb0RCRW5naW5lIiwiZGVmYXVsdE1vbmdvQ29uZmlndXJhdGlvbiIsImVuZ2luZVNjb3BlIiwiYWdncmVnYXRpb24iLCJzZWxlY3RvciIsInNlYXJjaE9iamVjdCIsInNlYXJjaFN0cmluZyIsImZpZWxkU2VsZWN0b3IiLCJwdXNoIiwic2VsZWN0b3JQZXJGaWVsZCIsInJlcGxhY2UiLCJnZXRGaW5kT3B0aW9ucyIsImRpc2FibGVPcGxvZyIsInBvbGxpbmdJbnRlcnZhbE1zIiwicG9sbGluZ1Rocm90dGxlTXMiLCJmaW5kT3B0aW9ucyIsIk1pbmltb25nb0VuZ2luZSIsInByb3RvdHlwZSIsIk1vbmdvVGV4dEluZGV4RW5naW5lIiwibW9uZ29Db25maWd1cmF0aW9uIiwidHJpbSIsIiR0ZXh0IiwiJHNlYXJjaCIsInRleHRJbmRleGVzQ29uZmlnIiwid2VpZ2h0cyIsIl9lbnN1cmVJbmRleCIsIkVhc3lTZWFyY2giLCJNb25nb0RCIiwiTWluaW1vbmdvIiwiTW9uZ29UZXh0SW5kZXgiLCJleHBvcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLEtBQUo7QUFBVUMsT0FBT0MsS0FBUCxDQUFhQyxRQUFRLGNBQVIsQ0FBYixFQUFxQztBQUFDSCxRQUFNSSxDQUFOLEVBQVE7QUFBQ0osWUFBTUksQ0FBTjtBQUFROztBQUFsQixDQUFyQyxFQUF5RCxDQUF6RDtBQUE0RCxJQUFJQyxNQUFKO0FBQVdKLE9BQU9DLEtBQVAsQ0FBYUMsUUFBUSxVQUFSLENBQWIsRUFBaUM7QUFBQ0csVUFBUUYsQ0FBUixFQUFVO0FBQUNDLGFBQU9ELENBQVA7QUFBUzs7QUFBckIsQ0FBakMsRUFBd0QsQ0FBeEQ7O0FBR2pGOzs7Ozs7QUFNQSxNQUFNRyxLQUFOLENBQVk7QUFDVjs7Ozs7OztBQU9BQyxjQUFZQyxNQUFaLEVBQW9CO0FBQ2xCQyxVQUFNRCxNQUFOLEVBQWNFLE1BQWQ7QUFDQUQsVUFBTUQsT0FBT0csTUFBYixFQUFxQixDQUFDQyxNQUFELENBQXJCO0FBQ0EsUUFBRyxDQUFDSixPQUFPSyxxQkFBWCxFQUFrQ0osTUFBTUQsT0FBT00sVUFBYixFQUF5QmYsTUFBTWdCLFVBQS9COztBQUVsQyxRQUFJLEVBQUVQLE9BQU9RLE1BQVAsWUFBeUJaLE1BQTNCLENBQUosRUFBd0M7QUFDdEMsWUFBTSxJQUFJYSxPQUFPQyxLQUFYLENBQWlCLGdCQUFqQixFQUFtQyxzQ0FBbkMsQ0FBTjtB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VTtBQUFDcUssMkJBQXFCckssQ0FBckI7QUFBdUI7O0FBQW5DLENBQW5ELEVBQXdGLENBQXhGLEUiLCJmaWxlIjoiL3BhY2thZ2VzL2Vhc3lzZWFyY2hfY29yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJ1xuaW1wb3J0IEVuZ2luZSBmcm9tICcuL2VuZ2luZSdcblxuLyoqXG4gKiBBbiBJbmRleCByZXByZXNlbnRzIHRoZSBtYWluIGVudHJ5IHBvaW50IGZvciBzZWFyY2hpbmcgd2l0aCBFYXN5U2VhcmNoLiBJdCByZWxpZXMgb25cbiAqIHRoZSBnaXZlbiBlbmdpbmUgdG8gaGF2ZSB0aGUgc2VhcmNoIGZ1bmN0aW9uYWxpdHkgYW5kIGRlZmluZXMgdGhlIGRhdGEgdGhhdCBzaG91bGQgYmUgc2VhcmNoYWJsZS5cbiAqXG4gKiBAdHlwZSB7SW5kZXh9XG4gKi9cbmNsYXNzIEluZGV4IHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgQ29uZmlndXJhdGlvblxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIGNoZWNrKGNvbmZpZywgT2JqZWN0KTtcbiAgICBjaGVjayhjb25maWcuZmllbGRzLCBbU3RyaW5nXSk7XG4gICAgaWYoIWNvbmZpZy5pZ25vcmVDb2xsZWN0aW9uQ2hlY2spIGNoZWNrKGNvbmZpZy5jb2xsZWN0aW9uLCBNb25nby5Db2xsZWN0aW9uKTtcblxuICAgIGlmICghKGNvbmZpZy5lbmdpbmUgaW5zdGFuY2VvZiBFbmdpbmUpKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdpbnZhbGlkLWVuZ2luZScsICdlbmdpbmUgbmVlZHMgdG8gYmUgaW5zdGFuY2VvZiBFbmdpbmUnKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5uYW1lKVxuICAgICAgY29uZmlnLm5hbWUgPSAoY29uZmlnLmNvbGxlY3Rpb24uX25hbWUgfHwgJycpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICB0aGlzLmNvbmZpZyA9IF8uZXh0ZW5kKEluZGV4LmRlZmF1bHRDb25maWd1cmF0aW9uLCBjb25maWcpO1xuICAgIHRoaXMuZGVmYXVsdFNlYXJjaE9wdGlvbnMgPSBfLmRlZmF1bHRzKFxuICAgICAge30sXG4gICAgICB0aGlzLmNvbmZpZy5kZWZhdWx0U2VhcmNoT3B0aW9ucyxcbiAgICAgIHsgbGltaXQ6IDEwLCBza2lwOiAwLCBwcm9wczoge30gfSxcbiAgICApO1xuXG4gICAgLy8gRW5naW5lIHNwZWNpZmljIGNvZGUgb24gaW5kZXggY3JlYXRpb25cbiAgICBjb25maWcuZW5naW5lLm9uSW5kZXhDcmVhdGUodGhpcy5jb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgY29uZmlndXJhdGlvbiBmb3IgYW4gaW5kZXguXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRDb25maWd1cmF0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwZXJtaXNzaW9uOiAoKSA9PiB0cnVlLFxuICAgICAgZGVmYXVsdFNlYXJjaE9wdGlvbnM6IHt9LFxuICAgICAgY291bnRVcGRhdGVJbnRlcnZhbE1zOiAyMDAwLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIHRoZSBpbmRleC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBzZWFyY2hEZWZpbml0aW9uIFNlYXJjaCBkZWZpbml0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgb3B0aW9ucyAgICAgICAgICBPcHRpb25zXG4gICAqXG4gICAqIEByZXR1cm5zIHtDdXJzb3J9XG4gICAqL1xuICBzZWFyY2goc2VhcmNoRGVmaW5pdGlvbiwgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5jb25maWcuZW5naW5lLmNoZWNrU2VhcmNoUGFyYW0oc2VhcmNoRGVmaW5pdGlvbiwgdGhpcy5jb25maWcpO1xuXG4gICAgY2hlY2sob3B0aW9ucywge1xuICAgICAgbGltaXQ6IE1hdGNoLk9wdGlvbmFsKE51bWJlciksXG4gICAgICBza2lwOiBNYXRjaC5PcHRpb25hbChOdW1iZXIpLFxuICAgICAgcHJvcHM6IE1hdGNoLk9wdGlvbmFsKE9iamVjdCksXG4gICAgICB1c2VySWQ6IE1hdGNoLk9wdGlvbmFsKE1hdGNoLk9uZU9mKFN0cmluZywgbnVsbCkpLFxuICAgIH0pO1xuXG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIHNlYXJjaDogdGhpcy5fZ2V0U2VhcmNoT3B0aW9ucyhvcHRpb25zKSxcbiAgICAgIGluZGV4OiB0aGlzLmNvbmZpZyxcbiAgICB9O1xuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5wZXJtaXNzaW9uKG9wdGlvbnMuc2VhcmNoKSkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignbm90LWFsbG93ZWQnLCBcIk5vdCBhbGxvd2VkIHRvIHNlYXJjaCB0aGlzIGluZGV4IVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb25maWcuZW5naW5lLnNlYXJjaChzZWFyY2hEZWZpbml0aW9uLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzZWFyY2ggb3B0aW9ucyBiYXNlZCBvbiB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyB0byB1c2VcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIF9nZXRTZWFyY2hPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAoIU1ldGVvci5pc1NlcnZlcikge1xuICAgICAgZGVsZXRlIG9wdGlvbnMudXNlcklkO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy51c2VySWQgPT09IFwidW5kZWZpbmVkXCIgJiYgTWV0ZW9yLnVzZXJJZCkge1xuICAgICAgb3B0aW9ucy51c2VySWQgPSBNZXRlb3IudXNlcklkKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF8uZGVmYXVsdHMob3B0aW9ucywgdGhpcy5kZWZhdWx0U2VhcmNoT3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5kZXg7XG4iLCIvKipcbiAqIEFuIEVuZ2luZSBpcyB0aGUgdGVjaG5vbG9neSB1c2VkIGZvciBzZWFyY2hpbmcgd2l0aCBFYXN5U2VhcmNoLCB3aXRoXG4gKiBjdXN0b21pemFibGUgY29uZmlndXJhdGlvbiB0byBob3cgaXQgaW50ZXJhY3RzIHdpdGggdGhlIGRhdGEgZnJvbSB0aGUgSW5kZXguXG4gKlxuICogQHR5cGUge0VuZ2luZX1cbiAqL1xuY2xhc3MgRW5naW5lIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgY29uZmlndXJhdGlvblxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZyA9IHt9KSB7XG4gICAgaWYgKHRoaXMuY29uc3RydWN0b3IgPT09IEVuZ2luZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaW5pdGlhbGl6ZSBpbnN0YW5jZSBvZiBFbmdpbmUnKTtcbiAgICB9XG5cbiAgICBpZiAoIV8uaXNGdW5jdGlvbih0aGlzLnNlYXJjaCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRW5naW5lIG5lZWRzIHRvIGltcGxlbWVudCBzZWFyY2ggbWV0aG9kJyk7XG4gICAgfVxuXG4gICAgdGhpcy5jb25maWcgPSBfLmRlZmF1bHRzKHt9LCBjb25maWcsIHRoaXMuZGVmYXVsdENvbmZpZ3VyYXRpb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGRlZmF1bHQgY29uZmlndXJhdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGRlZmF1bHRDb25maWd1cmF0aW9uKCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIGEgY29uZmlndXJhdGlvbiBtZXRob2Qgd2l0aCB0aGUgZW5naW5lIHNjb3BlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kTmFtZSBNZXRob2QgbmFtZVxuICAgKiBAcGFyYW0ge09iamVjdH0gYXJncyAgICAgICBBcmd1bWVudHMgZm9yIHRoZSBtZXRob2RcbiAgICpcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBjYWxsQ29uZmlnTWV0aG9kKG1ldGhvZE5hbWUsIC4uLmFyZ3MpIHtcbiAgICBjaGVjayhtZXRob2ROYW1lLCBTdHJpbmcpO1xuXG4gICAgbGV0IGZ1bmMgPSB0aGlzLmNvbmZpZ1ttZXRob2ROYW1lXTtcblxuICAgIGlmIChmdW5jKSB7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdGhlIGdpdmVuIHNlYXJjaCBwYXJhbWV0ZXIgZm9yIHZhbGlkaXR5XG4gICAqXG4gICAqIEBwYXJhbSBzZWFyY2hcbiAgICovXG4gIGNoZWNrU2VhcmNoUGFyYW0oc2VhcmNoKSB7XG4gICAgY2hlY2soc2VhcmNoLCBTdHJpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqQ29kZSB0byBydW4gb24gaW5kZXggY3JlYXRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGluZGV4Q29uZmlnIEluZGV4IGNvbmZpZ3VyYWN0aW9uXG4gICAqL1xuICBvbkluZGV4Q3JlYXRlKGluZGV4Q29uZmlnKSB7XG4gICAgaWYgKCFpbmRleENvbmZpZy5hbGxvd2VkRmllbGRzKSB7XG4gICAgICBpbmRleENvbmZpZy5hbGxvd2VkRmllbGRzID0gaW5kZXhDb25maWcuZmllbGRzO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbmdpbmU7XG4iLCJpbXBvcnQgU2VhcmNoQ29sbGVjdGlvbiBmcm9tICcuL3NlYXJjaC1jb2xsZWN0aW9uJ1xuaW1wb3J0IEVuZ2luZSBmcm9tICcuL2VuZ2luZSdcblxuLyoqXG4gKiBBIFJlYWN0aXZlRW5naW5lIGhhbmRsZXMgdGhlIHJlYWN0aXZlIGxvZ2ljLCBzdWNoIGFzIHN1YnNjcmliaW5nXG4gKiBhbmQgcHVibGlzaGluZyBkb2N1bWVudHMgaW50byBhIHNlbGYgY29udGFpbmVkIGNvbGxlY3Rpb24uXG4gKlxuICogQHR5cGUge1JlYWN0aXZlRW5naW5lfVxuICovXG5jbGFzcyBSZWFjdGl2ZUVuZ2luZSBleHRlbmRzIEVuZ2luZSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBDb25maWd1cmF0aW9uXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoY29uZmlnKTtcblxuICAgIGlmICh0aGlzID09PSB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbml0aWFsaXplIGluc3RhbmNlIG9mIFJlYWN0aXZlRW5naW5lJyk7XG4gICAgfVxuXG4gICAgaWYgKCFfLmlzRnVuY3Rpb24odGhpcy5nZXRTZWFyY2hDdXJzb3IpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlYWN0aXZlIGVuZ2luZSBuZWVkcyB0byBpbXBsZW1lbnQgZ2V0U2VhcmNoQ3Vyc29yIG1ldGhvZCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gZGVmYXVsdCBjb25maWd1cmF0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZGVmYXVsdENvbmZpZ3VyYXRpb24oKSB7XG4gICAgcmV0dXJuIF8uZGVmYXVsdHMoe30sIHtcbiAgICAgIHRyYW5zZm9ybTogKGRvYykgPT4gZG9jLFxuICAgICAgYmVmb3JlUHVibGlzaDogKGV2ZW50LCBkb2MpID0+IGRvY1xuICAgIH0sIHN1cGVyLmRlZmF1bHRDb25maWd1cmF0aW9uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvZGUgdG8gcnVuIG9uIGluZGV4IGNyZWF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpbmRleENvbmZpZyBJbmRleCBjb25maWd1cmF0aW9uXG4gICAqL1xuICBvbkluZGV4Q3JlYXRlKGluZGV4Q29uZmlnKSB7XG4gICAgc3VwZXIub25JbmRleENyZWF0ZShpbmRleENvbmZpZyk7XG4gICAgaW5kZXhDb25maWcuc2VhcmNoQ29sbGVjdGlvbiA9IG5ldyBTZWFyY2hDb2xsZWN0aW9uKGluZGV4Q29uZmlnLCB0aGlzKTtcbiAgICBpbmRleENvbmZpZy5tb25nb0NvbGxlY3Rpb24gPSBpbmRleENvbmZpZy5zZWFyY2hDb2xsZWN0aW9uLl9jb2xsZWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybSB0aGUgc2VhcmNoIGRlZmluaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gc2VhcmNoRGVmaW5pdGlvbiBTZWFyY2ggZGVmaW5pdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgIG9wdGlvbnMgICAgICAgICAgU2VhcmNoIGFuZCBpbmRleCBvcHRpb25zXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICB0cmFuc2Zvcm1TZWFyY2hEZWZpbml0aW9uKHNlYXJjaERlZmluaXRpb24sIG9wdGlvbnMpIHtcbiAgICBpZiAoXy5pc1N0cmluZyhzZWFyY2hEZWZpbml0aW9uKSkge1xuICAgICAgbGV0IG9iaiA9IHt9O1xuXG4gICAgICBfLmVhY2gob3B0aW9ucy5pbmRleC5maWVsZHMsIGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBvYmpbZmllbGRdID0gc2VhcmNoRGVmaW5pdGlvbjtcbiAgICAgIH0pO1xuXG4gICAgICBzZWFyY2hEZWZpbml0aW9uID0gb2JqO1xuICAgIH1cblxuICAgIHJldHVybiBzZWFyY2hEZWZpbml0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRoZSBnaXZlbiBzZWFyY2ggcGFyYW1ldGVyIGZvciB2YWxpZGl0eVxuICAgKlxuICAgKiBAcGFyYW0gc2VhcmNoXG4gICAqIEBwYXJhbSBpbmRleE9wdGlvbnNcbiAgICovXG4gIGNoZWNrU2VhcmNoUGFyYW0oc2VhcmNoLCBpbmRleE9wdGlvbnMpIHtcbiAgICBjaGVjayhzZWFyY2gsIE1hdGNoLk9uZU9mKFN0cmluZywgT2JqZWN0KSk7XG5cbiAgICBpZiAoXy5pc09iamVjdChzZWFyY2gpKSB7XG4gICAgICBfLmVhY2goc2VhcmNoLCBmdW5jdGlvbiAodmFsLCBmaWVsZCkge1xuICAgICAgICBjaGVjayh2YWwsIFN0cmluZyk7XG5cbiAgICAgICAgaWYgKC0xID09PSBfLmluZGV4T2YoaW5kZXhPcHRpb25zLmFsbG93ZWRGaWVsZHMsIGZpZWxkKSkge1xuICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoYE5vdCBhbGxvd2VkIHRvIHNlYXJjaCBvdmVyIGZpZWxkIFwiJHtmaWVsZH1cImApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVhY3RpdmVseSBzZWFyY2ggb24gdGhlIGNvbGxlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZWFyY2hEZWZpbml0aW9uIFNlYXJjaCBkZWZpbml0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zICAgICAgICAgIE9wdGlvbnNcbiAgICpcbiAgICogQHJldHVybnMge0N1cnNvcn1cbiAgICovXG4gIHNlYXJjaChzZWFyY2hEZWZpbml0aW9uLCBvcHRpb25zKSB7XG4gICAgaWYgKE1ldGVvci5pc0NsaWVudCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW5kZXguc2VhcmNoQ29sbGVjdGlvbi5maW5kKHNlYXJjaERlZmluaXRpb24sIG9wdGlvbnMuc2VhcmNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0U2VhcmNoQ3Vyc29yKFxuICAgICAgICB0aGlzLnRyYW5zZm9ybVNlYXJjaERlZmluaXRpb24oc2VhcmNoRGVmaW5pdGlvbiwgb3B0aW9ucyksXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0aXZlRW5naW5lO1xuIiwiLyoqXG4gKiBBIEN1cnNvciByZXByZXNlbnRzIGEgcG9pbnRlciB0byB0aGUgc2VhcmNoIHJlc3VsdHMuIFNpbmNlIGl0J3Mgc3BlY2lmaWNcbiAqIHRvIEVhc3lTZWFyY2ggaXQgY2FuIGFsc28gYmUgdXNlZCB0byBjaGVjayBmb3IgdmFsaWQgcmV0dXJuIHZhbHVlcy5cbiAqXG4gKiBAdHlwZSB7Q3Vyc29yfVxuICovXG5jbGFzcyBDdXJzb3Ige1xuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICpcbiAgICogQHBhcmFtIHtNb25nby5DdXJzb3J9IG1vbmdvQ3Vyc29yICAgUmVmZXJlbmNlZCBtb25nbyBjdXJzb3JcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgIGNvdW50ICAgICAgICAgQ291bnQgb2YgYWxsIGRvY3VtZW50cyBmb3VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59ICAgICAgaXNSZWFkeSAgICAgICBDdXJzb3IgaXMgcmVhZHlcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgIHB1Ymxpc2hIYW5kbGUgUHVibGlzaCBoYW5kbGUgdG8gc3RvcCBpZiBvbiBjbGllbnRcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihtb25nb0N1cnNvciwgY291bnQsIGlzUmVhZHkgPSB0cnVlLCBwdWJsaXNoSGFuZGxlID0gbnVsbCkge1xuICAgIGNoZWNrKG1vbmdvQ3Vyc29yLmZldGNoLCBGdW5jdGlvbik7XG4gICAgY2hlY2soY291bnQsIE51bWJlcik7XG4gICAgY2hlY2soaXNSZWFkeSwgTWF0Y2guT3B0aW9uYWwoQm9vbGVhbikpO1xuICAgIGNoZWNrKHB1Ymxpc2hIYW5kbGUsIE1hdGNoLk9uZU9mKG51bGwsIE9iamVjdCkpO1xuXG4gICAgdGhpcy5fbW9uZ29DdXJzb3IgPSBtb25nb0N1cnNvcjtcbiAgICB0aGlzLl9jb3VudCA9IGNvdW50O1xuICAgIHRoaXMuX2lzUmVhZHkgPSBpc1JlYWR5O1xuICAgIHRoaXMuX3B1Ymxpc2hIYW5kbGUgPSBwdWJsaXNoSGFuZGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIHRoZSBzZWFyY2ggcmVzdWx0cy5cbiAgICpcbiAgICogQHJldHVybnMge1tPYmplY3RdfVxuICAgKi9cbiAgZmV0Y2goKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vbmdvQ3Vyc29yLmZldGNoKCk7XG4gIH1cblxuIC8qKlxuICAqIFN0b3AgdGhlIHN1YnNjcmlwdGlvbiBoYW5kbGUgYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJzb3IuXG4gICovXG4gIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMuX3B1Ymxpc2hIYW5kbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wdWJsaXNoSGFuZGxlLnN0b3AoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGNvdW50IG9mIGFsbCBkb2N1bWVudHMgZm91bmRcbiAgICpcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGNvdW50KCkge1xuICAgIHJldHVybiB0aGlzLl9jb3VudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gaWYgdGhlIGN1cnNvciBpcyByZWFkeS5cbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBpc1JlYWR5KCkge1xuICAgIHJldHVybiB0aGlzLl9pc1JlYWR5O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcmF3IG1vbmdvIGN1cnNvci5cbiAgICpcbiAgICogQHJldHVybnMge01vbmdvLkN1cnNvcn1cbiAgICovXG4gIGdldCBtb25nb0N1cnNvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fbW9uZ29DdXJzb3I7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgZmFrZSBlbXB0eSBjdXJzb3IsIHdpdGhvdXQgZGF0YS5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgZW1wdHlDdXJzb3IoKSB7XG4gICAgcmV0dXJuIHsgZmV0Y2g6ICgpID0+IFtdLCBvYnNlcnZlOiAoKSA9PiB7IHJldHVybiB7IHN0b3A6ICgpID0+IG51bGwgfTsgfSwgc3RvcDogKCkgPT4ge30gfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDdXJzb3I7XG4iLCJpbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbydcbmltcG9ydCBDdXJzb3IgZnJvbSAnLi9jdXJzb3InXG5pbXBvcnQgUmVhY3RpdmVFbmdpbmUgZnJvbSAnLi9yZWFjdGl2ZS1lbmdpbmUnXG5cbi8qKlxuICogQSBzZWFyY2ggY29sbGVjdGlvbiByZXByZXNlbnRzIGEgcmVhY3RpdmUgY29sbGVjdGlvbiBvbiB0aGUgY2xpZW50LFxuICogd2hpY2ggaXMgdXNlZCBieSB0aGUgUmVhY3RpdmVFbmdpbmUgZm9yIHNlYXJjaGluZy5cbiAqXG4gKiBAdHlwZSB7U2VhcmNoQ29sbGVjdGlvbn1cbiAqL1xuY2xhc3MgU2VhcmNoQ29sbGVjdGlvbiB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICBpbmRleENvbmZpZ3VyYXRpb24gSW5kZXggY29uZmlndXJhdGlvblxuICAgKiBAcGFyYW0ge1JlYWN0aXZlRW5naW5lfSBlbmdpbmUgICAgICAgICAgICAgUmVhY3RpdmUgRW5naW5lXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5kZXhDb25maWd1cmF0aW9uLCBlbmdpbmUpIHtcbiAgICBjaGVjayhpbmRleENvbmZpZ3VyYXRpb24sIE9iamVjdCk7XG4gICAgY2hlY2soaW5kZXhDb25maWd1cmF0aW9uLm5hbWUsIE1hdGNoLk9uZU9mKFN0cmluZywgbnVsbCkpO1xuXG4gICAgaWYgKCEoZW5naW5lIGluc3RhbmNlb2YgUmVhY3RpdmVFbmdpbmUpKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdpbnZhbGlkLWVuZ2luZScsICdlbmdpbmUgbmVlZHMgdG8gYmUgaW5zdGFuY2VvZiBSZWFjdGl2ZUVuZ2luZScpO1xuICAgIH1cblxuICAgIHRoaXMuX2luZGV4Q29uZmlndXJhdGlvbiA9IGluZGV4Q29uZmlndXJhdGlvbjtcbiAgICB0aGlzLl9uYW1lID0gYCR7aW5kZXhDb25maWd1cmF0aW9uLm5hbWV9L2Vhc3lTZWFyY2hgO1xuICAgIHRoaXMuX2VuZ2luZSA9IGVuZ2luZTtcblxuICAgIGlmIChNZXRlb3IuaXNDbGllbnQpIHtcbiAgICAgIHRoaXMuX2NvbGxlY3Rpb24gPSBuZXcgTW9uZ28uQ29sbGVjdGlvbih0aGlzLl9uYW1lKTtcbiAgICB9IGVsc2UgaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICAgICAgdGhpcy5fc2V0VXBQdWJsaWNhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgbmFtZVxuICAgKlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGVuZ2luZVxuICAgKlxuICAgKiBAcmV0dXJucyB7UmVhY3RpdmVFbmdpbmV9XG4gICAqL1xuICBnZXQgZW5naW5lKCkge1xuICAgIHJldHVybiB0aGlzLl9lbmdpbmU7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBkb2N1bWVudHMgb24gdGhlIGNsaWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHNlYXJjaERlZmluaXRpb24gU2VhcmNoIGRlZmluaXRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgICAgICAgICAgT3B0aW9uc1xuICAgKlxuICAgKiBAcmV0dXJucyB7Q3Vyc29yfVxuICAgKi9cbiAgZmluZChzZWFyY2hEZWZpbml0aW9uLCBvcHRpb25zKSB7XG4gICAgaWYgKCFNZXRlb3IuaXNDbGllbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZmluZCBjYW4gb25seSBiZSB1c2VkIG9uIGNsaWVudCcpO1xuICAgIH1cblxuICAgIGxldCBwdWJsaXNoSGFuZGxlID0gTWV0ZW9yLnN1YnNjcmliZSh0aGlzLm5hbWUsIHNlYXJjaERlZmluaXRpb24sIG9wdGlvbnMpO1xuXG4gICAgbGV0IGNvdW50ID0gdGhpcy5fZ2V0Q291bnQoc2VhcmNoRGVmaW5pdGlvbik7XG4gICAgbGV0IG1vbmdvQ3Vyc29yID0gdGhpcy5fZ2V0TW9uZ29DdXJzb3Ioc2VhcmNoRGVmaW5pdGlvbiwgb3B0aW9ucyk7XG5cbiAgICBpZiAoIV8uaXNOdW1iZXIoY291bnQpKSB7XG4gICAgICByZXR1cm4gbmV3IEN1cnNvcihtb25nb0N1cnNvciwgMCwgZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ3Vyc29yKG1vbmdvQ3Vyc29yLCBjb3VudCwgdHJ1ZSwgcHVibGlzaEhhbmRsZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb3VudCBvZiB0aGUgY3Vyc29yLlxuICAgKlxuICAgKiBAcGFyYW1zIHtPYmplY3R9IHNlYXJjaERlZmluaXRpb24gU2VhcmNoIGRlZmluaXRpb25cbiAgICpcbiAgICogQHJldHVybnMge0N1cnNvci5jb3VudH1cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRDb3VudChzZWFyY2hEZWZpbml0aW9uKSB7XG4gICAgbGV0IGNvdW50RG9jID0gdGhpcy5fY29sbGVjdGlvbi5maW5kT25lKCdzZWFyY2hDb3VudCcgKyBKU09OLnN0cmluZ2lmeShzZWFyY2hEZWZpbml0aW9uKSk7XG5cbiAgICBpZiAoY291bnREb2MpIHtcbiAgICAgIHJldHVybiBjb3VudERvYy5jb3VudDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtb25nbyBjdXJzb3Igb24gdGhlIGNsaWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHNlYXJjaERlZmluaXRpb24gU2VhcmNoIGRlZmluaXRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgICAgICAgICAgU2VhcmNoIG9wdGlvbnNcbiAgICpcbiAgICogQHJldHVybnMge0N1cnNvcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRNb25nb0N1cnNvcihzZWFyY2hEZWZpbml0aW9uLCBvcHRpb25zKSB7XG4gICAgY29uc3QgY2xpZW50U29ydCA9IHRoaXMuZW5naW5lLmNhbGxDb25maWdNZXRob2QoJ2NsaWVudFNvcnQnLCBzZWFyY2hEZWZpbml0aW9uLCBvcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzLl9jb2xsZWN0aW9uLmZpbmQoXG4gICAgICB7IF9fc2VhcmNoRGVmaW5pdGlvbjogSlNPTi5zdHJpbmdpZnkoc2VhcmNoRGVmaW5pdGlvbiksIF9fc2VhcmNoT3B0aW9uczogSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5wcm9wcykgfSxcbiAgICAgIHtcbiAgICAgICAgdHJhbnNmb3JtOiAoZG9jKSA9PiB7XG4gICAgICAgICAgZGVsZXRlIGRvYy5fX3NlYXJjaERlZmluaXRpb247XG4gICAgICAgICAgZGVsZXRlIGRvYy5fX3NlYXJjaE9wdGlvbnM7XG4gICAgICAgICAgZGVsZXRlIGRvYy5fX3NvcnRQb3NpdGlvbjtcblxuICAgICAgICAgIGRvYyA9IHRoaXMuZW5naW5lLmNvbmZpZy50cmFuc2Zvcm0oZG9jKTtcblxuICAgICAgICAgIHJldHVybiBkb2M7XG4gICAgICAgIH0sXG4gICAgICAgIHNvcnQ6IChjbGllbnRTb3J0ID8gY2xpZW50U29ydCA6IFsnX19zb3J0UG9zaXRpb24nXSlcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHVuaXF1ZSBkb2N1bWVudCBpZCBmb3IgcHVibGljYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RG9jdW1lbnR9IGRvY1xuICAgKlxuICAgKiBAcmV0dXJucyBzdHJpbmdcbiAgICovXG4gIGdlbmVyYXRlSWQoZG9jKSB7XG4gICAgcmV0dXJuIGRvYy5faWQgKyBkb2MuX19zZWFyY2hEZWZpbml0aW9uICsgZG9jLl9fc2VhcmNoT3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY3VzdG9tIGZpZWxkcyB0byB0aGUgZ2l2ZW4gZG9jdW1lbnRcbiAgICpcbiAgICogQHBhcmFtIHtEb2N1bWVudH0gZG9jXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgIGRhdGFcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBhZGRDdXN0b21GaWVsZHMoZG9jLCBkYXRhKSB7XG4gICAgXy5mb3JFYWNoKGRhdGEsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xuICAgICAgZG9jWydfXycgKyBrZXldID0gdmFsO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRvYztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdXAgcHVibGljYXRpb24uXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0VXBQdWJsaWNhdGlvbigpIHtcbiAgICB2YXIgY29sbGVjdGlvblNjb3BlID0gdGhpcyxcbiAgICAgIGNvbGxlY3Rpb25OYW1lID0gdGhpcy5uYW1lO1xuXG4gICAgTWV0ZW9yLnB1Ymxpc2goY29sbGVjdGlvbk5hbWUsIGZ1bmN0aW9uIChzZWFyY2hEZWZpbml0aW9uLCBvcHRpb25zKSB7XG4gICAgICBjaGVjayhzZWFyY2hEZWZpbml0aW9uLCBNYXRjaC5PbmVPZihTdHJpbmcsIE9iamVjdCkpO1xuICAgICAgY2hlY2sob3B0aW9ucywgT2JqZWN0KTtcblxuICAgICAgbGV0IGRlZmluaXRpb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShzZWFyY2hEZWZpbml0aW9uKSxcbiAgICAgICAgb3B0aW9uc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMucHJvcHMpO1xuXG4gICAgICBvcHRpb25zLnVzZXJJZCA9IHRoaXMudXNlcklkO1xuICAgICAgb3B0aW9ucy5wdWJsaWNhdGlvblNjb3BlID0gdGhpcztcblxuICAgICAgaWYgKCFjb2xsZWN0aW9uU2NvcGUuX2luZGV4Q29uZmlndXJhdGlvbi5wZXJtaXNzaW9uKG9wdGlvbnMpKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJ25vdC1hbGxvd2VkJywgXCJZb3UncmUgbm90IGFsbG93ZWQgdG8gc2VhcmNoIHRoaXMgaW5kZXghXCIpO1xuICAgICAgfVxuXG4gICAgICBjb2xsZWN0aW9uU2NvcGUuZW5naW5lLmNoZWNrU2VhcmNoUGFyYW0oc2VhcmNoRGVmaW5pdGlvbiwgY29sbGVjdGlvblNjb3BlLl9pbmRleENvbmZpZ3VyYXRpb24pO1xuXG4gICAgICBsZXQgY3Vyc29yID0gY29sbGVjdGlvblNjb3BlLmVuZ2luZS5zZWFyY2goc2VhcmNoRGVmaW5pdGlvbiwge1xuICAgICAgICBzZWFyY2g6IG9wdGlvbnMsXG4gICAgICAgIGluZGV4OiBjb2xsZWN0aW9uU2NvcGUuX2luZGV4Q29uZmlndXJhdGlvblxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNvdW50ID0gY3Vyc29yLmNvdW50KCk7XG5cbiAgICAgIHRoaXMuYWRkZWQoY29sbGVjdGlvbk5hbWUsICdzZWFyY2hDb3VudCcgKyBkZWZpbml0aW9uU3RyaW5nLCB7IGNvdW50IH0pO1xuXG4gICAgICBsZXQgaW50ZXJ2YWxJRDtcblxuICAgICAgaWYgKGNvbGxlY3Rpb25TY29wZS5faW5kZXhDb25maWd1cmF0aW9uLmNvdW50VXBkYXRlSW50ZXJ2YWxNcykge1xuICAgICAgICBpbnRlcnZhbElEID0gTWV0ZW9yLnNldEludGVydmFsKFxuICAgICAgICAgICgpID0+IHRoaXMuY2hhbmdlZChcbiAgICAgICAgICAgIGNvbGxlY3Rpb25OYW1lLFxuICAgICAgICAgICAgJ3NlYXJjaENvdW50JyArIGRlZmluaXRpb25TdHJpbmcsXG4gICAgICAgICAgICB7IGNvdW50OiBjdXJzb3IubW9uZ29DdXJzb3IuY291bnQgJiYgY3Vyc29yLm1vbmdvQ3Vyc29yLmNvdW50KCkgfHwgMCB9XG4gICAgICAgICAgKSxcbiAgICAgICAgICBjb2xsZWN0aW9uU2NvcGUuX2luZGV4Q29uZmlndXJhdGlvbi5jb3VudFVwZGF0ZUludGVydmFsTXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vblN0b3AoZnVuY3Rpb24gKCkge1xuICAgICAgICBpbnRlcnZhbElEICYmIE1ldGVvci5jbGVhckludGVydmFsKGludGVydmFsSUQpO1xuICAgICAgICByZXN1bHRzSGFuZGxlICYmIHJlc3VsdHNIYW5kbGUuc3RvcCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGxldCBvYnNlcnZlZERvY3MgPSBbXTtcblxuICAgICAgY29uc3QgdXBkYXRlRG9jV2l0aEN1c3RvbUZpZWxkcyA9IChkb2MsIHNvcnRQb3NpdGlvbikgPT4gY29sbGVjdGlvblNjb3BlXG4gICAgICAgIC5hZGRDdXN0b21GaWVsZHMoZG9jLCB7XG4gICAgICAgICAgb3JpZ2luYWxJZDogZG9jLl9pZCxcbiAgICAgICAgICBzb3J0UG9zaXRpb24sXG4gICAgICAgICAgc2VhcmNoRGVmaW5pdGlvbjogZGVmaW5pdGlvblN0cmluZyxcbiAgICAgICAgICBzZWFyY2hPcHRpb25zOiBvcHRpb25zU3RyaW5nLFxuICAgICAgICB9KTtcblxuICAgICAgbGV0IHJlc3VsdHNIYW5kbGUgPSBjdXJzb3IubW9uZ29DdXJzb3Iub2JzZXJ2ZSh7XG4gICAgICAgIGFkZGVkQXQ6IChkb2MsIGF0SW5kZXgsIGJlZm9yZSkgPT4ge1xuICAgICAgICAgIGRvYyA9IGNvbGxlY3Rpb25TY29wZS5lbmdpbmUuY29uZmlnLmJlZm9yZVB1Ymxpc2goJ2FkZGVkQXQnLCBkb2MsIGF0SW5kZXgsIGJlZm9yZSk7XG4gICAgICAgICAgZG9jID0gdXBkYXRlRG9jV2l0aEN1c3RvbUZpZWxkcyhkb2MsIGF0SW5kZXgpO1xuXG4gICAgICAgICAgdGhpcy5hZGRlZChjb2xsZWN0aW9uTmFtZSwgY29sbGVjdGlvblNjb3BlLmdlbmVyYXRlSWQoZG9jKSwgZG9jKTtcblxuICAgICAgICAgIC8qXG4gICAgICAgICAgICogUmVvcmRlciBhbGwgb2JzZXJ2ZWQgZG9jcyB0byBrZWVwIHZhbGlkIHNvcnRpbmcuIEhlcmUgd2UgYWRqdXN0IHRoZVxuICAgICAgICAgICAqIHNvcnRQb3NpdGlvbiBudW1iZXIgZmllbGQgdG8gZ2l2ZSBzcGFjZSBmb3IgdGhlIG5ld2x5IGFkZGVkIGRvY1xuICAgICAgICAgICAqL1xuICAgICAgICAgIGlmIChvYnNlcnZlZERvY3MubWFwKGQgPT4gZC5fX3NvcnRQb3NpdGlvbikuaW5jbHVkZXMoYXRJbmRleCkpIHtcbiAgICAgICAgICAgIG9ic2VydmVkRG9jcyA9IG9ic2VydmVkRG9jcy5tYXAoKGRvYywgZG9jSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGRvYy5fX3NvcnRQb3NpdGlvbiA+PSBhdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgZG9jID0gY29sbGVjdGlvblNjb3BlLmFkZEN1c3RvbUZpZWxkcyhkb2MsIHtcbiAgICAgICAgICAgICAgICAgIHNvcnRQb3NpdGlvbjogZG9jLl9fc29ydFBvc2l0aW9uICsgMSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCB0aHJvdyBjaGFuZ2VkIGV2ZW50IG9uIGxhc3QgZG9jIGFzIGl0IHdpbGwgYmUgcmVtb3ZlZCBmcm9tIGN1cnNvclxuICAgICAgICAgICAgICAgIGlmIChkb2NJbmRleCA8IG9ic2VydmVkRG9jcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlZChcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbk5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25TY29wZS5nZW5lcmF0ZUlkKGRvYyksXG4gICAgICAgICAgICAgICAgICAgIGRvY1xuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gZG9jO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb2JzZXJ2ZWREb2NzID0gWy4uLm9ic2VydmVkRG9jcyAsIGRvY107XG4gICAgICAgIH0sXG4gICAgICAgIGNoYW5nZWRBdDogKGRvYywgb2xkRG9jLCBhdEluZGV4KSA9PiB7XG4gICAgICAgICAgZG9jID0gY29sbGVjdGlvblNjb3BlLmVuZ2luZS5jb25maWcuYmVmb3JlUHVibGlzaCgnY2hhbmdlZEF0JywgZG9jLCBvbGREb2MsIGF0SW5kZXgpO1xuICAgICAgICAgIGRvYyA9IGNvbGxlY3Rpb25TY29wZS5hZGRDdXN0b21GaWVsZHMoZG9jLCB7XG4gICAgICAgICAgICBzZWFyY2hEZWZpbml0aW9uOiBkZWZpbml0aW9uU3RyaW5nLFxuICAgICAgICAgICAgc2VhcmNoT3B0aW9uczogb3B0aW9uc1N0cmluZyxcbiAgICAgICAgICAgIHNvcnRQb3NpdGlvbjogYXRJbmRleCxcbiAgICAgICAgICAgIG9yaWdpbmFsSWQ6IGRvYy5faWRcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuY2hhbmdlZChjb2xsZWN0aW9uTmFtZSwgY29sbGVjdGlvblNjb3BlLmdlbmVyYXRlSWQoZG9jKSwgZG9jKTtcbiAgICAgICAgfSxcbiAgICAgICAgbW92ZWRUbzogKGRvYywgZnJvbUluZGV4LCB0b0luZGV4LCBiZWZvcmUpID0+IHtcbiAgICAgICAgICBkb2MgPSBjb2xsZWN0aW9uU2NvcGUuZW5naW5lLmNvbmZpZy5iZWZvcmVQdWJsaXNoKCdtb3ZlZFRvJywgZG9jLCBmcm9tSW5kZXgsIHRvSW5kZXgsIGJlZm9yZSk7XG4gICAgICAgICAgZG9jID0gdXBkYXRlRG9jV2l0aEN1c3RvbUZpZWxkcyhkb2MsIHRvSW5kZXgpO1xuXG4gICAgICAgICAgbGV0IGJlZm9yZURvYyA9IGNvbGxlY3Rpb25TY29wZS5faW5kZXhDb25maWd1cmF0aW9uLmNvbGxlY3Rpb24uZmluZE9uZShiZWZvcmUpO1xuXG4gICAgICAgICAgaWYgKGJlZm9yZURvYykge1xuICAgICAgICAgICAgYmVmb3JlRG9jID0gY29sbGVjdGlvblNjb3BlLmFkZEN1c3RvbUZpZWxkcyhiZWZvcmVEb2MsIHtcbiAgICAgICAgICAgICAgc2VhcmNoRGVmaW5pdGlvbjogZGVmaW5pdGlvblN0cmluZyxcbiAgICAgICAgICAgICAgc2VhcmNoT3B0aW9uczogb3B0aW9uc1N0cmluZyxcbiAgICAgICAgICAgICAgc29ydFBvc2l0aW9uOiBmcm9tSW5kZXhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkKGNvbGxlY3Rpb25OYW1lLCBjb2xsZWN0aW9uU2NvcGUuZ2VuZXJhdGVJZChiZWZvcmVEb2MpLCBiZWZvcmVEb2MpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuY2hhbmdlZChjb2xsZWN0aW9uTmFtZSwgY29sbGVjdGlvblNjb3BlLmdlbmVyYXRlSWQoZG9jKSwgZG9jKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlZEF0OiAoZG9jLCBhdEluZGV4KSA9PiB7XG4gICAgICAgICAgZG9jID0gY29sbGVjdGlvblNjb3BlLmVuZ2luZS5jb25maWcuYmVmb3JlUHVibGlzaCgncmVtb3ZlZEF0JywgZG9jLCBhdEluZGV4KTtcbiAgICAgICAgICBkb2MgPSBjb2xsZWN0aW9uU2NvcGUuYWRkQ3VzdG9tRmllbGRzKFxuICAgICAgICAgICAgZG9jLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZWFyY2hEZWZpbml0aW9uOiBkZWZpbml0aW9uU3RyaW5nLFxuICAgICAgICAgICAgICBzZWFyY2hPcHRpb25zOiBvcHRpb25zU3RyaW5nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnJlbW92ZWQoY29sbGVjdGlvbk5hbWUsIGNvbGxlY3Rpb25TY29wZS5nZW5lcmF0ZUlkKGRvYykpO1xuXG4gICAgICAgICAgLypcbiAgICAgICAgICAgKiBBZGp1c3Qgc29ydCBwb3NpdGlvbiBmb3IgYWxsIGRvY3MgYWZ0ZXIgdGhlIHJlbW92ZWQgZG9jIGFuZFxuICAgICAgICAgICAqIHJlbW92ZSB0aGUgZG9jIGZyb20gdGhlIG9ic2VydmVkIGRvY3MgYXJyYXlcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBvYnNlcnZlZERvY3MgPSBvYnNlcnZlZERvY3MubWFwKGRvYyA9PiB7XG4gICAgICAgICAgICBpZiAoZG9jLl9fc29ydFBvc2l0aW9uID4gYXRJbmRleCkge1xuICAgICAgICAgICAgICBkb2MuX19zb3J0UG9zaXRpb24gLT0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGRvYztcbiAgICAgICAgICB9KS5maWx0ZXIoXG4gICAgICAgICAgICBkID0+IGNvbGxlY3Rpb25TY29wZS5nZW5lcmF0ZUlkKGQpICE9PSBjb2xsZWN0aW9uU2NvcGUuZ2VuZXJhdGVJZChkb2MpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMub25TdG9wKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzdWx0c0hhbmRsZS5zdG9wKCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5yZWFkeSgpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaENvbGxlY3Rpb247XG4iLCJpbXBvcnQgQ3Vyc29yIGZyb20gJy4uL2NvcmUvY3Vyc29yJztcbmltcG9ydCBSZWFjdGl2ZUVuZ2luZSBmcm9tICcuLi9jb3JlL3JlYWN0aXZlLWVuZ2luZSc7XG5cbi8qKlxuICogVGhlIE1vbmdvREJFbmdpbmUgbGV0cyB5b3Ugc2VhcmNoIHRoZSBpbmRleCBvbiB0aGUgc2VydmVyIHNpZGUgd2l0aCBNb25nb0RCLiBTdWJzY3JpcHRpb25zIGFuZCBwdWJsaWNhdGlvbnNcbiAqIGFyZSBoYW5kbGVkIHdpdGhpbiB0aGUgRW5naW5lLlxuICpcbiAqIEB0eXBlIHtNb25nb0RCRW5naW5lfVxuICovXG5jbGFzcyBNb25nb0RCRW5naW5lIGV4dGVuZHMgUmVhY3RpdmVFbmdpbmUge1xuICAvKipcbiAgICogUmV0dXJuIGRlZmF1bHQgY29uZmlndXJhdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGRlZmF1bHRDb25maWd1cmF0aW9uKCkge1xuICAgIHJldHVybiBfLmRlZmF1bHRzKHt9LCBNb25nb0RCRW5naW5lLmRlZmF1bHRNb25nb0NvbmZpZ3VyYXRpb24odGhpcyksIHN1cGVyLmRlZmF1bHRDb25maWd1cmF0aW9uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgbW9uZ28gY29uZmlndXJhdGlvbiwgdXNlZCBpbiBjb25zdHJ1Y3RvciBhbmQgTWluaW1vbmdvRW5naW5lIHRvIGdldCB0aGUgY29uZmlndXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVuZ2luZVNjb3BlIFNjb3BlIG9mIHRoZSBlbmdpbmVcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0TW9uZ29Db25maWd1cmF0aW9uKGVuZ2luZVNjb3BlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFnZ3JlZ2F0aW9uOiAnJG9yJyxcbiAgICAgIHNlbGVjdG9yKHNlYXJjaE9iamVjdCwgb3B0aW9ucywgYWdncmVnYXRpb24pIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSB7fTtcblxuICAgICAgICBzZWxlY3RvclthZ2dyZWdhdGlvbl0gPSBbXTtcblxuICAgICAgICBfLmVhY2goc2VhcmNoT2JqZWN0LCAoc2VhcmNoU3RyaW5nLCBmaWVsZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpZWxkU2VsZWN0b3IgPSBlbmdpbmVTY29wZS5jYWxsQ29uZmlnTWV0aG9kKFxuICAgICAgICAgICAgJ3NlbGVjdG9yUGVyRmllbGQnLCBmaWVsZCwgc2VhcmNoU3RyaW5nLCBvcHRpb25zXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChmaWVsZFNlbGVjdG9yKSB7XG4gICAgICAgICAgICBzZWxlY3RvclthZ2dyZWdhdGlvbl0ucHVzaChmaWVsZFNlbGVjdG9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICAgIH0sXG4gICAgICBzZWxlY3RvclBlckZpZWxkKGZpZWxkLCBzZWFyY2hTdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSB7fTtcblxuICAgICAgICBzZWFyY2hTdHJpbmcgPSBzZWFyY2hTdHJpbmcucmVwbGFjZSgvKFxcV3sxfSkvZywgJ1xcXFwkMScpO1xuICAgICAgICBzZWxlY3RvcltmaWVsZF0gPSB7ICckcmVnZXgnIDogYC4qJHtzZWFyY2hTdHJpbmd9LipgLCAnJG9wdGlvbnMnIDogJ2knfTtcblxuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgICB9LFxuICAgICAgc29ydChzZWFyY2hPYmplY3QsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuaW5kZXguZmllbGRzO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBmaW5kIG9wdGlvbnMgZm9yIHRoZSBtb25nbyBmaW5kIHF1ZXJ5LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoRGVmaW5pdGlvbiBTZWFyY2ggZGVmaW5pdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAgICAgICAgICBTZWFyY2ggYW5kIGluZGV4IG9wdGlvbnNcbiAgICovXG4gIGdldEZpbmRPcHRpb25zKHNlYXJjaERlZmluaXRpb24sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2tpcDogb3B0aW9ucy5zZWFyY2guc2tpcCxcbiAgICAgIGxpbWl0OiBvcHRpb25zLnNlYXJjaC5saW1pdCxcbiAgICAgIGRpc2FibGVPcGxvZzogdGhpcy5jb25maWcuZGlzYWJsZU9wbG9nLFxuICAgICAgcG9sbGluZ0ludGVydmFsTXM6IHRoaXMuY29uZmlnLnBvbGxpbmdJbnRlcnZhbE1zLFxuICAgICAgcG9sbGluZ1Rocm90dGxlTXM6IHRoaXMuY29uZmlnLnBvbGxpbmdUaHJvdHRsZU1zLFxuICAgICAgc29ydDogdGhpcy5jYWxsQ29uZmlnTWV0aG9kKCdzb3J0Jywgc2VhcmNoRGVmaW5pdGlvbiwgb3B0aW9ucyksXG4gICAgICBmaWVsZHM6IHRoaXMuY2FsbENvbmZpZ01ldGhvZCgnZmllbGRzJywgc2VhcmNoRGVmaW5pdGlvbiwgb3B0aW9ucylcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcmVhY3RpdmUgc2VhcmNoIGN1cnNvci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaERlZmluaXRpb24gU2VhcmNoIGRlZmluaXRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgICAgICAgICAgU2VhcmNoIGFuZCBpbmRleCBvcHRpb25zXG4gICAqL1xuICBnZXRTZWFyY2hDdXJzb3Ioc2VhcmNoRGVmaW5pdGlvbiwgb3B0aW9ucykge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5jYWxsQ29uZmlnTWV0aG9kKFxuICAgICAgICAnc2VsZWN0b3InLFxuICAgICAgICBzZWFyY2hEZWZpbml0aW9uLFxuICAgICAgICBvcHRpb25zLFxuICAgICAgICB0aGlzLmNvbmZpZy5hZ2dyZWdhdGlvblxuICAgICAgKSxcbiAgICAgIGZpbmRPcHRpb25zID0gdGhpcy5nZXRGaW5kT3B0aW9ucyhzZWFyY2hEZWZpbml0aW9uLCBvcHRpb25zKSxcbiAgICAgIGNvbGxlY3Rpb24gPSBvcHRpb25zLmluZGV4LmNvbGxlY3Rpb247XG5cbiAgICBjaGVjayhvcHRpb25zLCBPYmplY3QpO1xuICAgIGNoZWNrKHNlbGVjdG9yLCBPYmplY3QpO1xuICAgIGNoZWNrKGZpbmRPcHRpb25zLCBPYmplY3QpO1xuXG4gICAgcmV0dXJuIG5ldyBDdXJzb3IoXG4gICAgICBjb2xsZWN0aW9uLmZpbmQoc2VsZWN0b3IsIGZpbmRPcHRpb25zKSxcbiAgICAgIGNvbGxlY3Rpb24uZmluZChzZWxlY3RvcikuY291bnQoKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9uZ29EQkVuZ2luZTtcbiIsImltcG9ydCBFbmdpbmUgZnJvbSAnLi4vY29yZS9lbmdpbmUnO1xuaW1wb3J0IFJlYWN0aXZlRW5naW5lIGZyb20gJy4uL2NvcmUvcmVhY3RpdmUtZW5naW5lJztcbmltcG9ydCBNb25nb0RCRW5naW5lIGZyb20gJy4vbW9uZ28tZGInO1xuXG4vKipcbiAqIFRoZSBNaW5pbW9uZ0VuZ2luZSBsZXRzIHlvdSBzZWFyY2ggdGhlIGluZGV4IG9uIHRoZSBjbGllbnQtc2lkZS5cbiAqXG4gKiBAdHlwZSB7TWluaW1vbmdvRW5naW5lfVxuICovXG5jbGFzcyBNaW5pbW9uZ29FbmdpbmUgZXh0ZW5kcyBFbmdpbmUge1xuICAvKipcbiAgICogUmV0dXJuIGRlZmF1bHQgY29uZmlndXJhdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGRlZmF1bHRDb25maWd1cmF0aW9uKCkge1xuICAgIHJldHVybiBfLmRlZmF1bHRzKHt9LCBNb25nb0RCRW5naW5lLmRlZmF1bHRNb25nb0NvbmZpZ3VyYXRpb24odGhpcyksIHN1cGVyLmRlZmF1bHRDb25maWd1cmF0aW9uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgaW5kZXguXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZWFyY2hEZWZpbml0aW9uIFNlYXJjaCBkZWZpbml0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zICAgICAgICAgIE9iamVjdCBvZiBvcHRpb25zXG4gICAqXG4gICAqIEByZXR1cm5zIHtjdXJzb3J9XG4gICAqL1xuICBzZWFyY2goc2VhcmNoRGVmaW5pdGlvbiwgb3B0aW9ucykge1xuICAgIGlmICghTWV0ZW9yLmlzQ2xpZW50KSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdvbmx5LWNsaWVudCcsICdNaW5pbW9uZ28gY2FuIG9ubHkgYmUgdXNlZCBvbiB0aGUgY2xpZW50Jyk7XG4gICAgfVxuXG4gICAgc2VhcmNoRGVmaW5pdGlvbiA9IHRoaXMudHJhbnNmb3JtU2VhcmNoRGVmaW5pdGlvbihzZWFyY2hEZWZpbml0aW9uLCBvcHRpb25zKTtcblxuICAgIC8vIGNoZWNrKCkgY2FsbHMgYXJlIGluIGdldFNlYXJjaEN1cnNvciBtZXRob2RcbiAgICByZXR1cm4gTW9uZ29EQkVuZ2luZS5wcm90b3R5cGUuZ2V0U2VhcmNoQ3Vyc29yLmFwcGx5KHRoaXMsIFtzZWFyY2hEZWZpbml0aW9uLCBvcHRpb25zXSk7XG4gIH1cbn1cblxuTWluaW1vbmdvRW5naW5lLnByb3RvdHlwZS5jaGVja1NlYXJjaFBhcmFtID0gUmVhY3RpdmVFbmdpbmUucHJvdG90eXBlLmNoZWNrU2VhcmNoUGFyYW07XG5NaW5pbW9uZ29FbmdpbmUucHJvdG90eXBlLnRyYW5zZm9ybVNlYXJjaERlZmluaXRpb24gPSBSZWFjdGl2ZUVuZ2luZS5wcm90b3R5cGUudHJhbnNmb3JtU2VhcmNoRGVmaW5pdGlvbjtcblxuTWluaW1vbmdvRW5naW5lLnByb3RvdHlwZS5nZXRGaW5kT3B0aW9ucyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gIGxldCBmaW5kT3B0aW9ucyA9IE1vbmdvREJFbmdpbmUucHJvdG90eXBlLmdldEZpbmRPcHRpb25zLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXG4gIGZpbmRPcHRpb25zLnRyYW5zZm9ybSA9IHRoaXMuY29uZmlnLnRyYW5zZm9ybTtcblxuICByZXR1cm4gZmluZE9wdGlvbnM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNaW5pbW9uZ29FbmdpbmU7XG4iLCJpbXBvcnQgUmVhY3RpdmVFbmdpbmUgZnJvbSAnLi4vY29yZS9yZWFjdGl2ZS1lbmdpbmUnO1xuaW1wb3J0IE1vbmdvREJFbmdpbmUgZnJvbSAnLi9tb25nby1kYic7XG5cbi8qKlxuICogVGhlIE1vbmdvVGV4dEluZGV4RW5naW5lIGxldHMgeW91IHNlYXJjaCB0aGUgaW5kZXggd2l0aCBNb25nbyB0ZXh0IGluZGV4ZXMuXG4gKlxuICogQHR5cGUge01vbmdvVGV4dEluZGV4RW5naW5lfVxuICovXG5jbGFzcyBNb25nb1RleHRJbmRleEVuZ2luZSBleHRlbmRzIFJlYWN0aXZlRW5naW5lIHtcbiAgLyoqXG4gICAqIFJldHVybiBkZWZhdWx0IGNvbmZpZ3VyYXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBkZWZhdWx0Q29uZmlndXJhdGlvbigpIHtcbiAgICBsZXQgbW9uZ29Db25maWd1cmF0aW9uID0gTW9uZ29EQkVuZ2luZS5kZWZhdWx0TW9uZ29Db25maWd1cmF0aW9uKHRoaXMpO1xuXG4gICAgbW9uZ29Db25maWd1cmF0aW9uLnNlbGVjdG9yID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZykge1xuICAgICAgaWYgKHNlYXJjaFN0cmluZy50cmltKCkpIHtcbiAgICAgICAgcmV0dXJuIHsgJHRleHQ6IHsgJHNlYXJjaDogc2VhcmNoU3RyaW5nIH0gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHt9O1xuICAgIH07XG5cbiAgICByZXR1cm4gXy5kZWZhdWx0cyh7fSwgbW9uZ29Db25maWd1cmF0aW9uLCBzdXBlci5kZWZhdWx0Q29uZmlndXJhdGlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR1cCB0aGUgaW5kZXggb24gY3JlYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpbmRleENvbmZpZyBJbmRleCBjb25maWd1cmF0aW9uXG4gICAqL1xuICBvbkluZGV4Q3JlYXRlKGluZGV4Q29uZmlnKSB7XG4gICAgc3VwZXIub25JbmRleENyZWF0ZShpbmRleENvbmZpZyk7XG5cbiAgICBpZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG4gICAgICBsZXQgdGV4dEluZGV4ZXNDb25maWcgPSB7fTtcblxuICAgICAgXy5lYWNoKGluZGV4Q29uZmlnLmZpZWxkcywgZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIHRleHRJbmRleGVzQ29uZmlnW2ZpZWxkXSA9ICd0ZXh0JztcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaW5kZXhDb25maWcud2VpZ2h0cykge1xuICAgICAgICB0ZXh0SW5kZXhlc0NvbmZpZy53ZWlnaHRzID0gb3B0aW9ucy53ZWlnaHRzKCk7XG4gICAgICB9XG5cbiAgICAgIGluZGV4Q29uZmlnLmNvbGxlY3Rpb24uX2Vuc3VyZUluZGV4KHRleHRJbmRleGVzQ29uZmlnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtIHRoZSBzZWFyY2ggZGVmaW5pdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBzZWFyY2hEZWZpbml0aW9uIFNlYXJjaCBkZWZpbml0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgb3B0aW9ucyAgICAgICAgICBTZWFyY2ggYW5kIGluZGV4IG9wdGlvbnNcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIHRyYW5zZm9ybVNlYXJjaERlZmluaXRpb24oc2VhcmNoRGVmaW5pdGlvbiwgb3B0aW9ucykge1xuICAgIHJldHVybiBzZWFyY2hEZWZpbml0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRoZSBnaXZlbiBzZWFyY2ggcGFyYW1ldGVyIGZvciB2YWxpZGl0eVxuICAgKlxuICAgKiBAcGFyYW0gc2VhcmNoXG4gICAqL1xuICBjaGVja1NlYXJjaFBhcmFtKHNlYXJjaCkge1xuICAgIGNoZWNrKHNlYXJjaCwgU3RyaW5nKTtcbiAgfVxufVxuXG4vLyBFeHBsaWNpdGVseSBpbmhlcml0IGdldFNlYXJjaEN1cnNvciBtZXRob2QgZnVuY3Rpb25hbGl0eVxuTW9uZ29UZXh0SW5kZXhFbmdpbmUucHJvdG90eXBlLmdldFNlYXJjaEN1cnNvciA9IE1vbmdvREJFbmdpbmUucHJvdG90eXBlLmdldFNlYXJjaEN1cnNvcjtcbk1vbmdvVGV4dEluZGV4RW5naW5lLnByb3RvdHlwZS5nZXRGaW5kT3B0aW9ucyA9IE1vbmdvREJFbmdpbmUucHJvdG90eXBlLmdldEZpbmRPcHRpb25zO1xuXG5leHBvcnQgZGVmYXVsdCBNb25nb1RleHRJbmRleEVuZ2luZTtcbiIsImltcG9ydCB7XG4gIEluZGV4LFxuICBFbmdpbmUsXG4gIFJlYWN0aXZlRW5naW5lLFxuICBDdXJzb3IsXG4gIE1vbmdvREJFbmdpbmUsXG4gIE1pbmltb25nb0VuZ2luZSxcbiAgTW9uZ29UZXh0SW5kZXhFbmdpbmVcbn0gZnJvbSAnLi9tYWluJztcblxuRWFzeVNlYXJjaCA9IHtcbiAgLy8gQ29yZVxuICBJbmRleCxcbiAgRW5naW5lLFxuICBSZWFjdGl2ZUVuZ2luZSxcbiAgQ3Vyc29yLFxuICAvLyBFbmdpbmVzXG4gIE1vbmdvREI6IE1vbmdvREJFbmdpbmUsXG4gIE1pbmltb25nbzogTWluaW1vbmdvRW5naW5lLFxuICBNb25nb1RleHRJbmRleDogTW9uZ29UZXh0SW5kZXhFbmdpbmVcbn07XG4iLCJpbXBvcnQgSW5kZXggZnJvbSAnLi9jb3JlL2luZGV4JztcbmltcG9ydCBFbmdpbmUgZnJvbSAnLi9jb3JlL2VuZ2luZSc7XG5pbXBvcnQgUmVhY3RpdmVFbmdpbmUgZnJvbSAnLi9jb3JlL3JlYWN0aXZlLWVuZ2luZSc7XG5pbXBvcnQgQ3Vyc29yIGZyb20gJy4vY29yZS9jdXJzb3InO1xuaW1wb3J0IE1vbmdvREJFbmdpbmUgZnJvbSAnLi9lbmdpbmVzL21vbmdvLWRiJztcbmltcG9ydCBNaW5pbW9uZ29FbmdpbmUgZnJvbSAnLi9lbmdpbmVzL21pbmltb25nbyc7XG5pbXBvcnQgTW9uZ29UZXh0SW5kZXhFbmdpbmUgZnJvbSAnLi9lbmdpbmVzL21vbmdvLXRleHQtaW5kZXgnO1xuXG5leHBvcnQge1xuICBJbmRleCxcbiAgRW5naW5lLFxuICBSZWFjdGl2ZUVuZ2luZSxcbiAgQ3Vyc29yLFxuICBNb25nb0RCRW5naW5lLFxuICBNaW5pbW9uZ29FbmdpbmUsXG4gIE1vbmdvVGV4dEluZGV4RW5naW5lXG59O1xuIl19
