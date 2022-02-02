require(
    [
        'jquery',
        'Magento_Ui/js/modal/modal',
        'uiComponent',
        'ko'
    ],
    function (
        $,
        modal, Component, ko,
    ) {
        var options = {
            type: 'popup',
            responsive: true,
            innerScroll: false,
            buttons: []
        };
        $("body").on("click", ".magnasonic-content div", function () {
           //alert("hello");
            $('.magnasonic-content').hide();
        }); 
        $(".bt-action").click(function () {
            $(".bt-action-file").modal(options).modal('openModal');
        });
        $("body").on("click", ".btn", function () {
            var value = $(this).val();
            $(".progress-bar-cointainer").removeAttr("style");
            $(".add-button").removeAttr("style");
            $(".add-image").removeAttr("style");
            $(".title").hide();
            var magnasonic0 = new Array("Sound Base", "SKU:24-WG080");
            var magnasonic1 = new Array("Projector", "SKU:PP60");
            var magnasonic2 = new Array("Jewelry Cleaner", "Tank-Capacity-7.4-OZ", "220-ML", "SKU:UC21");
            var magnasonic3 = new Array("Jewelry Cleaner", "Tank-Capacity-20-OZ", "600-ML", "1Preset", "SKU:CD2800");
            var magnasonic4 = new Array("Jewelry Cleaner", "Tank-Capacity-20-OZ", "600 ML", "5Preset", "SKU:MGUC500");
            var magnasonic5 = new Array("Flim Scanner", "Photos", "126-slide", "Screen-size-2.36", "SKU:FS52");
            var magnasonic6 = new Array("Flim Scanner", "Photos", "126-slide", "Screen-size-5", "SKU:FS71");
            var magnasonic7 = new Array("Flim Scanner", "Photos", "super8-flim-110-slide", "Screens-size-2.36", "Internal-Memory-64MB", "SKU:FS52");
            var magnasonic8 = new Array("Flim Scanner", "Photos", "super8-flim-110-slide", "Screens-size-2.36", "Internal-Memory-128MB", "SKU:FS50");
            var magnasonic9 = new Array("Flim Scanner", "Photos", "super8-flim-110-slide", "Screens-size-5", "SKU:FS71");
            var magnasonic10 = new Array("Flim Scanner", "Photos", "33MM-flim-135-slide-126-flim&slide", "Screen-size-2.4", "MegaPixel-23MP", "SKU:FS51");
            var magnasonic11 = new Array("Flim Scanner", "Photos", "33MM-flim-135-slide-126-flim&slide", "Screen-size-2.4", "MegaPixel-22MP", "Internal-Memory-64MB", "SKU:FS52");
            var magnasonic12 = new Array("Flim Scanner", "Photos", "33MM-flim-135-slide-126-flim&slide", "Screen-size-2.4", "MegaPixel-22MP", "Internal-Memory-128MB", "SKU:FS50");
            var magnasonic13 = new Array("Flim Scanner", "Photos", "33MM-flim-135-slide-126-flim&slide", "Screen-size-2.4", "MegaPixel-14MP", "SKU:FS60");
            var magnasonic14 = new Array("Flim Scanner", "Photos", "33MM-flim-135-slide-126-flim&slide", "Screenss-size-5", "SKU:FS71");
            var magnasonic15 = new Array("Flim Scanner", "Photos", "4x6-photos-3x5 photos", "SKU:FS60");
            var magnasonic16 = new Array("Flim Scanner", "Photos", "8MM-flim", "SKU:FS52");
            var magnasonic17 = new Array("Flim Scanner", "Videos", "8MM-video-super-8-video-8MM-flim", "SKU:FS52");
            var magnasonic18 = new Array("Flim Scanner", "Videos", "8MM-video-super-8-video-8MM-flim", "SKU:FS81");
            var magnasonic19 = new Array("Clock-Radio", "Simple", "Simple-NO", "SKU:EAAC-200-201");
            var magnasonic20 = new Array("Clock-Radio", "Simple", "Simple-YES", "SKU:CR-20");
            var magnasonic21 = new Array("Clock-Radio", "Advanced", "USB-NO", "USB-PROJ-NO", "SKU:EAAC-200-201");
            var magnasonic22 = new Array("Clock-Radio", "Advanced", "USB-NO", "USB-PROJ-YES", "AUX-NO", "SKU:CR62");
            var magnasonic23 = new Array("Clock-Radio", "Advanced", "USB-NO", "USB-PROJ-YES", "AUX-YES", "SKU:EAAC-601");
            var magnasonic24 = new Array("Clock-Radio", "Advanced", "USB-YES", "USB-C-PROJ-NO", "AB-NO", "CHOOSE-WHITE");
            var magnasonic25 = new Array("Clock-Radio", "Advanced", "USB-YES", "USB-C-PROJ-NO", "AB-NO", "CHOOSE-BLUE");
            var magnasonic26 = new Array("Clock-Radio", "Advanced", "USB-YES", "USB-C-PROJ-NO", "AB-YES", "SKU:CR-63");
            var magnasonic27 = new Array("Clock-Radio", "Advanced", "USB-YES", "USB-C-PROJ-YES", "BL-YES", "SKU:CR-65");
            var magnasonic28 = new Array("Clock-Radio", "Advanced", "USB-YES", "USB-C-PROJ-YES", "BL-NO", "AB-BL-YES", "SKU:CR-64");
            var magnasonic29 = new Array("Clock-Radio", "Advanced", "USB-YES", "USB-C-PROJ-YES", "BL-NO", "AB-BL-NO", "FM-Only", "SKU:CR-20");
            var magnasonic30 = new Array("Clock-Radio", "Advanced", "USB-YES", "USB-C-PROJ-YES", "BL-NO", "AB-BL-NO", "AM-FM", "WHITE", "SKU:EAAC-475W");
            var magnasonic31 = new Array("Clock-Radio", "Advanced", "USB-YES", "USB-C-PROJ-YES", "BL-NO", "AB-BL-NO", "AM-FM", "BLUE", "SKU:EAAC-475W");
            var array_list = [magnasonic0, magnasonic1,magnasonic2, magnasonic3, magnasonic4, magnasonic5, magnasonic6, magnasonic7, magnasonic8, magnasonic9, magnasonic10, 
                              magnasonic11, magnasonic12,magnasonic13, magnasonic14, magnasonic15, magnasonic16,magnasonic17, magnasonic18, magnasonic19, magnasonic20,magnasonic21, 
                              magnasonic22, magnasonic23, magnasonic24,magnasonic25, magnasonic26, magnasonic27, magnasonic28,magnasonic29, magnasonic30, magnasonic31];
            var arrayLength = array_list.length;
            
            $(".add-button .btn").hide();
            $(".add-image .image").hide();

            /* looping for outer array (array_list) */
            for (var outer = 0; outer < arrayLength; outer++) {
                var outer_len = array_list[outer].length;
                /* looping for inner array  */
                for (var inner = 0; inner <outer_len; inner++) {
                /* check if the value matches the array element  */
                    if (array_list[outer][inner] == value) {
                        /* to show iframe */
                        if (value.indexOf('SKU') == 0) {
                            $(".add-button").hide();
                            $(".add-image").hide();
                            $(".pdp").removeAttr("style");
                            var ret = array_list[outer][inner].replace('SKU:','');
                            alert(ret);
                            $('.sku').html(ret);
                            var self;               
                                return Component.extend({
                                    defaults: {
                                        template: 'Tychons_AddToCart/knockout-examples'
                                        },
                                        
                                        popup :ko.observable(0),
                                
                                    initialize: function () {
                                        self = this;
                                        this._super();
                                        //call the incrementTime function to run on intialize
                                    
                                    }
                                });
                            //...
                            
                            //validate
                          
                            
                           var prod_sku = $('.sku').html(ret);
                          // alert(prod_sku);
                          // alert(JSON.stringify(ret));
                           /*  $(document).ready(function() {
                               
                                    $('.sku').html(ret);
                                    $.ajax({
                                        url: "sayhello.phtml",
                                        data: {value:ret}
                                    }).done(function() {
                            
                                    });
                               
                            
                            }); */
                        }
                        $(".add-button").append(`<button class="button-append btn" value=${array_list[outer][inner + 1]}>${array_list[outer][inner + 1]}</button>`);
                        $(".add-image").append(`<img class="image" src=/pub/media/wysiwyg/images/${array_list[outer][inner + 1]}.jpeg></img>`);
                       /*  remove duplicate buttons and images */
                        var remove_duplicate = {};
                        $(".button-append").each(function () {
                            var txt = $(this).text();
                            if (remove_duplicate[txt]) {
                                $(this).remove();
                            }
                            else {
                                remove_duplicate[txt] = true;
                            }
                        });
                        var remove_duplicate_image = {};
                        $(".image").each(function () {
                            var txt = $(this).attr("src");
                            if (remove_duplicate_image[txt]) {
                                $(this).remove();
                            }
                            else {
                                remove_duplicate_image[txt] = true;
                            }
                        });
                        /* progress bar */
                        var progress = ((inner + 2) / outer_len) * 100;
                        var pb=progress.toFixed(2);
                        var progress_bar =pb + "%";
                        $(".progress-bar").width(progress_bar);
                        $(".progressbar-width").text(progress_bar);
                    }
                }/* end of inner for loop */
            }/* end of outer forloop */
       
    });
    }
);