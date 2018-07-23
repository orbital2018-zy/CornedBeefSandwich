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
var EasySearch = Package['easysearch:components'].EasySearch;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"easy:search":{"main.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                        //
// packages/easy_search/main.js                                                           //
//                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////
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
var Engine, ReactiveEngine, Cursor, MongoDBEngine, MinimongoEngine, MongoTextIndexEngine;
module.watch(require("meteor/easysearch:core"), {
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
var Index, SingleIndexComponent, BaseComponent, FieldInputComponent, EachComponent, IfInputEmptyComponent, IfNoResultsComponent, IfSearchingComponent, InputComponent, LoadMoreComponent, PaginationComponent;
module.watch(require("meteor/easysearch:components"), {
  Index: function (v) {
    Index = v;
  },
  SingleIndexComponent: function (v) {
    SingleIndexComponent = v;
  },
  BaseComponent: function (v) {
    BaseComponent = v;
  },
  FieldInputComponent: function (v) {
    FieldInputComponent = v;
  },
  EachComponent: function (v) {
    EachComponent = v;
  },
  IfInputEmptyComponent: function (v) {
    IfInputEmptyComponent = v;
  },
  IfNoResultsComponent: function (v) {
    IfNoResultsComponent = v;
  },
  IfSearchingComponent: function (v) {
    IfSearchingComponent = v;
  },
  InputComponent: function (v) {
    InputComponent = v;
  },
  LoadMoreComponent: function (v) {
    LoadMoreComponent = v;
  },
  PaginationComponent: function (v) {
    PaginationComponent = v;
  }
}, 1);
////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("/node_modules/meteor/easy:search/main.js");

/* Exports */
Package._define("easy:search", exports, {
  EasySearch: EasySearch
});

})();
