<template lang='pug'>
input(
    v-if="type === 'hidden' || type ==='image'"
    ref="input"
    :src="src"
    @invalid.prevent="invalidInput"
    :name='name'
    :minlength='minlength'
    :maxlength='maxlength'
    :pattern="pattern"
    :required="required"
    :disabled="disabled"
    :type="type"
    :readonly='readonly'
    :value="(value === 0 || modelValue === 0) ? 0 : value || modelValue"
    @keyup="keypress"
    @keydown="(e) => {isTouched = true; }"
    @input="updateValue()"
    @focus="focus"
    @blur="blur"
    v-bind="$attrs")
.sui-input(
    v-else-if="type === 'radio' || type === 'checkbox'"
    :class="{'sui-checkbox': type === 'checkbox', 'sui-radio': type === 'radio', 'sui-option-disabled': disabled}")
    template(v-if="type === 'checkbox'")
        input(
            ref="option"
            type="checkbox"
            @focus="focus"
            @change="updateValue"
            :value="modelValue || value"
            :name="name"
            :readonly="readonly"
            :disabled="disabled"
            :checked="isChecked"
            v-bind="$attrs")
        .sui-checkbox-div(@click="()=>{$refs.option.click()}")
    template(v-else-if="type === 'radio'")
        input(
            ref="option"
            type="radio"
            @focus="focus"
            @change="updateValue"
            :value="modelValue || value"
            :name="name"
            :readonly='readonly'
            :disabled="disabled"
            :checked="isChecked"
            v-bind="$attrs")
        .sui-radio-div(@click="()=>{$refs.option.click(); $refs.option.focus()}")
    template(v-if="label")
        label(:for="inputId") {{ label }}
sui-fieldset.sui-input(
    v-else
    :class="{'range-type': this.type === 'range'}"
    :type="type"
    :label="label"
    :error="isError"
    :required="required"
    :message="helperMessage"
    :disabled="disabled || null"
    :prefix="prefix"
    :suffix="suffix"
    :mini="mini"
    :data-list="list")
    template(#slot-left)
        slot(name="slot-left")
    template(#slot-right)
        slot(name="slot-right")
    input(
        ref="input"
        @invalid.prevent="invalidInput"
        :name='name'
        :minlength='minlength'
        :maxlength='maxlength'
        :pattern="pattern"
        :required="required"
        :disabled="disabled"
        :placeholder="mini ? label : placeholder"
        :type="type"
        :readonly='readonly'
        :value="(value === 0 || modelValue === 0) ? 0 : value || modelValue"
        @keyup="keypress"
        @keydown="(e) => {isTouched = true; }"
        @input="updateValue()"
        :autocomplete="autocomplete"
        @focus="focus"
        @blur="blur"
        :list="list"
        v-bind="$attrs")
</template>

<script>
export default {
    name: 'sui-input',
    inheritAttrs: false,
    emits: ['update:modelValue', 'input', 'requiredError', 'patternError', 'lengthError', 'error', 'focus', 'blur'],
    model: {
        prop: 'modelValue',
        event: 'input'
    },
    props: {
        name: String,
        modelValue: {
            type: [Array, String, Boolean, Number, Object],
            default: ''
        },
        error: {
            type: [Boolean, String]
        },
        placeholder: {
            type: String,
            default: null
        },
        list: String,
        minlength: {
            type: [Number, String]
        },
        maxlength: {
            type: [Number, String]
        },
        lengthError: String,
        label: String,
        suffix: String,
        prefix: String,
        pattern: String,
        patternError: String,
        src: String,
        type: {
            type: String,
            default: 'text'
        },
        menuStyle: Object,
        value: {
            type: [Array, String, Boolean, Number, Object],
            default: ''
        },
        required: [Boolean, String],
        disabled: Boolean,
        readonly: Boolean,
        message: {
            type: String,
            default: null
        },
        keyOutput: {
            type: Function,
            default: () => {
            }
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        mini: Boolean,
        checked: Boolean,
    },
    data() {
        return {
            isTouched: false,
            regexExpression: Object,
            searching: false,
            currentSelection: -1,
            // option
            inputId: '',
            parent: null
        };
    },
    created() {
        this.regexExpression = new RegExp(this.pattern, "g");
    },
    mounted() {
        let el = this.$refs.input || this.$refs.option;
        let field = el.closest('fieldset.sui-fieldset');
        this.inputId = field ? field.id + '_interface' : window.sui_generateId('option');
        el.id = this.inputId;

        if(Array.isArray(this.modelValue) && this.modelValue.indexOf(this.value) && this.checked) {
            this.modelValue.push(this.value);
        };
        this.$nextTick(() => {
            if (this.autofocus) {
                this.$refs.input.focus();
            }
        });
    },
    computed: {
        isChecked() {
            if(this.checked) return true;
            if(this.type === 'radio' && this.value === this.modelValue) {
                return true;
            } else if(this.type === 'checkbox') {
                if(Array.isArray(this.modelValue) && this.modelValue.indexOf(this.value) && this.checked) {
                    return true;
                }
            }
            return false;
        },
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
                if (min && value.length < min) return true;
                if (max && value.length > max) return true;
            }

            return false;
        },
        regexFail() {
            let value = this.modelValue;

            if (!value) {
                return false;
            }

            if (!this.isTouched) {
                return false;
            }

            if (this.pattern) {
                return !value.match(this.regexExpression);
            }

            let builtinTypes = ['url', 'email'];

            return builtinTypes.includes(this.type) && (() => {
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
                        return false;
                }
            })();
        }
    },
    methods: {
        updateValue(event) {
            // for option
            if (this.type === 'radio' || this.type === 'checkbox') {
                if(this.type === 'checkbox') {
                    if(this.$refs.option?.checked && this.modelValue.indexOf(this.value)) {
                        this.modelValue.push(this.value);
                    } else {
                        this.modelValue.splice(this.modelValue.indexOf(this.value), 1);
                    }
                    this.$emit('input', this.modelValue);
                } else {
                    this.$emit('input', this.value);
                }
                return;
            }

            // for regular inputs
            this.$emit('input', event ? event : this.$refs.input.value);
            this.$emit('update:modelValue', event ? event : this.$refs.input.value);
        },
        focus(e) {
            this.$emit('focus', e);
        },
        blur(e) {
            this.$emit('blur', e);
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
        keypress(event) {
            this.isTouched = true;
            if (event.code !== 'ArrowUp' && event.code !== 'ArrowDown') {
                this.currentSelection = -1;
            }

            this.keyOutput(event.code);
        }
    }
};
</script>
<style scoped lang="less">
.sui-input {
    &.sui-option-disabled {
        opacity: 0.25;
        user-select: none;
        cursor: default;
    }

    &.sui-checkbox, &.sui-radio {
        display: inline-block;
        position: relative;
        cursor: pointer;
        //padding: 0 calc(var(--padding) / 2);
        //margin: 0 calc(var(--padding) / 2 * -1);

        *:not(pre) {
            font-size: 1em;
            display: inline-block;
        }

        * {
            line-height: 2em;
            vertical-align: middle;
        }

        label {
            cursor: inherit;
        }

        .sui-checkbox-div, .sui-radio-div {
            color: var(--button-nude, inherit);
            font-size: 1.25em;
            line-height: 1;
            position: relative;
            width: 1em;
            height: 1em;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            border: 1px solid;
            vertical-align: middle;

            & + label {
                margin-left: calc(var(--padding) / 2);
            }
        }
    }

    &.sui-checkbox {
        & > input {
            position: absolute;
            opacity: 0;
            height: 0;
            width: 0;

            &:checked + .sui-checkbox-div {
                &:after {
                    content: '';
                    width: 15%;
                    height: 60%;
                    display: block;
                    border-right: ~"clamp(1px, 0.02em, 8px)" solid;
                    border-bottom: ~"clamp(1px, 0.02em, 8px)" solid;
                    top: -4%;
                    transform: rotate(45deg);
                    position: relative;
                }
            }
        }

        .sui-checkbox-div {
            border-radius: 2px;
        }
    }

    &.sui-radio {
        & > input {
            position: absolute;
            opacity: 0;
            height: 0;
            width: 0;

            &:checked + .sui-radio-div {
                &:after {
                    content: '';
                    width: 50%;
                    height: 50%;
                    display: block;
                    border-radius: 50%;
                    box-shadow: inset 0 0 .25em .25em;
                }
            }

            & + .sui-radio-div {
                border-radius: 1em;
            }
        }
    }
}

</style>