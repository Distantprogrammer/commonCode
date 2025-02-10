<script setup>

</script>

<template>
  <div class="page-wrapper flex-vertical">
    <div class="app-container fill">
      <h1>vue3 v-show 绑定在组件上不生效</h1>
      <div>
        <pre>
   在 Vue 中，v-show 的作用原理是通过切换 CSS 的 display: none 属性来控制元素的显示/隐藏。
   当将其绑定在组件上时，它实际上会尝试将这个逻辑应用到组件的根 DOM 元素上。
   为什么子组件不能有多个根节点？
   单根组件要求：
   在 Vue 2 中，组件必须有一个单一的根节点。如果子组件有多个根节点，会直接导致编译错误，此时 v-show 无法正常工作。
   在 Vue 3 中，虽然支持了多根节点组件（Fragment），但当父组件使用 v-show 控制子组件时，Vue 无法确定应该将 display: none 应用到哪一个根节点上，因此会抛出警告：
   v-show can only be used on a single element.
   v-show 的局限性：
   无论 Vue 2 还是 Vue 3，v-show 的设计都是针对单个 DOM 元素的。
   当作用在组件上时，它隐式地要求子组件必须有且只有一个根节点，以便 Vue 可以正确操作其 display 属性。
        </pre>
      </div>
      <p>如:</p>
      <pre>
          &lt;template&gt;
            &lt;组件1 v-show="show"&gt;1&lt;/组件1&gt;
            &lt;组件2 v-show="show"&gt;2&lt;/组件2&gt;
          &lt;/template&gt;
        </pre>
      <p>组件1:（生效）</p>
      <pre>
          &lt;template&gt;
            &lt;div&gt;1&lt;/div&gt;
          &lt;/template&gt;
        </pre>
      <p>组件2:（不生效）</p>
      <pre>
          &lt;template&gt;
            &lt;div&gt;1&lt;/div&gt;
            &lt;div&gt;1&lt;/div&gt;
          &lt;/template&gt;
        </pre>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>