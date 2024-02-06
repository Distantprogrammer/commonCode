<template>
  <div id="app">
    <div>
      <h3>可用文档</h3>
      <p><a href="https://www.icodebang.com/article/209042.html">https://www.icodebang.com/article/209042.html</a></p>
      <h3>关键点</h3>
      <pre>
         1.这是离线版<a href="https://github.com/jeromewu/tesseract.js-offline">tesseract.js-offline</a>
         2.canvas也是可以解析的
         3.tesseract.js-offline 需要下载语言包，这个项目只有一个中文包，还有自带的英文包，所以需要下载其他语言包 <a href="https://github.com/naptha/tessdata">语言包地址https://github.com/naptha/tessdata</a>
      </pre>
      <h3>pdf解析</h3>
      <p>请移步到pdf预览</p>
    </div>
    <div style="display: flex;align-items: center;flex-direction: column;">
      <button @click="recognize('text-img')">点击开始识别图片</button>
      <img style="margin-top: 10px;" id="text-img" alt="Vue logo" src="./flie/test.png" />
    </div>
    <pre>{{ text }}</pre>
    <div style="display: flex;align-items: center;flex-direction: column;">
      <button @click="imgToCanvas('test')">图片转canvas</button>
      <button @click="recognize('test')">点击开始识别canvas</button>
      <canvas style="margin-top: 10px;" id="test"></canvas>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { createWorker, PSM, OEM } from "tesseract.js";
const worker = createWorker({
  workerPath: '/lib/tesseract/tesseract.js/dist/worker.min.js',
  corePath: '/lib/tesseract/tesseract.js-core/tesseract-core.wasm.js',
  langPath: '/lib/tesseract/tesseract-lang',  // TODO：prd环境下会报错
  logger: (m) => console.log(m),
})
export default {
  name: "app",
  data () {
    return {
      haveInit: false,
      text: ''
    };
  },
  methods: {
    async recognize (domId) {
      console.time('time:');
      this.text = `开始识别...`
      if (!this.haveInit) {
        await worker.load();
        await worker.loadLanguage("chi_sim");
        await worker.initialize("chi_sim", OEM.LSTM_ONLY);
        await worker.setParameters({
          tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
        });
        this.haveInit = true;
      }

      // const img = document.getElementById("text-img");
      const img = document.getElementById(domId);
      const {
        data: { text },
      } = await worker.recognize(img);
      console.log(text);
      this.text = text;
      console.timeEnd('time:');
    },
    imgToCanvas () {
      // 图片转canvas
      var img = document.getElementById("text-img");
      var canvas = document.getElementById("test");
      var ctx = canvas.getContext("2d");
      // 宽度
      canvas.width = img.width;
      // 高度
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    }
  },
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
