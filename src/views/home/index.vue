<template>
  <div class="page-wrapper flex-vertical">
    <div class="app-container fill">
      快速配置路由
      <div>
        <div class="tree">
          <h2>现有菜单</h2>
          <el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false"
            :props="defaultProps">
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ $t(data.meta.title) }}</span>
              </span>
            </template>
          </el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'PageHome' })
import { ref, reactive } from 'vue'
import dynamicRouter from '@/assets/json/dynamic-router.json'
const defaultProps = {
  children: 'children',
  label: 'name',
}

const data = ref(dynamicRouter.data)


</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
