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
	var _height = '166';
	var _auto = false;
	var _artwork = false;

	return function(name, args) {
		args = args.split(' ');
		key = args[0];
		width = args[1] || _width;
		height = args[2] || _height;
		auto = args[3] || _auto;
		artwork = args[4] || _artwork;

		var origin = '['+ name +':'+ args +']';
			origin = escape(origin);

		// var real = '<iframe class="youtube" width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/' + key + '" frameborder="0" allowfullscreen></iframe>';
		// var real = '<iframe width="'+ width +'" height="'+ height +'" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F'+ key +'&amp;auto_play='+ auto +'&amp;show_artwork='+ artwork +'"></iframe>';
		// real = escape(real);
		// return '<img src="img/plugins/youtube.jpg" width="'+width+'" height="'+height+'" data-origin="'+ origin +'" class="plugin" />';
		return '<iframe data-origin="'+ origin +'" width="'+ width +'" height="'+ height +'" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F'+ key +'&amp;auto_play='+ auto +'&amp;show_artwork='+ artwork +'"></iframe>';
	}
});