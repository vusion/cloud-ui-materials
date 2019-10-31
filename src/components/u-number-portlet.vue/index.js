import { ULink } from 'cloud-ui.vusion';

export const UNumberPortlet = {
    name: 'u-number-portlet',
    extends: ULink,
    props: {
        title: String,
        value: [String, Number],
        unit: String,
        alignment: String,
    },
    computed: {
        isInteger() {
            return Number.isInteger(parseFloat(this.value));
        },
    },
};

export default UNumberPortlet;
