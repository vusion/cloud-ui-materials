<template>
<div :class="$style.root">
    <f-dragger :disabled="readonly || disabled" :transfer="handleEl" immediate
        range="offset-parent" range-mode="center"
        @dragstart="onDrag($event)"
        @drag="onDrag($event)">
        <div :class="$style.sv" :style="{ background: hueColor.toRGB() }">
            <div ref="handle" :class="$style.handle"></div>
        </div>
    </f-dragger>
    <div :class="$style.bar">
        <div :class="$style.sliders">
            <u-pallette-slider :min="0" :max="360" :value="color.h" @input="setHue($event), onInput()"
                :style="{ background: `linear-gradient(to right, red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)` }"
            ></u-pallette-slider>
            <u-pallette-slider :min="0" :max="1" :step="0.01" :precision="0.01" v-model="color.a" @input="onInput()"
                :style="{ background: `linear-gradient(to right, ${`rgba(${color.r}, ${color.g}, ${color.b}, 0)` }, ${color.toRGB()})` }"
            ></u-pallette-slider>
        </div>
        <div :class="$style.color" :style="{ backgroundColor: color.toRGBA() }"></div>
    </div>
    <div :class="$style.items">
        <div :class="$style.item">
            <u-input size="mini" :class="$style.input" role="hex" :value="color.toHEX()" @input="setHEX($event), onInput()"></u-input>
            <div :class="$style['item-label']">Hex</div>
        </div>
        <div :class="$style.item">
            <u-number-input size="mini" :class="$style.input" hide-buttons :min="0" :max="255"
                :value="color.r" @input="color.setRGB($event, color.g, color.b), onInput()">
            </u-number-input>
            <div :class="$style['item-label']">R</div>
        </div>
        <div :class="$style.item">
            <u-number-input size="mini" :class="$style.input" hide-buttons :min="0" :max="255"
                :value="color.g" @input="color.setRGB(color.r, $event, color.b), onInput()">
            </u-number-input>
            <div :class="$style['item-label']">G</div>
        </div>
        <div :class="$style.item">
            <u-number-input size="mini" :class="$style.input" hide-buttons :min="0" :max="255"
                :value="color.b" @input="color.setRGB(color.r, color.g, $event), onInput()">
            </u-number-input>
            <div :class="$style['item-label']">B</div>
        </div>
        <div :class="$style.item">
            <u-number-input size="mini" :class="$style.input" hide-buttons :min="0" :max="1" :step="0.1" :precision="0.01" v-model="color.a" @input="onInput()"></u-number-input>
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
            grid: { x: 1, y: 1 },
            handleEl: undefined,
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
        value(value, oldValue) {
            const color = Color.str2Color(value);
            if (color.toRGBA() === this.color.toRGBA())
                return;

            this.color = color;
            this.handleEl.style.left = this.color.s + '%';
            this.handleEl.style.top = (100 - this.color.v) + '%';
        },
    },
    mounted() {
        this.handleEl = this.$refs.handle;
        this.handleEl.style.left = this.color.s + '%';
        this.handleEl.style.top = (100 - this.color.v) + '%';
    },
    methods: {
        onDrag($event) {
            this.color.setHSV(this.color.h, $event.left / $event.range.width * 100, (1 - $event.top / $event.range.height) * 100);
            this.onInput();
        },
        setHEX(hex) {
            let color = null
            try{
                color = Color.fromHEX(hex);
            } catch(e) {
                console.warn(e)
            }
            color = color || new Color();
            this.color.setRGBA(color.r, color.g, color.b, color.a);
        },
        setHue(hue) {
            this.color.setHSV(hue, this.color.s, this.color.v);
        },
        onInput() {
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
