<template>
  <Logo v-if="showLogo" />
  <Menu />
</template>

<script setup>
import Menu from '../Menu/index.vue'
import Logo from './components/Logo.vue'

defineOptions({ name: 'AppLayoutAside' })

const showLogo = inject('showLogo')
</script>

<style lang="scss" scoped></style>
