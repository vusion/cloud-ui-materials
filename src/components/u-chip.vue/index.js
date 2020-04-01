import { UValidator } from 'cloud-ui.vusion';

export const UChip = {
    name: 'u-chip',
    mixins: [UValidator],
    props: {
        removable: { type: Boolean, default: false },
        editing: { type: Boolean, default: false },
        error: { type: Boolean, default: false },
    },
    methods: {
        remove() {
            if (this.$emitPrevent('before-remove', null, this))
                return;

            this.$emit('remove', null, this);
        },
    },
};

export default UChip;
