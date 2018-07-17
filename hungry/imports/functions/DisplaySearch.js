import { Meteor } from 'meteor/meteor';
import { Recipes } from '../collections/recipes.js';

import './DisplaySearch.html';

Meteor.subscribe('ingredients');

Template.DisplaySearch.helpers({
    recipes() {
        return Recipes.find({});
    },
});