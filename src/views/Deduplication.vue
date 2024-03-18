<template>
  <a-row :gutter="[16, 16]">
    <a-col :span="24">
      <label class="label">原字符串</label>
      <a-textarea :rows="10" :cols="500" v-model:value="txtStrs" />
    </a-col>
  </a-row>
  <a-row :gutter="[16, 16]">
    <a-col :span="24">
      <label class="label">分隔符</label>
      <a-textarea v-model:value="txtSeparator" />
    </a-col>
  </a-row>
  <a-row :gutter="[16, 16]">
    <a-col :span="24" class="items-center">
      <a-button type="primary" @click="genResult">
        <template #icon><PoweroffOutlined /></template>
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
import { ref } from 'vue'
import '@/assets/site.css'
const txtStrs = ref<string>(
  '张三李四王五赵六一二三四五六七八九十1\n张三李四王五赵六一二三四五六七八九十\n张三李四王五赵六一二三四五六七八九十1\n张三李四王五赵六一二三四五六七八九十\n张三李四王五赵六一二三四五六七八九十1\n'
)
const txtSeparator = ref<string>('\n')
const txtResult = ref<string>('')

const genResult = () => {
  txtResult.value = deduplication(txtStrs.value, txtSeparator.value)
}

function deduplication(str: string, separator: string = '') {
  console.log('separator', separator, str)
  const newArr = []
  const reg = new RegExp(separator, 'g')
  const arr = str.split(reg) || []
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) == -1) {
      newArr.push(arr[i])
    }
  }
  return newArr.join(separator)
}
//
</script>
<style scoped>
label {
  display: block;
  width: 100%;
  text-align: center;
  background: lavender;
}
</style>
