<template>
<div>
    <u-head-card :title="instance.name">
        <div slot="info">
            <ul>
                <li><label>公网 IP：</label>127.0.0.1</li>
            </ul>
        </div>
    </u-head-card>
    <u-tabs router>
        <u-tab title="详细信息" :to="{ path: '/name_PLACEHOLDER/detail/info', query: { id: $route.query.id } }"></u-tab>
    </u-tabs>
</div>
</template>

<script>
export default {
    data() {
        return {
            instance: {},
        };
    },
    created() {
        this.getDetail();
    },
    methods: {
        async getDetail() {
            const result = await this.$services.service_PLACEHOLDER.loadDetail_PLACEHOLDER({
                query: {
                    InstanceId: this.$route.query.id,
                },
            });
            this.instance = result;
            this.$publish('name_PLACEHOLDER.loadDetail', result);
        },
    },
};
</script>
