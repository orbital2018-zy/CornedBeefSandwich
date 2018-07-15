import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);


export const Rceipes = new Mongo.Collection("recipes");

Recipes.attachSchema(new SimpleSchema({
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
        autoValue: function() { return new Date}
    },
    createdBy: {
        type: String,
        label: "CreatedBy",
    },
    ingredients: {
        type: Array,
        label: "Ingredients",
        minCount: 1,
    },
    'ingredients.$': Object,
    'ingredients.$.name': String,
    'ingredients.$.amount': String,
    instructions: {
        type: String,
        label: "Instructions",
    },
}));