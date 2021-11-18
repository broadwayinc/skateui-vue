<template lang='pug'>
sui-fieldset.sui-select(
    :custom-autocomplete='!!((custom || fullscreen) && option.length)'
    :prefix="prefix"
    :suffix="suffix"
    type="select"
    :label="label"
    :error="isError"
    :required="required"
    :message="helperMessage"
    :disabled="disabled || null"
    :mini="mini")
    template(v-if="custom || fullscreen")
        input(
            :placeholder="mini && placeholder ? label : placeholder"
            ref="select"
            :value="getText(value || modelValue)"
            type="text"
            :required="required"
            :disabled="disabled"
            readonly
            @invalid.prevent="invalidInput"
            @focus="focus"
            @blur="blur"
            @keydown="(e) => { arrowSelection(e); }")
        .sui-dropdown(v-show="custom || fullscreen" :class="{fullscreen}")
            template(v-for="(x, idx) in option")
                .sui-dropdown-list(:class="currentSelection === idx ? 'selected' : null" @mousedown="selectChoice(x)" :data-value="x.value || x") {{ typeof x === 'string' ? x : x.text || x.value }}
        .sui-dropdown-button
            i.material-icons expand_more
    template(v-else)
        select(ref="select" @input="e=>{updateValue(e.target.value)}" :required="required" @invalid.prevent="invalidInput" :disabled="disabled" @focus="focus")
            option(v-if="placeholder" value="" disabled selected="(value || modelValue) === ''") {{ mini && placeholder ? placeholder || label : placeholder }}
            option(v-for="x in option" :value="x.value" :selected="x.value === (value || modelValue) ? 'selected' : null") {{ x.text ? x.text : x.value }}
        .sui-dropdown-button
            i.material-icons expand_more
    template(#slot-left)
        slot(name="slot-left")
    template(#slot-right)
        slot(name="slot-right")
</template>

<script>
export default {
    name: 'sui-select',
    emits: ['update:modelValue', 'input', 'focus', 'blur'],
    props: {
        modelValue: String,
        error: Boolean,
        placeholder: {
            type: String,
            default: null
        },
        mini: Boolean,
        suffix: String,
        prefix: String,
        label: String,
        type: String,
        fullscreen: Boolean,
        custom: Boolean,
        value: String,
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
        autofocus: Boolean
    },
    data() {
        return {
            currentSelection: -1,
            isTouched: false,
            parent: null,
            blockFocus: null
        };
    },
    mounted() {
        let el = this.$refs.select;
        let field = el.closest('fieldset.sui-fieldset');
        el.id = field.id + '_interface';

        this.parent = field.parentNode.closest('fieldset.sui-fieldset');
        if (this.parent) {
            this.blockFocus = field.parentNode.parentNode.classList.contains('slot-left') ? 'sui-fieldset-nesting-block-right' : 'sui-fieldset-nesting-block-left';
        }

        this.$nextTick(() => {
            if (this.autofocus) {
                this.$refs.select.focus();
            }
        });
    },
    computed: {
        isError() {
            return this.isInvalid || this.error;
        },
        helperMessage() {
            let helper = this.message || null;
            if (this.requireFail && this.isInvalid) {
                if (typeof this.required === 'string') {
                    helper = this.required;
                }
            } else if (typeof this.error === 'string') {
                helper = this.error;
            }
            return helper;
        },
        isInvalid() {
            return this.isTouched && this.requireFail;
        },
        requireFail() {
            return this.required && (this.value || this.modelValue) === '';
        },
    },
    methods: {
        invalidInput() {
            this.isTouched = true;
        },
        focus(e) {
            if (this.blockFocus && !this.parent.classList.contains(this.blockFocus)) {
                this.parent.classList.add(this.blockFocus);
            }
            if (this.parent && !this.parent.classList.contains('sui-fieldset-nesting-focused')) {
                this.parent.classList.add('sui-fieldset-nesting-focused');
            }
            this.$emit('focus', e);
        },
        blur(e) {
            if (this.blockFocus && this.parent.classList.contains(this.blockFocus)) {
                this.parent.classList.remove(this.blockFocus);
            }
            if (this.parent && this.parent.classList.contains('sui-fieldset-nesting-focused')) {
                this.parent.classList.remove('sui-fieldset-nesting-focused');
            }
            this.$emit('blur', e);
        },
        updateValue(value) {
            this.$refs.select.value = value;
            this.$emit('input', value ? value : this.$refs.select.value);
            this.$emit('update:modelValue', value ? value : this.$refs.select.value);
        },
        getText(value) {
            for (let i = 0; i < this.option.length; i++) {
                if (this.option[i].value === value || this.option[i].text === value) {
                    if (this.option[i].text) return this.option[i].text;
                    return this.option[i].value;
                    break;
                }
            }
        },
        arrowSelection(event) {
            if (event && this.option?.length) {
                if (event.code === 'ArrowUp' && this.currentSelection > 0) {
                    this.currentSelection -= 1;
                }
                if (event.code === 'ArrowDown' && this.currentSelection < this.option.length - 1) {
                    this.currentSelection += 1;
                }
                if (event.code === 'Enter' && this.currentSelection > -1) {
                    this.$refs.select.blur();
                    this.updateValue(this.option[this.currentSelection].value);
                }
            }
        },
        selectChoice(x) {
            this.updateValue(x.value || x);
            this.output(x);
        },
    }
};
</script>
<style lang="less" scoped>
input {
    cursor: default;
}

select {
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-right: 1.5em !important;
}

input, select {
    &:focus {
        & ~ .sui-dropdown-button {
            opacity: 1;
        }
    }
}

.sui-dropdown {
    & .sui-dropdown-list {
        line-height: calc(2.2rem - 4px);
        padding: 0 calc(var(--padding) / 2);
    }
}

.sui-dropdown-button {
    width: 1.5em;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-shrink: 0;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    pointer-events: none;
    opacity: 0.5;

    //&::before {
    //    content: "";
    //    border-top: .3em solid var(--content-text_soft);
    //    border-left: .25em solid transparent;
    //    border-right: .25em solid transparent;
    //}
}
</style>