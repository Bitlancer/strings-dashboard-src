var strings = {

  client : {
    init : function() {
      if(!$('header').html().length) strings.client.include();
    },
    loaded : function() {
      if($('body').hasClass('loading')) $('body').removeClass('loading');
      strings.ui.tables();
      strings.events.forms();
      strings.events.clicks();
      strings.ui.actionmenu();
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
    },
    modal : function(obj) {
      var modal = $(obj.attr('data-src'));
      var opt = {
        modal: true,
        title: obj.attr('data-title') || 'No Title',
        width: obj.attr('data-width') || '360',
        dialogClass:'strings-modal',
        open: function() {
          if(!$('body').hasClass('blur')) $('body').addClass('blur');
          if($('.ui-dialog .autocomplete').length) $('.ui-dialog input.maininput').parents('.ui-dialog-content').css('overflow','visible');
          console.log(modal);
        },
        close: function() {
          if($('body').hasClass('blur')) $('body').removeClass('blur');
          if($('.ui-dialog .autocomplete').length) $('.ui-dialog input.maininput').parents('.ui-dialog-content').css('overflow','auto');
        }
      };
      modal.dialog(opt).dialog('open');
      modal.find('.cta:not(".cancel,.primary")').bind('click', function() {
        modal.dialog('close');
      });
    },
    tables : function() {
      $('table[data-type="datatable"]').not('.example table').each(function() {
        $(this).dataTable({
          "sPaginationType": "full_numbers",
          "aLengthMenu": [[2, 10, 25, 50, 100, 200, -1], [2, 10, 25, 50, 100, 200, "All"]],
          "iDisplayLength": parseInt($(this).attr('data-length')) || 10,
          "oLanguage": { "sSearch": "" },
          "sDom": '<"top"f>rt<"bottom"p><"clear">',
          "fnInitComplete": function(oSettings) {
            var parent = $(this).parents('.dataTables_wrapper');
            if($(this).attr('data-cta')) parent.find('.top').prepend($(this).attr('data-cta'))
            if($(this).attr('data-title')) parent.find('.top').prepend('<h2>'+$(this).attr('data-title')+'</h2>');
            parent.find('.dataTables_filter input').attr('placeholder','Search');
          }
        });
      });
      //$('.dataTables_length').remove();
    }
  },
  
  events : {
    clicks : function() {
      // close message boxes
      $('ul#messages li a.close').live('click', function() { $(this).parent().remove() });
      // tooltips
      $('.tooltip').tooltip({ position: { my: "left+2 top+14", at: "left top+14" } });
      // modal windows
      $('.modal').click(function(){strings.ui.modal($(this))});
    },
    forms : function() {
      // count type validation
      $('.cta.disabled').each(function() {
        $(this).parents('form').find(':password').last().keyup(function() {
          if($(this).val().length > 5){
            $(this).parents('form').find('.disabled').toggleClass('disabled not-disabled');
            if($(this).parents('form').find(':password').length > 1) {
              var p1 = $(this).parents('form').find(':password').first().val();
              var p2 = $(this).parents('form').find(':password').last().val();
              if(p1 !== p2) $(this).parents('form').find('.not-disabled').toggleClass('not-disabled disabled');
            }
          } else {
            $(this).parents('form').find('.not-disabled').toggleClass('not-disabled disabled');
          }
        });
      });
      // auto-complete
      $('.autocomplete').not('.example > .autocomplete').each(function() {
        var json = $(this).attr('data-src') || null;
        var placeholder = $(this).attr('data-placeholder') || 'Enter a tag...';
        var width = $(this).attr('data-width') || '500px';
        var options = {
          json_url: json,
          width: width,
          cache: false,
          height: "10",
          newel: true,
          addontab: true,
          addoncomma: true,
          firstselected: false,
          filter_case: false,
          filter_selected: false,
          filter_begin: false,
          filter_hide: true,
          complete_text: placeholder,
          select_all_text:  null,
          maxshownitems: 30,
          maxitems: 150,
          oncreate: null,
          onselect: null,
          onremove: null,
          attachto: null,
          delay: 200,
          input_tabindex: 0,
          input_min_size: 1,
          input_name: "",
          bricket: true
        }
        $(this).fcbkcomplete(options);
      });
    }
  }
  
};

$(document).ready(strings.client.init());

$(window).load(strings.client.loaded());