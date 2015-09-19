(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    nodeName: 'I'
  },
  {
    title: 'underline',
    break: true
  },
  {
    title: 'align-left',
    action: 'justifyLeft',
    nodeName: 'left'
  },
  {
    title: 'align-center',
    action: 'justifyCenter',
    nodeName: 'center'
  },
  {
    title: 'align-right',
    action: 'justifyRight',
    nodeName: 'right'
  },
  {
    title: 'align-justify',
    action: 'justifyFull',
    nodeName: 'justify',
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
    nodeName: 'A',
    value: true,
    desc: 'Insert link URL'
  },
  {
    title: 'image',
    action: 'insertImage',
    value: true,
    desc: 'Insert image URL',
    newRow: true
  },
  {
    title: 'copy'
  },
  {
    title: 'paste',
    break: true
  },
  {
    title: 'font'
  },
  {
    title: 'text-height'
  },
  {
    title: 'square',
    action: 'foreColor',
    value: true,
    desc: 'Choose the color',
    break: true
  },
  {
    title: 'header',
    action: 'formatBlock',
    value: true,
    desc: 'Which heading? H1, H2, H3, H4, H5, H6'
  },
  {
    title: 'paragraph'
  },
  {
    title: 'minus',
    break: true
  },
  {
    title: 'subscript'
  },
  {
    title: 'superscript'
  }
];

module.exports = actions;

},{}],2:[function(require,module,exports){
// Get action
module.exports = function() {

  Object.prototype.getAction = function() {
    if(typeof(this.action) != 'undefined')
      return this.action;
    if(typeof(this.title) != 'undefined')
      return this.title;
  };

};

},{}],3:[function(require,module,exports){
// iframeLoaded
module.exports = function(element, callback) {

  var loop = true;

  while(loop) {
    if($(element).length) {
      $($(element)[0].contentDocument).ready(function() {
        callback();
      });
      loop = false;
    }
  }

}

},{}],4:[function(require,module,exports){
// iframeSettings
exports.setAttributes = function(editArea) {

  $(editArea).designMode = 'on';
  $(editArea.body).attr('contenteditable', true);

};

exports.setStylesheet = function(editArea) {

  $(editArea.head).append('<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,800" rel="stylesheet" type="text/css">');

};

exports.setCss = function(editArea) {

  $(editArea.body).css('padding', '15px');
  $(editArea.body).css('font-family', 'Open Sans, sans-serif');
  $(editArea.body).css('font-size', '13px');
  $(editArea.body).css('line-height', '1.6em');

}

exports.setWidth = function(iframe) {

  // Set iframe width
  iframe.width(iframe.parent().width());
  $(window).resize(function() {
    iframe.width(iframe.parent().width());
  });

};

},{}],5:[function(require,module,exports){
$.fn.wysiwygEditor = function() {

  'use strict'

  var textarea = this;

  var randomID = 'wysiwygEditor-' + Math.floor(Math.random() * 1000000);
  var actions = require('./actions')
  var markup = require('./markup');
  var iframeLoaded = require('./iframeLoaded');
  var iframeSettings = require('./iframeSettings');
  var getAction = require('./getAction');

  // Hide original textarea
  textarea.css('display', 'none');
  textarea.addClass(randomID);

  // Create new wysiwygEditor
  textarea.before(markup(randomID, actions));

  var iframe = $('#' + randomID).find('iframe');

  iframeLoaded(iframe, function() {

    var editArea = iframe[0].contentDocument;

    // Set iframe width
    iframeSettings.setWidth(iframe);

    // Set iframe body to editable
    iframeSettings.setAttributes(editArea);

    // Iframe body styles
    iframeSettings.setStylesheet(editArea);
    iframeSettings.setCss(editArea);

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

        $(this).toggleClass('action-active');

        backlightActiveTools($(editArea.getSelection().anchorNode).parents());
      });
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

        backlightActiveTools(elements);
      });

    });

    // Textarea synchronization
    $(editArea.body).on('contentChanged', function() {
      textarea.val($(this).html());
    });
  });

  function backlightActiveTools(elements) {
    $.each(actions, function() {
      var action = this;
      var match = false;
      $.each(elements, function() {
        var nodeName = this.nodeName;
        // Align property style name
        if(this.nodeName === 'DIV')
          nodeName = this.style.textAlign;
        if(typeof(action.nodeName) != 'undefined' && action.nodeName === nodeName)
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

},{"./actions":1,"./getAction":2,"./iframeLoaded":3,"./iframeSettings":4,"./markup":6}],6:[function(require,module,exports){
// Create markup
module.exports = function(randomID, actions) {

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

    // New row
    if(typeof(actions[i].newRow) != 'undefined') {
      markup +=     '</ul>';
      markup +=     '<div style="height: 1px; background: #e1e1e1; margin: 10px 0;"></div>';
      markup +=     '<ul>';
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

  return markup;
  
}

},{}]},{},[5]);
