<template lang='pug'>
.sui-accordion
    .sui-accordion-head(onclick="sui_accordion.handler(event)")
        .sui-accordion-title {{title}}
        hr
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

        hr {
            display: none;
        }

        & > .sui-accordion-title:not(:empty) {
            & + hr {
                display: block;
                margin-top: 0;
                border-left: 0;
                border-right: 0;
                max-width: unset;
                //width: 100%;
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
            //padding-left: .25rem;
            box-sizing: border-box;
            width: 100%;
            cursor: pointer;
            position: relative;
            line-height: 2rem;

            color: var(--content-text_soft);

            &:hover {
                text-shadow: 1px 1px var(--content-text_shadow);
                color: var(--content-text);

                &::after {
                    text-shadow: 1px 1px var(--content-text_shadow);
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
    }
}
</style>
