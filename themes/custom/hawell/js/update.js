jQuery(document).ready(function($) {

  $('.navi-bg-image').each(function(index, el) {

    var attr_bg = $(this).attr('data-bg-image');

    if(typeof attr_bg !== typeof undefined && attr_bg !== false) {

      $(this).css('background-image', 'url('+attr_bg+')');

    }

  });



  //ONE PAGE MENU

  if($('#nav-onepage').length) {

    $('.page-section').each(function(index, el) {

      if($(this).attr('data-title')) {

        var title = $(this).attr('data-title');

        var id = $(this).attr('id');

        var link = '<li><a href="#'+id+'"><div class="main-menu-title">'+title+'</div></a></li>';

        $('#nav-onepage').append(link);

      }

    });

  }

  //ONE PAGE NAV  ---------------------------------------------------------------------------

    var top_offset = $('header').height() - 1; // get height of fixed navbar



    $('#nav-onepage').onePageNav({

        currentClass: 'current',

        changeHash: false,

        scrollSpeed: 700,

        scrollOffset: top_offset,

        scrollThreshold: 0.5,

        filter: '',

        easing: 'swing',

        begin: function() {

          //I get fired when the animation is starting

        },

        end: function() {

          //I get fired when the animation is ending

        },

        scrollChange: function($currentListItem) {

          //I get fired when you enter a section and I pass the list item of the section

        }

    });



    //NAV SIDEBAR------------------------------------------------------------------

    var top_offset = $('header').height() - 1; // get height of fixed navbar



    $('#nav-sidebar').onePageNav({

         currentClass: 'current',

         changeHash: false,

         scrollSpeed: 700,

         scrollOffset: top_offset,

         scrollThreshold: 0.5,

         filter: '',

         easing: 'swing',

         begin: function() {

             //I get fired when the animation is starting

         },

         end: function() {

             //I get fired when the animation is ending

         },

         scrollChange: function($currentListItem) {

             //I get fired when you enter a section and I pass the list item of the section

         }

     });



    //SIDEBAR STICKY---------------------------------------------     

    var offsetFooter = $('footer').height() + 250;

    // DM Menu

    jQuery('#sidebar-stiky').affix({

        offset: {

             top: 300, //top offset for header 1 for others headers it will have other value

             bottom: offsetFooter

        }

    });



    //COUNTDOWN -----------------------------------------------------------------------------

    $('.clock2').each(function(index, el) {

        var date = $(this).data('date');
        $(this).countdown(date).on('update.countdown', function(event) {

            var $this = $(this).html(event.strftime('' + '<div class="col-xs-12 col-sm-6 col-md-3"><div class="countdown-item-container2"><span class="countdown-amount">%D</span><span class="countdown-period">day%!D</span></div></div>' + '<div class="col-xs-12 col-sm-6 col-md-3"><div class="countdown-item-container2"><span class="countdown-amount">%H</span><span class="countdown-period">hour%!H</span></div></div>' + '<div class="col-xs-12 col-sm-6 col-md-3"><div class="countdown-item-container2"><span class="countdown-amount">%M</span><span class="countdown-period">minute%!M</span></div></div>' + '<div class="col-xs-12 col-sm-6 col-md-3"><div class="countdown-item-container2"><span class="countdown-amount">%S</span><span class="countdown-period">second%!S</span></div></div>'));

        });

    });

    $('.clock').each(function(index, el) {

        var date = $(this).data('date');
        $(this).countdown(date).on('update.countdown', function(event) {

            var $this = $(this).html(event.strftime('' + '<div class="col-xs-12 col-sm-6 col-md-3"><div class="countdown-item-container"><span class="countdown-amount">%D</span><span class="countdown-period">day%!D</span></div></div>' + '<div class="col-xs-12 col-sm-6 col-md-3"><div class="countdown-item-container"><span class="countdown-amount">%H</span><span class="countdown-period">hour%!H</span></div></div>' + '<div class="col-xs-12 col-sm-6 col-md-3"><div class="countdown-item-container"><span class="countdown-amount">%M</span><span class="countdown-period">minute%!M</span></div></div>' + '<div class="col-xs-12 col-sm-6 col-md-3"><div class="countdown-item-container"><span class="countdown-amount">%S</span><span class="countdown-period">second%!S</span></div></div>'));

        });

    });

    

    //Shopping cart

    if($('#menu-cart .count-cart-item').length) {

        Updatecart ();

        $('#menu-cart').click(function(event) {

            /* Act on the event */

            $('.shopping-cart').removeClass('display-none');

        });

        // Get the modal cart

        var modal_cart = document.getElementsByClassName("shopping-cart")[0];

        // Get the <span> element that closes the modal

        var span_close = document.getElementsByClassName("close")[0];

        span_close.onclick = function() {

            $('.shopping-cart').addClass('display-none');

        }

        // When the user clicks anywhere outside of the modal, close it

        window.onclick = function(event) {

            if (event.target == modal_cart) {

                $('.shopping-cart').addClass('display-none');

            }

        }

    }



});



function Updatecart () {

    if(jQuery('.shopping-cart .num-items').text()) {

        var l = jQuery('.shopping-cart .num-items').text();

    } else {

        var l = 0;

    }   

    jQuery('#menu-cart .count-cart-item').text(l);

}