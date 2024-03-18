<template>
  <a-row :gutter="[16, 16]">
    <a-col :span="24">
      <label class="label">原字符串</label>
      <a-textarea :rows="10" :cols="500" v-model:value="txtStrs" />
    </a-col>
  </a-row>
  <a-row :gutter="[16, 16]">
    <a-col :span="24" class="items-center">
      <a-button type="primary" @click="genResult">
        <template #icon><SaveOutlined /></template>
        统计
      </a-button>
    </a-col>
  </a-row>
  <a-row :gutter="[16, 16]">
    <a-col :span="24">
      <label>统计结果</label>
      <a-card>
        <ul>
          <li>中文：{{ txtResult.zhongwen }}</li>
          <li>英文：{{ txtResult.yingwen }}</li>
          <li>数字：{{ txtResult.shuzi }}</li>
          <li>中文+标点：：{{ txtResult.zbiaodian }}</li>
          <li>中文+数字：：{{ txtResult.zishu }}</li>
          <li>总计：{{ txtResult.numwords }}</li>
        </ul>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { statisticsCharCount } from '@/utils/utils'
import { ref } from 'vue'
import { SaveOutlined } from '@ant-design/icons-vue'
import '@/assets/site.css'

const txtStrs = ref<string>('')
const txtResult = ref<Api.Custom.VMStatisticsCharCount>({})

const genResult = () => {
  txtResult.value = statisticsCharCount(txtStrs.value)
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
