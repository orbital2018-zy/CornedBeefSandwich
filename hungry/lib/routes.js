import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../imports/layout/MainLayout.html';
import '../imports/layout/HomeLayout.html';
import '../imports/partials/Header.html';
import '../imports/partials/MoreInfo.html';
import '../imports/functions/SearchIngred.html';
import '../imports/functions/ShoppingList.html';

FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('HomeLayout');
    }
});

FlowRouter.route('/how-to-use', {
    name: 'how-to-use',
    action() {
        BlazeLayout.render('MainLayout', {main: 'HowToUse'});
    }
});

FlowRouter.route('/about-us', {
    name: 'about-us',
    action() {
        BlazeLayout.render('MainLayout', {main: 'AboutUs'});
    }
});

FlowRouter.route('/suggest-new-recipe', {
    name: 'suggest-new-recipe',
    action() {
        BlazeLayout.render('MainLayout', {main: 'SuggestNewRecipe'});
    }
});

FlowRouter.route('/shopping-list', {
    name: 'shopping-list',
    action() {
        BlazeLayout.render('MainLayout', {main: 'ShoppingList'});
    }
});