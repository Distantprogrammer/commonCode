<template>
  <div class="page-wrapper">
    <div class="app-container fill">
      <pre>
    当前版本 vue@3.2.20 尝试vue3.3/3.4/3.5都不行，或许需要配置其他东西
    <b>代码有jsx语法与h函数语法，如需使用组件建议不要使用jsx语法</b>
    这是因为 Vue 3 的 webpack 项目（特别是通过 Vue CLI 创建的项目）默认包含了对 JSX 的基础支持。
    这个支持是通过 @vue/babel-preset-app 实现的，它是 Vue CLI 项目的默认 babel 预设
    这个预设（@vue/cli-plugin-babel/preset）已经包含了基础的 JSX 支持。
    不过需要注意：
    这个默认支持可能不如 @vue/babel-plugin-jsx 提供的功能完整
    如果需要更高级的 JSX 特性（比如自定义指令、v-model 等复杂功能），还是建议安装 @vue/babel-plugin-jsx
    所以虽然基础的 JSX 语法（如下）可以正常工作：
    </pre>
      <div style="display: flex;">
        <div v-for="i in 3" :key="i" style="flex: 1;margin-left: 20px;">
          <slider-charts :sliderList="sliderList"></slider-charts>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import sliderCharts from './components/sliderCharts.vue';
const sliderList = ref([
  {
    value: 10,
    key: '10'
  },
  {
    value: 20,
    key: '20'
  },
  {
    value: 30,
    key: '30'
  },
  {
    value: 40,
    key: '40'
  },
  {
    value: 50,
    key: '50'
  },
  {
    value: 60,
    key: '60'
  },
  {
    value: 70,
    key: '70'
  }
])
</script>