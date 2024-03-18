<template>
  <a-row :gutter="[16, 16]">
    <a-col :span="24">
      <label class="label">c#代码</label>
      <a-textarea :rows="10" :cols="500" v-model:value="txtStrs" />
    </a-col>
  </a-row>

  <a-row>
    <a-col class="items-center"> 待实现 </a-col>
  </a-row>

  <a-row :gutter="[16, 16]">
    <!-- <a-col class="items-center">
      <label>
        是否生成接口
        <a-switch v-model:checked="conditional.isGenInterface" title="是否生成接口" />
      </label>
    </a-col> -->

    <a-col class="items-center">
      <label>
        ts Interface属性首字母小写
        <a-switch v-model:checked="conditional.isObjAssign" title="首字母小写" />
      </label>
    </a-col>
  </a-row>

  <a-row :gutter="[16, 16]">
    <a-col :span="24" class="items-center">
      <a-button type="primary" @click="genResult">
        <template #icon><SaveOutlined /></template>
        生成
      </a-button>
    </a-col>
  </a-row>
  <!-- <a-row :gutter="[16, 16]">
    <a-col :span="24">
      <label>生成结果</label>
      <a-textarea :rows="10" :cols="500" v-model:value="txtResult" />
    </a-col>
  </a-row> -->

  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="ts Interface">
      <a-textarea :rows="10" :cols="500" v-model:value="txtInterfaceResult" />
    </a-tab-pane>
    <a-tab-pane key="2" tab="table cols">
      <a-textarea :rows="10" :cols="500" v-model:value="txtColsResult" />
    </a-tab-pane>
    <a-tab-pane key="3" tab="类赋值">
      <a-textarea :rows="10" :cols="500" v-model:value="txtSetPropResult" />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import csharpToTsHelper from '@/utils/csharpToTsHelper'
import { ref } from 'vue'
import { SaveOutlined } from '@ant-design/icons-vue'
import '@/assets/site.css'

const activeKey = ref('1')
const conditional = ref({
  isGenInterface: true, //赋值
  isObjAssign: true //赋值
})
const txtStrs = ref<string>('')
const txtInterfaceResult = ref<string>('')
const txtColsResult = ref<string>('')
const txtSetPropResult = ref<string>('')

const genResult = () => {
  const classInfo = csharpToTsHelper.getClassInfoFromCSharp(txtStrs.value)
  txtInterfaceResult.value = csharpToTsHelper.toTsinterface(classInfo)
  txtColsResult.value = csharpToTsHelper.toTableColumn(classInfo)
  txtSetPropResult.value = csharpToTsHelper.toCloneModel(classInfo)
}
</script>

<style scoped>
label {
  display: block;
  width: 100%;
  text-align: center;
  background: lavender;
}
</style>
