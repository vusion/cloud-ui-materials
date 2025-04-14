<template>
    <transition name="fade">
        <div :class="$style.root" ref="poppercontent" v-show="meta.active">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
import { createPopper } from '@popperjs/core';
function generateGetBoundingClientRect(x = 0, y = 0) {
    return () => ({
        width: 0,
        height: 0,
        top: y,
        right: x,
        bottom: y,
        left: x,
    });
}

export default {
    props: {
        meta: Object,
    },
    watch: {
        meta: {
            handler(val) {
                if (val.active) {
                    if (this.popperJS) {
                        this.setVirtureBox();
                        this.popperJS.setOptions((options) => ({
                            ...options,
                        }));
                    }

                    this.updatePopper();
                } else {
                    if (this.popperJS) {
                        this.popperJS.setOptions((options) => ({
                            ...options,
                        }));
                    }
                }
            },
            deep: true,
        },
    },
    mounted() {
        this.setVirtureBox();
        document.body.appendChild(this.$refs.poppercontent);
    },
    beforeDestroy() {
        document.body.removeChild(this.$refs.poppercontent);
    },
    methods: {
        setVirtureBox() {
            if (!this.virtualElement) {
                this.virtualElement = {
                    contextElement: document.body,
                };
            }
            this.virtualElement.getBoundingClientRect = generateGetBoundingClientRect(this.meta.clientX, this.meta.clientY);
        },
        mountPopper() {
            this.$nextTick(() => {
                if (this.popperJS && this.popperJS.destroy) {
                    this.popperJS.destroy();
                }
                this.setVirtureBox();
                this.popperJS = createPopper(this.virtualElement, this.$refs.poppercontent, {
                    placement: 'right-start',
                    modifiers: [
                        {
                            name: 'flip',
                            options: {
                                padding: 8,
                            },
                        },
                        {
                            name: 'preventOverflow',
                            options: {
                                mainAxis: false,
                            },
                        },
                    ],
                    onCreate() {
                        this.$nextTick(this.updatePopper);
                    },
                });
            });
        },
        updatePopper() {
            this.popperJS ? this.popperJS.update() : this.mountPopper();
        },
    },
};
</script>

<style module>
.root {
    z-index: 9999;
    background-color: #ffffff;
    position: relative;
    box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08);
}

</style>
