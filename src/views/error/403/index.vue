<template>
  <div class="page-wrapper">
    <el-result :sub-title="$t('error.error_403')">
      <template #icon>
        <el-image :src="img403" />
      </template>
      <template #extra>
        <el-button type="primary" @click="back">{{ $t('error.back_home') }}</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import img403 from '@/assets/images/403.png'

defineOptions({ name: 'Page403' })

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