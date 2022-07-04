<template>
<div :class="$style.root" ref="outBox" v-if="running">
    <div
        :class="$style.textBox"
        ref="box"
        @mouseenter="mouseenter"
        @mouseleave="mouseleave"
    >
        <span
            v-for="(item, i) in dataList"
            @click="handleClick(item, i)"
            :key="i"
            :style="{ paddingRight: gap + 'px' }"
        >{{ item }}</span
        >
    </div>
</div>
</template>
<script>
export default {
    name: 'lcap-carousel',
    props: {
        // 传递过来的字符串数组
        dataSource: {
            type: [Function, Array, Object],
            default: () => [],
        },
        // 播放速度
        speed: {
            type: Number,
            default: 30,
        },
        // 每次移动的像素 太大会导致 "很卡" 的视觉效果
        movePx: {
            type: Number,
            default: 2,
        },
        // 两个文本之间的间距
        gap: {
            type: Number,
            default: 10,
        },
        // 每次元素停留显示的时间
        waitTime: {
            type: Number,
            default: 0,
        },
        // 是否鼠标放上去后停止移动
        hoverStop: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            timer: null,
            x: 0,
            isScrolling: true,
            index: 0,
            childWidth: 0,
            running: false,
            dataList: [],
        };
    },
    watch: {
        dataSource: {
            async handler(val) {
                let dataList = await this.handleDataSource(val);
                if (!Array.isArray(dataList)) {
                    console.error(`[lcap-carousel] Please confirm the final result is an array in 'data-source' prop.`);
                    dataList = [];
                }
                if (dataList.length > 0) {
                    this.dataList = dataList;
                    this.run();
                }
            },
            immediate: true,
        },
    },
    beforeDestroy() {
        // 组件销毁时 清除定时器
        clearInterval(this.timer);
    },
    methods: {
        run() {
            this.running = true;
            this.$nextTick(() => {
                this.renderDom();
            });
        },
        renderDom() {
            // 获取外面盒子的Dom元素
            const outBox = this.$refs.outBox;
            // 获取里面面盒子的Dom元素
            const box = this.$refs.box;
            const outWidth = outBox.offsetWidth;
            // 设置起始播放的位置 父盒子的最右侧出现
            const startX = outWidth;
            box.style.transform = `translateX(${startX}px)`;
            this.x = startX;
            // 获取第一个子元素的宽度
            this.childWidth = [...box.childNodes][this.index].offsetWidth;
            // 获取子元素的总宽度
            this.timer = setInterval(() => {
                if (!this.isScrolling)
                    return;
                const box = this.$refs.box;
                if (!box) {
                    return;
                }
                const childNodes = [...box.childNodes];
                const totalChildWidth = childNodes.reduce(
                    (pre, cur) => pre + cur.offsetWidth,
                    0,
                );
                box.style.transform = `translateX(${this.x}px)`;
                this.x -= this.movePx;
                if (-this.x >= totalChildWidth) {
                    // 播放完之后就重新开始播放
                    this.x = startX;
                    this.index = 0;
                    this.childWidth = childNodes[this.index].offsetWidth;
                    return;
                }
                if (-this.x >= this.childWidth && this.waitTime) {
                    // 如果过了第index个元素 开始等待
                    this.index++;
                    this.childWidth += childNodes[this.index].offsetWidth;
                    this.isScrolling = false;
                    setTimeout(() => {
                        this.isScrolling = true;
                    }, this.waitTime);
                }
            }, this.speed);
        },
        /**
         * @descript 鼠标放上去触发
         */
        mouseenter() {
            if (!this.hoverStop)
                return;
            this.isScrolling = false;
        },
        /**
         * @descript 鼠标离开触发
         */
        mouseleave() {
            this.isScrolling = true;
        },
        handleClick(item, index) {
            this.$emit('click', item, index);
        },
        async handleDataSource(dataSource) {
            if (!dataSource) {
                return [];
            }
            if (dataSource instanceof Promise || typeof dataSource === 'function') {
                const result = await dataSource(this.page);
                return this.getData(result);
            }
            return this.getData(dataSource);
        },
        isDataSource(data) {
            return Object.prototype.toString.call(data) === '[object Object]' && data.content;
        },
        getData(dataSource) {
            if (Array.isArray(dataSource)) {
                return dataSource;
            } else if (this.isDataSource(dataSource)) {
                return dataSource.content;
            }
            return [];
        },
        async reload() {
            let dataList = await this.handleDataSource(this.dataSource);
            if (!Array.isArray(dataList)) {
                console.error(`[lcap-carousel] Please confirm the final result is an array in 'data-source' prop.`);
                dataList = [];
            }
            if (dataList.length > 0) {
                this.dataList = dataList;
            }
        },
    },
};
</script>
<style module>
.root {
    width: 100%;
    overflow: hidden;
}

.root .textBox {
    white-space: nowrap;
}

.root .textBox span:hover {
    cursor: pointer;
    text-decoration: underline;
    color: var(--brand-primary);
}
</style>
