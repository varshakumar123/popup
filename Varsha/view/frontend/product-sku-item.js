/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'mage/template',
    'text!Magento_QuickOrder/templates/product-info.html',
    'jquery/ui',
    'Magento_QuickOrder/js/quick-order-items'
], function ($, mageTemplate, infoTpl, jqueryui, quickOrderItems) {
    'use strict';
    
    var tabIndex = 1;

    $.widget('mage.productSkuItem', {
        options: {
            urlSku: '',
            rowIndex: null,
            tableWigetSelector: '',
            addSelector: '[data-role="product-block"]',
            skuSelector: '[data-role="product-sku"]',
            qtySelector: '[data-role="product-qty"]',
            formSelector: '[data-role="send-sku"]',
            showError: '[data-role="show-errors"]',
            removeSelector: '[data-role="delete"]',
            submitBtn: '[data-action="submit-sku"]',
            formSKU: '[data-role="send-sku"]',
            dataError: {
                text: null
            }
        },
        
        tabbedSku : false,

        /**
         * This method constructs a new widget.
         *
         * @private
         */
        _create: function () {
            this._bind();
            this.addBlockTmpl = mageTemplate(infoTpl);
            $(this.options.formSelector).trigger('itemRendered', this);
        },

        /**
         * This method binds elements found in this widget.
         *
         * @private
         */
        _bind: function () {

            var handlers = {};
            handlers['change ' + this.options.skuSelector] = '_reloadItem';
            handlers['keydown ' + this.options.skuSelector] = '_arrowItem';
            handlers['keyup ' + this.options.skuSelector] = '_valToUpper';
            handlers['focus ' + this.options.skuSelector] = '_focusRow';
            handlers['change ' + this.options.qtySelector] = '_reloadItem';
            handlers['keydown ' + this.options.qtySelector] = '_arrowItem';
            handlers['focus ' + this.options.qtySelector] = '_focusRow';
            handlers['click ' + this.options.removeSelector] = '_removedItem';
            handlers.addRow = '_addRow';
            this._on(handlers);
        },

        /**
         * Remove old errors and adds new errors.
         *
         * @private
         */
        _reloadError: function () {
            $(this.options.showError).trigger('addErrors', {
                text: this.options.dataError.text
            });

            if (this._isAllRowsEmpty()) {
                $('button.tocart').prop('disabled', true);
            }
        },
        
        /**
         * Remove item from localStorage
         * @private
         */
        _removedItem: function(){
            var skuInput = this.element.find(this.options.skuSelector);
            var sku = skuInput.val();
            quickOrderItems.deleteItem(sku);
            //reload error, was original click handler in above _bind
            this._reloadError();
        },
        
        /**
         * Arrow key navigation to field on next or previous row
         * @private
         */
        _arrowItem: function(e){
            e = e || window.event;
            var $input = $(e.srcElement);
            var $currentItem = $input.parents('.fields');
            var $items = $currentItem.parent().find('.fields').not('.quickorder-header');
            $items.removeClass('highlight');
            if (e.keyCode == '38' || e.keyCode == '40') {
                var $autocomplete = $currentItem.find('.ui-autocomplete');
                //redisplay autocomplete
                if (e.keyCode == '40' && $autocomplete.not(':visible')){
                    var sku = $input.val();
                    if ($autocomplete.length>0 && $autocomplete.find('.ui-menu-item').length>0){
                        $autocomplete.show();
                        return;
                    }
                //navigating inside autocomplete, return
                } else if (e.keyCode == '38' && $autocomplete.is(':visible')){
                    return;
                }
                //select input on next row
                var $item = (e.keyCode == '38') ? $currentItem.prev(':not(.quickorder-header)') : $currentItem.next();
                var index = (e.keyCode == '38') ? $items.length - 1 : 0;
                $item = ($item.length==0 && $items.length>1) ? $($items[index]) : $item;
                if ($item.length>0){
                    $item.addClass('highlight');
                    var focusClass = ($input.parents('.field').hasClass('item-sku')) ? '.item-sku' : '.qty';
                    var $focusInput = $item.find(focusClass+' input');
                    $focusInput.focus();
                    e.preventDefault();
                    e.stopPropagation();
                }
            } else if (e.keyCode == '9' && $input.data('sku') === true){
                //cancel ajax search, they tabbed out of sku input into the qty field to enter a qty
                this.tabbedSku = true;
                return;
            } else if (e.keyCode == '9' && $input.data('qty') === true) {
            	//they tabbed out of qty field, adding a new row will focus on the sku input
                e.preventDefault();
                e.stopPropagation();
            } 
            this.tabbedSku = false;
        },
        
        /**
         * Transform val to uppercase
         * @private
         */
        _valToUpper: function(e){
            var $input = $(e.srcElement);
            var val = $input.val();
            if (val){
                var uppercaseVal = val.toLocaleUpperCase();
                $input.val(uppercaseVal);
            }
        },
        
        /**
         * Remove highlight from other rows and add to current row when focused on
         * @private
         */
        _focusRow: function(e){
            e = e || window.event;
            if (e.keyCode != '38' && e.keyCode != '40') {
                var $input = $(e.srcElement);
                var $currentItem = $input.parents('.fields');
                var $items = $currentItem.parent().find('.fields').not('.quickorder-header').not(this);
                $items.removeClass('highlight');
                $currentItem.addClass('highlight');
            }
        },
        
        /**
         * This method adds new row for table.
         *
         * @param {Object} e
         * @param {Object} data
         * @private
         */
        _addRow: function (e, data) {
            var skuInput = this.element.find(this.options.skuSelector),
                qtyInput = this.element.find(this.options.qtySelector);

            if (!data) {
                //focus on the sku field when new row is added
                var self = this;
                var focusSkuInput = function(){
                    var $currentItem = skuInput.parents('.fields');
                    var $items = $currentItem.parent().find('.fields').not('.quickorder-header').not($currentItem);
                    var $newItem = $items.last();
                    $newItem.find(self.options.skuSelector).get(0).focus();
                };
                this.element.trigger('addNewRow', { callback: focusSkuInput });
                return false;
            }

            if (skuInput.val() == data.sku) { //eslint-disable-line eqeqeq
                data.qty = parseFloat(data.qty);

                if (!data.toRewriteQty) {
                    data.qty = parseFloat(qtyInput.val()) + parseFloat(data.qty);
                }
            }
            skuInput.val(data.sku);
            skuInput.attr('tabindex', tabIndex++);
            qtyInput.val(parseFloat(data.qty));
            qtyInput.attr('tabindex', tabIndex++);
            this._clearProductBlock();
            this._addBlock(data);
        },

        /**
         * Reload item and add new row to end.
         *
         * @private
         */
        _reloadItem: function (e) {
            if (!this.tabbedSku){
                $('button.tocart').prop('disabled', true);
                this._addByAjax();
                if (!this._isEmptyRowExist()) {
                    this._addRow();
                }
        	}
        },

        /**
         * Composition data for ajax and sending them.
         *
         * @private
         */
        _addByAjax: function () {
            var postArray = [],
                skuElement = this.element.find(this.options.skuSelector),
                qtyElement = this.element.find(this.options.qtySelector),
                sku = skuElement.val(),
                qty = parseInt(qtyElement.val()),
                item = {
                    'sku': sku,
                    'qty': qty
                };
            if (sku && sku.length > 0){
                //check if item exists and add its qty before we remove it
                var existingItem = quickOrderItems.getItem(sku);
                if (existingItem){
                    var allSkuInputs = $(this.options.skuSelector).not(skuElement);
                    var self = this;
                    $.each(allSkuInputs, function(){
                        var $existingSkuInput = $(this);
                        if ($existingSkuInput.val() != '' && $existingSkuInput.val() == sku){
                            var $currentItem = $existingSkuInput.parents('.fields');
                            var $existingQtyInput = $currentItem.find(self.options.qtySelector);
                            var existingQty = parseInt($existingQtyInput.val());
                            var newQty = existingQty + item.qty;
                            qtyElement.val(newQty);
                            item.qty = newQty;
                            var $removeButton = $currentItem.find('button.remove-trigger');
                            $removeButton.trigger('click');
                        }
                    });
                }
            }

            postArray.push(item);
            this._clearProductBlock();
            qtyElement.prop('disabled', true);

            if (item.sku !== '') {
                $.post(
                    this.options.urlSku,
                    {
                        'items': JSON.stringify(postArray)
                    },
                    function (data) {
                        this.options.dataError.text = null;
                        $.each(data.items, function (index, it) {
                            if (it.isError == 0 && skuElement.val() == it.sku){
                                quickOrderItems.setItem(index, it);
                            }
                            this.element.find(this.options.qtySelector).val(parseFloat(it.qty));
                            this._addBlock(it);
                        }.bind(this));

                        if (data && data.generalErrorMessage && data.generalErrorMessage !== '') {
                            this.options.dataError.text = data.generalErrorMessage;
                        }
                        this._reloadError();
                    }.bind(this)
                ).done(function () {
                    qtyElement.prop('disabled', false);
                });
            } else {
                this._reloadError();
                qtyElement.prop('disabled', false);
            }

        },

        /**
         * Add new block.
         *
         * @param {Object} data
         * @private
         */
        _addBlock: function (data) {
            var addedBlock,
                productBlock,subTotal,price,Qty,total,totalQty,totalPrice,checkPrice,error;

            //calculate subtotal 

            data.total = "";

            if(data.price && data.qty)
            {

                price = data.price;

                price = price.replace(/[,$]/g , '');

                Qty = data.qty;

                total = parseFloat(price) * Qty;

                data.total = total.toFixed(2);

                subTotal = "$"+data.total;

            }

            //end

            // render the form
            addedBlock = $(this.addBlockTmpl({
                data: data
            }));

            // add product info
            productBlock = this.element.find(this.options.addSelector);

            if(data.isError && data.result =="The SKU was not found in the catalog.")
            {

                productBlock.parent().find(".product-image,.product-name").hide();

                error ='<div class="product-error">'+
                            '<div data-role="error-message" class="message error">'+
                            '<div>'+data.result+'</div></div>'+
                        '</div>';

                productBlock.parent().find(".product-error").remove();
                productBlock.parent().parent().addClass('can-remove');
                productBlock.parent().find(".control.item-sku").append(error);

                return false;

            }else if(data.isError && data.result =="We don't have the quantity you requested."){

                error ='<div class="product-error">'+
                            '<div data-role="error-message" class="message error">'+
                            '<div>'+data.result+'</div></div>'+
                        '</div>';

                productBlock.parent().find(".qty").show();
                productBlock.parent().find(".product-image,.product-name").hide();
                productBlock.parent().find(".product-error").remove();
                productBlock.parent().parent().addClass('can-remove');
                productBlock.parent().find(".control.item-sku").append(error);

                return false;

            }else{

                productBlock.parent().find(".product-image,.product-name,.qty,span.sub-total,button.action.remove.no-display").show();
                productBlock.parent().find(".product-image,.product-name").remove();
                productBlock.parent().find(".product-image,.product-name,.product-error").remove();
                productBlock.parent().find("span.sub-total").empty().text(subTotal);
                productBlock.parent().find(".qty").show();
                productBlock.after(addedBlock);
                totalQty = 0;
                totalPrice = 0;
                $('.qty').each(function() {if($(this).val()>0){totalQty = totalQty + parseInt($(this).val());}});
                $('.sub-total').each(function() {

                    checkPrice = $(this).text().replace(/\$/g, "");

                    if(checkPrice !="" && checkPrice >0){

                        totalPrice = totalPrice + parseFloat(checkPrice);
                    }
                });

                totalPrice = totalPrice.toFixed(2);

                productBlock.closest("fieldset").parent().find(".total-items").text("("+totalQty+" items)");
                productBlock.closest("fieldset").parent().find(".total-price").text("$"+totalPrice);
                productBlock.parent().parent().addClass('can-remove');
                productBlock.closest("fieldset").parent().find(".order-total").show();
            }

             // initialize all mage content
                addedBlock.trigger('contentUpdated');
        },

        /**
         * Check if exist row.
         *
         * @private
         * @return {Boolean} true if row exist and false if not
         */
        _isEmptyRowExist: function () {
            var tableWiget = $(this.options.tableWigetSelector),
                allSkuInputs = tableWiget.find(this.options.skuSelector),
                result = false;

            $.each(allSkuInputs, function () {
                if ($(this).val() == '') { //eslint-disable-line eqeqeq
                    result = true;

                    return false;
                }
            });

            return result;
        },

        /**
         * Check rows for the presence of text.
         *
         * @private
         * @returns {Boolean} true if all fields are empty and false if not
         */
        _isAllRowsEmpty: function () {
            var tableWiget = $(this.options.tableWigetSelector),
                allSkuInputs = tableWiget.find(this.options.skuSelector),
                res = true;

            allSkuInputs.each(function () {
                if (this.value !== '') {
                    res = false;
                }
            });

            return res;
        },

        /**
         * Clear product block from row.
         *
         * @private
         */
        _clearProductBlock: function () {
            var productBlock = this.element.find(this.options.addSelector);

            productBlock.html('');
        },
    });
    
    return $.mage.productSkuItem;
});
