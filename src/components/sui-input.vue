<template lang='pug'>
sui-label(:show-selector='!!(option && option.length)' :type="type" :label="label" :error="isError" :required="required" :message="helperMessage" :disabled="disabled || null" :prefix="prefix" :suffix="suffix" :small="small")
    template(#button-left)
        slot(name="button-left")
    template(#button-right)
        slot(name="button-right")
    input(ref="input" @invalid.prevent="invalidInput" :minlength='minlength' :maxlength='maxlength' :pattern="pattern" :required="required" :disabled="disabled" :placeholder="small ? label : placeholder" :type="type" :value="(value === 0 || modelValue === 0) ? 0 : value || modelValue" @keyup="keypress" @keydown="(e) => {arrowSelection(e); isTouched = true; }" @input="updateValue()" :autofocus="autofocus" @focus="focus")
    div(v-show="option && option.length" class="option")
        template(v-for="(x, idx) in option")
            .menu(:class="currentSelection === idx ? 'selected' : null" @mousedown="selectChoice(x)" :style="menuStyle ? menuStyle : {}") {{ x }}
</template>

<script>
export default {
    name: 'sui-input',
    emits: ['update:modelValue', 'input', 'requiredError', 'patternError', 'lengthError', 'error', 'focus'],
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
        minlength: {
            type: Number | String
        },
        maxlength: {
            type: Number | String
        },
        lengthError: String,
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
        },
        small: Boolean,
        autofocus: Boolean
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
    mounted() {
        this.$nextTick(() => {
            if (this.autofocus)
                this.$refs.input.focus();
        });
    },
    computed: {
        isError() {
            return this.isInvalid || this.error;
        },
        helperMessage() {
            let helper = this.message || null;
            if (this.isInvalid) {
                if (this.requireFail && typeof this.required === 'string') {
                    helper = this.required;
                } else if (this.regexFail) {
                    helper = this.patternError;
                } else if (this.lengthFail) {
                    helper = this.lengthError;
                }
            } else if (typeof this.error === 'string') {
                helper = this.error;
            }
            return helper;
        },
        isInvalid() {
            return this.isTouched && (this.requireFail || this.regexFail || this.lengthFail);
        },
        requireFail() {
            return this.required && (this.value || this.modelValue) === '';
        },
        lengthFail() {
            let value = this.value || this.modelValue;

            if (!this.required && value === '') {
                return false;
            }

            if (this.isTouched) {
                let min = parseInt(this.minlength || 0);
                let max = parseInt(this.maxlength || 0);
                if (min && value.length <= min) return true;
                if (max && value.length > max) return true;
            }

            return false;
        },
        regexFail() {
            let value = this.value || this.modelValue;

            if (!value) {
                return false;
            }

            let builtinTypes = ['url', 'email'];

            return this.isTouched && (this.pattern || builtinTypes.includes(this.type)) && (() => {
                switch (this.type) {
                    case 'email': {
                        value = value.trim();
                        if (value.length > 5 && value.length < 64 && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
                            let splitAt = value.split('@');
                            let tld = splitAt[1].split('.');

                            return tld.length === 1;
                        }
                        return true;
                    }

                    case 'url': {
                        value = value.trim();
                        if (value === '*') {
                            return false;
                        }

                        let protocols = ['http', 'https', 'ftp'];
                        let allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&\'()*+,;=';
                        let splitProtocols = value.split('://');

                        // check if value has url protocol
                        if (splitProtocols.length <= 1 || !protocols.includes(splitProtocols[0])) {
                            return true;
                        }

                        let dotSep = splitProtocols[1].split('.');
                        if (dotSep.length > 1) {
                            if (!dotSep[dotSep.length - 1]) {
                                return true;
                            }

                            for (let i = 0; i < splitProtocols[1].length; i++) {
                                if (!allowed.includes(splitProtocols[1][i])) {
                                    return true;
                                }
                            }

                            return false;
                        } else return true;
                    }
                    default:
                        return !value.match(this.regexExpression);
                }
            })();
        }
    },
    methods: {
        focus(e) {
            this.$emit('focus', e);
        },
        updateValue(value) {
            this.$emit('input', value ? value : this.$refs.input.value);
            this.$emit('update:modelValue', value ? value : this.$refs.input.value);
        },
        invalidInput() {
            this.isTouched = true;
            if (this.requireFail) {
                this.$emit('requiredError');
            } else if (this.regexFail) {
                this.$emit('patternError');
            } else if (this.lengthError) {
                this.$emit('lengthError');
            } else this.$emit('error');
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