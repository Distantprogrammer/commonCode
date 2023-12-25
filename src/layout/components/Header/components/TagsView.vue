<template>
  <div class="tags-view-wrapper">
    <el-scrollbar>
      <div class="tags-wrapper">
        <template v-for="tag in tagsViewStore.tagsViewList" :key="tag.path">
          <el-tag
            class="tags-view--tag"
            :class="{ 'view-active': active === tag.path }"
            type="info"
            :closable="tag.close"
            @click="tagsClick(tag)"
            @close="tagsClose(tag.path)"
            >{{ $t(tag.title) }}</el-tag
          >
        </template>
      </div>
    </el-scrollbar>
    <div class="more-wrapper">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link pointer">       
          <el-text>{{ $t('common.more') }}</el-text>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="current" icon="Remove">{{ $t('tags_view.close_current')}}</el-dropdown-item>
            <el-dropdown-item command="left" icon="DArrowLeft">{{ $t('tags_view.close_left')}}</el-dropdown-item>
            <el-dropdown-item command="right" icon="DArrowRight">{{ $t('tags_view.close_right')}}</el-dropdown-item>
            <el-dropdown-item command="other" divided icon="CircleClose">{{ $t('tags_view.close_other')}}</el-dropdown-item>
            <el-dropdown-item command="clear" icon="SwitchButton">{{ $t('tags_view.close_all')}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import useTagsViewStore from '@/stores/modules/tags-view'

defineOptions({ name: 'AppTagsView' })

const route = useRoute()
const router = useRouter()
const tagsViewStore = useTagsViewStore()

const active = ref(route.fullPath)

const tagsClick = item => {
  router.push(item.path)
}

const tagsClose = path => {
  tagsViewStore.remove(path, active.value === path)
}

const handleCommand = command => {
  switch (command) {
    case 'current':
      tagsViewStore.remove(active.value, true)
      break
    case 'left':
      tagsViewStore.clearLeft(active.value)
      break
    case 'right':
      tagsViewStore.clearRight(active.value)
      break
    case 'other':
      tagsViewStore.clearOther(active.value)
      break
    case 'clear':
      tagsViewStore.clear(active.value)
      break

    default:
      break
  }
}

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull) return
    active.value = route.fullPath
    const tabsParams = {
      icon: route.meta.icon,
      title: route.meta.title,
      path: route.fullPath,
      name: route.name,
      close: !route.meta.isAffix,
      keepAlive: route.meta.isKeepAlive
    }
    tagsViewStore.insert(tabsParams)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.tags-view-wrapper {
  display: flex;
  justify-content: space-between;

  .tags-wrapper {
    display: flex;
    flex-wrap: nowrap;
    // border-left: var(--style-border);

    .tags-view--tag {
      line-height: 27px;
      padding: 0 15px;
      font-size: 12px;
      cursor: pointer;
      border-radius: 0;
      height: 27px;
      border: 0;
      background-color: transparent;
      border-right: var(--style-border);

      &.view-active {
        color: var(--el-color-primary);
      }
    }
  }

  .more-wrapper {
    height: 27px;
    padding: 0 10px;
    border-left: var(--style-border);
    display: flex;
    align-items: center;

    .el-dropdown-link:focus {
      outline: none;
    }
    
    .el-text {
      font-size: 12px;
    }
  }
}
</style>
