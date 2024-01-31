<template>
  <div class="page-wrapper flex-vertical">
    <div class="app-container fill">
      <div class="cell" v-for="(item, index) in relatedArticleList" :key="index">
        <div class="title">
          <span class="numerical_order">{{ index + 1 }}、</span> 
          {{ item.title }}
          <span class="createTime">{{ item.createTime }}</span>
        </div>
        <div class="link"><a :href="item.link" target="_blank">{{ item.link }}</a></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'relatedArticle' })
import { ref } from 'vue'
const relatedArticleList = ref([])
const getList = () => {
  fetch(new URL('./list.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      relatedArticleList.value = res.data
    })
}
getList()
</script>

<style lang="scss" scoped>
.cell{
  .title{
    font-weight: 600;
    font-size: 16px;
    .numerical_order{
      font-size: 20px;
    }
    .createTime{
      font-weight: normal;
      margin-left: 30px;
    }
  }
}
</style>
