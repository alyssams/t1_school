require([
    "jquery", "slick"
], function ($, slick) {

    var $window = $(window);
    var $document = $(document);

    var $full_elements = $('.full-element');
    var $half_elements = $('.half-element');
    var $quarter_elements = $('.quarter-element');
    var $navButtons = $("nav a").filter("[href^=#]");
    var $navGoPrev = $(".go-prev");
    var $navGoNext = $(".go-next");
    var $slidesContainer = $(".slides-container");
    var $slides = $(".slide");
    var $content = $slides.find('.content');


    var pageHeight = $window.innerHeight();


    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($full_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();

            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
            } else {
                $element.removeClass('in-view');
            }
        });

        $.each($half_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var window_top_position = $window.scrollTop();
            var element_half_position = $element.offset().top + (element_height / 8);
            var half_position = element_half_position - window_top_position;

            if (half_position <= 0) {
                $element.addClass('half-view');
            } else {
                $element.removeClass('half-view');
            }
        });

        $.each($quarter_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top + 100;
            var element_bottom_position = (element_top_position + element_height);
            var video = $element.find('video')[0];

            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
                if (video) {
                    video.play();
                }
            } else {
                $element.removeClass('in-view');
            }
        });
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

    $(document).ready(function () {

        // this will be replaced soon so it can use express no JS

        if (window.location.href == "http://localhost:3000/enform") {
            $('.l_overview').addClass('active');
        }

        if (window.location.href == "http://localhost:3000/enform/services") {
            $('.l_services').addClass('active');
        }

        if (window.location.href == "http://localhost:3000/enform/features") {
            $('.l_features').addClass('active');
        }

        if (window.location.href == "http://52.8.218.184:3000/enform") {
            $('.l_overview').addClass('active');
        }

        if (window.location.href == "http://52.8.218.184:3000/enform/services") {
            $('.l_services').addClass('active');
        }

        if (window.location.href == "http://52.8.218.184:3000/enform/features") {
            $('.l_features').addClass('active');
        }

        $(".caret").click(function () {
            $('html, body').animate({
                scrollTop: $(".overview-remote").offset().top
            }, 2000);
            return false;
        });

        $('.play-button').click(function () {
            var $sectionBackground = $(this).closest('.section-background');
            var $sectionForeground = $sectionBackground.parent().find('.section-foreground');
            var $video = $sectionBackground.find('video')[0];
            $video.play();
            $(this).addClass('inactive');
            $('.paused').addClass('active');
            $sectionForeground.hide();
            return false;
        });

        $('.paused').mouseenter(function (event) {
            $('.pause-button').addClass('active');
            $('.pause-button').removeClass('inactive');
        });

        $('.paused').mouseleave(function (event) {
            $('.pause-button').removeClass('active');
            $('.pause-button').addClass('inactive');
        });

        $('.pause-button').click(function () {
            var $sectionBackground = $(this).closest('.section-background');
            var $sectionForeground = $sectionBackground.parent().find('.section-foreground');
            var $video = $sectionBackground.find('video')[0];
            $sectionForeground.css('display', 'inline-table');
            $(this).addClass('inactive');
            $('.paused').removeClass('active');
            $('.play-button').removeClass('inactive');
            $('.play-button').addClass('active');
            $video.load();
            return false;
        });

        $('video').on('ended', function () {
            var $sectionBackground = $(this).closest('.section-background');
            var $sectionForeground = $sectionBackground.parent().find('.section-foreground');

            $sectionForeground.show();
            $('.paused').removeClass('active');
            $('.play-button').removeClass('inactive');
            $('.play-button').addClass('active');
            console.log('Video has ended!');
        });


        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 6, // 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            centerMode: true,
            focusOnSelect: true
        });

        var $subnav = $('.sticky-wrapper');
        $(window).scroll(function () {
            $subnav.addClass('fixed');
            $subnav.removeClass('not-fixed');
            if ($(document).scrollTop() < 89) {
                $subnav.removeClass('fixed');
                $subnav.addClass('not-fixed');
            }
        });

        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
});
