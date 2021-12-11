<template lang='pug'>
a.sui-button(
    v-if="href"
    @click="click"
    :href="disabled ? null : href" :target="target ? target : null"
    :class="{'sui-button-disabled': disabled, 'sui-button-nude': nude, 'sui-button-round': round}")
    span
        slot(v-if="$slots.default")
        template(v-else) {{href}}
button.sui-button(
    v-else
    ref="button"
    :type="type"
    :form='formId'
    @click="click"
    :class="{'sui-button-nude': nude, 'sui-button-round': round, 'sui-button-loading': showLoading, 'icon': icon}"
    :disabled="disabled"
    @focus="focus"
    :aria-label="loading ? 'loading' : null")
    .sui-button_loader-wrapper(v-if="loading")
        .sui-button_loader
        // button text length should be retained while showing loading animation
    span(:style="{display: showLoading ? 'none' : 'inline-block'}" v-else-if="!icon")
        slot
    i.material-icons(v-else) {{ icon }}

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
        icon: String
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
@import '../assets/viewport.less';
.sui-button {
    margin: 0;
    flex-shrink: 0;
    white-space: pre-wrap;
    word-break: break-word;
    --button-border-radius: var(--border-radius, 3px);
    font-size: inherit;

    &.icon {
        font-size: 1em;
        min-width: var(--min-input-height);
        min-height: var(--min-input-height);
        border-radius: 50%;
        height: var(--input-height);
        width: var(--input-height);
        padding: 0;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        & i.material-icons {
            font-size: inherit;
        }
    }

    & span {
        font-size: 1em;
    }
}

button.sui-button, a.sui-button {
    border-radius: var(--button-border-radius);
    min-width: var(--min-input-width);
    max-width: 100%;
    min-height:  var(--min-input-height);
    padding: 0 var(--padding);
    display: inline-block;
    box-sizing: border-box;
    font-size: 1em;
    text-align: center;

    cursor: pointer;
    user-select: none;
    box-shadow: inset 0 0 0 3px rgba(128, 128, 128, 0.05);

    position: relative;
    overflow: hidden;

    background-color: var(--button, #4848db);
    color: var(--button-text, white);
    text-transform: uppercase;

    & .sui-button_loader-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .sui-button_loader {
        border-bottom: .15em solid rgba(153, 153, 153, 0.5);
        border-right: .15em solid rgba(153, 153, 153, 0.5);
        border-left: .15em solid rgba(153, 153, 153, 0.5);
        border-top: .15em solid;
        border-radius: 50%;
        font-size: inherit;
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
        background-color: transparent;
        color: var(--button-nude, inherit);
        box-shadow: none;
        text-shadow: none;
        font-weight: bold;

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

    &:disabled {
        opacity: 0.5;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

        &:hover {
            box-shadow: none;
        }
    }
}

a.sui-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    &.sui-button-disabled {
        opacity: 0.5;
    }

    & > span {
        display: flex;
        align-items: center;
        height: 100%;
        white-space: nowrap;
    }
}
</style>
