$(document).ready(function(){
    
    /*** SLIDESHOW***/
    
    $(".slide-btn-1").click(function(){
        $(".slide-btn-1").addClass("active");
        $(".slide-btn-2").removeClass("active");
        $(".slide-btn-3").removeClass("active");
        
        $(".hero-text-box").addClass("animated fadeIn");
        $(".hero-text-box").css("display", "block");
        $(".hero-text-box-2").css("display", "none");
        $(".hero-text-box-3").css("display", "none");
        
        $("header").css({
            "background-image": "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(resources/css/img/game-1-forza.jpg)"
        });
    });
    
    
    $(".slide-btn-2").click(function(){
        $(".slide-btn-1").removeClass("active");
        $(".slide-btn-3").removeClass("active");
        $(".slide-btn-2").addClass("active");
        
        $(".hero-text-box-2").addClass("animated fadeIn");
        $(".hero-text-box").css("display", "none");
        $(".hero-text-box-3").css("display", "none");
        $(".hero-text-box-2").css("display", "block");
        
        $("header").css({
            "background-image": "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(resources/css/img/game-2-cyberpunk.jpg)"
        });
    });
    
    $(".slide-btn-3").click(function(){
        $(".slide-btn-1").removeClass("active");
        $(".slide-btn-2").removeClass("active");
        $(".slide-btn-3").addClass("active");
        
        $(".hero-text-box-3").addClass("animated fadeIn");
        $(".hero-text-box").css("display", "none");
        $(".hero-text-box-2").css("display", "none");
        $(".hero-text-box-3").css("display", "block");
        
        $("header").css({
            "background-image": "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(resources/css/img/game-3-projecta.jpg)"
        });
    });
    
    /*** SMOOTH SCROLLING ***/
    
    // Select all links with hashes
        $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
          && 
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000, function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              };
            });
          }
        }
      });
    
    /*-----------------------------------------*/
    /* FOR STICKY NAVIGATION */
    /*-----------------------------------------*/
    
    $('.section-features').waypoint(function(direction){
        if(direction== "down"){
            $('nav').addClass('sticky-nav');
        }
        else{
            $('nav').removeClass('sticky-nav');
        }
    }, {
        offset: '55px'
    });
});