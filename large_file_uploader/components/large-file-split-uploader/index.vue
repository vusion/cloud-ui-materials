<template>
  <div :class="$style.root">
    <div
      v-if="draggable && (!readonly || $env.VUE_APP_DESIGNER)"
      :class="$style.draggable"
      :dragover="dragover"
      @click="select()"
      :tabindex="readonly || disabled ? '' : 0"
      @drop.prevent="onDrop"
      @paste="onPaste"
      @dragover.prevent="dragover = true"
      @dragleave.prevent="dragover = false"
    >
      <input
        :class="$style.file"
        ref="file"
        type="file"
        :name="name"
        :accept="accept"
        :readonly="readonly"
        :disabled="disabled"
        @click.stop
        @change="onChange"
      />
      <div>
        <div
          v-if="dragDescription"
          vusion-slot-name="dragDescription"
          :class="$style.dragDescription"
        >
          <slot name="dragDescription">{{ dragDescription }}</slot>
        </div>
        <slot></slot>
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
        v-if="showErrorMessage && errorMessage.length"
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
        currentValue.status &&
        currentValue.status === 'uploading'
      "
      :class="$style.list"
    >
      <div :class="$style.item">
        <a
          v-if="!currentValue.showProgress"
          :class="$style.link"
          :href="currentValue.url"
          download
          >{{ currentValue.name }}</a
        >
        <linear-progress
          v-if="currentValue.showProgress"
          :class="$style.progress"
          :percent="currentValue.percent"
        ></linear-progress>
        <img
          v-else-if="!readonly && !disabled"
          :class="$style.remove"
          :src="require('../../assets/remove.svg')"
          @click="remove"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import ajax from "./ajax";
import LinearProgress from "./comps/linear-progress.vue";

export default {
  name: "large-file-split-uploader",
  components: {
    LinearProgress,
  },
  props: {
    largeValue: [String, Object],
    url: { type: String, required: true },
    name: { type: String, default: "file" },
    accept: String,
    headers: { type: Object, default: () => ({}) },
    withCredentials: { type: Boolean, default: false },
    data: Object,
    maxSize: { type: [String, Number], default: Infinity },
    urlField: { type: String, default: "url" },
    draggable: { type: Boolean, default: false },
    pastable: { type: Boolean, default: false },
    converter: String,
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    dragDescription: { type: String, default: "点击/拖动/粘贴文件到这里" },
    description: String, // 上传限制描述等
    showErrorMessage: { type: Boolean, default: true },
    checkFile: [Function],
    authorization: { type: Boolean, default: true },
    access: { type: String, default: null },
  },
  data() {
    return {
      currentValue: this.fromValue(this.largeValue),
      sending: false,
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
        this.$emit("update:largeValue", value);
        this.$emit(
          "change",
          {
            value,
            oldValue: this.toValue(oldValue),
          },
          this
        );
      },
    },
  },
  methods: {
    fromValue(value) {
      console.log("value", value);
      if (this.converter === "json") {
        return JSON.parse(value || "{}");
      } else {
        return value;
      }
    },
    toValue(value) {
      if (this.converter === "json") {
        return value ? JSON.stringify(value) : null;
      } else {
        return value || null;
      }
    },
    getUrl(item) {
      return item.thumb || item.url || item;
    },
    select() {
      if (this.readonly || this.disabled || this.sending) return;

      this.$refs.file.largeValue = "";
      this.$refs.file.click();
    },
    onChange(event) {
      // 大文件必为单文件上传，默认取文件集合的第一个元素
      const file = event.target.files[0];
      // 删除逻辑直接return
      if (!file) return;
      // 走上传逻辑
      this.upload(file);
    },
    upload(file) {
      console.log("file", file);
      this.errorMessage = [];
      // todo
      // if (!this.checkFileOrigin(file)) return;
      if (
        this.$emit(
          "before-upload",
          {
            file,
          },
          this
        )
      ) {
        // todo
        console.log("上传前可以取消上传");
      }
      this.currentValue = {
        uid: file.uid ? file.uid : Date.now(),
        status: "uploading",
        name: file.name,
        size: file.size,
        percent: 0,
        showProgress: true,
      };

      this.uploadChunk(file);
    },
    async uploadChunk(file) {
      // 分片上传
      const chunkSize = 40 * 1024 * 1024; // 50MB
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
      this.post(file, totalChunks, totalChunks, file.size, fileName, true);
    },
    async postChunk(chunks, totalChunks, fileName) {
      console.log("chunks", chunks);
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
          { "Transfer-Encoding": "chunked" },
          isMerge && { operation: "merge" }
        );
        const formData = {
          ...data,
          totalSize,
          fileName,
          chunkSize: chunk.size,
          currentChunkSize: chunk.size,
          file: isMerge ? new Blob() : chunk,
          chunkNumber,
          totalChunks,
        };
        console.log("chunk", formData);
        const requestData = {
          url: "/split/upload",
          withCredentials,
          name,
          data: formData,
          headers: headersReq,
        };
        let percent = this.currentValue.percent;
        const xhr = ajax({
          ...requestData,
          onProgress: (e) => {
            console.log("e.percent", e.percent);
            this.currentValue = {
              name: fileName,
              status: "uploading",
              percent: parseInt(percent + e.percent / (totalChunks + 1)),
              showProgress: true,
            };
            this.$emit(
              "progress",
              {
                e,
                file: chunk,
                item: this.currentValue,
                xhr,
              },
              this
            );
          },
          onSuccess: (res) => {
            if (isMerge) {
              if (res[this.urlField]) {
                const url = res[this.urlField];
                this.currentValue.url = url;
              }
              this.currentValue.response = res;
              this.currentValue.showProgress = false;
              if (this.currentValue.url) {
                this.currentValue.name = this.handleFileName(
                  this.currentValue.url
                );
              }
              const value = this.toValue(this.currentValue);
              this.$emit("input", value);
              this.$emit("update:largeValue", value);
              console.log("res", res);
              this.currentValue = {
                url: res.result,
                name: fileName,
                percent: 0,
                showProgress: false,
                status: "success",
              };
              resolve();
              this.$emit(
                "success",
                {
                  res,
                  file: chunk,
                  item: this.currentValue,
                  xhr,
                },
                this
              );
            }
            resolve();
          },

          onError: (e, res) => {
            this.currentValue.status = "error";
            const value = this.toValue(this.currentValue);
            this.$emit("input", value);
            this.$emit("update:largeValue", value);
            const errorMessage = `文件${this.currentValue.name}上传接口调用失败`;
            this.errorMessage.push(errorMessage);
            reject();

            this.$emit(
              "error",
              {
                e,
                res,
                file: chunk,
                item: this.currentValue,
                xhr,
              },
              this
            );
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
    remove() {
      if (
        this.$emit(
          "before-remove",
          {
            oldValue: this.currentValue,
            item: this.currentValue,
          },
          this
        )
      ) {
      }

      this.currentValue = this.converter === "json" ? {} : "";
      this.$emit(
        "remove",
        {
          value: this.currentValue,
          item: this.currentValue,
        },
        this
      );
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
}

.draggable:focus,
.draggable:hover,
.draggable[dragover] {
  outline: none;
  border-color: var(--uploader-draggable-border-color-hover);
}

.draggable::before {
  font-size: 24px;
  icon-font: url("../../assets/upload.svg");
  color: var(--uploader-draggable-icon-color);
}

.draggable:focus::before,
.draggable[dragover]::before {
  color: var(--uploader-draggable-color-hover);
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
