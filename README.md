# ATools

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


[创建项目参考](https://blog.csdn.net/I_xuebi/article/details/130737071)

[electron + vite + vue + Ts创建打包桌面应用](https://blog.csdn.net/qq_43294027/article/details/131308704)

[vue3集成electron](https://blog.csdn.net/I_xuebi/article/details/130737071)

[electron-builder通用配置(翻译)](https://blog.csdn.net/qq_38830593/article/details/89843722)

[手把手教你实现一个支持插件化的 uTools 工具箱](https://blog.csdn.net/qq_32344993/article/details/118253660)

[electron-builder打包的详细介绍](https://www.php.cn/faq/411690.html)


## electron-builder 文档
[electron-builder 文档](https://www.electron.build/)

···sh
# 创建项目
npm create vue@latest  # yarn create vue@latest


cd ATools
npm install
npm run format
npm run dev

# 安装 electron
yarn add electron --dev


# 安装打包工具
yarn add electron-builder --dev
或
npm install --save-dev @electron-forge/cli
npx electron-forge import





# 安装 UI 组件库
yarn add ant-design-vue@4.x

yarn add unplugin-vue-components --dev
····

UI组件库：https://antdv.com/docs/vue/introduce-cn

## 热更新问题
lectron-vite支持热更新，可以快速重建和重新启动Electron应用程序。以下是一些可能的解决方案：

确保你使用的是electron-vite 1.0.8或更高版本，因为热更新功能是从这个版本开始支持的。

确保你已经启用了热更新。你可以使用CLI选项 -w 或 --watch 来启用热更新，例如 electron-vite dev --watch。

如果你使用的是配置选项，可以设置 build.watch 为 {} 来启用热更新。

请注意，热更新只能在开发过程中使用，因为它无法完全控制重新加载的时机。



# 打包
要在electron-builder中关闭自动发布，您可以使用以下方法：

在CLI中使用--publish never选项来关闭自动发布。
如果您使用程序化API构建和打包应用程序，可以将publish: "never"添加到根选项对象中。
或者，您也可以在配置中将publish: null添加到根选项对象中来禁用发布。
这些方法都可以有效地关闭electron-builder的自动发布功能。







// 渲染进程
ipcRenderer.invoke('some-name', someArgument).then((result) => {
  // ...
})

// 主进程
ipcMain.handle('some-name', async (event, someArgument) => {
  const result = await doSomeWork(someArgument)
  return result
})






# 打包

```bash
# 安装electron-forge
npm install --save-dev @electron-forge/cli
# 初始化electron-forge
npx electron-forge import

```
注意：

在`main.js`文件中对入口文件的加载路径(是main.js的相对路径) ：
```js
  if (app.isPackaged) {
    win.loadURL(`file://${join(__dirname, './dist/index.html')}`)
  } else {
    // win.loadURL('http://127.0.0.1:5173/')
    win.loadURL('http://localhost:5173/')
    win.webContents.openDevTools()
  }
```