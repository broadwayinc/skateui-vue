<template lang='pug'>
sui-label(:show-selector='!!(option && option.length)' :type="type" :label="label" :error="isError" :required="required" :message="helperMessage" :disabled="disabled || null" :prefix="prefix" :suffix="suffix")
    template(#button-left)
        slot(name="button-left")
    template(#button-right)
        slot(name="button-right")
    input(ref="input" @invalid.prevent="invalidInput" :pattern="pattern" :required="required" :disabled="disabled" :placeholder="placeholder" :type="type" :value="value || modelValue" @keyup="keypress" @keydown="(e) => {arrowSelection(e); isTouched = true; }" @input="updateValue()")
    div(v-show="option && option.length" class="option")
        template(v-for="(x, idx) in option")
            .menu(:class="currentSelection === idx ? 'selected' : null" @mousedown="selectChoice(x)" :style="menuStyle ? menuStyle : null") {{ x }}
</template>

<script>
export default {
    name: 'sui-input',
    emits: ['update:modelValue', 'input', 'requiredError', 'patternError', 'error'],
    props: {
        modelValue: {
            type: [String, Number],
            default: ''
        },
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
        pattern: String,
        patternError: String,
        type: {
            type: String,
            default: 'text'
        },
        menuStyle: Object,
        value: {
            type: [Number, String],
            default: ''
        },
        option: Array,
        required: [Boolean, String],
        disabled: Boolean,
        message: {
            type: String,
            default: null
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
        this.regexExpression = new RegExp(this.pattern, "g");
    },
    computed: {
        isError() {
            return this.isInvalid || this.error || this.regexFail;
        },
        helperMessage() {
            let helper = this.message || null;
            if (this.requireFail && this.isInvalid) {
                if (typeof this.required === 'string') {
                    helper = this.required;
                }
            } else if (this.regexFail && this.isInvalid) {
                helper = this.patternError;
            } else if (typeof this.error === 'string') {
                helper = this.error;
            }
            return helper;
        },
        isInvalid() {
            return this.isTouched && this.requireFail || this.regexFail;
        },
        requireFail() {
            return this.required && (this.value || this.modelValue) === '';
        },
        regexFail() {
            if (!this.required && (this.value || this.modelValue) === '') return false;
            return this.isTouched && this.pattern && !(this.value || this.modelValue).match(this.regexExpression);
        }
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value ? value : this.$refs.input.value);
            this.$emit('update:modelValue', value ? value : this.$refs.input.value);
        },
        invalidInput() {
            this.isTouched = true;
            if (this.requireFail) {
                this.$emit('requiredError');
            } else this.regexFail ? this.$emit('patternError') : this.$emit('error');
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
                    this.$refs.input.blur();
                    this.updateValue(this.option[this.currentSelection]);
                }
            }
        },
        keypress(event) {
            this.isTouched = true;
            if (event.code !== 'ArrowUp' && event.code !== 'ArrowDown') {
                this.currentSelection = -1;
            }
            this.keyOutput(event.code);
        },
        selectChoice(x) {
            this.updateValue(typeof x === 'string' ? x : x.text ? x.text : x.value);
            // enter always means option has been selected
            this.keyOutput('Enter');
        },
    }
};
</script>