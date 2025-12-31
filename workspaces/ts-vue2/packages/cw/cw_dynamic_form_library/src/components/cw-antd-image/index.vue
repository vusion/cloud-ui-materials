<template>
  <div>
   <h1 class="img-titlte">{{contentTitle}}</h1>
    <div :id="galleryID">
      <img 
        :style="cwStyle" 
        class="cw-antd-image" 
        :src="imageUrl" 
        alt=""
        @click="handleImageClick"
      />
    </div>
  </div>
</template>

<script>
// import PhotoSwipeLightbox from 'photoswipe/lightbox';
// import PhotoSwipe from "photoswipe"
// import 'photoswipe/style.css';
export default {
    name:"cw-antd-image",
    props:{
      value:{
        type:String,
        default:'https://img0.baidu.com/it/u=3773090653,2338589126&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
      },
      imgUrl:{
        type:String,
        default:'https://t9.baidu.com/it/u=1907594407,3775802009&fm=193'
      },
      contentTitle:{
         type:String,
      },
      cwStyle:{
        type:String
      },
      galleryID:{
        type:String,
        default:"cw-imgage-view"
      }
    },
    computed: {
      imageUrl() {
        return this.imgUrl || this.value;
      }
    },
    methods: {
      handleImageClick() {
        // 简单的图片点击处理，可以打开新窗口查看大图
        if (this.imageUrl) {
          window.open(this.imageUrl, '_blank');
        }
      }
    }
}
</script>

<style scoped>
.img-titlte{
font-weight: 600;
font-size: 14px;
}

.cw-antd-image{
  width: 100%;
  height: 100%;
}
.pswp__img{
  object-fit:scale-down;
}

.pswp__img.pswp__img--placeholder{
  opacity: 0 !important; 
}
</style>