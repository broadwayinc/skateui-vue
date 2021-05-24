<template lang='pug'>
sui-label(:show-selector='!!(searching && option.length)' :type="type" :label="label" :error="isError" :required="required" :message="helperMessage" :disabled="disabled || null" :prefix="prefix" :suffix="suffix")
    template(#button-left)
        slot(name="button-left")
    template(#button-right)
        slot(name="button-right")
    input(@invalid.prevent="invalidInput" :pattern="regex" :required="required" :disabled="disabled" :placeholder="placeholder" :type="type" v-model="customValue" @keyup="keypress" @keydown="() => {arrowSelection(); isTouched = true; }")
    div(v-show="searching && option.length" class="option")
        template(v-for="(x, idx) in option")
            .menu(:class="currentSelection === idx ? 'selected' : null" @mousedown="selectChoice(x)" :style="menuStyle ? menuStyle : null") {{ x }}
</template>

<script>
export default {
    name: 'sui-input',
    props: {
        error: {
            type: [Boolean, String]
        },
        placeholder: {
            type: String,
            default: null
        },
        label: String,
        suffix: String,
        prefix: String,
        regex: String,
        regexHelper: String,
        type: {
            type: String,
            default: 'text'
        },
        menuStyle: Object,
        value: {
            type: [Number, String],
            default: null
        },
        option: Array,
        required: [Boolean, String],
        disabled: Boolean,
        message: {
            type: String,
            default: null
        },
        output: {
            type: Function,
            default: () => {
            }
        },
        keyOutput: {
            type: Function,
            default: () => {
            }
        }
    },
    data() {
        return {
            isTouched: false,
            regexExpression: Object,
            searching: false,
            currentSelection: -1
        };
    },
    created() {
        this.regexExpression = new RegExp(this.regex, "g");
    },
    computed: {
        customValue: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.output(newValue);
            }
        },
        isError() {
            return this.isInvalid || this.error || this.regexFail;
        },
        helperMessage() {
            let helper =this.message || null;
            if(this.requireFail && this.isInvalid) {
                if(typeof this.required === 'string') {
                    helper = this.required
                }
            } else if(this.regexFail && this.isInvalid) {
                helper = this.regexHelper;
            } else if(typeof this.error === 'string') {
                helper = this.error;
            }
            return helper;
        },
        isInvalid() {
            return this.isTouched && this.requireFail || this.regexFail;
        },
        requireFail() {
            return this.required && this.value === '';
        },
        regexFail() {
            if(!this.required && this.value === '') return false;
            return this.isTouched && this.regex && !this.value.match(this.regexExpression);
        }
    },
    methods: {
        invalidInput() {
            this.isTouched = true;
            if(this.requireFail) { this.$emit('requiredError'); }
            else this.regexFail ? this.$emit('regexError') : this.$emit('error');
        },
        arrowSelection(event) {
            if (event && this.option?.length) {
                if (event.code === 'ArrowUp' && this.currentSelection > -1) {
                    this.currentSelection -= 1;
                }
                if (event.code === 'ArrowDown' && this.currentSelection < this.option.length - 1) {
                    this.currentSelection += 1;
                }
                if (event.code === 'Enter' && this.currentSelection > -1) {
                    this.searching = false;
                    this.customValue = this.option[this.currentSelection];
                }
            }
        },
        keypress(event) {
            this.isTouched = true;

            if (this.type === 'autocomplete') {
                if (event.code !== 'Enter') this.searching = true;
            }
            if (event.code !== 'ArrowUp' && event.code !== 'ArrowDown') {
                this.currentSelection = -1;
            }
            if (event.code !== 'Enter')
                this.output(this.customValue);

            this.keyOutput(event.code);
        },
        selectChoice(x) {
            this.customValue = typeof x === 'string' ? x : x.text ? x.text : x.value;
            this.output(this.customValue);
            // enter always means option has been selected
            this.keyOutput('Enter');
        },
    }
};
</script>