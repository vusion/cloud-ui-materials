import { defineColor } from './colorsname.js';

class Color {
    // r, g, b, a
    constructor(r = 0, g = 0, b = 0, a = 1) {
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

    // toString() {
    //     Just use default
    // }

    toHEX(alpha) {
        const fix = (num) => (num.length === 1 ? '0' + num : num).toUpperCase();

        return '#' + fix(this.r.toString(16)) + fix(this.g.toString(16)) + fix(this.b.toString(16));
    }

    getRGB() {
        return { r: this.r, g: this.g, b: this.b };
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
        // return Color.RGB2HSV(this.r, this.g, this.b);
        return { h: this.h, s: this.s, v: this.v };
    }

    // toHSV()
    // CSS不支持，先不做了。其实就两句话的事

    setHSV(h, s, v) {
        Object.assign(this, { h, s, v }, Color.HSV2RGB(h, s, v));
    }

    getHSL() {
        /* eslint-disable new-cap */
        // const hsv = Color.RGB2HSV(this.r, this.g, this.b);
        return Color.HSV2HSL(this.h, this.s, this.v);
    }

    setHSL(h, s, l) {
        //
    }

    toHSL() {
        const hsl = this.getHSL();
        return `hsl(${hsl.h}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`;
    }

    toHSLA() {
        const hsl = this.getHSL();
        return `hsl(${hsl.h}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%, ${this.a})`;
    }

    static fromHEX(value) {
        value = value.trim().slice(1);
        if (value.length !== 6 && value.length !== 3)
            throw new SyntaxError('Unexpected length of hex number');
        else if (value.length === 3)
            value = `${value[0]}${value[0]}${value[1]}${value[1]}${value[2]}${value[2]}`;

        return new Color(
            parseInt(value.slice(0, 2), 16),
            parseInt(value.slice(2, 4), 16),
            parseInt(value.slice(4, 6), 16),
        );
    }

    static fromRGB(value) {
        value = value.trim().slice(4, -1);
        const arr = value.split(',').map((num) => +num);
        if (arr.length !== 4)
            throw new SyntaxError('Unexpected params of rgba function');

        return new Color(...arr);
    }

    static fromRGBA(value) {
        value = value.trim().slice(5, -1);
        const arr = value.split(',').map((num) => +num);
        if (arr.length !== 4)
            throw new SyntaxError('Unexpected params of rgba function');

        return new Color(...arr);
    }

    static fromNAME(value) {
        value = defineColor[value];
        value = value.trim().slice(1);
        if (value.length !== 6 && value.length !== 3) {
            throw new SyntaxError('Unexpected params of name function');
        } else if (value.length === 3) {
            value = `${value[0]}${value[0]}${value[1]}${value[1]}${value[2]}${value[2]}`;
        }

        return new Color(
            parseInt(value.slice(0, 2), 16),
            parseInt(value.slice(2, 4), 16),
            parseInt(value.slice(4, 6), 16),
        );
    }

    /** @TODO: fromHSL */
    static parse(value) {
        value = value.trim();
        return Color['from' + this.checkFormat(value)](value);
    }

    static checkFormat(value) {
        if (value[0] === '#')
            return 'HEX';
        else if (value.startsWith('rgba('))
            return 'RGBA';
        else if (value.startsWith('rgb('))
            return 'RGB';
        else if (value.startsWith('hsla('))
            return 'HSLA';
        else if (value.startsWith('hsl('))
            return 'HSL';
        else
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
    static RGB2HSV(r, g, b) {
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
