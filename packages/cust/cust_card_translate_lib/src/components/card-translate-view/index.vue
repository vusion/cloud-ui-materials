<template>
        <div class="card-translate-image-fold">
            <div class="card-translate-image-item" v-for="item,index in list" :key="index" :style="`background-image: url(${item.img})`">
                <div class="card-translate-image-item-title">
                    <h4>{{ item.title }}</h4>
                    <p class="info">
                        {{ item.subTitle }}
                    </p>
                </div>
                <div class="card-translate-image-item-title2">
                   <h4>{{ item.title }}</h4> 
                   <p class="info">
                    {{ item.info }}
                   </p>
                </div>
            </div>
      </div>
</template>
<script>
const defaultData = {
  title: '赠礼品',
  subTitle: '不断推动元宇宙科',
  info: '不断推动元宇宙科技与整合营销的创新融合，深入探索NFT数字藏品、虚拟礼品、虚拟形象、虚拟IP运营、虚拟场域营销等，为品牌和用户提供“虚实相生”的双重体验',
  img: 'https://picsum.photos/1000/500?random=3'
}
export default {
  name: 'card-translate-view',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: 1200
    },
    height: {
      type: Number,
      default: 500
    }
  },
  watch:{
    list(){
      this.$nextTick(() => {
        this.init()
      })
    }
  },
  mounted(){
    // this.list = [defaultData,defaultData,defaultData,defaultData]
  },
  methods:{
    init(){
      document.querySelector('.card-translate-image-item').classList.add('active')
      document.querySelectorAll('.card-translate-image-item').forEach(item => {
            item.addEventListener('mouseover', () => {
                document.querySelectorAll('.card-translate-image-item').forEach(el => {
                    el.classList.remove('active');
                });
                item.classList.add('active');
            });
        });
    }
  }
};
</script>
<style>

.card-translate-image-fold {
    min-height: 500px;
    width: 1200px;
    height: 500px;
    display: flex;
    position: relative;
}

.card-translate-image-item {
    position: relative;
    width: 25%;
    height: 100%;
    transition: all 0.5s ease;
    cursor: pointer;
    overflow: hidden;
    transform-origin: left;
    background-position: center;
}

.card-translate-image-item img {
    position: absolute;
    height: 100%;
    /* 设置图片宽度为容器的4倍，确保完整显示 */
    width: 400%;
    /* object-fit: cover; */
    left: 0;
    top: 0;
    pointer-events: none;
}

/* 设置每张图片的初始位置 */
/* .image-item:nth-child(1) img { left: 0; }
.image-item:nth-child(2) img { left: -100%; }
.image-item:nth-child(3) img { left: -200%; }
.image-item:nth-child(4) img { left: -300%; } */

/* 默认第一张是展开状态 */
.card-translate-image-item {
    width: 20%;
}

.card-translate-image-item.active {
    width: 55%;
}

.card-translate-image-item.active{
    width: 55%;
}

.card-translate-image-item:not(.active) {
    width: 20%;
}
.card-translate-image-item-title2{
    display: none;
}
.active .card-translate-image-item-title2{
    display: block;
}
.active .card-translate-image-item-title{
    display: none;
}
.card-translate-image-item-title2{
    position: absolute;
    background: rgba(207, 0, 13, 0.9);
    box-sizing: content-box;
    width: 400px;
    height: auto;
    overflow: hidden;
    text-align: left;
    bottom: 10px;
    right: 10px;
    padding: 20px;
    color: #fff;
}
.card-translate-image-item-title2 h4{
    font-size: 24px;
    margin: 10px;
}
.card-translate-image-item-title{
    position: absolute;
    background: rgba(0, 0, 0, 0.42);
    padding-top: 400px;
    top: 0;
    height: 100%;
    width:100%;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
    color: #fff;
}
.card-translate-image-item-title h4{
    font-size: 24px;
    margin: 10px;
}
</style>
