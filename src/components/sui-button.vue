<template lang='pug'>
    a.sui-button(v-if="href" :href="href" :target="target ? target : null" :class="{nude: type === 'nude', icon: type === 'icon'}" :style="customStyle")
        slot
    button.sui-button(v-else @click="leftClick" :class="{nude: type === 'nude', icon: type === 'icon'}" :style="customStyle" :disabled="disabled")
        slot(v-if="!loading")
        i.material-icons(v-if="type === 'icon'") {{ icon }}
        ._loader(v-if="loading")
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
            type: Boolean,
            default: false
        },
        customStyle: Object
    },
    methods: {
        leftClick() {
            this.$emit('click');
        },
    }
};
</script>
<style scoped lang="less">
.sui-card .sui-button {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
}
button.sui-button, a.sui-button {
    border-radius: 2px;

    max-width: calc(100vw - 3.6rem);
    min-width: 8rem;
    min-height: 2.8rem;
    padding: .25rem 1rem;
    margin: 0.25rem;
    display: inline-block;
    box-sizing: border-box;
    text-align: center;

    line-height: calc(2rem - 4px);
    font-size: 0.88rem;
    cursor: pointer;
    user-select: none;

    border: solid 0.2rem var(--button-border);


    font-weight: 500;
    //text-shadow: 0 0 8px var(--button);
    background-color: var(--button);
    color: var(--button-text);
    text-transform: uppercase;

    ._loader {
        display: inline-block;
        border: .15em solid var(--content-text_transparent);
        border-radius: 50%;
        border-top: .15em solid var(--button-text);
        vertical-align: middle;
        margin: -0.22rem 0;
        width: 1rem;
        height: 1rem;
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
        box-shadow: 0 0 0 2px var(--shade);
    }

    &:active {
        box-shadow: none;
        border-color: var(--button-border);
    }

    &.nude {
        background-color: unset;
        color: var(--button-nude);
        box-shadow: none;
        border: solid 0.25rem transparent;
        text-shadow: none;
        font-weight: 600;

        &:hover {
            text-shadow: 1px 1px var(--transparent);
        }

        &:active {
            text-shadow: none;
            box-shadow: none;
        }

        & ._loader {
            border-top: .15em solid var(--content-text);
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
