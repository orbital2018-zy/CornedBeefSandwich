import { Meteor } from 'meteor/meteor';
import { Recipes } from '../imports/collections/recipes.js';

import '../imports/collections/recipes.js'
import '../imports/functions/ShoppingList.js';

Meteor.startup(function() {
});

Meteor.publish('recipes', function() {
  return Recipes.find();
});

Meteor.publish('singleRecipe', function(id) {
  return Recipes.find({_id: id});
});
