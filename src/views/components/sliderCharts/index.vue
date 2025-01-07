<template>
  <div class="page-wrapper">
    <div class="app-container fill">
      <slider-charts :sliderList="sliderList"></slider-charts>
    </div>
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