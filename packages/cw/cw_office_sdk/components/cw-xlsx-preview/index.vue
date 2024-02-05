<template>
    <div :class="$style.root">
        <div :class="$style.content" ref="content"></div>
        <div :class="$style.loading" v-if="isLoading">
            <div :class="$style.loader"></div>
        </div>
    </div>
</template>

<script>
import jsPreviewExcel from '@js-preview/excel';
import '@js-preview/excel/lib/index.css';
export default {
    name: 'cw-xlsx-preview',
    props: {
        value: {
            type: [String, Object],
        },
    },
    data() {
        return {
            isLoading: false,
        };
    },
    watch: {
        value() {
            this.init();
        },
    },
    beforeDestroy() {
        if (this.xlsxPreviewer) {
            this.xlsxPreviewer.destroy();
            this.xlsxPreviewer = null;
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (this.xlsxPreviewer) {
                this.xlsxPreviewer.destroy();
                this.xlsxPreviewer = null;
            }
            if (!this.value) return;
            if (this.value instanceof Blob || typeof this.value === 'string') {
                this.isLoading = true;
                this.xlsxPreviewer = jsPreviewExcel.init(this.$refs.content);
                this.xlsxPreviewer.preview(this.value).then(
                    () => {
                        this.isLoading = false;
                    },
                    () => {
                        this.isLoading = false;
                    }
                );
            }
        },
    },
};
</script>

<style module>
.root {
    height: 300px;
    position: relative;
}

.content {
    height: 100%;
    width: 100%;
}

.loading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loader {
    width: 50px;
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #25b09b;
    --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;
}
@keyframes l3 {
    to {
        transform: rotate(1turn);
    }
}
</style>
