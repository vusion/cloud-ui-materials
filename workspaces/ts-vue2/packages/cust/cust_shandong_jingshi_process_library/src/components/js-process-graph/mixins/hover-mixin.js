
export default {
    provide() {
        return {
            checkIsHover: this.checkIsHover,
            setHover: this.setHover,
        }
    },
    data() {
        return {
            currentHover: null,
        }
    },
    methods: {
        checkIsHover(node) {
            return this.currentHover === node;
        },
        setHover(node) {
            if(this.currentHover !== node) {
                this.currentHover = node;
            }
        }
    },
}