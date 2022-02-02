define(['jquery', 'uiComponent', 'ko'], function ($, Component, ko) {
    'use strict';
    return Component.extend({
    defaults: {
    template: 'Tychons_AddToCart/knockout-example'
    },
    initialize: function () {
    this._super();
    }
    });
    }
    );