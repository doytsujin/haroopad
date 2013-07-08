var _options = {
  dirname: '.'
};
var viewStyle, codeStyle;
window.ee = new EventEmitter();

window.ondragover = function(e) { 
  e.preventDefault(); 
  win.emit('dragover', e);
  return false;
};
window.ondrop = function(e) { 
  e.preventDefault(); 
  win.emit('dragdrop', e);
  return false;
};

function loadCss(url) {
  $('<link>').attr({
    type: 'text/css',
    rel: 'stylesheet',
    href: url
  }).appendTo('head');
}

function setViewStyle(style) {
  var href = 'css/markdown/'+ style +'/'+ style +'.css';

  $('#view').attr({ href: href });

  $(document.body).removeClass();
  $(document.body).addClass('markdown');
  $(document.body).addClass(style);
}

function setCodeStyle(style) {
  var href = 'css/code/'+ style +'.css';
  $('#code').attr({ href: href });
}

function createTOC() {
  var toc = generateTOC($(document.body)[0]);
  $(document.body).prepend('<div id="toc"></div>');
  $('#toc').html(toc);
  $(document.body).scrollspy('refresh');
}

function delegateKeydown() {
}

function init(options) {
  _options = options || { dirname: '.' };

  delegateKeydown();
}

/**
 * for fix image path
 * @return {[type]} [description]
 */
function _fixImagePath() {
  $('img').each(function() {
    var src = $(this).attr('src');

    if(src.indexOf('://') == -1) {
      $(this).attr('src', _options.dirname +'/'+ src);
    }
  });
}

//for performance
var timeoutSyntaxHighlight;
function _lazySyntaxHighlight() {
  clearTimeout(timeoutSyntaxHighlight);

  setTimeout(function() {
    $('pre code').each(function(i, e) {
      hljs.highlightBlock(e);
    });
  }, 400);
}

/**
 * update contents
 * @param  {[type]} contents [description]
 * @return {[type]}          [description]
 */
function update(contents) {
  //unregister previous anchor click event handler
  $('a').off('click', '**');
  $(document.body).html(contents);

  $('img').on('error', function() {
    $(this).attr('src', './img/noimage.gif');
  });
  _fixImagePath();
  // createTOC();
  
  _preventDefaultAnchor();
  _lazySyntaxHighlight();
}

var frags = [];
function updateFragment(index, html) {
  var fragEl;
  fragEl = frags[index];

  if (!html) {
    $(fragEl).remove();
    frags = document.querySelectorAll('haroo');
    return;
  }

  if (!fragEl) {
    fragEl = document.createElement('haroo');
    document.body.appendChild(fragEl);
    
    frags = document.querySelectorAll('haroo');
  }

  $(fragEl).html(html);
}

function createFragment(index) {
  var fragEl;

  $('<haroo>').insertBefore($(frags[index+1]));
  frags = document.querySelectorAll('haroo');
}

function removeFragment(index) {
  var fragEl;
  fragEl = frags[index];

  $(fragEl).remove();
  frags = document.querySelectorAll('haroo');
}

function moveFragment(oldIndex, newIndex) {
  var fragEl = frags[oldIndex];
  $(fragEl).insertBefore($(frags[newIndex+1]));
    
  frags = document.querySelectorAll('haroo');
}

/**
 * enable click event at link
 * @return {[type]} [description]
 */
function _preventDefaultAnchor() {
  $('a').on('click', function(e) {
    window.ee.emit('link', $(e.target).attr('href'));
    e.preventDefault();
  });
}

/**
 * sync scroll position
 * @param  {[type]} per [description]
 * @return {[type]}     [description]
 */
function scrollTop(per) {
  var h = $(window).height();
  var top = $(document.body).prop('clientHeight') - h;

  $(window).scrollTop(top / 100 * per);
}