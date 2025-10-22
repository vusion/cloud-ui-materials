<template>
    <div>{{ value }}</div>
</template>

<script>
import { getSdk } from '../../logics/getSdk';
import requestAuthCode from '../../logics/requestAuthCode';

export default {
    name: 'cw-feishu-demo',
    props: {
        value: {
            type: String,
            default: '请在这里编写代码',
        },
    },

    mounted() {
        getSdk(3)
            .then(
                () =>
                    new Promise((res, rej) =>
                        requestAuthCode(res, rej, 'test code')
                    )
            )
            .then(
                (code) => {
                    return {};
                },
                (err) => {
                    console.error(err);
                }
            );
    },
};
</script>

<style></style>
