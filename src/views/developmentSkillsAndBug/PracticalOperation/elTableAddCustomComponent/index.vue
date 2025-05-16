<template>
  <div class='page-wrapper'>
    <div class='app-container fill'>
      <div>
        整列编辑表格,
        element-plus 版本更新，fixed="right" 写法与之前不同，在创建元素时得自行查看dom树不同之处，以做调整
      </div>
      <div style="text-align: right;">
        <el-button type="primary" @click="editTable">编辑表格</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="600"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="600"> </el-table-column>
        <el-table-column prop="address" label="地址" width="600"> </el-table-column>
        <template v-if="isEditTable">
          <el-table-column label="编辑" fixed="right" width="400">
            <template #default="{ row, $index }">
              <el-input v-model="row.name" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="编辑" fixed="right" width="400">
            <template #default="{ row, $index }">
              <el-input v-model="row.name" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
        </template>
        <template #append v-if="isEditTable">
          <div style="height: 60px;"></div>
        </template>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import { defineComponent, ref, createApp, h } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
defineOptions({ name: 'elTableAddCustomComponent' })
const tableData = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }
]
const isEditTable = ref(false)
const editTable = () => {
  if (isEditTable.value) return false
  isEditTable.value = true
  const TableSaveBtn = defineComponent({
    name: 'TableSaveBtn',
    setup () {
      return () => h('div', [
        h(ElButton, {
          type: 'primary',
          onClick: submit
        }, '保存'),
        h(ElButton, {
          onClick: cancel
        }, '取消')
      ])
    }
  })
  setTimeout(() => {
    const box = document.createElement('div')
    // const fixedRightRect = document.querySelector('.el-table_fixed-right').getBoundingClientRect()
    // 新版的elementui已经没有fixed-right了，需要使用thead .el-table-fixed-column--right来获取
    const fixedRightRect = document.querySelectorAll('thead .el-table-fixed-column--right')
    // 算出最右边的fixed-right的总宽度
    const fixedRightWidth = Array.from(fixedRightRect).reduce((prev, curr) => {
      console.log(curr.offsetWidth);
      return prev + curr.offsetWidth
    }, 0)

    // 获取表格append的
    fixedRightRect.forEach
    // 获取表格append的
    const appendwrapperRect = document.querySelector('.el-table__append-wrapper').getBoundingClientRect()
    box.style.width = `${fixedRightWidth}px`
    box.style.height = `${appendwrapperRect.height}px`
    box.classList.add('table_submit_btn')
    box.setAttribute('id', 'table_submit_btn')
    document.querySelector('.el-table .el-table__body-wrapper .el-scrollbar__view').appendChild(box)
    createApp(TableSaveBtn).mount('#table_submit_btn')
  })
}
const submit = () => {
  ElMessage.success('保存成功')
  cancel()
}
const cancel = () => {
  isEditTable.value = false
  document.querySelector('.el-table .el-table__body-wrapper .el-scrollbar__view').removeChild(
    document.querySelector('#table_submit_btn')
  )

}
</script>
<style lang="scss">
.table_submit_btn {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
</style>