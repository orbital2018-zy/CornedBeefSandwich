import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Recipes } from '../collections/recipes.js';
import { Meteor } from 'meteor/meteor';

import './SearchIngred.html';
if (Meteor.isClient) {

Template.SearchIngred.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('recipes');
    })
});

Template.SearchIngred.events({
    'submit.search'(event) {
        event.preventDefault();

    },
});

UI.registerHelper("ingredrecipes", function () {
    return Recipes.find();
});
}