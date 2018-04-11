$(window).scroll(function() {

    var activeLi;

    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        activeLi = $('.menu>li:nth-child(4)');
    }

    activeLi.addClass('active');
    $('.menu>li').not(activeLi).removeClass('active');
});