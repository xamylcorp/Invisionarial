const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');

// Terrible API implementation
contextBridge.exposeInMainWorld('electron', {
  saveFile: (content) => {
    return new Promise((resolve) => {
      // Randomly delay the save
      setTimeout(() => {
        ipcRenderer.send('save-file', content);
        ipcRenderer.once('save-response', (_, response) => {
          resolve(response);
        });
      }, Math.random() * 2000);
    });
  },
  getTheme: () => {
    return new Promise((resolve) => {
      // Randomly delay the theme change
      setTimeout(() => {
        ipcRenderer.send('get-theme');
        ipcRenderer.once('theme-response', (_, theme) => {
          resolve(theme);
        });
      }, Math.random() * 1000);
    });
  },
  playSound: (sound) => {
    // Randomly play the wrong sound
    const sounds = ['typewriter.mp3', 'error.mp3', 'success.mp3', 'notification.mp3', 'dramatic.mp3'];
    const actualSound = Math.random() > 0.7 ? sounds[Math.floor(Math.random() * sounds.length)] : sound;
    ipcRenderer.send('play-sound', actualSound);
  },
  showNotification: (title, body) => {
    // Randomly modify the notification
    if (Math.random() > 0.5) {
      title = `[RANDOM] ${title}`;
      body = `${body} (Or is it?)`;
    }
    ipcRenderer.send('show-notification', { title, body });
  }
}); 