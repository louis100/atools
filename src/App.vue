<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider collapsible width="200">
      <div class="logo" ></div>
      <a-menu
        v-model:selectedKeys="selectedKeys2"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="dark"
        :style="{ borderRight: 0 }"
      >
        <!-- <a-menu-item key="1">
          <RouterLink to="/">批量生成</RouterLink>
        </a-menu-item>
        <a-menu-item key="2">
          <RouterLink to="/Deduplication">去重</RouterLink>
        </a-menu-item>
        <a-menu-item key="3">
          <RouterLink to="/WordCount">字符数统计</RouterLink>
        </a-menu-item>
        <a-menu-item key="dsx"> 待实现 </a-menu-item>
        <a-menu-item key="4">
          <RouterLink to="/">文件夹处理</RouterLink>
        </a-menu-item>
        <a-menu-item key="5">
          <RouterLink to="/">身份证生成及验证</RouterLink>
        </a-menu-item>
        <a-menu-item key="6">
          <RouterLink to="/">汉字首字母</RouterLink>
        </a-menu-item>
        <a-menu-item key="Test">
          <RouterLink to="/Test">测试</RouterLink>
        </a-menu-item> -->

        <a-menu-item :key="item.name" v-for="item in router.options.routes">
          <RouterLink :to="item.path">{{ item.name }}</RouterLink>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <!-- <a-layout-header class="footer"> </a-layout-header> -->
      <a-layout-content style="background-color: #ececec; padding: 20px">
        <a-card :bordered="false">
          <RouterView />
          <!-- <template #title>
            <a href="#">标题</a>
          </template> -->
        </a-card>
      </a-layout-content>

      <a-layout-footer class="footer"> ©2024 Created by 天池月下 </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import router from './router'
const selectedKeys2 = ref(['1'])
const openKeys = ref(['sub1'])

router.push('/')
</script>
<style scoped>
/* .header {
  background: linear-gradient(180deg, #e8eefc, #fafbff);
} */

.footer {
  text-align: center;
  padding: 10px;
  background-color: #ececec;
  color: silver;
}
</style>
