import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Recipes } from '../collections/recipes.js';

import './SearchIngred.html';

if (Meteor.isClient) {
    Template.SearchIngred.events({
        'submit.search'(event) {
            event.preventDefault();

            const target = event.target;
            const string = target.ingred.value;
            var ingred = string.split(",");
        },
    });
}