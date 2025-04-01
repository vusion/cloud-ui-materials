<template>
<div class="my-room">
  <div class="swiper mySwiper2">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list" :key="item" >
          <div class='item' :style="`background-image:url(${item.img})`" >
            <div class="p1">{{ item.title }}</div>
            <div class="p2">   {{ item.desc }}</div>
            <div class="line" :style="`background-image:url(${item.bg})`" >
              <img class="pic" :src="item.icon" alt="">
              <div class="desc">
                <p v-for="it in item.p" :key="it">
                  {{it}}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide" style="background-color: transparent;"></div>
        <div class="swiper-slide" style="background-color: transparent;"></div>
    </div>
  </div>
</div>
</template>
<script>
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
export default {
  name: 'cust-swiper-view',
  props: {
    list: {
      type: String,
      default: []
    },
  },
  data(){
    return {
      // list:[],
      defaultData:{
        img:"http://dev.xgjce.dogfood.lcap.163yun.com/upload/%E9%AB%98%E5%9B%BD%E6%A0%87%E5%93%81%E8%B4%A8%E4%B8%A5%E6%8E%A7.png?fileName=%E9%AB%98%E5%9B%BD%E6%A0%87%E5%93%81%E8%B4%A8%E4%B8%A5%E6%8E%A7.png&fut=1733303788645&ai=3a7b633a-eb67-4789-bb7d-12d0e272e1ef&con=lcap_default_connection",
        icon:"http://dev.xgjce.dogfood.lcap.163yun.com/upload/占位icon.png?fileName=占位icon.png&fut=1733303897836&ai=3a7b633a-eb67-4789-bb7d-12d0e272e1ef&con=lcap_default_connection",
        bg:"https://lcpapp-static.nos-eastchina1.126.net/user/yanxuan/1733728576589_1ec8d26b70d44250b46da05f86218789.png",
        title:"【严保障】",
        desc:"领先技术",
        p:[" 上签个国内设计师资源",'获得国内外多个创意大赛','满足多哟昂货定制']
      }
    }
  },
  async mounted(){
    const debounce = (fn, delay) => {
      let timer = null;
      return function() {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, arguments);
        }, delay);
      }
    }
    const debounce1=  debounce((swiper)=>{
            document.querySelectorAll('.line').forEach(item=>{
              item.classList.remove('active-line')
            })
            const activeIndex = swiper.activeIndex;
            const activeSlide = swiper.slides[activeIndex];
            activeSlide.querySelector('.line').classList.add('active-line')
          },1000)
    this.list = Array(8).fill(this.defaultData);
    await this.$nextTick() 
    var swiper2 = new Swiper(".mySwiper2", {
      initialSlide: this.list.length,
      grabCursor: true,
      effect: "creative",
      perspective:true,
      direction: "vertical",
      slidesPerView: 3,
      on:{
        slideChange:(swiper)=>{
          debounce1(swiper)
        }
      },
      creativeEffect: {
        progressMultiplier:2,
        limitProgress:3,
        prev: {
          translate: [0, '-15%', 140],
          scale:0.885,
        },
        next: {
          translate: [0, "40%", -800],
          scale:1.6,
        },
      },
    });
  }
};
</script>
<style>
  .my-room {
    width: 220px;
    height: 230px;
    transform: scale(1.2);
  }

  .mySwiper2{
    width: 220px;
    height: 160px;
  }

  .mySwiper2 {
    height: 340px;
    transform: rotate(180deg);
  }

  .mySwiper2 .swiper-slide {
    width: 220px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    /* padding-bottom: 50px; */
    border-radius: 10px;
  }

  .mySwiper2 .p1{
    color: #000;
    font-size: 16px;
    margin-top: 5px;
  }
  .mySwiper2 .p2{
    font-size: 16px;
    color: #000;
    text-indent: .5em;
  }


  .mySwiper2 .item {
    overflow: unset;
    width: 100%;
    height: 100%;
    opacity: 1;
    transform: rotate(180deg);
    background-size: 100% 100%;
    position: relative;
  }


  @keyframes slide {
    0% {
      padding-bottom: 50px;
    }

    100% {
      padding-bottom: 0px;
    }
  }

  /* .swiper-slide-active .line {
    opacity: 1;
  } */


  @keyframes imgScale {
    0% {
      transform: scale(0);
      opacity: 1;
    }

    80% {
      transform: scale(1);
      opacity: 1;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .my-room .active-line.line {
    animation: line 2s linear 2 alternate;
    animation-fill-mode: both;
  }

  .my-room .line img {
    width: 140px;
    height: 140px;
    margin-bottom: 10px;
    margin-top: 20px;
  }

  .my-room .line {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 220px;
    height: 274px;
    background-color: #fff;
    opacity: 0;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1000;
    background-size: 100% 100%;
    /* background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 75%, rgba(255,165,0,1) 100%); */
  }


  .my-room .active-line.line img {
    animation: imgScale .8s linear;
    animation-fill-mode: both;
    animation-delay: 1.5s;
    animation-iteration-count: 2;
    animation-direction: alternate;
  }

  .my-room .line p {
    font-size: 12px;
  }

  /* 6s */
  @keyframes line {
    0% {
      transform: translateY(0%);
      opacity: 0;
    }

    10% {
      opacity: 1;
    }

    50% {
      transform: translateY(-160px);
      opacity: 1;
    }

    70% {
      transform: translateY(-160px);
      opacity: 1;
    }

    100% {
      opacity: 1;
      transform: translateY(-160px);
    }
  }

  .my-room .active-line .desc {
    animation: desc .8s ease-in 2 alternate 1.5s;
    animation-fill-mode: both;
    opacity: 0;
  }

  .my-room .desc p {
    margin: 0;
    padding: 0;
    text-align: center;
    color: #000;
  }

  @keyframes desc {
    0% {
      transform: translateY(80px);
      opacity: 0;
    }

    50% {
      transform: translateY(0%);
      opacity: 1;
    }

    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }


  .my-room  .line-wrap {
    display: relative;
  }

  .my-room  .swiper-creative .swiper-slide {
    backface-visibility: visible;
    overflow: visible;
  }
</style>
