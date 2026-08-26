import Component from '../index.vue';

export default {
  id: 'cw-wang-editor-examples',
  title: '组件列表/CwWangEditor/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Basic = {
  name: '基本用法',
  render: () => ({
    data() {
      return {
        readOnly: true,
        value: '',
        base64: undefined,
      };
    },
    mounted() {
      setTimeout(() => {
        this.value = '123';
      }, 2000);
    },
    methods: {
      handleChange() {
        console.log(this.$refs.editor.editor);
      },
      async handleClick() {
        const [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        await this.$refs.editor.docxParse(file);
      },
    },
    template: `
      <div>
        {{ value }}
        <cw-wang-editor
          :value="value"
          @update:value="(v) => (value = v)"
          showDocxButton
          ref="editor"
        ></cw-wang-editor>
        <el-button
          @click="handleClick"
          :style="{
            backgroundImage: base64 ? 'url(' + base64 + ')' : undefined,
            backgroundSize: 'cover',
          }"
        >
          hhh
        </el-button>
      </div>
    `,
  }),
};

export const CustomUpload = {
  name: '自定义上传地址',
  render: () => ({
    template: `
      <cw-wang-editor
        value="<p>hello</p><img src='https://p3-passport.byteimg.com/img/user-avatar/834687b5e4137f4d998a95be7330f543~180x180.awebp'"
        uploadImgServer="/upload/test"
      ></cw-wang-editor>
    `,
  }),
};

export const ReadOnly = {
  name: '只读模式',
  render: () => ({
    data() {
      return {
        readOnly: true,
      };
    },
    methods: {
      handleReadOnly() {
        this.readOnly = !this.readOnly;
      },
    },
    template: `
      <div>
        <cw-wang-editor
          :readOnly="readOnly"
          value="<p>hello</p><img src='https://p3-passport.byteimg.com/img/user-avatar/834687b5e4137f4d998a95be7330f543~180x180.awebp'>"
        ></cw-wang-editor>
        <el-button @click="handleReadOnly">切换</el-button>
      </div>
    `,
  }),
};

export const FormValidation = {
  name: '表单验证',
  render: () => ({
    data() {
      return {
        value: '',
        editorStyle: 'height: 300px',
      };
    },
    mounted() {
      setTimeout(() => {
        this.value = '我有内容了';
      }, 1000);
    },
    methods: {
      async onClick() {
        await this.$refs.form.validate();
      },
    },
    template: `
      <el-form ref="form">
        <el-form-item :required="true" label="业务口径">
          <cw-wang-editor
            v-model:value="value"
            :editorStyle="editorStyle"
          ></cw-wang-editor>
        </el-form-item>
        <el-form-item>
          <el-button @click="onClick">验证</el-button>
        </el-form-item>
      </el-form>
    `,
  }),
};
