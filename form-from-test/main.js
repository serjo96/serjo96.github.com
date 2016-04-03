$(document).ready(function() {
    $("#trigger-fild").click(function () {
        $(this).closest('.form-section').find('.form-cover').slideToggle("fast").parent().find('.form-cover');
    });  
});