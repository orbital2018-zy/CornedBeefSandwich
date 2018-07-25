var require = meteorInstall({"imports":{"collections":{"recipes.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// imports/collections/recipes.js                                                        //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
module.export({
  Recipes: () => Recipes
});
let Mongo;
module.watch(require("meteor/mongo"), {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
let SimpleSchema;
module.watch(require("simpl-schema"), {
  default(v) {
    SimpleSchema = v;
  }

}, 1);
SimpleSchema.extendOptions(['autoform']);
const Recipes = new Mongo.Collection('recipes');
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
    label: "Course(Eg: mains, sides, snacks, dessert, drinks, etc.)"
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
    label: "Ingredients(Do not include condiments)",
    minCount: 1
  },
  'ingredients.$': {
    type: Object
  },
  'ingredients.$.name': {
    type: String,
    autoValue: function () {
      if (this.isSet && typeof this.value === "string") return this.value.toLowerCase();
    }
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
    label: "Dietary Tags(If there are no tags, just enter 'none')"
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
///////////////////////////////////////////////////////////////////////////////////////////

}},"functions":{"ShoppingList.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// imports/functions/ShoppingList.js                                                     //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
let Template;
module.watch(require("meteor/templating"), {
  Template(v) {
    Template = v;
  }

}, 0);
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let LocalPersist;
module.watch(require("meteor/jeffm:local-persist"), {
  LocalPersist(v) {
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
    'submit.new-ingredient'(event) {
      event.preventDefault();
      const target = event.target;
      const text = target.text.value;
      Ingredients.insert({
        text
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
    'click.delete'() {
      Ingredients.remove(this._id);
      Ingredients.update();
    }

  });
}
///////////////////////////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// server/main.js                                                                        //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Recipes;
module.watch(require("../imports/collections/recipes.js"), {
  Recipes(v) {
    Recipes = v;
  }

}, 1);
module.watch(require("../imports/collections/recipes.js"));
module.watch(require("../imports/functions/ShoppingList.js"));
Meteor.startup(function () {});
Meteor.publish('recipes', function () {
  return Recipes.find();
});
Meteor.publish('singleRecipe', function (id) {
  return Recipes.find({
    _id: id
  });
});
///////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9jb2xsZWN0aW9ucy9yZWNpcGVzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2Z1bmN0aW9ucy9TaG9wcGluZ0xpc3QuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tYWluLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydCIsIlJlY2lwZXMiLCJNb25nbyIsIndhdGNoIiwicmVxdWlyZSIsInYiLCJTaW1wbGVTY2hlbWEiLCJkZWZhdWx0IiwiZXh0ZW5kT3B0aW9ucyIsIkNvbGxlY3Rpb24iLCJhdHRhY2hTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsImxhYmVsIiwiZGlmZmljdWx0eSIsImF1dG9mb3JtIiwib3B0aW9ucyIsInZhbHVlIiwiY291cnNlIiwiY3JlYXRlZE9uIiwiRGF0ZSIsImF1dG9WYWx1ZSIsImNyZWF0ZWRCeSIsImR1cmF0aW9uIiwic2VydmluZ3MiLCJpbmdyZWRpZW50cyIsIkFycmF5IiwibWluQ291bnQiLCJPYmplY3QiLCJpc1NldCIsInRvTG93ZXJDYXNlIiwiZmVzdGl2ZSIsImluc3RydWN0aW9ucyIsInJvd3MiLCJjb2xzIiwiZGlldGFyeSIsImFsbG93IiwiaW5zZXJ0IiwiVGVtcGxhdGUiLCJNZXRlb3IiLCJMb2NhbFBlcnNpc3QiLCJpc0NsaWVudCIsIkluZ3JlZGllbnRzIiwic2hvcHBpbmdDYXJ0IiwibWF4RG9jdW1lbnRzIiwic3RvcmFnZUZ1bGwiLCJjb2wiLCJkb2MiLCJyZW1vdmUiLCJfaWQiLCJhbGVydCIsIlVJIiwicmVnaXN0ZXJIZWxwZXIiLCJmaW5kIiwiU2hvcHBpbmdMaXN0IiwiZXZlbnRzIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsInRleHQiLCJpbmdyZWRpZW50IiwidXBkYXRlIiwic3RhcnR1cCIsInB1Ymxpc2giLCJpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsT0FBT0MsTUFBUCxDQUFjO0FB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LENBQWFDLFFBQVEsbUNBQVIsQ0FBYjtBQUEyREwsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLHNDQUFSLENBQWI7QUFNdE9vQyxPQUFPdUIsT0FBUCxDQUFlLFlBQVcsQ0FDekIsQ0FERDtBQUdBdkIsT0FBT3dCLE9BQVAsQ0FBZSxTQUFmLEVBQTBCLFlBQVc7QUFDbkMsU0FBTy9ELFFBQVFxRCxJQUFSLEVBQVA7QUFDRCxDQUZEO0FBSUFkLE9BQU93QixPQUFQLENBQWUsY0FBZixFQUErQixVQUFTQyxFQUFULEVBQWE7QUFDMUMsU0FBT2hFLFFBQVFxRCxJQUFSLENBQWE7QUFBQ0osU0FBS2U7QUFBTixHQUFiLENBQVA7QUFDRCxDQUZELEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJztcclxuaW1wb3J0IFNpbXBsZVNjaGVtYSBmcm9tICdzaW1wbC1zY2hlbWEnO1xyXG5TaW1wbGVTY2hlbWEuZXh0ZW5kT3B0aW9ucyhbJ2F1dG9mb3JtJ10pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFJlY2lwZXMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigncmVjaXBlcycpO1xyXG5cclxuUmVjaXBlcy5hdHRhY2hTY2hlbWEobmV3IFNpbXBsZVNjaGVtYSh7ICAgIFxyXG4gICAgbmFtZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBsYWJlbDogXCJOYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgZGlmZmljdWx0eToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBsYWJlbDogXCJEaWZmaWN1bHR5XCIsXHJcbiAgICAgICAgYXV0b2Zvcm0gOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJiYXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJlYXN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIm1vZGVyYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDMsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImludGVybWVkaWF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA0LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJoYXJkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvdXJzZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBsYWJlbDogXCJDb3Vyc2UoRWc6IG1haW5zLCBzaWRlcywgc25hY2tzLCBkZXNzZXJ0LCBkcmlua3MsIGV0Yy4pXCIsXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlZE9uOiB7XHJcbiAgICAgICAgdHlwZTogRGF0ZSxcclxuICAgICAgICBsYWJlbDogXCJDcmVhdGVkIE9uXCIsXHJcbiAgICAgICAgYXV0b1ZhbHVlOiBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBEYXRlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdXRvZm9ybToge1xyXG4gICAgICAgICAgICB0eXBlOiBcImhpZGRlblwiLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlZEJ5OiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGxhYmVsOiBcIkNyZWF0ZWQgQnlcIixcclxuICAgIH0sXHJcbiAgICBkdXJhdGlvbjoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBsYWJlbDogXCJEdXJhdGlvblwiLFxyXG4gICAgfSxcclxuICAgIHNlcnZpbmdzOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGxhYmVsOiBcIlNlcnZpbmdzXCIsXHJcbiAgICB9LFxyXG4gICAgaW5ncmVkaWVudHM6IHtcclxuICAgICAgICB0eXBlOiBBcnJheSxcclxuICAgICAgICBsYWJlbDogXCJJbmdyZWRpZW50cyhEbyBub3QgaW5jbHVkZSBjb25kaW1lbnRzKVwiLFxyXG4gICAgICAgIG1pbkNvdW50OiAxLFxyXG4gICAgfSxcclxuICAgICdpbmdyZWRpZW50cy4kJzoge1xyXG4gICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgIH0sXHJcbiAgICAnaW5ncmVkaWVudHMuJC5uYW1lJzoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBhdXRvVmFsdWU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNTZXQgJiYgdHlwZW9mIHRoaXMudmFsdWUgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAnaW5ncmVkaWVudHMuJC5hbW91bnQnOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgfSxcclxuICAgIGZlc3RpdmU6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFwiRmVzdGl2ZSBUYWdzXCIsXHJcbiAgICAgICAgYXV0b2Zvcm0gOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDaGluZXNlIE5ldyBZZWFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiY2hpbmVzZS1uZXcteWVhclwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJWZXNhayBEYXlcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ2ZXNhay1kYXlcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSGFyaSBSYXlhIFB1YXNhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiaGFyaS1yYXlhLXB1YXNhXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRlZXBhdmFsaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImRlZXBhdmFsaVwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDaHJpc3RtYXNcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJjaHJpc3RtYXNcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTWlkLWF1dHVtbiBmZXN0aXZhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIm1pZC1hdXR1bW4tZmVzdGl2YWxcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5zdHJ1Y3Rpb25zOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGxhYmVsOiBcIkluc3RydWN0aW9uc1wiLFxyXG4gICAgICAgIGF1dG9mb3JtOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0YXJlYScsXHJcbiAgICAgICAgICAgIHJvd3M6IDUsXHJcbiAgICAgICAgICAgIGNvbHM6IDkwLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgZGlldGFyeToge1xyXG4gICAgICAgIHR5cGU6IEFycmF5LFxyXG4gICAgICAgIGxhYmVsOiBcIkRpZXRhcnkgVGFncyhJZiB0aGVyZSBhcmUgbm8gdGFncywganVzdCBlbnRlciAnbm9uZScpXCIsXHJcbiAgICB9LFxyXG4gICAgJ2RpZXRhcnkuJCc6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB9LFxyXG59KSk7XHJcblxyXG5cclxuXHJcblJlY2lwZXMuYWxsb3coe1xyXG4gICAgaW5zZXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ21ldGVvci90ZW1wbGF0aW5nJztcclxuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XHJcbmltcG9ydCB7IExvY2FsUGVyc2lzdCB9IGZyb20gJ21ldGVvci9qZWZmbTpsb2NhbC1wZXJzaXN0JztcclxuXHJcbmlmIChNZXRlb3IuaXNDbGllbnQpIHsgXHJcbiAgICB2YXIgSW5ncmVkaWVudHMgPSBuZXcgTWV0ZW9yLkNvbGxlY3Rpb24obnVsbCk7XHJcblxyXG4gICAgdmFyIHNob3BwaW5nQ2FydCA9IG5ldyBMb2NhbFBlcnNpc3QoSW5ncmVkaWVudHMsICdzaG9wcGluZy1jYXJ0JywgXHJcbiAgICB7XHJcbiAgICAgICAgbWF4RG9jdW1lbnRzOiAxOTksXHJcbiAgICAgICAgc3RvcmFnZUZ1bGw6IGZ1bmN0aW9uIChjb2wsIGRvYykge1xyXG4gICAgICAgICAgICBjb2wucmVtb3ZlKHsgX2lkOiBkb2MuX2lkIH0pO1xyXG4gICAgICAgICAgICBhbGVydCgnU2hvcHBpbmcgTGlzdCBpcyBmdWxsLicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIFVJLnJlZ2lzdGVySGVscGVyKFwiSXRlbXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBJbmdyZWRpZW50cy5maW5kKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBUZW1wbGF0ZS5TaG9wcGluZ0xpc3QuZXZlbnRzKHtcclxuICAgICAgICAnc3VibWl0Lm5ldy1pbmdyZWRpZW50JyhldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgY29uc3QgdGV4dCA9IHRhcmdldC50ZXh0LnZhbHVlO1xyXG4gICAgXHJcbiAgICAgICAgICAgIEluZ3JlZGllbnRzLmluc2VydCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICB0YXJnZXQudGV4dC52YWx1ZT0nJztcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgVGVtcGxhdGUuaW5ncmVkaWVudC5ldmVudHMoe1xyXG4gICAgICAgIC8vICdjbGljay50b2dnbGUtY2hlY2tlZCcoKSB7XHJcbiAgICAgICAgLy8gICAgIEluZ3JlZGllbnRzLnVwZGF0ZSh0aGlzLl9pZCwge1xyXG4gICAgICAgIC8vICAgICAgICAgJHNldDogeyBjaGVja2VkOiAhdGhpcy5jaGVja2VkIH0sXHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH0sIHRvIGluY2x1ZGUgYSBjaGVja2JveFxyXG4gICAgXHJcbiAgICAgICAgJ2NsaWNrLmRlbGV0ZScoKSB7XHJcbiAgICAgICAgICAgIEluZ3JlZGllbnRzLnJlbW92ZSh0aGlzLl9pZCk7XHJcbiAgICAgICAgICAgIEluZ3JlZGllbnRzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcclxuaW1wb3J0IHsgUmVjaXBlcyB9IGZyb20gJy4uL2ltcG9ydHMvY29sbGVjdGlvbnMvcmVjaXBlcy5qcyc7XHJcblxyXG5pbXBvcnQgJy4uL2ltcG9ydHMvY29sbGVjdGlvbnMvcmVjaXBlcy5qcydcclxuaW1wb3J0ICcuLi9pbXBvcnRzL2Z1bmN0aW9ucy9TaG9wcGluZ0xpc3QuanMnO1xyXG5cclxuTWV0ZW9yLnN0YXJ0dXAoZnVuY3Rpb24oKSB7XHJcbn0pO1xyXG5cclxuTWV0ZW9yLnB1Ymxpc2goJ3JlY2lwZXMnLCBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gUmVjaXBlcy5maW5kKCk7XHJcbn0pO1xyXG5cclxuTWV0ZW9yLnB1Ymxpc2goJ3NpbmdsZVJlY2lwZScsIGZ1bmN0aW9uKGlkKSB7XHJcbiAgcmV0dXJuIFJlY2lwZXMuZmluZCh7X2lkOiBpZH0pO1xyXG59KTtcclxuIl19
