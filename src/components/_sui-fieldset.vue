<template lang="pug">
fieldset.sui-fieldset(
    ref='fieldset'
    :id="elementId"
    @click='focus'
    :class="{'sui-fieldset-mini': setMini, 'sui-custom-autocomplete' :customAutocomplete, 'sui-fieldset-error': error, 'sui-fieldset-disabled': disabled}")
    legend(v-if="label && !setMini") {{ label }}
        span(v-if="required" style="color:var(--alert, 'tomato')") &nbsp;*
    .sui-fieldset-wrapper
        .slot-left(v-if="$slots['slot-left']")
            .slot-left-wrapper.slot-wrapper
                slot(name='slot-left')
        .sui-fieldset-interface
            .sui-fieldset-prefix(v-if="prefix" @click="()=>{focusInput(false)}")
                div {{ prefix }}
            .sui-fieldset-suffix(v-if="suffix" @click="focusInput")
                div {{ suffix }}
            slot
        .slot-right(v-if="$slots['slot-right']")
            .slot-right-wrapper.slot-wrapper
                slot(name='slot-right')
        label(v-if="label && !setMini" :for="elementId + '_interface'") {{ label }}
            span(v-if="required" style="color:var(--alert, 'tomato')" aria-hidden="true") &nbsp;*
    .sui-fieldset-message(:class="{'sui-fieldset-error': error}" v-if="!setMini") {{message}}
</template>

<script>
export default {
    name: 'sui-fieldset',
    props: {
        customAutocomplete: Boolean,
        error: [Boolean, String],
        label: String,
        type: {
            type: String,
            default: 'text'
        },
        prefix: String,
        suffix: String,
        required: [Boolean, String],
        disabled: Boolean,
        message: {
            type: String,
            default: null
        },
        mini: Boolean
    },
    data() {
        return {
            setMini: this.mini,
            parent: null
        };
    },
    mounted() {
        let parent = this.$refs.fieldset.parentNode.closest('fieldset.sui-fieldset');
        if (parent) {
            this.setMini = true;
            let slots = [
                parent.querySelectorAll('.slot-left > div > fieldset.sui-fieldset'),
                parent.querySelectorAll('.slot-right > div > fieldset.sui-fieldset')
            ];
            if (slots[0].length) {
                parent.classList.add('sui-fieldset-nesting-left');
            }
            if (slots[1].length) {
                parent.classList.add('sui-fieldset-nesting-right');
            }
        }
        this.parent = parent;
        this.inheritCss();
    },
    computed: {
        elementId() {
            return window.sui_generateId(this.$options.name);
        }
    },
    methods: {
        focus(el) {
            let f = el.target.contains(document.activeElement);
            if (f)
                this.inheritCss(true);
        },
        inheritCss(skipRadius) {
            let getComputedStyle = window.getComputedStyle(this.$refs.fieldset);
            let isNested = this.setMini && this.parent;
            [
                'color',
                'borderWidth',
                'borderColor',
                'borderRadius',
                'borderStyle',
                'backgroundColor'
            ].map(s => {
                if (s === 'borderColor') {
                    if (isNested) {
                        this.$refs.fieldset.style.setProperty('--borderFocusColor', 'inherit');
                    } else if (getComputedStyle[s] !== 'rgba(153, 153, 153, 0.5)') {
                        this.$refs.fieldset.style.setProperty('--borderFocusColor', getComputedStyle[s]);
                    }
                } else if (s === 'borderRadius') {
                    if (!skipRadius)
                        this.$refs.fieldset.style.setProperty('--' + s, isNested ? 'inherit' : `clamp(0px, ${getComputedStyle[s]}, 1.4em)`);
                } else if (s === 'backgroundColor') {
                    if (!this.$refs.fieldset.classList.contains('sui-fieldset-error') && getComputedStyle[s] !== 'rgba(0, 0, 0, 0)' || this.parent && !this.parent.classList.contains('sui-fieldset-error')) {
                        this.$refs.fieldset.style.setProperty('--backgroundColor', isNested ? 'inherit' : getComputedStyle[s]);
                    }
                } else {
                    this.$refs.fieldset.style.setProperty('--' + s, isNested ? 'inherit' : getComputedStyle[s]);
                }
            });
        },
        focusInput(e) {
            let elem = document.getElementById(this.elementId + '_interface');
            elem.focus();

            if (e === false) {
                elem.setSelectionRange(0, 0);
            } else {
                elem.setSelectionRange(elem.value.length, elem.value.length);
            }
        }
    }
};
</script>
<style lang="less">
@import '../assets/viewport.less';
.sui-fieldset {
    --borderWidth: 2px;
    --borderFocusColor: var(--saturate, #4848db);
    --borderRadius: var(--border-radius, 3px); /* fallback */
    --borderRadius: ~"clamp(0px, var(--border-radius, 3px), 1.4em)";
    --backgroundColor: var(--content, inherit);
    --color: var(--content-text, inherit);
    --borderStyle: solid;
    font-size: inherit;
    margin: var(--padding) 0 calc(var(--subtitle-font) + var(--padding) / 4);
    display: inline-block;
    vertical-align: middle;
    position: relative;
    text-align: left;
    box-sizing: border-box;
    border-width: 2px;
    border-style: solid;
    border-color: rgba(153, 153, 153, 0.5);
    padding: 0 calc(var(--padding) / 2);
    border-radius: var(--border-radius, 3px); /* fallback */
    border-radius: ~"clamp(0px, var(--border-radius, 3px), 1.4em)";
    max-width: 100%;
    height: var(--input-height);
    min-height: var(--min-input-height);;

    & > legend {
        position: relative;
        text-align: left;
        font-size: var(--subtitle-font);
        font-weight: normal;
        padding: 0 calc(var(--padding) / 4);
        margin: 0 calc(var(--padding) / 4 * -1);
        top: calc(-0.5em + var(--borderWidth));
        word-break: keep-all;
        display: inline;
        user-select: none;
        color: var(--content-text_soft, #808080);
        line-height: 0;
        opacity: 0;
    }

    & > .sui-fieldset-wrapper {
        margin: 0 calc(var(--padding) / 2 * -1);
        border-color: inherit;
        height: 100%;
        display: flex;
        //height: calc(100% + 4px);
        //margin-top: -2px;

        button.sui-button {
            min-width: 0;
            height: calc(2.2rem - 4px - var(--padding) / 4);
            min-height: calc(44px - 4px - var(--padding) / 4);
        }

        & > .sui-fieldset-interface {
            display: flex;
            position: relative;
            border-color: inherit;
            width: 100%;
            //& > * {
            //    min-height: calc(2.8em - 4px);
            //}

            & > input {
                word-break: keep-all;
                white-space: nowrap;
                text-align: inherit;
                height: 100%;

                &:focus + .sui-dropdown:not(:empty) {
                    top: 100%;
                    margin: 0;
                    display: block;
                    width: 100%;
                    left: calc(0px - var(--borderWidth));
                    z-index: 9999;
                    max-height: 50vh;
                    overflow-y: auto;

                    & > .sui-dropdown-list {
                        height: var(--input-height);
                        min-height: calc(var(--min-input-height) - 4px);
                        display: flex;
                        align-items: center;
                        padding: 0 calc(var(--padding) / 2);
                        text-align: left;
                        cursor: pointer;
                        font-size: .8em;

                        &.selected,
                        &:hover {
                            background-color: var(--content-focus_shadow, rgba(255, 255, 255, 0.066));
                        }
                    }

                    &.fullscreen {
                        top: 0;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        border: none;
                        position: fixed;
                        max-height: 100vh;

                        & > .sui-dropdown-list {
                            font-size: 1em;
                            padding: .75em 0.5em;
                            box-shadow: 0 calc(.5em + 1px) 0 -.5em rgba(128, 128, 128, 0.25);
                        }
                    }
                }

                & + .sui-dropdown, & + .sui-dropdown.fullscreen {
                    display: none;
                    position: absolute;
                    text-align: left;
                    background-color: var(--backgroundColor);
                    color: var(--color);
                    margin: 0;
                    border-style: var(--borderStyle);
                    border-width: var(--borderWidth);
                    border-color: var(--borderFocusColor);
                    border-top: none;

                    &:not(.fullscreen) {
                        border-bottom-left-radius: var(--borderRadius);
                        border-bottom-right-radius: var(--borderRadius);
                    }
                }
            }

            & > .sui-fieldset-prefix,
            & > .sui-fieldset-suffix {
                flex-shrink: 0;
                display: flex;
                align-items: center;
                line-height: calc(2.2em - 4px);
            }

            & > .sui-fieldset-prefix {
                justify-content: flex-end;
                flex-shrink: 0;

                &:not(:empty) {
                    padding-left: calc(var(--padding) / 2);

                    & ~ .sui-textarea-replica, & ~ input, & ~ select {
                        padding-left: 0;
                    }
                }
            }

            & > .sui-fieldset-suffix {
                order: 1;

                &:not(:empty) {
                    padding-right: calc(var(--padding) / 2);
                    flex-grow: 1;

                    & + input, & + .sui-textarea-replica {
                        padding-right: 0;
                    }
                }
            }
        }

        & > label {
            color: var(--content-text_soft, #808080);
            bottom: calc(100% - var(--borderWidth));
            position: absolute;
            padding: 0 calc(2px + var(--padding) / 4);
            font-size: var(--subtitle-font);
            font-weight: normal;
            left: calc(var(--padding) / 4);
            right: 0;
            line-height: 1;
        }


        input, select {
            width: 100%;

            &::placeholder {
                color: #999999;
            }

            &:not(select):not(.sui-textarea-replica):read-only {
                text-overflow: ellipsis;
                padding-right: 0.15em;
            }

            color: inherit;
            position: relative;
            flex-grow: 1;
            min-width: 1em;
            box-sizing: border-box;
            vertical-align: middle;
            background-color: transparent;
            font: inherit;
            font-size: 1em;
            border: none;
            outline: none;
            padding: 0 calc(var(--padding) / 2);
            margin: 0;
            display: block;
            line-height: initial;

            @media @nottablet {
                min-height: auto;
            }
        }

        & > .slot-right {
            order: 1;
            display: flex;
            align-items: flex-end;
        }

        // shift nested dropbox
        & > .slot-left > div > fieldset.sui-fieldset.sui-fieldset-mini {
            .sui-dropdown {
                left: calc(-.25em - var(--borderWidth) - 2px);
            }
        }

        & > .slot-right > div > fieldset.sui-fieldset.sui-fieldset-mini {
            .sui-dropdown {
                left: calc(0px - var(--borderWidth) + 0.25em + 2px);
            }
        }

        & > .slot-left, & > .slot-right {
            position: relative;
            flex-shrink: 0;
            max-width: 40%;

            & > .slot-wrapper:not(:empty) {
                &:after {
                    // icon separator
                    content: "";
                    width: 0;
                    height: 50%;
                    background-color: transparent;
                    border-right: 1px solid;
                    opacity: 25%;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }

            &.slot-left > .slot-wrapper:not(:empty) {
                &:after {
                    right: -1px;
                }
            }

            &.slot-right > .slot-wrapper:not(:empty) {
                &:after {
                    left: -1px;
                }
            }

            & > .slot-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                height: var(--input-height);
                min-height: var(--min-input-height);
                box-sizing: border-box;
                padding: calc(var(--padding) / 4) calc(var(--padding) / 4);

                @media @nottablet {
                    min-height: auto;
                    height: 100%;
                }

                & > * {
                    max-height: 100%;
                    display: block;
                }

                .sui-button {
                    height: 100%;
                    min-height: 0;
                    padding: 0 var(--padding);
                }

                // nested fieldset
                & > fieldset.sui-fieldset {
                    margin: 0;
                    border-color: transparent !important;
                    height: 100%;

                    & > .sui-fieldset-wrapper {
                        height: 100%;

                        & > .sui-fieldset-interface {
                            & > input, & > select {
                                min-height: 100%;

                                & + .sui-dropdown {
                                    top: calc(100% + .25em);
                                }
                            }
                        }
                    }
                }

                img {
                    border-radius: var(--borderRadius);
                }

                &:not(:empty) {
                    min-width: calc(2em);
                }

                & * {
                    align-self: center;
                }
            }
        }
    }

    &.sui-textarea {
        height: auto;

        & > .sui-fieldset-wrapper {
            height: calc(100% - 4px);
            min-height: calc(var(--min-input-height) - 4px);

            & .sui-fieldset-interface {
                align-items: center;
                padding: calc((var(--padding) / 4 ) + 1px) 0 calc((var(--padding) / 4 ) + .5px)  calc(var(--padding) / 2);
                width: 100%;

                & .wrapper {
                    width: 100%;

                    & textarea {
                        resize: none;
                        overflow: hidden;
                        min-height: 1em;
                        z-index: 1;
                        border: none;
                        padding: 0;
                        padding-right: calc(var(--padding) / 2);
                        width: 100%;

                        &::placeholder {
                            color: #999999;
                        }

                        &:read-only {
                            text-overflow: ellipsis;
                        }
                    }

                    & textarea {
                        /* Identical styling required!! */
                        box-sizing: border-box;
                        vertical-align: bottom;
                        background-color: transparent;
                        color: inherit;
                        line-height: inherit;
                        font-weight: inherit;
                        font-size: inherit;
                        outline: none;
                        border-top: none;
                        /* Place on top of each other */
                        grid-area: 1 e("/") 1 e("/") 2 e("/") 2;
                    }
                }
            }

            & > .slot-left, & > .slot-right {
                max-height: 44px;
            }
        }
    }

    &.sui-fieldset-mini {
        margin-bottom: 0;
        margin-top: 0;
        border-width: 2px;
    }

    &.sui-fieldset-disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    & > .sui-fieldset-message {
        position: absolute;
        font-size: var(--subtitle-font);
        text-align: right;
        line-height: 1;
        right: var(--borderWidth);
        bottom: calc(-1em - (var(--padding) / 4));
        font-weight: normal;

        &.sui-fieldset-error {
            color: var(--alert, #ff6347);
        }
    }

    &.sui-fieldset-error {
        border-color: var(--alert, #ff6347) !important;
        background-color: var(--alert_shadow, rgba(255, 99, 71, 0.066));

        & .sui-dropdown {
            border-color: var(--alert, #ff6347) !important;
        }

        label {
            color: var(--alert, #ff6347) !important;
        }
    }

    &:focus-within {
        border-color: var(--borderFocusColor);

        label, legend {
            color: var(--button-nude, inherit);
        }

        & {
            &.sui-custom-autocomplete:not(.sui-fieldset-nesting-left):not(.sui-fieldset-nesting-right):not(.sui-fieldset-nesting-focused) {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
            }

            &.sui-fieldset-nesting-focused.sui-fieldset-nesting-left:not(.sui-fieldset-nesting-block-left) {
                border-bottom-left-radius: 0 !important;
            }

            &.sui-fieldset-nesting-focused.sui-fieldset-nesting-right:not(.sui-fieldset-nesting-block-right) {
                border-bottom-right-radius: 0 !important;
            }
        }
    }
}
</style>