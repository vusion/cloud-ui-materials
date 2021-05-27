import Color from 'color';

export default {
    props: {
        color1: String,
        color2: String,
        steps: { type: Number, default: 1 },
        reverse: { type: Boolean, default: false },
    },
    data() {
        return {
            colors: [],
        };
    },
    created() {
        const color1 = new Color(this.color1).hsl();
        const color2 = new Color(this.color2).hsl();

        this.colors.push(color1.hex().toLowerCase());
        const steps = this.steps;

        if (color2.color[2] === 0 && !this.color2.includes('hsl')) {
            color2.color[0] = color1.color[0];
            color2.color[1] = color1.color[1];
        }
        if (color2.color[2] === 100 && !this.color2.includes('hsl')) {
            color2.color[0] = color1.color[0];
            color2.color[1] = color1.color[1];
        }
        for (let i = 1; i <= steps; i++) {
            const h = (color1.color[0] + i / steps * (color2.color[0] - color1.color[0] - (this.reverse ? 360 : 0))) % 360;
            const s = color1.color[1] + i / steps * (color2.color[1] - color1.color[1]);
            const l = color1.color[2] + i / steps * (color2.color[2] - color1.color[2]);
            this.colors.push(Color.hsl(h, s, l).hex().toLowerCase());
        }
    },
};
