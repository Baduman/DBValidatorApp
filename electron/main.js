const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

/**
 * Create the main application window.
 */
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'FareDB Validation App',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'src', 'index.html'));
  
  // Maximize window on startup (windowed fullscreen)
  mainWindow.maximize();

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

// Electron app lifecycle
app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Placeholder IPC channel for future Python backend integration
ipcMain.handle('ping-backend', async () => {
  // TODO: Call Python backend here
  return { ok: true, message: 'Backend not implemented yet (Python planned).' };
});

// PDF Generation IPC handler
ipcMain.handle('generate-pdf', async (event, latexCode, config) => {
  try {
    // Save LaTeX file temporarily
    const tempDir = path.join(app.getPath('temp'), 'dbvalidation-reports');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const timestamp = Date.now();
    const texFilePath = path.join(tempDir, `report_${timestamp}.tex`);
    fs.writeFileSync(texFilePath, latexCode, 'utf8');

    // Ask user where to save PDF
    const { filePath } = await dialog.showSaveDialog({
      title: 'Save PDF Report',
      defaultPath: `report_${timestamp}.pdf`,
      filters: [
        { name: 'PDF Files', extensions: ['pdf'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (!filePath) {
      return { success: false, error: 'User cancelled save dialog' };
    }

    // Return LaTeX file path and target PDF path for Python backend to process
    // Python backend will use pdflatex to compile the LaTeX file
    return {
      success: true,
      latexPath: texFilePath,
      pdfPath: filePath,
      message: 'LaTeX file generated. Python backend will compile to PDF.'
    };
  } catch (error) {
    console.error('[Electron] Error generating PDF:', error);
    return { success: false, error: error.message };
  }
});


