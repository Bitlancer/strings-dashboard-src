var account = {
  
  tabs : function() {
  },
  
  wallpaper : function() {
    height = $(window).height();
    width = $(window).width() * .75;
    if(height > width) $('body').attr('class','portrait');
    if(height < width) $('body').attr('class','landscape');
  },
  
  init : function() {
    account.wallpaper();
    account.tabs();
    if($('.loading')){
      var preload;
      preload = setInterval(function() {
        if($('div#preload img').height() > 300) $('body').removeClass('loading'); clearInterval(preload);
      }, 2000);
    }
  }
  
};

(function($) {
  account.init();
  $(window).resize(function() {
    setTimeout(function() {
      account.wallpaper();
    }, 300);
  });
})(jQuery);