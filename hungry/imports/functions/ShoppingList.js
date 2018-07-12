import { Template } from 'meteor/templating';
import { Ingredients } from './IngredientsList.js';

import './ShoppingList.html';

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
});

