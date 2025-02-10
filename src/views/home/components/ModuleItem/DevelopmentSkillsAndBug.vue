<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps({
  practicalOperationList: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const tabsList = ref([
  {
    name: '相关文章',
    dec: '开发技巧与bug的相关解决文章',
  },
  {
    name: '代码演示',
    dec: '开发技巧与bug的实际操作,需要跳转到相关的页面'
  }
])

const tabsIndex = ref(0)
const relatedArticleList = ref([])
const typeEnum = {
  skill: 'success',
  bug: 'danger',
  other: 'info'
}
const tabsChange = (index) => {
  tabsIndex.value = index
}
const toLink = (item) => {
  // window.open(item.link,'_blank')
  window.open(item.link, '_blank', 'width=1200,height=800,left=100,top=100');
}
const toPage = (item) => {
  router.push({
    path: item.path
  })
}
const getList = () => {
  fetch(new URL('@/assets/json/developmentSkillsAndBugList.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      relatedArticleList.value = res.data
    })
}

getList()

</script>

<template>
  <div class='development-skills-box'>
    <div class='development-skills-tabs'>
      <div class='tabs-item' v-for='(item, index) in tabsList' :key='item.name' @click='tabsChange(index)'
        :class='{ "active": tabsIndex === index }'>
        <div class='tabs-item-title'>{{ $t(item.name) }}</div>
      </div>
    </div>
    <div class='development-skills-dec'>
      {{ tabsList[tabsIndex].dec }}
    </div>
    <div class='development-skills-list'>
      <template v-if="tabsIndex === 0">
        <div class='list-item' v-for='(item, index) in relatedArticleList' :key='item.id'>
          <div class='item-order'>{{ index + 1 }}、</div>
          <div class='item-createTime'>{{ item.createTime }}</div>
          <div class='item-title' @click='toLink(item)'>{{ item.title }}</div>
          <div class='item-tag'>
            <el-tag size="mini" :type='typeEnum[item.type]'>{{ $t(`common.${item.type}`) }}</el-tag>
          </div>
        </div>
      </template>
      <template v-else>
        <div class='list-item' v-for='(item, index) in practicalOperationList' :key='item.id'>
          <div class='item-order'>{{ index + 1 }}、</div>
          <div class='item-title' @click='toPage(item)'>{{ $t(item.meta.title) }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.development-skills-box {
  padding-top: 20px;

  .development-skills-tabs {
    display: flex;
    //justify-content: center;
    align-items: center;
    font-weight: 600;

    .tabs-item {
      margin-left: 20px;
      cursor: pointer;
      opacity: 0.6;

      &:first-child {
        margin-left: 0;
      }

      &.active {
        opacity: 1;
      }
    }
  }

  .development-skills-dec {
    font-size: 15px;
    font-weight: 500;
    line-height: 36px;
    opacity: 0.6;
    //text-align: center;
  }

  .development-skills-list {
    //padding: 20px 100px;

    .list-item {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      min-height: 50px;
      margin: 10px 0;
      border: 1px solid #f6f6f6;
      cursor: pointer;
      border-radius: 5px;

      .item-title,
      .item-order,
      .item-createTime {
        opacity: 0.6;
      }

      .item-title,
      .item-createTime,
      .item-tag {
        margin-left: 30px;
      }

      .item-title {
        font-weight: 600;
      }

      &:hover {
        .item-title {
          opacity: 1;
        }
      }
    }
  }
}
</style>