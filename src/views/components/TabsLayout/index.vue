<template>
  <div class="page-wrapper">
    <div class="app-container fill">
      <TabsLayout :tabsOptions="tabsOptions">
        <template #fistTab>
          <div>1</div>
        </template>
        <template #towTab>
          <div>2</div>
        </template>
        <template #thirdTab>
          <div>3</div>
        </template>
        <template #fourthTab1>
          <div>4-1</div>
        </template>
        <template #fourthTab2>
          <div>4-2</div>
        </template>
      </TabsLayout>
    </div>
  </div>
</template>
<script setup>
defineOptions({ name: 'tabsLayout' })
import TabsLayout from './components/TabsLayout.vue'
const tabsOptions = [
  {
    name: 'fistTab',
    label: '第一个tab'
  },
  {
    name: 'towTab',
    label: '第二个tab'
  },
  {
    name: 'thirdTab',
    label: '第三个tab'
  },
  {
    name: 'fourthTab',
    slot: ['fourthTab1', 'fourthTab2'],
    label: '自定义slot'
  }
]
</script>
