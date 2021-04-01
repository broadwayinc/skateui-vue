<template lang='pug'>
    div.sui-card(:class="{center: align === 'center'}")
        .title(v-if="hasTitleSlot()" :style="titleStyle")
            slot(name="title")
            .close(v-if="closeButton")
        .image(v-if="hasImageSlot()")
            slot(name="image")
        .content(v-if="hasContentSlot()" :class="{center: contentCenter}" :style="{opacity: disabled ? 0.5 : 1}")
            slot(name="content")
        slot
        .button_footer(v-if="hasButtonFooterSlot()" :class="{hideonphone: stickyMobileButtonFooter, sticky: stickyMobileButtonFooter, viewonphone: stickyMobileButtonFooter}")
            slot(name="buttonFooter")
        .footer(v-if="hasFooterSlot()" :style="{opacity: footerAlert !== false ? 1 : 0.5, color: footerAlert}")
            slot(name="footer")
</template>

<script>
export default {
    name: 'sui-card',
    props: {
        align: String,
        titleBackground: Boolean | String,
        titleColor: [String, Boolean],
        contentCenter: Boolean,
        footerAlert: [String, Boolean],
        stickyMobileButtonFooter: Boolean,
        closeButton: Boolean,
        disabled: Boolean
    },
    computed: {
        titleStyle() {
            console.log(this.titleColor)
            let color = (this.titleColor === '' || typeof this.titleColor === 'boolean') && this.titleColor !== false ? 'var(--content-focus-text)' : this.titleColor;
            let bgColor = (this.titleBackground === '' || typeof this.titleBackground === 'boolean') && this.titleBackground !== false ? 'var(--content-focus)' : this.titleBackground;
            return { color: color, backgroundColor: bgColor }
        }
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
<style scoped lang="less">
@import '../assets/viewport.less';
div.sui-card {
    tab-size: 1em;
    background-color: var(--content);
    color: var(--content-text);
    border-radius: 8px;
    padding: 0 1.3em;
    overflow: hidden;

    box-shadow: 0 0 0 2px var(--content-text_screen);
    text-align: left;
    max-width: calc(100% - 2.6em);

    display: inline-block;
    vertical-align: top;

    &.center {
        & .title, & .content, & .button_footer, & .footer {
            text-align: center;
        }
    }

    * {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-word;
    }

    & > .title, & > .image {
        overflow: hidden;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    & > .title:not(:empty) {
        position: relative;
        padding-top: 0.5rem;
        padding-left: 1.3em;
        padding-right: 1.3em;
        margin: 0 -1.3em;
        min-height: 2rem;
        line-height: 2rem;
        border-bottom: 1px solid var(--content-text_transparent);

        & > p, & > h1, & > h2, & > h3, & > h4, & > h5, & > h6, & > small {
            min-height: 2em;
            line-height: 2em;
            padding-top: 0.5em;
            margin-top: -0.5rem;
        }

        & > div:not(.close) {
            margin-top: -.5em;
        }

        & + .image {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }

        & > .close {
            &::after {
                content: '\00D7';
                font-size: 1.3em;
                line-height: 1;
                vertical-align: top;
            }

            cursor: pointer;
            width: 1.3em;
            text-align: center;
            display: block;
            position: absolute;
            right: 0.3em;
            top: 0.3em;
        }
    }


    & > .image:not(:empty) {
        margin: 0 -1.3em;

        * {
            width: 100%;
            display: block;
        }

        user-select: none;

        img {
            -webkit-user-drag: none;
            margin: 0 auto;
            max-width: 100%;
        }

        & + .content {
            padding-top: 0.8rem;
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
            }

            .quantity {
                text-align: right;
            }
        }

        & > hr {
            margin-top: 1em;
            border-left: 0;
            border-right: 0;
            margin-left: -.5em;
            margin-right: -.5em;
            max-width: unset;
            width: calc(100% + 1em);
        }

        &.center {
            text-align: center;
            padding-left: 0;
            padding-right: 0;

            h1, h2, h3, h4, h5, h6, p, small {
                text-align: center;
            }

            & + .button_footer {
                text-align: center;

                & + .footer {
                    text-align: center;
                }
            }
        }
    }

    & > .button_footer:not(.sticky) {
        text-align: right;

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

    & > .button_footer.sticky {
        text-align: right;
        position: fixed;
        overflow-y: hidden;
        overflow-x: scroll;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        background-color: var(--content);
        padding: 8px;
        border-top: 2px solid var(--content-text_transparent);
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
