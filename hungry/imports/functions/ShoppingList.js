import { Template } from 'meteor/templating';
//import { Ingredients } from './IngredientsList.js';
import { Meteor } from 'meteor/meteor';
import { LocalPersist } from 'meteor/jeffm:local-persist';

//import '../functions/ShoppingList.html';
/*import './IngredientsList.js';

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
});

Template.ingredient.events({
    'click.toggle-checked'() {
        Ingredients.update(this._id, {
            $set: { checked: !this.checked },
        });
    },

    'click.delete'() {
        Ingredients.remove(this._id);
        Ingredients.update();
    },
});
*/
if (Meteor.isClient) {
    var Ingredients = new Meteor.Collection(null);

    var shoppingCart = new LocalPersist(Ingredients, 'shopping-cart', 
    {
        maxDocuments: 199,
        storageFull: function (col, doc) {
            col.remove({ _id: doc._id });
            alert('Shopping List is full.');
        }
    });

    UI.registerHelper("Items", function () {
        return Ingredients.find();
      }); 
}

/*Template.ShoppingList.events({
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

Template.ingredient.events({
    'click.toggle-checked'() {
        Ingredients.update(this._id, {
            $set: { checked: !this.checked },
        });
    },

    'click.delete'() {
        Ingredients.remove(this._id);
        Ingredients.update();
    },
});
*/