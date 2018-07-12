import { Mongo } from 'metoer/mongo';
import { SimpleSchema } from 'simple-schema';


export const Rceipes = new Mongo.Collection("recipes");

Ingredient = new SimpleSchema({
    name: {
        type: String
    },
    amout: {
        type: String
    }
});

Recipes.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    desc: {
        type: String,
        label: "Description"
    }
}))