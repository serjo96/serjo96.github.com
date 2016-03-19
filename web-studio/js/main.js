$(window).scroll(function() {
    if ($(this).scrollTop() > 800) {
        $('nav').addClass('visible');
    } else {
        $('nav').removeClass('visible');
    }
});