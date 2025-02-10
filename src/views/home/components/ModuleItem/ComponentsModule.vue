<script setup>
import ViewSource from '@/components/ViewSource/index.vue'
const props = defineProps({
  componentsList: {
    type: Array,
    default: () => {
      return []
    }
  }
})
</script>

<template>
  <el-scrollbar>
    <div class='components-box'>
      <!-- :style="{'background-image':item.img}" -->
      <div class='components-item' v-for='(item, index) in componentsList' :key='item.path'>
        <div class='components-info'>
          <div class='components-title'>{{ $t(item.meta.title) }}</div>
          <div class='components-dec'>
            组件名称组件名称组件名称组件名称组件名称组件名称
          </div>
        </div>
        <div class='components-item-children' v-if='item.children'>
          <el-button class='children-item el-button-blue' @click="$router.push(children.path)" v-for='(children,i) in item.children' :key="children.name">
            {{ $t(children.meta.title) }}
          </el-button>
        </div>
        <div class='components-btn' v-if="!item.children">
          <el-button class='el-button-blue' type='primary' @click="$router.push(item.path)">查看组件</el-button>
          <el-button class='el-button-grey' type='info'>查看代码</el-button>
        </div>
      </div>
    </div>
    <!-- <ViewSource></ViewSource> -->
  </el-scrollbar>
</template>

<style scoped lang='scss'>
.components-box {
  padding: 35px 0;
  display: flex;
  align-items: center;
  // width: 100%;
  // overflow-x: auto;

  .components-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    min-width: 492px;
    height: 246px;
    padding: 30px;
    border-radius: 8px;
    //background: rgba(3, 6, 22, 1);
    border: 1px solid rgba(0, 0, 0, 0.08);
    //background-image: url('@/assets/images/components_item_bg.jpg');
    background-position-x: 100px;
    background-repeat: no-repeat;
    background-size: cover;
    margin-left: 42px;

    &:first-child {
      margin-left: 0;
    }

    .components-info {

      .components-title {
        font-size: 20px;
        font-weight: 700;
        line-height: 28.96px;
      }

      .components-dec {
        opacity: 0.6;
        font-size: 15px;
        font-weight: 500;
        line-height: 36px;
      }


    }

    .components-item-children {
      :deep(.el-button) {
        min-width: 80px;
        padding: 10px;
        border-radius: 4px;
        font-weight: 500;
        height: 43px;
        line-height: 43px;
        font-size: 13px;
        text-align: center;
        border: none;
      }
    }

    .components-btn {
      .el-button {
        min-width: 40px;
      }
    }
  }
}
</style>