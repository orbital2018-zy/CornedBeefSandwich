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
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var Random = Package.random.Random;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Mongo = Package.mongo.Mongo;
var Template = Package['peerlibrary:blaze-components'].Template;
var BlazeComponent = Package['peerlibrary:blaze-components'].BlazeComponent;
var BlazeComponentDebug = Package['peerlibrary:blaze-components'].BlazeComponentDebug;
var EasySearch = Package['easysearch:core'].EasySearch;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var BaseComponent, SingleIndexComponent;

var require = meteorInstall({"node_modules":{"meteor":{"easysearch:components":{"lib":{"base.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/base.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * The BaseComponent holds the base logic for EasySearch Components.
 *
 * @type {BaseComponent}
 */
BaseComponent = class BaseComponent extends BlazeComponent {
  /**
   * Return the name of the component.
   *
   * @returns {String}
   */
  get name() {
    return this.getData().name;
  }
  /**
   * Return an array of properties that are reserved to the base component.
   *
   * @returns {String[]}
   */


  static get reserveredProperties() {
    return ['index', 'indexes', 'name', 'attributes'];
  }
  /**
   * Setup component on created.
   */


  onCreated() {
    this.autorun(() => this.initializeBase());
  }

  initializeBase() {
    let index = this.getData().index,
        indexes = [index];

    if (!index) {
      indexes = this.getData().indexes;
    }

    if (_.isEmpty(indexes)) {
      throw new Meteor.Error('no-index', 'Please provide an index for your component');
    }

    if (indexes.filter(index => index instanceof EasySearch.Index).length !== indexes.length) {
      throw new Meteor.Error('invalid-configuration', "Did not receive an index or an array of indexes: \"".concat(indexes.toString(), "\""));
    }

    this.indexes = indexes;
    this.options = _.defaults({}, _.omit(this.getData(), ...BaseComponent.reserveredProperties), this.defaultOptions);
    check(this.name, Match.Optional(String));
    check(this.options, Object);
    this.eachIndex(function (index, name) {
      if (!index.getComponentDict(name)) {
        index.registerComponent(name);
      }
    });
  }
  /**
   * Return the default options.
   *
   * @returns {Object}
   */


  get defaultOptions() {
    return {};
  }
  /**
   * @param {String} searchStr
   *
   * @returns {Boolean}
   */


  shouldShowDocuments(searchStr) {
    return !this.getData().noDocumentsOnEmpty || 0 < searchStr.length;
  }
  /**
   * Search the component.
   *
   * @param {String} searchString String to search for
   */


  search(searchString) {
    check(searchString, String);
    const showDocuments = this.shouldShowDocuments(searchString);
    this.eachIndex(function (index, name) {
      index.getComponentDict(name).set('showDocuments', showDocuments);

      if (showDocuments) {
        index.getComponentMethods(name).search(searchString);
      }
    });
  }
  /**
   * Return the data.
   *
   * @returns {Object}
   */


  getData() {
    return this.data() || {};
  }
  /**
   * Return the dictionaries.
   *
   * @returns {Object}
   */


  get dicts() {
    return this.eachIndex((index, name) => {
      return index.getComponentDict(name);
    }, 'map');
  }
  /**
   * Loop through each index and apply a function
   *
   * @param {Function} func   Function to run
   * @param {String}   method Lodash method name
   *
   * @return mixed
   */


  eachIndex(func) {
    let method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'each';
    let componentScope = this,
        logic = this.getData().logic;

    if (!_.isEmpty(logic)) {
      method = 'OR' === logic ? 'some' : 'every';
    }

    return _[method](this.indexes, function (index) {
      return func.apply(this, [index, componentScope.name]);
    });
  }

};
EasySearch.BaseComponent = BaseComponent;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"single-index.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/single-index.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * The SingleIndexComponent holds logic for components that only can use one index.
 *
 * @type {SingleIndexComponent}
 */
SingleIndexComponent = class SingleIndexComponent extends BaseComponent {
  /**
   * Setup component on created.
   */
  onCreated() {
    super.onCreated();

    if (this.indexes.length > 1) {
      throw new Meteor.Error('only-single-index', 'Can only specify one index');
    }
  }
  /**
   * Return the index
   *
   * @returns {Index}
   */


  get index() {
    return _.first(this.indexes);
  }
  /**
   * Return the dictionary.
   *
   * @returns {Object}
   */


  get dict() {
    return _.first(this.dicts);
  }

};
EasySearch.SingleIndexComponent = SingleIndexComponent;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"component-methods.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/component-methods.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
EasySearch._getComponentMethods = function (dict, index) {
  return {
    /**
     * Search a component for the given search string.
     *
     * @param {Object|String} searchDefinition Search definition
     */
    search: searchDefinition => {
      dict.set('searchOptions', {
        props: (dict.get('searchOptions') || {}).props
      });
      dict.set('searchDefinition', searchDefinition);
      dict.set('stopPublication', true);
    },

    /**
     * Return the EasySearch.Cursor for the current search.
     *
     * @returns {Cursor}
     */
    getCursor: () => {
      const searchDefinition = dict.get('searchDefinition') || '',
            options = dict.get('searchOptions') || {},
            showDocuments = dict.get('showDocuments');
      check(options, Match.Optional(Object));

      if (false === showDocuments) {
        dict.set('count', 0);
        dict.set('searching', false);
        dict.set('limit', 0);
        dict.set('skip', 0);
        dict.set('currentCount', 0);
        dict.set('stopPublication', false);
        return EasySearch.Cursor.emptyCursor;
      }

      const cursor = index.search(searchDefinition, options),
            searchOptions = index._getSearchOptions(options);

      dict.set('count', cursor.count());
      dict.set('searching', !cursor.isReady());
      dict.set('limit', searchOptions.limit);
      dict.set('skip', searchOptions.skip);
      dict.set('currentCount', cursor.mongoCursor.count());
      dict.set('stopPublication', false);
      return cursor;
    },

    /**
     * Return true if the current search string is empty.
     *
     * @returns {boolean}
     */
    searchIsEmpty: () => {
      let searchDefinition = dict.get('searchDefinition');
      return !searchDefinition || _.isString(searchDefinition) && 0 === searchDefinition.trim().length;
    },

    /**
     * Return true if the component has no results.
     *
     * @returns {boolean}
     */
    hasNoResults: () => {
      let count = dict.get('count'),
          showDocuments = dict.get('showDocuments');
      return false !== showDocuments && !dict.get('searching') && (!_.isNumber(count) || 0 === count);
    },

    /**
     * Return true if the component is being searched.
     *
     * @returns {boolean}
     */
    isSearching: () => {
      return !!dict.get('searching');
    },

    /**
     * Return true if the component has more documents than displayed right now.
     *
     * @returns {boolean}
     */
    hasMoreDocuments: () => {
      return dict.get('currentCount') < dict.get('count');
    },

    /**
     * Load more documents for the component.
     *
     * @param {Number} count Count of docs
     */
    loadMore: count => {
      check(count, Number);
      let currentCount = dict.get('currentCount'),
          options = dict.get('searchOptions') || {};
      options.limit = currentCount + count;
      dict.set('searchOptions', options);
    },

    /**
     * Paginate through documents for the given page.
     *
     * @param {Number} page Page number
     */
    paginate: page => {
      check(page, Number);
      let options = dict.get('searchOptions') || {},
          limit = dict.get('limit');
      options.skip = limit * (page - 1);
      dict.set('currentPage', page);
      dict.set('searchOptions', options);
      dict.set('stopPublication', true);
    },

    /**
     * Add custom properties for search.
     */
    addProps() {
      let options = dict.get('searchOptions') || {};
      options.props = options.props || {};

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (_.isObject(args[0])) {
        options.props = _.extend(options.props, args[0]);
      } else if (_.isString(args[0])) {
        options.props[args[0]] = args[1];
      }

      dict.set('searchOptions', options);
      this.paginate(1);
    },

    /**
     * Remove custom properties for search.
     */
    removeProps() {
      let options = dict.get('searchOptions') || {};

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (!_.isEmpty(args)) {
        options.props = _.omit(options.props, args) || {};
      } else {
        options.props = {};
      }

      dict.set('searchOptions', options);
      this.paginate(1);
    },

    /**
     * Reset the search.
     */
    reset() {
      this.search('');
      this.paginate(1);
      dict.set('searchOptions', {});
    }

  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"core.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/core.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * Extend EasySearch.Index with component functionality.
 *
 * @type {Index}
 */
EasySearch.Index = class Index extends EasySearch.Index {
  /**
   * Constructor.
   */
  constructor() {
    super(...arguments);
    this.components = {};
  }
  /**
   * Return static default name for components.
   *
   * @returns {String}
   */


  static get COMPONENT_DEFAULT_NAME() {
    return '__default';
  }
  /**
   * Register a component on the index.
   *
   * @param {String} componentName Optional name of the component
   */


  registerComponent() {
    let componentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EasySearch.Index.COMPONENT_DEFAULT_NAME;
    this.components[componentName] = new ReactiveDict("easySearchComponent_".concat(this.config.name, "_").concat(componentName, "_").concat(Random.id()));
  }
  /**
   * Get the reactive dictionary for a component.
   *
   * @param {String} componentName Optional name of the component
   */


  getComponentDict() {
    let componentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EasySearch.Index.COMPONENT_DEFAULT_NAME;
    return this.components[componentName];
  }
  /**
   * Get component methods that are useful for implementing search behaviour.
   *
   * @param componentName
   */


  getComponentMethods() {
    let componentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EasySearch.Index.COMPONENT_DEFAULT_NAME;
    let dict = this.getComponentDict(componentName);

    if (!dict) {
      throw new Meteor.Error('no-component', "Component with name '".concat(componentName, "' not found"));
    }

    return EasySearch._getComponentMethods(dict, this);
  }

};
/**
 * Return true if the current page is valid.
 *
 * @param {Number} totalPagesLength Count of all pages available
 * @param {Number} currentPage      Current page to check
 *
 * @returns {boolean}
 */

function isValidPage(totalPagesLength, currentPage) {
  return currentPage <= totalPagesLength && currentPage > 0;
}
/**
 * Helper method to get the pages for pagination as an array.
 *
 * @param totalCount   Total count of results
 * @param pageCount    Count of results per page
 * @param currentPage  Current page
 * @param prevAndNext  True if Next and Previous buttons should appear
 * @param maxPages     Maximum count of pages to show
 *
 * @private
 *
 * @returns {Array}
 */


EasySearch._getPagesForPagination = function (_ref) {
  let {
    totalCount,
    pageCount,
    currentPage,
    prevAndNext,
    maxPages
  } = _ref;

  let pages = _.range(1, Math.ceil(totalCount / pageCount) + 1),
      pagesLength = pages.length;

  if (!isValidPage(pagesLength, currentPage)) {
    throw new Meteor.Error('invalid-page', 'Current page is not in valid range');
  }

  if (maxPages) {
    let startSlice = currentPage > maxPages / 2 ? currentPage - 1 - Math.floor(maxPages / 2) : 0,
        endSlice = startSlice + maxPages;

    if (endSlice > pagesLength) {
      pages = pages.slice(-maxPages);
    } else {
      pages = pages.slice(startSlice, startSlice + maxPages);
    }
  }

  let pageData = _.map(pages, function (page) {
    let isCurrentPage = page === currentPage;
    return {
      page,
      content: page.toString(),
      current: isCurrentPage,
      disabled: isCurrentPage
    };
  });

  if (prevAndNext) {
    // Previous
    let prevPage = isValidPage(pagesLength, currentPage - 1) ? currentPage - 1 : null;
    pageData.unshift({
      page: prevPage,
      content: 'Prev',
      current: false,
      disabled: 1 === currentPage
    }); // Next

    let nextPage = isValidPage(pagesLength, currentPage + 1) ? currentPage + 1 : null;
    pageData.push({
      page: nextPage,
      content: 'Next',
      current: false,
      disabled: null == nextPage || pagesLength + 1 === currentPage
    });
  }

  return pageData;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"input":{"template.input.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/input/template.input.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("EasySearch.Input");
Template["EasySearch.Input"] = new Template("Template.EasySearch.Input", (function() {
  var view = this;
  return HTML.INPUT(HTML.Attrs(function() {
    return Spacebars.attrMustache(view.lookup("inputAttributes"));
  }));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"input.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/input/input.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * The InputComponent lets you search through configured indexes.
 *
 * @type {InputComponent}
 */
EasySearch.InputComponent = class InputComponent extends BaseComponent {
  /**
   * Setup input onCreated.
   */
  onCreated() {
    super.onCreated(...arguments);
    this.search(this.inputAttributes().value); // create a reactive dependency to the cursor

    this.debouncedSearch = _.debounce(searchString => {
      searchString = searchString.trim();

      if (this.searchString !== searchString) {
        this.searchString = searchString;
        this.eachIndex((index, name) => {
          index.getComponentDict(name).set('currentPage', 1);
        });
        this.search(searchString);
      }
    }, this.options.timeout);
  }
  /**
   * Event map.
   *
   * @returns {Object}
   */


  events() {
    return [{
      'keyup input': function (e) {
        if ('enter' == this.getData().event && e.keyCode != 13) {
          return;
        }

        const value = $(e.target).val();

        if (value.length >= this.options.charLimit) {
          this.debouncedSearch($(e.target).val());
        }
      }
    }];
  }
  /**
   * Return the attributes to set on the input (class, id).
   *
   * @returns {Object}
   */


  inputAttributes() {
    return _.defaults({}, this.getData().attributes, InputComponent.defaultAttributes);
  }
  /**
   * Return the default attributes.
   *
   * @returns {Object}
   */


  static get defaultAttributes() {
    return {
      type: 'text',
      value: ''
    };
  }
  /**
   * Return the default options.
   *
   * @returns {Object}
   */


  get defaultOptions() {
    return {
      timeout: 50,
      charLimit: 0
    };
  }

};
EasySearch.InputComponent.register('EasySearch.Input');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"field-input":{"template.field-input.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/field-input/template.field-input.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("EasySearch.FieldInput");
Template["EasySearch.FieldInput"] = new Template("Template.EasySearch.FieldInput", (function() {
  var view = this;
  return HTML.INPUT(HTML.Attrs(function() {
    return Spacebars.attrMustache(view.lookup("inputAttributes"));
  }));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"field-input.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/field-input/field-input.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * The FieldInputComponent lets you search through configured indexes for a specified fild.
 *
 * @type {FieldInputComponent}
 */
EasySearch.FieldInputComponent = class FieldInputComponent extends EasySearch.InputComponent {
  /**
   * Setup component on created.
   */
  onCreated() {
    super.onCreated();

    if (_.isEmpty(this.getData().field)) {
      throw new Meteor.Error('no-field', 'Please provide a field for your field input component');
    }
  }
  /**
   * Search the component.
   *
   * @param {String} searchString String to search for
   */


  search(searchString) {
    check(searchString, String);
    this.eachIndex((index, name) => {
      let searchDefinition = index.getComponentDict(name).get('searchDefinition') || {};

      if (_.isString(searchDefinition)) {
        throw new Meteor.Error('You can either EasySearch.FieldInput or EasySearch.Input');
      }

      if (this.options.field) {
        searchDefinition[this.options.field] = searchString;
        index.getComponentMethods(name).search(searchDefinition);
      }
    });
  }

};
EasySearch.FieldInputComponent.register('EasySearch.FieldInput');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"each":{"template.each.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/each/template.each.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("EasySearch.Each");
Template["EasySearch.Each"] = new Template("Template.EasySearch.Each", (function() {
  var view = this;
  return Blaze.Each(function() {
    return Spacebars.call(view.lookup("doc"));
  }, function() {
    return [ "\n      ", Blaze._InOuterTemplateScope(view, function() {
      return Blaze._TemplateWith(function() {
        return Spacebars.dataMustache(view.lookup("dataScope"), view.lookup("."), view.lookup("@index"));
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(view.templateContentBlock);
        });
      });
    }), "\n    " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"each.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/each/each.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * The EachComponent allows to loop through the search results found.
 *
 * @type {EachComponent}
 */
EasySearch.EachComponent = class EachComponent extends SingleIndexComponent {
  /**
   * Return the mongo cursor for the search.
   *
   * @returns {Mongo.Cursor}
   */
  doc() {
    const stopPublication = this.index.getComponentDict(this.name).get('stopPublication');
    this.cursor && stopPublication && this.cursor.stop();
    this.cursor = this.index.getComponentMethods(this.name).getCursor();
    return this.cursor.mongoCursor;
  }
  /**
   * Return the datascope for each document.
   *
   * @param {Object} scope
   * @param {Number} index
   *
   * @returns {Object}
   */


  dataScope(scope, index) {
    scope['@index'] = index;
    return scope;
  }

};
EasySearch.EachComponent.register('EasySearch.Each');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"if-input-empty":{"template.if-input-empty.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/if-input-empty/template.if-input-empty.js                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("EasySearch.IfInputEmpty");
Template["EasySearch.IfInputEmpty"] = new Template("Template.EasySearch.IfInputEmpty", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("inputEmpty"));
  }, function() {
    return [ "\n        ", Blaze._InOuterTemplateScope(view, function() {
      return Spacebars.include(function() {
        return Spacebars.call(view.templateContentBlock);
      });
    }), "\n    " ];
  }, function() {
    return [ "\n        ", Blaze.If(function() {
      return Spacebars.call(view.templateElseBlock);
    }, function() {
      return [ "\n            ", Blaze._InOuterTemplateScope(view, function() {
        return Spacebars.include(function() {
          return Spacebars.call(view.templateElseBlock);
        });
      }), "\n        " ];
    }), "\n    " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"if-input-empty.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/if-input-empty/if-input-empty.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * The IfInputEmptyComponent lets you display content when the input is empty.
 *
 * @type {IfInputEmptyComponent}
 */
EasySearch.IfInputEmptyComponent = class IfInputEmptyComponent extends BaseComponent {
  /**
   * Return true if the input is empty.
   *
   * @returns {boolean}
   */
  inputEmpty() {
    return !!this.eachIndex(function (index, name) {
      return index.getComponentMethods(name).searchIsEmpty();
    }, 'every');
  }

};
EasySearch.IfInputEmptyComponent.register('EasySearch.IfInputEmpty');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"if-no-results":{"template.if-no-results.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/if-no-results/template.if-no-results.js                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("EasySearch.IfNoResults");
Template["EasySearch.IfNoResults"] = new Template("Template.EasySearch.IfNoResults", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("noResults"));
  }, function() {
    return [ "\n        ", Blaze._InOuterTemplateScope(view, function() {
      return Spacebars.include(function() {
        return Spacebars.call(view.templateContentBlock);
      });
    }), "\n    " ];
  }, function() {
    return [ "\n        ", Blaze.If(function() {
      return Spacebars.call(view.templateElseBlock);
    }, function() {
      return [ "\n            ", Blaze._InOuterTemplateScope(view, function() {
        return Spacebars.include(function() {
          return Spacebars.call(view.templateElseBlock);
        });
      }), "\n        " ];
    }), "\n    " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"if-no-results.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/if-no-results/if-no-results.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * The IfNoResultsComponent lets you display content when there are no results.
 *
 * @type {IfNoResultsComponent}
 */
EasySearch.IfNoResultsComponent = class IfNoResultsComponent extends BaseComponent {
  /**
   * Return true if there are no results.
   *
   * @returns {boolean}
   */
  noResults() {
    return !!this.eachIndex(function (index, name) {
      return index.getComponentMethods(name).hasNoResults();
    }, 'every');
  }

};
EasySearch.IfNoResultsComponent.register('EasySearch.IfNoResults');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"if-searching":{"template.if-searching.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/if-searching/template.if-searching.js                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("EasySearch.IfSearching");
Template["EasySearch.IfSearching"] = new Template("Template.EasySearch.IfSearching", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("searching"));
  }, function() {
    return [ "\n        ", Blaze._InOuterTemplateScope(view, function() {
      return Spacebars.include(function() {
        return Spacebars.call(view.templateContentBlock);
      });
    }), "\n    " ];
  }, function() {
    return [ "\n        ", Blaze.If(function() {
      return Spacebars.call(view.templateElseBlock);
    }, function() {
      return [ "\n            ", Blaze._InOuterTemplateScope(view, function() {
        return Spacebars.include(function() {
          return Spacebars.call(view.templateElseBlock);
        });
      }), "\n        " ];
    }), "\n    " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"if-searching.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/if-searching/if-searching.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * The IfSearchingComponent lets you display content when the component is being searched.
 *
 * @type {IfSearchingComponent}
 */
EasySearch.IfSearchingComponent = class IfSearchingComponent extends BaseComponent {
  /**
   * Return true if the component is being searched.
   *
   * @returns {boolean}
   */
  searching() {
    return !!this.eachIndex(function (index, name) {
      return index.getComponentMethods(name).isSearching();
    }, 'every');
  }

};
EasySearch.IfSearchingComponent.register('EasySearch.IfSearching');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"load-more":{"template.load-more.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/load-more/template.load-more.js                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("EasySearch.LoadMore");
Template["EasySearch.LoadMore"] = new Template("Template.EasySearch.LoadMore", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("moreDocuments"));
  }, function() {
    return [ "\n        ", HTML.BUTTON(HTML.Attrs(function() {
      return Spacebars.attrMustache(view.lookup("attributes"));
    }), Blaze.View("lookup:content", function() {
      return Spacebars.mustache(view.lookup("content"));
    })), "\n    " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"load-more.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/load-more/load-more.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * The LoadMoreComponent lets you load more documents through a button.
 *
 * @type {LoadMoreComponent}
 */
EasySearch.LoadMoreComponent = class LoadMoreComponent extends SingleIndexComponent {
  /**
   * Load more documents.
   */
  loadMore() {
    this.index.getComponentMethods(this.name).loadMore(this.options.count);
  }
  /**
   * Content of the component.
   *
   * @returns string
   */


  content() {
    return this.options.content;
  }
  /**
   * Attributes of the component.
   *
   * @returns string
   */


  attributes() {
    return this.getData().attributes || {};
  }
  /**
   * Return true if there are more documents to load.
   *
   * @returns {Boolean}
   */


  moreDocuments() {
    return this.index.getComponentMethods(this.name).hasMoreDocuments();
  }
  /**
   * Event map.
   *
   * @returns {Object}
   */


  events() {
    return [{
      'click button': function () {
        this.loadMore();
      }
    }];
  }
  /**
   * Return the default options.
   *
   * @returns {Object}
   */


  get defaultOptions() {
    return {
      content: 'Load more',
      count: 10
    };
  }

};
EasySearch.LoadMoreComponent.register('EasySearch.LoadMore');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"pagination":{"template.pagination.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/pagination/template.pagination.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("EasySearch.Pagination");
Template["EasySearch.Pagination"] = new Template("Template.EasySearch.Pagination", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("moreDocuments"));
  }, function() {
    return [ "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("customRenderPagination"));
    }, function() {
      return [ "\n            ", Blaze._TemplateWith(function() {
        return {
          template: Spacebars.call(view.lookup("customRenderPagination"))
        };
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(Template.__dynamic);
        });
      }), "\n        " ];
    }, function() {
      return [ "\n            ", HTML.UL({
        "class": "pagination"
      }, "\n                ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("page"));
      }, function() {
        return [ "\n                    ", HTML.LI({
          "class": function() {
            return [ "page ", Spacebars.mustache(view.lookup("pageClasses"), view.lookup(".")) ];
          }
        }, "\n                        ", Blaze.View("lookup:content", function() {
          return Spacebars.mustache(view.lookup("content"));
        }), "\n                    "), "\n                " ];
      }), "\n            "), "\n        " ];
    }), "\n    " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pagination.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/pagination/pagination.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * The PaginationComponent lets you paginate through documents.
 *
 * @type {PaginationComponent}
 */
EasySearch.PaginationComponent = class PaginationComponent extends SingleIndexComponent {
  /**
   * Setup component on created.
   */
  onCreated() {
    super.onCreated();
    this.index.getComponentMethods(this.name).paginate(1);
  }
  /**
   * Get pages for displaying the pagination.
   *
   * @returns {Array}
   */


  page() {
    let totalCount = this.dict.get('count'),
        pageCount = this.dict.get('limit'),
        currentPage = this.dict.get('currentPage'),
        maxPages = this.options.maxPages,
        prevAndNext = this.options.prevAndNext;

    if (!pageCount || !totalCount) {
      return [];
    }

    return this.options.transformPages(EasySearch._getPagesForPagination({
      totalCount,
      pageCount,
      currentPage,
      maxPages,
      prevAndNext
    }));
  }

  customRenderPagination() {
    return this.getData().customRenderPagination;
  }
  /**
   * Paginate documents.
   */


  paginate(page) {
    check(page, Number);
    this.index.getComponentMethods(this.name).paginate(page);
  }
  /**
   * Return page classes.
   *
   * @param {Object} data Data for the current page
   *
   * @returns {String}
   */


  pageClasses(data) {
    return "".concat(data.disabled ? 'disabled' : '', " ").concat(data.current ? 'current' : '').trim();
  }
  /**
   * Return true if there are more documents to load.
   *
   * @returns {Boolean}
   */


  moreDocuments() {
    return this.index.getComponentMethods(this.name).hasMoreDocuments();
  }
  /**
   * Event map.
   *
   * @returns {Object}
   */


  events() {
    return [{
      'click .page:not(.disabled)': function (e) {
        let currentPage = this.currentData().page;
        this.dict.set('currentPage', currentPage);
        this.paginate(currentPage);
        e.preventDefault();
      }
    }];
  }
  /**
   * Return the default options.
   *
   * @returns {Object}
   */


  get defaultOptions() {
    return {
      prevAndNext: true,
      maxPages: null,
      transformPages: pages => pages
    };
  }

};
EasySearch.PaginationComponent.register('EasySearch.Pagination');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/easysearch_components/lib/main.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  Index: () => Index,
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
const {
  Index,
  SingleIndexComponent,
  BaseComponent,
  FieldInputComponent,
  EachComponent,
  IfInputEmptyComponent,
  IfNoResultsComponent,
  IfSearchingComponent,
  InputComponent,
  LoadMoreComponent,
  PaginationComponent
} = EasySearch;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".html"
  ]
});
require("/node_modules/meteor/easysearch:components/lib/base.js");
require("/node_modules/meteor/easysearch:components/lib/single-index.js");
require("/node_modules/meteor/easysearch:components/lib/component-methods.js");
require("/node_modules/meteor/easysearch:components/lib/core.js");
require("/node_modules/meteor/easysearch:components/lib/input/template.input.js");
require("/node_modules/meteor/easysearch:components/lib/input/input.js");
require("/node_modules/meteor/easysearch:components/lib/field-input/template.field-input.js");
require("/node_modules/meteor/easysearch:components/lib/field-input/field-input.js");
require("/node_modules/meteor/easysearch:components/lib/each/template.each.js");
require("/node_modules/meteor/easysearch:components/lib/each/each.js");
require("/node_modules/meteor/easysearch:components/lib/if-input-empty/template.if-input-empty.js");
require("/node_modules/meteor/easysearch:components/lib/if-input-empty/if-input-empty.js");
require("/node_modules/meteor/easysearch:components/lib/if-no-results/template.if-no-results.js");
require("/node_modules/meteor/easysearch:components/lib/if-no-results/if-no-results.js");
require("/node_modules/meteor/easysearch:components/lib/if-searching/template.if-searching.js");
require("/node_modules/meteor/easysearch:components/lib/if-searching/if-searching.js");
require("/node_modules/meteor/easysearch:components/lib/load-more/template.load-more.js");
require("/node_modules/meteor/easysearch:components/lib/load-more/load-more.js");
require("/node_modules/meteor/easysearch:components/lib/pagination/template.pagination.js");
require("/node_modules/meteor/easysearch:components/lib/pagination/pagination.js");
var exports = require("/node_modules/meteor/easysearch:components/lib/main.js");

/* Exports */
Package._define("easysearch:components", exports, {
  EasySearch: EasySearch
});

})();
