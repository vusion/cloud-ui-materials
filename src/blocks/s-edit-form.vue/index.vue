<template>
<u-linear-layout direction="vertical">
    <u-form gap="large" @validate="valid = $event.valid">
        <u-form-item label="名称" required rules="required | alphaNumDash | rangeLength(1,63)">
            <u-input v-model="model.name" size="huge medium" maxlength="24" placeholder="由1-63个小写字母，数字，中划线组成"></u-input>
        </u-form-item>
        <u-form-item label="描述">
            <u-input v-model="model.description" size="huge medium"></u-input>
        </u-form-item>
        <u-form-item>
            <u-button color="primary"
                :disabled="!canSubmit || submitting"
                :icon="submitting ? 'loading' : ''" @click="submit()">
                提交修改
            </u-button>
        </u-form-item>
    </u-form>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            model: {
                name: '',
                description: '',
            },
            instance: {},
            valid: false,
            submitting: false,
        };
    },
    computed: {
        canSubmit() {
            return this.model.name !== this.instance.name || this.model.description !== this.instance.description;
        },
    },
    created() {
        this.getDetail();
    },
    methods: {
        async getDetail() {
            const result = await this.$services.service_PLACEHOLDER.loadDetail_PLACEHOLDER({
                query: {
                    id: this.$route.query.id,
                },
            });
            this.instance = result;
            this.model = Object.assign({}, result);
        },
        async submit() {
            await this.$services.service_PLACEHOLDER.update_PLACEHOLDER({
                body: this.model,
            });
            this.$router.push('list');
        },
    },
};
</script>
