<script setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import { addRouter, readFile } from '@/api/home/index.js'
import { useRouter, useRoute } from 'vue-router'
import Prism from "prismjs" // 代码高亮core
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js"//行号插件
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.min.js"// 标准化代码块中的空白字符
import 'prismjs/plugins/toolbar/prism-toolbar.min.js'
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"// 复制
// import "prismjs/themes/prism-coy.min.css"//复制
import "prismjs/themes/prism-tomorrow.min.css"//高亮主题
import "prismjs/plugins/line-numbers/prism-line-numbers.min.css"//行号插件的样式
import 'prismjs/plugins/toolbar/prism-toolbar.min.css'
import routerData from '@/assets/json/dynamic-router.json'
const router = useRouter()
const route = useRoute()
const articleInfoData = ref('');
const prismToolbar = new URL("prismjs/plugins/toolbar/prism-toolbar.js", import.meta.url).href
onMounted(async () => {
  // await getArticleInfo().then(res => {
  //   // articleInfoData.value = res
  // }).catch(err => {
  //   console.log(err);
  // })
  // Prism.highlightAll()// 全局代码高亮(必须等获取数据之后，代码高亮才能生效，也可以用定时器定时)

  // nextTick(() => {
  //   Prism.plugins.toolbar.registerButton('select-code', function (env) {
  //     var button = document.createElement('button');
  //     button.innerHTML = 'Select Code';
  //     button.addEventListener('click', function () {
  //       // Source: http://stackoverflow.com/a/11128179/2757940
  //       if (document.body.createTextRange) { // ms
  //         var range = document.body.createTextRange();
  //         range.moveToElementText(env.element);
  //         range.select();
  //       } else if (window.getSelection) { // moz, opera, webkit
  //         var selection = window.getSelection();
  //         var range = document.createRange();
  //         range.selectNodeContents(env.element);
  //         selection.removeAllRanges();
  //         selection.addRange(range);
  //       }
  //     });

  //     return button;
  //   });
  // })
  // Prism.plugins.NormalizeWhitespace.setDefaults({
  //   'remove-trailing': true,
  //   'remove-indent': true,
  //   'left-trim': true,
  //   'right-trim': true,
  // });
  // let range = new Range();
  //       range.setStart(p1.firstChild, 2);
  //       range.setEndAfter(p2.firstChild);
  //       document.getSelection().addRange(range)

})

const fileUrl = ref('')
watch(() => {
  return route.path
}, (newVal) => {
  [...flatten(routerData.data)].forEach(item => {
    if (item.path == newVal) {
      fileUrl.value = item.component
      getArticleInfo()
    }
  })
  console.log(fileUrl.value);
}, { deep: true, immediate: true }
)
function* flatten (tree) {
  for (let node of tree) {
    yield node
    node.children && (yield* flatten(node.children))
  }
}

function getArticleInfo () {//从后台请求数据
  return new Promise((resolve, reject) => {
    readFile('/src/views' + fileUrl.value).then((res => {
      articleInfoData.value = res.data
      resolve(res.data)
      setTimeout(() => {
        Prism.highlightAll()
      }, 0)
    }))
  })
}

</script>

<template>
  <div class="article-wrapper">
    <pre class="line-numbers highlight-code scroll-box" lang="zh-Hans-CN" data-prismjs-copy="复制" data-prismjs-copy-error="复制失败"
      data-prismjs-copy-success="复制成功">
      <code class="language-js ">
        {{ articleInfoData }}
      </code>
    </pre>
  </div>
</template>
<style lang="scss" scoped>
.article-wrapper {

}
.scroll-box{
  // width: 98%;
  height: 400px;
  overflow-y:scroll;
}
</style>
