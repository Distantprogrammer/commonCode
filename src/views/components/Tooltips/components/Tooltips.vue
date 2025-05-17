<script setup>
import { ref, onMounted, nextTick } from "vue"
const emit = defineEmits(['change'])

const tooltipsRef = ref(null)
const isShowTooltips = ref(false)
const enterItem = ref({})
const chartColor = ref('#fff')
// 鼠标离开
const sliderChartMouseleave = (e) => {
  if (e && e.target) {
    isShowTooltips.value = false
    document.onmousemove = null
  }
}
const documentMove = () => {
  document.onmousemove = (wine) => {
    if (tooltipsRef.value) {
      wine.preventDefault()
      wine.stopPropagation()
      tooltipsRef.value.style.top = Math.ceil(wine.y) + 30 + 'px'
      tooltipsRef.value.style.left = Math.ceil(wine.x) + 30 + 'px'
    }
  }
}
// 鼠标进入
const sliderChartMouseenter = (e, item) => {
  chartColor.value = e?.target?.style?.backgroundColor
  enterItem.value = item
  nextTick(() => {
    documentMove()
    isShowTooltips.value = true
  })
}
onMounted(() => {
  nextTick(() => {
    documentMove()
  })
})
</script>

<template>
  <div>
    <div ref="tooltipsRef" class="tooltips" id="tooltips" v-show="isShowTooltips">
      <slot name="tooltips" :item="enterItem" :chartColor="chartColor"></slot>
    </div>
    <slot v-bind="{
      leave: sliderChartMouseleave,
      enter: sliderChartMouseenter,
    }"></slot>
  </div>
</template>

<style scoped lang='scss'>
.tooltips {
  // padding: 12px;
  // min-width: 100px;
  // border-radius: 4px;
  // max-width: 300px;
  // height: 70px;
  // background-color: #fff;
  // box-shadow: 0px 0px 10px 0px #d2b5b5;
  position: fixed;
  z-index: 99;
  box-sizing: border-box;
}
</style>