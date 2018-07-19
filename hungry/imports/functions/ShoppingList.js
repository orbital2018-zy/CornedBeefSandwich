import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { LocalPersist } from 'meteor/jeffm:local-persist';

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
        // 'click.toggle-checked'() {
        //     Ingredients.update(this._id, {
        //         $set: { checked: !this.checked },
        //     });
        // }, to include a checkbox
    
        'click.delete'() {
            Ingredients.remove(this._id);
            Ingredients.update();
        },
    });
}
