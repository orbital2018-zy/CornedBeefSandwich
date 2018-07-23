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
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ReactiveVar = Package['reactive-var'].ReactiveVar;

/* Package-scope variables */
var __coffeescriptShare, ReactiveField;

(function(){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/peerlibrary_reactive-field/packages/peerlibrary_reactive-fiel //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
(function () {

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// packages/peerlibrary:reactive-field/lib.coffee.js                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                  

ReactiveField = (function() {
  function ReactiveField(initialValue, equalsFunc) {
    var getterSetter, value;
    value = new ReactiveVar(initialValue, equalsFunc);
    getterSetter = function(newValue) {
      if (arguments.length > 0) {
        value.set(newValue);
        return Tracker.nonreactive((function(_this) {
          return function() {
            return value.get();
          };
        })(this));
      }
      return value.get();
    };
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(getterSetter, this.constructor.prototype);
    } else {
      getterSetter.__proto__ = this.constructor.prototype;
    }
    getterSetter.toString = function() {
      return "ReactiveField{" + (this()) + "}";
    };
    getterSetter.apply = function(obj, args) {
      if ((args != null ? args.length : void 0) > 0) {
        return getterSetter(args[0]);
      } else {
        return getterSetter();
      }
    };
    getterSetter.call = function(obj, arg) {
      if (arguments.length > 1) {
        return getterSetter(arg);
      } else {
        return getterSetter();
      }
    };
    return getterSetter;
  }

  return ReactiveField;

})();
/////////////////////////////////////////////////////////////////////////

}).call(this);

////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("peerlibrary:reactive-field", {
  ReactiveField: ReactiveField
});

})();
