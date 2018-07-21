import { Recipes } from '../collections/recipes.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './DisplaySearch.html';

Template.DisplaySearch.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('recipes');
    })
});

Template.DisplaySearch.helpers({
    recipes() {
        return Recipes.find({});
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