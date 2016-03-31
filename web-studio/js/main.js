$(document).ready(function(){
    $('nav ul li a').click(function(){
        $('li a').removeClass("active");
        $(this).addClass("active");
    });
});
$(window).scroll(function() {
    if ($(this).scrollTop() > 800) {
        $('nav').addClass('visible');
    } else {
        $('nav').removeClass('visible');
    }
});