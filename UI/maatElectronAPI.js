const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    createFile: (payload) => ipcRenderer.sendSync('createFile', payload)
})