<script setup>
  
</script>

<template>
  <div class="page-wrapper flex-vertical">
    <div class="app-container fill">
      <h1>vue3 v-show 绑定在组件上不生效</h1>
      <div>原因，v-show绑定在组件上，子组件下不可以有两个子节点，。
        <br>
        v-show的原理是在标签上绑定style="displsy:none;"，vue编译成虚拟dom，style赋值时查找字节点时有两个，不知道赋值给谁，所以子组件下只能有一个子节点。</div>
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

<style lang="scss" scoped>

</style>