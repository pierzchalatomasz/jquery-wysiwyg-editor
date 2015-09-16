$.fn.wysiwygEditor = function() {

  'use strict'

  var textarea = this;

  var randomID = 'wysiwygEditor-' + Math.floor(Math.random() * 1000000);

  // Actions array
  var actions = [
    {
      title: 'undo'
    },
    {
      title: 'repeat',
      action: 'redo',
      break: true
    },
    {
      title: 'bold',
      nodeName: 'B'
    },
    {
      title: 'italic',
      nodeName: 'I',
      break: true
    },
    {
      title: 'align-left',
      action: 'justifyLeft'
    },
    {
      title: 'align-center',
      action: 'justifyCenter'
    },
    {
      title: 'align-right',
      action: 'justifyRight'
    },
    {
      title: 'align-justify',
      action: 'justifyFull',
      break: true
    },
    {
      title: 'list-ol',
      action: 'insertOrderedList'
    },
    {
      title: 'list-ul',
      action: 'insertUnorderedList',
      break: true
    },
    {
      title: 'link',
      action: 'createLink',
      value: true,
      desc: 'Insert link URL'
    },
    {
      title: 'image',
      action: 'insertImage',
      value: true,
      desc: 'Insert image URL'
    }
  ];

  // Get action
  Object.prototype.getAction = function() {
    if(typeof(this.action) != 'undefined')
      return this.action;
    if(typeof(this.title) != 'undefined')
      return this.title;
  };

  // Hide original textarea
  textarea.css('display', 'none');
  textarea.addClass(randomID);

  // Create markup
  var markup = '';
  markup += '<div id="' + randomID + '" class="wysiwygEditor-wrapper">';
  markup +=   '<div class="wysiwygEditor-toolbar">';
  markup +=     '<ul>';

  // Display all tools
  $.each(actions, function(i) {
    markup +=       '<li>';
    markup +=         '<a href class="wysiwygEditor-' + actions[i].title + '" title="' + actions[i].title.toUpperCase() + '">';
    markup +=           '<i class="fa fa-' + actions[i].title + '"></i>';
    markup +=        '</a>';
    markup +=       '</li>';

    // Break
    if(typeof(actions[i].break) != 'undefined') {
      markup +=     '<li class="break">|</li>'
    }
  });

  markup +=     '</ul>';
  markup +=   '</div>';
  markup +=   '<div class="wysiwygEditor-editArea">';
  markup +=     '<iframe src="about:blank" height="300"></iframe>';
  markup +=   '</div>';
  markup +=   '<div class="wysiwygEditor-footer">';
  markup +=   'HTML';
  markup +=   '</div>';
  markup += '</div>';

  // Create new wysiwygEditor
  textarea.before(markup);

  var iframe = $('#' + randomID).find('iframe');
  var editArea = iframe[0].contentDocument;

  // Set iframe width
  iframe.width(iframe.parent().width());
  $(window).resize(function() {
    iframe.width(iframe.parent().width());
  });

  // Set iframe body to editable
  $(editArea.body).attr('contenteditable', true); // @not working Firefox

  // Copy data from textarea to iframe
  $(editArea.body).html(textarea.val());

  // Bind click events for toolbar
  $.each(actions, function(i) {
    $('#' + randomID).find('.wysiwygEditor-' + actions[i].title).bind('click', function(e) {
      e.preventDefault();
      editArea.body.focus();
      if(typeof(actions[i].value) != 'undefined')
        editArea.execCommand(actions[i].getAction(), false, prompt(actions[i].desc));
      else
        editArea.execCommand(actions[i].getAction(), false, null);
    });
  });

  $('.wysiwygEditor-toolbar').bind('mouseover', function() {
    editArea.body.blur();
  });

  // Trigger contentChanged
  $.each(['click', 'keyup'], function() {
    $(editArea.body).bind(this, function(e) {
      if($(this).html() != textarea.val())
        $(this).trigger('contentChanged');

      // Update footer element indicator
      var footerElementIndicator = '';
      var elements = $(editArea.getSelection().anchorNode).parents();
      for(var i = elements.length - 1; i >= 0; i--) {
        footerElementIndicator += elements[i].nodeName;
        if(i != 0)
          footerElementIndicator+= ' &raquo; ';
      }
      $('#' + randomID).find('.wysiwygEditor-footer').html(footerElementIndicator);
      // console.log(footerElementIndicator.split(' &raquo; '));

      backlightActiveTools(footerElementIndicator.split(' &raquo; '));
    });
  });

  // Textarea synchronization
  $(editArea.body).on('contentChanged', function() {
    textarea.val($(this).html());
  });

  function backlightActiveTools(elements) {
    $.each(actions, function() {
      var action = this;
      var match = false;
      $.each(elements, function() {
        if(typeof(action.nodeName) != 'undefined' && action.nodeName === this)
          match = true;
      });
      if(match)
        $('#' + randomID).find('.wysiwygEditor-' + action.title).addClass('action-active');
      else
        $('#' + randomID).find('.wysiwygEditor-' + action.title).removeClass('action-active');
    });
  }

  return this;
}
