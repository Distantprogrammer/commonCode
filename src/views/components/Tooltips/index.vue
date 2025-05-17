<template>
  <div class="page-wrapper">
    <div class="app-container fill">
      <Tooltips>
        <template #default="{ leave, enter }">
          <div
            class="chart"
            :style="{ background: item.color }"
            @mouseenter="enter($event, item)"
            @mouseleave="leave"
            v-for="item in data"
            :key="item.name"
          >
            {{ item.name }}
          </div>
        </template>
        <template #tooltips="{ item, chartColor }">
          <div class="tooltips">
            <div :style="{ background: chartColor }" style="width: 20px; height: 20px;display: inline-block;"></div>
            {{ item.dec }}
          </div>
        </template>
      </Tooltips>
    </div>
  </div>
</template>
<script setup>
import Tooltips from './components/Tooltips.vue'
import { ref, reactive } from 'vue'
defineOptions({ name: 'Tooltips' })
const data = ref([
  {
    value: 100,
    name: '第一个',
    dec: '第一个描述',
    color: '#ff0000'
  },
  {
    value: 200,
    name: '第二个',
    dec: '第二个描述',
    color: '#00ff00'
  },
  {
    value: 300,
    name: '第三个',
    dec: '第三个描述',
    color: '#0000ff'
  }
])
</script>

<style lang="scss" scoped>
.chart {
  width: 100px;
  height: 100px;
  background: #ccc;
  margin: 10px;
  display: inline-block;
}
.tooltips {
  width: 100px;
  height: 100px;
  background: #ccc;
  padding: 10px;
  display: inline-block;
}
</style>
