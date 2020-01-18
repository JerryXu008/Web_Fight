'use strict';

const gui = require('nw.gui');

const mb = new gui.Menu({ type: 'menubar' });
mb.createMacBuiltin('hehehe');
	
gui.Window.get().menu = mb;
