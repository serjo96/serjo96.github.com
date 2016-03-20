$(document).ready(function() {
    $(".form-btn").click(function () {
        $(this).closest('.form-cover').find('.form-cont').slideToggle("fast").parent().find('.form-btn').toggleClass("form-open");
    });
    $('.first_menu a li').click(function(){
        $('a li').removeClass("active");
        $(this).addClass("active");
    });
});