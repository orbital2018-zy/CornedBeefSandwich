import { Recipes } from '../collections/recipes.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './DisplaySearch.html';
import './Results.html';

Template.DisplaySearch.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('recipes');
    })
});

Template.DisplaySearch.helpers({
    ShowRecipes() {
        var ingred = FlowRouter.getQueryParam("ingred");

        ingred = ingred.split(',');

        for (i = 0; i < ingred.length; i++) {
            return Recipes.find({'ingredients.name': ingred[i]});
        }
    },
});

Template.FestiveSearch.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('recipes');
    })
});

Template.FestiveSearch.helpers({
    recipes() {
        var id = FlowRouter.getParam('id');
        return Recipes.find({festive: id});
    },
});