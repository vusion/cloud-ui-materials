<template>
  <div :class="$style.root" vusion-disabled-copy>
      <div id="container-map" :class="$style.container" ref="container-map">
          <div id="pickerBox" ref="pickerBox">
              <input
                  id="pickerInput"
                  placeholder="输入关键字选取地点"
                  ref="pickerInput"
              />
              <div id="poiInfo" ref="poiInfo"></div>
          </div>
          <div :class="$style.containertipwrap" v-show="show">
              <div :class="$style.containertip">
                  地图不可用，请前往「应用配置」页面「自定义参数配置」，配置key和密钥。如果您已经配置Key，请发布预览后重新刷新页面。
              </div>
          </div>
      </div>
  </div>
</template>

<script>
// import AMapLoader from '@amap/amap-jsapi-loader';
import { getAMapInstance } from '../../utils/getAMapInstance';

export default {
  name: 'cw-amap-new-poi',
  props: {
      city: {
          type: String,
      },
  },
  data() {
      return {
          show: false,
          map: null,
          poiInfo: null,
          poiPicker: null,
          lcapmap: null,
      };
  },
  computed: {},
  watch: {
      city: {
          handler(val) {
              this.changeCity(val);
          },
          immediate: false,
      },
  },

  mounted() {
      this.initMap();
  },
  created() {
      // const config = this.getJSON(
      //     window.appInfo && window.appInfo.extendedConfig
      // );
      // if (config && config.amapCode) {
      //     window._AMapSecurityConfig = {
      //         securityJsCode: config.amapCode,
      //     };
      // } else {
      //     this.show = true;
      //     // this.$toast.show('请先配置高德地图的code');
      // }
      // window._AMapSecurityConfig = {
      //     securityJsCode: 'aef6b461d527c3fb575e4e66a61c1d24',
      // };
  },
  methods: {
      changeCity(val) {
          this.lcapmap.setCity(val);
          this.poiPicker.setCity(val);
          this.poiPicker.searchByKeyword(val);
          this.poiPicker.suggest('美食');
      },
      initMap() {
          // const config = this.getJSON(
          //     window.appInfo && window.appInfo.extendedConfig
          // );
          // if (!config || !config.amapKey) {
          //     // this.$toast.show('请先配置高德地图的key');
          //     this.show = true;
          //     return;
          // }
          getAMapInstance()
              .then((AMap) => {
                  const wrapper = this.$refs['container-map'];
                  this.lcapmap = this.map = new AMap.Map(wrapper, {
                      city: this.city,
                      lang: 'zh_cn',
                      zoom: 10,
                  });
                  setTimeout(() => {
                      this.map.setCity(this.city);
                  }, 1500);
                  // window.lcpAmap = this.map;
                  // console.log(this.map, 7777);
                  const map = this.map;
                  function poiPickerReady(poiPicker) {
                      this.poiPicker = poiPicker;

                      const marker = new AMap.Marker();

                      const infoWindow = new AMap.InfoWindow({
                          offset: new AMap.Pixel(0, -20),
                      });

                      poiPicker.on('poiPicked', (poiResult) => {
                          const source = poiResult.source;
                          const poi = poiResult.item;
                          const info = {
                              source,
                              id: poi.id,
                              name: poi.name,
                              location: poi.location.toString(),
                              address: poi.address,
                          };

                          marker.setMap(map);
                          infoWindow.setMap(map);

                          marker.setPosition(poi.location);
                          infoWindow.setPosition(poi.location);

                          infoWindow.setContent(
                              'POI信息: <pre>' +
                                  JSON.stringify(info, null, 2) +
                                  '</pre>'
                          );
                          infoWindow.open(map, marker.getPosition());

                          map.setCenter(marker.getPosition());
                          this.poiInfo = info;
                          // eslint-disable-next-line no-console
                          console.log(this.poiInfo);
                          this.$emit('select', JSON.stringify(info, null, 2));
                      });

                      poiPicker.onCityReady(() => {
                          poiPicker.suggest('美食');
                      });
                  }
                  const inputWrapper = this.$refs.pickerInput;
                  this.poiPicker = new window.AMapUI.PoiPicker({
                      city: this.city,
                      input: inputWrapper,
                  });

                  // 初始化poiPicker
                  poiPickerReady.call(this, this.poiPicker);
              })
              .catch((e) => {
                  console.error(e);
                  this.show = true;
              });
      },
      poiPicked() {
          if (!this.poiInfo) {
              this.$toast.show('请先选择POI信息');
              return {};
          }
          return this.poiInfo;
      },
      getJSON(obj) {
          try {
              if (typeof obj === 'string') {
                  return JSON.parse(obj);
              }
              return obj || null;
          } catch (error) {
              return null;
          }
      },
  },
};
</script>

<style module>
.root {
  width: 100%;
  height: 500px;
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0px;
  font-size: 13px;
}
.containertipwrap {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
}

.containertip {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 14px;
  /* identical to box height, or 100% */

  color: #ffffff;
}
</style>
<style>
#pickerBox {
  position: absolute;
  z-index: 9999;
  top: 50px;
  right: 30px;
  width: 300px;
}

#pickerInput {
  width: 200px;
  padding: 5px 5px;
}

#poiInfo {
  background: #fff;
}

.amap_lib_placeSearch .poibox.highlight {
  background-color: #cae1ff;
}

.amap_lib_placeSearch .poi-more {
  display: none !important;
}
</style>
