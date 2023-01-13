<template>
<a :class="$style.root" @click="toDest" :href="currentHref" :target="target">
    <van-icon name="location" :class="$style.vaniconv"></van-icon>
    <span :class="$style.label">{{ label }}</span>
</a>
</template>

<script>
import '@lcap/mobile-ui/lib/index.css';
import Iconv from '@lcap/mobile-ui/es/icon/index';
export default {
    name: 'lcap-amap-nav',
    components: {
        [Iconv.name]: Iconv,
    },
    props: {
        label: {
            type: String,
        },
        callnativet: {
            type: Boolean,
            default: true,
        },
        canto: {
            type: Boolean,
            default: true,
        },
        lalg: {
            type: String,
        },
        target: {
            type: String,
            default: '_self',
        },
    },
    data() {
        return {
        };
    },
    computed: {
        currentHref() {
            const { lalg, label, callnativet } = this;
            console.log(`https://uri.amap.com/marker?position=${lalg}&name=${label}&coordinate=gaode&callnative=${callnativet ? 1 : 0}`);
            return `https://uri.amap.com/marker?position=${lalg}&name=${label}&coordinate=gaode&callnative=${callnativet ? 1 : 0}`;
        },
    },
    methods: {
        toDest($event) {
            if (!this.canto) {
                $event.preventDefault();
                return null;
            }
        },
    },
};
</script>

<style module>
.root {
    display: block;
    font-size: 16px;
}
.vaniconv{
    font-size: 16px;
    color: #00c0cc;
}
.label {
    margin-left: 10px;
}
</style>
