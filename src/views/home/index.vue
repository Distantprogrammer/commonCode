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
                <span>
                  <el-button type="text" @click="append(data)">添加目录</el-button>
                  <el-button type="text" @click="remove(node, data)">删除目录</el-button>
                </span>
              </span>
            </template>
          </el-tree>
        </div>
        <el-dialog title="提示" v-model="dialogVisible" width="50%" destroy-on-close :before-close="handleClose">
          <div class="form">
            <el-form ref="formRef" :model="form" :rules="rules" label-width="150px">
              <el-form-item label="菜单中文名称" prop="zhName">
                <el-input v-model="form.zhName"></el-input>
              </el-form-item>
              <el-form-item label="菜单英文名称" prop="usName">
                <el-input v-model="form.usName"></el-input>
              </el-form-item>
              <el-form-item label="路由地址（path）" prop="path">
                <el-input v-model="form.path"></el-input>
              </el-form-item>
              <el-form-item label="路由地址（name）" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="重定向地址" prop="redirect">
                <el-input v-model="form.redirect"></el-input>
              </el-form-item>
              <el-form-item label="视图文件路径" prop="component">
                <el-input v-model="form.component">
                  <template #prepend>
                    {{
            currentNodeData.component.replace(currentNodeData.component.split('/')[currentNodeData.component.split('/').length
              - 1], '') }}

                  </template>
                  <template #append>
                    /index.vue
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="菜单图标" prop="icon">
                <el-input v-model="form.icon"></el-input>
              </el-form-item>
              <el-form-item label="菜单标题" prop="title">
                <el-input v-model="form.title" type="text">
                  <template #prepend>
                    router.
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="是否全屏" prop="isFull">
                <el-radio-group v-model="form.isFull">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="页签是否固定" prop="isAffix">
                <el-radio-group v-model="form.isAffix">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否缓存" prop="isKeepAlive">
                <el-radio-group v-model="form.isKeepAlive">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否高亮" prop="activeMenu">
                <el-radio-group v-model="form.activeMenu">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否外链" prop="isLink">
                <el-radio-group v-model="form.isLink">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否隐藏" prop="isHide">
                <el-radio-group v-model="form.isHide">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>

          <template #footer>
            <span class="dialog-footer">
              <el-button @click="handleClose">取 消</el-button>
              <el-button type="primary" @click="submitEvent">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'PageHome' })
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { addRouter, readFile, createFolder } from '@/api/home/index.js'
import useLanguagesZhData from '@/plugins/use-languages/modules/zh-CN.js'
import useLanguagesEnData from '@/plugins/use-languages/modules/en-US.js'
const router = useRouter()
import dynamicRouter from '@/assets/json/dynamic-router.json'
const defaultProps = {
  children: 'children',
  label: 'name',
}

const data = ref(dynamicRouter.data)
const dialogVisible = ref(false)
const form = reactive({
  // zhName: '',
  // usName: '',
  // path: '',
  // name: '',
  // redirect: '',
  // component: '',
  // icon: '',
  // title: '',
  // isFull: false,
  // isAffix: false,
  // isKeepAlive: false,
  // activeMenu: false,
  // isLink: false,
  // isHide: false,
  zhName: '测试',
  usName: 'test',
  path: '/test',
  name: 'test',
  redirect: '',
  component: 'test',
  icon: '',
  title: 'test',
  isFull: false,
  isAffix: false,
  isKeepAlive: false,
  activeMenu: false,
  isLink: false,
  isHide: false,
})
const rules = {
  path: [
    { required: true, message: '请输入路由地址（path）', trigger: 'blur' },
  ],
  component: [
    { required: true, message: '请输入视图文件路径', trigger: 'blur' },
  ],
  title: [
    { required: true, message: '请输入菜单标题', trigger: 'blur' },
  ],
}
const formRef = ref(null)
// 当前点击的节点 这里浅拷贝，方便一点，不需要提交的时候去查找
let currentNodeData = null
const append = (data) => {
  dialogVisible.value = true
  currentNodeData = data
  console.log(data);
}
const remove = (node, data) => {
  console.log(node, data);
}
const handleClose = () => {
  dialogVisible.value = false
}
const submitEvent = () => {

  formRef.value.validate((valid) => {
    if (valid) {
      console.log('表单验证通过');
      setSubmitParams()
      // 在这里执行您的表单提交逻辑
    } else {
      console.log('表单验证失败');
      return false;
    }
  })
}

// 提交前参数设置
const setSubmitParams = async () => {
  const useLanguagesZh = '/src/plugins/use-languages/modules/zh-CN.js'
  const useLanguagesEn = '/src/plugins/use-languages/modules/en-US.js'
  const routerUrl = '/src/assets/json/dynamic-router.json'
  const newIndexTemplate = `
  <template>
    <div class="page-wrapper">
      <div class="app-container fill">
        <RouterView />
      </div>
    </div>
  </template>
  <script setup>
  defineOptions({ name: ${form.title})
  ${'</'}script>`
  if (!currentNodeData.children) {
    currentNodeData.children = []
  }
  // 这里需要深拷贝一份，如果直接修改会直接修改到表单的值
  const { zhName, usName, path, name, redirect, component, icon, title, isFull, isAffix, isKeepAlive, activeMenu, isLink,
    isHide } = form
    // 新路由文件地址
  const newIndexPath = currentNodeData.component.replace(
    currentNodeData.component.split('/')[currentNodeData.component.split('/').length - 1],
    component)
  const newPath = {
    path,
    name,
    component: newIndexPath + '/index.vue',
    redirect,
    meta: {
      icon,
      title: 'router.' + title,
      isFull,
      isAffix,
      isKeepAlive,
      activeMenu,
      isLink,
      isHide
    }
  }
  currentNodeData.children.push(newPath)
  console.log(newPath);
  // 获取网站当前语言
  const systemLanguage = JSON.parse(localStorage.getItem('app') || {}).language
  const apiParamsArr = []
  // 修改中文映射文件
  if (zhName) {
    useLanguagesZhData.router[title] = zhName
    apiParamsArr.push({
      location: useLanguagesZh,
      text: 'export default' + JSON.stringify(useLanguagesZhData)
    })
  }
  // 修改英文映射文件
  if (usName) {
    useLanguagesEnData.router[title] = usName
    apiParamsArr.push({
      location: useLanguagesEn,
      text: 'export default' + JSON.stringify(useLanguagesEnData)
    })
  }
  // 修改路由文件
  apiParamsArr.push({
    location: routerUrl,
    text: JSON.stringify(dynamicRouter)
  })
  // 创建新路由初始文件
  apiParamsArr.push({
    location: '/src/views' + newIndexPath + '/index.vue',
    text: newIndexTemplate
  })
  await createFolder('/src/views' + newIndexPath)
  // unifyRequest(apiParamsArr)
  // await readFile(routerUrl)
}
const unifyRequest = async (apiArr) => {
  Promise.all(apiArr.map((item) => addRouter(item)))
    .then((res) => {
      debugger
      console.log(res);
    })

}
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
