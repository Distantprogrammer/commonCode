<script setup>
/**
 * @description
 * 组件自带的，我操，不看文档
 * el-table 绑定 row-key="id"
 *  <el-table-column :reserve-selection="true" type="selection" /> :reserve-selection='true'
 *
 */
import { nextTick, ref } from 'vue'

defineOptions({ name: 'PageTableMemorySelectionV3' })
const tableData = ref([
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    id: 123456
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    id: 789012
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    id: 345678
  },
  {
    date: '2016-05-05',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    id: 987654
  },
  {
    date: '2016-05-08',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    id: 98323
  },
  {
    date: '2016-05-06',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    id: 98231
  },
  {
    date: '2016-05-07',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    id: 3126318
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    id: 231235
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    id: 5453435
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    id: 432121
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    id: 154675534
  },
  {
    date: '2016-05-08',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    id: 2312312132
  },
  {
    date: '2016-05-06',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    id: 5454534
  },
  {
    date: '2016-05-07',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    id: 646765152
  }
])
const copyTableData = ref([...tableData.value])
const tableRef = ref(null)
const multipleSelection = ref([])
const currentPage = ref(1)
const pageSize = ref(5)
tableData.value = copyTableData.value.slice(
  (currentPage.value - 1) * pageSize.value,
  currentPage.value * pageSize.value
)
const handleSelectionChange = () => { }
const toggleSelection = rows => {
  if (rows) {
    rows.forEach(row => {
      tableRef.value.toggleRowSelection(row)
    })
  } else {
    tableRef.value.clearSelection()
  }
}
const handleSizeChange = val => {
  pageSize.value = val
  tableData.value = copyTableData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
  echoSelection()
}
const handleCurrentChange = val => {
  currentPage.value = val
  tableData.value = copyTableData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
  echoSelection()
}

// 分页后回显选择的数据
const echoSelection = () => {
  tableData.value.forEach((item, index) => {
    if (multipleSelection.value.includes(item.id)) {
      nextTick(() => {
        tableRef.value.toggleRowSelection(item)
      })
    }
  })
}
// 单选全选触发
const selectFn = row => {
  // 存储的选择项与刚选择的选择项
  multipleSelection.value = Array.from(
    new Set([...multipleSelection.value, ...row.map(item => item.id)])
  )
  // 过滤出没有选择的数据，以这些数据删除multipleSelection里的数据 row只会给选择的数据，所以这里查找没选择的数据
  const arr = tableData.value
    .filter(item => row.findIndex(obj => obj.id === item.id) === -1)
    .map(item => item.id)
  // 过滤取消选择的数据
  multipleSelection.value = multipleSelection.value.filter(item => !arr.includes(item))
}
</script>
<template>
  <div class="page-wrapper flex-vertical">
    <div class="app-container fill">
      <pre>
/**
 * @description
 * 组件自带的
 * el-table 绑定 row-key="id" 
 * &lt;el-table-column :reserve-selection="true" type="selection" /> :reserve-selection='true'
 * 
 */
      </pre>
      <el-table ref="tableRef" :data="tableData" tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange" @select="selectFn" @select-all="selectFn" row-key="id" height="450">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="日期" width="120">
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip> </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
      <div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="20">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
