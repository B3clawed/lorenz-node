const { app, BrowserWindow } = require('electron');

function createWindow () {
  win = new BrowserWindow({ width: 1280, height: 720 })
  //win.setMenu(null)
  win.loadFile('./public/index.html')
}

app.on('ready', createWindow)