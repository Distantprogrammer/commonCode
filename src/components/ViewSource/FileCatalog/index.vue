<script setup>
import { Folder, FolderOpened } from '@element-plus/icons'
import { onMounted, reactive } from 'vue'
import mitt from '@/utils/mitt.js'
const defaultProps = { children: 'children', label: 'label' }
const props = defineProps({
  treeData: {
    type: Object,
    default: () => []
  }
})
onMounted(() => {})
const handleNodeClick = (data, node) => {
  if (data.type !== 'file') return
  const fileType = data?.label.includes('.') ? data?.label.split('.').pop() : ''
  console.log(fileType)
  mitt.emit('handleChange', { data, fileType })
}

// 前端无法直接获取文件夹的完整路径，前端浏览器环境受到安全限制，无法直接访问文件系统的路径信息。
// 可以使用桌面应用程序或与操作系统的集成来实现 这样的解决方案通常需要借助Electron、NW.js等桌面应用程序开发框架来实现。
const loadNode = async (node, resolve) => {
  // console.log(node);
  // if (node.level === 0) {
  //  const res = await getFileList("B:\\tsg\\qiankun\\qiankun-example\\server")
  //  return resolve(res)
  // }
  // if (node.level > 1) return resolve([])
  // // const res = await getFileList(node.data.location)
  // return resolve(node.data.children)
}
</script>

<template>
  <div class="file_catalog_box">
    <div class="file_catalog">
      <el-tree
        :data="props.treeData"
        :indent="5"
        :props="defaultProps"
        @node-click="handleNodeClick"
      >
        <template #default="{ node, data }">
          <span style="display: flex; align-items: center; gap: 5px">
            <!-- <i class="el-icon-folder"></i> -->
            <img v-if="data.fileIcon" :src="data.fileIcon" style="width: 16px; height: 16px" />
            <el-icon v-else-if="data.type === 'folder'" :size="16">
              <FolderOpened v-if="node.expanded" />
              <Folder v-else />
            </el-icon>
            {{ node.label }}
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$background-color: #fcfcfc;
$hover-background-color: #d3d3d8;
.file_catalog_box {
  color: #000;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: $background-color;
  .file_catalog {
    width: 300px;
    background-color: $background-color;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: background-color;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
    background: #a7a7a8;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      display: block;
      background-color: #a7a7a8;
    }
  }
}

:deep(.el-tree) {
  --el-tree-node-hover-bg-color: transparent;
  background-color: transparent !important;
  .el-tree-node__content {
    background-color: transparent;
    &:hover {
      background-color: $hover-background-color !important;
    }
  }

  // 解决无children的子级也会出现下拉箭头
  .el-tree-node__expand-icon.is-leaf {
    visibility: hidden;
  }
}
</style>
