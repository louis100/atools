const { contextBridge, ipcRenderer } = require('electron/renderer');
// const { contextBridge, ipcRenderer } = require('electron');
const { app, BrowserWindow, ipcMain, Tray, Menu, screen, Notification } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel, data) => {
    // 仅允许发送已知的安全通道
    // if (channel === 'read-file') {
    //  ipcRenderer.send(channel, data);
    // }
    ipcRenderer.send(channel, data);
  },
  on: (channel, func) => {
    // 在渲染进程中安全地监听 IPC 消息
    const validationFunction = (event, ...args) => {
      console.log("validationFunction：", event,args);
      if (channel === event.channel) {
        func(event,args);
      }
    };
    ipcRenderer.on(channel, validationFunction);
    // 返回注销函数，用于在组件卸载时清除事件监听器
    return () => {
      ipcRenderer.removeListener(channel, validationFunction);
    };
  },
  invoke: (channel, data) => {
    // 在渲染进程中安全地同步发送 IPC 消息到主进程，并等待回复
    return ipcRenderer.invoke(channel, data);
  },
  setTitle: (title) => ipcRenderer.send('set-title', title),
  showTaskMsg: (title = "系统提醒", body = "来自主进程的提醒") => {
    // 不能正常执行
    return new Notification({ title: title, body: body }).show()
  },
  requestPermission: () => {
    return Notification.requestPermission();
  },
  createNotification: (title, options) => {
    return new Notification(title, options);
  }
})

// console.log('Notification：', Notification)

// // 暴露给渲染进程的 API
// /**
//  *
//  */




// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping') // 通过invoke调用主进程的处理程序
});

window.addEventListener('DOMContentLoaded', () => {
  for (const type of ['chrome', 'node', 'electron']) {
    console.log(`${type}-version`, process.versions[type])
  }
})