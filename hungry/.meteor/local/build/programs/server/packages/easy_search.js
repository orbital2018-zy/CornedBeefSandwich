(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
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

//# sourceURL=meteor://💻app/packages/easy_search.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvZWFzeTpzZWFyY2gvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnQiLCJJbmRleCIsIkVuZ2luZSIsIlJlYWN0aXZlRW5naW5lIiwiQ3Vyc29yIiwiTW9uZ29EQkVuZ2luZSIsIk1pbmltb25nb0VuZ2luZSIsIk1vbmdvVGV4dEluZGV4RW5naW5lIiwiU2luZ2xlSW5kZXhDb21wb25lbnQiLCJCYXNlQ29tcG9uZW50IiwiRmllbGRJbnB1dENvbXBvbmVudCIsIkVhY2hDb21wb25lbnQiLCJJZklucHV0RW1wdHlDb21wb25lbnQiLCJJZk5vUmVzdWx0c0NvbXBvbmVudCIsIklmU2VhcmNoaW5nQ29tcG9uZW50IiwiSW5wdXRDb21wb25lbnQiLCJMb2FkTW9yZUNvbXBvbmVudCIsIlBhZ2luYXRpb25Db21wb25lbnQiLCJ3YXRjaCIsInJlcXVpcmUiLCJ2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxPQUFPQyxNQUFQLENBQWM7QUFBQ0MsU0FBTSxNQUFJQSxLQUFYO0FBQWlCQyxVQUFPLE1BQUlBLE1BQTVCO0FBQW1DQyxrQkFBZSxNQUFJQSxjQUF0RDtBQUFxRUMsVUFBTyxNQUFJQSxNQUFoRjtBQUF1RkMsaUJBQWMsTUFBSUEsYUFBekc7QUFBdUhDLG1CQUFnQixNQUFJQSxlQUEzSTtBQUEySkMsd0JBQXFCLE1BQUlBLG9CQUFwTDtBQUF5TUMsd0JBQXFCLE1BQUlBLG9CQUFsTztBQUF1UEMsaUJBQWMsTUFBSUEsYUFBelE7QUFBdVJDLHVCQUFvQixNQUFJQSxtQkFBL1M7QUFBbVVDLGlCQUFjLE1BQUlBLGFBQXJWO0FBQW1XQyx5QkFBc0IsTUFBSUEscUJBQTdYO0FBQW1aQyx3QkFBcUIsTUFBSUEsb0JBQTVhO0FBQWljQyx3QkFBcUIsTUFBSUEsb0JBQTFkO0FBQStlQyxrQkFBZSxNQUFJQSxjQUFsZ0I7QUFBaWhCQyxxQkFBa0IsTUFBSUEsaUJBQXZpQjtBQUF5akJDLHVCQUFvQixNQUFJQTtBQUFqbEIsQ0FBZDtBQUFxbkIsSUFBSWYsTUFBSixFQUFXQyxjQUFYLEVBQTBCQyxNQUExQixFQUFpQ0MsYUFBakMsRUFBK0NDLGVBQS9DLEVBQStEQyxvQkFBL0Q7QUFBb0ZSLE9BQU9tQixLQUFQLENBQWFDLFFBQVEsd0JBQVIsQ0FBYixFQUErQztBQUFDakIsU0FBT2tCLENBQVAsRUFBUztBQUFDbEIsYUFBT2tCLENBQVA7QUFBUyxHQUFwQjs7QUFBcUJqQixpQkFBZWlCLENBQWYsRUFBaUI7QUFBQ2pCLHFCQUFlaUIsQ0FBZjtBQUFpQixHQUF4RDs7QUFBeURoQixTQUFPZ0IsQ0FBUCxFQUFTO0FBQUNoQixhQUFPZ0IsQ0FBUDtBQUFTLEdBQTVFOztBQUE2RWYsZ0JBQWNlLENBQWQsRUFBZ0I7QUFBQ2Ysb0JBQWNlLENBQWQ7QUFBZ0IsR0FBOUc7O0FBQStHZCxrQkFBZ0JjLENBQWhCLEVBQWtCO0FBQUNkLHNCQUFnQmMsQ0FBaEI7QUFBa0IsR0FBcEo7O0FBQXFKYix1QkFBcUJhLENBQXJCLEVBQXVCO0FBQUNiLDJCQUFxQmEsQ0FBckI7QUFBdUI7O0FBQXBNLENBQS9DLEVBQXFQLENBQXJQO0FBQXdQLElBQUluQixLQUFKLEVBQVVPLG9CQUFWLEVBQStCQyxhQUEvQixFQUE2Q0MsbUJBQTdDLEVBQWlFQyxhQUFqRSxFQUErRUMscUJBQS9FLEVBQXFHQyxvQkFBckcsRUFBMEhDLG9CQUExSCxFQUErSUMsY0FBL0ksRUFBOEpDLGlCQUE5SixFQUFnTEMsbUJBQWhMO0FBQW9NbEIsT0FBT21CLEtBQVAsQ0FBYUMsUUFBUSw4QkFBUixDQUFiLEVBQXFEO0FBQUNsQixRQUFNbUIsQ0FBTixFQUFRO0FBQUNuQixZQUFNbUIsQ0FBTjtBQUFRLEdBQWxCOztBQUFtQlosdUJBQXFCWSxDQUFyQixFQUF1QjtBQUFDWiwyQkFBcUJZLENBQXJCO0FBQXVCLEdBQWxFOztBQUFtRVgsZ0JBQWNXLENBQWQsRUFBZ0I7QUFBQ1gsb0JBQWNXLENBQWQ7QUFBZ0IsR0FBcEc7O0FBQXFHVixzQkFBb0JVLENBQXBCLEVBQXNCO0FBQUNWLDBCQUFvQlUsQ0FBcEI7QUFBc0IsR0FBbEo7O0FBQW1KVCxnQkFBY1MsQ0FBZCxFQUFnQjtBQUFDVCxvQkFBY1MsQ0FBZDtBQUFnQixHQUFwTDs7QUFBcUxSLHdCQUFzQlEsQ0FBdEIsRUFBd0I7QUFBQ1IsNEJBQXNCUSxDQUF0QjtBQUF3QixHQUF0Tzs7QUFBdU9QLHVCQUFxQk8sQ0FBckIsRUFBdUI7QUFBQ1AsMkJBQXFCTyxDQUFyQjtBQUF1QixHQUF0Ujs7QUFBdVJOLHVCQUFxQk0sQ0FBckIsRUFBdUI7QUFBQ04sMkJBQXFCTSxDQUFyQjtBQUF1QixHQUF0VTs7QUFBdVVMLGlCQUFlSyxDQUFmLEVBQWlCO0FBQUNMLHFCQUFlSyxDQUFmO0FBQWlCLEdBQTFXOztBQUEyV0osb0JBQWtCSSxDQUFsQixFQUFvQjtBQUFDSix3QkFBa0JJLENBQWxCO0FBQW9CLEdBQXBaOztBQUFxWkgsc0JBQW9CRyxDQUFwQixFQUFzQjtBQUFDSCwwQkFBb0JHLENBQXBCO0FBQXNCOztBQUFsYyxDQUFyRCxFQUF5ZixDQUF6ZixFIiwiZmlsZSI6Ii9wYWNrYWdlcy9lYXN5X3NlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRW5naW5lLFxuICAgIFJlYWN0aXZlRW5naW5lLFxuICAgIEN1cnNvcixcbiAgICBNb25nb0RCRW5naW5lLFxuICAgIE1pbmltb25nb0VuZ2luZSxcbiAgICBNb25nb1RleHRJbmRleEVuZ2luZSxcbn0gZnJvbSAnbWV0ZW9yL2Vhc3lzZWFyY2g6Y29yZSdcblxuaW1wb3J0IHtcbiAgSW5kZXgsIC8vIGluZGV4IGVuaGFuY2VkIHdpdGggY29tcG9uZW50IGxvZ2ljXG4gIFNpbmdsZUluZGV4Q29tcG9uZW50LFxuICBCYXNlQ29tcG9uZW50LFxuICBGaWVsZElucHV0Q29tcG9uZW50LFxuICBFYWNoQ29tcG9uZW50LFxuICBJZklucHV0RW1wdHlDb21wb25lbnQsXG4gIElmTm9SZXN1bHRzQ29tcG9uZW50LFxuICBJZlNlYXJjaGluZ0NvbXBvbmVudCxcbiAgSW5wdXRDb21wb25lbnQsXG4gIExvYWRNb3JlQ29tcG9uZW50LFxuICBQYWdpbmF0aW9uQ29tcG9uZW50LFxufSBmcm9tICdtZXRlb3IvZWFzeXNlYXJjaDpjb21wb25lbnRzJ1xuXG5leHBvcnQge1xuICBJbmRleCxcbiAgRW5naW5lLFxuICBSZWFjdGl2ZUVuZ2luZSxcbiAgQ3Vyc29yLFxuXG4gIE1vbmdvREJFbmdpbmUsXG4gIE1pbmltb25nb0VuZ2luZSxcbiAgTW9uZ29UZXh0SW5kZXhFbmdpbmUsXG5cbiAgU2luZ2xlSW5kZXhDb21wb25lbnQsXG4gIEJhc2VDb21wb25lbnQsXG4gIEZpZWxkSW5wdXRDb21wb25lbnQsXG4gIEVhY2hDb21wb25lbnQsXG4gIElmSW5wdXRFbXB0eUNvbXBvbmVudCxcbiAgSWZOb1Jlc3VsdHNDb21wb25lbnQsXG4gIElmU2VhcmNoaW5nQ29tcG9uZW50LFxuICBJbnB1dENvbXBvbmVudCxcbiAgTG9hZE1vcmVDb21wb25lbnQsXG4gIFBhZ2luYXRpb25Db21wb25lbnQsXG59XG4iXX0=
