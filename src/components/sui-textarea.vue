<template lang='pug'>
    div.sui-textarea(:class="{ left: buttonLeft, right: buttonRight}")
        .textarea
            textarea(:placeholder="placeholder" rows="1")
        label {{ label }}
        fieldset
            legend {{ label }}
        template(v-if="buttonLeft &&  this.$listeners.leftClick")
            button.left(:disabled="disabled" :style="buttonLeft.style")
                template(v-if="buttonLeft.text") {{ buttonLeft.text }}
                template(v-else)
                    i.material-icons {{ buttonLeft.icon }}
        template(v-else-if="buttonLeft")
            .left
                img(src="@/assets/myface.jpg" style="width: calc(100% - 12px);height: calc(100% - 12px);border-radius: 100%;display: block;")
                //i.material-icons {{buttonLeft.icon}}
        template(v-if="buttonRight && this.$listeners.rightClick")
            button.right(:disabled="disabled" :style="buttonRight.style" @click="rightClick")
                template(v-if="buttonRight.text") {{ buttonRight.text }}
                template(v-else)
                    i.material-icons {{ buttonRight.icon }}
        template(v-else-if="buttonRight")
            .right
                i.material-icons {{ buttonRight.icon }}
</template>

<script>
export default {
    name: 'sui-textarea',
    props: {
        placeholder: {
            type: String,
            default: null
        },
        label: String,
        button: {
            type: [Array, Object],
            default: null
        },
    },
    data() {
      return {
          buttonLeft: null,
          buttonRight: null,
      }
    },
    created() {
        if (this.button !== null) {
            if (Array.isArray(this.button)) {
                this.button.forEach(button => {
                    if (button.position === 'right') {
                        this.buttonRight = {
                            ...button,
                            ...{
                                style: {
                                    paddingBottom: button.text ? '0.4rem' : null,
                                    fontSize: button.text ? '1.8rem' : null
                                }
                            }
                        }
                    } else if (button.position === 'left') {
                        this.buttonLeft = {
                            ...button,
                            style: {
                                paddingBottom: button.text ? '0.4rem' : null,
                                fontSize: button.text ? '1.8rem' : null
                            }
                        }
                    }
                })
            }
        }
    },
    mounted() {

    }
};
</script>
<style lang="less">
@import '../assets/viewport.less';
div.sui-textarea {
    position: relative;

    &.left {
        & > .textarea {
            & > textarea,
            &::after {
                // make space for icon
                padding-left: calc(2.8rem + .75em);
            }
        }

        & > .left {
            // the icon
            position: absolute;
            width: 2.8rem;
            height: 2.8rem;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;

            &::after {
                // icon separator
                content: "";
                width: 2px;
                height: 1.4rem;
                background-color: var(--content-text_shadow);
                position: absolute;
                right: -1px;
            }
        }
    }

    &.focus {
        & fieldset {
            border-color: var(--content-focus);
        }

        & > .left {
            color: var(--content-focus);
        }

        & > label {
            &::after {
                background-color: var(--content-focus);
            }

            &::before {
                background-color: var(--content-focus);
            }

            color: var(--content-focus);
        }
    }

    &.right {
        & > .textarea {
            & > textarea,
            &::after {
                padding-right: 3.3em;
            }
        }

        & > .right {
            display: inline-flex;
            width: 2.8em;
            height: 2.8em;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 0;
            bottom: 1px;
            cursor: pointer;
            z-index: 1;

            &::before {
                // icon separator
                content: "";
                width: 2px;
                height: 1.4em;
                background-color: var(--content-text_shadow);
                position: absolute;
                left: -1px;
            }

            &:hover {
                color: var(--content-focus);
                background-color: var(--content-focus_screen);
            }
        }
    }

    label {
        width: calc(100% - 4px);
        left: 12px;
        text-align: left;
        box-sizing: border-box;
        line-height: 1em;
        overflow: hidden;
        position: absolute;
        font-size: 0.8rem;
        font-weight: 500;
        white-space: nowrap;
        color: var(--content-text_soft);
        text-shadow: 1px 1px var(--content-text_shadow);

        & ~ fieldset {
            top: -12px;
        }

        &:not(:empty) {
            margin-top: calc(-1em + 3px);
            padding-left: 0.5em;
        }

        &:empty {
            overflow: inherit;

            &::after {
                bottom: -2px;
            }

            &::before {
                background-color: transparent;
                bottom: -2px;
            }
        }
    }

    fieldset {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        text-align: left;
        border: 2px solid var(--content-text_transparent);

        legend {
            position: relative;
            top: -0.4rem;
            font-size: 0.8rem;
            font-weight: 500;
            padding: 0 4px;
            word-break: keep-all;
            visibility: hidden;
        }
    }

    & > .textarea {
        position: relative;
        vertical-align: middle;
        display: inline-grid;
        min-height: 2.8em;
        width: 100%;
        text-shadow: 1px 1px var(--content-text_shadow);

        &::after {
            content: attr(data-replica) " ";
            white-space: pre-wrap;
            visibility: hidden;
        }

        & > textarea {
            resize: none;
            overflow: hidden;
            min-height: 1em;
            z-index: 1;
            border: none;

            &::placeholder {
                color: var(--content-placeholder);
            }

            &:read-only {
                text-overflow: ellipsis;
            }
        }

        & > textarea,
        &::after {
            /* Identical styling required!! */
            box-sizing: border-box;
            vertical-align: middle;
            background-color: transparent;
            color: var(--content-text);
            line-height: 1.5em;

            padding: calc(0.515em + 1px) 0.75em;
            font-size: 1rem;
            outline: none;
            border-color: var(--content-text_transparent);
            box-shadow: inset 0 0 0 4px var(--content-focus_screen);
            border-top: none;
            /* Place on top of each other */
            grid-area: 1 e("/") 1 e("/") 2 e("/") 2;
        }
    }
}
</style>
