<template>
  <div :class="$style.root">
    <div @click="getLocation" :class="$style.btn">popo-sdk</div>
  </div>
</template>

<script>
import { pp } from "@popo-bridge/web";

export default {
  name: "lcap-h5-popo-location",
  props: {
    value: {
      type: [String, Object],
    },
  },
  data() {
    return {
      where: "",
    };
  },
  watch: {
    where(val) {
      this.$emit("update:value", JSON.stringify(val));
    },
  },
  mounted() {
    this.where = "6666";
  },
  methods: {
    async getLocation() {
        window.vant.VanDialog.confirm({
          message: "88888?",
        })
      // 判断 POPO是否对应用授权
      const { status } = await pp.checkSetting({
        scope: "location",
      });
      if (status === 0) {
        // 未知状态(用户未设置过该权限的状态）
        window.vant.VanDialog.confirm({
          message: "未设置定位权限，需要授权吗?",
        })
          .then(async () => {
            const isAllowed = await pp.authorize({
              scope: "location",
              description: "应用申请获取设备的地理位置信息",
            });
            if (isAllowed) {
              pp.showToast({
                title: "POPO授权成功",
              });
              this.allPermissionGranted();
            } else {
              // 提示用户未开启定位权限，显示开启定位权限提示按钮，用户点击按钮后调用pp.openSetting()。
              // 或者在此弹出提示询问用户是否需要去设置页面开启权限。(等同于pp.checkSetting返回status == 1的逻辑)
            }
          })
          .catch(() => {});
      } else if (status === 1) {
        // 没有权限
        window.vant.VanDialog.confirm({
          message: "无权限，需要去设置页开启权限吗?",
        })
          .then(() => {
            pp.openSetting();
          })
          .catch(() => {});
      } else if (status === 2) {
        // 已授权
        this.allPermissionGranted();
      }
    },
    async allPermissionGranted() {
      try {
        const location = await pp.getLocation();
        this.where = location;
      } catch (e) {
        pp.showToast({ title: e.message, durationType: 2 });
      }
    },
  },
};
</script>
<style module>
.root {
}
.btn {
  line-height: 50px;
  color: #fff;
  background-color: red;
  text-align: center;
}
</style>
