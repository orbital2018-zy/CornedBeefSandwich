import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Recipes = new Mongo.Collection('recipes');

Recipes.attachSchema(new SimpleSchema({    
    name: {
        type: String,
        label: "Name",
    },
    difficulty: {
        type: String,
        label: "Difficulty",
        autoform : {
            options: [
                {
                    label: "basic",
                    value: 1,
                },
                {
                    label: "easy",
                    value: 2,
                },
                {
                    label: "moderate",
                    value: 3,
                },
                {
                    label: "intermediate",
                    value: 4,
                },
                {
                    label: "hard",
                    value: 5,
                },
            ]
        }
    },
    course: {
        type: String,
        label: "Course",
    },
    createdOn: {
        type: Date,
        label: "Created On",
        autoValue: function() { return new Date();
        },
        autoform: {
            type: "hidden",
        },
    },
    createdBy: {
        type: String,
        label: "Created By",
    },
    servings: {
        type: String,
        label: "Servings",
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
        label: "Festive Tags",
        optional: true,
    },
    instructions: {
        type: String,
        label: "Instructions",
        autoform: {
            type: 'textarea',
            rows: 5,
            cols: 90,
        },
    },
    dietary: {
        type: Array,
        label: "Dietary Tags",
    },
    'dietary.$': {
        type: String,
    },
}));



Recipes.allow({
    insert: function () {
        return true;
      },
});
