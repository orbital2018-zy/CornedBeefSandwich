import { Recipes } from '../collections/recipes.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';


import './RecipeSingle.html';

Template.RecipeSingle.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('id');
        self.subscribe('singleRecipe', id);
    })
});

Template.RecipeSingle.helpers({
    recipe() {
        var id = FlowRouter.getParam('id');
        return Recipes.findOne({_id: id});
    }
});