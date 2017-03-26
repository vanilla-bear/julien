function initMenu() {
    "use strict";
    var e = jQuery,
        t = e("body"),
        i = "#main-menu";
    e(i).find(".parent > a .open-sub, .megamenu .title .open-sub").remove(), e(i).find(".parent > a, .megamenu .title").append('<span class="open-sub"></span>'), e(i).on("click", ".open-sub", function(t) {
        t.preventDefault();
        var i = e(this).closest("li, .box");
        if (e(i).hasClass("active")) e(i).children().last().slideUp(150), e(i).removeClass("active");
        else {
            var n = e(this).closest("li, .box").parent("ul, .sub-list").children("li, .box");
            e(n).is(".active") && e(n).removeClass("active").children("ul").slideUp(150), e(i).children().last().slideDown(150), e(i).addClass("active")
        }
    }), e(i).find(".parent > a").click(function(i) {
        if (t.width() > 979 && navigator.userAgent.match(/iPad|iPhone|Android/i)) {
            var n = e(this);
            n.parent().hasClass("open") ? (n.parent().removeClass("open"), i.preventDefault()) : (i.preventDefault(), n.parent().addClass("open"))
        }
    })
}

function initMagnPopup() {
    (function($) {
    $("#inline-popups").magnificPopup({
        delegate: "a",
        removalDelay: 500,
        callbacks: {
            beforeOpen: function() {
                this.st.mainClass = this.st.el.attr("data-effect")
            }
        },
        midClick: !0
    }), $(".lightbox").magnificPopup({
        type: "image",
        mainClass: "mfp-3d-unfold",
        removalDelay: 500,
        callbacks: {
            beforeOpen: function() {
                this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim")
            }
        },
        closeOnContentClick: !0,
        midClick: !0
    }), $("a.hinge").magnificPopup({
        mainClass: "mfp-with-fade",
        removalDelay: 1e3,
        callbacks: {
            beforeClose: function() {
                this.content.addClass("hinge")
            },
            close: function() {
                this.content.removeClass("hinge")
            }
        },
        midClick: !0
    }), $(".popup-gallery").magnificPopup({
        delegate: "a",
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-3d-unfold",
        removalDelay: 500,
        callbacks: {
            beforeOpen: function() {
                this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim")
            }
        },
        gallery: {
            enabled: !0,
            navigateByImgClick: !0,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    }), $(".popup-gallery2").magnificPopup({
        delegate: "a",
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-3d-unfold",
        removalDelay: 500,
        callbacks: {
            beforeOpen: function() {
                this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim")
            }
        },
        gallery: {
            enabled: !0,
            navigateByImgClick: !0,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    }), $(".popup-multi-gallery").each(function() {
        $(this).magnificPopup({
            delegate: "a",
            type: "image",
            gallery: {
                enabled: !0
            }
        })
    }), $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: !1,
        fixedContentPos: !1
    })
    })(jQuery);
}

function initAffixCheck() {
    "use strict";
    var e = jQuery("#nav");
    e.affix({
        offset: {
            top: 1
        }
    }), windowT.width() < 1025 && (windowT.off(".affix"), e.removeData("bs.affix").removeClass("affix affix-top affix-bottom"))
}

function initLeftMenu() {
    var e = jQuery("#header-left-nav");
    windowT.width() < 1025 && e.removeClass("in"), windowT.width() > 1024 && !e.hasClass("in") && e.addClass("in")
}

function initWow() {
    var e = new WOW({
        mobile: !1
    });
    e.init()
}

function initCounters() {
    jQuery(".count-number").appear(function() {
        var e = jQuery(this);
        e.countTo({
            from: 0,
            to: e.html(),
            speed: 1300,
            refreshInterval: 60
        })
    })
}

function initWorkFilter() {
    var e = 0,
        t = jQuery("#items-grid");
    ! function(i) {
        "use strict";
        var n;
        n = t.hasClass("masonry") ? "masonry" : "fitRows", t.imagesLoaded(function() {
            t.isotope({
                itemSelector: ".mix",
                layoutMode: n,
                filter: e
            })
        }), i(".filter").click(function() {
            return i(".filter").removeClass("active"), i(this).addClass("active"), e = i(this).attr("data-filter"), t.isotope({
                itemSelector: ".mix",
                layoutMode: n,
                filter: e
            }), !1
        })
    }(jQuery)
}

function initImgHeight() {
    ! function(e) {
        e(".js-height-fullscr").height(e(window).height())
    }(jQuery)
}

function initMasonry() {
    ! function(e) {
        e(".masonry").imagesLoaded(function() {
            e(".masonry").masonry()
        })
    }(jQuery)
}

function initMap() {
    ! function() {
        if (gmMapDiv.length) {
            var e = (gmMapDiv.attr("data-address"), gmMapDiv.attr("data-address"));
            var loc_marker = (gmMapDiv.attr("data-loc-marker"), gmMapDiv.attr("data-loc-marker"));
            gmMapDiv.gmap3({
                action: "init",
                marker: {
                    address: e,
                    options: {
                        icon: loc_marker
                    }
                },
                map: {
                    options: {
                        zoom: 12,
                        zoomControl: true,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        scrollwheel: false,
                        draggable: false,
                        styles: [
                            {
                                "featureType": "water",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#e9e9e9"
                                    },
                                    {
                                        "lightness": 17
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#f5f5f5"
                                    },
                                    {
                                        "lightness": 20
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#C8C6C8"
                                    },
                                    {
                                        "lightness": 17
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry.stroke",
                                "stylers": [
                                    {
                                        "color": "#C8C6C8"
                                    },
                                    {
                                        "lightness": 29
                                    },
                                    {
                                        "weight": 0.2
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#C8C6C8"
                                    },
                                    {
                                        "lightness": 18
                                    }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#C8C6C8"
                                    },
                                    {
                                        "lightness": 16
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#f5f5f5"
                                    },
                                    {
                                        "lightness": 21
                                    }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#dedede"
                                    },
                                    {
                                        "lightness": 21
                                    }
                                ]
                            },
                            {
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    },
                                    {
                                        "color": "#ffffff"
                                    },
                                    {
                                        "lightness": 16
                                    }
                                ]
                            },
                            {
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "saturation": 36
                                    },
                                    {
                                        "color": "#333333"
                                    },
                                    {
                                        "lightness": 40
                                    }
                                ]
                            },
                            {
                                "elementType": "labels.icon",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#f2f2f2"
                                    },
                                    {
                                        "lightness": 19
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#fefefe"
                                    },
                                    {
                                        "lightness": 20
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative",
                                "elementType": "geometry.stroke",
                                "stylers": [
                                    {
                                        "color": "#fefefe"
                                    },
                                    {
                                        "lightness": 17
                                    },
                                    {
                                        "weight": 1.2
                                    }
                                ]
                            }
                        ]
                    }
                }
            })
        }
    }(jQuery)

}

function initPageSliders() {
    ! function(e) {
        "use strict";
        e(".fullwidth-slider").owlCarousel({
            slideSpeed: 350,
            singleItem: !0,
            navigation: !0,
            navigationText: ["<span class='icon icon-arrows-left'></span>", "<i class='icon icon-arrows-right'></span>"]
        }), e(".fullwidth-slider-auto").owlCarousel({
            autoPlay: 4e3,
            singleItem: !0,
            navigation: !0,
            navigationText: ["<span class='icon icon-arrows-left'></span>", "<i class='icon icon-arrows-right'></span>"]
        }), e("#owl-clients").owlCarousel({
            autoPlay: 6e3,
            items: 5,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [768, 3],
            itemsTablet: [480, 2],
            itemsMobile: !1,
            pagination: !1,
            paginationNumbers: !1
        }), e(".owl-clients-auto").owlCarousel({
            autoPlay: 5e3,
            items: 5,
            itemsDesktop: [1e3, 4],
            itemsDesktopSmall: [900, 3],
            itemsTablet: [470, 1],
            itemsMobile: !1,
            pagination: !1,
            paginationNumbers: !1
        }), e(".owl-clients-no-auto").owlCarousel({
            items: 5,
            itemsDesktop: [1e3, 4],
            itemsDesktopSmall: [900, 3],
            itemsTablet: [470, 1],
            itemsMobile: !1,
            pagination: !0,
            paginationNumbers: !1
        }), e(".owl-3items-nav").owlCarousel({
            items: 4,
            itemsDesktop: [1e3, 3],
            itemsDesktopSmall: [900, 2],
            itemsTablet: [470, 1],
            itemsMobile: !1,
            pagination: !1,
            paginationNumbers: !1,
            navigation: !0,
            navigationText: ["<span class='icon icon-arrows-left'></span>", "<i class='icon icon-arrows-right'></span>"],
            rewindNav: !0,
            scrollPerPage: !1
        }), e(".owl-clients-nav").owlCarousel({
            items: 5,
            itemsDesktop: [1e3, 4],
            itemsDesktopSmall: [900, 3],
            itemsTablet: [470, 1],
            itemsMobile: !1,
            pagination: !1,
            paginationNumbers: !1,
            navigation: !0,
            navigationText: ["<span class='icon icon-arrows-left'></span>", "<i class='icon icon-arrows-right'></span>"],
            rewindNav: !0,
            scrollPerPage: !1
        }), e(".owl-1-pag").owlCarousel({
            items: 1,
            itemsDesktop: [1e3, 1],
            itemsDesktopSmall: [900, 1],
            itemsTablet: [470, 1],
            itemsMobile: !1,
            pagination: !0,
            paginationNumbers: !1
        }), e(".owl-1-pag-auto").owlCarousel({
            autoPlay: 5e3,
            items: 1,
            itemsDesktop: [1e3, 1],
            itemsDesktopSmall: [900, 1],
            itemsTablet: [470, 1],
            itemsMobile: !1,
            pagination: !0,
            paginationNumbers: !1
        });
        var t = e(".fullwidth-slideshow").data("owlCarousel");
        if (e(document.documentElement).keyup(function(e) {
                37 == e.keyCode ? t.prev() : 39 == e.keyCode && t.next()
            }), e(".owl-carousel").lenth) {
            var t = e(".owl-carousel").data("owlCarousel");
            t.reinit()
        }
    }(jQuery)
}

function register(e) {
    $.ajax({
        type: e.attr("method"),
        url: e.attr("action"),
        data: e.serialize(),
        cache: !1,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        error: function() {
            $("#notification_container").html('<div id="nl-alert-container"  class="alert alert-info alert-dismissible fade in bounceIn" role="alert" ><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Could not connect to server. Please try again later.</div>')
        },
        success: function(e) {
            if ("success" != e.result) {
                var t = e.msg;
                $("#notification_container").html('<div id="nl-alert-container"  class="alert alert-info alert-dismissible fade in bounceIn" role="alert" ><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + t + "</div>")
            } else {
                var t = e.msg;
                $("#notification_container").html('<div id="nl-alert-container"  class="alert alert-info alert-dismissible fade in bounceIn" role="alert" ><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + t + "</div>")
            }
        }
    })
}
jQuery(document).ready(function() {
    "use strict";
    jQuery(function($) {
        function e(e) {
            "close" == e ? ($(".cd-search").removeClass("is-visible"), $(".cd-search-trigger").removeClass("search-is-visible"), $(".cd-overlay").removeClass("search-is-visible")) : ($(".cd-search").toggleClass("is-visible"), $(".cd-search-trigger").toggleClass("search-is-visible"), $(".cd-overlay").toggleClass("search-is-visible"), windowT.width() > t && $(".cd-search").hasClass("is-visible") && $(".cd-search").find('input[type="search"]').focus(), $(".cd-search").hasClass("is-visible") ? $(".cd-overlay").addClass("is-visible") : $(".cd-overlay").removeClass("is-visible"))
        }
        var t = 1170;
        jQuery(".cd-search-trigger").on("click", function(t) {
            t.preventDefault(), e()
        }), jQuery(".equal-height").equalHeights(), jQuery("#back-top").hide(), jQuery(function() {
            windowT.scroll(function() {
                $(this).scrollTop() > 100 ? jQuery("#back-top").fadeIn() : jQuery("#back-top").fadeOut()
            }), $("#back-top a").click(function() {
                return $("body,html").animate({
                    scrollTop: 0
                }, 600), !1
            })
        }), $(".toggle-view-custom li").click(function() {
            var e = $(this).children("div.panel");
            e.is(":hidden") ? (e.slideDown("10"), $(this).children(".ui-accordion-header").addClass("ui-accordion-header-active")) : (e.slideUp("10"), $(this).children(".ui-accordion-header").removeClass("ui-accordion-header-active"))
        }), $('a.smooth-scroll[href^="#"]').on("click", function(e) {
            var t = $($(this).attr("href"));
            t.length && (e.preventDefault(), $("html, body").animate({
                scrollTop: t.offset().top
            }, 600))
        }), 0 == mobileDetect && ($(".opacity-scroll2").length && windowT.on("scroll", function() {
            $(".opacity-scroll2").css("opacity", function() {
                return 1 - windowT.scrollTop() / windowT.height() * 1.5
            })
        }), $(".parallax-section").length && $.stellar({
            horizontalScrolling: !1
        })), $(".skillbar").appear(function() {
            $(".skillbar").each(function() {
                $(this).find(".skillbar-bar").animate({
                    width: $(this).attr("data-percent")
                }, 2e3)
            })
        }), $(function() {
            $('[data-toggle="tooltip"]').tooltip()
        }), $(function() {
            $('[data-toggle="popover"]').popover()
        });
        var i = $(".accordion > dd").hide();
        i.first().slideDown("easeOutExpo"), $(".accordion > dt > a").first().addClass("active"), $(".accordion > dt > a").click(function() {
            var e = $(this).parent().next("dd");
            return $(".accordion > dt > a").removeClass("active"), $(this).addClass("active"), i.not(e).slideUp("easeInExpo"), $(this).parent().next().slideDown("easeOutExpo"), !1
        }), $(".toggle > dd").hide(), $(".toggle > dt > a").click(function() {
            if ($(this).hasClass("active")) $(this).parent().next().slideUp("easeOutExpo"), $(this).removeClass("active");
            else {
                {
                    $(this).parent().next("dd")
                }
                $(this).addClass("active"), $(this).parent().next().slideDown("easeOutExpo")
            }
            return !1
        }), initMenu(), initMagnPopup(), initCounters(), initMap(), initPageSliders(), initImgHeight(), initLeftMenu(), $("#nav").length && initAffixCheck(), $("#items-grid").length && initWorkFilter(), $(".masonry").length && initMasonry(), $(".wow").length && initWow(), windowT.resize(function() {
            $(".equal-height").css("height", "auto").equalHeights(), $("#nav").length && initAffixCheck(), initImgHeight(), initLeftMenu()
        });
        var n = windowT.width();
        windowT.resize(function() {
            $(this).width() != n && (n = $(this).width(), initLeftMenu())
        })
    });
});
var htmlT = jQuery("html"),
    windowT = jQuery(window),
    ieDetect = !1,
    mobileDetect = !1,
    ua = window.navigator.userAgent,
    old_ie = ua.indexOf("MSIE "),
    new_ie = ua.indexOf("Trident/");
/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ? (mobileDetect = !0, htmlT.addClass("mobile")) : htmlT.addClass("no-mobile"), (old_ie > -1 || new_ie > -1) && (ieDetect = !0), jQuery("body").imagesLoaded(function() {
    jQuery("#loader3").fadeOut(), jQuery("#loader-overflow").delay(200).fadeOut(700)
});
var gmMapDiv = jQuery("#google-map");
0 !== jQuery(".date-picker").length && jQuery(function() {
        $(".date-picker").datetimepicker({
            format: "DD/MM/YYYY"
        })
    }), 0 !== jQuery(".time-picker").length && $(function() {
        $(".time-picker").datetimepicker({
            format: "LT"
        })
    }), jQuery(function() {
        "use strict";
        var e = jQuery("#mc-embedded-subscribe-form");
        jQuery("#mc-embedded-subscribe").on("click", function(t) {
            t && t.preventDefault(), register(e)
        })
    }),
    function() {
        var e, t, i, n, a, o = function(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            },
            s = [].indexOf || function(e) {
                for (var t = 0, i = this.length; i > t; t++)
                    if (t in this && this[t] === e) return t;
                return -1
            };
        t = function() {
            function e() {}
            return e.prototype.extend = function(e, t) {
                var i, n;
                for (i in t) n = t[i], null == e[i] && (e[i] = n);
                return e
            }, e.prototype.isMobile = function(e) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)
            }, e.prototype.createEvent = function(e, t, i, n) {
                var a;
                return null == t && (t = !1), null == i && (i = !1), null == n && (n = null), null != document.createEvent ? (a = document.createEvent("CustomEvent"), a.initCustomEvent(e, t, i, n)) : null != document.createEventObject ? (a = document.createEventObject(), a.eventType = e) : a.eventName = e, a
            }, e.prototype.emitEvent = function(e, t) {
                return null != e.dispatchEvent ? e.dispatchEvent(t) : t in (null != e) ? e[t]() : "on" + t in (null != e) ? e["on" + t]() : void 0
            }, e.prototype.addEvent = function(e, t, i) {
                return null != e.addEventListener ? e.addEventListener(t, i, !1) : null != e.attachEvent ? e.attachEvent("on" + t, i) : e[t] = i
            }, e.prototype.removeEvent = function(e, t, i) {
                return null != e.removeEventListener ? e.removeEventListener(t, i, !1) : null != e.detachEvent ? e.detachEvent("on" + t, i) : delete e[t]
            }, e.prototype.innerHeight = function() {
                return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
            }, e
        }(), i = this.WeakMap || this.MozWeakMap || (i = function() {
            function e() {
                this.keys = [], this.values = []
            }
            return e.prototype.get = function(e) {
                var t, i, n, a, o;
                for (o = this.keys, t = n = 0, a = o.length; a > n; t = ++n)
                    if (i = o[t], i === e) return this.values[t]
            }, e.prototype.set = function(e, t) {
                var i, n, a, o, s;
                for (s = this.keys, i = a = 0, o = s.length; o > a; i = ++a)
                    if (n = s[i], n === e) return void(this.values[i] = t);
                return this.keys.push(e), this.values.push(t)
            }, e
        }()), e = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (e = function() {
            function e() {
                "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
            }
            return e.notSupported = !0, e.prototype.observe = function() {}, e
        }()), n = this.getComputedStyle || function(e) {
            return this.getPropertyValue = function(t) {
                var i;
                return "float" === t && (t = "styleFloat"), a.test(t) && t.replace(a, function(e, t) {
                    return t.toUpperCase()
                }), (null != (i = e.currentStyle) ? i[t] : void 0) || null
            }, this
        }, a = /(\-([a-z]){1})/g, this.WOW = function() {
            function a(e) {
                null == e && (e = {}), this.scrollCallback = o(this.scrollCallback, this), this.scrollHandler = o(this.scrollHandler, this), this.resetAnimation = o(this.resetAnimation, this), this.start = o(this.start, this), this.scrolled = !0, this.config = this.util().extend(e, this.defaults), this.animationNameCache = new i, this.wowEvent = this.util().createEvent(this.config.boxClass)
            }
            return a.prototype.defaults = {
                boxClass: "wow",
                animateClass: "animated",
                offset: 0,
                mobile: !0,
                live: !0,
                callback: null
            }, a.prototype.init = function() {
                var e;
                return this.element = window.document.documentElement, "interactive" === (e = document.readyState) || "complete" === e ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
            }, a.prototype.start = function() {
                var t, i, n, a;
                if (this.stopped = !1, this.boxes = function() {
                        var e, i, n, a;
                        for (n = this.element.querySelectorAll("." + this.config.boxClass), a = [], e = 0, i = n.length; i > e; e++) t = n[e], a.push(t);
                        return a
                    }.call(this), this.all = function() {
                        var e, i, n, a;
                        for (n = this.boxes, a = [], e = 0, i = n.length; i > e; e++) t = n[e], a.push(t);
                        return a
                    }.call(this), this.boxes.length)
                    if (this.disabled()) this.resetStyle();
                    else
                        for (a = this.boxes, i = 0, n = a.length; n > i; i++) t = a[i], this.applyStyle(t, !0);
                return this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new e(function(e) {
                    return function(t) {
                        var i, n, a, o, s;
                        for (s = [], i = 0, n = t.length; n > i; i++) o = t[i], s.push(function() {
                            var e, t, i, n;
                            for (i = o.addedNodes || [], n = [], e = 0, t = i.length; t > e; e++) a = i[e], n.push(this.doSync(a));
                            return n
                        }.call(e));
                        return s
                    }
                }(this)).observe(document.body, {
                    childList: !0,
                    subtree: !0
                }) : void 0
            }, a.prototype.stop = function() {
                return this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
            }, a.prototype.sync = function() {
                return e.notSupported ? this.doSync(this.element) : void 0
            }, a.prototype.doSync = function(e) {
                var t, i, n, a, o;
                if (null == e && (e = this.element), 1 === e.nodeType) {
                    for (e = e.parentNode || e, a = e.querySelectorAll("." + this.config.boxClass), o = [], i = 0, n = a.length; n > i; i++) t = a[i], s.call(this.all, t) < 0 ? (this.boxes.push(t), this.all.push(t), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(t, !0), o.push(this.scrolled = !0)) : o.push(void 0);
                    return o
                }
            }, a.prototype.show = function(e) {
                return this.applyStyle(e), e.className = e.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(e), this.util().emitEvent(e, this.wowEvent), this.util().addEvent(e, "animationend", this.resetAnimation), this.util().addEvent(e, "oanimationend", this.resetAnimation), this.util().addEvent(e, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(e, "MSAnimationEnd", this.resetAnimation), e
            }, a.prototype.applyStyle = function(e, t) {
                var i, n, a;
                return n = e.getAttribute("data-wow-duration"), i = e.getAttribute("data-wow-delay"), a = e.getAttribute("data-wow-iteration"), this.animate(function(o) {
                    return function() {
                        return o.customStyle(e, t, n, i, a)
                    }
                }(this))
            }, a.prototype.animate = function() {
                return "requestAnimationFrame" in window ? function(e) {
                    return window.requestAnimationFrame(e)
                } : function(e) {
                    return e()
                }
            }(), a.prototype.resetStyle = function() {
                var e, t, i, n, a;
                for (n = this.boxes, a = [], t = 0, i = n.length; i > t; t++) e = n[t], a.push(e.style.visibility = "visible");
                return a
            }, a.prototype.resetAnimation = function(e) {
                var t;
                return e.type.toLowerCase().indexOf("animationend") >= 0 ? (t = e.target || e.srcElement, t.className = t.className.replace(this.config.animateClass, "").trim()) : void 0
            }, a.prototype.customStyle = function(e, t, i, n, a) {
                return t && this.cacheAnimationName(e), e.style.visibility = t ? "hidden" : "visible", i && this.vendorSet(e.style, {
                    animationDuration: i
                }), n && this.vendorSet(e.style, {
                    animationDelay: n
                }), a && this.vendorSet(e.style, {
                    animationIterationCount: a
                }), this.vendorSet(e.style, {
                    animationName: t ? "none" : this.cachedAnimationName(e)
                }), e
            }, a.prototype.vendors = ["moz", "webkit"], a.prototype.vendorSet = function(e, t) {
                var i, n, a, o;
                n = [];
                for (i in t) a = t[i], e["" + i] = a, n.push(function() {
                    var t, n, s, r;
                    for (s = this.vendors, r = [], t = 0, n = s.length; n > t; t++) o = s[t], r.push(e["" + o + i.charAt(0).toUpperCase() + i.substr(1)] = a);
                    return r
                }.call(this));
                return n
            }, a.prototype.vendorCSS = function(e, t) {
                var i, a, o, s, r, l;
                for (r = n(e), s = r.getPropertyCSSValue(t), o = this.vendors, i = 0, a = o.length; a > i; i++) l = o[i], s = s || r.getPropertyCSSValue("-" + l + "-" + t);
                return s
            }, a.prototype.animationName = function(e) {
                var t;
                try {
                    t = this.vendorCSS(e, "animation-name").cssText
                } catch (i) {
                    t = n(e).getPropertyValue("animation-name")
                }
                return "none" === t ? "" : t
            }, a.prototype.cacheAnimationName = function(e) {
                return this.animationNameCache.set(e, this.animationName(e))
            }, a.prototype.cachedAnimationName = function(e) {
                return this.animationNameCache.get(e)
            }, a.prototype.scrollHandler = function() {
                return this.scrolled = !0
            }, a.prototype.scrollCallback = function() {
                var e;
                return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                    var t, i, n, a;
                    for (n = this.boxes, a = [], t = 0, i = n.length; i > t; t++) e = n[t], e && (this.isVisible(e) ? this.show(e) : a.push(e));
                    return a
                }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
            }, a.prototype.offsetTop = function(e) {
                for (var t; void 0 === e.offsetTop;) e = e.parentNode;
                for (t = e.offsetTop; e = e.offsetParent;) t += e.offsetTop;
                return t
            }, a.prototype.isVisible = function(e) {
                var t, i, n, a, o;
                return i = e.getAttribute("data-wow-offset") || this.config.offset, o = window.pageYOffset, a = o + Math.min(this.element.clientHeight, this.util().innerHeight()) - i, n = this.offsetTop(e), t = n + e.clientHeight, a >= n && t >= o
            }, a.prototype.util = function() {
                return null != this._util ? this._util : this._util = new t
            }, a.prototype.disabled = function() {
                return !this.config.mobile && this.util().isMobile(navigator.userAgent)
            }, a
        }()
    }.call(this), ! function(e) {
        e.fn.equalHeights = function() {
            var t = 0,
                i = e(this);
            return i.each(function() {
                var i = e(this).innerHeight();
                i > t && (t = i)
            }), i.css("height", t)
        }, e("[data-equal]").each(function() {
            var t = e(this),
                i = t.data("equal");
            t.find(i).equalHeights()
        })
    }(jQuery), -1 != navigator.appVersion.indexOf("Win") && ! function() {
        function e() {
            var e = !1;
            e && c("keydown", a), w.keyboardSupport && !e && l("keydown", a)
        }

        function t() {
            if (document.body) {
                var t = document.body,
                    i = document.documentElement,
                    n = window.innerHeight,
                    a = t.scrollHeight;
                if ($ = document.compatMode.indexOf("CSS") >= 0 ? i : t, g = t, e(), k = !0, top != self) y = !0;
                else if (a > n && (t.offsetHeight <= n || i.offsetHeight <= n) && (i.style.height = "auto", $.offsetHeight <= n)) {
                    var o = document.createElement("div");
                    o.style.clear = "both", t.appendChild(o)
                }
                w.fixedBackground || b || (t.style.backgroundAttachment = "scroll", i.style.backgroundAttachment = "scroll")
            }
        }

        function i(e, t, i, n) {
            if (n || (n = 1e3), d(t, i), 1 != w.accelerationMax) {
                var a = +new Date,
                    o = a - M;
                if (o < w.accelerationDelta) {
                    var s = (1 + 30 / o) / 2;
                    s > 1 && (s = Math.min(s, w.accelerationMax), t *= s, i *= s)
                }
                M = +new Date
            }
            if (D.push({
                    x: t,
                    y: i,
                    lastX: 0 > t ? .99 : -.99,
                    lastY: 0 > i ? .99 : -.99,
                    start: +new Date
                }), !T) {
                var r = e === document.body,
                    l = function() {
                        for (var a = +new Date, o = 0, s = 0, c = 0; c < D.length; c++) {
                            var u = D[c],
                                d = a - u.start,
                                p = d >= w.animationTime,
                                h = p ? 1 : d / w.animationTime;
                            w.pulseAlgorithm && (h = m(h));
                            var f = u.x * h - u.lastX >> 0,
                                g = u.y * h - u.lastY >> 0;
                            o += f, s += g, u.lastX += f, u.lastY += g, p && (D.splice(c, 1), c--)
                        }
                        r ? window.scrollBy(o, s) : (o && (e.scrollLeft += o), s && (e.scrollTop += s)), t || i || (D = []), D.length ? N(l, e, n / w.frameRate + 1) : T = !1
                    };
                N(l, e, 0), T = !0
            }
        }

        function n(e) {
            k || t();
            var n = e.target,
                a = r(n);
            if (!a || e.defaultPrevented || u(g, "embed") || u(n, "embed") && /\.pdf/i.test(n.src)) return !0;
            var o = e.wheelDeltaX || 0,
                s = e.wheelDeltaY || 0;
            return o || s || (s = e.wheelDelta || 0), !w.touchpadSupport && p(s) ? !0 : (Math.abs(o) > 1.2 && (o *= w.stepSize / 120), Math.abs(s) > 1.2 && (s *= w.stepSize / 120), i(a, -o, -s), void e.preventDefault())
        }

        function a(e) {
            var t = e.target,
                n = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== S.spacebar;
            if (/input|textarea|select|embed/i.test(t.nodeName) || t.isContentEditable || e.defaultPrevented || n) return !0;
            if (u(t, "button") && e.keyCode === S.spacebar) return !0;
            var a, o = 0,
                s = 0,
                l = r(g),
                c = l.clientHeight;
            switch (l == document.body && (c = window.innerHeight), e.keyCode) {
                case S.up:
                    s = -w.arrowScroll;
                    break;
                case S.down:
                    s = w.arrowScroll;
                    break;
                case S.spacebar:
                    a = e.shiftKey ? 1 : -1, s = -a * c * .9;
                    break;
                case S.pageup:
                    s = .9 * -c;
                    break;
                case S.pagedown:
                    s = .9 * c;
                    break;
                case S.home:
                    s = -l.scrollTop;
                    break;
                case S.end:
                    var d = l.scrollHeight - l.scrollTop - c;
                    s = d > 0 ? d + 10 : 0;
                    break;
                case S.left:
                    o = -w.arrowScroll;
                    break;
                case S.right:
                    o = w.arrowScroll;
                    break;
                default:
                    return !0
            }
            i(l, o, s), e.preventDefault()
        }

        function o(e) {
            g = e.target
        }

        function s(e, t) {
            for (var i = e.length; i--;) E[H(e[i])] = t;
            return t
        }

        function r(e) {
            var t = [],
                i = $.scrollHeight;
            do {
                var n = E[H(e)];
                if (n) return s(t, n);
                if (t.push(e), i === e.scrollHeight) {
                    if (!y || $.clientHeight + 10 < i) return s(t, document.body)
                } else if (e.clientHeight + 10 < e.scrollHeight && (overflow = getComputedStyle(e, "").getPropertyValue("overflow-y"), "scroll" === overflow || "auto" === overflow)) return s(t, e)
            } while (e = e.parentNode)
        }

        function l(e, t, i) {
            window.addEventListener(e, t, i || !1)
        }

        function c(e, t, i) {
            window.removeEventListener(e, t, i || !1)
        }

        function u(e, t) {
            return (e.nodeName || "").toLowerCase() === t.toLowerCase()
        }

        function d(e, t) {
            e = e > 0 ? 1 : -1, t = t > 0 ? 1 : -1, (C.x !== e || C.y !== t) && (C.x = e, C.y = t, D = [], M = 0)
        }

        function p(e) {
            if (e) {
                e = Math.abs(e), x.push(e), x.shift(), clearTimeout(A);
                var t = x[0] == x[1] && x[1] == x[2],
                    i = h(x[0], 120) && h(x[1], 120) && h(x[2], 120);
                return !(t || i)
            }
        }

        function h(e, t) {
            return Math.floor(e / t) == e / t
        }

        function f(e) {
            var t, i, n;
            return e *= w.pulseScale, 1 > e ? t = e - (1 - Math.exp(-e)) : (i = Math.exp(-1), e -= 1, n = 1 - Math.exp(-e), t = i + n * (1 - i)), t * w.pulseNormalize
        }

        function m(e) {
            return e >= 1 ? 1 : 0 >= e ? 0 : (1 == w.pulseNormalize && (w.pulseNormalize /= f(1)), f(e))
        }
        var g, v = {
                frameRate: 150,
                animationTime: 500,
                stepSize: 150,
                pulseAlgorithm: !0,
                pulseScale: 6,
                pulseNormalize: 1,
                accelerationDelta: 20,
                accelerationMax: 1,
                keyboardSupport: !0,
                arrowScroll: 50,
                touchpadSupport: !0,
                fixedBackground: !0,
                excluded: ""
            },
            w = v,
            b = !1,
            y = !1,
            C = {
                x: 0,
                y: 0
            },
            k = !1,
            $ = document.documentElement,
            x = [120, 120, 120],
            S = {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                spacebar: 32,
                pageup: 33,
                pagedown: 34,
                end: 35,
                home: 36
            },
            w = v,
            D = [],
            T = !1,
            M = +new Date,
            E = {};
        setInterval(function() {
            E = {}
        }, 1e4);
        var A, H = function() {
                var e = 0;
                return function(t) {
                    return t.uniqueID || (t.uniqueID = e++)
                }
            }(),
            N = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(e, t, i) {
                    window.setTimeout(e, i || 1e3 / 60)
                }
            }(),
            P = /chrome/i.test(window.navigator.userAgent),
            O = "onmousewheel" in document;
        O && P && (l("mousedown", o), l("mousewheel", n), l("load", t))
    }();