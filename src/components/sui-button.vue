<template lang='pug'>
    button.sui-button(:class="{nude: type === 'nude', icon: type === 'icon'}" :style="customStyle")
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
        icon: String,
        loading: {
            type: Boolean,
            default: false
        },
        customStyle: Object
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
    vertical-align: middle;
    cursor: pointer;
    user-select: none;

    border: solid 0.25rem var(--button-focus);
    box-shadow: 0 0 0 0.125rem var(--shadow);
    font-weight: 500;
    text-shadow: 0 0 8px var(--button-focus);
    background-color: var(--button-focus_faded);
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
        background-color: var(--button-focus);
    }

    &:active {
        box-shadow: none;
        border: solid 0.25rem var(--shade);
    }

    &.nude {
        background-color: unset;
        color: var(--button);
        box-shadow: none;
        border: solid 0.25rem transparent;
        text-shadow: none;
        font-weight: 600;

        &:hover {
            text-shadow: 1px 1px var(--content-text_shadow);
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
}
</style>
