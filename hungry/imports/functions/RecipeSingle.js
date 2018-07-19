import { Recipes } from '../collections/recipes.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';


import './RecipeSingle.html';

Template.RecipeSingle.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('recipes');
    })
});

Template.RecipeSingle.helpers({
    recipes() {
        var id = FlowRouter.getParam('id');
        return Recipes.findOne({_id: id});
    }
});