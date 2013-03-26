var account = {
  
  tabs : function() {
    $('#tabs a').live('click',function() {
      $('form div[data-id]').hide();
      $('form div[data-id='+$(this).attr('data-id')+']').show();
    });
  },
  
  wallpaper : function() {
    var w = ($('#preload img').width() / $(window).width()) * 10;
    var h = ($('#preload img').height() / $(window).height()) * 10;
    if(h < w) $('body').attr('class','portrait');
    if(h > w) $('body').attr('class','landscape');
  },
  
  init : function() {
    account.tabs();
    if($('.loading').length){
      var preload;
      preload = setInterval(function() {
        if($('div#preload img').height() > 300) {
          account.wallpaper();
          clearInterval(preload);
        } 
      }, 3000);
    }
  }
  
};

(function($) {
  account.init();
  $(window).resize(function() {
    setTimeout(function() {
      account.wallpaper();
    }, 50);
  });
})(jQuery);