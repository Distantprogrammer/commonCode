<script setup>
import { ref } from 'vue'
import PdfPreviewVue2 from './vue2.vue'
import PdfPreviewVue3 from './vue3.vue'
const activeName = ref('vue2')
const pageNum = ref(1)
const scale = ref(1)
const total = ref(0)
const pdfPreviewVue3Ref = ref(null)
const pdfText = ref('')
const handleClick = (tab, event) => {
  console.log(tab, event)
}
const pdfUrl = ref(new URL('../lib/JavaScript高级程序设计第4版.pdf', import.meta.url).href)

const getTotal = value => {
  total.value = value
}
const loadPdf = () => { }
const pdfNext = () => {
  if (pageNum.value >= total.value) {
    pageNum.value = total.value
    return
  }
  pageNum.value++
}
const pdfPrev = () => {
  if (pageNum.value <= 1) {
    pageNum.value = 1
    return
  }
  pageNum.value--
}
const getText = async () => {
  const res = await pdfPreviewVue3Ref.value.getPageText()
  pdfText.value = res.finalString
}
const pdfZoomIn = () => {
  scale.value += 0.1
}
const pdfZoomOut = () => {
  scale.value -= 0.1
}
</script>

<template>
  <div style="display: flex">
    <div style="flex: 1">
      <el-button type="primary" @click="loadPdf">加载pdf</el-button>
      <el-button type="success" @click="pdfNext">下一页</el-button>
      <el-button type="info" @click="pdfPrev">上一页</el-button>
      <el-button type="warning" @click="getText">获取文字</el-button>
      <el-button type="danger" @click="pdfZoomIn">放大</el-button>
      <el-button type="danger" @click="pdfZoomOut">缩小</el-button>
      <div>页码：{{ pageNum }} 总数：{{ total }} 比例： {{ scale }}</div>
    </div>
    <div style="flex: 1.6">
      <h4>注意点:</h4>
      <p>
        1.项目中有两个版本的pdf依赖包 pdfjs-2.0.943-dist 与
        pdfjs-4.0.379，当前按理使用的是pdfjs-2.0.943-dist
      </p>
      <p>
        2.pdfjs 2-3版本
        <span style="font-size: 12px">(3，4都用过，只有2这样传，猜测)</span>
        的page.getViewport(scale)是这样传的,其他的是对象形式page.getViewport({scale})
      </p>
      <p>
        3.由于我用的依赖包是下载的，所以需要在public下引入包，html里引入/pdfjs-2.0.943-dist//build/pdf.js
      </p>
    </div>
  </div>
  <div>
    <h4>相关文章</h4>
    <p>官网：<a href="https://mozilla.github.io/pdf.js/">https://mozilla.github.io/pdf.js/</a></p>
    <p>
      中文官网：<a
        href="https://gitcode.gitcode.host/docs-cn/pdf.js-docs-cn/examples/index.html">https://gitcode.gitcode.host/docs-cn/pdf.js-docs-cn/examples/index.html</a>
    </p>
    <p>
      CSDN文章<a
        href="https://blog.csdn.net/IAIPython/article/details/134525898">https://blog.csdn.net/IAIPython/article/details/134525898</a>
    </p>
    <p>
      文字图片提取<a
        href="https://www.haorooms.com/post/js_pdfjs_imagetext">https://www.haorooms.com/post/js_pdfjs_imagetext</a>
    </p>
  </div>
  <div><strong>*第五页才识别的出来!</strong></div>
  <div style="display: flex">
    <div style="flex: 1">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="vue2" name="vue2">
          <!-- <PdfPreviewVue2 ref="pdfPreviewVue2Ref" canvasId="canvasIdVue2" :url="pdfUrl" :pageNum="pageNum" :scale="scale"
            @getTotal="getTotal"></PdfPreviewVue2> -->
        </el-tab-pane>
        <el-tab-pane label="vue3" name="vue3">
          <PdfPreviewVue3 ref="pdfPreviewVue3Ref" canvasId="canvasIdVue3" :url="pdfUrl" :pageNum="pageNum" :scale="scale"
            @getTotal="getTotal"></PdfPreviewVue3>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="width: 400px">
      <div class="text">
        <h4>文字识别结果（文字是循环拼接的，要原数据看控制台）</h4>
        <div style="height: 200px; overflow-y: auto">{{ pdfText }}</div>
      </div>
      <div class="img">
        <h4>图片识别结果</h4>
        <div style="height: 200px; overflow-y: auto">{{ pdfText }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
