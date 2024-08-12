<template>
  <div>
    <button @click="chooseImages">选择图片</button>
    <ul>
      <li v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </li>
    </ul>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";

export default {
  props: {
    appId: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
    nonceStr: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      images: [],
    };
  },
  mounted() {
    this.initWeChatSDK();
  },
  methods: {
    async initWeChatSDK() {
      const url = location.origin;
      const data = await fetch(
        `${url}/api/system/wechat/getConfig?url=${encodeURIComponent(
          location.href
        )}`,
        {
          method: "get",
        }
      ).then((response) => response.json());
      wx.config({
        debug: false,
        appId: data.appId,
        nonceStr: data.nonceStr,
        signature: data.signature,
        timestamp: data.timestamp,
        jsApiList: ["chooseImage", "uploadImage"],
      });
    },
    chooseImages() {
      wx.ready(() => {
        wx.chooseImage({
          count: 9, // 默认9，修改为您需要的最大图片数
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            const localIds = res.localIds;
            this.images = localIds;
            this.$emit("image-chosen", localIds);

            localIds.forEach((localId) => {
              wx.uploadImage({
                localId: localId,
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: (uploadRes) => {
                  const serverId = uploadRes.serverId; // 上传后的文件ID
                  this.$emit("upload-success", serverId);
                },
                fail: (uploadErr) => {
                  this.$emit("upload-fail", uploadErr);
                  console.error("上传失败", uploadErr);
                },
              });
            });
          },
          fail: (err) => {
            this.$emit("choose-image-fail", err);
            this.$toast.show("选择图片失败" + JSON.stringify(err));
            console.error("选择图片失败", err);
          },
        });
      });
    },
  },
};
</script>

<style>
button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 10px;
}

img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>