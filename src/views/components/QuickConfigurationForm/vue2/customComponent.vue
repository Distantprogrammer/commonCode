<template>
  <div class="_content">
    <div>这是自定义组件</div>
    <!-- vue2用下面的model，由于是vue3的底层，model无效了 -->
    <!-- <div>form绑定的值{{ customComponent }}</div> -->
    <div>由于vue3的底层，model无效了，所以用下面的方式</div>
    <div>form绑定的值{{ $attrs.modelValue }}</div>
    <el-button type="primary" @click="changeComponent">改变组件form绑定的值</el-button>
    <div>这是formVue2传过来的参数<h3>{{ name }}</h3><h4>{{ eventData }}</h4></div>
  </div>
</template>

<script>
// vue2用下面的model，由于是vue3的底层，model无效了
export default {
  name: '',
  model:{
    prop:'customComponent',
    event:'change'
  },
  props: {
    customComponent:'',
    name:{
      default: '我是默认值'
    },
    eventData:{
      default: '我是默认值'
    }
  },
  data () {
    return { }
  },
  created () { },
  components: { },
  computed: { },
  watch: { },
  mounted () { },
  methods: { 
    changeComponent(){
      // veu2用法
      // this.$emit('change', this.eventData)

      // 由于vue3的底层，model无效了，所以用下面的方式
      // this.$attrs['onUpdate:modelValue']('11111111111')
      this.$emit('update:modelValue', this.eventData)
      this.$parent.clearValidate()
      console.log(this.$parent);
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
