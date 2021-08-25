<template lang='pug'>
a.sui-button(
    v-if="href"
    @click="click"
    :href="disabled ? null : href" :target="target ? target : null"
    :class="{'sui-button-disabled': disabled, 'sui-button-nude': nude, 'sui-button-round': round}")
    slot(v-if="$slots.default")
    template(v-else) {{href}}
button.sui-button(
    v-else
    ref="button"
    :type="type"
    :form='formId'
    @click="click"
    :class="{'sui-button-nude': nude, 'sui-button-round': round, 'sui-button-loading': showLoading}"
    :disabled="disabled"
    @focus="focus"
    :aria-label="showLoading ? 'loading' : null")
    .sui-button_loader(v-if="showLoading")
    // button text length should be retained while showing loading animation
    span(:style="{opacity: showLoading ? 0 : 1}")
        slot

</template>

<script>
export default {
    name: 'sui-button',
    emits: ['click', 'focus'],
    props: {
        type: String,
        form: String,
        nude: Boolean,
        disabled: Boolean,
        href: String,
        target: String,
        round: Boolean,
        loading: {
            type: Boolean || Function,
            default: false
        },
        autofocus: Boolean
    },
    data() {
        return {
            loading_onclick: false
        };
    },
    computed: {
        showLoading() {
            return this.loading_onclick || this.loading === true;
        },
        formId() {
            if (this.type === 'submit') {
                if (this.form)
                    return this.form;
            }
            return null;
        }
    },
    mounted() {
        let bk = this.$el.style.backgroundColor || this.$el.style.background;
        if (bk)
            this.$el.style.setProperty('--button-background-color', bk);

        this.$nextTick(() => {
            if (this.autofocus)
                this.$refs.button.focus();
        });
    },
    methods: {
        focus(e) {
            this.$emit('focus', e);
        },
        async click(e) {
            if (this.loading_onclick)
                return;

            if (typeof this.loading === 'function') {
                this.loading_onclick = true;

                let p = this.loading(e);

                if (p instanceof Promise)
                    await p;

                this.loading_onclick = false;
            } else
                this.$emit('click', e);
        },
    }
};
</script>
<style scoped lang="less">
.sui-button {
    margin: 0;
    flex-shrink: 0;
    white-space: pre-wrap;
    word-break: break-word;
    --button-border-radius: var(--border-radius, 3px);

    & + .sui-button {
        margin-left: 0.25rem;
    }
}

button.sui-button, a.sui-button {
    border-radius: var(--button-border-radius);
    max-width: calc(100vw - 3.6rem);
    min-width: 8rem;
    height: 2.8rem;
    padding: 0 0.9rem;
    display: inline-block;
    box-sizing: border-box;

    text-align: center;
    font-size: 0.88rem;
    vertical-align: middle;

    line-height: 100%;

    & > span * {
        line-height: 100%;
        vertical-align: bottom;
        font-size: 1em;
    }

    cursor: pointer;
    user-select: none;
    box-shadow: inset 0 0 0 3px rgba(128, 128, 128, 0.05);

    position: relative;
    overflow: hidden;

    font-weight: 500;
    background-color: var(--button-background-color, var(--button, #4848db));
    color: var(--button-color, var(--button-text, white));
    text-transform: uppercase;

    .sui-button_loader {
        position: absolute;
        right: calc(50% - 1.15em);
        top: calc(50% - 1.15em);
        display: inline-block;
        border: .15em solid rgba(153, 153, 153, 0.5);
        border-top: .15em solid;
        color: var(--button-color, var(--button-text, white));
        border-radius: 50%;
        vertical-align: middle;
        margin: .5em;
        width: 1em;
        height: 1em;
        animation: spin 2s linear infinite;
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }

    &:hover {
        box-shadow: 0 0 0 1px rgba(128, 128, 128, 0.25);
    }

    &:active {
        box-shadow: none;
    }

    &.sui-button-nude {
        background-color: unset;
        color: var(--button-nude, inherit);
        box-shadow: none;
        text-shadow: none;

        .sui-button_loader {
            border-top: .15em solid;
        }

        &:not(.sui-button-loading):hover {
            text-shadow: 1px 1px rgba(128, 128, 128, 0.12);
        }

        &:active {
            text-shadow: none;
            box-shadow: none;
        }
    }

    &.sui-button-loading {
        color: transparent;
    }

    &.sui-button-round {
        min-width: 2.8rem;
        border-radius: 2.8rem;
    }

    &:disabled {
        opacity: 0.5;

        &:hover {
            box-shadow: none;
        }
    }
}

a.sui-button {
    text-decoration: none;
    line-height: 2.8rem;

    &.sui-button-disabled {
        opacity: 0.5;
    }
}
</style>
