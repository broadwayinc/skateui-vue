<template lang='pug'>
.sui-accordion
    .sui-accordion-head(@click="() => {isOpen = !isOpen}")
        .sui-accordion-title {{title}}
        .sui-accordion-action
            i.material-icons(v-if="isOpen") expand_less
            i.material-icons(v-else) expand_more
    .sui-accordion-content-wrapper(:class="{open: isOpen}")
        .sui-accordion-content(ref="content")
            slot
</template>
<script>
export default {
    name: 'sui-accordion',
    data() {
        return {
            isOpen: false,
            maxHeight: 0
        }
    },
    props: {
        title: String,
    },
    mounted() {
        this.maxHeight = this.$refs.content.offsetHeight;
    }
};
</script>
<style lang="less">
div.sui-accordion {
    position: relative;
    margin: var(--padding) 0;

    & > .sui-accordion-head {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-bottom: 1px solid var(--content-text_shade);
        padding: 0 var(--padding);
        cursor: pointer;
        height: 2em;

        & > .sui-accordion-title:not(:empty) {
            box-sizing: border-box;
            width: 100%;
            position: relative;
            line-height: 2em;
            color: inherit;

            & + hr {
                display: block;
                margin-top: 0;
                border-left: 0;
                border-right: 0;
                max-width: unset;
            }

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
        
        & .sui-accordion-action {
            cursor: pointer;

            &,
            & i {
                font-size: 1em;
                line-height: 1;
                height: 1em;
            }
        }
    }

    & > .sui-accordion-content-wrapper {
        overflow: hidden;
        max-height: 0;
        transition: max-height .5s;

        &.open {
            max-height: 100%;
            transition: max-height .5s;
        }
        & .sui-accordion-content {
            padding: calc(var(--padding) / 2) var(--padding);
            color: var(--content-text_soft, #808080);

            & img {
                margin-left: -0.5em;
                width: calc(100% + 0.5em);
            }
        }
    }
}
</style>
