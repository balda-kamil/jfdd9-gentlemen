var section1OffsetTop = $('.section1').offset().top;
var section2OffsetTop = $('.section2').offset().top;
var section3OffsetTop = $('.section3').offset().top;
var section4OffsetTop = $('.section4').offset().top;
var section5OffsetTop = $('.section5').offset().top;

    $(document).on('scroll',function(){

        var scrollTop = $(document).scrollTop();
        var activeLi;

        if (scrollTop + 120 < section2OffsetTop) {
            activeLi = $('.menu>li:nth-child(1)');
        } else if (scrollTop + 75 < section3OffsetTop){
            activeLi = $('.menu>li:nth-child(2)');
        } else if (scrollTop + 75 < section4OffsetTop){
            activeLi = $('.menu>li:nth-child(3)');
        } else if (scrollTop + 75 < section5OffsetTop){
            activeLi = $('.menu>li:nth-child(4)');
        } else {
            activeLi = $('.menu>li:nth-child(5)');
        }

        activeLi.addClass('active');
        $('.menu>li').not(activeLi).removeClass('active');
    });






