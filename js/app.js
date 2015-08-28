var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var TestView = Marionette.ItemView.extend({
	el: 'body',
	template: '#test-template'
});

var Controller = Marionette.Controller.extend({
	initialize: function () {
		console.log('TestRouter controller initialize');
	},
    test: function (x, y, level) {
    	var view = new TestView().render();
		console.log('Now we are routing!');        
    }
});

var TestRouter = Marionette.AppRouter.extend({
    initialize: function () {
        console.log('TestRouter initialize');
    },
    controller: new Controller(),
    appRoutes: {
    	'': 'test',
        'test(/)': 'test',
        'test/:x': 'test'
    }
});

var App = new Marionette.Application();

App.on('start', function () {
	this.router = new TestRouter();

    if (Backbone.history) {
        Backbone.history.start();
        console.log('Backbone.history started');
    }
});

App.start();
