(function ($) {
    "use strict";

    $(window).on("load", function () {
        $("#preloader-active").delay(450).fadeOut("slow");
        $("body").delay(450).css("overflow", "visible");
    });

    // Sticky header + back to top
    $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();

        if (scroll < 400) {
            $(".header-sticky").removeClass("sticky-bar");
            $("#back-top").fadeOut(500);
        } else {
            $(".header-sticky").addClass("sticky-bar");
            $("#back-top").fadeIn(500);
        }
    });

    $("#back-top a").on("click", function () {
        $("body,html").animate({ scrollTop: 0 }, 800);
        return false;
    });

    // Mobile navigation
    var menu = $("ul#navigation");
    if (menu.length) {
        menu.slicknav({
            prependTo: ".mobile_menu",
            closedSymbol: "+",
            openedSymbol: "-"
        });
    }

    // Hero slider
    var slider = $(".slider-active");
    if (slider.length) {
        slider.on("init", function () {
            animateSliderElements($(".single-slider:first-child").find("[data-animation]"));
        });

        slider.on("beforeChange", function (e, slick, currentSlide, nextSlide) {
            animateSliderElements(
                $('.single-slider[data-slick-index="' + nextSlide + '"]').find("[data-animation]")
            );
        });

        slider.slick({
            autoplay: false,
            autoplaySpeed: 10000,
            dots: false,
            fade: true,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="ti-arrow-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="ti-arrow-right"></i></button>',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true }
                },
                {
                    breakpoint: 992,
                    settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false }
                },
                {
                    breakpoint: 767,
                    settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false }
                }
            ]
        });
    }

    function animateSliderElements(elements) {
        var animationEndEvents =
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

        elements.each(function () {
            var $this = $(this);
            var animationDelay = $this.data("delay");
            var animationType = "animated " + $this.data("animation");

            $this.css({
                "animation-delay": animationDelay,
                "-webkit-animation-delay": animationDelay
            });

            $this.addClass(animationType).one(animationEndEvents, function () {
                $this.removeClass(animationType);
            });
        });
    }

    // Brand slider
    var brands = $(".brand-active");
    if (brands.length) {
        brands.slick({
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 400,
            arrows: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 3 } },
                { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
                { breakpoint: 991, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
            ]
        });
    }

    // Testimonial slider
    var testimonial = $(".h1-testimonial-active");
    if (testimonial.length) {
        testimonial.slick({
            dots: false,
            infinite: true,
            speed: 1000,
            autoplay: false,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                { breakpoint: 1024, settings: { arrows: false } },
                { breakpoint: 600, settings: { arrows: false } },
                { breakpoint: 480, settings: { arrows: false } }
            ]
        });
    }

    // Background images from data-background
    $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
    });

    // Counter animation
    $(".counter").counterUp({
        delay: 10,
        time: 3000
    });

    // Current year
    var year = document.getElementById("copyright-year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

})(jQuery);

/* =========================================================
   LIGHT / DARK MODE TOGGLE
   ========================================================= */
(function () {
    var toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    var icon = toggle.querySelector(".theme-toggle-icon");
    var text = toggle.querySelector(".theme-toggle-text");

    function applyTheme(isDark) {
        document.body.classList.toggle("dark-mode", isDark);
        toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
        toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");

        if (icon) {
            icon.classList.toggle("fa-moon", !isDark);
            icon.classList.toggle("fa-sun", isDark);
        }
        if (text) {
            text.textContent = isDark ? "Light" : "Dark";
        }
    }

    var savedTheme = null;
    try {
        savedTheme = localStorage.getItem("talentbridge-theme");
    } catch (e) {}

    applyTheme(savedTheme === "dark");

    toggle.addEventListener("click", function () {
        var isDark = !document.body.classList.contains("dark-mode");
        applyTheme(isDark);
        try {
            localStorage.setItem("talentbridge-theme", isDark ? "dark" : "light");
        } catch (e) {}
    });
})();
