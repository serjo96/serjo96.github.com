$(document).ready(function() {
    $("#trigger-fild").click(function () {
        $(this).closest('.form-section').find('form').slideToggle("fast").parent().find('form');
    });  
});