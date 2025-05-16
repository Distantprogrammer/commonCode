<template>
  <div class="page-wrapper flex-vertical">
    <div class="app-container fill">
      <div class="">form组件采用的是ElementPlus 不知道在那个版本el-form-item__content的样式变成了flex布局</div>
      <div>
        <el-button @click="commonFormV2Disabled = !commonFormV2Disabled">{{ commonFormV2Disabled ? '解除禁用':'禁用' }}</el-button>
        <el-button @click="singleDisable">单个禁用</el-button>
      </div>
      <div class="">
        <el-button @click="dynamicAddition">动态添加</el-button>
        <el-button @click="dynamicAdditionCustom">动态添加自定义组件</el-button>
      </div>
      <commonFormV2 :disabled="commonFormV2Disabled" ref="ruleForm" :formModel="formModel" />
      <div>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import commonFormV2 from './commonFormV2.vue'
import formModel from './formVue2.js'

export default {
  name: 'PageQuickConfigurationFormV2',
  components: {
    ...formModel.components,
    commonFormV2
  },
  data () {
    return {
      commonFormV2Disabled: false,
      ...formModel.data(this)
    }
  },
  mounted () {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         console.log(this.$refs[formName].getFormValue())
         return true
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    singleDisable(){
      this.formModel.formArr[0].props.formItemCmp.disabled = !this.formModel.formArr[0].props.formItemCmp.disabled
    },
    dynamicAddition(){
      this.formModel.form[`input`+ this.formModel.formArr.length] = ''
      this.formModel.formArr.push( {
            propety: `input`+ this.formModel.formArr.length,
            label: '动态添加的input',
            span: 24,
            type: 'el-input',
            props:{
              formItemCmp:{
                class:['w430']
              }
            },
            rules: [
              { required: true, message: '', trigger: '' }
            ]
          })
    },
    dynamicAdditionCustom(){
      this.formModel.form[`Custom`+ this.formModel.formArr.length] = ''
      this.formModel.formArr.push( {
            labelWidth: '200px',
            propety: `Custom`+ this.formModel.formArr.length,
            label: '动态添加的自定义组件',
            span: 5,
            type: this.$options.components.customComponent,
            props:{
              formItemCmp:{
                name:'这里设置的span为5',
                eventData:1
              }
            },
            rules: [
              { required: true, message: '', trigger: '' }
            ]
          })
    },
  },
}
</script>
