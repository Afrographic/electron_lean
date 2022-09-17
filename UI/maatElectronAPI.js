const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (payload) => ipcRenderer.sendSync('fuck-her', payload)
})