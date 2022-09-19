const { ipcMain, BrowserWindow, Tray } = require("electron");
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
        },
        icon: path.join(__dirname, 'UI/images/Isis.png')
        // maxWidth: 800,
        // maxHeight: 600,
        // frame: false,
        // alwaysOnTop: true,
        // show: false
    });

    // Events
    ipcMain.on("fuck-her", (event, payload) => {
        console.log("Payload " + payload.title);
        win.setTitle(payload.title);
        electron.shell.showItemInFolder("D:\\Tutos\\Electron\\Start - 8.txt");
        electron.shell.openPath("D:\\Tutos\\Electron\\Start - 8.txt");
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
    let tray = new Tray(path.join(__dirname, 'UI/images/Isis.png'));

    // Menu for tray 
    let template = [
        {
            label: "Audio",
            submenu: [
                {
                    label: 'Low',
                    type: 'radio',
                    checked: true
                },
                {
                    label: 'High',
                    type: 'radio'
                },
            ]
        },
        {
            label: "Video",
            submenu: [
                {
                    label: '1280x720',
                    type: 'radio',
                    checked: true
                },
                {
                    label: '1920x1080',
                    type: 'radio'
                },
            ]
        }
    ]

    const ctxMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(ctxMenu);
    tray.setToolTip("Imhotep");
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