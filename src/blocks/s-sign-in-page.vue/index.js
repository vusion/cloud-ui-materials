export default {
    data() {
        return {
            hasSubmit: false,
            form: {
                userName: '',
                position: '',
                remark: '',
            },
            tip: '用户首次使用 OpenID 登录平台需要向管理员申请权限，请填写以下信息并提交',
            secondTip: '平台相关使用，请咨询：admin.netease.com'
        };
    },
    computed: {
        canSubmit() {
            return this.form.position && this.form.remark && this.form.name;
        },
    },
    created() {
    },
    methods: {
        submit() {
            this.hasSubmit = true;
            // 举例
            // const params = Object.assign({}, this.form)
            // userService.apply(params).then((result) => {
            //     this.hasSubmit = true;
            // });
        },
        logout() {
           //登出处理逻辑
           this.hasSubmit = false;
           // 举例
            // userService.logout().then((result) => {
            //     this.hasSubmit = false;
            // });
        },
    },
};