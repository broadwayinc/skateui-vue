<template lang='pug'>
label(:class="{'sui-toggle': type === 'toggle', 'sui-radio': type === 'radio', 'disabled': disabled, 'large': large }")
    p {{ label }}
    pre
    template(v-if="type === 'toggle'")
        input(type="checkbox" :value="value" :name="name" :disabled="disabled" :checked="checked")
        .toggle
    template(v-if="type === 'radio'")
        input(type="radio" :value="value" :name="name" :disabled="disabled" :checked="checked")
        .radio
</template>

<script>
export default {
    name: 'sui-toggle',
    props: {
        type: String,
        label: String,
        large: Boolean,
        disabled: Boolean,
        checked: Boolean,
        name: String,
        value: String || Number
    },
};
</script>
<style scoped lang="less">
label.sui-toggle {
    display: inline-block;
    position: relative;
    cursor: pointer;
    user-select: none;
    &.large {
        font-size:1.5em;
    }
    &.disabled {
        opacity: 0.5;
        user-select: none;
        cursor: default;
        & > .toggle {
            background-color: var(--content-text);
        }
    }

    *:not(pre) {
        font-size: 1em;
        display: inline-block;
    }

    * {
        vertical-align: middle;
        line-height: 2;
    }

    & > input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked + .toggle {
            &:after {
                right: 2px;
                background-color: var(--button-text);
                border: .1em solid var(--content_shade);
            }
            background-color: var(--button);
        }
    }

    &:active:not(.disabled) {
        .toggle {
            background-color: var(--button);
        }
    }

    .toggle {
        &:after {
            content: "";
            box-sizing: border-box;
            width: calc(1em - 8px);
            height: calc(1em - 8px);
            border-radius: 1em;
            position: absolute;
            top: 2px;
            right: calc(1.75em - 1em + 8px - 2px);
            background-color: var(--content);
            transition: right 0.066s;
            border: .1em solid var(--content-text_transparent);
        }

        display: inline-block;
        position: relative;
        height: calc(1em - 4px);
        width: 1.75em;
        font-size: 1.25em;
        left: -4px;
        border: 2px solid var(--shadow);
        background-color: var(--content-focus-nude);
        border-radius: 1em;
    }
}
label.sui-radio {
    display: inline-block;
    position: relative;
    cursor: pointer;
    user-select: none;

    &.large {
        font-size:1.5em;
    }

    &.disabled {
        opacity: 0.5;
        user-select: none;
        cursor: default;
    }

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
            border: 0.2em solid var(--content);
            box-sizing: border-box;
            background-color: var(--content-text);
        }
    }

    &:active:not(.disabled) {
        & > .radio {
            border-color: var(--content-focus);
            background-color: var(--content-text);
        }
    }

    .radio {
        font-size: 1.25em;
        display: inline-block;
        position: relative;
        width: calc(1em - 4px);
        height: calc(1em - 4px);
        box-sizing: border-box;
        left: -2px;
        border: 0.2em solid var(--content-text_transparent);
        box-shadow: 0 0 0 2px var(--content-text);
        border-radius: 1em;
        vertical-align: middle;
    }
}
</style>