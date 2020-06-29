<template>
<u-linear-layout direction="vertical">
    <u-form gap="large" @validate="valid = $event.valid">
        <u-form-item label="名称" required rules="required | alphaNumDash | rangeLength(1,63)">
            <u-input v-model="model.name" size="huge" maxlength="24" placeholder="由1-63个小写字母，数字，中划线组成"></u-input>
        </u-form-item>
        <u-form-item label="描述">
            <u-input v-model="model.description" size="huge"></u-input>
        </u-form-item>
        <u-form-item>
            <u-button color="primary"
                :disabled="!canSubmit || submitting"
                :icon="submitting ? 'loading' : ''" @click="submit()">
                立即创建
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
            valid: false,
            submitting: false,
        };
    },
    computed: {
        canSubmit() {
            return this.valid;
        },
    },
    methods: {
        submit() {
            return this.$services.service_PLACEHOLDER.create_PLACEHOLDER({
                body: this.model,
            }).then(() => this.$router.push('list'));
        },
    },
};
</script>
