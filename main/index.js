// Import parts of electron to use
const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const windowStateKeeper = require('electron-window-state')

// import functions to process csv
const { excelToJson, compose } = require('./functions/utilities')
const { processJSON } = require('./functions/processJSON')
const { processToCSV } = require('./functions/processToCSV')
const { printToFile } = require('./functions/printToFile')
const { createJira } = require('./functions/createJira')


let mainWindow

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
    app.commandLine.appendSwitch('high-dpi-support', 'true')
    app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

function createWindow() {
    // mainWin state keeper
    const mainWinState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 700
    })
    // Create the browser window
    mainWindow = new BrowserWindow({
        x: mainWinState.x,
        y: mainWinState.y,
        width: mainWinState.width,
        height: mainWinState.height,
        minWidth: 1000,
        minHeight: 700,
        maxWidth: 1000,
        maxHeight: 700,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadURL(isDev ? 'http://localhost:8080' : `file://${path.join(__dirname, '../build/index.html')}`)
    mainWindow.webContents.openDevTools()

    // Don't show until we are ready and loaded
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})


// on new xlsx file submitted
ipcMain.on('new-xlsx-to-csv', (e, filepath) => {
    const wsJSON = excelToJson(filepath)
    const fileObj = compose(
        printToFile,
        processToCSV,
        processJSON
    )(wsJSON)
    console.log('fileObj-BE', fileObj)
    mainWindow.webContents.send('new-xlsx-to-csv-done', fileObj)
})

// on new Jira create
ipcMain.on('new-jira', (e, data) => {
    createJira(data).then(fileObj => {
        if (fileObj.success) {
            mainWindow.webContents.send('new-jira-success', fileObj)
        } else {
            mainWindow.webContents.send('new-jira-error', 'Authentication failed. Re-enter password')
        }
    }).catch(err => console.log(err))
})

// listen to event 'open-directory': open directory where all processed files have been saved
ipcMain.on('open-directory', (e, directory) => openDir(directory))
const openDir = dir => {
    shell.openItem(dir)
}

// listen to event open-url (go to Jira website for exemple)
ipcMain.on('open-url', (e, url) => openUrl(url))
const openUrl = url => {
    shell.openExternal(url)
}