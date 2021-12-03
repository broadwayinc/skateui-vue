<template lang='pug'>
.sui-card(ref="card" :class="{disabled}" :style="{'--padding':padding}")
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
            stickyContent: Object,
            padding: null
        };
    },
    mounted() {
        if(window.getComputedStyle(this.$refs.card).padding !== '0px') {
            this.padding = window.getComputedStyle(this.$refs.card).padding;
            this.$refs.card.style.padding = 0;
        }
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

    background-color: var(--content, #ffffff);
    color: var(--content-text, rgba(0, 0, 0, 0.88));
    position: relative;
    border-radius: var(--card-border-radius);
    box-sizing: border-box;

    box-shadow: 0 0 1px #808080;
    text-align: left;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;

    & > *:not(.full-width):not(.sui-title):not(.actions):not(.close):not(hr) {
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
        margin: var(--padding);

        & > .sui-button {
            &:not(:first-child) {
                @media @notphone {
                    margin-left: var(--padding);
                }
            }

            &.sui-button-nude {
                padding: calc(var(--padding) / 2);
                min-width: 0;

                &:first-child {
                    @media @notphone {
                        margin-left: calc(var(--padding) / 2 * -1);
                    }
                }

                &:last-child {
                    margin-right: calc(var(--padding) / 2 * -1);
                }
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
            right: var(--padding);
            top: var(--padding);
            display: block;
            z-index: 1;
        }

        & + .sui-title,
        & + .full-width {
            border-top-left-radius: var(--card-border-radius);
            border-top-right-radius: var(--card-border-radius);
            overflow: hidden;
        }

        & + .content,
        & + .sui-title {
            margin-right: var(--padding);
            padding-right: calc(var(--padding) * 2);
        }
    }

    & > * {
        box-sizing: border-box;
    }

    & .actions .sui-button + .sui-button {
        margin-left: var(--padding);
    }

    @media @phone {
        & .actions {
            display: flex;
            flex-direction: column-reverse;

            & > .sui-button {
                & + .sui-button {
                    margin-left: 0;
                }
                &:not(:last-child) {
                    margin-top: calc(var(--padding) / 2);
                }
            }
        }
    }

    & .footer {
        text-align: right;
    }

    & .footer {
        font-size: var(--subtitle-font);
        text-align: right;
        margin: var(--padding);
    }

    & .actions:nth-last-child(2) > * {
        margin-bottom: 0;
    }
}

</style>
