define([
    'jquery',
    'jquery/ui',
    'jquery/validate',
    'mage/translate',
    'domReady!'
],
    function ($) {
        'use strict';
        /* $(document).ready(function () {       */
        var emailInput = '.input-emailjq';
        $(emailInput).change(function () {
            var inputvalues = $(this).val();
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!regex.test(inputvalues)) {
                $(".msg").text($.mage.__('Please insert a valid email address. Try to use ').css({ "color": '#E02B27', "font-size": "1.2rem" }));
                /* alert("invalid email id");    */
                return regex.test(inputvalues);
            }
        });
    });
return function () {
    $.validator.addMethod("customvalidation", function (value, element) {
        return (value.length >= 10 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value));
    }, $.mage.__('Minimum 10 characters with at least one Caps letter , one Special characters '));
}
/* }); */