const { app, BrowserWindow, ipcMain, screen, dialog, Notification } = require('electron');
const Store = require('electron-store');
const store = new Store();
const path = require('path');
const { exec } = require('child_process');

let mainWindow;
let isWindowShaking = false;

// Terrible sound player
function playSound(soundFile) {
  const soundPath = path.join(__dirname, 'sounds', soundFile);
  // Use different commands based on OS
  if (process.platform === 'win32') {
    exec(`powershell -c (New-Object Media.SoundPlayer '${soundPath}').PlaySync()`);
  } else if (process.platform === 'darwin') {
    exec(`afplay "${soundPath}"`);
  } else {
    exec(`paplay "${soundPath}"`);
  }
}

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    title: "The Worst Code Editor Ever",
    icon: "public/favicon.ico"
  });

  // Randomly position the window
  mainWindow.setPosition(
    Math.floor(Math.random() * (width - 1200)),
    Math.floor(Math.random() * (height - 800))
  );

  // Load the Next.js app
  mainWindow.loadURL('http://localhost:3000');

  // Terrible window behavior
  setInterval(() => {
    if (Math.random() > 0.95) {
      const currentBounds = mainWindow.getBounds();
      mainWindow.setBounds({
        x: currentBounds.x + (Math.random() * 20 - 10),
        y: currentBounds.y + (Math.random() * 20 - 10),
        width: currentBounds.width,
        height: currentBounds.height
      });
    }
  }, 1000);

  // Random window shake
  setInterval(() => {
    if (Math.random() > 0.98) {
      isWindowShaking = true;
      let shakeCount = 0;
      const shakeInterval = setInterval(() => {
        if (shakeCount >= 10) {
          clearInterval(shakeInterval);
          isWindowShaking = false;
          return;
        }
        const currentBounds = mainWindow.getBounds();
        mainWindow.setBounds({
          x: currentBounds.x + (Math.random() * 40 - 20),
          y: currentBounds.y + (Math.random() * 40 - 20),
          width: currentBounds.width,
          height: currentBounds.height
        });
        shakeCount++;
      }, 50);
    }
  }, 5000);

  // Random window resize
  setInterval(() => {
    if (Math.random() > 0.97) {
      const currentBounds = mainWindow.getBounds();
      mainWindow.setBounds({
        x: currentBounds.x,
        y: currentBounds.y,
        width: currentBounds.width + (Math.random() * 100 - 50),
        height: currentBounds.height + (Math.random() * 100 - 50)
      });
    }
  }, 3000);

  // Terrible window focus behavior
  mainWindow.on('focus', () => {
    if (Math.random() > 0.7) {
      mainWindow.blur();
    }
  });

  // Random error dialogs
  setInterval(() => {
    if (Math.random() > 0.99) {
      dialog.showErrorBox(
        'Random Error',
        'Something went wrong! (Or did it?)'
      );
    }
  }, 30000);

  // Random system beep
  setInterval(() => {
    if (Math.random() > 0.99) {
      process.stdout.write('\x07');
    }
  }, 45000);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Terrible IPC handlers
ipcMain.on('save-file', (event, content) => {
  // Randomly fail to save
  if (Math.random() > 0.8) {
    event.reply('save-response', { success: false, error: 'Random error occurred!' });
  } else {
    // Randomly delay the save
    setTimeout(() => {
      event.reply('save-response', { success: true });
    }, Math.random() * 2000);
  }
});

ipcMain.on('get-theme', (event) => {
  // Randomly change theme
  const themes = ['dark', 'light', 'matrix', 'comic-sans'];
  // Randomly delay the theme change
  setTimeout(() => {
    event.reply('theme-response', themes[Math.floor(Math.random() * themes.length)]);
  }, Math.random() * 1000);
});

// Handle sound effects
ipcMain.on('play-sound', (_, soundFile) => {
  try {
    playSound(soundFile);
  } catch (error) {
    // Play a random sound instead
    const sounds = ['typewriter.mp3', 'error.mp3', 'success.mp3', 'notification.mp3', 'dramatic.mp3'];
    playSound(sounds[Math.floor(Math.random() * sounds.length)]);
  }
});

// Handle notifications
ipcMain.on('show-notification', (_, { title, body }) => {
  // Randomly show the wrong notification
  if (Math.random() > 0.7) {
    title = `[RANDOM] ${title}`;
    body = `${body} (Or is it?)`;
  }
  
  new Notification({
    title,
    body,
    silent: Math.random() > 0.5 // Randomly make it silent
  }).show();
}); 