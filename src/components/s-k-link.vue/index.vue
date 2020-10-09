<template>
    <u-link :to="to" :href="href" :class="$style.root">
        <div :class="$style.tl"></div>
        <div :class="$style.tr"></div>
        <div :class="$style.rt"></div>
        <div :class="$style.rb"></div>
        <div :class="$style.bb"></div>
        <div :class="$style.wrapper" :style="cStyle">
            <svg :class="$style.icon" aria-hidden="true">
                <use :xlink:href="`#icon-${type}`"></use>
            </svg>
        </div>
        <u-text>{{ cText }}</u-text>
    </u-link>
</template>

<script>
import './iconfont.js';

export default {
    name: 's-k-link',
    props: {
        type: {
            type: String,
            default: 'index',
        },
        text: {
            type: String,
            default: undefined,
        },
        color: {
            type: String,
            default: undefined,
        },
        href: {
            type: String,
            default: undefined,
        },
        to: {
            type: String,
            default: undefined,
        },
    },
    computed: {
        cStyle() {
            const bgColorMap = {
                index: '#0000cd',
                video: '#2e8b57',
                device: '#a52a2a',
                list: '#744a6e',
            };
            const bgColor = this.color || bgColorMap[this.type] || '#0000cd';
            return {
                'background-color': bgColor,
            };
        },
        cText() {
            const cextMap = {
                index: '首页',
                video: '视频监控',
                device: '设备列表',
                list: '待办已办',
            };
            return this.text || cextMap[this.type] || '-';
        },
    },
};
</script>

<style module>
.root {
    --dashboard-link-gb-color: rgba(0, 191, 255, 0.6);
    --dashboard-link-gb--hover-color: rgba(0, 191, 255, 0.8);
    width: 200px;
    height: 200px;
    position: relative;
    background: var(--dashboard-link-gb-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-size: 22px;
}

.tl {
    position: absolute;
    top: -10px;
    left: 0px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid var(--dashboard-link-gb-color);
    height: 0;
    width: 60px;
}

.tr {
    position: absolute;
    top: -10px;
    right: 0px;
    border-left: 10px solid transparent;
    border-bottom: 10px solid var(--dashboard-link-gb-color);
    height: 0;
    width: 60px;
}

.rt {
    position: absolute;
    top: -10px;
    right: -10px;
    border-left: 10px solid var(--dashboard-link-gb-color);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    width: 0;
    height: 50px;
}

.rb {
    position: absolute;
    right: -10px;
    bottom: 0;
    border-left: 10px solid var(--dashboard-link-gb-color);
    border-top: 10px solid transparent;
    width: 0;
    height: 50px;
}

.bb {
    position: absolute;
    left: 0;
    bottom: -10px;
    border-top: 10px solid var(--dashboard-link-gb-color);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    width: calc(100% + 10px);
    height: 0;
}

.root,
.root:link,
.root:active,
.root:hover,
.root:visited {
    text-decoration: none;
    color: #fff;
}

.root:hover {
    background-color: var(--dashboard-link-gb--hover-color);
    font-weight: bold;
}
.root:hover .tl,
.root:hover .tr {
    border-bottom-color: var(--dashboard-link-gb--hover-color);
}
.root:hover .rt,
.root:hover .rb {
    border-left-color: var(--dashboard-link-gb--hover-color);
}
.root:hover .bb {
    border-top-color: var(--dashboard-link-gb--hover-color);
}


.wrapper {
    font-size: 45px;
    width: 90px;
    height: 90px;
    border-radius: 100%;
    line-height: 90px;
    text-align: center;
    margin: 20px 0 10px 0;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
