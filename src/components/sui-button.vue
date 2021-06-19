<template lang='pug'>
a.sui-button(v-if="href" @click="click" :href="disabled ? null : href" :target="target ? target : null" :class="{disabled, nude, icon}")
    i.material-icons(v-if="icon") {{ icon || 'link' }}
    slot(v-else-if="$slots.default")
    template(v-else) {{href}}
button.sui-button(v-else :type="type" @click="click" :class="{nude, icon}" :disabled="disabled")
    i.material-icons(v-if="icon") {{ icon || 'check' }}
    ._loader(v-else-if="showLoading")
    slot(v-else)
</template>

<script>
export default {
    name: 'sui-button',
    emits: ['click'],
    props: {
        type: String,
        nude: Boolean,
        disabled: Boolean,
        href: String,
        target: String,
        icon: [Boolean, String],
        loading: {
            type: Boolean || Function,
            default: false
        },
    },
    data() {
        return {
            loading_onclick: false
        };
    },
    computed: {
        showLoading() {
            return this.loading_onclick || this.loading === true;
        }
    },
    mounted() {
        let bk = this.$el.style.backgroundColor || this.$el.style.background;
        if (bk)
            this.$el.style.setProperty('--button-background-color', bk);
    },
    methods: {
        async click(e) {
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
    padding: .25rem 1rem;
    display: inline-block;
    box-sizing: border-box;
    text-align: center;

    font-size: 0.88rem;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    box-shadow: inset 0 0 0 3px rgba(128, 128, 128, 0.05);

    position: relative;
    overflow: hidden;

    font-weight: 500;
    background-color: var(--button-background-color, var(--button, #4848db));
    color: var(--button-color, var(--button-text, white));
    text-transform: uppercase;

    ._loader {
        display: inline-block;
        border: .15em solid rgba(128, 128, 128, 0.5);
        border-top: .15em solid;
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

    &.nude {
        background-color: unset;
        color: var(--button-nude, inherit);
        box-shadow: none;
        text-shadow: none;

        ._loader {
            border-top: .15em solid;
        }

        &:hover {
            text-shadow: 1px 1px rgba(128, 128, 128, 0.12);
        }

        &:active {
            text-shadow: none;
            box-shadow: none;
        }
    }

    &.icon {
        min-width: 2.8rem;
        border-radius: 2.8rem;
        width: 2.8rem;
        height: 2.8rem;
        padding: 0;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        & > * {
            line-height: 2rem;
            width: 1.15rem;
            font-size: 1.15rem;
            vertical-align: middle;
        }
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
    padding-top: 0;
    padding-bottom: 0;

    &.disabled {
        opacity: 0.5;
    }
}
</style>
