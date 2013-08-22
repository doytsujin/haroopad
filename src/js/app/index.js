// for Memory leak detect
process.setMaxListeners(0);

var gui = require('nw.gui');

window.nw = gui.Window.get();
window.ee = new EventEmitter();

MenuBar(); 

//fixed text.js error on node-webkit
require.nodeRequire = require;

/**
 * require.js 환경 설정
 */
requirejs.config({
  baseUrl: 'js/app',
  waitSeconds: 30,
  locale: 'ko-kr',
  paths: {
    tpl: '../../tpl',
    vendors: '../vendors',
    keyboard: '../vendors/keymage',
    parse: 'core/Parser'
  },
  config: {
    text: {
      env: 'xhr'
    }
  }
});

requirejs.onError = function (e) {
  alert('Oops! app is crash :-(');
};

requirejs([
    'context/Context',
    // 'core/Parser',
    'window/Window',
    'window/WindowManager',
    'utils/UpdateNotifier'
  ], function(Context, /*Parser, */Window, WindowMgr, Updater) {

    global._gaq.init(function(_gaq) {
      _gaq.push('haroopad', 'command', 'exec');
    });

    // window.ee.on('change.markdown', function(md, options, cb) {
    //   cb = typeof options === 'function' ? options : cb;
    //   options = typeof options === 'object' ? options : undefined;
      
    //   var html = Parser(md, options);

    //   cb(html);
    // });
    
  
    gui.App.on('open', function(cmdline) {
      WindowMgr.open(cmdline);
    });

    //open file with commend line
    if (gui.App.argv.length > 0) {
      WindowMgr.open(gui.App.argv[0]);
    } else {
      WindowMgr.open();
    }
});