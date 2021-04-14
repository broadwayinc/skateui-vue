<template lang='pug'>
    .sui-tooltip(:id="id" :class="{left:isLeft, bottom: isBottom}" @mouseenter="setPosition")
        .content
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
            id: null,
            arrowHeight: 13.5,
            bottomBlocked: false,
            topBlocked: false,
            rightBlocked: false,
            leftBlocked: false
        }
    },
    mounted() {
        this.id = this.elementId();
    },
    computed: {
        isLeft() {
            if(this.leftBlocked) return false;
            if(this.rightBlocked) return true;
            return this.direction === 'left' || this.direction === 'bottom-left'
        }  ,
        isBottom() {
            if(this.bottomBlocked) return false;
            if(this.topBlocked) return true;
            return this.direction === 'bottom' || this.direction === 'bottom-left'
        }
    },
    methods: {
        elementId() {
            return window.sui_generateId(this.$options.name);
        },
        setPosition() {
            let windowHeight = window.innerHeight;
            let windowWidth = window.innerWidth;
            let el = document.getElementById(this.id);

            if(windowHeight - el.getBoundingClientRect().y < el.querySelector('.content').clientHeight + this.arrowHeight) {
                this.bottomBlocked = true;
            } else {
                this.bottomBlocked = false;
            }
            if(el.getBoundingClientRect().y < el.querySelector('.content').clientHeight + this.arrowHeight) {
               this.topBlocked = true;
            } else {
                this.topBlocked = false;
            }
            if(windowWidth - el.getBoundingClientRect().x < el.querySelector('.content').clientWidth) {
                this.rightBlocked = true;
            } else {
                this.rightBlocked = false;
            }
            if(el.getBoundingClientRect().x < el.querySelector('.content').clientWidth) {
                this.leftBlocked = true;
            } else {
                this.leftBlocked = false;
            }
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

    &.bottom {
        & > .content {
            top: calc(0px + 2em);
            bottom: unset;

            &::before {
                content: "";
                width: 0;
                height: 0;
                position: absolute;
                top: calc(0px - .75em);
                left: calc(1em - 3px);
                border-top: none;
                border-bottom: .75em solid var(--content-text);
                border-left: .5em solid transparent;
                border-right: .5em solid transparent;
            }
        }
    }

    &.left {
        & > .content {
            left: unset;
            right: calc(-100% + 0.5em);
            text-align: right;

            &::before {
                right: calc(1em - 3px);
                left: unset;
            }
        }
    }

    & > .content {
        &::before {
            content: "";
            width: 0;
            height: 0;
            position: absolute;
            bottom: calc(0px - .75em);
            left: calc(1em - 3px);
            border-top: .75em solid var(--content-text);
            border-left: .5em solid transparent;
            border-right: .5em solid transparent;
        }

        small {
            text-align: left;
            background-color: var(--content-text);
            color: var(--content);
            padding: .5em 1em;
            box-shadow: 0 0 0 3px var(--content-text_transparent);
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

    @media @touch {
        &:active > .content {
            display: block;
        }
    }

    & > .left {
        cursor: pointer;
        font-size: 1.25em;
        line-height: 1em;
    }
}
</style>
