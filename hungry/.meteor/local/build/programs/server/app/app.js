var require = meteorInstall({"imports":{"collections":{"recipes.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////
//                                                                    //
// imports/collections/recipes.js                                     //
//                                                                    //
////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////

}},"functions":{"ShoppingList.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////
//                                                                    //
// imports/functions/ShoppingList.js                                  //
//                                                                    //
////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////
//                                                                    //
// server/main.js                                                     //
//                                                                    //
////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9jb2xsZWN0aW9ucy9yZWNpcGVzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2Z1bmN0aW9ucy9TaG9wcGluZ0xpc3QuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tYWluLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydCIsIlJlY2lwZXMiLCJNb25nbyIsIndhdGNoIiwicmVxdWlyZSIsInYiLCJTaW1wbGVTY2hlbWEiLCJkZWZhdWx0IiwiZXh0ZW5kT3B0aW9ucyIsIkNvbGxlY3Rpb24iLCJhdHRhY2hTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsImxhYmVsIiwiZGlmZmljdWx0eSIsImF1dG9mb3JtIiwib3B0aW9ucyIsInZhbHVlIiwiY291cnNlIiwiY3JlYXRlZE9uIiwiRGF0ZSIsImF1dG9WYWx1ZSIsImNyZWF0ZWRCeSIsImR1cmF0aW9uIiwic2VydmluZ3MiLCJpbmdyZWRpZW50cyIsIkFycmF5IiwibWluQ291bnQiLCJPYmplY3QiLCJmZXN0aXZlIiwiaW5zdHJ1Y3Rpb25zIiwicm93cyIsImNvbHMiLCJkaWV0YXJ5IiwiYWxsb3ciLCJpbnNlcnQiLCJUZW1wbGF0ZSIsIk1ldGVvciIsIkxvY2FsUGVyc2lzdCIsImlzQ2xpZW50IiwiSW5ncmVkaWVudHMiLCJzaG9wcGluZ0NhcnQiLCJtYXhEb2N1bWVudHMiLCJzdG9yYWdlRnVsbCIsImNvbCIsImRvYyIsInJlbW92ZSIsIl9pZCIsImFsZXJ0IiwiVUkiLCJyZWdpc3RlckhlbHBlciIsImZpbmQiLCJTaG9wcGluZ0xpc3QiLCJldmVudHMiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwidGV4dCIsImluZ3JlZGllbnQiLCJ1cGRhdGUiLCJzdGFydHVwIiwicHVibGlzaCIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxPQUFPQyxNQUFQLENBQWM7QUFBQ0MsV0FBUSxNQUFJQTtBQUFiLENB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QUFDbkMsU0FBTzdELFFBQVFtRCxJQUFSLEVBQVA7QUFDRCxDQUZEO0FBSUFkLE9BQU93QixPQUFQLENBQWUsY0FBZixFQUErQixVQUFTQyxFQUFULEVBQWE7QUFDMUMsU0FBTzlELFFBQVFtRCxJQUFSLENBQWE7QUFBQ0osU0FBS2U7QUFBTixHQUFiLENBQVA7QUFDRCxDQUZELEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJztcclxuaW1wb3J0IFNpbXBsZVNjaGVtYSBmcm9tICdzaW1wbC1zY2hlbWEnO1xyXG5TaW1wbGVTY2hlbWEuZXh0ZW5kT3B0aW9ucyhbJ2F1dG9mb3JtJ10pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFJlY2lwZXMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigncmVjaXBlcycpO1xyXG5cclxuUmVjaXBlcy5hdHRhY2hTY2hlbWEobmV3IFNpbXBsZVNjaGVtYSh7ICAgIFxyXG4gICAgbmFtZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBsYWJlbDogXCJOYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgZGlmZmljdWx0eToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBsYWJlbDogXCJEaWZmaWN1bHR5XCIsXHJcbiAgICAgICAgYXV0b2Zvcm0gOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJiYXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJlYXN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIm1vZGVyYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDMsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImludGVybWVkaWF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA0LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJoYXJkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvdXJzZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBsYWJlbDogXCJDb3Vyc2VcIixcclxuICAgIH0sXHJcbiAgICBjcmVhdGVkT246IHtcclxuICAgICAgICB0eXBlOiBEYXRlLFxyXG4gICAgICAgIGxhYmVsOiBcIkNyZWF0ZWQgT25cIixcclxuICAgICAgICBhdXRvVmFsdWU6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3IERhdGUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dG9mb3JtOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiaGlkZGVuXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjcmVhdGVkQnk6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFwiQ3JlYXRlZCBCeVwiLFxyXG4gICAgfSxcclxuICAgIGR1cmF0aW9uOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGxhYmVsOiBcIkR1cmF0aW9uXCIsXHJcbiAgICB9LFxyXG4gICAgc2VydmluZ3M6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFwiU2VydmluZ3NcIixcclxuICAgIH0sXHJcbiAgICBpbmdyZWRpZW50czoge1xyXG4gICAgICAgIHR5cGU6IEFycmF5LFxyXG4gICAgICAgIGxhYmVsOiBcIkluZ3JlZGllbnRzXCIsXHJcbiAgICAgICAgbWluQ291bnQ6IDEsXHJcbiAgICB9LFxyXG4gICAgJ2luZ3JlZGllbnRzLiQnOiB7XHJcbiAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgfSxcclxuICAgICdpbmdyZWRpZW50cy4kLm5hbWUnOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgfSxcclxuICAgICdpbmdyZWRpZW50cy4kLmFtb3VudCc6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB9LFxyXG4gICAgZmVzdGl2ZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBsYWJlbDogXCJGZXN0aXZlIFRhZ3NcIixcclxuICAgICAgICBhdXRvZm9ybSA6IHtcclxuICAgICAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNoaW5lc2UgTmV3IFllYXJcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJjaGluZXNlLW5ldy15ZWFyXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZlc2FrIERheVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInZlc2FrLWRheVwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJIYXJpIFJheWEgUHVhc2FcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJoYXJpLXJheWEtcHVhc2FcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRGVlcGF2YWxpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiZGVlcGF2YWxpXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNocmlzdG1hc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImNocmlzdG1hc1wiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJNaWQtYXV0dW1uIGZlc3RpdmFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibWlkLWF1dHVtbi1mZXN0aXZhbFwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpbnN0cnVjdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFwiSW5zdHJ1Y3Rpb25zXCIsXHJcbiAgICAgICAgYXV0b2Zvcm06IHtcclxuICAgICAgICAgICAgdHlwZTogJ3RleHRhcmVhJyxcclxuICAgICAgICAgICAgcm93czogNSxcclxuICAgICAgICAgICAgY29sczogOTAsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBkaWV0YXJ5OiB7XHJcbiAgICAgICAgdHlwZTogQXJyYXksXHJcbiAgICAgICAgbGFiZWw6IFwiRGlldGFyeSBUYWdzXCIsXHJcbiAgICB9LFxyXG4gICAgJ2RpZXRhcnkuJCc6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB9LFxyXG59KSk7XHJcblxyXG5cclxuXHJcblJlY2lwZXMuYWxsb3coe1xyXG4gICAgaW5zZXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ21ldGVvci90ZW1wbGF0aW5nJztcclxuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XHJcbmltcG9ydCB7IExvY2FsUGVyc2lzdCB9IGZyb20gJ21ldGVvci9qZWZmbTpsb2NhbC1wZXJzaXN0JztcclxuXHJcbmlmIChNZXRlb3IuaXNDbGllbnQpIHsgXHJcbiAgICB2YXIgSW5ncmVkaWVudHMgPSBuZXcgTWV0ZW9yLkNvbGxlY3Rpb24obnVsbCk7XHJcblxyXG4gICAgdmFyIHNob3BwaW5nQ2FydCA9IG5ldyBMb2NhbFBlcnNpc3QoSW5ncmVkaWVudHMsICdzaG9wcGluZy1jYXJ0JywgXHJcbiAgICB7XHJcbiAgICAgICAgbWF4RG9jdW1lbnRzOiAxOTksXHJcbiAgICAgICAgc3RvcmFnZUZ1bGw6IGZ1bmN0aW9uIChjb2wsIGRvYykge1xyXG4gICAgICAgICAgICBjb2wucmVtb3ZlKHsgX2lkOiBkb2MuX2lkIH0pO1xyXG4gICAgICAgICAgICBhbGVydCgnU2hvcHBpbmcgTGlzdCBpcyBmdWxsLicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIFVJLnJlZ2lzdGVySGVscGVyKFwiSXRlbXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBJbmdyZWRpZW50cy5maW5kKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBUZW1wbGF0ZS5TaG9wcGluZ0xpc3QuZXZlbnRzKHtcclxuICAgICAgICAnc3VibWl0Lm5ldy1pbmdyZWRpZW50JyhldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgY29uc3QgdGV4dCA9IHRhcmdldC50ZXh0LnZhbHVlO1xyXG4gICAgXHJcbiAgICAgICAgICAgIEluZ3JlZGllbnRzLmluc2VydCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICB0YXJnZXQudGV4dC52YWx1ZT0nJztcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgVGVtcGxhdGUuaW5ncmVkaWVudC5ldmVudHMoe1xyXG4gICAgICAgIC8vICdjbGljay50b2dnbGUtY2hlY2tlZCcoKSB7XHJcbiAgICAgICAgLy8gICAgIEluZ3JlZGllbnRzLnVwZGF0ZSh0aGlzLl9pZCwge1xyXG4gICAgICAgIC8vICAgICAgICAgJHNldDogeyBjaGVja2VkOiAhdGhpcy5jaGVja2VkIH0sXHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH0sIHRvIGluY2x1ZGUgYSBjaGVja2JveFxyXG4gICAgXHJcbiAgICAgICAgJ2NsaWNrLmRlbGV0ZScoKSB7XHJcbiAgICAgICAgICAgIEluZ3JlZGllbnRzLnJlbW92ZSh0aGlzLl9pZCk7XHJcbiAgICAgICAgICAgIEluZ3JlZGllbnRzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcclxuaW1wb3J0IHsgUmVjaXBlcyB9IGZyb20gJy4uL2ltcG9ydHMvY29sbGVjdGlvbnMvcmVjaXBlcy5qcyc7XHJcblxyXG5pbXBvcnQgJy4uL2ltcG9ydHMvY29sbGVjdGlvbnMvcmVjaXBlcy5qcydcclxuaW1wb3J0ICcuLi9pbXBvcnRzL2Z1bmN0aW9ucy9TaG9wcGluZ0xpc3QuanMnO1xyXG5cclxuTWV0ZW9yLnN0YXJ0dXAoZnVuY3Rpb24oKSB7XHJcbn0pO1xyXG5cclxuTWV0ZW9yLnB1Ymxpc2goJ3JlY2lwZXMnLCBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gUmVjaXBlcy5maW5kKCk7XHJcbn0pO1xyXG5cclxuTWV0ZW9yLnB1Ymxpc2goJ3NpbmdsZVJlY2lwZScsIGZ1bmN0aW9uKGlkKSB7XHJcbiAgcmV0dXJuIFJlY2lwZXMuZmluZCh7X2lkOiBpZH0pO1xyXG59KTtcclxuIl19
