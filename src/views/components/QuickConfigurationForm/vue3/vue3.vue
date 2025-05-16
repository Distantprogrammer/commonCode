<template>
  <div class="page-wrapper flex-vertical">
    <div class="app-container fill">
      <div class="">form组件采用的是ElementPlus 不知道在那个版本el-form-item__content的样式变成了flex布局</div>
      <div>
        <el-button @click="commonFormV2Disabled = !commonFormV2Disabled">{{ commonFormV2Disabled ? '解除禁用' : '禁用'
        }}</el-button>
        <el-button @click="singleDisable">单个禁用</el-button>
      </div>
      <div class="">
        <el-button @click="dynamicAddition">动态添加</el-button>
        <el-button @click="dynamicAdditionCustom">动态添加自定义组件</el-button>
      </div>
      <commonFormV3 :disabled="commonFormV2Disabled" ref="ruleForm" :modelValue="formModel" />
      <div>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({ name: 'PageQuickConfigurationFormV3' })
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import commonFormV3 from './commonFormV3.vue'
import formModelOptions from './formVue3.js'
import customComponent from './customComponent.vue'
const formModel  = ref({...new formModelOptions.Setup()})
const ruleForm = ref()
const commonFormV2Disabled = ref(false)

const submitForm = () => {
  ruleForm.value.validate((valid) => {
    if (valid) {
      console.log(formModel.value.form);
      console.log(ruleForm.value.getFormValue())
      return true
    } else {
      return false
    }
  })
}
const resetForm = () => {
  ruleForm.value.resetFields()
}
const singleDisable = () => {
  formModel.value.formArr[0].props.formItemCmp.disabled = !formModel.value.formArr[0].props.formItemCmp.disabled
}
const dynamicAddition = () => {
  formModel.value.form[`input` + formModel.value.formArr.length] = ''
  formModel.value.formArr.push({
    propety: `input` + formModel.value.formArr.length,
    label: '动态添加的input',
    span: 24,
    type: 'el-input',
    props: {
      formItemCmp: {
        class: ['w430']
      }
    },
    rules: [
      { required: true, message: '', trigger: '' }
    ]
  })
}
const dynamicAdditionCustom = () => {
  formModel.value.form[`Custom` + formModel.value.formArr.length] = ''
  formModel.value.formArr.push({
    labelWidth: '200px',
    propety: `Custom` + formModel.value.formArr.length,
    label: '动态添加的自定义组件',
    span: 5,
    type: customComponent,
    props: {
      formItemCmp: {
        name: '这里设置的span为5',
        eventData: 1
      }
    },
    rules: [
      { required: true, message: '', trigger: '' }
    ]
  })
}
</script>


