<template>
  <el-scrollbar>
    <el-main style="position: relative" class="main_content">
      <div class="view-source-btn">
        <el-button class="btn" @click="showViewSourceDialog = true">查看代码</el-button>
      </div>
      <router-view v-slot="{ Component, route }">
        <transition appear name="fade-transform" mode="out-in">
          <keep-alive :include="keepAliveStore.keepAliveName">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
      <div>
        <div id="subapp-viewport"></div>
      </div>
      <el-dialog
        v-model="showViewSourceDialog"
        class="no-padding-dialog"
        fullscreen
        :close-on-click-modal="false"
        :destroy-on-close="false"
      >
        <el-icon color="#000" class="close-icon">
          <Close @click="showViewSourceDialog = false" />
        </el-icon>
        <ViewSource :tree-data="treeData" />
      </el-dialog>
    </el-main>
  </el-scrollbar>
</template>

<script setup>
import useKeepAliveStore from '@/stores/modules/keep-alive'
import ViewSource from '@/components/ViewSource/index.vue'
import { Close } from '@element-plus/icons'
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
defineOptions({ name: 'AppLayoutMain' })

const keepAliveStore = useKeepAliveStore()
const isScroll = computed(() => {
  return !(route?.meta?.overflow === 'hidden')
})
const showViewSourceDialog = ref(false)

const treeData = ref([])
const viewsData = ref([])
onMounted(async () => {
  // 读取本地 file-tree.json
  const res = await fetch(
    new URL('@/components/ViewSource/data/file-tree.json', import.meta.url).href
  )
  console.log(route);
  treeData.value = await res.json()
  // viewsData.value = treeData.value.filter(item => item.type === 'file')
})
</script>
<style lang="scss" scoped>
.main_content {
  overflow: hidden;

  &.is_scroll {
    overflow-y: auto;
  }
}

.view-source-btn {
  position: absolute;
  top: 15px;
  right: 15px;

  .btn {
    background: transparent;
    color: #000;
    font-weight: 800;
  }
}

:deep(.no-padding-dialog) {
  padding: 0;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__footer {
    display: none;
  }
  .el-dialog__body {
    padding: 16px;
    padding-top: 25px;
    height: 100%;
  }
}

.close-icon {
  position: absolute;
  top: 5px;
  right: 15px;
  font-size: 20px;
  z-index: 999;
  cursor: pointer;
}
</style>
