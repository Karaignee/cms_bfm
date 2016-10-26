  
/*navbar logo*/  
  
jQuery(window).scroll(function(){
    var fromTopPx = 1; // distance to trigger
    var scrolledFromtop = jQuery(window).scrollTop();
    if(scrolledFromtop > fromTopPx){
        jQuery('a.navbar-brand').addClass('scrolled');
    }else{
        jQuery('a.navbar-brand').removeClass('scrolled');
    }
});


