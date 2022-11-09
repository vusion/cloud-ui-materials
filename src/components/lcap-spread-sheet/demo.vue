<template>
<div>
    <div v-for="item in list" @click="onClick(item)">{{ item.name }}</div>
</div>
</template>

<script>

export default {
    name: 'demo',
    data() {
        return {
            list: [
                {
                    name: 'aaa',
                },
                {
                    name: 'bbb',
                },
                {
                    name: 'ccc',
                },
                {
                    name: 'ddd',
                },
                {
                    name: 'eee',
                },
            ],
        };
    },
    methods: {
        onClick($event) {
            console.log($event);
        },
    },
};
</script>

<style module>

</style>
