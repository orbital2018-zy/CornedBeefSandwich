import { Recipes } from '../collections/recipes.js';

import './InsertRecipe.html';

Template.InsertRecipe.onCreated(function() {
    this.autorun(() => {
        this.subscribe('recipes');
    });
});