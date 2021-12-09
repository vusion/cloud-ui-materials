import { defineColor } from './colorsname.js';

// rgb色值范围
const RGB_RANGE_REG = /^(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)$/;
// alpha范围
const ALPHA_RANGE_REG = /^(1|1.0?|0|0.[0-9]?[0-9]?)$/;
// 16进制
const HEX_REG = /^#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})$/;
// rgb
const RGB_REG = /^[rR][gG][Bb][\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\s]*,){2}[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\s]*[\)]{1}$/
// rgba
const RGBA_REG = /^[rR][gG][Bb][Aa][\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\s]*,){3}[\s]*(1|1.0?|0|0.[0-9]?[0-9]?)[\s]*[\)]{1}$/;
// hsl
const HSL_REG = /^[hH][Ss][Ll][\(]([\s]*(2[0-9][0-9]|360|3[0-5][0-9]|[01]?[0-9][0-9]?)[\s]*,)([\s]*((100|[0-9][0-9]?)%|0)[\s]*,)([\s]*((100|[0-9][0-9]?)%|0)[\s]*)[\)]$/
// hsla
const HSLA_REG = /^[hH][Ss][Ll][Aa][\(]([\s]*(2[0-9][0-9]|360|3[0-5][0-9]|[01]?[0-9][0-9]?)[\s]*,)([\s]*((100|[0-9][0-9]?)%|0)[\s]*,){2}([\s]*(1|1.0?|0|0.[0-9]?[0-9]?)[\s]*)[\)]$/

function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]';
}

/**
 * 透明度转十六进制
 * @param {*} opacity 
 * @returns 
 */
function opacity2Hex(opacity) {
    if (!ALPHA_RANGE_REG.test(opacity)) {
        throw new SyntaxError('Invalid params');
    }
    const num = Math.round(255 * opacity);
    // 十进制转十六进制，缺位补0
    return num.toString(16).padStart(2, '0');
}

/**
 * 十六进制转透明度
 * @param {*} str 
 * @returns 
 */
function hex2Opacity(str) {
    // 十六进制转十进制
    const num = `0x${str}`.toString(10);
    return +(num / 255).toFixed(2);
}

class Color {
    // r, g, b, a
    constructor(r = 0, g = 0, b = 0, a = 1) {
        if (!RGB_RANGE_REG.test(r) || !RGB_RANGE_REG.test(g) || !RGB_RANGE_REG.test(b) || !ALPHA_RANGE_REG.test(a)) {
            throw new SyntaxError('Invalid params');
        }
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        // 将hsv也缓存下来好了，省事
        /* eslint-disable new-cap */
        Object.assign(this, Color.RGB2HSV(this.r, this.g, this.b));
    }

    toArray() {
        return [this.r, this.g, this.b, this.a];
    }

    toHEX() {
        let opacityStr = ''
        if(!!this.a && this.a !== 1) {
            opacityStr = opacity2Hex(this.a);
        }
        return `#${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}${opacityStr}`;
    }

    getRGB() {
        return { r: this.r, g: this.g, b: this.b };
    }

    setRGBA(r, g, b, a) {
        Object.assign(this, { r, g, b, a }, Color.RGB2HSV(r, g, b));
    }

    setRGB(r, g, b) {
        Object.assign(this, { r, g, b }, Color.RGB2HSV(r, g, b));
    }

    toRGB() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    toRGBA() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    getHSV() {
        /* eslint-disable new-cap */
        return { h: this.h, s: this.s, v: this.v };
    }

    // toHSV()
    // CSS不支持，先不做了。其实就两句话的事

    setHSV(h, s, v) {
        Object.assign(this, { h, s, v }, Color.HSV2RGB(h, s, v));
    }

    getHSL() {
        /* eslint-disable new-cap */
        return Color.HSV2HSL(this.h, this.s, this.v);
    }

    setHSL(h, s, l) {
        //
    }

    toHSL() {
        const hsl = this.getHSL();
        if (!hsl) {
            throw new SyntaxError('Invalid: something error');
        }
        return `hsl(${hsl.h}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`;
    }

    toHSLA() {
        const hsl = this.getHSL();
        if (!hsl) {
            throw new SyntaxError('Invalid: something error');
        }
        return `hsl(${hsl.h}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%, ${this.a})`;
    }

    static fromHEX(value) {
        if (!value) {
            return new Color();
        }
        // 不符合16进制规则
        if (!HEX_REG.test(value)) {
            throw new SyntaxError('Unexpected params of hex function');
        }
        value = value.trim().slice(1);
        // 3位或者4位都将位数补齐
        if (value.length === 3 || value.length === 4) {
            const arr = Array.from(value)
            value = arr.reduce((prev, cur) => {
                return `${prev}${cur}${cur}`;
            }, '')
        }
        let alphaStr = ''
        // 8位表示有透明度
        if (value.length === 8) {
            alphaStr = value.substr(value.length - 2, 2);
            value = value.slice(0, -2);
        }
        return new Color(
            parseInt(value.slice(0, 2), 16),
            parseInt(value.slice(2, 4), 16),
            parseInt(value.slice(4, 6), 16),
            alphaStr ? hex2Opacity(alphaStr) : 1
        );
    }

    static fromRGB(value) {
        if (!value) {
            return new Color();
        }
        // 不符合16进制规则
        if (!RGB_REG.test(value)) {
            throw new SyntaxError('Unexpected params of rgb function');
        }
        value = value.trim().slice(4, -1);
        const arr = value.split(',').map((num) => +num);
        return new Color(...arr);
    }

    static fromRGBA(value) {
        if (!value) {
            return new Color();
        }
        // 不符合16进制规则
        if (!RGBA_REG.test(value)) {
            throw new SyntaxError('Unexpected params of rgba function');
        }
        value = value.trim().slice(5, -1);
        const arr = value.split(',').map((num) => +num);
        return new Color(...arr);
    }

    static fromNAME(value) {
        // value不存在的情况下返回默认color实例
        if (!value) {
            return new Color();
        }
        if (!isString(value)) {
            throw new SyntaxError('Invalid: params should be a string');
        }
        value = defineColor[value];
        if (!value) {
            throw new SyntaxError('Invalid params');
        }
        // 调用16进制
        return this.fromHEX(value)
    }

    /** @TODO: fromHSL */
    static parse(value) {
        // value不存在的情况下返回默认color实例
        if (!value) {
            return new Color();
        }
        if (!isString(value)) {
            throw new SyntaxError('Invalid: params should be a string');
        }
        // 颜色类型
        const colorType = this.checkFormat(value)
        if (!colorType) { // 不属于16进制/rgb(a)/hsl(a)/内置颜色
            throw new SyntaxError('Invalid params');
        }
        return Color[`from${colorType}`](value);
    }

    static checkFormat(value) {
        if (!isString(value)) {
            throw new SyntaxError('Invalid: params should be a string');
        }
        value = value.trim();
        if (HEX_REG.test(value))
            return 'HEX';
        else if (RGB_REG.test(value))
            return 'RGB';
        else if (RGBA_REG.test(value))
            return 'RGBA';
        else if (HSL_REG.test(value))
            return 'HSL';
        else if (HSLA_REG.test(value))
            return 'HSLA';
        else if (defineColor[value])
            return 'NAME';
    }

    /**
     * Converts an RGB color value to HSV. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
     *
     * @param   Number  r       The red, [0, 255]
     * @param   Number  g       The green, [0, 255]
     * @param   Number  b       The blue, [0, 255]
     * @return  Object          The HSV representation
     */
    static RGB2HSV(r = 0, g = 0, b = 0) {
        if (!RGB_RANGE_REG.test(r) || !RGB_RANGE_REG.test(g) || !RGB_RANGE_REG.test(b)) {
            throw new SyntaxError('Invalid params');
        }
        r = r / 255;
        g = g / 255;
        b = b / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        let h;
        const v = max;
        const d = max - min;
        const s = max === 0 ? 0 : d / max;

        if (max === min)
            h = 0; // achromatic
        else {
            if (max === r)
                h = (g - b) / d + (g < b ? 6 : 0);
            else if (max === g)
                h = (b - r) / d + 2;
            else if (max === b)
                h = (r - g) / d + 4;
            h /= 6;
        }

        return { h: h * 360 >> 0, s: s * 100 >> 0, v: v * 100 >> 0 };
    }

    /**
     * Converts an HSV color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
     * returns r, g, and b in the set [0, 255].
     *
     * @param   Number  h       The hue, [0, 360]
     * @param   Number  s       The saturation, [0, 100]
     * @param   Number  v       The value, [0, 100]
     * @return  Object          The RGB representation
     */
    static HSV2RGB(h, s, v) {
        h = h / 360;
        s = s / 100;
        v = v / 100;

        let r;
        let g;
        let b;

        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);

        /* eslint-disable chai-friendly/no-unused-expressions, no-sequences */
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        return { r: r * 255 >> 0, g: g * 255 >> 0, b: b * 255 >> 0 };
    }

    static HSV2HSL(h, s, v) {
        return {
            h,
            s: (s * v / ((h = (2 - s) * v) < 1 ? h : 2 - h)) >> 0 || 0,
            l: h / 2 >> 0,
        };
    }

    static HSL2HSV(h, s, l) {
        s = s / 100;
        l = l / 100;
        let smin = s;
        const lmin = Math.max(l, 0.01);

        l *= 2;
        s *= (l <= 1) ? l : 2 - l;
        smin *= lmin <= 1 ? lmin : 2 - lmin;
        const v = (l + s) / 2;
        const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

        return {
            h,
            s: sv * 100 >> 0,
            v: v * 100 >> 0,
        };
    }
}

Color.TYPES = ['HEX', 'RGBA', 'RGB', 'HSLA', 'HSL', 'HSVA', 'HSV', 'NAME'];

export default Color;
