<template>
  <div :class="$style.zoomer" :style="{ backgroundColor: backgroundColor }" @mousewheel="onMouseWheel"
    @DOMMouseScroll="onMouseWheel" @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove="onMouseMove"
    @mouseout="setPointerPosCenter" @touchstart="onTouchStart" @touchend="onTouchEnd" v-click-outside="onMouseUp"
    @touchmove="onTouchMove">
    <div :class="$style.zoomerContent" :style="wrapperStyle" ref="scaleContainer">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import _debounce from './debounce.min.js'
import ClickOutside from 'vue-click-outside'
import TapDetector from './TapDetector'


export default {
  name: 'vScaler',
  directives: {
    ClickOutside
  },
  props: {
    minScale: { type: Number, default: 1 },
    maxScale: { type: Number, default: 5 },
    zoomed: { type: Boolean, default: false },
    resetTrigger: { type: Number, default: 1e5 },
    aspectRatio: { type: Number, default: 1 },
    backgroundColor: { type: String, default: 'transparent' },
    zoomingElastic: { type: Boolean, default: true },
    limitTranslation: { type: Boolean, default: true },
    disabledZoom: { type: Boolean, default: false },
  },
  data() {
    return {
      containerWidth: 1,
      containerHeight: 1,
      containerLeft: 0,
      containerTop: 0,
      translateX: 0,
      animTranslateX: 0,
      translateY: 0,
      animTranslateY: 0,
      scale: 1,
      animScale: 1,
      // Mouse states
      lastFullWheelTime: 0,
      lastWheelTime: 0,
      lastWheelDirection: 'y',
      isPointerDown: false,
      pointerPosX: -1,
      pointerPosY: -1,
      twoFingerInitDist: 0,
      panLocked: true,
      raf: null,
      tapDetector: null,
    }
  },
  computed: {
    wrapperStyle() {
      let translateX = this.containerWidth * this.animTranslateX
      let translateY = this.containerHeight * this.animTranslateY
      return {
        transform: [
          `translate(${translateX}px, ${translateY}px)`,
          `scale(${this.scale})`,
        ].join(' ')
      }
    },
  },
  watch: {
    scale(val) {
      if (val !== 1) {
        this.panLocked = false
      }
    },
    resetTrigger: 'reset',
  },
  mounted() {
    this.tapDetector = new TapDetector()
    this.tapDetector.attach(this.$el)
    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize()
    this.refreshContainerPos()
    this.loop()
  },
  destroyed() {
    this.tapDetector.detach(this.$el)
    window.removeEventListener('resize', this.onWindowResize)
    window.cancelAnimationFrame(this.raf)
  },
  methods: {

    tryToScale(scaleDelta) {
      let newScale = this.scale * scaleDelta
      if (newScale < this.minScale) newScale = this.minScale
      else if (newScale > this.maxScale) newScale = this.maxScale
      scaleDelta = newScale / this.scale
      this.scale = newScale

      let normMousePosX = (this.pointerPosX - this.containerLeft) / this.containerWidth
      let normMousePosY = (this.pointerPosY - this.containerTop) / this.containerHeight
      this.translateX = (0.5 + this.translateX - normMousePosX) * scaleDelta + normMousePosX - 0.5
      this.translateY = (0.5 + this.translateY - normMousePosY) * scaleDelta + normMousePosY - 0.5
    },
    setPointerPosCenter() {
      this.pointerPosX = this.containerLeft + this.containerWidth / 2
      this.pointerPosY = this.containerTop + this.containerHeight / 2
    },
    // pan
    onPointerMove(newMousePosX, newMousePosY) {
      if (this.isPointerDown) {
        let pixelDeltaX = newMousePosX - this.pointerPosX
        let pixelDeltaY = newMousePosY - this.pointerPosY
        if (!this.panLocked) {
          this.translateX += pixelDeltaX / this.containerWidth
          this.translateY += pixelDeltaY / this.containerHeight
        }
      }
      this.pointerPosX = newMousePosX
      this.pointerPosY = newMousePosY
    },
    onInteractionEnd: _debounce(function () {
      this.limit()
      this.panLocked = this.scale === 1
    }, 100),
    // limit the scale between max and min and the translate within the viewport
    limit() {
      // scale
      if (this.scale < this.minScale) {
        this.scale = this.minScale
      } else if (this.scale > this.maxScale) {
        this.tryToScale(this.maxScale / this.scale)
      }
      // translate
      if (this.limitTranslation) {
        let translateLimit = this.calcTranslateLimit()
        if (translateLimit) {
          this.translateX = Math.min(Math.max(this.translateX, translateLimit.minX), translateLimit.maxX);
          this.translateY = Math.min(Math.max(this.translateY, translateLimit.minY), translateLimit.maxY);
        }
      }
    },
    calcTranslateLimit() {
      const scaledRect = this.$refs.scaleContainer.getBoundingClientRect()
      
      const gapX = scaledRect.width / 10
      const gapY = scaledRect.height / 10
      
      if (this.scale === 1) {
        return 
      }
      return {
        minX: (0 - (scaledRect.width + this.containerWidth) / 2 + gapX) / this.containerWidth,
        maxX: ((scaledRect.width + this.containerWidth) / 2 - gapX) / this.containerWidth,
        minY: (0 - (scaledRect.height + this.containerHeight) / 2 + gapY) / this.containerHeight,
        maxY: ((scaledRect.height + this.containerHeight) / 2 - gapY) / this.containerHeight,
      }
    },
    getMarginDirection () {
      let containerRatio = this.containerWidth / this.containerHeight
      return containerRatio > this.aspectRatio ? 'x' : 'y'
    },
    // reactive
    onWindowResize() {
      const rect = this.$el.getBoundingClientRect()
      this.containerWidth = rect.width
      this.containerHeight = rect.height
      this.setPointerPosCenter()
      this.limit()
    },
    refreshContainerPos() {
      let rect = this.$el.getBoundingClientRect()
      this.containerLeft = rect.left
      this.containerTop = rect.top
    },
    loop() {
      this.animScale = this.gainOn(this.animScale, this.scale)
      this.animTranslateX = this.gainOn(this.animTranslateX, this.translateX)
      this.animTranslateY = this.gainOn(this.animTranslateY, this.translateY)
      this.raf = window.requestAnimationFrame(this.loop)
    },
    gainOn(from, to) {
      let delta = (to - from) * 0.3
      if (Math.abs(delta) > 1e-5) {
        return from + delta
      } else {
        return to
      }
    },
    // Mouse Events ------------------------------------------------------------
    onMouseWheel(ev) {
      ev.preventDefault()
      if (ev.detail) ev.wheelDelta = ev.detail * -10
      let currTime = Date.now()
      if (Math.abs(ev.wheelDelta) === 120) {
        if (currTime - this.lastFullWheelTime > 50) {
          this.onMouseWheelDo(ev.wheelDelta)
          this.lastFullWheelTime = currTime
        }
      } else {
        if (currTime - this.lastWheelTime > 50 && typeof ev.deltaX === 'number') {
          this.lastWheelDirection = (ev.detail == 0 && Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) ? 'x' : 'y'
        }
        if (this.lastWheelDirection === 'y') {
          this.onMouseWheelDo(ev.wheelDelta)
        }
      }
      this.lastWheelTime = currTime
    },
    onMouseWheelDo(wheelDelta) {
      let scaleDelta = Math.pow(1.25, wheelDelta / 120)
      this.tryToScale(scaleDelta)
      this.onInteractionEnd()
    },
    onMouseDown(ev) {
      this.refreshContainerPos()
      this.isPointerDown = true
      this.pointerPosX = ev.clientX
      this.pointerPosY = ev.clientY
      // console.log('onMouseDown', ev)
    },
    onMouseUp(ev) {
      this.isPointerDown = false
      this.onInteractionEnd()
    },
    onMouseMove(ev) {
      this.onPointerMove(ev.clientX, ev.clientY)
    },
    // Touch Events ------------------------------------------------------------
    onTouchStart(ev) {
      if (ev.touches.length === 1) {
        this.refreshContainerPos()
        this.pointerPosX = ev.touches[0].clientX
        this.pointerPosY = ev.touches[0].clientY
        this.isPointerDown = true
      } else if (ev.touches.length === 2) {
        this.isPointerDown = true
        // pos
        this.pointerPosX = (ev.touches[0].clientX + ev.touches[1].clientX) / 2
        this.pointerPosY = (ev.touches[0].clientY + ev.touches[1].clientY) / 2
        // dist
        let distX = ev.touches[0].clientX - ev.touches[1].clientX
        let distY = ev.touches[0].clientY - ev.touches[1].clientY
        this.twoFingerInitDist = Math.sqrt(distX * distX + distY * distY)
      }
      // console.log('onTouchStart', ev.touches)
    },
    onTouchEnd(ev) {
      if (ev.touches.length === 0) {
        this.isPointerDown = false
        // Near 1 to set 1
        if (Math.abs(this.scale - 1) < 0.1) this.scale = 1
        this.onInteractionEnd()
      } else if (ev.touches.length === 1) {
        this.pointerPosX = ev.touches[0].clientX
        this.pointerPosY = ev.touches[0].clientY
      }
      // console.log('onTouchEnd', ev.touches.length)
    },
    onTouchMove(ev) {
      if (ev.touches.length === 1) {
        this.onPointerMove(ev.touches[0].clientX, ev.touches[0].clientY)
      } else if (ev.touches.length === 2) {
        // pos
        let newMousePosX = (ev.touches[0].clientX + ev.touches[1].clientX) / 2
        let newMousePosY = (ev.touches[0].clientY + ev.touches[1].clientY) / 2
        this.onPointerMove(newMousePosX, newMousePosY)
        this.pointerPosX = newMousePosX
        this.pointerPosY = newMousePosY
        // dist
        let distX = ev.touches[0].clientX - ev.touches[1].clientX
        let distY = ev.touches[0].clientY - ev.touches[1].clientY
        let newTwoFingerDist = Math.sqrt(distX * distX + distY * distY)
        this.tryToScale(newTwoFingerDist / this.twoFingerInitDist)
        this.twoFingerInitDist = newTwoFingerDist
      }
    },
  },
}
</script>

<style module>
.zoomer {
  overflow: hidden;
}

.zoomerContent {
  width: 100%;
  height: 100%;
  transform-origin: 50% 50%;
}

</style>