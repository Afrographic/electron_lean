const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (payload) => ipcRenderer.send('fuck-her', payload)
})