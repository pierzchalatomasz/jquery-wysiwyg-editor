$.fn.wysiwygEditor = function() {
  var instance = this;

  // Hide original textarea
  instance.css('display', 'none');
  //instance.attr('wysiwygEditor-id', );

  var markup = '';
  markup += '<div class="wysiwygEditor-wrapper">';
  markup +=   '<div class="wysiwygEditor-toolbar">';
  markup +=     '<ul>';
  markup +=       '<li>';
  markup +=         '<a href class="wysiwygEditor-bold">';
  markup +=           '<i class="fa fa-bold"></i>';
  markup +=        '</a>';
  markup +=       '</li>';
  markup +=       '<li>';
  markup +=         '<a href class="wysiwygEditor-bold">';
  markup +=           '<i class="fa fa-italic"></i>';
  markup +=         '</a>';
  markup +=       '</li>';
  markup +=     '</ul>';
  markup +=   '</div>';
  markup +=   '<div class="wysiwygEditor-editArea">';
  markup +=     '<iframe id="randomID""></iframe>';
  markup +=   '</div>';
  markup += '</div>';

  // Create new iframe
  instance.before(markup);

  var iframe = instance.parents().find('#randomID');
  var editArea = iframe[0].contentDocument;

  iframe.width(iframe.parent().width());
  editArea.body.contentEditable = true;

  // Create link
  instance.parents().find('.markdownWYSIWYG-heading').click(function() {
    editArea.execCommand('bold', false, null);
  });

  console.log(document);

  return this;
}
