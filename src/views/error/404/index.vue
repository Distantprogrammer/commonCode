<template>
  <div class="page-wrapper">
    <el-result :sub-title="$t('error.error_404')">
      <template #icon>
        <el-image :src="img404" />
      </template>
      <template #extra>
        <el-button type="primary" @click="back">{{ $t('error.back_home') }}</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import img404 from '@/assets/images/404.png'

defineOptions({ name: 'Page404' })

const router = useRouter()

const back = () => {
  router.replace('/')
}
</script>

<style scoped lang="scss">
.el-image {
  width: 512px;
}
</style>