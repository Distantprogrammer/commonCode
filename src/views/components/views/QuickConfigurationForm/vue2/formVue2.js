import customComponent from './customComponent.vue'
// vue3 使用了 markRaw 标记了 customComponent ， vue2中无此属性
export default {
  components: {
    customComponent
  },
  data (that) {
    return {
      formModel: {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          customComponent:''
        },
        formArr: [
          {
            propety: 'name',
            label: '姓名',
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
          },
          {
            propety: 'region',
            label: '地区',
            span: 24,
            type: 'el-select',
            props: {
              options: [
                { value: 'zhejiang', label: '浙江省' },
                { value: 'jiangsu', label: '江苏省' },
                { value: 'shanxi', label: '山西省' },
                { value: 'hubei', label: '湖北省' },
                { value: 'guangdong', label: '广东省' }
              ],
              formItemCmp: {
                placeholder: '请选择',
              }
            },
            rules: [
              { required: true, message: '请输入地区', trigger: 'blur' }
            ]
          },
          {
            propety: 'date1',
            label: '日期',
            span: 24,
            type: 'el-date-picker',
            props: {
              formItemCmp: {
                placeholder: '选择日期',
              }
            },
            rules: [
              { required: true, message: '', trigger: '' }
            ]
          },
          {
            propety: 'delivery',
            label: '即时配送',
            span: 24,
            type: 'el-switch',
            props: {
              formItemCmp: {
                placeholder: '即时配送',
                activeValue:1,
                inactiveValue:0,
                activeText:'打开',
                inactiveText:'关闭'
              }
            },
            rules: [
              { required: true, message: '', trigger: '' }
            ]
          },
          {
            propety: 'type',
            label: '活动性质',
            span: 24,
            type: 'el-checkbox-group',
            props: {
              options:[
                {label:'美食/餐厅线上活动',value:1},
                {label:'地推活动',value:2},
                {label:'线下主题活动',value:3},
                {label:'单纯品牌曝光',value:4},
                {label:'其他',value:5}
              ],
              formItemCmp: {
                placeholder: '活动性质',
              }
            },
            rules: [
              { required: true, message: '', trigger: '' }
            ]
          },
          {
            propety: 'resource',
            label: '特殊资源',
            span: 24,
            type: 'el-radio-group',
            props: {
              options:[
                {label:'线上品牌商赞助',value:1},
                {label:'线下场地免费',value:2},
              ],
              formItemCmp: {
              }
            },
            rules: [
              { required: true, message: '', trigger: '' }
            ]
          },
          {
            propety: 'desc',
            label: '活动形式',
            span: 24,
            type: 'el-input',
            props: {
              formItemCmp: {
                type:"textarea",
                maxLength:200,
                size:"small",
                autosize:{ minRows: 10, maxRows: 12}
              }
            },
            rules: [
              { required: true, message: '', trigger: '' }
            ]
          },
          {
            propety: 'customComponent',
            label: '自定义组件',
            span: 24,
            type: customComponent,
            props: {
              formItemCmp: {
                name:'点击组件加一 我是传过去的',
                eventData:1
              },
              eventFun:{
                // click:function(){
                //  const index =  that.formModel.formArr.findIndex(item=>{
                //     return item.propety === 'customComponent'
                //   })
                //   that.formModel.formArr[index].props.formItemCmp.eventData++
                // }
              }
            },
            rules: [
              { required: true, message: '这是定义组件', trigger: '' }
            ]
          }
        ]
      }
    }
  },
}