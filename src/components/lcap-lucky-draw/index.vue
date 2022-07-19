<template>
  <div :class="$style.root">
    <LuckyGrid
      ref="myLucky"
      width="300px"
      height="300px"
      :prizes="prizes"
      :blocks="blocks"
      :buttons="buttons"
      @start="startCallback"
      @end="endCallback"
    />
    <u-modal
      :visible.sync="visible"
      cancel-button
      @ok="handleOk"
      title="抽奖结果"
    >
      <div slot="body">
        <div class="result">
            <span>恭喜您获得{{ currentPrize }}!</span>
        </div>
      </div>
    </u-modal>
  </div>
</template>

<script>
import VueLuckyCanvas from '@lucky-canvas/vue';

Vue.use(VueLuckyCanvas);
export default {
  name: 'lcap-lucky-draw',
  data() {
    return {
      visible: false,
      currentPrize: '',
      blocks: [
        {padding: '10px', background: '#617df2'},
        {padding: '10px', background: '#e9e8fe'},
      ],
      buttons: [
        {
          x: 1, y: 1,
          // background: '#7074f6',
          // fonts: [{text: '开始', top: '25%'}],
          imgs: [{src: require('./assets/start.png'), width: '100%', height: '100%'}],
        },
      ],
    }
  },
  computed: {
    prizes() {
      return [
        {
          x: 0,
          y: 0,
          background: '#899df3',
          fonts: [{text: this.block1_name, top: '15px', fontSize: this.block1_fontSize}],
          range: this.block1_chance
        },
        {
          x: 1,
          y: 0,
          background: '#9c9dd8',
          fonts: [{text: this.block2_name, top: '15px', fontSize: this.block2_fontSize}],
          range: this.block2_chance
        },
        {
          x: 2,
          y: 0,
          background: '#899df3',
          fonts: [{text: this.block3_name, top: '15px', fontSize: this.block3_fontSize}],
          range: this.block3_chance
        },
        {
          x: 2,
          y: 1,
          background: '#9c9dd8',
          fonts: [{text: this.block4_name, top: '15px', fontSize: this.block4_fontSize}],
          range: this.block4_chance
        },
        {
          x: 2,
          y: 2,
          background: '#899df3',
          fonts: [{text: this.block5_name, top: '15px', fontSize: this.block5_fontSize}],
          range: this.block5_chance
        },
        {
          x: 1,
          y: 2,
          background: '#9c9dd8',
          fonts: [{text: this.block6_name, top: '15px', fontSize: this.block6_fontSize}],
          range: this.block6_chance
        },
        {
          x: 0,
          y: 2,
          background: '#899df3',
          fonts: [{text: this.block7_name, top: '15px', fontSize: this.block7_fontSize}],
          range: this.block7_chance
        },
        {
          x: 0,
          y: 1,
          background: '#9c9dd8',
          fonts: [{text: this.block8_name, top: '15px', fontSize: this.block8_fontSize}],
          range: this.block8_chance
        },
      ]
    },
  },
  props: {
    block1_name: {type: String, default: '奖品1'},
    block2_name: {type: String, default: '奖品2'},
    block3_name: {type: String, default: '奖品3'},
    block4_name: {type: String, default: '奖品4'},
    block5_name: {type: String, default: '奖品5'},
    block6_name: {type: String, default: '奖品6'},
    block7_name: {type: String, default: '奖品7'},
    block8_name: {type: String, default: '奖品8'},
    block1_chance: {type: Number, default: 10},
    block2_chance: {type: Number, default: 10},
    block3_chance: {type: Number, default: 10},
    block4_chance: {type: Number, default: 10},
    block5_chance: {type: Number, default: 10},
    block6_chance: {type: Number, default: 10},
    block7_chance: {type: Number, default: 10},
    block8_chance: {type: Number, default: 10},
    block1_fontSize: {type: String, default: '22px'},
    block2_fontSize: {type: String, default: '22px'},
    block3_fontSize: {type: String, default: '22px'},
    block4_fontSize: {type: String, default: '22px'},
    block5_fontSize: {type: String, default: '22px'},
    block6_fontSize: {type: String, default: '22px'},
    block7_fontSize: {type: String, default: '22px'},
    block8_fontSize: {type: String, default: '22px'},
  },
  methods: {
    // 点击抽奖按钮会触发star回调
    startCallback() {
      // 调用抽奖组件的play方法开始游戏
      this.$emit('start');
      this.currentPrize = '';
      this.$refs.myLucky.play();
      setTimeout(() => {
        this.$refs.myLucky.stop();
      }, 1500);
    },
    // 抽奖结束会触发end回调
    endCallback(prize) {
      this.$emit('end', prize);
      this.visible = true;
      this.currentPrize = prize.fonts[0].text;
      console.log(prize);
    },
    handleOk() {
      this.visible = false;
      this.currentPrize = '';
    },
  }

};
</script>

<style module>
.root {
  display: inline-block;
}
</style>
