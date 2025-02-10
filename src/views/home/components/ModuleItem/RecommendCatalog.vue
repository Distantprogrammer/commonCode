<script setup>
import { ref } from 'vue'
import NewMenu from '@/views/home/components/NewAddMenu.vue'

const newMenuRef = ref(null)

const addMenu = () => {
  newMenuRef.value.openDialog()
}
</script>

<template>
  <div class='recommend-box'>
    <div class='recommend-title'>快速新建菜单</div>
    <div class='recommend-dec'>
      快速新建菜单快速新建菜单快速新建菜单快速新建菜单快速新建菜单快速新建菜单
    </div>
    <div class='recommend-btn'>
      <el-button class='el-button-blue' @click='addMenu'>添加菜单</el-button>
      <el-button class='el-button-grey'>查看现有菜单</el-button>
    </div>
    <NewMenu ref='newMenuRef'></NewMenu>
  </div>
</template>

<style scoped lang='scss'>
.recommend-box {
  height: 200px;

  .recommend-title {
    font-size: 40px;
    font-weight: 700;
    line-height: 64.26px;
  }

  .recommend-dec {
    font-size: 15px;
    font-weight: 500;
    line-height: 36px;
    opacity: 0.6;
  }

  .recommend-btn {
    margin-top: 20px;

    :deep(.el-button) {
      min-width: 140px;
      padding: 0;
      border-radius: 4px;
      font-weight: 500;
      height: 43px;
      line-height: 43px;
      font-size: 13px;
      text-align: center;
      border: none;
    }
  }

}
</style>