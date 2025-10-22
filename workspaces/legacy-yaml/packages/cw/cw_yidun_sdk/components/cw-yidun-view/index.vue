<template>
  <div ref="container"><div v-if="$env.VUE_APP_DESIGNER">易盾组件</div></div>
</template>

<script>
import * as initNECaptchaWithFallback  from '../../utils/yidun-capcha.js'
export default {
    name:"cw-yidun-view",
    props:{
      containerId:{
        type:String,
        default:"captcha"
      },
      captchaId: {
        type:String,
      }
  },
  data() {
    return {
      captchaIns: null,
    }
  },
  mounted() {
    this.$refs.container.setAttribute("id", this.containerId)
    var that  = this
    initNECaptchaWithFallback({
        element:`#${this.containerId}`,
        captchaId:this.captchaId,
        width: '320px',
        mode: 'popup',
        apiVersion: 2,
        popupStyles: {
          position: 'fixed',
          top: '20%'
        },
        onVerify: function (err, data) {
            // console.log(err, data)
          /**
           * 第一个参数是err（Error的实例），验证失败才有err对象
           * 第二个参数是data对象，验证成功后的相关信息，data数据结构为key-value，如下：
           * {
           *   validate: 'xxxxx' // 二次验证信息
           * }
           **/
          if (err) {
            that.$emit("onVerifyError", err)
            return
          } // 当验证失败时，内部会自动refresh方法，无需手动再调用一次
          that.$emit("onVerify",data.validate)
          // 点击登录按钮后可调用服务端接口，以下为伪代码，仅作示例用
        }
      }, function onload(instance) {
        that.captchaIns = instance
      }, function onerror(err) {
        console.warn(err)
      })
  },
  methods: {
    verify() {
      this.captchaIns && this.captchaIns.verify()
    },
    refresh() {
      this.captchaIns && this.captchaIns.refresh()
    }
  }
}
</script>

<style>

</style>