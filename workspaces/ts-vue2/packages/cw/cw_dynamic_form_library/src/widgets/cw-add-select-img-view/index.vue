<template>
  <div class="select-source-view-room">
    <div
      class="source-view-cell"
      v-for="(item, idx) in currentList"
      :key="item.uid"
    >
      <upload 
        :value="item.fileUrl"
        @change="(url) => handleChangeImg(idx, url)" 
        @remove="handleRemove(idx)"
      />
      <a-input @blur="handleBlur(item, $event)" :value="item.label"></a-input>
      <!-- <span class="file-url-display" v-if="item.fileUrl">已上传文件</span> -->
      <a-icon
        style="font-size:16px;margin-left:8px"
        type="delete"
        @click="handleRemove(idx)"
      />
    </div>
    <a-button @click="handleAdd">添加</a-button>
  </div>
</template>
<script>
import { generateRandomNumber } from "@/utils";
import upload from "./upload.vue";
import conmmonData from "@/mixins/common.data";

export default {
  name: "cw-add-select-source-view",
  mixins: [conmmonData],
  components: {
    upload,
  },
  props: {
    value: {
      type: [String, Array],
    },
  },
  data() {
    return {
      currentList: [1, 2, 3].map((item) => ({
        uid: generateRandomNumber(10),
        value: "选项" + item,
        label: "选项" + item,
        fileUrl: ""
      })),
      selectList: [],
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          try {
            const arr = this.getJsonResultArr(val);
            this.currentList = arr.map((item) => {
              // 解析格式 文本%%文件地址
              let value = "";
              let fileUrl = "";
              let label = "";
              
              if (item.label && typeof item.label === 'string' && item.label.includes("%%")) {
                const matches = item.label.match(/(.*?)%%(.*)/);
                if (matches && matches.length === 3) {
                  value = matches[1];
                  label = matches[1];
                  fileUrl = matches[2];
                } else {
                  value = item.label;
                  label = item.label;
                }
              } else {
                value = item.label || "";
                label = item.label || "";
              }
              
              return {
                uid: generateRandomNumber(10),
                value: value,
                label: label,
                fileUrl: fileUrl
              };
            });
          } catch (error) {
            console.error("解析值出错:", error);
            this.initDefaultList();
          }
        } else {
          this.initDefaultList();
        }
      },
      immediate: true,
    },
    currentList: {
      handler(val) {
        try {
          const arr = val.map((item) => {
            // 组合成 [文本%%文件地址] 格式
            const label = item.fileUrl 
              ? `${item.label}%%${item.fileUrl}` 
              : item.label;
            
            return {
              label: label,
              value: label
            };
          });
          this.$emit("change", JSON.stringify(arr));
          this.$emit("onInput", JSON.stringify(arr));
          this.$emit("update:value", JSON.stringify(arr));
        } catch (error) {
          console.error("转换值出错:", error);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    console.log(this.$props,this.$attrs,"value");
  },
  methods: {
    initDefaultList() {
      this.currentList = [1, 2, 3].map((item) => ({
        uid: generateRandomNumber(10),
        value: "选项" + item,
        label: "选项" + item,
        fileUrl: ""
      }));
    },
    handleChangeImg(idx, fileUrl) {
      if (this.currentList[idx]) {
        this.$set(this.currentList[idx], 'fileUrl', fileUrl);
      }
      console.log(this.currentList);
    },
    handleBlur(item, event) {
      item.value = event.target.value;
      item.label = event.target.value;
    },
    handleRemove(idx) {
      this.currentList.splice(idx, 1);
    },
    onChange(checkedValues) {
      console.log(checkedValues);
    },
    handleAdd() {
      this.currentList.push({
        value: "选项" + (this.currentList.length + 1),
        label: "选项" + (this.currentList.length + 1),
        fileUrl: "",
        uid: generateRandomNumber(10),
      });
    },
  },
};
</script>
<style>
.select-source-view-room {
  display: flex;
  flex-direction: column;
}
.source-view-cell {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  /* padding: 4px; */
}
.source-view-cell:hover {
  /* background: #cccccc63; */
}

.source-view-cell {
  display: flex;
  align-items: center;
}
.file-url-display {
  font-size: 12px;
  color: #1890ff;
  margin-left: 8px;
}
</style>
