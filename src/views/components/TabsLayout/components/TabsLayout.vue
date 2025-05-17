<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  isCard: {
    type: Boolean,
    default: false
  },
  tabsOptions: {
    type: Array,
    default: () => {
      return []
    }
  },
  tabSelectValue: {
    type: String,
    default: ''
  },
  // 需要beforelLeave的tabName数组
  beforeLeaveArr: {
    type: Array,
    default: () => []
  },
  beforeLeave: {
    type: Function,
    default: () => { }
  }
})
const emits = defineEmits(['tabChange', 'update:model-value'])
const tabSelect = ref('')
const handleTabClick = () => {
  emits('update:tabSelectValue', tabSelect.value)
}
const handleTabChange = (TabPaneName) => {
  emits('tabChange', TabPaneName)
  emits('update:tabSelectValue', TabPaneName)
}
watch(() => props.tabSelectValue,
  (newVal) => {
    tabSelect.value = newVal || props.tabsOptions[0]?.name
  },
  {
    deep: true,
    immediate: true
  })
</script>

<template>
  <div class="container-box" :class="isCard ? 'view_box' : 'mine-page-box'">
    <el-tabs v-model="tabSelect" class="viewer_tabs" size="small" :type="isCard ? 'card' : ''"
      @tab-remove="name => $emit('tab-remove', name)" @tab-click="handleTabClick" @tab-change="handleTabChange"
      :before-leave="beforeLeave">
      <el-tab-pane v-bind="{ ...item }" v-for="item in tabsOptions" :key="item.name">
        <template #label>
          <div class="tabs-button-box">
            {{ item.label }}
          </div>
        </template>

        <template v-if="item.slot">
          <slot v-for="slotName in item.slot" :ref="slotName + 'ref'"
            :name="tabsOptions.length > 1 ? item.slotName : 'default'" />
        </template>
        <template v-else>
          <slot :name="tabsOptions.length > 1 ? item.name : 'default'" ref="aaa" />
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>




<style scoped lang="scss">
::v-deep .el-tabs.viewer_tabs {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);

  .el-tabs__header {
    border-bottom: none;

    .el-tabs__nav {
      display: flex;
      border: none;

    }

    .is-closable {
      display: flex;
      align-items: flex-start;
    }

    .el-tabs__item {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-weight: bold;
      outline: none;
      color: #333;
    }
  }

  .el-tabs__content {
    width: 100%;
    height: 100%;
    overflow: auto;
    flex-grow: 1;

    .el-tab-pane {
      width: 100%;
      height: 100%;
    }
  }
}

.view_box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  ::v-deep .el-tabs.viewer_tabs {
    .el-tabs__item {
      height: 40px;
      line-height: 40px;
      border: 1px solid #eaecf1;

      &.is-active {
        border-bottom: 1px solid #ffffff;
      }
    }
  }
}

.mine-page-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  ::v-deep .el-tabs.viewer_tabs {
    .el-tabs__nav-wrap {
      padding: 0 20px;

      &::after {
        content: '';
        background-color: transparent;
      }
    }

    .el-tabs__active-bar {
      background-color: #019776;
    }

    .el-tabs__item {
      height: 40px;
      line-height: 40px;
      border: none;

      &.is-active {
        border-bottom: 1px solid #ffffff;
      }
    }
  }
}
</style>