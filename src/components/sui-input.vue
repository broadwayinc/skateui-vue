<template lang='pug'>
input(
    v-if="type === 'hidden' || type ==='image'"
    ref="input"
    :type="type"
    :value="(value === 0 || modelValue === 0) ? 0 : value || modelValue"
    @keyup="keypress"
    @input="updateValue()"
    @focus="focus"
    @blur="blur"
    v-bind="$attrs")
.sui-input(
    v-else-if="type === 'radio' || type === 'checkbox'"
    :class="{'sui-checkbox': type === 'checkbox', 'sui-radio': type === 'radio', 'sui-option-disabled': $attrs['disabled'] === '' || !!$attrs['disabled']}")
    template(v-if="type === 'checkbox'")
        input(
            ref="input"
            type="checkbox"
            @focus="focus"
            @change="updateValue"
            :value="modelValue || value"
            :checked="isChecked"
            v-bind="$attrs")
        .sui-checkbox-div(@click="()=>{$refs.input.click(); $refs.input.focus()}")
    template(v-else-if="type === 'radio'")
        input(
            ref="input"
            :class="{'validation-error': isError}"
            type="radio"
            required
            @focus="focus"
            @change="updateValue"
            :value="modelValue || value"
            :checked="isChecked"
            v-bind="$attrs")
        .sui-radio-div(@click="()=>{$refs.input.click(); $refs.input.focus()}")
    template(v-if="label")
        label(:for="inputId") {{ label }}
sui-fieldset.sui-input(
    v-else
    :class="{'range-type': this.type === 'range', 'validate' : isTouched, 'validation-error': isError, 'required': $attrs['required'], 'sui-fieldset-disabled': $attrs['disabled']}"
    :type="type"
    :label="label"
    :error="isError"
    :prefix="prefix"
    :suffix="suffix"
    :data-list="list"
    :message="errorMessage || message")
    template(#slot-left)
        slot(name="slot-left")
    template(#slot-right)
        slot(name="slot-right")
    input(
        ref="input"
        :type="type"
        :value="(value === 0 || modelValue === 0) ? 0 : value || modelValue"
        @keyup="keypress"
        @keydown="(e) => {isTouched = true; }"
        @input="updateValue()"
        @focus="focus"
        @blur="blur"
        :list="list"
        v-bind="$attrs")
</template>

<script>
export default {
    name: 'sui-input',
    inheritAttrs: false,
    emits: ['update:modelValue', 'input', 'error', 'focus', 'blur'],
    model: {
        prop: 'modelValue',
        event: 'input'
    },
    props: {
        modelValue: {
            type: [Array, String, Boolean, Number, Object],
            default: ''
        },
        error: {
            type: [Boolean, String]
        },
        requiredErrorMessage: {
            type: String
        },
        list: String,
        label: String,
        suffix: String,
        prefix: String,
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: [Array, String, Boolean, Number, Object],
            default: ''
        },
        message: {
            type: String,
            default: null
        },
        keyOutput: {
            type: Function,
            default: () => {
            }
        },
        patternErrorMessage: String,
        minLengthErrorMessage: String
    },
    data() {
        return {
            isTouched: false,
            regexExpression: Object,
            searching: false,
            currentSelection: -1,
            // option
            inputId: '',
            parent: null,
            isError: false,
            errorMessage: '',
        };
    },
    mounted() {
        let el = this.$refs.input || this.$refs.option;
        let field = el.closest('fieldset.sui-fieldset');
        this.inputId = field ? field.id + '_interface' : window.sui_generateId('option');
        el.id = this.inputId;

        if(Array.isArray(this.modelValue) && this.modelValue.indexOf(this.value) && this.$attrs['checked'] === '' || !!this.$attrs['checked']) {
            this.modelValue.push(this.value);
        };
        this.$nextTick(() => {
            if(this.$refs.input) {
                this.$refs.input.addEventListener('input', (event) => {
                    if(this.$refs.input.checkValidity()) {
                        this.isError = false;
                        this.errorMessage = '';
                    }


                });
                this.$refs.input.addEventListener('invalid', (event) => {
                    event.preventDefault();
                    this.isError = true;
                    let state = this.$refs.input.validity;
                    for(let key in state){
                        console.log(key)
                        if(state[key]) {
                            switch(key) {
                                case 'valueMissing':
                                    this.errorMessage = this.requiredErrorMessage;
                                    break;
                                case 'patternMismatch':
                                    this.errorMessage = this.patternErrorMessage;
                                    break;
                                case 'tooShort':
                                    this.errorMessage = this.minLengthErrorMessage;
                                    break;
                            }
                            break;
                        }
                    }
                });
            }
        });
    },
    destroyed() {
        if(this.$refs.input) {
            this.$refs.input.removeEventListener('input');
            this.$refs.input.removeEventListener('invalid');
        }
    },
    computed: {
        isChecked() {
            if(this.$attrs['checked'] === '' || !!this.$attrs['checked']) return true;
            if(this.type === 'radio' && this.value === this.modelValue) {
                return true;
            } else if(this.type === 'checkbox') {
                if(Array.isArray(this.modelValue) && this.modelValue.indexOf(this.value) && this.$attrs['checked'] === '' || !!this.$attrs['checked']) {
                    return true;
                }
            }
            return false;
        },
    },
    methods: {
        updateValue(event) {
            // for option
            if (this.type === 'radio' || this.type === 'checkbox') {
                if(this.type === 'checkbox') {
                    if(this.$refs.input?.checked && this.modelValue.indexOf(this.value)) {
                        this.modelValue.push(this.value);
                    } else {
                        this.modelValue.splice(this.modelValue.indexOf(this.value), 1);
                    }
                    this.$emit('input', this.modelValue);
                } else {
                    if(this.$refs.input.classList.contains('validation-error')) {
                        document.querySelectorAll(`input[type="radio"][name="${this.$attrs['name']}"]`).forEach(element => {
                            element.classList.remove("validation-error");
                        })
                    }
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
            this.isTouched = true;
            this.$emit('blur', e);
        },
        keypress(event) {
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

            &.validation-error + .sui-radio-div {
                border-color: var(--alert, #ff6347);
                outline-color: var(--alert, #ff6347);
            }
        }
    }
}

</style>