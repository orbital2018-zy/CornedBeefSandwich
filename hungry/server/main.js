import { Meteor } from 'meteor/meteor';
import { Ingredients } from '../imports/functions/ShoppingList.js';
import { Recipes } from '../imports/collections/recipes.js';

import '../imports/collections/recipes.js'
import '../imports/functions/ShoppingList.js';

Meteor.publish(null, function() {
  return Ingredients.find();
});

Meteor.publish('recipes', function() {
  return Recipes.find();
});

Meteor.startup(function() {
});