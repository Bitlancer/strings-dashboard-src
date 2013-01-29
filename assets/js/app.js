
  var strings = {
    
    events : function() {
      // Tooltips
      if($('.tooltip').length){$('.tooltip').tooltip()}
      // Modals
      if($('.modal')){
        var modalConfig = {
          modal: true,
          title: $(this).attr('data-title') || 'No Title',
          width: $(this).attr('data-width') || '360'
        }
        $('.modal').click(function() {
          $($(this).attr('data-src')).dialog(modalConfig);
        }); 
      }
      // Close messages
      $('ul#messages > li > a.close').live('click', function() {$(this).parent().remove();});
      // Profile menu
      $('header > div > div#profile').live('click', function(event) {
        event.stopPropagation();
        if($(this).hasClass('active')){$(this).removeClass('active')}else{$(this).addClass('active')}
      });
      $('body').live('click',function() {
        if($('header > div > div#profile').hasClass('active')){$('header > div > div#profile').click();}
      });
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
        if(!$('section > ul#messages').length){
          $('body > section').prepend('<ul id="messages"></ul>');
        }
        // Create message
        $('body > section > ul#messages').prepend('<li class="'+type+'"><span>'+title+'</span>'+msg+'<a class="close"></a></span>');
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
            var tableConfig = {
              "sPaginationType": "full_numbers",
              "aLengthMenu": [[2, 10, 25, 50, 100, 200, -1], [2, 10, 25, 50, 100, 200, "All"]],
              "iDisplayLength":3,
              "oLanguage": { "sSearch": "" }
            }
            $('table[data-type="datatable"]').not('pre > table').each(function() {
              $(this).dataTable(tableConfig);
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

