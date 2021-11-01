<template>
    <div ref="container" v-on="$listeners" :class="[$style.root, $style.container, position === 'left' ? $style.posHideLeft : $style.posHideRight]" :style="showOrHideStyle">
        <div :class="[$style.showButton, position === 'left' ? $style.leftButton : $style.rightButton]" vusion-click-enabled @click.stop="toggle">{{buttonShowText}}</div>
        <div :class="$style.content" vusion-slot-name="default" :vusion-scope-id="$parent.$parent.$options._scopeId">
            <slot></slot>
            <s-empty v-if="(!$slots.default) && $env.VUE_APP_DESIGNER"></s-empty>
        </div>
    </div>
</template>

<script>
import SEmpty from './s-empty';
export default {
    name: 'u-sider-modal',
    components:{
        SEmpty
    },
    props: {
        position: {
            type: String,
            default: 'right',
            validator: (value) => {
                return [
                        'left',
                        'right',
                    ].includes(value);
            }
        },
        positionY: {
            type: String,
            default: '',
        },
        buttonPosY: {
           type: String,
            default: '', 
        },
        toggleShow: {
            type: Boolean,
            default: false
        },
        buttonText: {
            type: String,
            default: '侧边栏弹窗'
        }
    },
    data() {
        return {
            isShow: false,
            showOrHideStyle: "",
            currentWidth: 0,
            buttonShowText: this.buttonText
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.updateView();
            // 监听内容区dom元素的宽度变化，自适应定位的偏移量
            let resizeObserver = new ResizeObserver(() => {
                this.updateView();
            })
            resizeObserver.observe(this.$refs.container);
        });
    },
    methods: {
        toggle(changeType) {
            if (changeType !== 'changePos') {
                this.isShow = !this.isShow;
                if (this.isShow) {
                    this.$emit('before-open');
                } else {
                    this.$emit('before-close');
                }
            }
            this.changePosition();
        },
        updateView() {
            if (this.$refs.container) {
                this.currentWidth = window.getComputedStyle(this.$refs.container).width;
            }
            this.changePosition();
        },
        changePosition() {
            this.showOrHideStyle = "top: " + this.positionY + "px;";
            if (this.position === 'left') {
                let leftButton = this.$refs.container.querySelector("[class*=u-sider-modal_leftButton]");
                if (this.isShow) {
                    this.delayAnimation("left: 0;", 0);
                    if (leftButton) {
                        leftButton.setAttribute('data-arrow-transform', 'true');
                    }
                } else {
                    this.delayAnimation("left: -" + this.currentWidth + ";", 0);
                    if (leftButton) {
                        leftButton.setAttribute('data-arrow-transform', 'false');
                    }
                }
            } else if (this.position === 'right') {
                let rightButton = this.$refs.container.querySelector("[class*=u-sider-modal_rightButton]")
                if (this.isShow) {
                    this.delayAnimation("right: 0;", 0);
                    if (rightButton) {
                        rightButton.setAttribute('data-arrow-transform', 'true');
                    }
                } else {
                    this.delayAnimation("right: -" + this.currentWidth + ";", 0);
                    if (rightButton) {
                        rightButton.setAttribute('data-arrow-transform', 'false');
                    }
                }
            }
        },
        delayAnimation(content, delayTime) {
            setTimeout(() => {
                this.showOrHideStyle += content;
                if (this.isShow) {
                    this.$emit('open');
                } else {
                    this.$emit('close');
                }
            }, delayTime);
        },
        // designerControl($event) {
        //     this.toggle();
        // }
    },
    watch: {
        position(value) {
            this.toggle("changePos");
        },
        toggleShow(value) {
            this.toggle();
        },
        positionY(value) {
            this.toggle("changePos");
        },
        buttonText(value) {
            this.buttonShowText = value;
        }
    }
};
</script>

<style module>
.root {
}

.container {
    position: fixed;
    top: 0;
    min-width: 400px;
    box-sizing: border-box;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    padding: 20px;
    background: white;
    z-index: 9999;
}

.content {
    min-height: 600px;
    height: 100%;
    overflow: auto;
}

.posHideLeft {
    left: -400px;
    transition: left 0.3s linear;
}

.posHideRight {
    right: -400px;
    transition: right 0.3s linear;
}

.showButton {
    position: absolute;
    left: -46px;
    top: 50%;
    transform: translateY(-50%);
    
    border-radius: 4px;
    width: 46px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.08);
    background: #FFFFFF;
    color: #666;
    
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    cursor: pointer;
}

.showButton::before {
    display: block;
    content: '';
    background-image: url('./image/arrow.svg');
    background-size: 8px;
    width: 8px;
    height: 8px;
    position: absolute;
    top: calc(50% - 4px);
}

.showButton:hover {
    color: #337EFF;
}

.showButton:hover::before {
    background-image: url('./image/arrow-hover.svg');
}

.leftButton {
    left: calc(100%);
    padding: 12px 20px 12px 12px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.leftButton::before {
    right: 6px;
    transform: rotate(180deg);
}

.leftButton[data-arrow-transform='true']::before {
    transform: rotate(360deg);
}

.rightButton {
    right: calc(100%);
    padding: 12px 12px 12px 20px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.rightButton::before {
    left: 6px;
}

.rightButton[data-arrow-transform='true']::before {
    transform: rotate(180deg);
}
</style>
