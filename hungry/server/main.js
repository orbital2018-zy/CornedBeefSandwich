import { Meteor } from 'meteor/meteor';
import { Ingredients } from '../imports/functions/IngredientsList.js';

import '../imports/functions/IngredientsList.js';

Meteor.publish('ingredients', function() {
  return Ingredients.find();
});

Meteor.startup(function() {
  Ingredients.allow({
    insert: function() {return true;},
    update: function() {return true;},
    });
});