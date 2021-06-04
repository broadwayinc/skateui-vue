<template lang='pug'>
label.sui-option(:class="{'sui-checkbox': type === 'checkbox', 'sui-radio': type === 'radio', disabled}")
    template(v-if="type === 'checkbox'")
        input(ref="option" type="checkbox" @input="updateValue()" :value="value || modelValue" :name="name" :disabled="disabled" :checked="checked")
        .checkbox
    template(v-if="type === 'radio'")
        input(ref="option" type="radio" @input="updateValue()" :value="value || modelValue" :name="name" :disabled="disabled" :checked="checked")
        .radio
    pre
    p {{ label }}
</template>

<script>
export default {
    name: 'sui-option',
    emits: ['update:modelValue', 'input'],
    props: {
        modelValue: String | Number | Boolean,
        type: {type: String, default: 'checkbox'},
        label: String,
        disabled: Boolean,
        checked: Boolean,
        name: String,
        value: String | Number | Boolean
    },
    methods: {
        updateValue(value) {
            this.$emit('input', JSON.parse(value ? value : this.$refs.option.checked));
            this.$emit('update:modelValue', JSON.parse(value ? value : this.$refs.option.checked));
        }
    }
};
</script>
<style scoped lang="less">
label.sui-option {
    --border-radius: 1px;

    div.checkbox, div.radio {
        color: var(--button-nude, inherit);
    }
}

label.sui-option.disabled {
    opacity: 0.25;
    user-select: none;
    cursor: default;

    div.checkbox, div.radio {
        box-shadow: 0 0 0 2px var(--content-text, black) !important;
        color: var(--content-text, black);
    }

    & > input:checked + .radio {
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

        &:checked + .checkbox {
            &:after {
                content: '✔';
                font-size: calc(1em - 8px);
                font-weight: bold;
                font-family: sans-serif;
            }
        }
    }

    .checkbox {
        font-size: 1.25em;
        line-height: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background-color: var(--content, white);
        color: var(--button-nude, black);
        width: calc(1em - 4px);
        height: calc(1em - 4px);
        box-sizing: border-box;
        left: 2px;
        border: 0.2em solid transparent;
        box-shadow: 0 0 0 2px var(--button-nude, black);
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

        &:checked + .radio {
            border: .2em solid var(--content, white);
            background-color: var(--button-nude, black);
        }

        & + .radio {
            font-size: 1.25em;
            display: inline-block;
            position: relative;
            width: calc(1em - 4px);
            height: calc(1em - 4px);
            box-sizing: border-box;
            left: 2px;
            border: 0.2em solid transparent;
            box-shadow: 0 0 0 2px var(--button-nude, black);
            border-radius: 1em;
            vertical-align: middle;
        }
    }
}
</style>