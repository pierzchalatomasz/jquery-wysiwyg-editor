$.fn.wysiwygEditor = function() {

  'use strict'

  var instance = this;

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
      title: 'bold'
    },
    {
      title: 'italic',
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
      title: 'image',
      action: 'insertImage',
      value: true,
      desc: 'Insert image URL'
    }
  ];

  // Get action// Get Action
  Object.prototype.getAction = function() {
    if(typeof(this.action) != 'undefined')
      return this.action;
    if(typeof(this.title) != 'undefined')
      return this.title;
  };

  // Hide original textarea
  instance.css('display', 'none');

  // Create markup
  var markup = '';
  markup += '<div class="wysiwygEditor-wrapper">';
  markup +=   '<div class="wysiwygEditor-toolbar">';
  markup +=     '<ul>';

  // Display all tools
  $.each(actions, function(i) {
    markup +=       '<li>';
    markup +=         '<a href class="wysiwygEditor-' + actions[i].title + '">';
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
  markup +=     '<iframe id="randomID" height="300"></iframe>';
  markup +=   '</div>';
  markup += '</div>';

  // Create new iframe
  instance.before(markup);

  var iframe = instance.parents().find('#randomID');
  var editArea = iframe[0].contentDocument;

  iframe.width(iframe.parent().width());
  editArea.body.contentEditable = true;

  $.each(actions, function(i) {
    instance.parents().find('.wysiwygEditor-' + actions[i].title).bind('click', function(e) {
      e.preventDefault();
      if(typeof(actions[i].value) != 'undefined')
        editArea.execCommand(actions[i].getAction(), false, prompt(actions[i].desc));
      else
        editArea.execCommand(actions[i].getAction(), false, null);
    });
  });

  console.log(document);

  return this;
}
