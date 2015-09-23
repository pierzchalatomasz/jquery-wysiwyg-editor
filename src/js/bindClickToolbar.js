module.exports = function(randomID, editArea, getAction, backlightActiveTools, actions) {

  $.each(actions, function(i) {

    $('#' + randomID).find('.wysiwygEditor-' + actions[i].title).bind('click', function(e) {

      e.preventDefault();
      editArea.body.focus();

      if(typeof(actions[i].value) != 'undefined')
        editArea.execCommand(getAction(actions[i]), false, prompt(actions[i].desc));

      else
        editArea.execCommand(getAction(actions[i]), false, null);

      $(this).toggleClass('action-active');

      backlightActiveTools(randomID, $(editArea.getSelection().anchorNode).parents(), actions);
      
    });

  });

};
