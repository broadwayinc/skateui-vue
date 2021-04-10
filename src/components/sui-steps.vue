<template lang='pug'>
div.sui-steps(:class="{ line: type === 'line', ring: type === 'ring' }" :style="{'--ring-count': steps.length, '--ring-status': completed}")
    svg
        circle.step(r="1.5em" cx="50%" cy="50%")
    svg
        circle.step(r="1.5em" cx="50%" cy="50%")
    .step(v-for="(step,idx) in steps" :class="{'complete': idx < completed, 'current': type === 'line' ? idx === completed : idx === completed - 1 }")
        template(v-if="typeof step === 'string'") {{ step.text ? step.text : step }}
        template(v-else)
            .left
                i.material-icons {{ step.icon }}
            | {{ step.text }}
</template>

<script>
export default {
    name: 'sui-steps',
    props: {
        type: String,
        steps: Array,
        completed: Number
    }
};
</script>
<style scoped lang="less">
@import '../assets/viewport.less';

div.sui-steps {
    display: flex;
    justify-content: space-between;

    &.line {
        overflow-x: scroll;

        svg {
            display: none;
        }

        .step {
            display: inline-flex;
        }
    }

    div.step {
        display: none;
        width: 100%;
        cursor: default;
        padding-right: 1em;
        padding-top: .25em;
        border-top: 3px solid var(--content-placeholder);
        color: var(--content-placeholder);
        flex-grow: 1;
        margin-right: 3px;
        font-weight: 500;

        & > .left {
            padding-right: .5em;

            i {
                vertical-align: middle;
            }
        }

        &.complete {
            border-top: 3px solid var(--content-focus_soft);
            color: var(--content-focus_soft);
        }

        &.current {
            border-top: 3px solid var(--content-focus);
            color: var(--content-focus);
            text-shadow: 1px 1px var(--content-text_transparent);
        }
    }

    &.ring {
        counter-reset: --ring-status var(--ring-status);
        position: relative;

        &::before {
            content: counter(--ring-status);
            position: absolute;
            display: flex;
            height: calc(3em + .5em);
            width: calc(3em + .5em);
            text-align: center;
            justify-content: center;
            align-items: center;
            font-weight: 500;
            text-shadow: 1px 1px var(--content-text_transparent);
        }

        padding-bottom: 0;

        & > svg {
            flex-shrink: 0;

            --PI: 3.14159265358979;
            --circum: calc(3 * var(--PI));

            margin-right: 1em;
            height: calc(3em + .5em);
            width: calc(3em + .5em);
            --offset: calc(var(--circum) - ((100 / var(--ring-count)) * var(--ring-status)) / 100 * var(--circum));

            circle {
                stroke-width: .5em;
                fill: transparent;
            }

            &:first-child {
                display: inline-block;
                position: absolute;

                circle {
                    stroke: var(--content-text_shadow);
                }

                & + svg {
                    display: block;
                    transform: rotate(-90deg);
                    transform-origin: 50% 50%;

                    circle {
                        stroke: var(--content-focus);
                        stroke-dasharray: calc(var(--circum) * 1em);
                        stroke-dashoffset: calc(var(--offset) * 1em);
                        transition: stroke-dashoffset .25s;
                    }
                }
            }
        }

        div.step.current {
            width: unset;
            display: inline-flex;
        }
    }
}
</style>
