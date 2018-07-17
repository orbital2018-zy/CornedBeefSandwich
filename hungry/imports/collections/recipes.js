import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

const Recipes = new Mongo.Collection('recipes');

const recipeSchema = new SimpleSchema({    
    name: {
        type: String,
        label: "Name",
    },
    desc: {
        type: String,
        label: "Description",
    },
    createdOn: {
        type: Date,
        label: "Created On",
        autoValue: function() { return new Date()
        }
    },
    createdBy: {
        type: String,
        label: "Created By",
    },
    ingredients: {
        type: Array,
        label: "Ingredients",
        minCount: 1,
    },
    'ingredients.$': {
        type: Object,
    },
    'ingredients.$.name': {
        type: String,
    },
    'ingredients.$.amount': {
        type: String,
    },
    festive: {
        type: String,
        label: "Festive Tags"
    },
    instructions: {
        type: String,
        label: "Instructions",
    },
});


Recipes.attachSchema(recipeSchema);

Recipes.allow({
    insert: function () {
        return true;
      },
});

export default Recipes