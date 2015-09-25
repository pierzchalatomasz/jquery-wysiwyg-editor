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
    nodeName: 'U',
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
    action: 'insertOrderedList',
    nodeName: 'OL'
  },
  {
    title: 'list-ul',
    action: 'insertUnorderedList',
    nodeName: 'UL',
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
    title: 'subscript',
    nodeName: 'SUB'
  },
  {
    title: 'superscript',
    nodeName: 'SUP'
  }
];

module.exports = actions;
