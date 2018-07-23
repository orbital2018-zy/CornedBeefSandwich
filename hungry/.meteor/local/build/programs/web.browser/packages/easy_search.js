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

var require = meteorInstall({"node_modules":{"meteor":{"easy:search":{"main.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                        //
// packages/easy_search/main.js                                                           //
//                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////
                                                                                          //
module.export({
  Index: () => Index,
  Engine: () => Engine,
  ReactiveEngine: () => ReactiveEngine,
  Cursor: () => Cursor,
  MongoDBEngine: () => MongoDBEngine,
  MinimongoEngine: () => MinimongoEngine,
  MongoTextIndexEngine: () => MongoTextIndexEngine,
  SingleIndexComponent: () => SingleIndexComponent,
  BaseComponent: () => BaseComponent,
  FieldInputComponent: () => FieldInputComponent,
  EachComponent: () => EachComponent,
  IfInputEmptyComponent: () => IfInputEmptyComponent,
  IfNoResultsComponent: () => IfNoResultsComponent,
  IfSearchingComponent: () => IfSearchingComponent,
  InputComponent: () => InputComponent,
  LoadMoreComponent: () => LoadMoreComponent,
  PaginationComponent: () => PaginationComponent
});
let Engine, ReactiveEngine, Cursor, MongoDBEngine, MinimongoEngine, MongoTextIndexEngine;
module.watch(require("meteor/easysearch:core"), {
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
let Index, SingleIndexComponent, BaseComponent, FieldInputComponent, EachComponent, IfInputEmptyComponent, IfNoResultsComponent, IfSearchingComponent, InputComponent, LoadMoreComponent, PaginationComponent;
module.watch(require("meteor/easysearch:components"), {
  Index(v) {
    Index = v;
  },

  SingleIndexComponent(v) {
    SingleIndexComponent = v;
  },

  BaseComponent(v) {
    BaseComponent = v;
  },

  FieldInputComponent(v) {
    FieldInputComponent = v;
  },

  EachComponent(v) {
    EachComponent = v;
  },

  IfInputEmptyComponent(v) {
    IfInputEmptyComponent = v;
  },

  IfNoResultsComponent(v) {
    IfNoResultsComponent = v;
  },

  IfSearchingComponent(v) {
    IfSearchingComponent = v;
  },

  InputComponent(v) {
    InputComponent = v;
  },

  LoadMoreComponent(v) {
    LoadMoreComponent = v;
  },

  PaginationComponent(v) {
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
