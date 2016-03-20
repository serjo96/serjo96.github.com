/*
 * Auto-generated content from the Brackets New Project extension.
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global $, window, document */

// Simple jQuery event handler
$(document).ready(function () {
    $('.first-carusel').bxSlider({
        maxSlides: 7,
        slideWidth: 114,
        slideMargin:10
    });
    $('.chose-carusel').bxSlider({
    });
    
    $('.chose-brand').bxSlider({
    });
});   
    $(function() {
        $('.jcarousel')
            .jcarousel({
            // Core configuration goes here
        })
            .jcarouselAutoscroll({
            interval: 3000,
            target: '+=1',
            autostart: true
        });
    });
$('.group-reg-city').on('click', function(){
    $('.contact-section').toggleClass('is-clicked');  
});   
$('.close-btn').on('click', function(){ 
    $('.contact-section').toggleClass('is-clicked');
});
$('.them-btn').on('click', function(){ 
    $('.them-block').toggleClass('then-block-open');
});


var selectedScheme = 'Default';

$('#chose-them').change(function(){
    $('body').removeClass(selectedScheme).addClass($(this).val());
    selectedScheme = $(this).val();
});