const { contextBridge, ipcRenderer } = require('electron');

/**
 * Expose a limited, safe API to the renderer.
 */
contextBridge.exposeInMainWorld('electronAPI', {
  pingBackend: async () => {
    return ipcRenderer.invoke('ping-backend');
  },
  generatePDF: async (latexCode, config) => {
    return ipcRenderer.invoke('generate-pdf', latexCode, config);
  },
});


