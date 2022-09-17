const { ipcMain, BrowserWindow } = require("electron");
const electron = require("electron");
const app = electron.app;
const browserWindow = electron.BrowserWindow;
const { platform } = require("os");
const path = require("path");
const url = require("url");
const Menu = electron.Menu;

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
    ipcMain.on("fuck-her", (event, payload) => {
        console.log("Payload " + payload.title);
        const webContents = event.sender;
        // const win = browserWindow.fromBrowserView(webContents);
        win.setTitle(payload.title);
        event.returnValue = "Love is everything!";
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

app.on('ready', function () {
    createWindow();
    buildMenu();
});

function buildMenu() {
    const template = [
        {
            label: "Demo",
            submenu: [
                {
                    label: "Demo1",
                    click: function () {
                        console.log("Clicked Demo1")
                    }
                },

                {
                    label: "Demo2"
                },
            ]
        },
        {
            label: "Help",
            click: function () {
                electron.shell.openExternal(`D:/Programs Files/FL Studio 20/FL64.exe`)
            }
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

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