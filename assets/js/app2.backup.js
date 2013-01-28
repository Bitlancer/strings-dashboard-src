$(function() {
  var stringsUI = {
    
    liveEvents : function() {
      // Custom scrollbars
      $("html").niceScroll({
        'cursorborder':'0',
        'background':'rgba(0,0,0,0.2)',
        'cursoropacitymin':'.4',
        'zindex':'996',
        'autohidemode':'cursor',
        'scrollspeed':20
      });
      // Close messages
      $('ul#messages > li > a.close').live('click', function() {
        $(this).parent().remove();
      });
      // User profile menu
      $('header > div > div#profile').live('click', function(event) {
        event.stopPropagation();
        if(!$(this).hasClass('active')){
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
      });
      $('body').live('click',function() {
        if($('header > div > div#profile').hasClass('active')){
          $('header > div > div#profile').click();
        }
      });
      // Tooltips
      $('.tooltip').tooltip();
      // Modals
      $('.modal').click(function() {
        $($(this).attr('data-src')).dialog({
            modal: true,
            title: $(this).attr('data-title') || 'No Title',
            width: $(this).attr('data-width') || '360'
        });
      });
    },
    
    buildInterface : function() {
      // Enable Data Tables
      if($('table')){
        $('table').not('pre > table').each(function() {
          $(this).dataTable({
             "sPaginationType": "full_numbers",
             "aLengthMenu": [[2, 10, 25, 50, 100, 200, -1], [2, 10, 25, 50, 100, 200, "All"]],
             "iDisplayLength":"2",
             "oLanguage": { "sSearch": "" }
          });
          $('.dataTables_filter input').attr('placeholder','Search');
        });
      }
      // Force refresh of CSS while in development
      $('head > link#style').each(function() {
        var href = $(this).attr('href');
        var randomString = (Math.random() * 3982326);
        $(this).attr('href',href+'?v='+Math.round(randomString));
      });
      // Temporary fix until app uses php includes
      $('body > header').load('assets/html/header.html');
      $('body > nav').load('assets/html/nav.html', function(response, status, xhr){
        if (status == "success") {
          if($('body > nav > a#'+config.name)){
            $('body > nav > a#'+config.name).addClass('active'); 
          }
        }
      });
    },
  
    loaded : function() {
      if($('body').hasClass('loading')){
        $('body').removeClass('loading');
      }
    },
    
    messages : function(type,title,msg) {
      if(!title){title=type}
      // Check for messages container
      if(!$('section > ul#messages').length){
        $('body > section').prepend('<ul id="messages"></ul>');
      }
      // Create message
      $('body > section > ul#messages').prepend('<li class="'+type+'"><span>'+title+'</span>'+msg+'<a class="close"></a></span>');
      $('html, body').animate({scrollTop:0}, 'medium');
    }
    
  };
  
  $(document).ready(function() {
    stringsUI.buildInterface();
    stringsUI.liveEvents();
  });
  
  $(window).load(function() {
    stringsUI.loaded();
  });
  
  $(window).resize(function() {
    t = setTimeout(function(){
      $("html").getNiceScroll().resize();
    }, 500);
  });
});