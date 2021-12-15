<template lang='pug'>
.sui-tooltip-wrapper
    .sui-tooltip(:class="{left:isLeft, bottom: isBottom}" @mouseenter="setPosition")
        slot(name="hover" v-if="$slots.hover")
        template(v-else)
            i.sui-tooltip-icon-builtin
        .sui-tooltip-dialog(:style='{width: maxWidth}')
            small
                slot
</template>

<script>
export default {
    name: 'sui-tooltip',
    props: {
        direction: String
    },
    data() {
        return {
            isBottom: false,
            isLeft: false,
            maxWidth: null
        };
    },
    methods: {
        setPosition(e) {
            let y = window.innerHeight / 2 - 21;
            let x = window.innerWidth / 2 + 21;

            this.isBottom = (e.clientY < y || this.direction?.includes('bottom')) && (!this.direction || !this.direction?.includes('top'));
            this.isLeft = (e.clientX > x || this.direction?.includes('left')) && (!this.direction || !this.direction?.includes('right'));
            this.maxWidth = this.isLeft ? `${e.clientX}px` : `${window.innerWidth - e.clientX}px`;
        }
    }
};
</script>
<style scoped lang="less">
@import '../assets/viewport.less';

.sui-tooltip-wrapper {
    display: inline-block;
    &:hover > .sui-tooltip > .sui-tooltip-dialog {
        display: block;
    }

    & > .sui-tooltip {
        position: relative;
        text-align: left;
        vertical-align: inherit;
        justify-content: center;
        align-items: center;
        --tooltip-border-radius: 3px; /* fallback */
        --tooltip-border-radius: ~"clamp(3px, calc(var(--border-radius, 3px) / 2), 1em)";

        .sui-tooltip-icon-builtin {
            display: flex;
            width: 1em;
            height: 1em;
            min-width: 21px;
            min-height: 21px;
            border-radius: 1em;
            background-color: var(--content-text, black);
            color: var(--content, white);
            box-shadow: 0 0 0 1px var(--content, black);
            justify-content: center;
            align-items: center;
            font-weight: normal;
            cursor: pointer;
            &:after {
                content: '\FF1F';
                font-style: normal;
                font-size: .8em;
            }
        }

        &.bottom {
            & > .sui-tooltip-dialog {
                top: calc(100% + .75em);
                bottom: unset;

                &::after {
                    margin-top: -0.5em;
                    margin-bottom: unset;
                    border-bottom: solid .5em var(--content-text, black);
                    border-top: 0;
                    bottom: unset;
                    top: 1px;
                }

                &::before {
                    margin-top: calc(-0.5em - 3px);
                    margin-bottom: unset;
                    border-bottom: solid calc(.5em + 2px) var(--content, white);
                    border-top: 0;
                    bottom: unset;
                    top: 0;
                    left: calc(1em - 2px);
                }
            }
        }

        &.left {
            & > .sui-tooltip-dialog {
                left: unset;
                right: calc(50% - 1.25em);
                text-align: right;

                &::after {
                    left: calc(100% - 1em);
                    border-right: .5em solid transparent;
                    border-left: 0;
                }

                &::before {
                    left: calc(100% - 1em + -1px);
                    border-right: calc(.5em + 6px) solid transparent;
                    border-left: 0;
                    top: 100%;

                }
            }
            &.bottom {
                & > .sui-tooltip-dialog {
                    &::before {
                        top: 1px;
                    }
                    &::after {
                        top: 2px;
                    }
                }
            }
        }

        & > .sui-tooltip-dialog {
            font-size: 1em;
            font-weight: normal;
            line-height: 1;
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 1em;
                width: 0;
                height: 0;
                border: 0.5em solid transparent;
                border-top-color: var(--content-text, black);
                border-bottom: 0;
                border-right: 0;
                margin-left: -0.25em;
                margin-bottom: -0.5em;
            }

            &::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 1em;
                width: 0;
                height: 0;
                border: calc(0.5em + 5px) solid transparent;
                border-top-color: var(--content, white);
                border-bottom: 0;
                border-right: 0;
                margin-left: calc(-0.25em - 1px);
                margin-bottom: calc(-0.5em - 3px);
                top: calc(100% + 1px);
                left: calc(1em + -2px);
            }

            small {
                line-height: 1.25;
                text-align: left;
                background-color: var(--content-text, black);
                color: var(--content, white);
                padding: calc(var(--padding) / 4) calc(var(--padding) / 2);
                box-shadow: 0 0 0 2px var(--content, white);
                border-radius: var(--tooltip-border-radius);
                font-size: var(--subtitle-font);
            }

            // right
            width: 50vw;
            @media @tablet {
                width: 240px;
            }

            display: none;
            z-index: 9999;
            position: absolute;
            bottom: calc(100% + .75em);
            left: calc(50% - 1.25em);
        }
    }
}

</style>
