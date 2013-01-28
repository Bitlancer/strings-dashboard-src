var stringsUI = {
  
  profileMenu : function() {
    var menu = $('header > div > div#profile');
    menu.click(function(event) {
      event.stopPropagation();
      if(!$(this).hasClass('active')){
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
    $('body').click(function() {
      if(menu.hasClass('active')){
        menu.click();
      }
    });
  },
  
  messages : function(type,msg) {
    var message = $('body > section > ul#messages');
    if(!message.length){
      $('body > section').prepend('<ul id="messages"></ul>');
    }
    $('body > section > ul#messages').prepend('<li class="'+type+'"><span>'+type+'</span>'+msg+'<a class="close"></a></span>');
    $("html").getNiceScroll().resize();
  },
  
  loadPage : function(url,callback) {
    url = url.replace('script','').replace('<','').replace('>','').replace('&gt;','').replace('&lt;','');
    var section = $('body > section');
    var filename = url.replace('#','').replace('assets/html/','').replace('.html','').replace('.php','');
    section.load(url.replace('#',''), function(response, status, xhr){
      if(status == 'success'){
        if($('body > nav > a#'+filename).length && !$('body > nav > a#'+filename).hasClass('active')){
          $('body > nav > a.active').removeClass('active');
          $('a#'+filename).addClass('active');
        }
        $("html").getNiceScroll().resize();
      }
      if(status == 'error'){
        stringsUI.messages('error',xhr.status + " " + xhr.statusText+'<br/><small>'+url.replace('#','')+'</small>');
      }
      if($('body').hasClass('loading')){
        $('body').removeClass('loading');
      }
      stringsUI.tables();
    });
  },
  
  modalClose : function() {
    $('div#modal a.close').click();
  },
  
  modal : function() {
    function modalPosition() {
      var box = $('div#overlay > div#modal');
      box.css({
        marginTop: ($(window).height() - box.height()) * .3
      });
    }
    $('.modal[data-src]').live('click', function() {
      var src = $(this).attr('data-src');
      var overlay = $('body > div#overlay');
      if(!overlay.length){
        $('body').append('<div id="overlay"><div id="modal"></div></div>');
      }
      if($(this).attr('data-title')){
        $('div#modal').append('<h2>'+$(this).attr('data-title')+'<a class="close"></a></h2>');
      } else {
        $('div#modal').append('<a class="close"></a>');
      }
      $('div#overlay > div#modal').append('<span>'+$(src).html()+'</span>');
      if($(this).attr('data-padding') && $(this).attr('data-padding') == 'false'){
        $('div#overlay > div#modal > span').css('padding','0px');
      }
      if($(this).attr('data-width')){
        $('div#overlay > div#modal').width($(this).attr('data-width'));
      }
      modalPosition();
      $('div#overlay').show();
      console.log('Modal opened. Close with stringsUI.modalClose()');
    });
  },

  tables : function() {
    if($('table th[data-sort]').length){
      $('table').each(function() {
        $(this).stupidtable();
        $(this).find('[data-sort]').addClass('sort');
      });
    }
  },
  
  enableFullscreen : function() {
    function launchFullScreen(element) {
      if(element.requestFullScreen) {
        element.requestFullScreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      }
    }
    
    function cancelFullscreen() {
      if(document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
    $('#fullscreen').on('click',function() {
      if(!$(this).hasClass('enabled')){
        launchFullScreen(document.documentElement);
        $(this).addClass('enabled');
        $("html").getNiceScroll().resize();
      } else {
        cancelFullscreen();
        $(this).removeClass('enabled');
        $("html").getNiceScroll().resize();
      }
    });
  }
  
};

$(document).ready(function() {
  stringsUI.profileMenu();
  stringsUI.modal();
  stringsUI.enableFullscreen();
  // Live events
  $(function() {
    $('ul#messages a.close').live('click',function() {
      $(this).parent().remove();
    });
    $('section h2 a.view-source').live('click', function() {
      syntaxComplete = false;
      function syntax() {
        if(syntaxComplete === false){
          syntaxComplete = true;
          Rainbow.color();
        }
      }
      syntax();
      $(this).parents('span').find('pre').show();
    });
    $('div#modal a.close').live('click', function() {
      $(this).parents('div#overlay').remove();
    });
    $("html").niceScroll({
      'cursorborder':'0',
      'background':'rgba(0,0,0,0.2)',
      'cursoropacitymin':'.3',
      'zindex':'996',
      'autohidemode':'cursor'
    });
  });
});

$(window).load(function() {
  if(!$('body > section').text().length && !window.location.hash){
    stringsUI.loadPage('assets/html/dashboard.html');
  } else {
    stringsUI.loadPage(window.location.hash);
  }
});

window.onhashchange = function() {
  stringsUI.loadPage(window.location.hash);
}