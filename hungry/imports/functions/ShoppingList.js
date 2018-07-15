import { Template } from 'meteor/templating';
import { Ingredients } from './IngredientsList.js';
import { Meteor } from 'meteor/meteor';

import './ShoppingList.html';
import './IngredientsList.js';

Meteor.subscribe('ingredients');

Template.ShoppingList.helpers({
    ingredients() {
        return Ingredients.find({});
    },
});

Template.ShoppingList.events({
    'submit.new-ingredient'(event) {
        event.preventDefault();

        const target = event.target;
        const text = target.text.value;

        Ingredients.insert({
            text,
        });

        target.text.value='';
    },

    'click .toggle-checked'() {
        Ingredients.update(this._id, {
            $set: { checked: ! this.checked },
        });
    },

    'click .delete'() {
        Ingredients.remove(this.id);
    },
});

