<template lang='pug'>
.sui-tooltip(:class="{left:isLeft, bottom: isBottom}" @mouseenter="setPosition")
    .content(:style='{width: maxWidth}')
        small
            slot
    i.material-icons.left help
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
            this.maxWidth = this.isLeft ? `${e.clientX}px` : `calc(${window.innerWidth - e.clientX}px)`;
        }
    }
};
</script>
<style scoped lang="less">
@import '../assets/viewport.less';

div.sui-tooltip {
    height: 1.25em;
    display: inline-block;
    position: relative;
    text-align: left;
    vertical-align: middle;
    cursor: pointer;

    &.bottom {
        & > .content {
            top: calc(0px + 2em);
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
        & > .content {
            left: unset;
            right: calc(-100% + 0.5em);
            text-align: right;

            &::after {
                left: calc(100% - 1em - 4px);
                border-right: .5em solid transparent;
                border-left: 0;
            }
            &::before {
                left: calc(100% - 1em - 4px);
                border-right: calc(.5em + 2px) solid transparent;
                border-left: 0;
            }
        }
    }

    & > .content {
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: calc(1em + 4px);
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
            left: calc(1em + 4px);
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
            text-align: left;
            background-color: var(--content-text, black);
            color: var(--content, white);
            padding: .5em 1em;
            box-shadow: 0 0 0 2px var(--content, white);
            border-radius: 8px;
        }

        width: 50vw;
        @media @tablet {
            width: 240px;
        }

        display: none;
        z-index: 9999;
        position: absolute;
        bottom: calc(0px + 2em);
        left: calc(-100% + 0.5em);
    }

    &:hover > .content {
        display: block;
    }
}
</style>
