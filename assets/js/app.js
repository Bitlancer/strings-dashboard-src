
  var strings = {
    
    events : function() {
      // Tooltips
      if($('.tooltip').length){$('.tooltip').tooltip({ position: { my: "left+2 top+12", at: "left top+12" } })}
      // Modals
      if($('.modal')){
        $('.modal').click(function() {
          $($(this).attr('data-src')).dialog({
            modal: true,
            title: $(this).attr('data-title') || 'No Title',
            width: $(this).attr('data-width') || '360',
            dialogClass:'strings-modal',
            open: function() {
              $('body > section, body > nav, body > header').addClass('blur');
            },
            close: function(){
              $('.blur').removeClass('blur');
            }
          });
        }); 
        if($('.cta.disabled')){
          $('.cta.disabled').parents('form').find(':password').keyup(function() {
            if($(this).val().length > 5){
              $(this).parents('form').find('.disabled').toggleClass('disabled not-disabled');
            } else {
              $(this).parents('form').find('.not-disabled').toggleClass('not-disabled disabled');
            }
          });
        }
      }
      // Close messages
      $('ul#messages > li > a.close').live('click', function() {
        if($('ul#messages > li > a.close').length == 1){
          $(this).parents('#messages').remove();
        } else {
          $(this).parent().remove();
        }
      });
      // Profile menu
      $('header > div > div#profile').live('click', function(event) {
        event.stopPropagation();
        if($(this).hasClass('active')){$(this).removeClass('active')}else{$(this).addClass('active')}
      });
      $('body').live('click',function() {
        if($('header > div > div#profile').hasClass('active')){$('header > div > div#profile').click();}
        if($('ul.action-menu.active')){$('ul.action-menu').removeClass('active');}
      });
      // Action menus
      if($('ul.action-menu')){
        $('ul.action-menu').on('click',function(event) {
          event.stopPropagation();
          if($(this).attr('data-width')){
            $(this).children('span').width($(this).attr('data-width'))
          }
          var align = ($(this).outerWidth() - $(this).children('span').outerWidth()) * .5;
          $(this).children('span').css({
            'right':align
          });
          if(!$(this).hasClass('active')){
            $(this).addClass('active');
          } else {
            $(this).removeClass('active');
          }
        });
      }
    },
    
    interface : {
      
      loaded : function() {
        if($('body').hasClass('loading')){
          $('body').removeClass('loading');
        }
      },
      
      messages : function(type,title,msg) {
        if(!title){title=type}
        // Check for messages container
        if(!$('ul#messages').length){
          if($('div#content.panel').length){
            var contentArea = $('body > section > div#content.panel > div').first();
          } else {
            var contentArea = $('body > section');
          }
          contentArea.prepend('<ul id="messages"></ul>');
        }
        // Create message
        $('body section ul#messages').prepend('<li class="'+type+'"><span>'+title+'</span>'+msg+'<a class="close"></a></span>');
        $('html, body').animate({scrollTop:0}, 'medium');
      },
      
      enable : {
        
        ui : function() {
          // Temporary fix until app uses php includes
          $('body > header').load('assets/html/header.html');
          $('body > nav').load('assets/html/nav.html', function(response, status, xhr){
            if (status == "success" && $('body > nav > span#'+config.name).length) {$('body > nav > span#'+config.name).addClass('active')}
          });
        },
        
        tables : function(){
          if($('table[data-type="datatable"]')){
            $('table[data-type="datatable"]').not('pre > table').each(function() {
              $(this).dataTable({
                "sPaginationType": "full_numbers",
                "aLengthMenu": [[2, 10, 25, 50, 100, 200, -1], [2, 10, 25, 50, 100, 200, "All"]],
                "iDisplayLength": parseInt($(this).attr('data-length')) || 10,
                "oLanguage": { "sSearch": "" }
              });
              $('.dataTables_filter input').attr('placeholder','Search');
            });
          }
        }
        
        
      }
      
    }
    
  };
  
  $(document).ready(function() {
    strings.interface.enable.ui();
    strings.events();
    strings.interface.enable.tables();
  });
  
  $(window).load(function() {
    strings.interface.loaded();
  });

