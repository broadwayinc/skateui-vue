
export default {
    name: 'sui-option',
    props: {
        type: {type: String, default: 'checkbox'},
        label: String,
        disabled: Boolean,
        checked: Boolean,
        name: String,
        value: String || Number
    },
};
