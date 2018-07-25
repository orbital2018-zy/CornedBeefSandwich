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
        label: "Course(Eg: mains, sides, snacks, dessert, drinks, etc.)",
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
    duration: {
        type: String,
        label: "Duration",
    },
    servings: {
        type: String,
        label: "Servings",
    },
    ingredients: {
        type: Array,
        label: "Ingredients(Do not include condiments)",
        minCount: 1,
    },
    'ingredients.$': {
        type: Object,
    },
    'ingredients.$.name': {
        type: String,
        autoValue: function(){
            if(this.isSet && typeof this.value === "string")
                return this.value.toLowerCase();
        }
    },
    'ingredients.$.amount': {
        type: String,
    },
    festive: {
        type: String,
        label: "Festive Tags",
        autoform : {
            options: [
                {
                    label: "None",
                    value: "none",
                },
                {
                    label: "Chinese New Year",
                    value: "chinese-new-year",
                },
                {
                    label: "Vesak Day",
                    value: "vesak-day",
                },
                {
                    label: "Hari Raya Puasa",
                    value: "hari-raya-puasa",
                },
                {
                    label: "Deepavali",
                    value: "deepavali",
                },
                {
                    label: "Christmas",
                    value: "christmas",
                },
                {
                    label: "Mid-autumn festival",
                    value: "mid-autumn-festival",
                },
            ]
        }
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
        label: "Dietary Tags(If there are no tags, just enter 'none')",
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
