<!--<script setup>-->
<!--import { ref, watch,  render, nextTick } from 'vue';-->
<!--const props = defineProps({-->
<!--  sliderList: {-->
<!--    type: Array,-->
<!--    required: true,-->
<!--  },-->
<!--  sliderOption: {-->
<!--    type: Object,-->
<!--    default: () => {-->
<!--      return {-->
<!--        sliderChartBG: 'rgba(9, 123, 98, 0.15)',-->
<!--        sliderLineColorTo: 'rgb(90, 199, 235)',-->
<!--        sliderLineColorFrom: 'rgb(59, 167, 255)',-->
<!--        sliderChartUnit: '次',-->
<!--        sliderChartTooltipsName: '这条滑块的名字'-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--})-->
<!--const maxValue = ref(0)-->

<!--watch(() => {-->
<!--  return props.sliderList-->
<!--},-->
<!--  () => {-->
<!--    maxValue.value = Math.max(...props.sliderList.map(obj => Number(obj.value)))-->
<!--  }, {-->
<!--  deep: true,-->
<!--  immediate: true-->
<!--})-->
<!--const calculationRatio = (item) => {-->
<!--  const maxValueCeil = Math.ceil(maxValue.value / 1000) * 1000-->
<!--  return (item.value / maxValueCeil) * 100 + '%'-->
<!--}-->
<!--const renderSliderTooltip = (e, index) => {-->
<!--  const renderData = () => {-->
<!--    return (-->
<!--      <div className={`g-slider`} ref="gSlider" id='gSlider'>-->
<!--        <div className="g-slider-title">-->
<!--          <div className={`g-slider-round`}></div>-->
<!--          <div className="g-slider-text">{ props.sliderList[index].key }</div>-->
<!--        </div>-->
<!--        <div className="g-slider-tooltips">-->
<!--          <div className={`g-slider-tooltips-name`}>-->
<!--            { props.sliderOption.sliderChartTooltipsName }:-->
<!--          </div>-->
<!--          <div className="g-slider-tooltips-num">-->
<!--            &nbsp;{ props.sliderList[index].value }<span>&nbsp;&nbsp;{ props.sliderOption.sliderChartUnit }</span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    )-->
<!--  }-->
<!--  const dom = renderData()-->
<!--  render(dom, e.target)-->

<!--  nextTick(() => {-->
<!--    const gSlider = document.querySelector('#gSlider')-->
<!--    document.onmousemove = (wine) => {-->
<!--      wine.preventDefault()-->
<!--      wine.stopPropagation()-->
<!--      gSlider.style.left = Math.ceil(wine.x) + 30 + 'px'-->
<!--      gSlider.style.top = Math.ceil(wine.y) + 30 + 'px'-->
<!--    }-->
<!--  })-->

<!--}-->
<!--// 鼠标离开-->
<!--const sliderChartMouseleave = (e) => {-->
<!--  // console.log(e, '鼠标离开');-->
<!--  render(null, e.target)-->
<!--  document.onmousemove = null-->
<!--}-->
<!--// 鼠标进入-->
<!--const sliderChartMouseenter = (e, index) => {-->
<!--  // console.log(e, '鼠标进入');-->
<!--  renderSliderTooltip(e, index)-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <div class="slider-center" v-bind="$attrs">-->
<!--    <div v-for="(item, index) in props.sliderList" :key="item.id" class="slider-panel-box">-->
<!--      <div class="slider-panel-header">-->
<!--        <div class="name-area-box">-->
<!--          <div class="index-box">-->
<!--            <p>{{ index + 1 }}</p>-->
<!--          </div>-->
<!--          <span class="title">{{ item.key }}</span>-->
<!--        </div>-->
<!--        <div class="num-statis">-->
<!--          <span>{{ item.value }}</span>{{ props.sliderOption.sliderChartUnit }}-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="slider-chart" @mouseenter="sliderChartMouseenter($event, index)"-->
<!--        @mouseleave="sliderChartMouseleave($event)">-->
<!--        <div class="slider-line" :style="{ width: calculationRatio(item) }"></div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<style lang="scss">-->
<!--.g-slider {-->
<!--  padding: 12px;-->
<!--  min-width: 100px;-->
<!--  border-radius: 4px;-->
<!--  max-width: 300px;-->
<!--  height: 70px;-->
<!--  background-color: #fff;-->
<!--  box-shadow: 0px 0px 10px 0px #d2b5b5;-->
<!--  position: fixed;-->
<!--  z-index: 99;-->
<!--  box-sizing: border-box;-->

<!--  .g-slider-title {-->
<!--    display: flex;-->
<!--    align-items: center;-->

<!--    .g-slider-text {-->
<!--      margin-left: 5px;-->
<!--      font-size: 15px;-->
<!--      color: #666;-->
<!--      white-space: nowrap;-->
<!--      word-break: nowrap;-->
<!--      text-overflow: ellipsis;-->
<!--      overflow: hidden;-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.g-slider-round {-->
<!--  height: 14px;-->
<!--  width: 14px;-->
<!--  position: relative;-->

<!--  &::after {-->
<!--    content: '';-->
<!--    position: absolute;-->
<!--    top: 50%;-->
<!--    left: 50%;-->
<!--    width: 14px;-->
<!--    height: 14px;-->
<!--    border-radius: 50%;-->
<!--    border: 1px solid v-bind('props.sliderOption.sliderLineColorFrom');-->
<!--    opacity: 0.6;-->
<!--    transform: translate(-50%, -50%);-->
<!--  }-->

<!--  &::before {-->
<!--    content: '';-->
<!--    position: absolute;-->
<!--    top: 50%;-->
<!--    left: 50%;-->
<!--    transform: translate(-50%, -50%);-->
<!--    width: 8px;-->
<!--    height: 8px;-->
<!--    border-radius: 50%;-->
<!--    background-color: v-bind('props.sliderOption.sliderLineColorFrom');-->
<!--  }-->
<!--}-->

<!--.g-slider-tooltips {-->
<!--  width: 100%;-->
<!--  display: flex;-->
<!--  font-size: 15px;-->
<!--  color: #666;-->
<!--  white-space: nowrap;-->
<!--  word-break: nowrap;-->
<!--  text-overflow: ellipsis;-->
<!--  overflow: hidden;-->
<!--}-->
<!--</style>-->

<!--<style scoped lang="scss">-->
<!--.slider-center {-->
<!--  margin: 25px 18px 50px 18px;-->
<!--}-->

<!--.slider-panel-header {-->
<!--  width: 100%;-->
<!--  height: 36px;-->
<!--  display: flex;-->
<!--  align-items: center;-->

<!--  .name-area-box {-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--    font-family: Microsoft YaHei;-->
<!--    color: #1c1c28;-->
<!--    font-size: 16px;-->
<!--    flex-grow: 1;-->

<!--    .index-box {-->
<!--      width: 19px;-->
<!--      height: 19px;-->
<!--      margin-right: 8px;-->
<!--      font-size: 14px;-->
<!--      line-height: 20px;-->
<!--      text-align: center;-->
<!--      color: rgba(0, 0, 0, 0.65);-->
<!--      border-radius: 3px;-->
<!--      overflow: hidden;-->
<!--      transform: rotateZ(45deg);-->
<!--      border: 1px solid #ededed;-->
<!--      background-color: #fafafa;-->

<!--      p {-->
<!--        transform: rotateZ(-45deg);-->
<!--      }-->
<!--    }-->

<!--    .title {-->
<!--      font-family: Microsoft YaHei;-->
<!--      color: #4e515b;-->
<!--      font-size: 14px;-->
<!--      line-height: 22px;-->
<!--    }-->
<!--  }-->

<!--  .num-statis {-->
<!--    font-size: 14px;-->

<!--    span {-->
<!--      font-family: HarmonyOS Sans;-->
<!--      font-weight: 600;-->
<!--      color: #333333;-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.slider-panel-box {-->
<!--  height: 45px;-->

<!--  &:not(:first-child) {-->
<!--    margin-top: 25px;-->
<!--  }-->

<!--  &:nth-child(1) {-->
<!--    .index-box {-->
<!--      border: 1px solid #454ef2;-->
<!--      background-color: #d8dafd;-->
<!--    }-->
<!--  }-->

<!--  &:nth-child(2) {-->
<!--    .index-box {-->
<!--      border: 1px solid #34bcf2;-->
<!--      background-color: #d5f1fd;-->
<!--    }-->
<!--  }-->

<!--  &:nth-child(3) {-->
<!--    .index-box {-->
<!--      border: 1px solid #94e8d7;-->
<!--      background-color: #e8faf7;-->
<!--    }-->
<!--  }-->

<!--  &:nth-child(4) {-->
<!--    .index-box {-->
<!--      border: 1px solid #efefef;-->
<!--      background-color: #fafafa;-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.slider-chart {-->
<!--  width: calc(100% - 30px);-->
<!--  margin-left: 30px;-->
<!--  box-sizing: border-box;-->
<!--  border-radius: 4px;-->

<!--  position: relative;-->

<!--  &::after {-->
<!--    position: absolute;-->
<!--    left: 0;-->
<!--    top: 0;-->
<!--    content: "";-->
<!--    width: 100%;-->
<!--    height: 6px;-->
<!--    border-radius: 4px;-->
<!--    background-color: v-bind('props.sliderOption.sliderChartBG');-->
<!--    z-index: 2;-->
<!--  }-->

<!--  &::before {-->
<!--    position: absolute;-->
<!--    left: -3%;-->
<!--    top: -6px;-->
<!--    content: "";-->
<!--    width: 107%;-->
<!--    height: 18px;-->
<!--    background-color: #ebeef4;-->
<!--    opacity: 0;-->
<!--    transition: all 0.2s;-->
<!--  }-->

<!--  &:hover {-->
<!--    &::before {-->
<!--      opacity: 1;-->
<!--    }-->
<!--  }-->

<!--  .slider-line {-->
<!--    transition: all 0.4s;-->
<!--    // animation: sliderLineWidth 0.6s ease-in forwards;-->
<!--    height: 6px;-->
<!--    background: linear-gradient(90deg, v-bind('props.sliderOption.sliderLineColorTo') 0%, v-bind('props.sliderOption.sliderLineColorFrom') 100%);-->
<!--    border-radius: 4px;-->
<!--    position: relative;-->

<!--    &::after {-->
<!--      content: '';-->
<!--      position: absolute;-->
<!--      right: -4px;-->
<!--      width: 14px;-->
<!--      height: 14px;-->
<!--      border-radius: 50%;-->
<!--      border: 1px solid v-bind('props.sliderOption.sliderLineColorFrom');-->
<!--      opacity: 0.6;-->
<!--      transform: translateY(-32%);-->
<!--    }-->

<!--    &::before {-->
<!--      content: '';-->
<!--      position: absolute;-->
<!--      top: 45%;-->
<!--      right: 0;-->
<!--      transform: translateY(-50%);-->
<!--      width: 8px;-->
<!--      height: 8px;-->
<!--      border-radius: 50%;-->
<!--      background-color: v-bind('props.sliderOption.sliderLineColorFrom');-->
<!--    }-->
<!--  }-->



<!--}-->
<!--</style>-->
