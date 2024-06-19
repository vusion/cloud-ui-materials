<template>
  <div>
   <h1 class="img-titlte">{{contentTitle}}</h1>
    <div :id="galleryID">
      <a
        v-for="(image, key) in imagesData"
        :key="key"
        :href="image.largeURL"
        :data-pswp-width="image.width"
        :data-pswp-height="image.height"
        target="_blank"
        rel="noreferrer"
      >
        <img  :style="cwStyle" class="cw-antd-image" :src="image.thumbnailURL" alt="" />
      </a>
    </div>
  </div>
</template>

<script>
import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.min';
import photoswipe from "photoswipe"
import 'photoswipe/dist/photoswipe.css';
export default {
    name:"cw-antd-image",
    props:{
      value:{
        type:String,
        default:'https://img0.baidu.com/it/u=3773090653,2338589126&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
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
    data(){
      return{
        imagesData:[{
          largeURL:this.value,
          thumbnailURL: this.value,
        }],
      }
    },
   mounted() {
      if (!this.lightbox) {
        this.lightbox = new PhotoSwipeLightbox({
          gallery: '#' + this.$props.galleryID ,
          children: 'a',
          showHideAnimationType: 'zoom',
          showAnimationDuration: 300,
          hideAnimationDuration: 0,
          pswpModule: photoswipe,
          getViewportSizeFn: function(options, pswp) {
            return {
              x: document.documentElement.clientWidth,
              y: window.innerHeight
            };
          }
        });
        this.lightbox.init();
      }
    },
    unmounted() {
      if (this.lightbox) {
        this.lightbox.destroy();
        this.lightbox = null;
      }
    },
    watch:{
      value:{
       handler(newV,oldV){
        this.imagesData = [{
          largeURL:newV,
          thumbnailURL: newV,
        }]
       },
      //  deep:true,
       immediate:true
      }
    }
}
</script>

<style>
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