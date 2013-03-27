var strings = {

  client : {
    init : function() {
      if(!$('header').html().length) strings.client.include();
    },
    loaded : function() {
      if($('body').hasClass('loading')) $('body').removeClass('loading');
    },
    include : function() {
      $('body > header').load('assets/html/header.html');
      $('body > nav').load('assets/html/nav.html', function(response, status, xhr){
        if (status == "success" && typeof config && $('body > nav > span#'+config.name).length) $('body > nav > span#'+config.name).addClass('active');
      });
    }
  },
  
  ui : {
    messages : function(type,title,message) {
      if(!title) title = type;
      if(!$('ul#messages').length) {
        var container = $('body > section > div');
        if($('section > div.columns').length) container = $('body > section > div.columns > div').first();
        container.prepend('<ul id="messages"></ul>');
      }
      $('body section ul#messages').prepend('<li class="'+type+'"><span>'+title+'</span>'+message+'<a class="close"></a></span>');
    }
  }
  
};

$(document).ready(strings.client.init());

$(window).load(strings.client.loaded());