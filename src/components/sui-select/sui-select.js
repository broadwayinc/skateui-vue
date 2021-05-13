
export default {
    name: 'sui-select',
    props: {
        error: Boolean,
        placeholder: {
            type: String,
            default: null
        },
        suffix: String,
        prefix: String,
        label: String,
        type: {
            type: String,
            default: 'text'
        },

        fullscreen: Boolean,
        custom: Boolean,
        menuStyle: Object,
        value: String,
        option: Array,
        required: Boolean,
        disabled: Boolean,
        message: {
            type: String,
            default: null
        },
        output: {
            type: Function,
            default: () => {
            }
        }
    },
    data() {
        return {
            customValue: '',
            searching: false,
            currentSelection: -1
        };
    },
    created() {
        this.customValue = this.placeholder ? this.placeholder : this.option[0].text ? this.option[0].text : this.option[0].value;
    },
    methods: {
        selectChoice(x) {
            this.output(x);
            this.customValue = typeof x === 'string' ? x : x.text ? x.text : x.value;
        },
    }
};
