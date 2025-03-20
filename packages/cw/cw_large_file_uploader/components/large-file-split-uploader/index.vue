<template>
  <div :class="$style.root">
    <div
      v-if="draggable && (!readonly || $env.VUE_APP_DESIGNER)"
      :class="$style.draggable"
      :dragover="dragover"
      :tabindex="readonly || disabled ? '' : 0"
      @click="select()"
      @drop.prevent="onDrop"
      @paste="onPaste"
      @dragover.prevent="dragover = true"
      @dragleave.prevent="dragover = false"
    >
      <input
        ref="file"
        type="file"
        :name="name"
        :class="$style.file"
        :accept="accept"
        :readonly="readonly"
        :disabled="disabled"
        :multiple="multiple"
        @click.stop
        @change="onChange"
      />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.5349 9.44679L18.3493 8.59993C17.7098 5.6824 15.108 3.49951 12 3.49951C8.89196 3.49951 6.29024 5.6824 5.65073 8.59993L5.4651 9.44679L4.63864 9.70869C2.81715 10.2859 1.5 11.9908 1.5 13.9995C1.5 16.4848 3.51472 18.4995 6 18.4995H8V19.9995H6C2.68629 19.9995 0 17.3132 0 13.9995C0 11.3183 1.75873 9.04778 4.18552 8.27876C4.97271 4.68751 8.17245 1.99951 12 1.99951C15.8276 1.99951 19.0273 4.68751 19.8145 8.27876C22.2413 9.04778 24 11.3183 24 13.9995C24 17.3132 21.3137 19.9995 18 19.9995H16V18.4995H18C20.4853 18.4995 22.5 16.4848 22.5 13.9995C22.5 11.9908 21.1829 10.2859 19.3614 9.70869L18.5349 9.44679Z"
          fill="#CCCCCC"
        />
        <path
          d="M12.75 12.3101V19.9995H11.25V12.3103L8.78771 14.7726L7.72705 13.7119L11.9697 9.46927L12 9.49958L12.0304 9.46916L16.2731 13.7118L15.2124 14.7725L12.75 12.3101Z"
          fill="#CCCCCC"
        />
      </svg>

      <div v-if="dragDescription" :class="$style.dragDescription">
        <span>{{ dragDescription }}</span>
      </div>
    </div>
    <div
      v-else
      :class="$style.select"
      @click="select()"
      vusion-slot-name="default"
      :vusion-empty-background="
        $env.VUE_APP_DESIGNER && !$slots.default ? 'add-any' : false
      "
    >
      <input
        :class="$style.file"
        ref="file"
        type="file"
        :name="name"
        :accept="accept"
        :readonly="readonly"
        :disabled="disabled"
        :multiple="multiple"
        @click.stop
        @change="onChange"
      />
      <slot></slot>
    </div>
    <template>
      <div v-if="description" :class="$style.description">
        {{ description }}
      </div>
      <div
        v-if="showErrorMessage && errorMessage && errorMessage.length"
        :class="$style.errwrap"
      >
        <div
          v-for="errItem in errorMessage"
          :key="errItem"
          :class="$style.errmessage"
        >
          {{ errItem }}
        </div>
      </div>
    </template>
    <div
      v-if="
        !$env.VUE_APP_DESIGNER &&
        currentValue &&
        (currentValue.url ||
          currentValue.showProgress ||
          (currentValue.length && currentValue[0].url) ||
          (currentValue.length && currentValue[0].showProgress))
      "
      :class="$style.list"
    >
      <div
        v-for="(item, index) in currentValue.length
          ? currentValue
          : [currentValue]"
        :class="$style.item"
      >
        <a
          v-if="!item.showProgress"
          :class="$style.link"
          :href="item.url"
          download
          >{{ item.name }}</a
        >
        <linear-progress
          v-if="item.showProgress"
          :class="$style.progress"
          :percent="item.percent"
        ></linear-progress>
        <svg
          t="1701087344377"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3935"
          width="14"
          height="14"
          v-else-if="!readonly && !disabled"
          :class="$style.remove"
          @click="remove(index)"
        >
          <path
            d="M478.016 352.704v445.952H545.92V352.704H478.08zM318.912 798.72V352.64h68.032v445.952H318.912zM638.528 352.704v445.952h67.968V352.704H638.528z"
            p-id="3936"
          ></path>
          <path
            d="M452.032 64c-56.32 0-102.016 45.44-102.016 101.568v25.856H64V259.2h94.016v599.296A101.76 101.76 0 0 0 259.968 960h504c56.32 0 102.016-45.44 102.016-101.568V259.2H960V191.36h-286.016v-25.856A101.76 101.76 0 0 0 572.032 64H452.032z m153.984 127.424H417.92v-25.856a33.92 33.92 0 0 1 34.048-33.92h120a33.92 33.92 0 0 1 33.92 33.92v25.856zM225.92 858.432V259.2h572.032v599.296a33.92 33.92 0 0 1-33.984 33.92H259.904a33.92 33.92 0 0 1-33.92-33.92z"
            p-id="3937"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from "./ajax";
import LinearProgress from "./comps/linear-progress.vue";
import Field from "./comps/field.vue";

export default {
  name: "large-file-split-uploader",
  mixins: [Field],
  components: {
    LinearProgress,
  },
  props: {
    value: [String, Object],
    url: { type: String, required: true },
    name: { type: String, default: "file" },
    accept: String,
    headers: { type: Object, default: () => ({}) },
    withCredentials: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    data: Object,
    urlField: { type: String, default: "url" },
    draggable: { type: Boolean, default: false },
    pastable: { type: Boolean, default: false },
    converter: String,
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    dragDescription: {
      type: String,
      default() {
        return "点击/拖动/粘贴文件到这里";
      },
    },
    description: String, // 上传限制描述等
    showErrorMessage: { type: Boolean, default: true },
    authorization: { type: Boolean, default: true },
    access: { type: String, default: null },
    viaOriginURL: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentValue: this.fromValue(this.value),
      file: {},
      dragover: false,
      errorMessage: [],
    };
  },
  watch: {
    value(value) {
      this.currentValue = this.fromValue(value);
    },
    currentValue: {
      handler(currentValue, oldValue) {
        const value = this.toValue(currentValue);
        this.$emit("input", value);
        console.log("input", value);
        this.$emit("update:value", value);
        console.log("update:value", value);
        this.$emit(
          "change",
          {
            value,
            oldValue: this.toValue(oldValue),
          },
          this
        );
        console.log("change", {
          value,
          oldValue: this.toValue(oldValue),
        });
      },
    },
  },
  methods: {
    onDrop(e) {
      this.dragover = false;
      if (this.readonly || this.disabled) return;
      this.upload(e.dataTransfer.files[0]);
    },
    onPaste(e) {
      if (this.readonly || this.disabled) return;
      if (this.pastable) this.upload(e.clipboardData.files[0]);
    },
    fromValue(value) {
      if (this.$env.VUE_APP_DESIGNER) {
        if (this.multiple) {
          return [{}];
        } else {
          return {};
        }
      }
      if (this.converter === "json") {
        if (this.multiple) {
          return JSON.parse(value || "[{}]");
        } else {
          return JSON.parse(value || "{}");
        }
      } else {
        if (!value) {
          return this.multiple ? [{}] : {};
        }
        return this.multiple
          ? [{ url: value, name: this.handleFileName(value) }]
          : { url: value, name: this.handleFileName(value) };
      }
    },
    toValue(value) {
      if (this.converter === "json") {
        return value ? JSON.stringify(value) : null;
      } else {
        return value.url || null;
      }
    },
    getUrl(item) {
      return item.thumb || item.url || item;
    },
    select() {
      if (this.readonly || this.disabled) return;

      this.$refs.file.value = "";
      this.$refs.file.click();
    },
    onChange(event) {
      // 大文件必为单文件上传，默认取文件集合的第一个元素
      const files = event.target.files;
      // 删除逻辑直接return
      if (!files && files.length === 0) return;
      // 走上传逻辑
      this.upload(files);
    },
    async upload(files) {
      if (
        !this.draggable &&
        !this.pastable &&
        this.$children.some(
          (item) => item && item.$attrs.flag === "large-file-uploader-button"
        )
      ) {
        const buttonVM = this.$children.find(
          (item) => item && item.$attrs.flag === "large-file-uploader-button"
        );
        buttonVM.$set(buttonVM, "loading", true);
        buttonVM.$set(buttonVM, "disabled", true);
      }
      this.errorMessage = [];
      this.$emit(
        "before-upload",
        this.multiple
          ? files
          : {
              file: files[0],
            },
        this
      );
      console.log(
        "before-upload",
        this.multiple
          ? files
          : {
              file: files[0],
            }
      );
      this.currentValue = this.multiple
        ? [...files].map((file) => ({
            uid: file.uid ? file.uid : Date.now(),
            status: "uploading",
            name: file.name,
            size: file.size,
            percent: 0,
            showProgress: true,
          }))
        : {
            uid: files[0].uid ? files[0].uid : Date.now(),
            status: "uploading",
            name: files[0].name,
            size: files[0].size,
            percent: 0,
            showProgress: true,
          };

      if (this.multiple) {
        for (const file of files) {
          await this.uploadChunk(file);
        }
      } else {
        this.uploadChunk(files[0]);
      }
    },
    async uploadChunk(file) {
      // 分片上传
      const chunkSize = 40 * 1024 * 1024; // 40MB
      const minLastChunkSize = 5 * 1024 * 1024; // 5MB
      let totalChunks = Math.ceil(file.size / chunkSize);
      let start = 0;
      const chunks = [];
      for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
        let chunk;
        if (chunkNumber === totalChunks - 1) {
          if (file.size - start < minLastChunkSize && totalChunks > 1) {
            chunk = file.slice(start - chunkSize, file.size);
            chunks.pop();
            chunks.push(chunk);
          } else {
            chunk = file.slice(start, file.size);
            chunks.push(chunk);
          }
        } else {
          chunk = file.slice(start, start + chunkSize);
          chunks.push(chunk);
        }
        start += chunkSize;
      }
      const fileName = new Date().getTime() + "_" + file.name;
      await this.postChunk(chunks, chunks.length, fileName);
      if (file.size > 5 * 1024 * 1024) {
        this.post(file, totalChunks, totalChunks, file.size, fileName, true);
      }
      return Promise.resolve();
    },
    async postChunk(chunks, totalChunks, fileName) {
      // 分开两个循环，方便维护
      let chunkNumber = 1;
      for (const chunk of chunks) {
        try {
          await this.post(
            chunk,
            chunkNumber++,
            totalChunks,
            chunk.size,
            fileName
          );
          // 异步函数执行成功，继续下一轮循环
        } catch (error) {
          console.error("异步函数执行失败:", error);
          return Promise.reject();
        }
      }
      return Promise.resolve();
    },
    post(chunk, chunkNumber, totalChunks, totalSize, fileName, isMerge) {
      const vm = this;
      return new Promise((resolve, reject) => {
        const {
          data,
          getCookie,
          headers,
          authorization,
          access,
          withCredentials,
          name,
        } = this;
        const headersReq = Object.assign(
          {},
          headers,
          authorization && {
            Authorization: getCookie("authorization") || null,
          },
          access && {
            "lcap-access": access,
          },
          window.appInfo &&
            window.appInfo.domainName && {
              DomainName: window.appInfo.domainName,
            },
          isMerge && { operation: "merge" }
        );
        const formData = {
          ...data,
          viaOriginURL: vm.viaOriginURL,
          totalSize,
          fileName,
          chunkSize: chunk.size,
          currentChunkSize: chunk.size,
          file: isMerge ? new Blob() : chunk,
          chunkNumber,
          totalChunks,
        };
        const requestData = {
          url: "/split/upload",
          withCredentials,
          name,
          data: formData,
          headers: headersReq,
        };

        let target = this.multiple
          ? this.currentValue.find((item) => fileName.endsWith(item.name))
          : this.currentValue;
        let percent = target.percent;
        const xhr = ajax({
          ...requestData,
          onProgress: (e) => {
            target.name = fileName;
            target.status = "uploading";
            target.percent = parseInt(percent + e.percent / (totalChunks + 1));
            target.showProgress = true;
            if (this.multiple) {
              this.currentValue = [...this.currentValue];
            }
            this.$emit(
              "progress",
              {
                e,
                file: chunk,
                item: target,
                xhr,
              },
              this
            );
            console.log("progress", {
              e,
              file: chunk,
              item: target,
              xhr,
            });
          },
          onSuccess: (res) => {
            if (isMerge || totalSize <= 5 * 1024 * 1024) {
              if (target.url) {
                target.name = this.handleFileName(target.url);
              }
              target.url = res.result;
              target.name = fileName;
              target.status = "success";
              target.percent = 100;
              target.showProgress = false;
              target.response = res;
              if (this.multiple) {
                this.currentValue = [...this.currentValue];
              }
              const value = this.toValue(target);
              this.$emit("input", value);
              console.log("input", value);
              this.$emit("update:value", value);
              console.log("update:value", value);
              this.$emit(
                "success",
                {
                  res,
                  file: chunk,
                  item: target,
                  xhr,
                },
                this
              );
              console.log("success", {
                res,
                file: chunk,
                item: target,
                xhr,
              });
              if (
                !this.draggable &&
                !this.pastable &&
                this.$children.some(
                  (item) =>
                    item && item.$attrs.flag === "large-file-uploader-button"
                )
              ) {
                const buttonVM = this.$children.find(
                  (item) =>
                    item && item.$attrs.flag === "large-file-uploader-button"
                );
                buttonVM.$set(buttonVM, "loading", false);
                buttonVM.$set(buttonVM, "disabled", false);
              }
            }
            resolve();
          },
          onError: (e) => {
            this.currentValue.status = "error";
            this.currentValue.showProgress = false;
            const value = this.toValue(this.currentValue);
            this.$emit("input", value);
            console.log("input", value);
            const errorMessage = JSON.parse(e).Message;
            this.errorMessage.push(errorMessage);
            this.$emit(
              "error",
              {
                e,
                file: chunk,
                item: this.currentValue,
                xhr,
              },
              this
            );
            console.log("error", {
              e,
              file: chunk,
              item: this.currentValue,
              xhr,
            });
            if (
              !this.draggable &&
              !this.pastable &&
              this.$children.some(
                (item) =>
                  item && item.$attrs.flag === "large-file-uploader-button"
              )
            ) {
              const buttonVM = this.$children.find(
                (item) =>
                  item && item.$attrs.flag === "large-file-uploader-button"
              );
              buttonVM.$set(buttonVM, "loading", false);
              buttonVM.$set(buttonVM, "disabled", false);
            }
            reject();
          },
        });
      });
    },
    getCookie(cname) {
      const name = `${cname}=`;
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return "";
    },
    remove(index) {
      let value = this.multiple ? this.currentValue[index] : this.currentValue;
      this.$emit(
        "before-remove",
        {
          oldValue: value,
          item: value,
        },
        this
      );
      console.log("before-remove", {
        oldValue: value,
        item: value,
      });
      if (this.multiple) {
        this.currentValue.splice(index, 1);
      } else {
        this.currentValue = {};
      }
      let removeValue;
      if (this.converter === "json") {
        removeValue = this.currentValue;
      } else {
        removeValue = JSON.stringify(this.currentValue);
      }
      this.$emit(
        "remove",
        {
          value: removeValue,
          item: removeValue,
        },
        this
      );
      console.log("remove", {
        value: removeValue,
        item: removeValue,
      });
    },
    // 展示时使用接口返回路径对应的文件名
    handleFileName(url) {
      const match = url.match(/\/([^/]+)$/);
      return match ? match[1] : null;
    },
  },
};
</script>

<style module>
.root {
  display: block;
  position: relative;
}

.root[display="inline"] {
  display: inline-block;
  max-width: var(--uploader-root-inline-max-width);
}

.select {
  display: inline-block;
  position: relative;
  overflow: hidden\0;
}

.full {
  width: 100%;
}

.file {
  display: none;
  display: block\0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: var(--cursor-pointer);
  z-index: -1\0;
}

.file[readonly],
.file[disabled] {
  display: none;
}

.item {
  cursor: default;
  margin-top: var(--uploader-list-margin-top);
  padding: var(--uploader-item-padding);
  background: var(--uploader-item-background);
  border-radius: var(--uploader-item-border-radius);
  transition: all var(--transition-duration-base);
}

.thumb {
  display: inline-block;
  vertical-align: middle;
}

.img {
  max-width: 100%;
  max-height: 100%;
}

.list .thumb::before {
  icon-font: url("../../assets/attachment.svg");
  float: left;
  margin-right: 8px;
  color: var(--uploader-item-icon-color);
}

.item + .item {
  margin-top: var(--uploader-item-space);
}

.item:hover {
  background: var(--uploader-item-background-hover);
}

.link {
  color: var(--uploader-link-color);
  cursor: var(--cursor-pointer);
  width: calc(100% - 50px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
}

.item:hover .link {
  color: var(--uploader-link-color-hover);
}

.link:hover {
  text-decoration: underline;
}

.remove {
  display: none;
  float: right;
  line-height: 1;
  font-size: 14px;
  margin-top: 4px;
  cursor: var(--cursor-pointer);
  opacity: 0.5;
  margin-right: 5px;
}

.item:hover .remove {
  display: block;
}

.remove:hover {
  opacity: 1;
}

.buttons {
  position: absolute;
  font-size: var(--uploader-card-button-font-size);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.button {
  cursor: var(--cursor-pointer);
  color: rgba(255, 255, 255, 0.6);
}

.button + .button {
  margin-left: 8px;
}

.button:hover {
  color: white;
}

.button[role="download"]::before {
  icon-font: url("../../assets/download.svg");
}

.button[role="remove"]::before {
  icon-font: url("../../assets/trashcan.svg");
}

.draggable {
  overflow: hidden;
  cursor: var(--cursor-pointer);
  text-align: center;
  background: var(--uploader-draggable-background);
  border: var(--uploader-draggable-border-width) dashed
    var(--uploader-draggable-border-color);
  border-radius: var(--uploader-draggable-border-radius);
  padding: var(--uploader-draggable-padding);
  transition: all var(--transition-duration-base);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.draggable:focus,
.draggable:hover,
.draggable[dragover] {
  outline: none;
  border-color: var(--uploader-draggable-border-color-hover);
}

.draggable > svg {
  font-size: 24px;
  color: var(--uploader-draggable-icon-color);
  margin: 10px 0px;
}

.dragDescription {
  margin-bottom: 10px;
  color: var(--uploader-draggable-color);
}

.errwrap {
  max-height: var(--uploader-error-box-height);
  padding: 0 5px 5px 0;
}

.errmessage {
  display: block;
  white-space: var(--validator-message-white-space);
  color: #f24957;
  border-radius: var(--validator-message-border-radius);
  min-width: var(--validator-message-min-width);
  margin: 4px 0;
  font-size: 12px;
}

.errmessage::before {
  display: block;
  height: 12px;
  width: 12px;
  margin-left: 1px;
  margin-right: 4px;
  background: url("../../assets/warning.svg");
}

.description {
  color: var(--uploader-color);
  margin: 4px 0;
  font-size: 12px;
}

.cardwrap .description,
.cardwrap .errmessage {
  margin-left: var(--uploader-card-space);
}

.cardwrap .errwrap {
  max-width: var(--uploader-error-box-max-width);
}
</style>
