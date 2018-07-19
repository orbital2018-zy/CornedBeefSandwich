import { Recipes } from '../collections/recipes.js';
import { Template } from 'meteor/templating';

import './InsertRecipe.html';

Template.InputRecipe.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('recipes');
    })
});

Template.InputRecipe.helpers({
    recipes() {
        return Recipes;
    }
});