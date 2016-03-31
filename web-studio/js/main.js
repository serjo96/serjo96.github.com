var div = $('div')
, nav = $('nav')
, nav_height = nav.outerHeight();

$(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    div.each(function() {
        var top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('active');
            div.removeClass('active');

            $(this).addClass('active');
            nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
        }
    });
});

nav.find('a').on('click', function () {
    var $el = $(this)
    , id = $el.attr('href');

    $('html, body').animate({
        scrollTop: $(id).offset().top - nav_height
    }, 500);

    return false;
});

$(window).scroll(function() {
    if ($(this).scrollTop() > 800) {
        $('nav').addClass('visible');
    } else {
        $('nav').removeClass('visible');
    }
});