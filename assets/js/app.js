var strings = {

  client : {
    init : function() {
      if(!$('header').html().length) strings.client.include();
      strings.events.clicks();
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
    },
    actionmenu : function() {
      $('ul.action-menu').live('click',function(event) {
        event.stopPropagation();
        var align = ($(this).outerWidth() - $(this).children('span').outerWidth()) * 0.5;
        if($(this).attr('data-width')){
          $(this).children('span').width($(this).attr('data-width'));
          align = 0;
        }
        $(this).children('span').css('right',align);
        $(this).toggleClass('active');
      });
      $('body').click(function() {
        $('ul.action-menu.active').removeClass('active');
      });
    }
  },
  
  events : {
    clicks : function() {
      // Close message boxes
      $('ul#messages li a.close').live('click', function() { $(this).parent().remove() });
      // Tooltips
      $('.tooltip').tooltip({ position: { my: "left+2 top+12", at: "left top+12" } });
      // Action! Menus
      if($('ul.action-menu').length) strings.ui.actionmenu();
    }
  }
  
};

$(document).ready(strings.client.init());

$(window).load(strings.client.loaded());