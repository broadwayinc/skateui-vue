<template lang='pug'>
label.sui-option(:class="{'sui-checkbox': type === 'checkbox', 'sui-radio': type === 'radio', disabled}")
    template(v-if="type === 'checkbox'")
        input(
            ref="option"
            type="checkbox"
            @focus="focus"
            @change="updateValue"
            :value="modelValue || value"
            :name="name"
            :disabled="disabled"
            :checked="isChecked")
        .sui-option-checkbox-div
    template(v-if="type === 'radio'")
        input.sui-option-radio(
            ref="option"
            type="radio"
            @focus="focus"
            @change="updateValue"
            @trigger="updateValue_trigger"
            :value="modelValue || value"
            :name="name"
            :disabled="disabled"
            :checked="isChecked")
        .sui-option-radio-div
    pre
    p {{ label }}
</template>

<script>
export default {
    name: 'sui-option',
    emits: ['update:modelValue', 'input', 'focus'],
    props: {
        modelValue: [String, Number, Boolean, Number],
        value: [Array, String, Boolean, Number],
        type: {type: String, default: 'checkbox'},
        label: String,
        disabled: Boolean,
        name: String,
        checked: Boolean,
        autofocus: Boolean
    },
    data() {
        return {
            initValue: null
        };
    },
    created() {
        this.initValue = this.modelValue || this.value;
    },
    mounted() {
        this.toggleCheck(this.checked);
        this.$nextTick(() => {
            if (this.autofocus) {
                this.$refs.option.focus();
            }
        });
    },
    computed: {
        isChecked() {
            if (this.$refs.option && this.$refs.option.checked !== this.checked) {
                this.toggleCheck(this.checked);
            }
            return this.checked;
        }
    },
    methods: {
        toggleCheck(checked) {
            if (checked) {
                this.$emit('input', this.initValue);
                this.$emit('update:modelValue', this.initValue);
            } else {
                this.$emit('input', null);
                this.$emit('update:modelValue', null);
            }
        },
        focus(e) {
            this.$emit('focus', e);
        },
        updateValue_trigger(e) {
            this.toggleCheck(e.target.checked);
        },
        updateValue(e) {
            this.toggleCheck(e.target.checked);
            if (this.type === 'radio') {
                let trigger = new Event("trigger");
                let optionEl = document.getElementsByClassName('sui-option-radio');
                for (let i = 0; optionEl.length > i; i++) {
                    if (optionEl[i].name && optionEl[i].name === this.name) {
                        if (!optionEl[i].isEqualNode(e.target) && !optionEl[i].checked && e.target.value !== optionEl[i].value) {
                            optionEl[i].dispatchEvent(trigger);
                        }
                    }
                }
            }
        }
    }
};
</script>
<style scoped lang="less">
label.sui-option {
    --border-radius: 1px;

    .sui-option-checkbox-div, .sui-option-radio-div {
        color: var(--button-nude, inherit);
    }
}

label.sui-option.disabled {
    opacity: 0.25;
    user-select: none;
    cursor: default;

    .sui-option-checkbox-div, .sui-option-radio-div {
        box-shadow: 0 0 0 2px var(--content-text, black) !important;
        color: var(--content-text, black);
    }

    & > input:checked + .sui-option-radio-div {
        background-color: var(--content-text, black) !important;
    }

}

label.sui-option.sui-checkbox {
    display: inline-block;
    position: relative;
    cursor: pointer;
    user-select: none;

    *:not(pre) {
        font-size: 1em;
        display: inline-block;
    }

    & > * {
        vertical-align: middle;
        line-height: 2em;
    }

    & > input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked + .sui-option-checkbox-div {
            &:after {
                content: '✔';
                //content: '✓';
                font-size: calc(1em - 8px);
                font-weight: normal;
            }
        }
    }

    .sui-option-checkbox-div {
        font-size: 1.25em;
        line-height: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background-color: var(--content, inherit);
        color: var(--button-nude, inherit);
        width: calc(1em - 4px);
        height: calc(1em - 4px);
        box-sizing: border-box;
        left: 2px;
        border: 0.2em solid transparent;
        box-shadow: 0 0 0 2px var(--button-nude, var(--content-text, black));
        border-radius: var(--border-radius);
        vertical-align: middle;
    }
}

label.sui-option.sui-radio {
    display: inline-block;
    position: relative;
    cursor: pointer;
    user-select: none;

    * {
        line-height: 2;
        vertical-align: middle;
    }

    *:not(pre) {
        font-size: 1em;
        display: inline-block;
    }

    & > input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked + .sui-option-radio-div {
            border: .2em solid var(--content, white);
            background-color: var(--button-nude, var(--content-text, black));
        }

        & + .sui-option-radio-div {
            font-size: 1.25em;
            display: inline-block;
            position: relative;
            width: calc(1em - 4px);
            height: calc(1em - 4px);
            box-sizing: border-box;
            left: 2px;
            border: 0.2em solid transparent;
            box-shadow: 0 0 0 2px var(--button-nude, var(--content-text, black));
            border-radius: 1em;
            vertical-align: middle;
        }
    }
}
</style>