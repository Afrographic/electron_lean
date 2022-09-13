const { ipcMain, BrowserWindow } = require("electron");
const electron = require("electron");
const app = electron.app;
const browserWindow = electron.BrowserWindow;
const { platform } = require("os");
const path = require("path");
const url = require("url");

let win;

function createWindow() {
    win = new browserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'UI/maatElectronAPI.js')
        }
        // maxWidth: 800,
        // maxHeight: 600,
        // frame: false,
        // alwaysOnTop: true,
        // show: false
    });

    // Events
    ipcMain.on("fuck-her", (event, title) => {
        console.log("Payload " + title);
        const webContents = event.sender;
        // const win = browserWindow.fromBrowserView(webContents);
        win.setTitle(title);
    })


    win.loadFile('UI/index.html');

    win.webContents.openDevTools();

    win.on("closed", () => {
        win = null;
    })

    win.once("ready-to-show", () => {
        win.show();
    })


}

app.on('ready', createWindow);

// if on mac

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (win == null) {
        createWindow();
    }
})