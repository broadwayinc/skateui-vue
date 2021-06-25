<template lang='pug'>
.sui-accordion
    .sui-accordion-head(onclick="sui_accordion.handler(event)")
        .sui-accordion-title {{title}}
    .sui-accordion-content
        slot
</template>
<script>
export default {
    name: 'sui-accordion',
    props: {
        title: String
    },
    mounted() {
        if (!window.sui_accordion) {
            window.sui_accordion = {
                timeout: null,
                handler: (ev) => {
                    let el = ev.target.closest('.sui-accordion');

                    if (!el)
                        return;

                    let bool = !el.classList.contains('minus');

                    if (bool)
                        el.classList.add('minus');
                    else
                        el.classList.remove('minus');

                    if (el)
                        el = el.lastChild;

                    if (window.sui_accordion.timeout)
                        clearTimeout(window.sui_accordion.timeout);
                    window.sui_accordion.timeout = null;

                    if (bool) {
                        el.style.maxHeight = '100vh';
                        window.sui_accordion.timeout = setTimeout(() => {
                            // use this.$nextTick() for vue
                            el.style.maxHeight = 'unset';
                        }, 750);
                    } else {
                        el.style.maxHeight = '100vh';
                        window.sui_accordion.timeout = setTimeout(() => {
                            el.style.maxHeight = '0';
                        }, 100);
                    }
                }
            };
        }
    }
};
</script>
<style lang="less">
div.sui-accordion {
    position: relative;

    & > .sui-accordion-head {

        border-bottom: 1px solid var(--content-text_soft);

        & > .sui-accordion-title:not(:empty) {
            & + hr {
                display: block;
                margin-top: 0;
                border-left: 0;
                border-right: 0;
                max-width: unset;
            }

            &::after {
                content: "+";
                font-size: 1.5em;
                line-height: 2rem;
                position: absolute;
                right: 0;
                font-weight: 300;
                width: 1em;
                text-align: center;
            }

            padding-right: 1.5em;
            padding-left: 0.5em;
            box-sizing: border-box;
            width: 100%;
            cursor: pointer;
            position: relative;
            line-height: 2rem;
            color: inherit;

            &:hover {
                text-shadow: 1px 1px var(--content-text_shadow, rgba(0, 0, 0, 0.033));
                color: inherit;

                &::after {
                    text-shadow: 1px 1px var(--content-text_shadow, rgba(0, 0, 0, 0.033));
                }

                & + hr {
                    opacity: 1;
                }
            }
        }
    }

    &.minus > .sui-accordion-head > .sui-accordion-title {
        &::after {
            content: "-";
        }
    }

    & > .sui-accordion-content {
        overflow: hidden;
        max-height: 0;
        transition: max-height .5s;
        padding-left: 0.5em;
        color: var(--content-text_soft, #808080);

        & img {
            margin-left: -0.5em;
            width: calc(100% + 0.5em);
        }
    }
}
</style>
