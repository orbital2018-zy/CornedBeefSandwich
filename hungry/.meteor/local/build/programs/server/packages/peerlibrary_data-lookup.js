(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ComputedField = Package['peerlibrary:computed-field'].ComputedField;

/* Package-scope variables */
var __coffeescriptShare, DataLookup;

(function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/peerlibrary_data-lookup/packages/peerlibrary_data-lookup.js //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/peerlibrary:data-lookup/lib.coffee.js                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
               

DataLookup = (function() {
  function DataLookup() {}

  DataLookup.lookup = function(obj, path) {
    var segment;
    if (_.isString(path)) {
      path = path.split('.');
    }
    if (_.isFunction(obj)) {
      obj = obj();
    }
    if (!_.isArray(path)) {
      return obj;
    }
    while (path.length > 0) {
      segment = path.shift();
      if (_.isObject(obj) && segment in obj) {
        obj = obj[segment];
        if (_.isFunction(obj)) {
          obj = obj();
        }
      } else {
        return void 0;
      }
    }
    return obj;
  };

  DataLookup.get = function(obj, path, equalsFunc) {
    var result;
    if (!Tracker.active) {
      return this.lookup(obj, path);
    }
    result = new ComputedField((function(_this) {
      return function() {
        return _this.lookup(obj, path);
      };
    })(this), equalsFunc);
    return result();
  };

  return DataLookup;

})();
///////////////////////////////////////////////////////////////////////

}).call(this);

//////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("peerlibrary:data-lookup", {
  DataLookup: DataLookup
});

})();
