var require = meteorInstall({"imports":{"functions":{"DisplaySearch.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/DisplaySearch.html                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.watch(require("./template.DisplaySearch.js"), {
  "*": module.makeNsSetter(true)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.DisplaySearch.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/template.DisplaySearch.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("DisplaySearch");
Template["DisplaySearch"] = new Template("Template.DisplaySearch", (function() {
  var view = this;
  return [ HTML.Raw("<h2>Here are your search results:</h2>\n    "), HTML.SECTION({
    class: "output"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(view.templateInstance().subscriptionsReady());
  }, function() {
    return [ "\n            ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("recipes"));
    }, function() {
      return [ "\n                ", Spacebars.include(view.lookupTemplate("Result")), "\n            " ];
    }), "\n            ", HTML.H4({
      style: "padding: 20px;"
    }, "End of your search"), "\n        " ];
  }, function() {
    return [ "\n            ", HTML.H4("Loading your search results..."), "\n        " ];
  }), "\n    ") ];
}));

Template.__checkName("FestiveSearch");
Template["FestiveSearch"] = new Template("Template.FestiveSearch", (function() {
  var view = this;
  return [ HTML.Raw("<h2>Here are your search results:</h2>\n        "), HTML.SECTION({
    class: "output"
  }, "\n            ", Blaze.If(function() {
    return Spacebars.call(view.templateInstance().subscriptionsReady());
  }, function() {
    return [ "\n                ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("recipes"));
    }, function() {
      return [ "\n                    ", Spacebars.include(view.lookupTemplate("Results")), "\n                " ];
    }), "\n                ", HTML.H4({
      style: "padding: 20px;"
    }, "End of your search"), "\n            " ];
  }, function() {
    return [ "\n                ", HTML.H4("Loading your search results..."), "\n            " ];
  }), "\n        ") ];
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Festive.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/Festive.html                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.watch(require("./template.Festive.js"), {
  "*": module.makeNsSetter(true)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.Festive.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/template.Festive.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("Festive");
Template["Festive"] = new Template("Template.Festive", (function() {
  var view = this;
  return HTML.Raw('<h2>Select the recipe you are preparing to cook for:</h2>\n    <br>\n    <div class="festives">\n        <ul>\n            <li><a href="/festive/chinese-new-year">Chinese New Year</a></li>\n            <li><a href="/festive/vesak-day">Vesak Day</a></li>\n            <li><a href="/festive/hari-raya-puasa">Hari Raya Puasa</a></li>\n            <li><a href="/festive/deepavali">Deepavali</a></li>\n            <li><a href="/festive/christmas">Christmas</a></li>\n            <li><a href="/festive/mid-autumn-festival">Mid Autumn Festival</a></li>\n        </ul>\n    </div>');
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"InsertRecipe.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/InsertRecipe.html                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.watch(require("./template.InsertRecipe.js"), {
  "*": module.makeNsSetter(true)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.InsertRecipe.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/template.InsertRecipe.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("InputRecipe");
Template["InputRecipe"] = new Template("Template.InputRecipe", (function() {
  var view = this;
  return HTML.DIV({
    class: "new-recipe-container"
  }, HTML.Raw("\n        <h2>Suggest New Recipe</h2>\n        <br>\n        "), Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call("Recipes"),
      id: Spacebars.call("insertRecipeForm"),
      type: Spacebars.call("insert"),
      resetOnSuccess: Spacebars.call(true)
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("quickForm"));
  }), "\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"RecipeSingle.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/RecipeSingle.html                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.watch(require("./template.RecipeSingle.js"), {
  "*": module.makeNsSetter(true)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.RecipeSingle.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/template.RecipeSingle.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("RecipeSingle");
Template["RecipeSingle"] = new Template("Template.RecipeSingle", (function() {
  var view = this;
  return [ HTML.H1(Blaze.View("lookup:recipe.name", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("recipe"), "name"));
  })), "\n        ", HTML.P("Difficulty: ", Blaze.View("lookup:recipe.difficulty", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("recipe"), "difficulty"));
  })), "\n        ", HTML.P("Duration: ", Blaze.View("lookup:recipe.duration", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("recipe"), "duration"));
  })), "\n        ", HTML.P("Created on: ", Blaze.View("lookup:recipe.createdOn", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("recipe"), "createdOn"));
  })), "\n        ", HTML.P("\n            ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("recipe"), "ingredients"));
  }, function() {
    return [ "\n                ", HTML.LI(Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    }), " - ", Blaze.View("lookup:amount", function() {
      return Spacebars.mustache(view.lookup("amount"));
    })), "\n            " ];
  }), "\n        "), "\n        ", HTML.P(Blaze.View("lookup:recipe.instructions", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("recipe"), "instructions"));
  }), " "), "\n        ", HTML.P("Festive tag: ", Blaze.View("lookup:recipe.festive", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("recipe"), "festive"));
  })), "\n        ", HTML.P("Dietary tags: \n            ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("recipe"), "dietary"));
  }, function() {
    return [ "\n                ", HTML.SPAN(Blaze.View("lookup:dietary", function() {
      return Spacebars.mustache(view.lookup("dietary"));
    })), "\n            " ];
  }), "\n        ") ];
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Results.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/Results.html                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.watch(require("./template.Results.js"), {
  "*": module.makeNsSetter(true)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.Results.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/template.Results.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("Results");
Template["Results"] = new Template("Template.Results", (function() {
  var view = this;
  return HTML.ARTICLE({
    class: "results"
  }, "\n        ", HTML.H3(HTML.A({
    href: function() {
      return [ "/result/", Spacebars.mustache(view.lookup("_id")) ];
    }
  }, Blaze.View("lookup:name", function() {
    return Spacebars.mustache(view.lookup("name"));
  }))), "\n        ", HTML.P("Difficult: ", Blaze.View("lookup:difficulty", function() {
    return Spacebars.mustache(view.lookup("difficulty"));
  })), "\n        ", HTML.P("Course of meal: ", Blaze.View("lookup:course", function() {
    return Spacebars.mustache(view.lookup("course"));
  })), "\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SearchIngred.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/SearchIngred.html                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.watch(require("./template.SearchIngred.js"), {
  "*": module.makeNsSetter(true)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.SearchIngred.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/template.SearchIngred.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("SearchIngred");
Template["SearchIngred"] = new Template("Template.SearchIngred", (function() {
  var view = this;
  return HTML.Raw('<form class="search">\n        <p>Separate ingredients with a comma (,).</p>\n        <input type="text" name="ingred" placeholder="insert ingredients">\n        <input type="submit">\n        </form>');
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ShoppingList.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/ShoppingList.html                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.watch(require("./template.ShoppingList.js"), {
  "*": module.makeNsSetter(true)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.ShoppingList.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/template.ShoppingList.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("ShoppingList");
Template["ShoppingList"] = new Template("Template.ShoppingList", (function() {
  var view = this;
  return [ HTML.Raw('<div class="container">\n        <h1>My Shopping List</h1>\n    </div>\n    <form class="new-ingredient">\n        <input type="text" name="text" placeholder="Add you ingredients">\n    </form>\n    '), HTML.DIV({
    style: "padding-bottom : 120px"
  }, "\n        ", HTML.UL("\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("Items"));
  }, function() {
    return [ "\n                ", Spacebars.include(view.lookupTemplate("ingredient")), " \n            " ];
  }), "\n        "), "\n    ") ];
}));

Template.__checkName("ingredient");
Template["ingredient"] = new Template("Template.ingredient", (function() {
  var view = this;
  return HTML.LI({
    class: function() {
      return Blaze.If(function() {
        return Spacebars.call(view.lookup("checked"));
      }, function() {
        return "checked";
      });
    }
  }, HTML.Raw('\n        <button style="background-color : red;" class="delete">&times;</button>\n        <!--<input type="checkbox" checked="{{checked}}" class="toggle-checked" />-->\n        '), HTML.SPAN({
    class: "text"
  }, Blaze.View("lookup:text", function() {
    return Spacebars.mustache(view.lookup("text"));
  })), "\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DisplaySearch.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/DisplaySearch.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Recipes;
module.watch(require("../collections/recipes.js"), {
  Recipes: function (v) {
    Recipes = v;
  }
}, 0);
var Template;
module.watch(require("meteor/templating"), {
  Template: function (v) {
    Template = v;
  }
}, 1);
var FlowRouter;
module.watch(require("meteor/kadira:flow-router"), {
  FlowRouter: function (v) {
    FlowRouter = v;
  }
}, 2);
module.watch(require("./DisplaySearch.html"));
Template.DisplaySearch.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('recipes');
  });
});
Template.DisplaySearch.helpers({
  recipes: function () {
    return Recipes.find({});
  }
});
Template.FestiveSearch.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('recipes');
  });
});
Template.FestiveSearch.helpers({
  recipes: function () {
    var id = FlowRouter.getParam('id');
    return Recipes.find({
      festive: id
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"InsertRecipe.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/InsertRecipe.js                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Recipes;
module.watch(require("../collections/recipes.js"), {
  Recipes: function (v) {
    Recipes = v;
  }
}, 0);
var Template;
module.watch(require("meteor/templating"), {
  Template: function (v) {
    Template = v;
  }
}, 1);
module.watch(require("./InsertRecipe.html"));
Template.InputRecipe.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('recipes');
  });
});
Template.InputRecipe.helpers({
  recipes: function () {
    return Recipes;
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"RecipeSingle.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/RecipeSingle.js                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Recipes;
module.watch(require("../collections/recipes.js"), {
  Recipes: function (v) {
    Recipes = v;
  }
}, 0);
var Template;
module.watch(require("meteor/templating"), {
  Template: function (v) {
    Template = v;
  }
}, 1);
var FlowRouter;
module.watch(require("meteor/kadira:flow-router"), {
  FlowRouter: function (v) {
    FlowRouter = v;
  }
}, 2);
module.watch(require("./RecipeSingle.html"));
Template.RecipeSingle.onCreated(function () {
  var self = this;
  self.autorun(function () {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleRecipe', id);
  });
});
Template.RecipeSingle.helpers({
  recipe: function () {
    var id = FlowRouter.getParam('id');
    return Recipes.findOne({
      _id: id
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ShoppingList.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/functions/ShoppingList.js                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Template;
module.watch(require("meteor/templating"), {
  Template: function (v) {
    Template = v;
  }
}, 0);
var Meteor;
module.watch(require("meteor/meteor"), {
  Meteor: function (v) {
    Meteor = v;
  }
}, 1);
var LocalPersist;
module.watch(require("meteor/jeffm:local-persist"), {
  LocalPersist: function (v) {
    LocalPersist = v;
  }
}, 2);

if (Meteor.isClient) {
  var Ingredients = new Meteor.Collection(null);
  var shoppingCart = new LocalPersist(Ingredients, 'shopping-cart', {
    maxDocuments: 199,
    storageFull: function (col, doc) {
      col.remove({
        _id: doc._id
      });
      alert('Shopping List is full.');
    }
  });
  UI.registerHelper("Items", function () {
    return Ingredients.find();
  });
  Template.ShoppingList.events({
    'submit.new-ingredient': function (event) {
      event.preventDefault();
      var target = event.target;
      var text = target.text.value;
      Ingredients.insert({
        text: text
      });
      target.text.value = '';
    }
  });
  Template.ingredient.events({
    // 'click.toggle-checked'() {
    //     Ingredients.update(this._id, {
    //         $set: { checked: !this.checked },
    //     });
    // }, to include a checkbox
    'click.delete': function () {
      Ingredients.remove(this._id);
      Ingredients.update();
    }
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"layout":{"HomeLayout.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/layout/HomeLayout.html                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.watch(require("./template.HomeLayout.js"), {
  "*": module.makeNsSetter(true)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.HomeLayout.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/layout/template.HomeLayout.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("HomeLayout");
Template["HomeLayout"] = new Template("Template.HomeLayout", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("Header")), HTML.Raw('\n    <main>\n        <div class="billboard" align="center" style="font-size:140%">\n            <h2> Welcome to hungry!</h2>\n        </div>\n    </main>\n    '), HTML.DIV({
    align: "center",
    style: "padding-top: 40px;"
  }, "\n        ", Spacebars.include(view.lookupTemplate("SearchIngred")), "\n    "), HTML.Raw('\n    <div align="center" style="padding : 80px; font-size:180%">\n        <a href="/shopping-list"><i class="">Shopping List</i></a>\n        &nbsp;\n        &nbsp;\n        <a href="/festive"><i class="">Festive Recipes</i></a>\n    </div>\n    '), HTML.FOOTER("\n        ", Spacebars.include(view.lookupTemplate("MoreInfo")), "\n    ") ];
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MainLayout.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/layout/MainLayout.html                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.watch(require("./template.MainLayout.js"), {
  "*": module.makeNsSetter(true)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.MainLayout.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/layout/template.MainLayout.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("MainLayout");
Template["MainLayout"] = new Template("Template.MainLayout", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("Header")), "\n    ", HTML.MAIN({
    class: "main-layout"
  }, "\n        ", Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("main"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }), "\n    "), "\n    ", HTML.FOOTER("\n        ", Spacebars.include(view.lookupTemplate("MoreInfo")), "\n    ") ];
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"partials":{"Header.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/partials/Header.html                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.watch(require("./template.Header.js"), {
  "*": module.makeNsSetter(true)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.Header.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/partials/template.Header.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("Header");
Template["Header"] = new Template("Template.Header", (function() {
  var view = this;
  return HTML.Raw('<div class="container">\n    \t\t<header>\n    \t\t\t<img src="https://image.flaticon.com/icons/png/512/621/621707.png" style="width:120px;height:120px;" alt="chicken logo"><h1 style="display: inline; color:black"><a href="/" style="color:black">Hungry</a></h1>\n    \t\t</header>\n    \t</div>');
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MoreInfo.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/partials/MoreInfo.html                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.watch(require("./template.MoreInfo.js"), {
  "*": module.makeNsSetter(true)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.MoreInfo.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/partials/template.MoreInfo.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("MoreInfo");
Template["MoreInfo"] = new Template("Template.MoreInfo", (function() {
  var view = this;
  return HTML.Raw('<nav class="more-info">\n        <div class="container">\n            <main class="row">\n                <section class="column">\n                    <div align="left" style="display:inline; padding-left:120px; padding-right: 140px; font-size:160%">\n                        <a href="/about-us"><i class="">About Us\n                                    </i></a>\n                    </div>\n                    <div align="center" style="display:inline; padding-left:120px; padding-right: 140px; font-size:160% ">\n                            \n                        <a href="/suggest-new-recipe"><i class="">Suggest New Recipe\n                                    </i></a>             \n                    </div>\n                    <div align="right" style="display:inline; padding-left:120px; padding-right: 140px; font-size:160%">\n                        <a href="/how-to-use"><i class="">How To Use\n                                    </i></a>\n                    </div>\n                </section>               \n            </main>\n        </div>\n    </nav>');
}));

Template.__checkName("AboutUs");
Template["AboutUs"] = new Template("Template.AboutUs", (function() {
  var view = this;
  return HTML.Raw('<h2>About the developers</h2>\n     <p align="left">\n        We are NUS Year 1 students who are participating in Orbital 2018. <br> Our\n        group is called Corned Beef Sandwich, <br>which was inspired by the food was \n        sneaked into outer space. <br>Our aim is to provide our users the accessibility\n        to find food that matches <br> what they are looking for, and also pass our Orbital project.\n    </p>\n    <br>\n\n    <h2>About Hungry?</h2>\n\n    <p align="left">\n        Hungry? is a web application that allows users to search for \n        specific recipes through ingredients. <br> It has easy-to follow\n        instructions that allow even beginners to cook their meals. <br>\n        Besides that, users could search recipes with specific themes,<br>\n        such as Valentine or Halloween to prepare a festive meal for their loved ones.<br>\n        With that, the shopping list notes down the ingredients required to gather<br>\n        which would be convenient when preparing the ingredients.\n    </p>');
}));

Template.__checkName("NewRecipes");
Template["NewRecipes"] = new Template("Template.NewRecipes", (function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("InputRecipe"));
}));

Template.__checkName("HowToUse");
Template["HowToUse"] = new Template("Template.HowToUse", (function() {
  var view = this;
  return HTML.Raw("<h2>To search for recipes</h2>\n    <p>\n    At the homepage for Hungry?, type in the ingredients you have on hand into the search bar. Press search.<br>\n    Hungry? will display the dishes with the specified ingredients. \n    <br>Select the dish you are interested in to view the full recipe.\n    <br><br>\n    </p>\n    <h2>To look for recipes relevant to a festive season</h2>\n    <p>\n    Click on the Festive recipes button on the home page and  select the \n    <br>specific festival you are preparing food for. Then, search for recipes \n    <br>with specific ingredients or you could just leave it blank to show the whole \n    <br>catalogue of dishes.\n    <br><br>\n    </p>\n    <h2>To create your shopping list</h2>\n    <p>\n    Click on the My Shopping List button on the home page. For now, \n    <br>key in the ingredients that you would be interested in buying for your \n    <br>next shopping trip. It can't be save yet, so just keep the browser open, \n    <br>preferable on your phone. We would try to add in the additional functions \n    <br>by milestone 3.<br><br>\n    </p>\n    <h2>To suggest a new recipe</h2>\n    <p>\n    Click on the Suggest new recipes link at the bottom of the home page. \n    <br>Key in the relevant details, such as the dish name and other required fields.<br><br>\n    </p>\n    <h2>To return to the home page from any other page</h2>\n    <p>\n    Simply click the phrase Hungry? in the header of the page.<br><br>\n    </p>");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections":{"recipes.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/collections/recipes.js                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  Recipes: function () {
    return Recipes;
  }
});
var Mongo;
module.watch(require("meteor/mongo"), {
  Mongo: function (v) {
    Mongo = v;
  }
}, 0);
var SimpleSchema;
module.watch(require("simpl-schema"), {
  "default": function (v) {
    SimpleSchema = v;
  }
}, 1);
SimpleSchema.extendOptions(['autoform']);
var Recipes = new Mongo.Collection('recipes');
Recipes.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  difficulty: {
    type: String,
    label: "Difficulty",
    autoform: {
      options: [{
        label: "basic",
        value: 1
      }, {
        label: "easy",
        value: 2
      }, {
        label: "moderate",
        value: 3
      }, {
        label: "intermediate",
        value: 4
      }, {
        label: "hard",
        value: 5
      }]
    }
  },
  course: {
    type: String,
    label: "Course"
  },
  createdOn: {
    type: Date,
    label: "Created On",
    autoValue: function () {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  },
  createdBy: {
    type: String,
    label: "Created By"
  },
  duration: {
    type: String,
    label: "Duration"
  },
  servings: {
    type: String,
    label: "Servings"
  },
  ingredients: {
    type: Array,
    label: "Ingredients",
    minCount: 1
  },
  'ingredients.$': {
    type: Object
  },
  'ingredients.$.name': {
    type: String
  },
  'ingredients.$.amount': {
    type: String
  },
  festive: {
    type: String,
    label: "Festive Tags",
    autoform: {
      options: [{
        label: "None",
        value: "none"
      }, {
        label: "Chinese New Year",
        value: "chinese-new-year"
      }, {
        label: "Vesak Day",
        value: "vesak-day"
      }, {
        label: "Hari Raya Puasa",
        value: "hari-raya-puasa"
      }, {
        label: "Deepavali",
        value: "deepavali"
      }, {
        label: "Christmas",
        value: "christmas"
      }, {
        label: "Mid-autumn festival",
        value: "mid-autumn-festival"
      }]
    }
  },
  instructions: {
    type: String,
    label: "Instructions",
    autoform: {
      type: 'textarea',
      rows: 5,
      cols: 90
    }
  },
  dietary: {
    type: Array,
    label: "Dietary Tags"
  },
  'dietary.$': {
    type: String
  }
}));
Recipes.allow({
  insert: function () {
    return true;
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"lib":{"routes.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/routes.js                                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var FlowRouter;
module.watch(require("meteor/kadira:flow-router"), {
  FlowRouter: function (v) {
    FlowRouter = v;
  }
}, 0);
var BlazeLayout;
module.watch(require("meteor/kadira:blaze-layout"), {
  BlazeLayout: function (v) {
    BlazeLayout = v;
  }
}, 1);
module.watch(require("../imports/layout/MainLayout.html"));
module.watch(require("../imports/layout/HomeLayout.html"));
module.watch(require("../imports/partials/Header.html"));
module.watch(require("../imports/partials/MoreInfo.html"));
module.watch(require("../imports/functions/SearchIngred.html"));
module.watch(require("../imports/functions/ShoppingList.html"));
module.watch(require("../imports/functions/InsertRecipe.html"));
module.watch(require("../imports/functions/DisplaySearch.html"));
module.watch(require("../imports/functions/Results.html"));
module.watch(require("../imports/functions/RecipeSingle.html"));
module.watch(require("../imports/functions/Festive.html"));
FlowRouter.route('/', {
  name: 'home',
  action: function () {
    BlazeLayout.render('HomeLayout');
  }
});
FlowRouter.route('/how-to-use', {
  name: 'how-to-use',
  action: function () {
    BlazeLayout.render('MainLayout', {
      main: 'HowToUse'
    });
  }
});
FlowRouter.route('/about-us', {
  name: 'about-us',
  action: function () {
    BlazeLayout.render('MainLayout', {
      main: 'AboutUs'
    });
  }
});
FlowRouter.route('/suggest-new-recipe', {
  name: 'suggest-new-recipe',
  action: function () {
    BlazeLayout.render('MainLayout', {
      main: 'NewRecipes'
    });
  }
});
FlowRouter.route('/shopping-list', {
  name: 'shopping-list',
  action: function () {
    BlazeLayout.render('MainLayout', {
      main: 'ShoppingList'
    });
  }
});
FlowRouter.route('/search', {
  name: 'search',
  action: function () {
    BlazeLayout.render('MainLayout', {
      main: 'DisplaySearch'
    });
  }
});
FlowRouter.route('/result/:id', {
  name: 'recipe',
  action: function () {
    BlazeLayout.render('MainLayout', {
      main: 'RecipeSingle'
    });
  }
});
FlowRouter.route('/festive', {
  name: 'festive',
  action: function () {
    BlazeLayout.render('MainLayout', {
      main: 'Festive'
    });
  }
});
FlowRouter.route('/festive/:id', {
  name: 'festive-recipes',
  action: function () {
    BlazeLayout.render('MainLayout', {
      main: 'FestiveSearch'
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"client":{"main.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/main.js                                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Recipes;
module.watch(require("../imports/collections/recipes.js"), {
  Recipes: function (v) {
    Recipes = v;
  }
}, 0);
module.watch(require("../lib/routes.js"));
module.watch(require("../imports/collections/recipes.js"));
module.watch(require("../imports/functions/ShoppingList.js"));
module.watch(require("../imports/functions/InsertRecipe.js"));
module.watch(require("../imports/functions/DisplaySearch.js"));
module.watch(require("../imports/functions/RecipeSingle.js"));
window.Recipes = Recipes;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css"
  ]
});
var exports = require("/client/main.js");