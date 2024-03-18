
<template>
  <a-row :gutter="[16, 16]">
    <a-col :span="12">
      <label class="label">模板（格式如：{0}xxx{1}）</label>
      <a-textarea :rows="10" :cols="500" v-model:value="txtTempCodes" />
    </a-col>
    <a-col :span="12">
      <label>替换代码（行内tab键分隔）</label>
      <a-textarea :rows="10" :cols="500" v-model:value="txtStrs" @keydown.tab.prevent="insertTab" />
    </a-col>
  </a-row>
  <a-row :gutter="[16, 16]">
    <a-col :span="24" class="items-center">
      <a-button type="primary" @click="genResult">
        <template #icon><SaveOutlined /></template>
        生成代码
      </a-button>
    </a-col>
  </a-row>
  <a-row :gutter="[16, 16]">
    <a-col :span="24">
      <label>生成结果</label>
      <a-textarea :rows="10" :cols="500" :value="txtResult" />
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import { SaveOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { generateBasedOnTemplate } from '@/utils/utils'
import '@/assets/site.css'

// { generateBasedOnTemplate }
/**
 * {0}
 */
const txtTempCodes = ref<string>('/**\n* {0}\n*/\n{1}?:{2};')
const txtStrs = ref<string>('姓名\tname\tstring\n年龄\tage\tnumber')
const txtResult = ref<string>('')

const insertTab = (event: Event) => {
  event.preventDefault()
  if (event.target) {
    const target = event.target as HTMLTextAreaElement
    const cursorPositionStart = target.selectionStart
    const cursorPositionEnd = target.selectionEnd
    const textBeforeCursor = target.value.substring(0, cursorPositionStart)
    const textAfterCursor = target.value.substring(cursorPositionEnd)
    target.value = textBeforeCursor + '\t' + textAfterCursor
    target.selectionStart = cursorPositionStart + 1
    target.selectionEnd = cursorPositionStart + 1
  }
}

const genResult = () => {
  let result = ''
  const tempCodes = txtTempCodes.value.trim()
  const strs = txtStrs.value.trim()
  if (strs == '') {
    return alert('替换代码不能为空')
  }
  const lines = strs.split('\n')

  // for (var i = 0; i < lines.length; i++) {
  //   var line = lines[i].trim()
  //   var kps = line && line.split('\t')
  //   var newCode = tempCodes
  //   for (var j = 0; j < kps.length; j++) {
  //     newCode = newCode.replace(new RegExp('\\{' + j + '\\}', 'g'), kps[j].trim()) // + "\n"
  //   }
  //   result += newCode + '\n'
  // }
  result = generateBasedOnTemplate(lines, tempCodes)
  txtResult.value = result
}

//
genResult()
</script>
<style scoped>
label {
  display: block;
  width: 100%;
  text-align: center;
  background: lavender;
}
/* .items-center {
  display: flex;
  justify-content: center;
} */
</style>
