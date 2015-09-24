// Backlight active tools
module.exports = function(randomID, elements, actions) {

  $.each(actions, function() {
    var action = this;
    var match = false;

    $.each(elements, function() {
      var nodeName = this.nodeName;
      // Align property style name
      if(this.nodeName === 'DIV')
        nodeName = this.style.textAlign;
      // Unordered List and Ordered List
      if(this.nodeName === 'LI') {
        if(this.parents().find('ul'))
          nodeName = 'UL';
        else
          nodeName = 'OL';
      }

      if(typeof(action.nodeName) != 'undefined' && action.nodeName === nodeName)
        match = true;
    });

    if(match)
      $('#' + randomID).find('.wysiwygEditor-' + action.title).addClass('action-active');
    else
      $('#' + randomID).find('.wysiwygEditor-' + action.title).removeClass('action-active');
  });

};
