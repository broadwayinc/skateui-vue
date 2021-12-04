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
    @keydown="(e) => {arrowSelection(e); isTouched = true; }"
    @input="updateValue()"
    :autocomplete="setAutoComplete"
    :autofocus="autofocus"
    @focus="focus"
    @blur="blur")
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
            :checked="isChecked")
        .sui-checkbox-div(@click="()=>{$refs.option.click()}")
    template(v-else-if="type === 'radio'")
        input(
            ref="option"
            type="radio"
            @focus="focus"
            @change="updateValue"
            @trigger="updateValue_trigger"
            :value="modelValue || value"
            :name="name"
            :readonly='readonly'
            :disabled="disabled"
            :checked="isChecked")
        .sui-radio-div(@click="()=>{$refs.option.click()}")
    template(v-if="label")
        label(:for="inputId") {{ label }}
sui-fieldset.sui-input(
    v-else
    :class="{'range-type': this.type === 'range'}"
    :custom-autocomplete="!!(autocomplete_list && autocomplete_list.length)"
    :type="type"
    :label="label"
    :error="isError"
    :required="required"
    :message="helperMessage"
    :disabled="disabled || null"
    :prefix="prefix"
    :suffix="suffix"
    :mini="mini")
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
        @keydown="(e) => {arrowSelection(e); isTouched = true; }"
        @input="updateValue()"
        :autocomplete="setAutoComplete"
        :autofocus="autofocus"
        @focus="focus"
        @blur="blur")
    .sui-dropdown(v-show="autocomplete_list && autocomplete_list.length")
        template(v-for="(x, idx) in autocomplete_list")
            .sui-dropdown-list(:class="currentSelection === idx ? 'selected' : null" @mousedown="selectChoice(x)" :style="menuStyle ? menuStyle : {}") {{ x }}
</template>

<script>
export default {
    name: 'sui-input',
    emits: ['update:modelValue', 'input', 'requiredError', 'patternError', 'lengthError', 'error', 'focus', 'blur'],
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
            type: [String, Boolean, Array, Object],
            default: null
        },
        mini: Boolean,
        autofocus: Boolean,
        checked: Boolean,
    },
    data() {
        return {
            isTouched: false,
            regexExpression: Object,
            searching: false,
            currentSelection: -1,
            // option
            initValue: null,
            inputId: '',
            parent: null,
            blockFocus: null
        };
    },
    created() {
        if (this.type === 'radio' || this.type === 'checkbox') {
            this.initValue = this.modelValue || this.value;
        }
        this.regexExpression = new RegExp(this.pattern, "g");
    },
    mounted() {
        if (this.type === 'radio' || this.type === 'checkbox') {
            this.toggleCheck(this.checked);
        }

        let el = this.$refs.input || this.$refs.option;
        let field = el.closest('fieldset.sui-fieldset');
        this.inputId = field ? field.id + '_interface' : window.sui_generateId('option');
        el.id = this.inputId;

        if (field) {
            this.parent = field.parentNode.closest('fieldset.sui-fieldset');
            if (this.parent) {
                this.blockFocus = field.parentNode.parentNode.classList.contains('slot-left') ? 'sui-fieldset-nesting-block-right' : 'sui-fieldset-nesting-block-left';
            }
        }

        this.$nextTick(() => {
            if (this.autofocus) {
                this.$refs.input.focus();
            }
        });
    },
    computed: {
        isNestedAutocomplete() {
            return !(this.type === 'radio' || this.type === 'checkbox') && this.autocomplete_list && this.mini;
        },
        autocomplete_list() {
            return Array.isArray(this.autocomplete) ? this.autocomplete : null;
        },
        setAutoComplete() {
            let autocomplete = this.autocomplete;
            let type = this.type;

            switch (type) {
                case "email":
                    return autocomplete || "email";
                case "password":
                    return autocomplete || "current-password";
                default:
                    if (autocomplete === null) {
                        return null;
                    } else if (typeof autocomplete === 'boolean') {
                        return autocomplete ? 'on' : 'off';
                    } else if (typeof autocomplete === 'string') {
                        return autocomplete;
                    } else return 'off';
            }
        },
        isChecked() {
            if (this.$refs.option && this.$refs.option.checked !== this.checked) {
                this.toggleCheck(this.checked);
            }
            return this.checked;
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
            let value = this.value || this.modelValue;

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
        updateValue(v) {
            // for option
            if (this.type === 'radio' || this.type === 'checkbox') {

                this.toggleCheck(v.target.checked);

                if (this.type === 'radio') {
                    let hasForm = v.target.closest('form');
                    let trigger = new Event("trigger");
                    let optionEl = document.getElementsByClassName('sui-option-radio');
                    for (let i = 0; optionEl.length > i; i++) {
                        if (!hasForm || hasForm && optionEl[i].closest('form').isEqualNode(hasForm)) {
                            if (optionEl[i].name && optionEl[i].name === this.name) {
                                if (!optionEl[i].isEqualNode(v.target) && !optionEl[i].checked && v.target.value !== optionEl[i].value) {
                                    optionEl[i].dispatchEvent(trigger);
                                }
                            }
                        }
                    }
                }

                return;
            }

            // for regular inputs
            this.$emit('input', v ? v : this.$refs.input.value);
            this.$emit('update:modelValue', v ? v : this.$refs.input.value);
        },
        focus(e) {
            if (this.blockFocus && !this.parent.classList.contains(this.blockFocus)) {
                this.parent.classList.add(this.blockFocus);
            }
            if (this.parent && this.isNestedAutocomplete && !this.parent.classList.contains('sui-fieldset-nesting-focused')) {
                this.parent.classList.add('sui-fieldset-nesting-focused');
            }
            this.$emit('focus', e);
        },
        blur(e) {
            if (this.blockFocus && this.parent.classList.contains(this.blockFocus)) {
                this.parent.classList.remove(this.blockFocus);
            }
            if (this.parent && this.isNestedAutocomplete && this.parent.classList.contains('sui-fieldset-nesting-focused')) {
                this.parent.classList.remove('sui-fieldset-nesting-focused');
            }
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
        arrowSelection(event) {
            if (event && this.autocomplete_list?.length) {
                if (event.code === 'ArrowUp' && this.currentSelection > -1) {
                    this.currentSelection -= 1;
                }
                if (event.code === 'ArrowDown' && this.currentSelection < this.autocomplete_list.length - 1) {
                    this.currentSelection += 1;
                }
                if (event.code === 'Enter' && this.currentSelection > -1) {
                    this.searching = false;
                    this.$refs.input.blur();
                    this.updateValue(this.autocomplete_list[this.currentSelection]);
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
        // for option
        toggleCheck(checked) {
            if (checked) {
                this.$emit('input', this.initValue);
                this.$emit('update:modelValue', this.initValue);
            } else {
                this.$emit('input', null);
                this.$emit('update:modelValue', null);
            }
        },
        updateValue_trigger(e) {
            this.toggleCheck(e.target.checked);
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
        padding: 0 calc(var(--padding) / 2);
        margin: 0 calc(var(--padding) / 2 * -1);

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
            margin-right: calc(var(--padding) / 2);
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