<template>
  <div class="widget-wrapper">
    <el-dropdown @command="handTranslate" size="default">
      <span class="el-dropdown-link">
        <SvgIcon color="var(--el-text-color-regular)" icon="translate" size="24px" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-CN" :disabled="language === 'zh-CN'">{{ $t('language.zh_cn') }}</el-dropdown-item>
          <el-dropdown-item command="en-US" :disabled="language === 'en-US'">{{ $t('language.en_us') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon/index.vue'
import useAppStore from '@/stores/modules/app'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AppTranslate' })

const { locale } = useI18n()
const appStore = useAppStore()
const language = computed(() => appStore.language)

const handTranslate = command => {
  locale.value = command
  appStore.translate(command)
}
</script>
