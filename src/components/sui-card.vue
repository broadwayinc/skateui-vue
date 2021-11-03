<template lang='pug'>
.sui-card(:class="{disabled}")
    .close(v-if="typeof close === 'function'" @click.stop="close")
    slot
</template>

<script>
export default {
    name: 'sui-card',
    props: {
        disabled: Boolean,
        close: Function,
        value: String
    },
    data() {
        return {
            resizeEventId: null,
            stickyContent: Object
        };
    },
    destroyed() {
        window.sui_on.removeEvent.resize(this.resizeEventId);
    }
};
</script>
<style lang="less">
@import '../assets/viewport.less';
.sui-card {
    --card-indent: 1.3rem; /* fallback */
    --card-indent: ~"clamp(.65rem, 2vw, 1.3rem)";
    --card-border-radius: .5em; /* fallback */
    --card-border-radius: ~"clamp(0px, calc(var(--border-radius, 3px) * 2), .5em)";
    --padding-title: 0.5em var(--card-indent);
    --padding: var(--space-4);

    background-color: var(--content, #ffffff);
    color: var(--content-text, rgba(0, 0, 0, 0.88));
    position: relative;
    tab-size: 1em;
    border-radius: var(--card-border-radius);
    box-sizing: border-box;

    margin: 1px;
    box-shadow: 0 0 1px #808080;
    text-align: left;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;

    & > div:not(.full-width):not(.sui-title):not(.actions):not(.close),
    & .content {
        margin: var(--padding);
    }

    & > hr {
        border-color: var(--background_soft);
    }

    & > * {
        &:first-child {
            border-top-left-radius: var(--card-border-radius);
            border-top-right-radius: var(--card-border-radius);
            overflow: hidden;
        }

        &:last-child {
            border-bottom-left-radius: var(--card-border-radius);
            border-bottom-right-radius: var(--card-border-radius);
            overflow: hidden;
        }
    }

    & > .sui-title {

        &:first-child {
            border-top-left-radius: var(--card-border-radius);
            border-top-right-radius: var(--card-border-radius);
        }

        &.sui-sticky {
            margin-bottom: calc(var(--padding) * -1);
        }

        & + * {
            margin-top: 0;
        }
    }

    & .actions {
        margin: calc(var(--padding) / 2);

        & > .sui-button {
            margin-left: var(--padding);

            &.sui-button-nude {
                height: auto;
                min-height: auto;
                padding: calc(var(--padding) / 2);

                &:first-child {
                    margin-left: 0;
                }
            }
            &:first-child:not(.sui-button-nude) {
                margin-left: calc(var(--padding) / 2);
            }

            &:last-child:not(.sui-button-nude) {
                margin-right: calc(var(--padding) / 2);
            }
        }
    }

    &.disabled > *:not(.sui-title){
        opacity: .25;
        user-select: none;
        pointer-events: none;

        * {
            user-select: none !important;
            pointer-events: none !important;
        }
    }

    & .close {
        &::after {
            vertical-align: top;
            cursor: pointer;
            font-family: sans-serif;
            content: '✕';
            line-height: 1;
            opacity: 1; // can't hover pseudo element
            position: absolute;
            right: calc(var(--padding) / 1.5);
            top: calc(var(--padding) / 1.5);
            display: block;
            z-index: 1;
        }

        & + .sui-title,
        & + .full-width {
            border-top-left-radius: var(--card-border-radius);
            border-top-right-radius: var(--card-border-radius);
            overflow: hidden;
        }
    }

    & > * {
        box-sizing: border-box;
    }

    & > .sui-button + .sui-button {
        margin-left: var(--padding);
    }

    @media @phone {
        & .actions {
            display: flex;
            flex-direction: column-reverse;
        }
    }

    & .footer {
        text-align: right;
    }

    & .footer {
        font-size: 0.8rem;
        text-align: right;
        margin: var(--padding);
    }

    & .actions:nth-last-child(2) > * {
        margin-bottom: 0;
    }
}

</style>
