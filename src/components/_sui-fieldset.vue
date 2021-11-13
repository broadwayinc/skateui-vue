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
            div
                slot(name='slot-left')
        .sui-fieldset-interface
            .sui-fieldset-prefix(v-if="prefix" @click="()=>{focusInput(false)}")
                div {{ prefix }}
            .sui-fieldset-suffix(v-if="suffix" @click="focusInput")
                div {{ suffix }}
            slot
        .slot-right(v-if="$slots['slot-right']")
            div
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

//.sui-screen {
//    .sui-fieldset {
//        width: 100%;
//        margin: 0;
//        border-top-color: transparent !important;
//        border-left-color: transparent !important;
//        border-right-color: transparent !important;
//
//        .sui-fieldset-wrapper {
//            .sui-dropdown {
//                border-color: transparent !important;
//                top: calc(2.8em - var(--borderWidth)) !important;
//
//                & > .sui-dropdown-list {
//                    font-size: 1em !important;
//                    padding: .75em 0.5em !important;
//                    box-shadow: 0 calc(.5em + 1px) 0 -.5em rgba(128, 128, 128, 0.25);
//                }
//            }
//        }
//    }
//}

.sui-fieldset {
    --borderWidth: 2px;
    --borderFocusColor: var(--saturate, #4848db);
    --borderRadius: var(--border-radius, 3px); /* fallback */
    --borderRadius: ~"clamp(0px, var(--border-radius, 3px), 1.4em)";
    --backgroundColor: var(--content, inherit);
    --color: var(--content-text, inherit);
    --borderStyle: solid;
    margin: var(--padding) 0;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    max-width: 100%;
    text-align: left;
    box-sizing: border-box;
    border-width: 2px;
    border-style: solid;
    border-color: rgba(153, 153, 153, 0.5);
    padding: 0 calc(var(--padding) / 2);
    border-radius: var(--border-radius, 3px); /* fallback */
    border-radius: ~"clamp(0px, var(--border-radius, 3px), 1.4em)";

    & > legend {
        position: relative;
        text-align: left;
        font-size: 0.8em;
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
        margin: 0 -.5em;
        display: flex;
        border-color: inherit;

        button.sui-button {
            min-width: 0;
            height: calc(2.2rem - 4px - var(--padding) / 4);
            min-height: calc(44px - 4px - var(--padding) / 4);
        }

        & > .sui-fieldset-interface {
            display: flex;
            flex-grow: 1;
            position: relative;
            border-color: inherit;

            //& > * {
            //    min-height: calc(2.8em - 4px);
            //}

            & > input {
                word-break: keep-all;
                white-space: nowrap;
                text-align: inherit;

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
                        padding: calc(var(--padding) / 2);
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
                //line-height: calc(2.8em - calc(var(--borderWidth) * 2));
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
                color: var(--content-text_placeholder, #999999);
                align-items: flex-end;

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
            padding: 0 calc(var(--padding) / 4);
            font-size: 0.8em;
            font-weight: normal;
            left: calc(var(--padding) / 4);
            right: 0;
        }


        input, .sui-textarea-replica, select {
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
            //min-height: calc(2.8em - calc(var(--borderWidth) * 2));
            height: calc(2.2rem - 4px);
            min-height: 42px;
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

        .sui-textarea-replica {
            position: relative;
            vertical-align: middle;
            display: inline-grid;
            min-height: 44px;
            padding: calc(var(--padding) / 4);
            height: auto;

            @media @nottablet {
                min-height: calc(2.2rem - 4px);
            }

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
                    color: #999999;
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

        & > .slot-left {
            margin-right: calc(var(--padding) / 4);
        }

        & > .slot-right {
            order: 1;
            display: flex;
            align-items: flex-end;
        }

        // shift nested dropbox
        & > .slot-left > div > fieldset.sui-fieldset.sui-fieldset-mini {
            .sui-dropdown {
                //left: calc(-0.25em - var(--borderWidth) * 2);
                left: calc(-.25em - var(--borderWidth) - 2px);
            }
        }

        & > .slot-right > div > fieldset.sui-fieldset.sui-fieldset-mini {
            .sui-dropdown {
                //right: calc(-0.25em - var(--borderWidth) * 2);
                //left: calc(-0.25em + 2px);
                left: calc(0px - var(--borderWidth) + 0.25em + 2px);
            }
        }

        & > .slot-left, & > .slot-right {
            position: relative;
            flex-shrink: 0;
            max-width: 40%;

            & > div:not(:empty) {
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

            &.slot-left > div:not(:empty) {
                &:after {
                    right: calc(var(--padding) / 4 * -1);
                }
            }

            &.slot-right > div:not(:empty) {
                &:after {
                    left: calc(var(--padding) / 4 * -1);
                }
            }

            & > div {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                //height: calc(2.8em - calc(var(--borderWidth) * 2));
                height: 2.2rem;
                min-height: 44px;
                box-sizing: border-box;
                padding: calc(var(--padding) / 4);

                @media @nottablet {
                    min-height: auto;
                }

                & > * {
                    max-height: 100%;
                    display: block;
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
                    min-width: calc(2.8em - .6em - calc(var(--borderWidth) * 2));
                }
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
        font-size: .8em;
        text-align: right;
        line-height: 1em;
        min-height: 1em;
        position: absolute;
        right: var(--borderWidth);
        top: calc(100% + var(--padding) / 4);
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