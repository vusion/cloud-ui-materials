### 基本用法

``` vue
<template>
<div>
  <cw-signature-view ref='signature'></cw-signature-view>
  <u-button  color="primary" text="clear" @click="clearSignature" ></u-button>
  <u-button  color="primary" text="generate" @click="generateSignature" ></u-button>
  <u-button  color="primary" text="rotate" @click="rotateSignature" ></u-button>

  <u-image :src="image" fit="scale-down"></u-image>
</div>
</template>


<script>
export default {
  data() {
    return {
      image: ''
    }
  },
  methods: {
    clearSignature() {
      this.$refs.signature.clear()
    },
    generateSignature() {
      this.image = this.$refs.signature.getSignature()
    },
    async rotateSignature() {
      const image = await this.$refs.signature.rotateSignature(270)
      this.image = image
    }
  }
}
</script>
```

