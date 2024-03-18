import { app, protocol, BrowserWindow, globalShortcut, ipcMain, Notification, Menu } from 'electron';
// 需在当前文件内开头引入 Node.js 的 'path' 模块
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
// const fs = require('fs');

app.commandLine.appendArgument('--no-sandbox');

const { join } = path;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.commandLine.appendSwitch("--ignore-certificate-errors", "true");
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

const createWindow = () => {
  // const preloadPath = path.join(__dirname, 'preload.mjs');
  const preloadPath = path.join(app.getAppPath(), 'preload.mjs')
  // console.log("preload:", preloadPath, preloadPath1);

  const win = new BrowserWindow({
    minWidth: 960,
    minHeight: 540,
    width: 960,
    height: 540,
    icon: "/public/icon/icon.ico",
    setMenu: true,
    //窗口是否允许最小化。 默认值为 true。
    minimizable: true,
    //窗口是否允许最大化。 默认值为 true。
    maximizable: true,
    //窗口是否允许关闭。 默认值为 true。
    closable: true,
    //窗口是否允许拖动。 默认值为 true。
    movable: true,
    //窗口是否允许缩放。 默认值为 true。
    //窗口是否在屏幕居中. 默认值为 false
    center: true,
    //设置为 false 时可以创建一个无边框窗口 默认值为 true。
    frame: true,
    //窗口是否在创建时显示。 默认值为 true。
    show: true,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,// 如果 false 表示 禁用 Node.js 集成，提高安全性
      nodeIntegrationInWorker: true,
      sandbox: false,
      webSecurity: false,
      contextIsolation: true, // 禁用上下文隔离以允许渲染进程使用 Node.js 功能
      enableRemoteModule: true, // 如果你使用 ipcRenderer 或其他远程模块，则需要这个,如果 false 表示 禁用 remote 模块   
      preload: preloadPath // 设置预加载脚本
    }
  })

  ipcMain.on('set-title', (event, title) => {
    console.log('set-title', event, title);
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  // win.setMenu(null)

  if (app.isPackaged) {
    win.loadURL(`file://${join(__dirname, './dist/index.html')}`)
  } else {
    // win.loadURL('http://127.0.0.1:5173/')
    win.loadURL('http://localhost:5173/')
    win.webContents.openDevTools()
  }
  globalShortcut.register("CommandOrControl+Shift+i", function () {
    win.webContents.openDevTools();
  });

}

// 假设 mainWindow 是你的 BrowserWindow 实例
const defaultMenu = Menu.getApplicationMenu(); // 获取默认菜单
if (defaultMenu) {
  mainWindow.setMenu(defaultMenu); // 将默认菜单应用到窗口
}

function showTaskMsg (title = "系统提醒", body = "来自主进程的提醒"){
  return new Notification({ title: title, body: body}).show()
}

app.whenReady().then(() => {
  // console.log("__dirname:", __dirname, path.join(app.getAppPath(), "electron", 'preload.js'));

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // 暂时关闭消息推送
  // showTaskMsg();


})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('ping', async (event, args) => {
  return 'pong';
});


// ipcMain.on('read-file', (event, filePath) => {
//   showTaskMsg();
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       event.reply('read-file-reply', err.message);
//     } else {
//       event.reply('read-file-reply', data);
//     }
//   });
// });



/** */
//
// import { app, BrowserWindow } from 'electron/main'

// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600
//   })

//   win.loadFile('index.html')
// }

// app.whenReady().then(() => {
//   createWindow()

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow()
//     }
//   })
// })

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })