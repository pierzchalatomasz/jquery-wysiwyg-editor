$.fn.wysiwygEditor = function() {
  var instance = this;

  // Hide original textarea
  instance.css('display', 'none');
  //instance.attr('wysiwygEditor-id', );

  var markup = '';
  markup += '<div class="wysiwygEditor-wrapper" style="background: #f8f8f8; border: 1px solid #e1e1e1; width: 600px;">';
  markup +=   '<div class="wysiwygEditor-toolbar" style="//background: #f5f5f5; padding: 15px;">';
  markup +=     '<a href class="wysiwygEditor-bold">';
  markup +=       '<i class="fa fa-bold"></i>';
  markup +=     '</a>';
  markup +=     '<a href class="wysiwygEditor-bold">';
  markup +=       '<i class="fa fa-italic"></i>';
  markup +=     '</a>';
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
