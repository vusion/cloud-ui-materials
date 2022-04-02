<template>
    <div :class="$style.root">
        <!-- 方形拖拉选择区 -->
        <f-dragger immediate range="offset-parent" range-mode="center" 
            :disabled="readonly || disabled"
            :transfer="handleEl"
            @dragstart="onDrag($event), onChange()"
            @drag="onDrag($event), onChange()">
            <div :class="$style.sv"
                :style="{
                    background: hueColor.toRGB()
                }">
                <div ref="handle" :class="$style.handle"></div>
            </div>
        </f-dragger>
        <div :class="$style.bar">
            <!-- 条形拖拉选择区 -->
            <div :class="$style.sliders">
                <!-- 颜色选择 -->
                <u-pallette-slider :min="0"
                    :max="360"
                    :value="color.h"
                    :style="{
                        background: `linear-gradient(to right, red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)` 
                    }"
                    @input="onSetHue($event), onChange()">
                </u-pallette-slider>
                <!-- 透明度选择 -->
                <u-pallette-slider :min="0"
                    :max="1"
                    :step="0.01"
                    :precision="0.01"
                    :value="color.a"
                    :style="{
                        background: `linear-gradient(to right, ${`rgba(${color.r}, ${color.g}, ${color.b}, 0)` }, ${color.toRGB()})`
                    }"
                    @input="onSetRGBA('a', $event), onChange()">
                </u-pallette-slider>
            </div>
            <!-- 展示区 -->
            <div :class="$style.color" :style="{
                backgroundColor: color.toRGBA()
            }">
            </div>
        </div>
        <div :class="$style.items">
            <!-- 16进制 -->
            <div :class="$style.item">
                <u-input size="mini" role="hex"
                    :class="$style.input"
                    :value="color.toHEX()"
                    @input="onSetHEX($event)"
                    @blur="onChange()">
                </u-input>
                <div :class="$style['item-label']">Hex</div>
            </div>
            <!-- r -->
            <div :class="$style.item">
                <u-number-input size="mini" hide-buttons
                    :class="$style.input"
                    :min="0"
                    :max="255"
                    :value="color.r"
                    @input="onSetRGBA('r', $event)"
                    @blur="onChange()">
                </u-number-input>
                <div :class="$style['item-label']">R</div>
            </div>
            <!-- g -->
            <div :class="$style.item">
                <u-number-input size="mini" hide-buttons
                    :class="$style.input"
                    :min="0"
                    :max="255"
                    :value="color.g"
                    @input="onSetRGBA('g', $event)"
                    @blur="onChange()">
                </u-number-input>
                <div :class="$style['item-label']">G</div>
            </div>
            <!-- b -->
            <div :class="$style.item">
                <u-number-input size="mini" hide-buttons
                    :class="$style.input"
                    :min="0"
                    :max="255"
                    :value="color.b"
                    @input="onSetRGBA('b', $event)"
                    @blur="onChange()">
                </u-number-input>
                <div :class="$style['item-label']">B</div>
            </div>
            <!-- a -->
            <div :class="$style.item">
                <u-number-input size="mini" hide-buttons
                    :value="color.a"
                    :class="$style.input"
                    :min="0"
                    :max="1"
                    :step="0.1"
                    :precision="0.01"
                    @input="onSetRGBA('a', $event)"
                    @blur="onChange()">
                </u-number-input>
                <div :class="$style['item-label']">A</div>
            </div>
        </div>
    </div>
</template>

<script>
import { MField } from 'cloud-ui.vusion';
import Color from './Color';

export default {
    name: 'u-pallette',
    mixins: [MField],
    props: {
        value: { type: String, default: '#000000' },
        // @TODO:
        format: { type: String, default: 'hex,rgba', validator: (value) => [
            'name,hex,rgba',
            'name,hex,hsla',
            'hex,rgba',
            'hex,hsla',
            'rgba',
            'hsla',
        ].includes(value.toLowerCase()) },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    data() {
        return {
            color: Color.str2Color(this.value),
            grid: {
                x: 1,
                y: 1
            },
            handleEl: undefined,
            tempColor: Color.str2Color(this.value),
        };
    },
    computed: {
        hueColor() {
            const color = new Color();
            color.setHSV(this.color.h, 100, 100);
            return color;
        },
    },
    watch: {
        value(value) {
            const color = Color.str2Color(value);
            if (color.toRGBA() === this.color.toRGBA())
                return;
            this.color = Color.str2Color(value);
            this.tempColor = Color.str2Color(value);
            this.handleEl.style.left = color.s + '%';
            this.handleEl.style.top = (100 - color.v) + '%';
        },
    },
    mounted() {
        this.handleEl = this.$refs.handle;
        this.handleEl.style.left = this.color.s + '%';
        this.handleEl.style.top = (100 - this.color.v) + '%';
    },
    methods: {
        onDrag($event) {
            const { range, top, left } = $event || {};
            const { width, height } = range || {};
            const { h } = this.tempColor || {};
            this.tempColor.setHSV(h, left / width * 100, (1 - top / height) * 100);
        },
        onSetHue(hue) {
            const { s, v } = this.tempColor || {};
            this.tempColor.setHSV(hue, s, v);
        },
        onSetHEX(hex) {
            let color = null;
            try{
                color = Color.fromHEX(hex);
            } catch(e) {
                console.warn(e);
            }
            color = color || new Color();
            const { r, g, b, a } = color;
            this.tempColor.setRGBA(r, g, b, a);
        },
        onSetRGBA(type, value) {
            this.tempColor[type] = value;
        },
        onChange() {
            const { r, g, b, a } = this.tempColor;
            this.color.setRGBA(r, g, b, a);
            const value = this.color.toHEX();
            this.$emit('input', value);
            this.$emit('update:value', value);
        },
    },
};
</script>

<style module>
:root {
    --sv_button-size: 10px;
}

.root {
    display: inline-block;
    border: 1px solid var(--border-color-base);
    padding: 8px;
    border-radius: 4px;
    font-size: var(--font-size-small, 12px);
}

.sv {
    position: relative;
    overflow: hidden;
    background: #f09;
    width: 200px;
    height: 150px;
    border-radius: 2px;
}

.sv:before, .sv:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.sv:before {
    background: linear-gradient(to right, white, rgba(255, 255, 255, 0));
}

.sv:after {
    background: linear-gradient(to top, black, rgba(0, 0, 0, 0));
    box-shadow: inset 0px 0px 2px rgba(0,0,0,0.5);
}

.handle {
    position: absolute;
    z-index: 5;
    margin-left: calc(var(--sv_button-size) / (-2));
    margin-top: calc(var(--sv_button-size) / (-2));
    width: var(--sv_button-size);
    height: var(--sv_button-size);
    border: 1px solid white;
    border-radius: 100%;
    box-shadow: 0 0 1px rgba(0, 0, 0, .5), inset 0 0 1px rgba(0, 0, 0, .5);
}

.bar {
    margin-top: 4px;
}

.sliders {
    display: inline-block;
    width: 172px;
    margin-right: 4px;
}

.sliders > * + * {
    margin-top: 4px;
}

.color {
    display: inline-block;
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 2px;
    box-shadow: inset 0px 0px 2px rgba(0,0,0,0.5);
}

.color:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url('./assets/transparent.png');
}

.items {
    white-space: nowrap;
}

.item {
    float: left;
}

.item + .item {
    margin-left: 6px;
}

.input[class] {
    width: 30px;
    height: 24px;
    padding: 0 3px;
    padding-right: 0;
}

.input[class][role="hex"] {
    margin-left: 0;
    width: 56px;
}

.item-label {
    margin-top: 2px;
    text-align: center;
    line-height: 1;
}
</style>
