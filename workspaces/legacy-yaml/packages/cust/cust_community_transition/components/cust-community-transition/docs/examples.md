### 基本用法

```vue
<template>
    <div>
        <div style="display:flex; justify-content: center;">
            <cust-community-transition
                hsj="hsj"
                style="color:green; --slide-timeout:1s"
            >
                <div v-if="idx === 0" :style="getStyle(idx)" ref="1">
                    {{ idx }}
                </div>
                <div v-if="idx === 1" :style="getStyle(idx)" ref="2">
                    {{ idx }}
                </div>
                <div v-if="idx === 2" :style="getStyle(idx)" ref="3">
                    {{ idx }}
                </div>
            </cust-community-transition>
        </div>
        <u-button @click="idx = (idx + 1) % 3"></u-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            idx: 0,
        };
    },

    // mounted() {
    //     setInterval(() => {}, 1000);
    // },
    methods: {
        getStyle(idx) {
            return {
                width: '300px',
                height: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'red',
                position: 'relative',
            };
        },
    },
};
</script>
```
