(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ReactiveVar = Package['reactive-var'].ReactiveVar;

/* Package-scope variables */
var __coffeescriptShare, ComputedField;

(function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/peerlibrary_computed-field/packages/peerlibrary_computed-fi //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/peerlibrary:computed-field/lib.coffee.js                 //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                  

ComputedField = (function() {
  function ComputedField(func, equalsFunc) {
    var getter, handle, lastValue, startAutorun;
    handle = null;
    lastValue = null;
    startAutorun = function() {
      var originalStop;
      handle = Tracker.autorun(function(computation) {
        var value;
        value = func();
        if (!lastValue) {
          lastValue = new ReactiveVar(value, equalsFunc);
        } else {
          lastValue.set(value);
        }
        return Tracker.afterFlush(function() {
          if (!lastValue.dep.hasDependents()) {
            return getter.stop();
          }
        });
      });
      if (handle.onStop) {
        return handle.onStop(function() {
          return handle = null;
        });
      } else {
        originalStop = handle.stop;
        return handle.stop = function() {
          if (handle) {
            originalStop.call(handle);
          }
          return handle = null;
        };
      }
    };
    startAutorun();
    getter = function() {
      getter.flush();
      return lastValue.get();
    };
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(getter, this.constructor.prototype);
    } else {
      getter.__proto__ = this.constructor.prototype;
    }
    getter.toString = function() {
      return "ComputedField{" + (this()) + "}";
    };
    getter.apply = function() {
      return getter();
    };
    getter.call = function() {
      return getter();
    };
    getter.stop = function() {
      if (handle != null) {
        handle.stop();
      }
      return handle = null;
    };
    getter._isRunning = function() {
      return !!handle;
    };
    getter.flush = function() {
      return Tracker.nonreactive(function() {
        if (handle) {
          return handle._recompute();
        } else {
          return startAutorun();
        }
      });
    };
    return getter;
  }

  return ComputedField;

})();
///////////////////////////////////////////////////////////////////////

}).call(this);

//////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("peerlibrary:computed-field", {
  ComputedField: ComputedField
});

})();
