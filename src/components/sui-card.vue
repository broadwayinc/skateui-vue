<template lang='pug'>
div.sui-card
    template(v-if="hasTitleSlot()")
        sui-sticky(v-if="stickyTitle" :style="{zIndex:1}")
            .title(:class="{hasCloseButton: typeof closeButton === 'function'}")
                slot(name="title")
                .close(v-if="typeof closeButton === 'function'" @click.stop="closeButton")
        .title(v-else :class="{hasCloseButton: typeof closeButton === 'function'}")
            slot(name="title")
            .close(v-if="typeof closeButton === 'function'" @click.stop="closeButton")
    .image(v-if="hasImageSlot()" :class="{disabled}")
        slot(name="image")
    .content(v-if="hasContentSlot()" :class="{center: contentCenter, disabled}")
        slot(name="content")
    slot
    .button(v-if="hasButtonFooterSlot()" :class="{disabled, sticky: stickyMobileButtonFooter}")
        slot(name="buttonFooter")
    .footer(v-if="hasFooterSlot()" :class="{disabled}")
        slot(name="footer")
</template>

<script>
export default {
    name: 'sui-card',
    props: {
        contentCenter: Boolean,
        stickyMobileButtonFooter: Boolean,
        closeButton: Function,
        disabled: Boolean,
        stickyTitle: Boolean
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
    .disabled {
        opacity: .5;
        user-select: none;
        pointer-events: none;

        * {
            user-select: none !important;
            pointer-events: none !important;
        }
    }

    tab-size: 1em;
    background-color: var(--content);
    color: var(--content-text);
    border-radius: 8px;

    --side-padding: 1.3em;

    box-sizing: border-box;
    @media @tablet {
        display: block;
    }

    @media @phone {
        --side-padding: .65em;
        //padding: 0 .65em;
        border-radius: 0;
    }

    padding: 0 var(--side-padding);

    box-shadow: 0 0 0 1px var(--content-text_shadow);
    text-align: left;
    max-width: 100%;
    //max-width: 100vw;

    display: inline-block;
    vertical-align: top;

    * {
        white-space: pre-wrap;
        word-break: break-word;
    }

    .title, & > .image {
        overflow: hidden;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .title:not(:empty) {
        background-color: var(--content);

        &.hasCloseButton {
            padding-right: 2rem;

            & > div:not(.close) {
                margin-right: -2rem;
            }
        }

        position: relative;
        padding-top: 0.5rem;
        padding-left: var(--side-padding);
        padding-right: var(--side-padding);
        margin: 0 calc(-1 * var(--side-padding));

        line-height: 2rem;
        border-bottom: 1px solid var(--content-text_shade);
        text-shadow: 1px 1px var(--content-text_shadow);

        & > p, & > h1, & > h2, & > h3, & > h4, & > h5, & > h6, & > small {
            min-height: 2em;
            line-height: 2em;
            padding-top: 0.5em;
            margin-top: -0.5rem;
        }

        & > div:not(.close) {
            margin: -.5em calc(-1 * var(--side-padding)) 0;
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
            }

            &:hover {
                opacity: 1;
            }

            opacity: .5;
            text-align: center;
            display: block;
            position: absolute;
            right: 0.5em;
            top: 0.5em;
            height: 1em;
        }
    }

    & > .image:not(:empty) {
        margin: 0 -1.3em;
        @media @phone {
            margin: 0 -.65em;
        }

        & > * {
            //width: 100%;
            display: block;
        }

        user-select: none;

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
        & > * {
            max-width: 100%;
        }

        h1, h2, h3, h4, h5 {
            text-shadow: 1px 1px rgba(0, 0, 0, 0.11);
        }

        padding: 2em 0.5rem 2.5em;
        line-height: 1.5em;

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
                border-radius: 4px;
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
                    text-shadow: 1px 1px var(--content-text_shadow);
                    text-decoration: underline;
                }
            }

            .price {
                font-size: 1.953em;
                color: var(--content-text_soft);
                text-shadow: 1px 1px var(--content-text_shadow);
                text-align: right;
                cursor: default;
                user-select: none;
                padding-right: .25em;
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
            max-width: unset;
            //width: calc(100% + 1em);
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
            background-color: var(--content);
            padding: 8px;
            border-top: 1px solid var(--content-text_transparent);
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
