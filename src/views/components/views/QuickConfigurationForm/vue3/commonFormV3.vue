

<template>
  <el-form ref="myForm" :model="formOptions.form" :inline-message="true" :status-icon="false" :show-message="true"
    :disabled="$attrs.disabled" label-width="150px">
    <el-row :gutter="40" class="form_row">
      <el-col style="margin-bottom: 10px;" :span="item.span" v-for="(item, index) in formOptions.formArr" :key="index">
        <el-form-item :label="item.label || ' '" :prop="item.propety" :rules="item.rules" :class="item.class"
          :label-width="item.labelWidth">
          <template v-slot:error="slotProps">
            <div style="
                      color: red;
                      position: absolute;
                      top: 100%;
                      left: 0;
                      white-space:nowrap;
                      " v-if="slotProps.error && !slotProps.error.includes('reqired')">
              {{ slotProps.error }}
            </div>
            <div v-else></div>
          </template>
          <component :is="item.type" v-bind="{ ...item.props?.formItemCmp }" v-on="item.props.eventFun ? item.props.eventFun : {}"
            v-model="formOptions.form[item.propety]">
            <component :name="item.propety" v-if="item.props && item.props.options" :value="opt.value" :label="opt.label"
              :is="optionsCmpMap[item.type]" :key="ind" v-for="(opt, ind) in item.props.options">
              {{ opt.label }}
            </component>
          </component>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
defineOptions({ name: 'commonFormV3' })
import { ref, computed, nextTick } from 'vue'
const props = defineProps(['modelValue'])
defineEmits(['update:modelValue'])
const optionsCmpMap = {
  "el-radio-group": "el-radio",
  "el-checkbox-group": "el-checkbox",
  "el-cascader": "el-cascader-panel",
  "el-select": "el-option"
}
const myForm = ref(null)
const formOptions = computed(() => {
  return {
    form:  props.modelValue.form,
    formArr: setRulesMsg( props.modelValue.formArr)
  }
})
const validate = (validateFn) => {
  myForm.value.validate((valid) => {
    if (valid) {
      validateFn(valid)
    } else {
      nextTick(() => {
        let isErrorDom = document.querySelectorAll('.is-error')[0]
        isErrorDom.scrollIntoView({
          block: 'center',
          behavior: 'smooth'
        })
      })
      return false
    }
  })
}
const setRulesMsg = (arr = []) => {
  const inputsArr = ['el-input']
  const selectsArr = ['el-select', 'el-cascader', 'el-data-picker', 'el-switch', 'el-radio-group', 'el-checkbox-group']
  return arr.map(item => {
    const label = item.label?.split(':')[0]
    const type = item.type
    if (item.rules && item.rules.length) {
      if (item.type === 'el-select' || item.type === 'el-cascader' || item.type === 'el-data-picker') {
        if (!item.props?.formItemCmp.class) {
          // item.props.formItemCmp.class = ['w430']
        }
        item.props.formItemCmp.placeholder = '请选择'
      }
      return {
        ...item,
        rules: item.rules.map(rul => {
          if (rul.required) {
            return {
              ...rul,
              trigger: (() => {
                if (inputsArr.includes(type)) {
                  return 'blur'
                } else if (selectsArr.includes(type)) {
                  return 'change'
                } else {
                  return 'change'
                }
              })(),
              message: (() => {
                if (rul.message) {
                  return rul.message
                } else if (inputsArr.includes(type)) {
                  return '请输入' + label
                } else if (selectsArr.includes(type)) {
                  return '请选择' + label
                } else {
                  if (!rul.message) {
                    return '请填写' + label
                  }
                }
              })()
            }
          } else {
            return rul
          }
        })
      }
    } else {
      return item
    }
  })
}
const getFormValue = () => {
  return formOptions.value.form
}
const resetFields = () => {
  myForm.value.resetFields()
}
defineExpose({
  validate,
  getFormValue,
  resetFields
})
</script>

<style lang='scss' scoped>
::v-deep.el-textarea {
  .el-input_count {
    color: #000;
    background-color: transparent;
    position: absolute;
    font-size: 12px;
    bottom: -8px;
    right: 10px;
  }
}

::v-deep.el-form {
  .el-form-item_lable {
    font-size: 14px;
    font-weight: 600;
  }

  [class*=el-col-] {
    float: none;
  }
}

::v-deep.el-input_clear {
  position: initial;
}

::v-deep.el-input_clear {
  height: 40px;
}

.form_row {
  display: flex;
  flex-wrap: wrap;
}

.w430 {
  width: 430px !important;
}

.w100 {
  display: block;
}
</style>
