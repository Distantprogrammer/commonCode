<template>
  <div class="page-wrapper">
    <div class="app-container fill">
      <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
    </div>
  </div>
</template>
<script setup>
defineOptions({ name: 'elInputNumberInitData' })
import inputNumber from 'element-plus/es/components/input-number/index'
import { ref } from 'vue';
const num = ref('')

</script>