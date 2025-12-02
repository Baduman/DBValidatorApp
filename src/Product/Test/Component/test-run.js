// Test Run Page JavaScript

(function() {
  'use strict';

  const uploadSection = document.getElementById('database-upload-section');
  const fileInput = document.getElementById('database-file-input');
  const fileInputLabel = document.getElementById('file-input-label');
  const selectedFileInfo = document.getElementById('selected-file-info');
  const fileNameEl = document.getElementById('file-name');
  const fileSizeEl = document.getElementById('file-size');
  const removeFileBtn = document.getElementById('remove-file-btn');

  let selectedFile = null;

  // Drag & Drop handlers
  if (uploadSection) {
    uploadSection.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadSection.classList.add('drag-over');
    });

    uploadSection.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadSection.classList.remove('drag-over');
    });

    uploadSection.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadSection.classList.remove('drag-over');

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    });
  }

  // File input change handler
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
      }
    });
  }

  // File selection handler
  function handleFileSelect(file) {
    // Check if file extension is supported
    const supportedExtensions = ['.db', '.sqlite', '.sqlite3', '.db3'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!supportedExtensions.includes(fileExtension)) {
      alert('Unsupported file format. Please select .db, .sqlite, .sqlite3 or .db3 file.');
      return;
    }

    selectedFile = file;
    displayFileInfo(file);
    console.log('[Test Run] Database file selected:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified)
    });
  }

  // Display file info
  function displayFileInfo(file) {
    if (fileNameEl) {
      fileNameEl.textContent = file.name;
    }
    
    if (fileSizeEl) {
      fileSizeEl.textContent = formatFileSize(file.size);
    }

    if (selectedFileInfo) {
      selectedFileInfo.classList.add('active');
    }
  }

  // Format file size
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  // Remove file handler
  if (removeFileBtn) {
    removeFileBtn.addEventListener('click', () => {
      selectedFile = null;
      if (fileInput) {
        fileInput.value = '';
      }
      if (selectedFileInfo) {
        selectedFileInfo.classList.remove('active');
      }
      console.log('[Test Run] Database file removed');
    });
  }

  // Expose selected file for external access if needed
  window.getSelectedDatabaseFile = function() {
    return selectedFile;
  };

})();


