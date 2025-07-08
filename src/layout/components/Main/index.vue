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
        <div class="need_code">
          只支持查看
          {{ ['js', 'ts', 'jsx', 'tsx', 'vue', 'html', 'css', 'scss', 'less'].join(',') }}
        </div>
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
import { useRequire } from '@/hooks/useRequire.js'

const route = useRoute()
defineOptions({ name: 'AppLayoutMain' })
const keepAliveStore = useKeepAliveStore()
const isScroll = computed(() => {
  return !(route?.meta?.overflow === 'hidden')
})
const showViewSourceDialog = ref(false)

const treeData = ref([])
const noIconArr = ref([])
const haveIconArr = ref([])
const setFileIcon = data => {
  const iconMap = {
    image: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
    video: ['mp4', 'avi', 'mov', 'mkv', 'webm'],
    markdown: ['md', 'markdown'],
    text: ['txt']
  }

  data.forEach(item => {
    const label = item.label || ''
    const fileType = label.includes('.') ? label.split('.').pop() : ''
    let iconType = ''

    if (iconMap.image.includes(fileType)) iconType = 'image'
    else if (iconMap.video.includes(fileType)) iconType = 'video'
    else if (iconMap.markdown.includes(fileType)) iconType = 'markdown'
    else if (iconMap.text.includes(fileType)) iconType = 'text'

    if (iconType) {
      item.fileIcon = useRequire(`@/assets/icons/file_type_${iconType}.svg`)
    } else if (haveIconArr.value.includes(fileType)) {
      item.fileIcon = useRequire(`@/assets/icons/file_type_${fileType}.svg`)
    } else {
      item.fileIcon = ''
      if (fileType) noIconArr.value.push(fileType)
    }
    if (item.children?.length) setFileIcon(item.children)
  })
}
onMounted(async () => {
  // 读取本地 file-tree.json
  const res = await fetch(
    new URL('@/components/ViewSource/data/file-tree.json', import.meta.url).href
  )
  treeData.value = await res.json()
  const modules = import.meta.glob('@/assets/icons/**/*.svg')
  haveIconArr.value = Object.keys(modules).map(item =>
    item.split('/').at(-1).split('_').at(-1).split('.').at(0)
  )
  setFileIcon(treeData.value)
  // console.log(Array.from(new Set(noIconArr.value.filter(Boolean))))
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
  .need_code {
    position: absolute;
    top: 0px;
    font-size: 14px;
    color: #999;
  }
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
