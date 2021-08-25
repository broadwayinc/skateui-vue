<template lang="pug">
.sui-fieldset(:id="elementId" :class="{small}")
    fieldset.sui-label(
        ref='label'
        :class="{ label: !!label && !small, showSelector, error, disabled, select: type === 'select' || type === 'fullscreen-select' || type === 'autocomplete'}")
        legend(v-if="label && !small") {{ label }}
            span(v-if="required") &nbsp;*
        .sui-fieldset-wrapper
            .button-left(v-if="$slots['button-left']")
                div
                    slot(name='button-left')
            .text-pack
                .prefix(v-if="prefix" @click="()=>{focusInput(false)}")
                    div {{ prefix }}
                .suffix(v-if="suffix" @click="focusInput")
                    div {{ suffix }}
                slot
                .dropdown(@click="focusInput")
            .button-right(v-if="$slots['button-right']")
                div
                    slot(name='button-right')
            label(v-if="label && !small" :for="elementId + '_input'")
                span {{ label }}
                span(v-if="required" style="color:var(--alert, 'tomato')") &nbsp;*
    .sui-fieldset-message(:class="{error: error}" v-if="!small") {{message}}
</template>

<script>
export default {
    name: 'ss-label',
    props: {
        showSelector: Boolean,
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
        small: Boolean
    },
    data() {
        return {
            msg: null
        };
    },
    watch: {
        error(v) {
            if (this.msg) {
                if (v)
                    this.msg.classList.add('error');
                else if (this.msg.classList.contains('error'))
                    this.msg.classList.remove('error');
            }
        }
    },
    computed: {
        elementId() {
            return window.sui_generateId(this.$options.name);
        }
    },
    methods: {
        focusInput(e) {
            let elem = document.getElementById(this.elementId + '_input');
            elem.focus();

            if (e === false) {
                elem.setSelectionRange(0, 0);
            } else {
                elem.setSelectionRange(elem.value.length, elem.value.length);
            }
        }
    },
    mounted() {
        let el = this.$refs.label;
        let input = [el.querySelector('textarea'), el.querySelector('input'), el.querySelector('select')];
        for (let i of input) {
            if (i) {
                i.id = this.elementId + '_input';
                break;
            }
        }

        let sui_textarea = {
            init: (el) => {
                let setup = (el) => {
                    el.setAttribute('rows', '1');
                    let parent = el.parentElement;
                    let replica = document.createElement('div');
                    replica.classList.add('textarea');
                    parent.insertBefore(replica, el);
                    replica.append(el);
                    el.addEventListener('input', (e) => {
                        let target = e.target;
                        target.parentNode.dataset.replica = target.value;
                    });
                    el.addEventListener('focus', (e) => {
                        let target = e.target;
                        let par = target.parentNode.parentNode.parentNode;
                        if (par.classList.contains('sui-textarea') && !par.classList.contains('focus')) {
                            par.classList.add('focus');
                        }
                    });
                    el.addEventListener('blur', (e) => {
                        let target = e.target;
                        let par = target.parentNode.parentNode.parentNode;
                        if (par.classList.contains('sui-textarea') && par.classList.contains('focus')) {
                            par.classList.remove('focus');
                        }
                    });
                };

                setup(el);
            }
        };

        if (this.type === 'textarea') {
            sui_textarea.init(document.getElementById(this.elementId + '_input'));
        }
    }
};
</script>
<style lang="less">
@import '../assets/viewport.less';

.sui-fieldset {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    max-width: 100%;

    &.small {
        margin-bottom: -1em;
        margin-top: -1em;
    }

    --border-weight: 2px;
}

.sui-screen {
    & > .sui-fieldset {
        width: 100%;

        fieldset.sui-label {
            margin: 0;
            border-top-color: transparent !important;
            border-left-color: transparent !important;
            border-right-color: transparent !important;

            .sui-fieldset-wrapper {
                .option {
                    border-color: transparent !important;
                    top: calc(2.8em - var(--border-weight)) !important;

                    & > .menu {
                        font-size: 1em !important;
                        padding: .75em 0.5em !important;
                        box-shadow: 0 calc(.5em + 1px) 0 -.5em rgba(128, 128, 128, 0.25);
                    }
                }
            }
        }
    }
}

fieldset.sui-label {
    margin: 1em 0;
    display: inline-block;
    width: calc(100% - 1em - calc(var(--border-weight) * 2));

    &.disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    &.label {
        margin-top: 0.5em;
    }

    & + .sui-fieldset-message {
        font-size: .8em;
        text-align: right;
        line-height: 1em;
        min-height: 1em;
        position: absolute;
        right: var(--border-weight);
        bottom: 0;

        &.error {
            color: var(--alert, #ff6347);
        }
    }

    &.error {
        border-color: var(--alert, #ff6347) !important;
        background-color: var(--alert_shadow, rgba(255, 99, 71, 0.066));

        & .option {
            border-color: var(--alert, #ff6347) !important;
        }

        label {
            color: var(--alert, #ff6347) !important;
        }
    }

    position: relative;
    text-align: inherit;
    border: var(--border-weight) solid rgba(153, 153, 153, 0.5);

    padding: 0 .5em;
    border-radius: var(--border-radius, 3px); /* fallback */
    border-radius: ~"clamp(0px, var(--border-radius, 3px), 1.4em)";
    vertical-align: middle;

    &.showSelector:focus-within {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    &:focus-within {
        border-color: var(--saturate, #4848db);

        label {
            color: var(--button-nude, inherit);
        }

        .button-left, .button-right {
            color: var(--button-nude, inherit);
        }
    }

    legend {
        position: relative;
        text-align: left;
        font-size: 0.8em;
        font-weight: normal;
        padding: 0 .25em;
        top: 0;
        line-height: calc(1.3em + var(--border-weight));
        word-break: keep-all;
        display: inline;
        user-select: none;
        color: var(--content-text_soft, #808080);
        visibility: hidden;
    }

    .sui-fieldset-wrapper {
        margin: 0 -.5em;
        display: flex;
        position: relative;

        .sui-button {
            min-width: 0;
        }

        .dropdown {
            width: 1.5em;
            align-items: center;
            justify-content: center;
            display: none;
            flex-shrink: 0;

            &::before {
                content: "";
                border-top: .3em solid var(--content-text, inherit);
                border-left: .25em solid transparent;
                border-right: .25em solid transparent;
            }
        }

        label {
            position: absolute;

            padding: 0 .25em;
            font-weight: normal;
            top: calc(-1.5em - var(--border-weight) * 1);
            left: .5em;
            height: .8em;

            span {
                font-size: .8em;
                line-height: 1;
            }
        }

        .text-pack {
            display: flex;
            flex-grow: 1;

            & > .option, & > .option.fullscreen {
                display: none;
                position: absolute;

                &:not(.fullscreen) {
                    border-bottom-left-radius: var(--border-radius, 3px);
                    border-bottom-right-radius: var(--border-radius, 3px);
                    border-bottom-left-radius: ~"clamp(0px, var(--border-radius, 3px), 1em)";
                    border-bottom-right-radius: ~"clamp(0px, var(--border-radius, 3px), 1em)";
                }
            }

            & > .prefix,
            & > .suffix {
                flex-shrink: 0;
                display: flex;
                line-height: calc(2.8em - calc(var(--border-weight) * 2));
            }

            & > .prefix {
                justify-content: flex-end;
                flex-shrink: 0;

                &:not(:empty) {
                    padding-left: 0.75em;

                    & ~ .textarea, & ~ input, & ~ select {
                        padding-left: 0;
                    }
                }
            }

            & > .suffix {
                order: 1;
                color: var(--content-text_placeholder, #999999);
                align-items: flex-end;

                &:not(:empty) {
                    padding-right: 0.75em;
                    flex-grow: 1;

                    & + input, & + .textarea {
                        padding-right: 0;
                    }
                }
            }
        }

        input {
            word-break: keep-all;
            white-space: nowrap;
            text-align: inherit;

            & ~ .option, & ~ .option.fullscreen {
                text-align: left;
                background-color: var(--content, white);
                margin: 0;
            }

            &:focus ~ .option:not(:empty) {
                top: calc(2.8em - calc(var(--border-weight) * 2));
                margin: 0;
                border: solid var(--border-weight) var(--content-focus, #4848db);
                border-top: none;
                background-color: var(--content, white);
                display: block;
                width: 100%;
                left: calc(0px - var(--border-weight));
                z-index: 9999;
                max-height: 50vh;
                overflow-y: auto;

                & > .menu {
                    padding: .5em .75em;
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

                    & > .menu {
                        font-size: 1em;
                        padding: .75em 0.5em;
                        box-shadow: 0 calc(.5em + 1px) 0 -.5em rgba(128, 128, 128, 0.25);
                    }
                }
            }
        }

        input, .textarea, select {
            width: 100%;

            &::placeholder {
                color: #999999;
            }

            &:not(select):not(.textarea):read-only {
                text-overflow: ellipsis;
                padding-right: 0.15em;
            }

            color: inherit;
            position: relative;
            flex-grow: 1;
            min-height: calc(2.8em - calc(var(--border-weight) * 2));
            min-width: 1em;
            box-sizing: border-box;
            vertical-align: middle;
            background-color: transparent;
            font: inherit;
            font-size: 1em;
            border: none;
            outline: none;
            padding: 0 0.75em;
            margin: 0;
            display: block;
            line-height: initial;
        }

        .textarea {
            position: relative;
            vertical-align: middle;
            display: inline-grid;
            min-height: calc(2.8em - calc(var(--border-weight) * 2));
            line-height: 1.5em;

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
                padding: calc(0.5em + 1px) 0;
                font-size: inherit;
                outline: none;
                border-top: none;
                /* Place on top of each other */
                grid-area: 1 e("/") 1 e("/") 2 e("/") 2;
            }
        }

        select {
            border: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            padding-right: 1.5em;
            margin-right: -1.5em !important;

            & ~ .dropdown {
                display: flex;
            }
        }

        select, .option-display {
            & ~ .dropdown {
                display: flex;
            }
        }

        & > .button-right {
            order: 1;
            display: flex;
            align-items: flex-end;
        }

        & > .button-left, & > .button-right {
            position: relative;

            & > div:not(:empty) {
                &:after {
                    // icon separator
                    content: "";
                    width: 1px;
                    height: 50%;
                    background-color: rgba(128, 128, 128, 0.25);
                    box-shadow: -1px 0 rgba(153, 153, 153, 0.5);
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }

            &.button-left > div:not(:empty) {
                &:after {
                    right: calc(0px - var(--border-weight));
                }
            }

            &.button-right > div:not(:empty) {
                &:after {
                    left: calc(0px - var(--border-weight));
                }
            }

            & > div {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                height: calc(2.8em - .6em - calc(var(--border-weight) * 2));
                padding: 0.3em;

                & > * {
                    max-height: 100%;
                }

                img {
                    border-radius: var(--border-radius, 3px);
                }

                &:not(:empty) {
                    min-width: calc(2.8em - .6em - calc(var(--border-weight) * 2));
                }

                // nested fieldset
                & > .sui-fieldset {
                    margin: calc(-.3em - var(--border-weight));
                    top: calc(-.3em - var(--border-weight));

                    fieldset.sui-label {
                        margin: 0;
                        border-color: transparent;
                    }
                }
            }

        }

        &:not(:first-child) {
            min-height: 2em;

            & > .text-pack > input:focus ~ .option:not(:empty) {
                top: calc(2.8em - calc(var(--border-weight) * 2) - 0.5em);
            }

            & > *:not(label) {
                margin: calc(-0.8em + 6px) 0 0;
            }
        }

    }
}
</style>