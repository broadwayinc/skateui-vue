<template lang='pug'>
.sui-tooltip(:class="{left:isLeft, bottom: isBottom}" @mouseenter="setPosition")
    div(:style='{width: maxWidth}')
        small
            slot
    slot(name="hover" v-if="$slots.hover")
    template(v-else)
        i.sui-tooltip-icon-builtin
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
            let y = window.innerHeight / 2 - 24;
            let x = window.innerWidth / 2 + 24;

            this.isBottom = (e.clientY < y || this.direction?.includes('bottom')) && (!this.direction || !this.direction?.includes('top'));
            this.isLeft = (e.clientX > x || this.direction?.includes('left')) && (!this.direction || !this.direction?.includes('right'));
            this.maxWidth = this.isLeft ? `${e.clientX}px` : `${window.innerWidth - e.clientX}px`;
        }
    }
};
</script>
<style scoped lang="less">
@import '../assets/viewport.less';

div.sui-tooltip {
    //height: 1.25em;
    //display: inline-block;
    display: inline-flex;
    position: relative;
    text-align: left;
    vertical-align: middle;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    --tooltip-border-radius: 3px; /* fallback */
    --tooltip-border-radius: ~"clamp(3px, calc(var(--border-radius, 3px) / 2), 1em)";

    .sui-tooltip-icon-builtin {
        display: block;
        // total = 1.5 ; .8 +
        font-size: 1em;
        width: 1em;
        height: 1em;
        padding: .15em;
        border-radius: 1em;
        background-color: var(--content-text, black);
        color: var(--content, white);
        box-shadow: 0 0 0 .1em var(--content, black);

        &:after {
            content: '\FF1F';
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-style: normal;
            font-size: 1em;
        }
    }

    &.bottom {
        & > div {
            top: 2em;
            bottom: unset;

            &::after {
                margin-top: -0.5em;
                margin-bottom: unset;
                border-bottom: solid .5em var(--content-text, black);
                border-top: 0;
                bottom: unset;
                top: 0;
            }

            &::before {
                margin-top: calc(-0.5em - 3px);
                margin-bottom: unset;
                border-bottom: solid calc(.5em + 2px) var(--content, white);
                border-top: 0;
                bottom: unset;
                top: 0;
            }
        }
    }

    &.left {
        & > div {
            left: unset;
            right: calc(-100% + 0.5em + 3px);
            text-align: right;

            &::after {
                left: calc(100% - 1em);
                border-right: .5em solid transparent;
                border-left: 0;
            }

            &::before {
                left: calc(100% - 1em);
                border-right: calc(.5em + 2px) solid transparent;
                border-left: 0;
            }
        }
    }

    & > div {
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
            border: calc(0.5em + 2px) solid transparent;
            border-top-color: var(--content, white);
            border-bottom: 0;
            border-right: 0;
            margin-left: calc(-0.25em - 1px);
            margin-bottom: calc(-0.5em - 3px);
        }

        small {
            font-weight: normal;
            line-height: 1.25;
            text-align: left;
            background-color: var(--content-text, black);
            color: var(--content, white);
            padding: .75em 1em;
            box-shadow: 0 0 0 2px var(--content, white);
            border-radius: var(--tooltip-border-radius);
        }

        width: 50vw;
        @media @tablet {
            width: 240px;
        }

        display: none;
        z-index: 9999;
        position: absolute;
        bottom: calc(0px + 2em);
        left: -50%;
    }

    &:hover > div {
        display: block;
    }
}
</style>
