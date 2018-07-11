import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../client/layout/MainLayout.html';
import '../client/layout/HomeLayout.html';
import '../client/partials/Header.html';
import '../client/partials/MoreInfo.html';
import '../client/functions/SearchIngred.html';

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

FlowRouter.route('/Suggest-new-recipe', {
    name: 'suggest-new-recipe',
    action() {
        BlazeLayout.render('MainLayout', {main: 'SuggestNewRecipe'});
    }
});
