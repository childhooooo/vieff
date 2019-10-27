const {app, BrowserWindow} = require('electron')
const path = require('path')

let mainWindow
var index_html = 'file://' + path.join(__dirname, 'index.html')

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        useContentSize: true,
        webPreferences: {
            blinkFeatures: 'KeyboardEventKey,Accelerated2dCanvas,Canvas2dFixedRenderingMode',
            nodeIntegration: true,
        }
    })

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    app.on('closed', () => {
        mainWindow = null
        app.quit()
    })

    if(process.env['NODE_ENV'] != 'production') {
        mainWindow.webContents.openDevTools({ mode: 'detach' })
    }

    mainWindow.loadURL(index_html)
}

app.on('ready', createWindow)
