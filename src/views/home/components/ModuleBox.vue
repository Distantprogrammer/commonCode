<script setup>
const props = defineProps({
  title:{
    type:String,
    default:''
  }
})
</script>

<template>
  <div class="module-box">
    <div class='module-title'>
      <h3>{{ props.title }}</h3>
      <slot name='titleBtn'></slot>
    </div>
    <div class='module-content'>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.module-title{
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3{
    font-size: 16px;
    font-weight: 700;
    line-height: 18.82px;
  }
}
</style>