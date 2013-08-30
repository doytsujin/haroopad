define(function() {

	function escape(html, encode) {
	  return html
	    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;')
	    .replace(/'/g, '&#39;');
	}

	var _width = '100%';
	var _height = '356';

	return function(name, args) {
		args = args.split(' ');
		key = args[0];
		width = args[1] || _width;
		height = args[2] || _height;

		var origin = '['+ name +':'+ args +']';
			origin = escape(origin);

		// var real = '<iframe src="http://www.slideshare.net/slideshow/embed_code/' + key + '" width="'+ width +'" height="'+ height +'" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen webkitallowfullscreen mozallowfullscreen> </iframe>'
		// real = escape(real);
		// return '<img src="img/plugins/slidesharelogo.jpg" width="'+ width +'" height="'+  height+'" data-origin="'+ origin +'" class="plugin" />';
		return '<iframe data-origin="'+ origin +'" src="http://www.slideshare.net/slideshow/embed_code/' + key + '" width="'+ width +'" height="'+ height +'" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen webkitallowfullscreen mozallowfullscreen> </iframe>';
	}
});
