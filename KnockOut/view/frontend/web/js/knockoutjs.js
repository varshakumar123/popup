define(['jquery', 'uiComponent', 'ko'], function ($, Component, ko) {
    'use strict';
        
    var self;  var a="all";
    return Component.extend({
        defaults: {
            template: 'Tychons_KnockOut/koe'
            },
          
        knockoutChecker: ko.observable(a),
        initialize: function () {
            self = this;
            this._super();
            //call the incrementTime function to run on intialize
            this.incrementTime();
        },
        //increment knockoutChecker every second
         incrementTime: function() {
            var t = 0;
            setInterval(function() {
                t++;
                self.knockoutChecker(t);
            }, 10000); 
         } 
    });
}
);