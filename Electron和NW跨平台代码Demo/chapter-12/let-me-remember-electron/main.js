'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 320,
    frame: false,
     webPreferences: {
           // preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
         
          }
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => { mainWindow = null; });
});