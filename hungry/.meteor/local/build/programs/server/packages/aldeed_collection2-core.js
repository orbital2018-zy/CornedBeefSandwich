(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var EventEmitter = Package['raix:eventemitter'].EventEmitter;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Collection2;

var require = meteorInstall({"node_modules":{"meteor":{"aldeed:collection2-core":{"collection2.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/aldeed_collection2-core/collection2.js                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _interopRequireDefault = require("@babel/runtime/helpers/builtin/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/builtin/objectSpread"));

let EventEmitter;
module.watch(require("meteor/raix:eventemitter"), {
  EventEmitter(v) {
    EventEmitter = v;
  }

}, 0);
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let Mongo;
module.watch(require("meteor/mongo"), {
  Mongo(v) {
    Mongo = v;
  }

}, 2);
let checkNpmVersions;
module.watch(require("meteor/tmeasday:check-npm-versions"), {
  checkNpmVersions(v) {
    checkNpmVersions = v;
  }

}, 3);
let clone;
module.watch(require("clone"), {
  default(v) {
    clone = v;
  }

}, 4);
let EJSON;
module.watch(require("ejson"), {
  default(v) {
    EJSON = v;
  }

}, 5);
let isEmpty;
module.watch(require("lodash.isempty"), {
  default(v) {
    isEmpty = v;
  }

}, 6);
let isEqual;
module.watch(require("lodash.isequal"), {
  default(v) {
    isEqual = v;
  }

}, 7);
let isObject;
module.watch(require("lodash.isobject"), {
  default(v) {
    isObject = v;
  }

}, 8);
checkNpmVersions({
  'simpl-schema': '>=0.0.0'
}, 'aldeed:meteor-collection2-core');

const SimpleSchema = require('simpl-schema').default; // Exported only for listening to events


const Collection2 = new EventEmitter();
const defaultCleanOptions = {
  filter: true,
  autoConvert: true,
  removeEmptyStrings: true,
  trimStrings: true,
  removeNullsFromArrays: false
};
/**
 * Mongo.Collection.prototype.attachSchema
 * @param {SimpleSchema|Object} ss - SimpleSchema instance or a schema definition object
 *    from which to create a new SimpleSchema instance
 * @param {Object} [options]
 * @param {Boolean} [options.transform=false] Set to `true` if your document must be passed
 *    through the collection's transform to properly validate.
 * @param {Boolean} [options.replace=false] Set to `true` to replace any existing schema instead of combining
 * @return {undefined}
 *
 * Use this method to attach a schema to a collection created by another package,
 * such as Meteor.users. It is most likely unsafe to call this method more than
 * once for a single collection, or to call this for a collection that had a
 * schema object passed to its constructor.
 */

Mongo.Collection.prototype.attachSchema = function c2AttachSchema(ss, options) {
  options = options || {}; // Allow passing just the schema object

  if (!(ss instanceof SimpleSchema)) {
    ss = new SimpleSchema(ss);
  }

  this._c2 = this._c2 || {}; // If we've already attached one schema, we combine both into a new schema unless options.replace is `true`

  if (this._c2._simpleSchema && options.replace !== true) {
    if (ss.version >= 2) {
      var newSS = new SimpleSchema(this._c2._simpleSchema);
      newSS.extend(ss);
      ss = newSS;
    } else {
      ss = new SimpleSchema([this._c2._simpleSchema, ss]);
    }
  }

  var selector = options.selector;

  function attachTo(obj) {
    if (typeof selector === "object") {
      // Index of existing schema with identical selector
      var schemaIndex = -1; // we need an array to hold multiple schemas

      obj._c2._simpleSchemas = obj._c2._simpleSchemas || []; // Loop through existing schemas with selectors

      obj._c2._simpleSchemas.forEach((schema, index) => {
        // if we find a schema with an identical selector, save it's index
        if (isEqual(schema.selector, selector)) {
          schemaIndex = index;
        }
      });

      if (schemaIndex === -1) {
        // We didn't find the schema in our array - push it into the array
        obj._c2._simpleSchemas.push({
          schema: new SimpleSchema(ss),
          selector: selector
        });
      } else {
        // We found a schema with an identical selector in our array,
        if (options.replace !== true) {
          // Merge with existing schema unless options.replace is `true`
          if (obj._c2._simpleSchemas[schemaIndex].schema.version >= 2) {
            obj._c2._simpleSchemas[schemaIndex].schema.extend(ss);
          } else {
            obj._c2._simpleSchemas[schemaIndex].schema = new SimpleSchema([obj._c2._simpleSchemas[schemaIndex].schema, ss]);
          }
        } else {
          // If options.repalce is `true` replace existing schema with new schema
          obj._c2._simpleSchemas[schemaIndex].schema = ss;
        }
      } // Remove existing schemas without selector


      delete obj._c2._simpleSchema;
    } else {
      // Track the schema in the collection
      obj._c2._simpleSchema = ss; // Remove existing schemas with selector

      delete obj._c2._simpleSchemas;
    }
  }

  attachTo(this); // Attach the schema to the underlying LocalCollection, too

  if (this._collection instanceof LocalCollection) {
    this._collection._c2 = this._collection._c2 || {};
    attachTo(this._collection);
  }

  defineDeny(this, options);
  keepInsecure(this);
  Collection2.emit('schema.attached', this, ss, options);
};

[Mongo.Collection, LocalCollection].forEach(obj => {
  /**
   * simpleSchema
   * @description function detect the correct schema by given params. If it
   * detect multi-schema presence in the collection, then it made an attempt to find a
   * `selector` in args
   * @param {Object} doc - It could be <update> on update/upsert or document
   * itself on insert/remove
   * @param {Object} [options] - It could be <update> on update/upsert etc
   * @param {Object} [query] - it could be <query> on update/upsert
   * @return {Object} Schema
   */
  obj.prototype.simpleSchema = function (doc, options, query) {
    if (!this._c2) return null;
    if (this._c2._simpleSchema) return this._c2._simpleSchema;
    var schemas = this._c2._simpleSchemas;

    if (schemas && schemas.length > 0) {
      if (!doc) throw new Error('collection.simpleSchema() requires doc argument when there are multiple schemas');
      var schema, selector, target;

      for (var i = 0; i < schemas.length; i++) {
        schema = schemas[i];
        selector = Object.keys(schema.selector)[0]; // We will set this to undefined because in theory you might want to select
        // on a null value.

        target = undefined; // here we are looking for selector in different places
        // $set should have more priority here

        if (doc.$set && typeof doc.$set[selector] !== 'undefined') {
          target = doc.$set[selector];
        } else if (typeof doc[selector] !== 'undefined') {
          target = doc[selector];
        } else if (options && options.selector) {
          target = options.selector[selector];
        } else if (query && query[selector]) {
          // on upsert/update operations
          target = query[selector];
        } // we need to compare given selector with doc property or option to
        // find right schema


        if (target !== undefined && target === schema.selector[selector]) {
          return schema.schema;
        }
      }
    }

    return null;
  };
}); // Wrap DB write operation methods

['insert', 'update'].forEach(methodName => {
  const _super = Mongo.Collection.prototype[methodName];

  Mongo.Collection.prototype[methodName] = function (...args) {
    let options = methodName === "insert" ? args[1] : args[2]; // Support missing options arg

    if (!options || typeof options === "function") {
      options = {};
    }

    if (this._c2 && options.bypassCollection2 !== true) {
      var userId = null;

      try {
        // https://github.com/aldeed/meteor-collection2/issues/175
        userId = Meteor.userId();
      } catch (err) {}

      args = doValidate(this, methodName, args, Meteor.isServer || this._connection === null, // getAutoValues
      userId, Meteor.isServer // isFromTrustedCode
      );

      if (!args) {
        // doValidate already called the callback or threw the error so we're done.
        // But insert should always return an ID to match core behavior.
        return methodName === "insert" ? this._makeNewID() : undefined;
      }
    } else {
      // We still need to adjust args because insert does not take options
      if (methodName === "insert" && typeof args[1] !== 'function') args.splice(1, 1);
    }

    return _super.apply(this, args);
  };
});
/*
 * Private
 */

function doValidate(collection, type, args, getAutoValues, userId, isFromTrustedCode) {
  var doc, callback, error, options, isUpsert, selector, last, hasCallback;

  if (!args.length) {
    throw new Error(type + " requires an argument");
  } // Gather arguments and cache the selector


  if (type === "insert") {
    doc = args[0];
    options = args[1];
    callback = args[2]; // The real insert doesn't take options

    if (typeof options === "function") {
      args = [doc, options];
    } else if (typeof callback === "function") {
      args = [doc, callback];
    } else {
      args = [doc];
    }
  } else if (type === "update") {
    selector = args[0];
    doc = args[1];
    options = args[2];
    callback = args[3];
  } else {
    throw new Error("invalid type argument");
  }

  var validatedObjectWasInitiallyEmpty = isEmpty(doc); // Support missing options arg

  if (!callback && typeof options === "function") {
    callback = options;
    options = {};
  }

  options = options || {};
  last = args.length - 1;
  hasCallback = typeof args[last] === 'function'; // If update was called with upsert:true, flag as an upsert

  isUpsert = type === "update" && options.upsert === true; // we need to pass `doc` and `options` to `simpleSchema` method, that's why
  // schema declaration moved here

  var schema = collection.simpleSchema(doc, options, selector);
  var isLocalCollection = collection._connection === null; // On the server and for local collections, we allow passing `getAutoValues: false` to disable autoValue functions

  if ((Meteor.isServer || isLocalCollection) && options.getAutoValues === false) {
    getAutoValues = false;
  } // Determine validation context


  var validationContext = options.validationContext;

  if (validationContext) {
    if (typeof validationContext === 'string') {
      validationContext = schema.namedContext(validationContext);
    }
  } else {
    validationContext = schema.namedContext();
  } // Add a default callback function if we're on the client and no callback was given


  if (Meteor.isClient && !callback) {
    // Client can't block, so it can't report errors by exception,
    // only by callback. If they forget the callback, give them a
    // default one that logs the error, so they aren't totally
    // baffled if their writes don't work because their database is
    // down.
    callback = function (err) {
      if (err) {
        Meteor._debug(type + " failed: " + (err.reason || err.stack));
      }
    };
  } // If client validation is fine or is skipped but then something
  // is found to be invalid on the server, we get that error back
  // as a special Meteor.Error that we need to parse.


  if (Meteor.isClient && hasCallback) {
    callback = args[last] = wrapCallbackForParsingServerErrors(validationContext, callback);
  }

  var schemaAllowsId = schema.allowsKey("_id");

  if (type === "insert" && !doc._id && schemaAllowsId) {
    doc._id = collection._makeNewID();
  } // Get the docId for passing in the autoValue/custom context


  var docId;

  if (type === 'insert') {
    docId = doc._id; // might be undefined
  } else if (type === "update" && selector) {
    docId = typeof selector === 'string' || selector instanceof Mongo.ObjectID ? selector : selector._id;
  } // If _id has already been added, remove it temporarily if it's
  // not explicitly defined in the schema.


  var cachedId;

  if (doc._id && !schemaAllowsId) {
    cachedId = doc._id;
    delete doc._id;
  }

  const autoValueContext = {
    isInsert: type === "insert",
    isUpdate: type === "update" && options.upsert !== true,
    isUpsert,
    userId,
    isFromTrustedCode,
    docId,
    isLocalCollection
  };
  const extendAutoValueContext = (0, _objectSpread2.default)({}, (schema._cleanOptions || {}).extendAutoValueContext || {}, autoValueContext, options.extendAutoValueContext);
  const cleanOptionsForThisOperation = {};
  ["autoConvert", "filter", "removeEmptyStrings", "removeNullsFromArrays", "trimStrings"].forEach(prop => {
    if (typeof options[prop] === "boolean") {
      cleanOptionsForThisOperation[prop] = options[prop];
    }
  }); // Preliminary cleaning on both client and server. On the server and for local
  // collections, automatic values will also be set at this point.

  schema.clean(doc, (0, _objectSpread2.default)({
    mutate: true,
    // Clean the doc/modifier in place
    isModifier: type !== "insert"
  }, defaultCleanOptions, schema._cleanOptions || {}, cleanOptionsForThisOperation, {
    extendAutoValueContext,
    // This was extended separately above
    getAutoValues // Force this override

  })); // We clone before validating because in some cases we need to adjust the
  // object a bit before validating it. If we adjusted `doc` itself, our
  // changes would persist into the database.

  var docToValidate = {};

  for (var prop in doc) {
    // We omit prototype properties when cloning because they will not be valid
    // and mongo omits them when saving to the database anyway.
    if (Object.prototype.hasOwnProperty.call(doc, prop)) {
      docToValidate[prop] = doc[prop];
    }
  } // On the server, upserts are possible; SimpleSchema handles upserts pretty
  // well by default, but it will not know about the fields in the selector,
  // which are also stored in the database if an insert is performed. So we
  // will allow these fields to be considered for validation by adding them
  // to the $set in the modifier. This is no doubt prone to errors, but there
  // probably isn't any better way right now.


  if (Meteor.isServer && isUpsert && isObject(selector)) {
    var set = docToValidate.$set || {}; // If selector uses $and format, convert to plain object selector

    if (Array.isArray(selector.$and)) {
      const plainSelector = {};
      selector.$and.forEach(sel => {
        Object.assign(plainSelector, sel);
      });
      docToValidate.$set = plainSelector;
    } else {
      docToValidate.$set = clone(selector);
    }

    if (!schemaAllowsId) delete docToValidate.$set._id;
    Object.assign(docToValidate.$set, set);
  } // Set automatic values for validation on the client.
  // On the server, we already updated doc with auto values, but on the client,
  // we will add them to docToValidate for validation purposes only.
  // This is because we want all actual values generated on the server.


  if (Meteor.isClient && !isLocalCollection) {
    schema.clean(docToValidate, {
      autoConvert: false,
      extendAutoValueContext,
      filter: false,
      getAutoValues: true,
      isModifier: type !== "insert",
      mutate: true,
      // Clean the doc/modifier in place
      removeEmptyStrings: false,
      removeNullsFromArrays: false,
      trimStrings: false
    });
  } // XXX Maybe move this into SimpleSchema


  if (!validatedObjectWasInitiallyEmpty && isEmpty(docToValidate)) {
    throw new Error('After filtering out keys not in the schema, your ' + (type === 'update' ? 'modifier' : 'object') + ' is now empty');
  } // Validate doc


  var isValid;

  if (options.validate === false) {
    isValid = true;
  } else {
    isValid = validationContext.validate(docToValidate, {
      modifier: type === "update" || type === "upsert",
      upsert: isUpsert,
      extendedCustomContext: (0, _objectSpread2.default)({
        isInsert: type === "insert",
        isUpdate: type === "update" && options.upsert !== true,
        isUpsert,
        userId,
        isFromTrustedCode,
        docId,
        isLocalCollection
      }, options.extendedCustomContext || {})
    });
  }

  if (isValid) {
    // Add the ID back
    if (cachedId) {
      doc._id = cachedId;
    } // Update the args to reflect the cleaned doc
    // XXX not sure this is necessary since we mutate


    if (type === "insert") {
      args[0] = doc;
    } else {
      args[1] = doc;
    } // If callback, set invalidKey when we get a mongo unique error


    if (Meteor.isServer && hasCallback) {
      args[last] = wrapCallbackForParsingMongoValidationErrors(validationContext, args[last]);
    }

    return args;
  } else {
    error = getErrorObject(validationContext, `in ${collection._name} ${type}`);

    if (callback) {
      // insert/update/upsert pass `false` when there's an error, so we do that
      callback(error, false);
    } else {
      throw error;
    }
  }
}

function getErrorObject(context, appendToMessage = '') {
  let message;
  const invalidKeys = typeof context.validationErrors === 'function' ? context.validationErrors() : context.invalidKeys();

  if (invalidKeys.length) {
    const firstErrorKey = invalidKeys[0].name;
    const firstErrorMessage = context.keyErrorMessage(firstErrorKey); // If the error is in a nested key, add the full key to the error message
    // to be more helpful.

    if (firstErrorKey.indexOf('.') === -1) {
      message = firstErrorMessage;
    } else {
      message = `${firstErrorMessage} (${firstErrorKey})`;
    }
  } else {
    message = "Failed validation";
  }

  message = `${message} ${appendToMessage}`.trim();
  const error = new Error(message);
  error.invalidKeys = invalidKeys;
  error.validationContext = context; // If on the server, we add a sanitized error, too, in case we're
  // called from a method.

  if (Meteor.isServer) {
    error.sanitizedError = new Meteor.Error(400, message, EJSON.stringify(error.invalidKeys));
  }

  return error;
}

function addUniqueError(context, errorMessage) {
  var name = errorMessage.split('c2_')[1].split(' ')[0];
  var val = errorMessage.split('dup key:')[1].split('"')[1];
  var addValidationErrorsPropName = typeof context.addValidationErrors === 'function' ? 'addValidationErrors' : 'addInvalidKeys';
  context[addValidationErrorsPropName]([{
    name: name,
    type: 'notUnique',
    value: val
  }]);
}

function wrapCallbackForParsingMongoValidationErrors(validationContext, cb) {
  return function wrappedCallbackForParsingMongoValidationErrors(...args) {
    const error = args[0];

    if (error && (error.name === "MongoError" && error.code === 11001 || error.message.indexOf('MongoError: E11000' !== -1)) && error.message.indexOf('c2_') !== -1) {
      addUniqueError(validationContext, error.message);
      args[0] = getErrorObject(validationContext);
    }

    return cb.apply(this, args);
  };
}

function wrapCallbackForParsingServerErrors(validationContext, cb) {
  var addValidationErrorsPropName = typeof validationContext.addValidationErrors === 'function' ? 'addValidationErrors' : 'addInvalidKeys';
  return function wrappedCallbackForParsingServerErrors(...args) {
    const error = args[0]; // Handle our own validation errors

    if (error instanceof Meteor.Error && error.error === 400 && error.reason === "INVALID" && typeof error.details === "string") {
      var invalidKeysFromServer = EJSON.parse(error.details);
      validationContext[addValidationErrorsPropName](invalidKeysFromServer);
      args[0] = getErrorObject(validationContext);
    } // Handle Mongo unique index errors, which are forwarded to the client as 409 errors
    else if (error instanceof Meteor.Error && error.error === 409 && error.reason && error.reason.indexOf('E11000') !== -1 && error.reason.indexOf('c2_') !== -1) {
        addUniqueError(validationContext, error.reason);
        args[0] = getErrorObject(validationContext);
      }

    return cb.apply(this, args);
  };
}

var alreadyInsecured = {};

function keepInsecure(c) {
  // If insecure package is in use, we need to add allow rules that return
  // true. Otherwise, it would seemingly turn off insecure mode.
  if (Package && Package.insecure && !alreadyInsecured[c._name]) {
    c.allow({
      insert: function () {
        return true;
      },
      update: function () {
        return true;
      },
      remove: function () {
        return true;
      },
      fetch: [],
      transform: null
    });
    alreadyInsecured[c._name] = true;
  } // If insecure package is NOT in use, then adding the two deny functions
  // does not have any effect on the main app's security paradigm. The
  // user will still be required to add at least one allow function of her
  // own for each operation for this collection. And the user may still add
  // additional deny functions, but does not have to.

}

var alreadyDefined = {};

function defineDeny(c, options) {
  if (!alreadyDefined[c._name]) {
    var isLocalCollection = c._connection === null; // First define deny functions to extend doc with the results of clean
    // and autovalues. This must be done with "transform: null" or we would be
    // extending a clone of doc and therefore have no effect.

    c.deny({
      insert: function (userId, doc) {
        // Referenced doc is cleaned in place
        c.simpleSchema(doc).clean(doc, {
          mutate: true,
          isModifier: false,
          // We don't do these here because they are done on the client if desired
          filter: false,
          autoConvert: false,
          removeEmptyStrings: false,
          trimStrings: false,
          extendAutoValueContext: {
            isInsert: true,
            isUpdate: false,
            isUpsert: false,
            userId: userId,
            isFromTrustedCode: false,
            docId: doc._id,
            isLocalCollection: isLocalCollection
          }
        });
        return false;
      },
      update: function (userId, doc, fields, modifier) {
        // Referenced modifier is cleaned in place
        c.simpleSchema(modifier).clean(modifier, {
          mutate: true,
          isModifier: true,
          // We don't do these here because they are done on the client if desired
          filter: false,
          autoConvert: false,
          removeEmptyStrings: false,
          trimStrings: false,
          extendAutoValueContext: {
            isInsert: false,
            isUpdate: true,
            isUpsert: false,
            userId: userId,
            isFromTrustedCode: false,
            docId: doc && doc._id,
            isLocalCollection: isLocalCollection
          }
        });
        return false;
      },
      fetch: ['_id'],
      transform: null
    }); // Second define deny functions to validate again on the server
    // for client-initiated inserts and updates. These should be
    // called after the clean/autovalue functions since we're adding
    // them after. These must *not* have "transform: null" if options.transform is true because
    // we need to pass the doc through any transforms to be sure
    // that custom types are properly recognized for type validation.

    c.deny((0, _objectSpread2.default)({
      insert: function (userId, doc) {
        // We pass the false options because we will have done them on client if desired
        doValidate(c, "insert", [doc, {
          trimStrings: false,
          removeEmptyStrings: false,
          filter: false,
          autoConvert: false
        }, function (error) {
          if (error) {
            throw new Meteor.Error(400, 'INVALID', EJSON.stringify(error.invalidKeys));
          }
        }], false, // getAutoValues
        userId, false // isFromTrustedCode
        );
        return false;
      },
      update: function (userId, doc, fields, modifier) {
        // NOTE: This will never be an upsert because client-side upserts
        // are not allowed once you define allow/deny functions.
        // We pass the false options because we will have done them on client if desired
        doValidate(c, "update", [{
          _id: doc && doc._id
        }, modifier, {
          trimStrings: false,
          removeEmptyStrings: false,
          filter: false,
          autoConvert: false
        }, function (error) {
          if (error) {
            throw new Meteor.Error(400, 'INVALID', EJSON.stringify(error.invalidKeys));
          }
        }], false, // getAutoValues
        userId, false // isFromTrustedCode
        );
        return false;
      },
      fetch: ['_id']
    }, options.transform === true ? {} : {
      transform: null
    })); // note that we've already done this collection so that we don't do it again
    // if attachSchema is called again

    alreadyDefined[c._name] = true;
  }
}

module.exportDefault(Collection2);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"clone":{"package.json":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2-core/node_modules/clone/package.json                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
exports.name = "clone";
exports.version = "2.1.1";
exports.main = "clone.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"clone.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2-core/node_modules/clone/clone.js                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.useNode();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ejson":{"package.json":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2-core/node_modules/ejson/package.json                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
exports.name = "ejson";
exports.version = "2.1.2";
exports.main = "index.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2-core/node_modules/ejson/index.js                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.useNode();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lodash.isempty":{"package.json":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2-core/node_modules/lodash.isempty/package.json                             //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
exports.name = "lodash.isempty";
exports.version = "4.4.0";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2-core/node_modules/lodash.isempty/index.js                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.useNode();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lodash.isequal":{"package.json":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2-core/node_modules/lodash.isequal/package.json                             //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
exports.name = "lodash.isequal";
exports.version = "4.5.0";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2-core/node_modules/lodash.isequal/index.js                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.useNode();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lodash.isobject":{"package.json":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2-core/node_modules/lodash.isobject/package.json                            //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
exports.name = "lodash.isobject";
exports.version = "3.0.2";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2-core/node_modules/lodash.isobject/index.js                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.useNode();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("/node_modules/meteor/aldeed:collection2-core/collection2.js");

/* Exports */
Package._define("aldeed:collection2-core", exports, {
  Collection2: Collection2
});

})();

//# sourceURL=meteor://💻app/packages/aldeed_collection2-core.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYWxkZWVkOmNvbGxlY3Rpb24yLWNvcmUvY29sbGVjdGlvbjIuanMiXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwibW9kdWxlIiwid2F0Y2giLCJyZXF1aXJlIiwidiIsIk1ldGVvciIsIk1vbmdvIiwiY2hlY2tOcG1WZXJzaW9ucyIsImNsb25lIiwiZGVmYXVsdCIsIkVKU09OIiwiaXNFbXB0eSIsImlzRXF1YWwiLCJpc09iamVjdCIsIlNpbXBsZVNjaGVtYSIsIkNvbGxlY3Rpb24yIiwiZGVmYXVsdENsZWFuT3B0aW9ucyIsImZpbHRlciIsImF1dG9Db252ZXJ0IiwicmVtb3ZlRW1wdHlTdHJpbmdzIiwidHJpbVN0cmluZ3MiLCJyZW1vdmVOdWxsc0Zyb21BcnJheXMiLCJDb2xsZWN0aW9uIiwicHJvdG90eXBlIiwiYXR0YWNoU2NoZW1hIiwiYzJBdHRhY2hTY2hlbWEiLCJzcyIsIm9wdGlvbnMiLCJfYzIiLCJfc2ltcGxlU2NoZW1hIiwicmVwbGFjZSIsInZlcnNpb24iLCJuZXdTUyIsImV4dGVuZCIsInNlbGVjdG9yIiwiYXR0YWNoVG8iLCJvYmoiLCJzY2hlbWFJbmRleCIsIl9zaW1wbGVTY2hlbWFzIiwiZm9yRWFjaCIsInNjaGVtYSIsImluZGV4IiwicHVzaCIsIl9jb2xsZWN0aW9uIiwiTG9jYWxDb2xsZWN0aW9uIiwiZGVmaW5lRGVueSIsImtlZXBJbnNlY3VyZSIsImVtaXQiLCJzaW1wbGVTY2hlbWEiLCJkb2MiLCJxdWVyeSIsInNjaGVtYXMiLCJsZW5ndGgiLCJFcnJvciIsInRhcmdldCIsImkiLCJPYmplY3QiLCJrZXlzIiwidW5kZWZpbmVkIiwiJHNldCIsIm1ldGhvZE5hbWUiLCJfc3VwZXIiLCJhcmdzIiwiYnlwYXNzQ29sbGVjdGlvbjIiLCJ1c2VySWQiLCJlcnIiLCJkb1ZhbGlkYXRlIiwiaXNTZXJ2ZXIiLCJfY29ubmVjdGlvbiIsIl9tYWtlTmV3SUQiLCJzcGxpY2UiLCJhcHBseSIsImNvbGxlY3Rpb24iLCJ0eXBlIiwiZ2V0QXV0b1ZhbHVlcyIsImlzRnJvbVRydXN0ZWRDb2RlIiwiY2FsbGJhY2siLCJlcnJvciIsImlzVXBzZXJ0IiwibGFzdCIsImhhc0NhbGxiYWNrIiwidmFsaWRhdGVkT2JqZWN0V2FzSW5pdGlhbGx5RW1wdHkiLCJ1cHNlcnQiLCJpc0xvY2FsQ29sbGVjdGlvbiIsInZhbGlkYXRpb25Db250ZXh0IiwibmFtZWRDb250ZXh0IiwiaXNDbGllbnQiLCJfZGVidWciLCJyZWFzb24iLCJzdGFjayIsIndyYXBDYWxsYmFja0ZvclBhcnNpbmdTZXJ2ZXJFcnJvcnMiLCJzY2hlbWFBbGxvd3NJZCIsImFsbG93c0tleSIsIl9pZCIsImRvY0lkIiwiT2JqZWN0SUQiLCJjYWNoZWRJZCIsImF1dG9WYWx1ZUNvbnRleHQiLCJpc0luc2VydCIsImlzVXBkYXRlIiwiZXh0ZW5kQXV0b1ZhbHVlQ29udGV4dCIsIl9jbGVhbk9wdGlvbnMiLCJjbGVhbk9wdGlvbnNGb3JUaGlzT3BlcmF0aW9uIiwicHJvcCIsImNsZWFuIiwibXV0YXRlIiwiaXNNb2RpZmllciIsImRvY1RvVmFsaWRhdGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJzZXQiLCJBcnJheSIsImlzQXJyYXkiLCIkYW5kIiwicGxhaW5TZWxlY3RvciIsInNlbCIsImFzc2lnbiIsImlzVmFsaWQiLCJ2YWxpZGF0ZSIsIm1vZGlmaWVyIiwiZXh0ZW5kZWRDdXN0b21Db250ZXh0Iiwid3JhcENhbGxiYWNrRm9yUGFyc2luZ01vbmdvVmFsaWRhdGlvbkVycm9ycyIsImdldEVycm9yT2JqZWN0IiwiX25hbWUiLCJjb250ZXh0IiwiYXBwZW5kVG9NZXNzYWdlIiwibWVzc2FnZSIsImludmFsaWRLZXlzIiwidmFsaWRhdGlvbkVycm9ycyIsImZpcnN0RXJyb3JLZXkiLCJuYW1lIiwiZmlyc3RFcnJvck1lc3NhZ2UiLCJrZXlFcnJvck1lc3NhZ2UiLCJpbmRleE9mIiwidHJpbSIsInNhbml0aXplZEVycm9yIiwic3RyaW5naWZ5IiwiYWRkVW5pcXVlRXJyb3IiLCJlcnJvck1lc3NhZ2UiLCJzcGxpdCIsInZhbCIsImFkZFZhbGlkYXRpb25FcnJvcnNQcm9wTmFtZSIsImFkZFZhbGlkYXRpb25FcnJvcnMiLCJ2YWx1ZSIsImNiIiwid3JhcHBlZENhbGxiYWNrRm9yUGFyc2luZ01vbmdvVmFsaWRhdGlvbkVycm9ycyIsImNvZGUiLCJ3cmFwcGVkQ2FsbGJhY2tGb3JQYXJzaW5nU2VydmVyRXJyb3JzIiwiZGV0YWlscyIsImludmFsaWRLZXlzRnJvbVNlcnZlciIsInBhcnNlIiwiYWxyZWFkeUluc2VjdXJlZCIsImMiLCJQYWNrYWdlIiwiaW5zZWN1cmUiLCJhbGxvdyIsImluc2VydCIsInVwZGF0ZSIsInJlbW92ZSIsImZldGNoIiwidHJhbnNmb3JtIiwiYWxyZWFkeURlZmluZWQiLCJkZW55IiwiZmllbGRzIiwiZXhwb3J0RGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFlBQUo7QUFBaUJDLE9BQU9DLEtBQVAsQ0FBYUMsUUFBUSwwQkFBUixDQUFiLEVBQWlEO0FBQUNILGVBQWFJLENBQWIsRUFBZTtBQUFDSixtQkFBYUksQ0FBYjtBQUFlOztBQUFoQyxDQUFqRCxFQUFtRixDQUFuRjtBQUFzRixJQUFJQyxNQUFKO0FBQVdKLE9BQU9DLEtBQVAsQ0FBYUMsUUFBUSxlQUFSLENBQWIsRUFBc0M7QUFBQ0UsU0FBT0QsQ0FBUCxFQUFTO0FBQUNDLGFBQU9ELENBQVA7QUFBUzs7QUFBcEIsQ0FBdEMsRUFBNEQsQ0FBNUQ7QUFBK0QsSUFBSUUsS0FBSjtBQUFVTCxPQUFPQyxLQUFQLENBQWFDLFFBQVEsY0FBUixDQUFiLEVBQXFDO0FBQUNHLFFBQU1GLENBQU4sRUFBUTtBQUFDRSxZQUFNRixDQUFOO0FBQVE7O0FBQWxCLENBQXJDLEVBQXlELENBQXpEO0FBQTRELElBQUlHLGdCQUFKO0FBQXFCTixPQUFPQyxLQUFQLENBQWFDLFFBQVEsb0NBQVIsQ0FBYixFQUEyRDtB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UUFBUXFJLFNBQVIsS0FBc0IsSUFBdEIsR0FBNkIsRUFBN0IsR0FBa0M7QUFBQ0EsaUJBQVc7QUFBWixLQXpEeEMsR0FoRTRCLENBNEg1QjtBQUNBOztBQUNBQyxtQkFBZVQsRUFBRTdCLEtBQWpCLElBQTBCLElBQTFCO0FBQ0Q7QUFDRjs7QUE1c0JEMUgsT0FBT21LLGFBQVAsQ0E4c0JlckosV0E5c0JmLEUiLCJmaWxlIjoiL3BhY2thZ2VzL2FsZGVlZF9jb2xsZWN0aW9uMi1jb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnbWV0ZW9yL3JhaXg6ZXZlbnRlbWl0dGVyJztcbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgTW9uZ28gfSBmcm9tICdtZXRlb3IvbW9uZ28nO1xuaW1wb3J0IHsgY2hlY2tOcG1WZXJzaW9ucyB9IGZyb20gJ21ldGVvci90bWVhc2RheTpjaGVjay1ucG0tdmVyc2lvbnMnO1xuaW1wb3J0IGNsb25lIGZyb20gJ2Nsb25lJztcbmltcG9ydCBFSlNPTiBmcm9tICdlanNvbic7XG5pbXBvcnQgaXNFbXB0eSBmcm9tICdsb2Rhc2guaXNlbXB0eSc7XG5pbXBvcnQgaXNFcXVhbCBmcm9tICdsb2Rhc2guaXNlcXVhbCc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoLmlzb2JqZWN0JztcblxuY2hlY2tOcG1WZXJzaW9ucyh7ICdzaW1wbC1zY2hlbWEnOiAnPj0wLjAuMCcgfSwgJ2FsZGVlZDptZXRlb3ItY29sbGVjdGlvbjItY29yZScpO1xuXG5jb25zdCBTaW1wbGVTY2hlbWEgPSByZXF1aXJlKCdzaW1wbC1zY2hlbWEnKS5kZWZhdWx0O1xuXG4vLyBFeHBvcnRlZCBvbmx5IGZvciBsaXN0ZW5pbmcgdG8gZXZlbnRzXG5jb25zdCBDb2xsZWN0aW9uMiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuY29uc3QgZGVmYXVsdENsZWFuT3B0aW9ucyA9IHtcbiAgZmlsdGVyOiB0cnVlLFxuICBhdXRvQ29udmVydDogdHJ1ZSxcbiAgcmVtb3ZlRW1wdHlTdHJpbmdzOiB0cnVlLFxuICB0cmltU3RyaW5nczogdHJ1ZSxcbiAgcmVtb3ZlTnVsbHNGcm9tQXJyYXlzOiBmYWxzZSxcbn07XG5cbi8qKlxuICogTW9uZ28uQ29sbGVjdGlvbi5wcm90b3R5cGUuYXR0YWNoU2NoZW1hXG4gKiBAcGFyYW0ge1NpbXBsZVNjaGVtYXxPYmplY3R9IHNzIC0gU2ltcGxlU2NoZW1hIGluc3RhbmNlIG9yIGEgc2NoZW1hIGRlZmluaXRpb24gb2JqZWN0XG4gKiAgICBmcm9tIHdoaWNoIHRvIGNyZWF0ZSBhIG5ldyBTaW1wbGVTY2hlbWEgaW5zdGFuY2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMudHJhbnNmb3JtPWZhbHNlXSBTZXQgdG8gYHRydWVgIGlmIHlvdXIgZG9jdW1lbnQgbXVzdCBiZSBwYXNzZWRcbiAqICAgIHRocm91Z2ggdGhlIGNvbGxlY3Rpb24ncyB0cmFuc2Zvcm0gdG8gcHJvcGVybHkgdmFsaWRhdGUuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnJlcGxhY2U9ZmFsc2VdIFNldCB0byBgdHJ1ZWAgdG8gcmVwbGFjZSBhbnkgZXhpc3Rpbmcgc2NoZW1hIGluc3RlYWQgb2YgY29tYmluaW5nXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gKlxuICogVXNlIHRoaXMgbWV0aG9kIHRvIGF0dGFjaCBhIHNjaGVtYSB0byBhIGNvbGxlY3Rpb24gY3JlYXRlZCBieSBhbm90aGVyIHBhY2thZ2UsXG4gKiBzdWNoIGFzIE1ldGVvci51c2Vycy4gSXQgaXMgbW9zdCBsaWtlbHkgdW5zYWZlIHRvIGNhbGwgdGhpcyBtZXRob2QgbW9yZSB0aGFuXG4gKiBvbmNlIGZvciBhIHNpbmdsZSBjb2xsZWN0aW9uLCBvciB0byBjYWxsIHRoaXMgZm9yIGEgY29sbGVjdGlvbiB0aGF0IGhhZCBhXG4gKiBzY2hlbWEgb2JqZWN0IHBhc3NlZCB0byBpdHMgY29uc3RydWN0b3IuXG4gKi9cbk1vbmdvLkNvbGxlY3Rpb24ucHJvdG90eXBlLmF0dGFjaFNjaGVtYSA9IGZ1bmN0aW9uIGMyQXR0YWNoU2NoZW1hKHNzLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIC8vIEFsbG93IHBhc3NpbmcganVzdCB0aGUgc2NoZW1hIG9iamVjdFxuICBpZiAoIShzcyBpbnN0YW5jZW9mIFNpbXBsZVNjaGVtYSkpIHtcbiAgICBzcyA9IG5ldyBTaW1wbGVTY2hlbWEoc3MpO1xuICB9XG5cbiAgdGhpcy5fYzIgPSB0aGlzLl9jMiB8fCB7fTtcblxuICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGF0dGFjaGVkIG9uZSBzY2hlbWEsIHdlIGNvbWJpbmUgYm90aCBpbnRvIGEgbmV3IHNjaGVtYSB1bmxlc3Mgb3B0aW9ucy5yZXBsYWNlIGlzIGB0cnVlYFxuICBpZiAodGhpcy5fYzIuX3NpbXBsZVNjaGVtYSAmJiBvcHRpb25zLnJlcGxhY2UgIT09IHRydWUpIHtcbiAgICBpZiAoc3MudmVyc2lvbiA+PSAyKSB7XG4gICAgICB2YXIgbmV3U1MgPSBuZXcgU2ltcGxlU2NoZW1hKHRoaXMuX2MyLl9zaW1wbGVTY2hlbWEpO1xuICAgICAgbmV3U1MuZXh0ZW5kKHNzKTtcbiAgICAgIHNzID0gbmV3U1M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNzID0gbmV3IFNpbXBsZVNjaGVtYShbdGhpcy5fYzIuX3NpbXBsZVNjaGVtYSwgc3NdKTtcbiAgICB9XG4gIH1cblxuICB2YXIgc2VsZWN0b3IgPSBvcHRpb25zLnNlbGVjdG9yO1xuXG4gIGZ1bmN0aW9uIGF0dGFjaFRvKG9iaikge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIC8vIEluZGV4IG9mIGV4aXN0aW5nIHNjaGVtYSB3aXRoIGlkZW50aWNhbCBzZWxlY3RvclxuICAgICAgdmFyIHNjaGVtYUluZGV4ID0gLTE7XG5cbiAgICAgIC8vIHdlIG5lZWQgYW4gYXJyYXkgdG8gaG9sZCBtdWx0aXBsZSBzY2hlbWFzXG4gICAgICBvYmouX2MyLl9zaW1wbGVTY2hlbWFzID0gb2JqLl9jMi5fc2ltcGxlU2NoZW1hcyB8fCBbXTtcblxuICAgICAgLy8gTG9vcCB0aHJvdWdoIGV4aXN0aW5nIHNjaGVtYXMgd2l0aCBzZWxlY3RvcnNcbiAgICAgIG9iai5fYzIuX3NpbXBsZVNjaGVtYXMuZm9yRWFjaCgoc2NoZW1hLCBpbmRleCkgPT4ge1xuICAgICAgICAvLyBpZiB3ZSBmaW5kIGEgc2NoZW1hIHdpdGggYW4gaWRlbnRpY2FsIHNlbGVjdG9yLCBzYXZlIGl0J3MgaW5kZXhcbiAgICAgICAgaWYoaXNFcXVhbChzY2hlbWEuc2VsZWN0b3IsIHNlbGVjdG9yKSkge1xuICAgICAgICAgIHNjaGVtYUluZGV4ID0gaW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHNjaGVtYUluZGV4ID09PSAtMSkge1xuICAgICAgICAvLyBXZSBkaWRuJ3QgZmluZCB0aGUgc2NoZW1hIGluIG91ciBhcnJheSAtIHB1c2ggaXQgaW50byB0aGUgYXJyYXlcbiAgICAgICAgb2JqLl9jMi5fc2ltcGxlU2NoZW1hcy5wdXNoKHtcbiAgICAgICAgICBzY2hlbWE6IG5ldyBTaW1wbGVTY2hlbWEoc3MpLFxuICAgICAgICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBmb3VuZCBhIHNjaGVtYSB3aXRoIGFuIGlkZW50aWNhbCBzZWxlY3RvciBpbiBvdXIgYXJyYXksXG4gICAgICAgIGlmIChvcHRpb25zLnJlcGxhY2UgIT09IHRydWUpIHtcbiAgICAgICAgICAvLyBNZXJnZSB3aXRoIGV4aXN0aW5nIHNjaGVtYSB1bmxlc3Mgb3B0aW9ucy5yZXBsYWNlIGlzIGB0cnVlYFxuICAgICAgICAgIGlmIChvYmouX2MyLl9zaW1wbGVTY2hlbWFzW3NjaGVtYUluZGV4XS5zY2hlbWEudmVyc2lvbiA+PSAyKSB7XG4gICAgICAgICAgICBvYmouX2MyLl9zaW1wbGVTY2hlbWFzW3NjaGVtYUluZGV4XS5zY2hlbWEuZXh0ZW5kKHNzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqLl9jMi5fc2ltcGxlU2NoZW1hc1tzY2hlbWFJbmRleF0uc2NoZW1hID0gbmV3IFNpbXBsZVNjaGVtYShbb2JqLl9jMi5fc2ltcGxlU2NoZW1hc1tzY2hlbWFJbmRleF0uc2NoZW1hLCBzc10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiBvcHRpb25zLnJlcGFsY2UgaXMgYHRydWVgIHJlcGxhY2UgZXhpc3Rpbmcgc2NoZW1hIHdpdGggbmV3IHNjaGVtYVxuICAgICAgICAgIG9iai5fYzIuX3NpbXBsZVNjaGVtYXNbc2NoZW1hSW5kZXhdLnNjaGVtYSA9IHNzO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIGV4aXN0aW5nIHNjaGVtYXMgd2l0aG91dCBzZWxlY3RvclxuICAgICAgZGVsZXRlIG9iai5fYzIuX3NpbXBsZVNjaGVtYTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVHJhY2sgdGhlIHNjaGVtYSBpbiB0aGUgY29sbGVjdGlvblxuICAgICAgb2JqLl9jMi5fc2ltcGxlU2NoZW1hID0gc3M7XG5cbiAgICAgIC8vIFJlbW92ZSBleGlzdGluZyBzY2hlbWFzIHdpdGggc2VsZWN0b3JcbiAgICAgIGRlbGV0ZSBvYmouX2MyLl9zaW1wbGVTY2hlbWFzO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFjaFRvKHRoaXMpO1xuICAvLyBBdHRhY2ggdGhlIHNjaGVtYSB0byB0aGUgdW5kZXJseWluZyBMb2NhbENvbGxlY3Rpb24sIHRvb1xuICBpZiAodGhpcy5fY29sbGVjdGlvbiBpbnN0YW5jZW9mIExvY2FsQ29sbGVjdGlvbikge1xuICAgIHRoaXMuX2NvbGxlY3Rpb24uX2MyID0gdGhpcy5fY29sbGVjdGlvbi5fYzIgfHwge307XG4gICAgYXR0YWNoVG8odGhpcy5fY29sbGVjdGlvbik7XG4gIH1cblxuICBkZWZpbmVEZW55KHRoaXMsIG9wdGlvbnMpO1xuICBrZWVwSW5zZWN1cmUodGhpcyk7XG5cbiAgQ29sbGVjdGlvbjIuZW1pdCgnc2NoZW1hLmF0dGFjaGVkJywgdGhpcywgc3MsIG9wdGlvbnMpO1xufTtcblxuW01vbmdvLkNvbGxlY3Rpb24sIExvY2FsQ29sbGVjdGlvbl0uZm9yRWFjaCgob2JqKSA9PiB7XG4gIC8qKlxuICAgKiBzaW1wbGVTY2hlbWFcbiAgICogQGRlc2NyaXB0aW9uIGZ1bmN0aW9uIGRldGVjdCB0aGUgY29ycmVjdCBzY2hlbWEgYnkgZ2l2ZW4gcGFyYW1zLiBJZiBpdFxuICAgKiBkZXRlY3QgbXVsdGktc2NoZW1hIHByZXNlbmNlIGluIHRoZSBjb2xsZWN0aW9uLCB0aGVuIGl0IG1hZGUgYW4gYXR0ZW1wdCB0byBmaW5kIGFcbiAgICogYHNlbGVjdG9yYCBpbiBhcmdzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgLSBJdCBjb3VsZCBiZSA8dXBkYXRlPiBvbiB1cGRhdGUvdXBzZXJ0IG9yIGRvY3VtZW50XG4gICAqIGl0c2VsZiBvbiBpbnNlcnQvcmVtb3ZlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBJdCBjb3VsZCBiZSA8dXBkYXRlPiBvbiB1cGRhdGUvdXBzZXJ0IGV0Y1xuICAgKiBAcGFyYW0ge09iamVjdH0gW3F1ZXJ5XSAtIGl0IGNvdWxkIGJlIDxxdWVyeT4gb24gdXBkYXRlL3Vwc2VydFxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFNjaGVtYVxuICAgKi9cbiAgb2JqLnByb3RvdHlwZS5zaW1wbGVTY2hlbWEgPSBmdW5jdGlvbiAoZG9jLCBvcHRpb25zLCBxdWVyeSkge1xuICAgIGlmICghdGhpcy5fYzIpIHJldHVybiBudWxsO1xuICAgIGlmICh0aGlzLl9jMi5fc2ltcGxlU2NoZW1hKSByZXR1cm4gdGhpcy5fYzIuX3NpbXBsZVNjaGVtYTtcblxuICAgIHZhciBzY2hlbWFzID0gdGhpcy5fYzIuX3NpbXBsZVNjaGVtYXM7XG4gICAgaWYgKHNjaGVtYXMgJiYgc2NoZW1hcy5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAoIWRvYykgdGhyb3cgbmV3IEVycm9yKCdjb2xsZWN0aW9uLnNpbXBsZVNjaGVtYSgpIHJlcXVpcmVzIGRvYyBhcmd1bWVudCB3aGVuIHRoZXJlIGFyZSBtdWx0aXBsZSBzY2hlbWFzJyk7XG5cbiAgICAgIHZhciBzY2hlbWEsIHNlbGVjdG9yLCB0YXJnZXQ7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjaGVtYXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2NoZW1hID0gc2NoZW1hc1tpXTtcbiAgICAgICAgc2VsZWN0b3IgPSBPYmplY3Qua2V5cyhzY2hlbWEuc2VsZWN0b3IpWzBdO1xuXG4gICAgICAgIC8vIFdlIHdpbGwgc2V0IHRoaXMgdG8gdW5kZWZpbmVkIGJlY2F1c2UgaW4gdGhlb3J5IHlvdSBtaWdodCB3YW50IHRvIHNlbGVjdFxuICAgICAgICAvLyBvbiBhIG51bGwgdmFsdWUuXG4gICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBoZXJlIHdlIGFyZSBsb29raW5nIGZvciBzZWxlY3RvciBpbiBkaWZmZXJlbnQgcGxhY2VzXG4gICAgICAgIC8vICRzZXQgc2hvdWxkIGhhdmUgbW9yZSBwcmlvcml0eSBoZXJlXG4gICAgICAgIGlmIChkb2MuJHNldCAmJiB0eXBlb2YgZG9jLiRzZXRbc2VsZWN0b3JdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRhcmdldCA9IGRvYy4kc2V0W3NlbGVjdG9yXTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jW3NlbGVjdG9yXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0YXJnZXQgPSBkb2Nbc2VsZWN0b3JdO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zZWxlY3Rvcikge1xuICAgICAgICAgIHRhcmdldCA9IG9wdGlvbnMuc2VsZWN0b3Jbc2VsZWN0b3JdO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXJ5ICYmIHF1ZXJ5W3NlbGVjdG9yXSkgeyAvLyBvbiB1cHNlcnQvdXBkYXRlIG9wZXJhdGlvbnNcbiAgICAgICAgICB0YXJnZXQgPSBxdWVyeVtzZWxlY3Rvcl07XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3ZSBuZWVkIHRvIGNvbXBhcmUgZ2l2ZW4gc2VsZWN0b3Igd2l0aCBkb2MgcHJvcGVydHkgb3Igb3B0aW9uIHRvXG4gICAgICAgIC8vIGZpbmQgcmlnaHQgc2NoZW1hXG4gICAgICAgIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCAmJiB0YXJnZXQgPT09IHNjaGVtYS5zZWxlY3RvcltzZWxlY3Rvcl0pIHtcbiAgICAgICAgICByZXR1cm4gc2NoZW1hLnNjaGVtYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9O1xufSk7XG5cbi8vIFdyYXAgREIgd3JpdGUgb3BlcmF0aW9uIG1ldGhvZHNcblsnaW5zZXJ0JywgJ3VwZGF0ZSddLmZvckVhY2goKG1ldGhvZE5hbWUpID0+IHtcbiAgY29uc3QgX3N1cGVyID0gTW9uZ28uQ29sbGVjdGlvbi5wcm90b3R5cGVbbWV0aG9kTmFtZV07XG4gIE1vbmdvLkNvbGxlY3Rpb24ucHJvdG90eXBlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIGxldCBvcHRpb25zID0gKG1ldGhvZE5hbWUgPT09IFwiaW5zZXJ0XCIpID8gYXJnc1sxXSA6IGFyZ3NbMl07XG5cbiAgICAvLyBTdXBwb3J0IG1pc3Npbmcgb3B0aW9ucyBhcmdcbiAgICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jMiAmJiBvcHRpb25zLmJ5cGFzc0NvbGxlY3Rpb24yICE9PSB0cnVlKSB7XG4gICAgICB2YXIgdXNlcklkID0gbnVsbDtcbiAgICAgIHRyeSB7IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGRlZWQvbWV0ZW9yLWNvbGxlY3Rpb24yL2lzc3Vlcy8xNzVcbiAgICAgICAgdXNlcklkID0gTWV0ZW9yLnVzZXJJZCgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuXG4gICAgICBhcmdzID0gZG9WYWxpZGF0ZShcbiAgICAgICAgdGhpcyxcbiAgICAgICAgbWV0aG9kTmFtZSxcbiAgICAgICAgYXJncyxcbiAgICAgICAgTWV0ZW9yLmlzU2VydmVyIHx8IHRoaXMuX2Nvbm5lY3Rpb24gPT09IG51bGwsIC8vIGdldEF1dG9WYWx1ZXNcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBNZXRlb3IuaXNTZXJ2ZXIgLy8gaXNGcm9tVHJ1c3RlZENvZGVcbiAgICAgICk7XG4gICAgICBpZiAoIWFyZ3MpIHtcbiAgICAgICAgLy8gZG9WYWxpZGF0ZSBhbHJlYWR5IGNhbGxlZCB0aGUgY2FsbGJhY2sgb3IgdGhyZXcgdGhlIGVycm9yIHNvIHdlJ3JlIGRvbmUuXG4gICAgICAgIC8vIEJ1dCBpbnNlcnQgc2hvdWxkIGFsd2F5cyByZXR1cm4gYW4gSUQgdG8gbWF0Y2ggY29yZSBiZWhhdmlvci5cbiAgICAgICAgcmV0dXJuIG1ldGhvZE5hbWUgPT09IFwiaW5zZXJ0XCIgPyB0aGlzLl9tYWtlTmV3SUQoKSA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2Ugc3RpbGwgbmVlZCB0byBhZGp1c3QgYXJncyBiZWNhdXNlIGluc2VydCBkb2VzIG5vdCB0YWtlIG9wdGlvbnNcbiAgICAgIGlmIChtZXRob2ROYW1lID09PSBcImluc2VydFwiICYmIHR5cGVvZiBhcmdzWzFdICE9PSAnZnVuY3Rpb24nKSBhcmdzLnNwbGljZSgxLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9O1xufSk7XG5cbi8qXG4gKiBQcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZG9WYWxpZGF0ZShjb2xsZWN0aW9uLCB0eXBlLCBhcmdzLCBnZXRBdXRvVmFsdWVzLCB1c2VySWQsIGlzRnJvbVRydXN0ZWRDb2RlKSB7XG4gIHZhciBkb2MsIGNhbGxiYWNrLCBlcnJvciwgb3B0aW9ucywgaXNVcHNlcnQsIHNlbGVjdG9yLCBsYXN0LCBoYXNDYWxsYmFjaztcblxuICBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHR5cGUgKyBcIiByZXF1aXJlcyBhbiBhcmd1bWVudFwiKTtcbiAgfVxuXG4gIC8vIEdhdGhlciBhcmd1bWVudHMgYW5kIGNhY2hlIHRoZSBzZWxlY3RvclxuICBpZiAodHlwZSA9PT0gXCJpbnNlcnRcIikge1xuICAgIGRvYyA9IGFyZ3NbMF07XG4gICAgb3B0aW9ucyA9IGFyZ3NbMV07XG4gICAgY2FsbGJhY2sgPSBhcmdzWzJdO1xuXG4gICAgLy8gVGhlIHJlYWwgaW5zZXJ0IGRvZXNuJ3QgdGFrZSBvcHRpb25zXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGFyZ3MgPSBbZG9jLCBvcHRpb25zXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBhcmdzID0gW2RvYywgY2FsbGJhY2tdO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmdzID0gW2RvY107XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwidXBkYXRlXCIpIHtcbiAgICBzZWxlY3RvciA9IGFyZ3NbMF07XG4gICAgZG9jID0gYXJnc1sxXTtcbiAgICBvcHRpb25zID0gYXJnc1syXTtcbiAgICBjYWxsYmFjayA9IGFyZ3NbM107XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCB0eXBlIGFyZ3VtZW50XCIpO1xuICB9XG5cbiAgdmFyIHZhbGlkYXRlZE9iamVjdFdhc0luaXRpYWxseUVtcHR5ID0gaXNFbXB0eShkb2MpO1xuXG4gIC8vIFN1cHBvcnQgbWlzc2luZyBvcHRpb25zIGFyZ1xuICBpZiAoIWNhbGxiYWNrICYmIHR5cGVvZiBvcHRpb25zID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGxhc3QgPSBhcmdzLmxlbmd0aCAtIDE7XG5cbiAgaGFzQ2FsbGJhY2sgPSAodHlwZW9mIGFyZ3NbbGFzdF0gPT09ICdmdW5jdGlvbicpO1xuXG4gIC8vIElmIHVwZGF0ZSB3YXMgY2FsbGVkIHdpdGggdXBzZXJ0OnRydWUsIGZsYWcgYXMgYW4gdXBzZXJ0XG4gIGlzVXBzZXJ0ID0gKHR5cGUgPT09IFwidXBkYXRlXCIgJiYgb3B0aW9ucy51cHNlcnQgPT09IHRydWUpO1xuXG4gIC8vIHdlIG5lZWQgdG8gcGFzcyBgZG9jYCBhbmQgYG9wdGlvbnNgIHRvIGBzaW1wbGVTY2hlbWFgIG1ldGhvZCwgdGhhdCdzIHdoeVxuICAvLyBzY2hlbWEgZGVjbGFyYXRpb24gbW92ZWQgaGVyZVxuICB2YXIgc2NoZW1hID0gY29sbGVjdGlvbi5zaW1wbGVTY2hlbWEoZG9jLCBvcHRpb25zLCBzZWxlY3Rvcik7XG4gIHZhciBpc0xvY2FsQ29sbGVjdGlvbiA9IChjb2xsZWN0aW9uLl9jb25uZWN0aW9uID09PSBudWxsKTtcblxuICAvLyBPbiB0aGUgc2VydmVyIGFuZCBmb3IgbG9jYWwgY29sbGVjdGlvbnMsIHdlIGFsbG93IHBhc3NpbmcgYGdldEF1dG9WYWx1ZXM6IGZhbHNlYCB0byBkaXNhYmxlIGF1dG9WYWx1ZSBmdW5jdGlvbnNcbiAgaWYgKChNZXRlb3IuaXNTZXJ2ZXIgfHwgaXNMb2NhbENvbGxlY3Rpb24pICYmIG9wdGlvbnMuZ2V0QXV0b1ZhbHVlcyA9PT0gZmFsc2UpIHtcbiAgICBnZXRBdXRvVmFsdWVzID0gZmFsc2U7XG4gIH1cblxuICAvLyBEZXRlcm1pbmUgdmFsaWRhdGlvbiBjb250ZXh0XG4gIHZhciB2YWxpZGF0aW9uQ29udGV4dCA9IG9wdGlvbnMudmFsaWRhdGlvbkNvbnRleHQ7XG4gIGlmICh2YWxpZGF0aW9uQ29udGV4dCkge1xuICAgIGlmICh0eXBlb2YgdmFsaWRhdGlvbkNvbnRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWxpZGF0aW9uQ29udGV4dCA9IHNjaGVtYS5uYW1lZENvbnRleHQodmFsaWRhdGlvbkNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YWxpZGF0aW9uQ29udGV4dCA9IHNjaGVtYS5uYW1lZENvbnRleHQoKTtcbiAgfVxuXG4gIC8vIEFkZCBhIGRlZmF1bHQgY2FsbGJhY2sgZnVuY3Rpb24gaWYgd2UncmUgb24gdGhlIGNsaWVudCBhbmQgbm8gY2FsbGJhY2sgd2FzIGdpdmVuXG4gIGlmIChNZXRlb3IuaXNDbGllbnQgJiYgIWNhbGxiYWNrKSB7XG4gICAgLy8gQ2xpZW50IGNhbid0IGJsb2NrLCBzbyBpdCBjYW4ndCByZXBvcnQgZXJyb3JzIGJ5IGV4Y2VwdGlvbixcbiAgICAvLyBvbmx5IGJ5IGNhbGxiYWNrLiBJZiB0aGV5IGZvcmdldCB0aGUgY2FsbGJhY2ssIGdpdmUgdGhlbSBhXG4gICAgLy8gZGVmYXVsdCBvbmUgdGhhdCBsb2dzIHRoZSBlcnJvciwgc28gdGhleSBhcmVuJ3QgdG90YWxseVxuICAgIC8vIGJhZmZsZWQgaWYgdGhlaXIgd3JpdGVzIGRvbid0IHdvcmsgYmVjYXVzZSB0aGVpciBkYXRhYmFzZSBpc1xuICAgIC8vIGRvd24uXG4gICAgY2FsbGJhY2sgPSBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgTWV0ZW9yLl9kZWJ1Zyh0eXBlICsgXCIgZmFpbGVkOiBcIiArIChlcnIucmVhc29uIHx8IGVyci5zdGFjaykpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBJZiBjbGllbnQgdmFsaWRhdGlvbiBpcyBmaW5lIG9yIGlzIHNraXBwZWQgYnV0IHRoZW4gc29tZXRoaW5nXG4gIC8vIGlzIGZvdW5kIHRvIGJlIGludmFsaWQgb24gdGhlIHNlcnZlciwgd2UgZ2V0IHRoYXQgZXJyb3IgYmFja1xuICAvLyBhcyBhIHNwZWNpYWwgTWV0ZW9yLkVycm9yIHRoYXQgd2UgbmVlZCB0byBwYXJzZS5cbiAgaWYgKE1ldGVvci5pc0NsaWVudCAmJiBoYXNDYWxsYmFjaykge1xuICAgIGNhbGxiYWNrID0gYXJnc1tsYXN0XSA9IHdyYXBDYWxsYmFja0ZvclBhcnNpbmdTZXJ2ZXJFcnJvcnModmFsaWRhdGlvbkNvbnRleHQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHZhciBzY2hlbWFBbGxvd3NJZCA9IHNjaGVtYS5hbGxvd3NLZXkoXCJfaWRcIik7XG4gIGlmICh0eXBlID09PSBcImluc2VydFwiICYmICFkb2MuX2lkICYmIHNjaGVtYUFsbG93c0lkKSB7XG4gICAgZG9jLl9pZCA9IGNvbGxlY3Rpb24uX21ha2VOZXdJRCgpO1xuICB9XG5cbiAgLy8gR2V0IHRoZSBkb2NJZCBmb3IgcGFzc2luZyBpbiB0aGUgYXV0b1ZhbHVlL2N1c3RvbSBjb250ZXh0XG4gIHZhciBkb2NJZDtcbiAgaWYgKHR5cGUgPT09ICdpbnNlcnQnKSB7XG4gICAgZG9jSWQgPSBkb2MuX2lkOyAvLyBtaWdodCBiZSB1bmRlZmluZWRcbiAgfSBlbHNlIGlmICh0eXBlID09PSBcInVwZGF0ZVwiICYmIHNlbGVjdG9yKSB7XG4gICAgZG9jSWQgPSB0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnIHx8IHNlbGVjdG9yIGluc3RhbmNlb2YgTW9uZ28uT2JqZWN0SUQgPyBzZWxlY3RvciA6IHNlbGVjdG9yLl9pZDtcbiAgfVxuXG4gIC8vIElmIF9pZCBoYXMgYWxyZWFkeSBiZWVuIGFkZGVkLCByZW1vdmUgaXQgdGVtcG9yYXJpbHkgaWYgaXQnc1xuICAvLyBub3QgZXhwbGljaXRseSBkZWZpbmVkIGluIHRoZSBzY2hlbWEuXG4gIHZhciBjYWNoZWRJZDtcbiAgaWYgKGRvYy5faWQgJiYgIXNjaGVtYUFsbG93c0lkKSB7XG4gICAgY2FjaGVkSWQgPSBkb2MuX2lkO1xuICAgIGRlbGV0ZSBkb2MuX2lkO1xuICB9XG5cbiAgY29uc3QgYXV0b1ZhbHVlQ29udGV4dCA9IHtcbiAgICBpc0luc2VydDogKHR5cGUgPT09IFwiaW5zZXJ0XCIpLFxuICAgIGlzVXBkYXRlOiAodHlwZSA9PT0gXCJ1cGRhdGVcIiAmJiBvcHRpb25zLnVwc2VydCAhPT0gdHJ1ZSksXG4gICAgaXNVcHNlcnQsXG4gICAgdXNlcklkLFxuICAgIGlzRnJvbVRydXN0ZWRDb2RlLFxuICAgIGRvY0lkLFxuICAgIGlzTG9jYWxDb2xsZWN0aW9uXG4gIH07XG5cbiAgY29uc3QgZXh0ZW5kQXV0b1ZhbHVlQ29udGV4dCA9IHtcbiAgICAuLi4oKHNjaGVtYS5fY2xlYW5PcHRpb25zIHx8IHt9KS5leHRlbmRBdXRvVmFsdWVDb250ZXh0IHx8IHt9KSxcbiAgICAuLi5hdXRvVmFsdWVDb250ZXh0LFxuICAgIC4uLm9wdGlvbnMuZXh0ZW5kQXV0b1ZhbHVlQ29udGV4dCxcbiAgfTtcblxuICBjb25zdCBjbGVhbk9wdGlvbnNGb3JUaGlzT3BlcmF0aW9uID0ge307XG4gIFtcImF1dG9Db252ZXJ0XCIsIFwiZmlsdGVyXCIsIFwicmVtb3ZlRW1wdHlTdHJpbmdzXCIsIFwicmVtb3ZlTnVsbHNGcm9tQXJyYXlzXCIsIFwidHJpbVN0cmluZ3NcIl0uZm9yRWFjaChwcm9wID0+IHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnNbcHJvcF0gPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICBjbGVhbk9wdGlvbnNGb3JUaGlzT3BlcmF0aW9uW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFByZWxpbWluYXJ5IGNsZWFuaW5nIG9uIGJvdGggY2xpZW50IGFuZCBzZXJ2ZXIuIE9uIHRoZSBzZXJ2ZXIgYW5kIGZvciBsb2NhbFxuICAvLyBjb2xsZWN0aW9ucywgYXV0b21hdGljIHZhbHVlcyB3aWxsIGFsc28gYmUgc2V0IGF0IHRoaXMgcG9pbnQuXG4gIHNjaGVtYS5jbGVhbihkb2MsIHtcbiAgICBtdXRhdGU6IHRydWUsIC8vIENsZWFuIHRoZSBkb2MvbW9kaWZpZXIgaW4gcGxhY2VcbiAgICBpc01vZGlmaWVyOiAodHlwZSAhPT0gXCJpbnNlcnRcIiksXG4gICAgLy8gU3RhcnQgd2l0aCBzb21lIENvbGxlY3Rpb24yIGRlZmF1bHRzLCB3aGljaCB3aWxsIHVzdWFsbHkgYmUgb3ZlcndyaXR0ZW5cbiAgICAuLi5kZWZhdWx0Q2xlYW5PcHRpb25zLFxuICAgIC8vIFRoZSBleHRlbmQgd2l0aCB0aGUgc2NoZW1hLWxldmVsIGRlZmF1bHRzIChmcm9tIFNpbXBsZVNjaGVtYSBjb25zdHJ1Y3RvciBvcHRpb25zKVxuICAgIC4uLihzY2hlbWEuX2NsZWFuT3B0aW9ucyB8fCB7fSksXG4gICAgLy8gRmluYWxseSwgb3B0aW9ucyBmb3IgdGhpcyBzcGVjaWZpYyBvcGVyYXRpb24gc2hvdWxkIHRha2UgcHJlY2VkYW5jZVxuICAgIC4uLmNsZWFuT3B0aW9uc0ZvclRoaXNPcGVyYXRpb24sXG4gICAgZXh0ZW5kQXV0b1ZhbHVlQ29udGV4dCwgLy8gVGhpcyB3YXMgZXh0ZW5kZWQgc2VwYXJhdGVseSBhYm92ZVxuICAgIGdldEF1dG9WYWx1ZXMsIC8vIEZvcmNlIHRoaXMgb3ZlcnJpZGVcbiAgfSk7XG5cbiAgLy8gV2UgY2xvbmUgYmVmb3JlIHZhbGlkYXRpbmcgYmVjYXVzZSBpbiBzb21lIGNhc2VzIHdlIG5lZWQgdG8gYWRqdXN0IHRoZVxuICAvLyBvYmplY3QgYSBiaXQgYmVmb3JlIHZhbGlkYXRpbmcgaXQuIElmIHdlIGFkanVzdGVkIGBkb2NgIGl0c2VsZiwgb3VyXG4gIC8vIGNoYW5nZXMgd291bGQgcGVyc2lzdCBpbnRvIHRoZSBkYXRhYmFzZS5cbiAgdmFyIGRvY1RvVmFsaWRhdGUgPSB7fTtcbiAgZm9yICh2YXIgcHJvcCBpbiBkb2MpIHtcbiAgICAvLyBXZSBvbWl0IHByb3RvdHlwZSBwcm9wZXJ0aWVzIHdoZW4gY2xvbmluZyBiZWNhdXNlIHRoZXkgd2lsbCBub3QgYmUgdmFsaWRcbiAgICAvLyBhbmQgbW9uZ28gb21pdHMgdGhlbSB3aGVuIHNhdmluZyB0byB0aGUgZGF0YWJhc2UgYW55d2F5LlxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZG9jLCBwcm9wKSkge1xuICAgICAgZG9jVG9WYWxpZGF0ZVtwcm9wXSA9IGRvY1twcm9wXTtcbiAgICB9XG4gIH1cblxuICAvLyBPbiB0aGUgc2VydmVyLCB1cHNlcnRzIGFyZSBwb3NzaWJsZTsgU2ltcGxlU2NoZW1hIGhhbmRsZXMgdXBzZXJ0cyBwcmV0dHlcbiAgLy8gd2VsbCBieSBkZWZhdWx0LCBidXQgaXQgd2lsbCBub3Qga25vdyBhYm91dCB0aGUgZmllbGRzIGluIHRoZSBzZWxlY3RvcixcbiAgLy8gd2hpY2ggYXJlIGFsc28gc3RvcmVkIGluIHRoZSBkYXRhYmFzZSBpZiBhbiBpbnNlcnQgaXMgcGVyZm9ybWVkLiBTbyB3ZVxuICAvLyB3aWxsIGFsbG93IHRoZXNlIGZpZWxkcyB0byBiZSBjb25zaWRlcmVkIGZvciB2YWxpZGF0aW9uIGJ5IGFkZGluZyB0aGVtXG4gIC8vIHRvIHRoZSAkc2V0IGluIHRoZSBtb2RpZmllci4gVGhpcyBpcyBubyBkb3VidCBwcm9uZSB0byBlcnJvcnMsIGJ1dCB0aGVyZVxuICAvLyBwcm9iYWJseSBpc24ndCBhbnkgYmV0dGVyIHdheSByaWdodCBub3cuXG4gIGlmIChNZXRlb3IuaXNTZXJ2ZXIgJiYgaXNVcHNlcnQgJiYgaXNPYmplY3Qoc2VsZWN0b3IpKSB7XG4gICAgdmFyIHNldCA9IGRvY1RvVmFsaWRhdGUuJHNldCB8fCB7fTtcblxuICAgIC8vIElmIHNlbGVjdG9yIHVzZXMgJGFuZCBmb3JtYXQsIGNvbnZlcnQgdG8gcGxhaW4gb2JqZWN0IHNlbGVjdG9yXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc2VsZWN0b3IuJGFuZCkpIHtcbiAgICAgIGNvbnN0IHBsYWluU2VsZWN0b3IgPSB7fTtcbiAgICAgIHNlbGVjdG9yLiRhbmQuZm9yRWFjaChzZWwgPT4ge1xuICAgICAgICBPYmplY3QuYXNzaWduKHBsYWluU2VsZWN0b3IsIHNlbCk7XG4gICAgICB9KTtcbiAgICAgIGRvY1RvVmFsaWRhdGUuJHNldCA9IHBsYWluU2VsZWN0b3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY1RvVmFsaWRhdGUuJHNldCA9IGNsb25lKHNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICBpZiAoIXNjaGVtYUFsbG93c0lkKSBkZWxldGUgZG9jVG9WYWxpZGF0ZS4kc2V0Ll9pZDtcbiAgICBPYmplY3QuYXNzaWduKGRvY1RvVmFsaWRhdGUuJHNldCwgc2V0KTtcbiAgfVxuXG4gIC8vIFNldCBhdXRvbWF0aWMgdmFsdWVzIGZvciB2YWxpZGF0aW9uIG9uIHRoZSBjbGllbnQuXG4gIC8vIE9uIHRoZSBzZXJ2ZXIsIHdlIGFscmVhZHkgdXBkYXRlZCBkb2Mgd2l0aCBhdXRvIHZhbHVlcywgYnV0IG9uIHRoZSBjbGllbnQsXG4gIC8vIHdlIHdpbGwgYWRkIHRoZW0gdG8gZG9jVG9WYWxpZGF0ZSBmb3IgdmFsaWRhdGlvbiBwdXJwb3NlcyBvbmx5LlxuICAvLyBUaGlzIGlzIGJlY2F1c2Ugd2Ugd2FudCBhbGwgYWN0dWFsIHZhbHVlcyBnZW5lcmF0ZWQgb24gdGhlIHNlcnZlci5cbiAgaWYgKE1ldGVvci5pc0NsaWVudCAmJiAhaXNMb2NhbENvbGxlY3Rpb24pIHtcbiAgICBzY2hlbWEuY2xlYW4oZG9jVG9WYWxpZGF0ZSwge1xuICAgICAgYXV0b0NvbnZlcnQ6IGZhbHNlLFxuICAgICAgZXh0ZW5kQXV0b1ZhbHVlQ29udGV4dCxcbiAgICAgIGZpbHRlcjogZmFsc2UsXG4gICAgICBnZXRBdXRvVmFsdWVzOiB0cnVlLFxuICAgICAgaXNNb2RpZmllcjogKHR5cGUgIT09IFwiaW5zZXJ0XCIpLFxuICAgICAgbXV0YXRlOiB0cnVlLCAvLyBDbGVhbiB0aGUgZG9jL21vZGlmaWVyIGluIHBsYWNlXG4gICAgICByZW1vdmVFbXB0eVN0cmluZ3M6IGZhbHNlLFxuICAgICAgcmVtb3ZlTnVsbHNGcm9tQXJyYXlzOiBmYWxzZSxcbiAgICAgIHRyaW1TdHJpbmdzOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFhYWCBNYXliZSBtb3ZlIHRoaXMgaW50byBTaW1wbGVTY2hlbWFcbiAgaWYgKCF2YWxpZGF0ZWRPYmplY3RXYXNJbml0aWFsbHlFbXB0eSAmJiBpc0VtcHR5KGRvY1RvVmFsaWRhdGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBZnRlciBmaWx0ZXJpbmcgb3V0IGtleXMgbm90IGluIHRoZSBzY2hlbWEsIHlvdXIgJyArXG4gICAgICAodHlwZSA9PT0gJ3VwZGF0ZScgPyAnbW9kaWZpZXInIDogJ29iamVjdCcpICtcbiAgICAgICcgaXMgbm93IGVtcHR5Jyk7XG4gIH1cblxuICAvLyBWYWxpZGF0ZSBkb2NcbiAgdmFyIGlzVmFsaWQ7XG4gIGlmIChvcHRpb25zLnZhbGlkYXRlID09PSBmYWxzZSkge1xuICAgIGlzVmFsaWQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGlzVmFsaWQgPSB2YWxpZGF0aW9uQ29udGV4dC52YWxpZGF0ZShkb2NUb1ZhbGlkYXRlLCB7XG4gICAgICBtb2RpZmllcjogKHR5cGUgPT09IFwidXBkYXRlXCIgfHwgdHlwZSA9PT0gXCJ1cHNlcnRcIiksXG4gICAgICB1cHNlcnQ6IGlzVXBzZXJ0LFxuICAgICAgZXh0ZW5kZWRDdXN0b21Db250ZXh0OiB7XG4gICAgICAgIGlzSW5zZXJ0OiAodHlwZSA9PT0gXCJpbnNlcnRcIiksXG4gICAgICAgIGlzVXBkYXRlOiAodHlwZSA9PT0gXCJ1cGRhdGVcIiAmJiBvcHRpb25zLnVwc2VydCAhPT0gdHJ1ZSksXG4gICAgICAgIGlzVXBzZXJ0LFxuICAgICAgICB1c2VySWQsXG4gICAgICAgIGlzRnJvbVRydXN0ZWRDb2RlLFxuICAgICAgICBkb2NJZCxcbiAgICAgICAgaXNMb2NhbENvbGxlY3Rpb24sXG4gICAgICAgIC4uLihvcHRpb25zLmV4dGVuZGVkQ3VzdG9tQ29udGV4dCB8fCB7fSksXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgaWYgKGlzVmFsaWQpIHtcbiAgICAvLyBBZGQgdGhlIElEIGJhY2tcbiAgICBpZiAoY2FjaGVkSWQpIHtcbiAgICAgIGRvYy5faWQgPSBjYWNoZWRJZDtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdGhlIGFyZ3MgdG8gcmVmbGVjdCB0aGUgY2xlYW5lZCBkb2NcbiAgICAvLyBYWFggbm90IHN1cmUgdGhpcyBpcyBuZWNlc3Nhcnkgc2luY2Ugd2UgbXV0YXRlXG4gICAgaWYgKHR5cGUgPT09IFwiaW5zZXJ0XCIpIHtcbiAgICAgIGFyZ3NbMF0gPSBkb2M7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyZ3NbMV0gPSBkb2M7XG4gICAgfVxuXG4gICAgLy8gSWYgY2FsbGJhY2ssIHNldCBpbnZhbGlkS2V5IHdoZW4gd2UgZ2V0IGEgbW9uZ28gdW5pcXVlIGVycm9yXG4gICAgaWYgKE1ldGVvci5pc1NlcnZlciAmJiBoYXNDYWxsYmFjaykge1xuICAgICAgYXJnc1tsYXN0XSA9IHdyYXBDYWxsYmFja0ZvclBhcnNpbmdNb25nb1ZhbGlkYXRpb25FcnJvcnModmFsaWRhdGlvbkNvbnRleHQsIGFyZ3NbbGFzdF0pO1xuICAgIH1cblxuICAgIHJldHVybiBhcmdzO1xuICB9IGVsc2Uge1xuICAgIGVycm9yID0gZ2V0RXJyb3JPYmplY3QodmFsaWRhdGlvbkNvbnRleHQsIGBpbiAke2NvbGxlY3Rpb24uX25hbWV9ICR7dHlwZX1gKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIC8vIGluc2VydC91cGRhdGUvdXBzZXJ0IHBhc3MgYGZhbHNlYCB3aGVuIHRoZXJlJ3MgYW4gZXJyb3IsIHNvIHdlIGRvIHRoYXRcbiAgICAgIGNhbGxiYWNrKGVycm9yLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFcnJvck9iamVjdChjb250ZXh0LCBhcHBlbmRUb01lc3NhZ2UgPSAnJykge1xuICBsZXQgbWVzc2FnZTtcbiAgY29uc3QgaW52YWxpZEtleXMgPSAodHlwZW9mIGNvbnRleHQudmFsaWRhdGlvbkVycm9ycyA9PT0gJ2Z1bmN0aW9uJykgPyBjb250ZXh0LnZhbGlkYXRpb25FcnJvcnMoKSA6IGNvbnRleHQuaW52YWxpZEtleXMoKTtcbiAgaWYgKGludmFsaWRLZXlzLmxlbmd0aCkge1xuICAgIGNvbnN0IGZpcnN0RXJyb3JLZXkgPSBpbnZhbGlkS2V5c1swXS5uYW1lO1xuICAgIGNvbnN0IGZpcnN0RXJyb3JNZXNzYWdlID0gY29udGV4dC5rZXlFcnJvck1lc3NhZ2UoZmlyc3RFcnJvcktleSk7XG5cbiAgICAvLyBJZiB0aGUgZXJyb3IgaXMgaW4gYSBuZXN0ZWQga2V5LCBhZGQgdGhlIGZ1bGwga2V5IHRvIHRoZSBlcnJvciBtZXNzYWdlXG4gICAgLy8gdG8gYmUgbW9yZSBoZWxwZnVsLlxuICAgIGlmIChmaXJzdEVycm9yS2V5LmluZGV4T2YoJy4nKSA9PT0gLTEpIHtcbiAgICAgIG1lc3NhZ2UgPSBmaXJzdEVycm9yTWVzc2FnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZSA9IGAke2ZpcnN0RXJyb3JNZXNzYWdlfSAoJHtmaXJzdEVycm9yS2V5fSlgO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlID0gXCJGYWlsZWQgdmFsaWRhdGlvblwiO1xuICB9XG4gIG1lc3NhZ2UgPSBgJHttZXNzYWdlfSAke2FwcGVuZFRvTWVzc2FnZX1gLnRyaW0oKTtcbiAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIGVycm9yLmludmFsaWRLZXlzID0gaW52YWxpZEtleXM7XG4gIGVycm9yLnZhbGlkYXRpb25Db250ZXh0ID0gY29udGV4dDtcbiAgLy8gSWYgb24gdGhlIHNlcnZlciwgd2UgYWRkIGEgc2FuaXRpemVkIGVycm9yLCB0b28sIGluIGNhc2Ugd2UncmVcbiAgLy8gY2FsbGVkIGZyb20gYSBtZXRob2QuXG4gIGlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcbiAgICBlcnJvci5zYW5pdGl6ZWRFcnJvciA9IG5ldyBNZXRlb3IuRXJyb3IoNDAwLCBtZXNzYWdlLCBFSlNPTi5zdHJpbmdpZnkoZXJyb3IuaW52YWxpZEtleXMpKTtcbiAgfVxuICByZXR1cm4gZXJyb3I7XG59XG5cbmZ1bmN0aW9uIGFkZFVuaXF1ZUVycm9yKGNvbnRleHQsIGVycm9yTWVzc2FnZSkge1xuICB2YXIgbmFtZSA9IGVycm9yTWVzc2FnZS5zcGxpdCgnYzJfJylbMV0uc3BsaXQoJyAnKVswXTtcbiAgdmFyIHZhbCA9IGVycm9yTWVzc2FnZS5zcGxpdCgnZHVwIGtleTonKVsxXS5zcGxpdCgnXCInKVsxXTtcblxuICB2YXIgYWRkVmFsaWRhdGlvbkVycm9yc1Byb3BOYW1lID0gKHR5cGVvZiBjb250ZXh0LmFkZFZhbGlkYXRpb25FcnJvcnMgPT09ICdmdW5jdGlvbicpID8gJ2FkZFZhbGlkYXRpb25FcnJvcnMnIDogJ2FkZEludmFsaWRLZXlzJztcbiAgY29udGV4dFthZGRWYWxpZGF0aW9uRXJyb3JzUHJvcE5hbWVdKFt7XG4gICAgbmFtZTogbmFtZSxcbiAgICB0eXBlOiAnbm90VW5pcXVlJyxcbiAgICB2YWx1ZTogdmFsXG4gIH1dKTtcbn1cblxuZnVuY3Rpb24gd3JhcENhbGxiYWNrRm9yUGFyc2luZ01vbmdvVmFsaWRhdGlvbkVycm9ycyh2YWxpZGF0aW9uQ29udGV4dCwgY2IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZWRDYWxsYmFja0ZvclBhcnNpbmdNb25nb1ZhbGlkYXRpb25FcnJvcnMoLi4uYXJncykge1xuICAgIGNvbnN0IGVycm9yID0gYXJnc1swXTtcbiAgICBpZiAoZXJyb3IgJiZcbiAgICAgICAgKChlcnJvci5uYW1lID09PSBcIk1vbmdvRXJyb3JcIiAmJiBlcnJvci5jb2RlID09PSAxMTAwMSkgfHwgZXJyb3IubWVzc2FnZS5pbmRleE9mKCdNb25nb0Vycm9yOiBFMTEwMDAnICE9PSAtMSkpICYmXG4gICAgICAgIGVycm9yLm1lc3NhZ2UuaW5kZXhPZignYzJfJykgIT09IC0xKSB7XG4gICAgICBhZGRVbmlxdWVFcnJvcih2YWxpZGF0aW9uQ29udGV4dCwgZXJyb3IubWVzc2FnZSk7XG4gICAgICBhcmdzWzBdID0gZ2V0RXJyb3JPYmplY3QodmFsaWRhdGlvbkNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gY2IuYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdyYXBDYWxsYmFja0ZvclBhcnNpbmdTZXJ2ZXJFcnJvcnModmFsaWRhdGlvbkNvbnRleHQsIGNiKSB7XG4gIHZhciBhZGRWYWxpZGF0aW9uRXJyb3JzUHJvcE5hbWUgPSAodHlwZW9mIHZhbGlkYXRpb25Db250ZXh0LmFkZFZhbGlkYXRpb25FcnJvcnMgPT09ICdmdW5jdGlvbicpID8gJ2FkZFZhbGlkYXRpb25FcnJvcnMnIDogJ2FkZEludmFsaWRLZXlzJztcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZWRDYWxsYmFja0ZvclBhcnNpbmdTZXJ2ZXJFcnJvcnMoLi4uYXJncykge1xuICAgIGNvbnN0IGVycm9yID0gYXJnc1swXTtcbiAgICAvLyBIYW5kbGUgb3VyIG93biB2YWxpZGF0aW9uIGVycm9yc1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIE1ldGVvci5FcnJvciAmJlxuICAgICAgICBlcnJvci5lcnJvciA9PT0gNDAwICYmXG4gICAgICAgIGVycm9yLnJlYXNvbiA9PT0gXCJJTlZBTElEXCIgJiZcbiAgICAgICAgdHlwZW9mIGVycm9yLmRldGFpbHMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHZhciBpbnZhbGlkS2V5c0Zyb21TZXJ2ZXIgPSBFSlNPTi5wYXJzZShlcnJvci5kZXRhaWxzKTtcbiAgICAgIHZhbGlkYXRpb25Db250ZXh0W2FkZFZhbGlkYXRpb25FcnJvcnNQcm9wTmFtZV0oaW52YWxpZEtleXNGcm9tU2VydmVyKTtcbiAgICAgIGFyZ3NbMF0gPSBnZXRFcnJvck9iamVjdCh2YWxpZGF0aW9uQ29udGV4dCk7XG4gICAgfVxuICAgIC8vIEhhbmRsZSBNb25nbyB1bmlxdWUgaW5kZXggZXJyb3JzLCB3aGljaCBhcmUgZm9yd2FyZGVkIHRvIHRoZSBjbGllbnQgYXMgNDA5IGVycm9yc1xuICAgIGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgTWV0ZW9yLkVycm9yICYmXG4gICAgICAgICAgICAgZXJyb3IuZXJyb3IgPT09IDQwOSAmJlxuICAgICAgICAgICAgIGVycm9yLnJlYXNvbiAmJlxuICAgICAgICAgICAgIGVycm9yLnJlYXNvbi5pbmRleE9mKCdFMTEwMDAnKSAhPT0gLTEgJiZcbiAgICAgICAgICAgICBlcnJvci5yZWFzb24uaW5kZXhPZignYzJfJykgIT09IC0xKSB7XG4gICAgICBhZGRVbmlxdWVFcnJvcih2YWxpZGF0aW9uQ29udGV4dCwgZXJyb3IucmVhc29uKTtcbiAgICAgIGFyZ3NbMF0gPSBnZXRFcnJvck9iamVjdCh2YWxpZGF0aW9uQ29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBjYi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfTtcbn1cblxudmFyIGFscmVhZHlJbnNlY3VyZWQgPSB7fTtcbmZ1bmN0aW9uIGtlZXBJbnNlY3VyZShjKSB7XG4gIC8vIElmIGluc2VjdXJlIHBhY2thZ2UgaXMgaW4gdXNlLCB3ZSBuZWVkIHRvIGFkZCBhbGxvdyBydWxlcyB0aGF0IHJldHVyblxuICAvLyB0cnVlLiBPdGhlcndpc2UsIGl0IHdvdWxkIHNlZW1pbmdseSB0dXJuIG9mZiBpbnNlY3VyZSBtb2RlLlxuICBpZiAoUGFja2FnZSAmJiBQYWNrYWdlLmluc2VjdXJlICYmICFhbHJlYWR5SW5zZWN1cmVkW2MuX25hbWVdKSB7XG4gICAgYy5hbGxvdyh7XG4gICAgICBpbnNlcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgICAgZmV0Y2g6IFtdLFxuICAgICAgdHJhbnNmb3JtOiBudWxsXG4gICAgfSk7XG4gICAgYWxyZWFkeUluc2VjdXJlZFtjLl9uYW1lXSA9IHRydWU7XG4gIH1cbiAgLy8gSWYgaW5zZWN1cmUgcGFja2FnZSBpcyBOT1QgaW4gdXNlLCB0aGVuIGFkZGluZyB0aGUgdHdvIGRlbnkgZnVuY3Rpb25zXG4gIC8vIGRvZXMgbm90IGhhdmUgYW55IGVmZmVjdCBvbiB0aGUgbWFpbiBhcHAncyBzZWN1cml0eSBwYXJhZGlnbS4gVGhlXG4gIC8vIHVzZXIgd2lsbCBzdGlsbCBiZSByZXF1aXJlZCB0byBhZGQgYXQgbGVhc3Qgb25lIGFsbG93IGZ1bmN0aW9uIG9mIGhlclxuICAvLyBvd24gZm9yIGVhY2ggb3BlcmF0aW9uIGZvciB0aGlzIGNvbGxlY3Rpb24uIEFuZCB0aGUgdXNlciBtYXkgc3RpbGwgYWRkXG4gIC8vIGFkZGl0aW9uYWwgZGVueSBmdW5jdGlvbnMsIGJ1dCBkb2VzIG5vdCBoYXZlIHRvLlxufVxuXG52YXIgYWxyZWFkeURlZmluZWQgPSB7fTtcbmZ1bmN0aW9uIGRlZmluZURlbnkoYywgb3B0aW9ucykge1xuICBpZiAoIWFscmVhZHlEZWZpbmVkW2MuX25hbWVdKSB7XG5cbiAgICB2YXIgaXNMb2NhbENvbGxlY3Rpb24gPSAoYy5fY29ubmVjdGlvbiA9PT0gbnVsbCk7XG5cbiAgICAvLyBGaXJzdCBkZWZpbmUgZGVueSBmdW5jdGlvbnMgdG8gZXh0ZW5kIGRvYyB3aXRoIHRoZSByZXN1bHRzIG9mIGNsZWFuXG4gICAgLy8gYW5kIGF1dG92YWx1ZXMuIFRoaXMgbXVzdCBiZSBkb25lIHdpdGggXCJ0cmFuc2Zvcm06IG51bGxcIiBvciB3ZSB3b3VsZCBiZVxuICAgIC8vIGV4dGVuZGluZyBhIGNsb25lIG9mIGRvYyBhbmQgdGhlcmVmb3JlIGhhdmUgbm8gZWZmZWN0LlxuICAgIGMuZGVueSh7XG4gICAgICBpbnNlcnQ6IGZ1bmN0aW9uKHVzZXJJZCwgZG9jKSB7XG4gICAgICAgIC8vIFJlZmVyZW5jZWQgZG9jIGlzIGNsZWFuZWQgaW4gcGxhY2VcbiAgICAgICAgYy5zaW1wbGVTY2hlbWEoZG9jKS5jbGVhbihkb2MsIHtcbiAgICAgICAgICBtdXRhdGU6IHRydWUsXG4gICAgICAgICAgaXNNb2RpZmllcjogZmFsc2UsXG4gICAgICAgICAgLy8gV2UgZG9uJ3QgZG8gdGhlc2UgaGVyZSBiZWNhdXNlIHRoZXkgYXJlIGRvbmUgb24gdGhlIGNsaWVudCBpZiBkZXNpcmVkXG4gICAgICAgICAgZmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICBhdXRvQ29udmVydDogZmFsc2UsXG4gICAgICAgICAgcmVtb3ZlRW1wdHlTdHJpbmdzOiBmYWxzZSxcbiAgICAgICAgICB0cmltU3RyaW5nczogZmFsc2UsXG4gICAgICAgICAgZXh0ZW5kQXV0b1ZhbHVlQ29udGV4dDoge1xuICAgICAgICAgICAgaXNJbnNlcnQ6IHRydWUsXG4gICAgICAgICAgICBpc1VwZGF0ZTogZmFsc2UsXG4gICAgICAgICAgICBpc1Vwc2VydDogZmFsc2UsXG4gICAgICAgICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIGlzRnJvbVRydXN0ZWRDb2RlOiBmYWxzZSxcbiAgICAgICAgICAgIGRvY0lkOiBkb2MuX2lkLFxuICAgICAgICAgICAgaXNMb2NhbENvbGxlY3Rpb246IGlzTG9jYWxDb2xsZWN0aW9uXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgdXBkYXRlOiBmdW5jdGlvbih1c2VySWQsIGRvYywgZmllbGRzLCBtb2RpZmllcikge1xuICAgICAgICAvLyBSZWZlcmVuY2VkIG1vZGlmaWVyIGlzIGNsZWFuZWQgaW4gcGxhY2VcbiAgICAgICAgYy5zaW1wbGVTY2hlbWEobW9kaWZpZXIpLmNsZWFuKG1vZGlmaWVyLCB7XG4gICAgICAgICAgbXV0YXRlOiB0cnVlLFxuICAgICAgICAgIGlzTW9kaWZpZXI6IHRydWUsXG4gICAgICAgICAgLy8gV2UgZG9uJ3QgZG8gdGhlc2UgaGVyZSBiZWNhdXNlIHRoZXkgYXJlIGRvbmUgb24gdGhlIGNsaWVudCBpZiBkZXNpcmVkXG4gICAgICAgICAgZmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICBhdXRvQ29udmVydDogZmFsc2UsXG4gICAgICAgICAgcmVtb3ZlRW1wdHlTdHJpbmdzOiBmYWxzZSxcbiAgICAgICAgICB0cmltU3RyaW5nczogZmFsc2UsXG4gICAgICAgICAgZXh0ZW5kQXV0b1ZhbHVlQ29udGV4dDoge1xuICAgICAgICAgICAgaXNJbnNlcnQ6IGZhbHNlLFxuICAgICAgICAgICAgaXNVcGRhdGU6IHRydWUsXG4gICAgICAgICAgICBpc1Vwc2VydDogZmFsc2UsXG4gICAgICAgICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIGlzRnJvbVRydXN0ZWRDb2RlOiBmYWxzZSxcbiAgICAgICAgICAgIGRvY0lkOiBkb2MgJiYgZG9jLl9pZCxcbiAgICAgICAgICAgIGlzTG9jYWxDb2xsZWN0aW9uOiBpc0xvY2FsQ29sbGVjdGlvblxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGZldGNoOiBbJ19pZCddLFxuICAgICAgdHJhbnNmb3JtOiBudWxsXG4gICAgfSk7XG5cbiAgICAvLyBTZWNvbmQgZGVmaW5lIGRlbnkgZnVuY3Rpb25zIHRvIHZhbGlkYXRlIGFnYWluIG9uIHRoZSBzZXJ2ZXJcbiAgICAvLyBmb3IgY2xpZW50LWluaXRpYXRlZCBpbnNlcnRzIGFuZCB1cGRhdGVzLiBUaGVzZSBzaG91bGQgYmVcbiAgICAvLyBjYWxsZWQgYWZ0ZXIgdGhlIGNsZWFuL2F1dG92YWx1ZSBmdW5jdGlvbnMgc2luY2Ugd2UncmUgYWRkaW5nXG4gICAgLy8gdGhlbSBhZnRlci4gVGhlc2UgbXVzdCAqbm90KiBoYXZlIFwidHJhbnNmb3JtOiBudWxsXCIgaWYgb3B0aW9ucy50cmFuc2Zvcm0gaXMgdHJ1ZSBiZWNhdXNlXG4gICAgLy8gd2UgbmVlZCB0byBwYXNzIHRoZSBkb2MgdGhyb3VnaCBhbnkgdHJhbnNmb3JtcyB0byBiZSBzdXJlXG4gICAgLy8gdGhhdCBjdXN0b20gdHlwZXMgYXJlIHByb3Blcmx5IHJlY29nbml6ZWQgZm9yIHR5cGUgdmFsaWRhdGlvbi5cbiAgICBjLmRlbnkoe1xuICAgICAgaW5zZXJ0OiBmdW5jdGlvbih1c2VySWQsIGRvYykge1xuICAgICAgICAvLyBXZSBwYXNzIHRoZSBmYWxzZSBvcHRpb25zIGJlY2F1c2Ugd2Ugd2lsbCBoYXZlIGRvbmUgdGhlbSBvbiBjbGllbnQgaWYgZGVzaXJlZFxuICAgICAgICBkb1ZhbGlkYXRlKFxuICAgICAgICAgIGMsXG4gICAgICAgICAgXCJpbnNlcnRcIixcbiAgICAgICAgICBbXG4gICAgICAgICAgICBkb2MsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRyaW1TdHJpbmdzOiBmYWxzZSxcbiAgICAgICAgICAgICAgcmVtb3ZlRW1wdHlTdHJpbmdzOiBmYWxzZSxcbiAgICAgICAgICAgICAgZmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgYXV0b0NvbnZlcnQ6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDAsICdJTlZBTElEJywgRUpTT04uc3RyaW5naWZ5KGVycm9yLmludmFsaWRLZXlzKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGZhbHNlLCAvLyBnZXRBdXRvVmFsdWVzXG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGZhbHNlIC8vIGlzRnJvbVRydXN0ZWRDb2RlXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24odXNlcklkLCBkb2MsIGZpZWxkcywgbW9kaWZpZXIpIHtcbiAgICAgICAgLy8gTk9URTogVGhpcyB3aWxsIG5ldmVyIGJlIGFuIHVwc2VydCBiZWNhdXNlIGNsaWVudC1zaWRlIHVwc2VydHNcbiAgICAgICAgLy8gYXJlIG5vdCBhbGxvd2VkIG9uY2UgeW91IGRlZmluZSBhbGxvdy9kZW55IGZ1bmN0aW9ucy5cbiAgICAgICAgLy8gV2UgcGFzcyB0aGUgZmFsc2Ugb3B0aW9ucyBiZWNhdXNlIHdlIHdpbGwgaGF2ZSBkb25lIHRoZW0gb24gY2xpZW50IGlmIGRlc2lyZWRcbiAgICAgICAgZG9WYWxpZGF0ZShcbiAgICAgICAgICBjLFxuICAgICAgICAgIFwidXBkYXRlXCIsXG4gICAgICAgICAgW1xuICAgICAgICAgICAge19pZDogZG9jICYmIGRvYy5faWR9LFxuICAgICAgICAgICAgbW9kaWZpZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRyaW1TdHJpbmdzOiBmYWxzZSxcbiAgICAgICAgICAgICAgcmVtb3ZlRW1wdHlTdHJpbmdzOiBmYWxzZSxcbiAgICAgICAgICAgICAgZmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgYXV0b0NvbnZlcnQ6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDAsICdJTlZBTElEJywgRUpTT04uc3RyaW5naWZ5KGVycm9yLmludmFsaWRLZXlzKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGZhbHNlLCAvLyBnZXRBdXRvVmFsdWVzXG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGZhbHNlIC8vIGlzRnJvbVRydXN0ZWRDb2RlXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGZldGNoOiBbJ19pZCddLFxuICAgICAgLi4uKG9wdGlvbnMudHJhbnNmb3JtID09PSB0cnVlID8ge30gOiB7dHJhbnNmb3JtOiBudWxsfSksXG4gICAgfSk7XG5cbiAgICAvLyBub3RlIHRoYXQgd2UndmUgYWxyZWFkeSBkb25lIHRoaXMgY29sbGVjdGlvbiBzbyB0aGF0IHdlIGRvbid0IGRvIGl0IGFnYWluXG4gICAgLy8gaWYgYXR0YWNoU2NoZW1hIGlzIGNhbGxlZCBhZ2FpblxuICAgIGFscmVhZHlEZWZpbmVkW2MuX25hbWVdID0gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xsZWN0aW9uMjtcbiJdfQ==
