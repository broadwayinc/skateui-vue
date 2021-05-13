
export default {
    name: 'sui-textarea',
    props: {
        error: Boolean,
        placeholder: String,
        prefix: String,
        suffix: String,
        label: String,
        required: Boolean,
        disabled: Boolean,
        message: String,
        keyOutput: {
            type: Function,
            default: () => {
            }
        }
    }
};
