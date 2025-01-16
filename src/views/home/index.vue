<template>
  <div class="game-platform">
    <div class="main-content">
      <module-box title='推荐目录'>
        <div class='recommend-box'>
          <div class='recommend-title'>快速新建菜单 </div>
          <div class='recommend-dec'>
            快速新建菜单快速新建菜单快速新建菜单快速新建菜单快速新建菜单快速新建菜单
          </div>
          <div class='recommend-btn'>
            <el-button class='el-button-blue'>添加菜单</el-button>
            <el-button class='el-button-grey'>查看现有菜单</el-button>
          </div>
        </div>
      </module-box>
      <module-box title='组件' style='margin-top: 20px'>
        <el-scrollbar>
          <div class='components-box'>
            <!-- :style="{'background-image':item.img}" -->
            <div class='components-item' v-for="(item, index) in componentsList" :key="item.path">
              <div class="components-info">
                <div class='components-title'>{{ $t(item.name) }}</div>
                <div class='components-dec'>
                  组件名称组件名称组件名称组件名称组件名称组件名称
                </div>
                <div class="components-tag">
                  标签标签标签
                </div>
              </div>
              <div class='components-btn'>
                <el-button class='el-button-blue'>查看组件</el-button>
                <el-button class='el-button-grey'>查看代码</el-button>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </module-box>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ModuleBox from '@/views/home/components/ModuleBox.vue'
import useAuthStore from '@/stores/modules/auth.js';
import { storeToRefs } from 'pinia';
const autn = useAuthStore()
const { dynamicMenuList } = storeToRefs(autn);
console.log(dynamicMenuList)
const componentsList = ref([])
const filterRouter = (key, isChildren = false) => {
  const arr = dynamicMenuList.value.filter(item => {
    return item.name == key
  })
  if (isChildren) {
    const newArr = []
    arr.forEach(item => {
      if (item.children) newArr.push(...item.children)
    });
    return newArr
  }
  return arr
}
componentsList.value = filterRouter('PageComponents', true)
</script>

<style lang="scss" scoped>
.game-platform {
  background-color: transparent;
  color: var(--el-text-color);
}

:deep(.el-button) {
  padding: 0;
  border-radius: 4px;
  font-weight: 500;
  height: 43px;
  line-height: 43px;
  font-size: 13px;
  text-align: center;
  border: none;
  color: var(--el-text-color);
}

.el-button-blue {}

.el-button-grey {
  background: rgba(255, 255, 255, 0.1);
}

.recommend-box {
  height: 320px;

  .recommend-title {
    font-size: 52px;
    font-weight: 700;
    line-height: 104.26px;
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
    }
  }

}

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
    background: rgba(3, 6, 22, 1);
    border: 1px solid rgba(255, 255, 255, 0.08);
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

      .components-tag {
        font-size: 13px;
        font-weight: 700;
        line-height: 18.82px;
      }

    }

    .components-btn {
      .el-button {
        min-width: 140px;
      }
    }
  }
}

.main-content {
  flex: 1;
  padding: 20px 40px;
  background-color: transparent;
}
</style>