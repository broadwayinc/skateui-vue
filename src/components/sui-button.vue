<template lang='pug'>
a.sui-button(v-if="href" @click="click" :href="href" :target="target ? target : null" :class="{nude: type === 'nude', icon: type === 'icon'}")
    i.material-icons(v-if="type === 'icon'") {{ icon || 'link' }}
    slot(v-else-if="$slots.default")
    template(v-else) {{href}}
button.sui-button(v-else :type="typeAttribute" @click="click" :class="{nude: type === 'nude', icon: type === 'icon'}" :disabled="disabled")
    i.material-icons(v-if="type === 'icon'") {{ icon || 'check' }}
    ._loader(v-else-if="showLoading")
    slot(v-else)
</template>

<script>
export default {
    name: 'sui-button',
    props: {
        type: {
            type: String
        },
        disabled: Boolean,
        href: String,
        target: String,
        icon: String,
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
        },
        typeAttribute() {
            for (let t of ['button', 'submit', 'reset']) {
                if (this.type === t) return t;
            }
            return null;
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
    white-space: pre-wrap;
    word-break: break-word;
    --button-border-radius: var(--border-radius, 4px);
    & + .sui-button {
        margin-left: 0.25rem;
    }
}

button.sui-button, a.sui-button {
    border-radius: var(--button-border-radius);
    max-width: calc(100vw - 3.6rem);
    min-width: 8rem;
    min-height: 2.8rem;
    padding: .25rem 1rem;
    display: inline-block;
    box-sizing: border-box;
    text-align: center;

    line-height: calc(2rem - 4px);
    font-size: 0.88rem;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    //border: solid 3px var(--button-background-color, var(--button-border, #4646b5));

    position: relative;
    overflow: hidden;
    &:before {
        position: absolute;
        /* zero all offsets */
        top: 0; right: 0; bottom: 0; left: 0;
        /* doesn't work in Firefox */
        backdrop-filter: blur(9px);
        /* doesn't work in Edge */
        --button-border-calc: calc(100% - var(--button-border-radius));
        --poly: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0,
        var(--button-border-radius) var(--button-border-radius),
        var(--button-border-radius) var(--button-border-calc),
        var(--button-border-calc) var(--button-border-calc),
        var(--button-border-calc) var(--button-border-radius),
        var(--button-border-radius) var(--button-border-radius));
        clip-path: var(--poly);
        content: ''
    }

    font-weight: 500;
    background-color: var(--button-background-color, var(--button, #4848db));
    color: var(--button-color, var(--button-text, white));
    text-transform: uppercase;

    ._loader {
        display: inline-block;
        border: .15em solid var(--content-text_transparent, #7f7f7f);
        border-radius: 50%;
        border-top: .15em solid;
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
        box-shadow: 0 0 0 1px var(--content-text_shade, rgba(0, 0, 0, 0.066));
    }

    &:active {
        box-shadow: none;
    }

    &.nude {
        background-color: unset;
        color: var(--button-nude, inherit);
        box-shadow: none;
        border: solid 3px transparent;
        text-shadow: none;

        &:hover {
            text-shadow: 1px 1px var(--content-text_shade, rgba(0, 0, 0, 0.066));
        }

        &:active {
            text-shadow: none;
            box-shadow: none;
        }

        & ._loader {
            border-top: .15em solid inherit;
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
            line-height: calc(2rem - 4px);
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
}
</style>
