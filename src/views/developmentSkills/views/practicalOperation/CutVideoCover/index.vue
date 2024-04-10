<template>
  <div class="page-wrapper flex-vertical">
    <div class="app-container fill">
      <div>
        <el-button type="success" @click="getImge('url')">以url形式获取视频第一帧</el-button>
        <el-button type="info" @click="getImge('base64')">以base64形式获取视频第一帧</el-button>
        <el-input-number class="el-button" style="padding: 0;" v-model="currentTime" :min="1" :max="50"  controls-position="right" placeholder="获取第一秒" />
      </div>
      <div>
        返回形式1：以url形式返回，需要配置接口上传
        <br>
        返回形式2：以base64格式返回。可直接用img标签展示
      </div>
      <div style="margin-top: 10px;">
        <video src="../lib/big_buck_bunny.mp4" controls></video>
      </div>
      <img :src="img" alt="" style="">
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
defineOptions({ name: 'cutVideoCover' })
const getImgType = ref('url')
const currentTime = ref(1)
const img = ref('')
function randomNum (min, max) {
  return Math.floor(Math.random() * (min - max) + max);
}

/**
 * 截取视频画面
 * @param {*} url 视频播放链接
 * @param {*} width  画面的截取宽度
 * @param {*} height  图片的截取高度
 */
function cutVideoCover (url, width = 960, height = 540) {
  return new Promise((reslove) => {
    let video = document.createElement('video');
    video.crossOrigin = 'anonymous'; //处理跨域
    video.src = url;
    video.width = width;
    video.height = height;
    video.preload = 'auto'; //预加载视频，以保证可稳定获取画面
    video.currentTime = currentTime.value; //指定截取几秒处的帧
    // video.autoplay = true;
    // video.muted = true;
    //当视频完成渲染
    video.onloadeddata = () => {
      let canvas = document.createElement('canvas');
      canvas.width = video.width;
      canvas.height = video.height;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height); //绘制canvas
      let fileType = 'image/jpeg';
      if (getImgType.value === 'url') {
        // 返回形式1：以url形式返回，需要配置接口上传
        canvas.toBlob((blob) => {
          let blobFile = new File([blob], randomNum(100000, 1000000) + '.jpg', { type: fileType }); //转成file格式
          console.log(blobFile);
          const params = new FormData();
          params.append('file', blobFile);
          console.log(params);
          return ElMessage.warning('需要上传到接口转成图片链接')
          //上传到接口转成图片链接
          commonApi.uploadFile(params).then((res) => {
            if (res.code == 200000) {
              reslove(res.msg);
            }
          }).finally(() => {
            video = null; //清除video元素
          });
        }, fileType);
      } else if (getImgType.value === 'base64') {
        //返回形式2：以base64格式返回。可直接用img标签展示
        const base64Url = canvas.toDataURL(fileType)  //转为base64，返回
        reslove(base64Url)
      }
    };
  });
}


const getImge = (type) => {
  getImgType.value = type
  cutVideoCover(new URL('../lib/big_buck_bunny.mp4', import.meta.url).href).then((res) => {
    console.log(res)  //图片地址
    img.value = res
  });
}


</script>
<style lang="scss" scoped></style>
