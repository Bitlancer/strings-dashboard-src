var strings = {

  init : function() {
    if($('body').hasClass('loading')) {
      $('body > header').load('assets/html/header.html');
      $('body > nav').load('assets/html/nav.html', function(response, status, xhr){
        if (status == "success" && typeof config && $('body > nav > span#'+config.name).length) $('body > nav > span#'+config.name).addClass('active');
      });
      $('body').removeClass('loading');
    }
  }
  
};

$(document).ready(function() {
});

$(window).load(strings.init());