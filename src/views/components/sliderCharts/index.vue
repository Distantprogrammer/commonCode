<template>
  <div class="page-wrapper">
    <div class="app-container fill">
<!--      <slider-charts :sliderList="sliderList"></slider-charts>-->
    </div>
    这是因为 Vue 3 的 webpack 项目（特别是通过 Vue CLI 创建的项目）默认包含了对 JSX 的基础支持。这个支持是通过 @vue/babel-preset-app 实现的，它是 Vue CLI 项目的默认 babel 预设
    这个预设（@vue/cli-plugin-babel/preset）已经包含了基础的 JSX 支持。
    不过需要注意：
    这个默认支持可能不如 @vue/babel-plugin-jsx 提供的功能完整
    如果需要更高级的 JSX 特性（比如自定义指令、v-model 等复杂功能），还是建议安装 @vue/babel-plugin-jsx
    所以虽然基础的 JSX 语法（如下）可以正常工作：
  </div>
</template>
<script setup>
import sliderCharts from './components/sliderCharts.vue';
const sliderList = ref([
  {
    value:10,
    name:'10'
  },
  {
    value:20,
    name:'20'
  },
  {
    value:30,
    name:'30'
  },
  {
    value:40,
    name:'40'
  },
  {
    value:50,
    name:'50'
  },
  {
    value:60,
    name:'60'
  },
  {
    value:70,
    name:'70'
  }
])
defineOptions({ name: 'sliderCharts' })
</script>