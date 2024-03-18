<template>
  <button @click="showMes">showMes消息</button>

  <button @click="showSysMes">showSysMes消息</button>

  <!-- <button @click="getreply">getreply消息</button> -->

  <button @click="setTitle">设置标题</button>

  <button @click="readTxt">文件读写</button>

  测试页面
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

// import { showLog ,showNotification} from '@/utils/notificationHelper'
// 在 Electron 应用程序的主进程或渲染进程中
let electronAPI: any = null
onMounted(() => {
  electronAPI = window?.electronAPI
  // console.log('测试页面', window, window.electronAPI, window.myAPI)
})
// 调用 electronAPI
// const myAPI = window?.myAPI

// console.log('测试页面', window, window?.electronAPI, window?.myAPI)

const showMes = () => {
  // 使用预加载脚本中暴露的 API
  electronAPI && electronAPI.showTaskMsg('showTaskMsg', 'Hello from renderer!')
}

const showSysMes = () => {
  // 使用预加载脚本中暴露的 API
  electronAPI && electronAPI.showTaskMsg('showTaskMsg', 'Hello from renderer!')
}

// const getreply = () => {
//   // 使用预加载脚本中暴露的 API
//   myAPI &&
//     myAPI.on('getreply', (data: any) => {
//       console.log('data', data) // 打印从主进程接收到的消息
//     })
// }

const setTitle = () => {
  // console.log('setTitle', window, window.electronAPI, window.myAPI)
  electronAPI.setTitle('title测试')
}

const readTxt = () => {
  // const filePath = './public/demo/file.txt' // 替换为你的文件路径
  // electronAPI.send('read-file', filePath)
  // electronAPI.on('read-file-reply', (event: any, data: any) => {
  //   console.log('read-file-reply:', event, data)
  //   // if (typeof data === 'string') {
  //   //   console.log('File content:', data)
  //   // } else {
  //   //   console.error('Failed to read file:', data)
  //   // }
  // })
}
</script>
