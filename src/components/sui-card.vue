<template lang='pug'>
div.sui-card(:class="{disabled}")
    template(v-if="hasTitleSlot()")
        sui-sticky.title(v-if="stickyTitle" :class="{hasCloseButton: typeof close === 'function'}")
            slot(name="title")
            .close(v-if="typeof close === 'function'" @click.stop="close")
        .title(v-else :class="{hasCloseButton: typeof close === 'function'}")
            slot(name="title")
            .close(v-if="typeof close === 'function'" @click.stop="close")
    hr
    .image(v-if="hasImageSlot()")
        slot(name="image")
    .content(v-if="hasContentSlot()" :class="{center: contentCenter}")
        slot(name="content")
    slot
    .button(v-if="hasButtonFooterSlot()" :class="{sticky: stickyMobileButton}")
        slot(name="buttonFooter")
    .footer(v-if="hasFooterSlot()")
        slot(name="footer")
</template>

<script>
export default {
    name: 'sui-card',
    props: {
        contentCenter: Boolean,
        stickyMobileButton: Boolean,
        disabled: Boolean,
        stickyTitle: Boolean,
        close: Function
    },
    data() {
        return {
            resizeEventId: null
        };
    },
    destroyed() {
        window.sui_on.removeEvent.resize(this.resizeEventId);
    },
    methods: {
        hasTitleSlot() {
            return !!this.$slots.title;
        },
        hasImageSlot() {
            return !!this.$slots.image;
        },
        hasContentSlot() {
            return !!this.$slots.content;
        },
        hasButtonFooterSlot() {
            return !!this.$slots.buttonFooter;
        },
        hasFooterSlot() {
            return !!this.$slots.footer;
        }
    }
};
</script>
<style lang="less">
@import '../assets/viewport.less';

div.sui-card {
    &.disabled {
        opacity: .25;
        user-select: none;
        pointer-events: none;

        * {
            user-select: none !important;
            pointer-events: none !important;
        }
    }

    tab-size: 1em;
    background-color: var(--content, #ffffff);
    color: var(--content-text, rgba(0, 0, 0, 0.88));

    --card-indent: 1.3rem; /* fallback */
    --card-indent: ~"clamp(.65rem, 2vw, 1.3rem)";
    --card-border-radius: ~"clamp(0px, calc(var(--border-radius, 3px) * 2), .5em)";
    --padding-title: 0.5em var(--card-indent) 0.15em;

    border-radius: var(--card-border-radius);
    box-sizing: border-box;

    padding: 0 var(--card-indent);
    margin: 1px;
    box-shadow: 0 0 1px #808080;
    text-align: left;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;

    & > hr {
        border-left: 0;
        border-right: 0;
        margin: 0 calc(-1 * var(--card-indent) + .65em);
        max-width: 100vw;
        position: relative;
        top: -2px;

        &:not(:first-child) + .image {
            position: relative;
            top: -4px;
        }
    }

    & > * {
        box-sizing: border-box;
    }

    @media @tablet {
        display: block;
    }

    * {
        //white-space: pre-wrap;
        //word-break: break-word;
    }

    & > .sui-sticky {
        background-color: var(--content, #ffffff);
        box-shadow: 0 1px rgba(128, 128, 128, 0.5);
    }

    .title, & > .image:nth-child(2) {
        overflow: hidden;
        border-top-left-radius: var(--card-border-radius);
        border-top-right-radius: var(--card-border-radius);
    }

    & > .image {
        overflow: hidden;
    }

    hr:first-child {
        display: none;
    }

    .title:not(:empty) {
        z-index: 1;
        position: relative;
        padding: var(--padding-title);
        margin: 0 calc(-1 * var(--card-indent));
        line-height: 2em;

        &.hasCloseButton {
            padding-right: 2rem;

            & > div:not(.close) {
                // custom title div
                margin-right: -2rem;

                & + .close {
                    // hide close button
                    opacity: 0;
                }

                &::after {
                    // close button overlay
                    vertical-align: top;
                    cursor: pointer;
                    font-family: sans-serif;
                    content: '✕';
                    line-height: 1;
                    opacity: 1; // can't hover pseudo element
                    position: absolute;
                    right: 0.5em;
                    top: 0.5em;
                }
            }
        }

        & > p, & > h1, & > h2, & > h3, & > h4, & > h5, & > h6, & > small {
            min-height: 2em;
            line-height: 2em;
            padding-top: 0.5em;
            margin-top: -0.5rem;
        }

        & > div:not(.close) {
            margin: -.5em calc(-1 * var(--card-indent)) -.15em;
        }

        & + .image {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }

        & > .close {
            &::after {
                content: '✕';
                line-height: 1;
                vertical-align: top;
                cursor: pointer;
                font-family: sans-serif;
            }

            position: absolute;
            right: 0.5em;
            top: 0.5em;
        }
    }

    & > .image:not(:empty) {
        margin: 0 calc(-1 * var(--card-indent));
        user-select: none;

        & > * {
            display: block;
        }

        & > img {
            -webkit-user-drag: none;
            margin: 0 auto;
            width: 100%;
            max-width: 100%;
        }

        & + .content {
            padding-top: 0.8rem;

            & + .button:not(.sticky) {
                padding-top: 0;
            }
        }
    }

    & > .content:not(:empty) {
        width: 100%;
        padding: 2em 0.5rem 2.5em;
        line-height: 1.5em;

        & > * {
            max-width: 100%;
        }

        h1, h2, h3 {
            text-shadow: 1px 1px rgba(0, 0, 0, 0.11);
        }

        & > .cart {
            margin: 0px -.5em;
            width: calc(100% + 1em);
            max-width: unset;

            * {
                vertical-align: top;
            }

            & > img {
                margin-bottom: 1.3em;
                width: 24vw;
                height: 24vw;
                max-width: 160px;
                max-height: 160px;
                border-radius: var(--card-border-radius);
                object-fit: contain;
                display: inline;
                float: left;
                margin-right: 1rem;
            }

            .detail {
                font-weight: 500;
                display: inline;
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }

            .price {
                font-size: 1.953em;
                color: var(--content-text_soft, rgba(0, 0, 0, 0.66));
                text-shadow: 1px 1px var(--content-text_shadow, rgba(0, 0, 0, 0.033));
                text-align: right;
                cursor: default;
                user-select: none;
                padding-right: .25em;
                line-height: 1.25;
                margin-top: 1em;
            }

            .quantity {
                text-align: right;
            }
        }

        & > hr, .sui-accordion hr {
            margin-top: 1em;
            border-left: 0;
            border-right: 0;
            margin-left: -.5em;
            margin-right: -.5em;
            max-width: 100vw;
        }

        &.center {
            text-align: center;
            padding-left: 0;
            padding-right: 0;

            h1, h2, h3, h4, h5, h6, p, small {
                text-align: center;
            }

            & + .button {
                text-align: center;

                & + .footer {
                    text-align: center;
                }
            }
        }
    }

    & > .button:not(.sticky) {
        text-align: right;
        padding-top: 0.8rem;

        &:not(:empty) {
            padding-bottom: 1.5em;

            @media @phone {
                display: flex;
                flex-direction: column-reverse;

                .sui-button {
                    display: block;
                    margin: 8px auto;

                    &.nude {
                        text-decoration: underline;
                    }

                    &:first-child {
                        margin-bottom: 0;
                    }
                }
            }

            & + .footer {
                text-align: right;
            }
        }
    }

    & > .button.sticky:not(empty) {
        padding-bottom: 1.5em;
        @media @phone {
            text-align: right !important;
            position: fixed;
            overflow-y: hidden;
            overflow-x: scroll;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            background-color: var(--content, #ffffff);
            padding: 8px;
            border-top: 1px solid rgba(128, 128, 128, 0.5);
        }
    }

    & > .footer {
        font-size: 0.8rem;

        &:not(:empty) {
            padding-bottom: 1.5em;
            line-height: 1.5em;
        }
    }
}
</style>
