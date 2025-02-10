<template>
  <div class='page-wrapper flex-vertical'>
    <div class='app-container fill'>
      <div class='game-platform'>
        <div class='main-content'>
          <module-box title='前言' v-if='false'>
            <ProjectInfo></ProjectInfo>
          </module-box>
          <module-box title='推荐目录'>
            <RecommendCatalog></RecommendCatalog>
          </module-box>
          <module-box title='组件' style='margin-top: 20px'>
            <ComponentsModule :components-list='componentsList'></ComponentsModule>
          </module-box>
          <module-box title='开发技巧与bug' style='margin-top: 20px'>
            <DevelopmentSkillsAndBug :practical-operation-list='practicalOperationList'></DevelopmentSkillsAndBug>
          </module-box>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import ModuleBox from '@/views/home/components/ModuleBox.vue'
import ProjectInfo from '@/views/home/components/ModuleItem/ProjectInfo.vue'
import RecommendCatalog from '@/views/home/components/ModuleItem/RecommendCatalog.vue'
import ComponentsModule from '@/views/home/components/ModuleItem/ComponentsModule.vue'
import DevelopmentSkillsAndBug from '@/views/home/components/ModuleItem/DevelopmentSkillsAndBug.vue'
import useAuthStore from '@/stores/modules/auth.js'
import { storeToRefs } from 'pinia'
import { filterRouter } from '@/utils/util'

const auth = useAuthStore()
const { dynamicMenuList } = storeToRefs(auth)
const componentsList = ref([])
const practicalOperationList = ref([])
componentsList.value = filterRouter(dynamicMenuList.value, 'PageComponents', true)
practicalOperationList.value = filterRouter(dynamicMenuList.value, 'developmentSkillsAndBugPracticalOperation', true)
</script>

<style lang='scss' scoped>
.game-platform {
  background-color: transparent;
  color: var(--el-text-color);
}


:deep(.el-button-blue) {
  background: rgb(235.9, 245.3, 255);
  color: #409eff;
}

:deep(.el-button-grey) {
  //background: rgba(255, 255, 255, 0.1);
}

.main-content {
  flex: 1;
  padding: 20px 40px;
  background-color: transparent;
}
</style>