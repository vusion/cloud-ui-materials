### 基本用法

``` vue
<template>
<div>
  <cw-signature-view ref='signature'></cw-signature-view>
  <u-button  color="primary" text="clear" @click="clearSignature" ></u-button>
  <u-button  color="primary" text="generate" @click="generateSignature" ></u-button>

  <u-image :src="image" style="width: 300px; height: 150px;" fit="scale-down"></u-image>
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
    }
  }
}
</script>
```

