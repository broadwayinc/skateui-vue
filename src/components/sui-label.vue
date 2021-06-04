<template lang="pug">
fieldset.sui-label(
    ref='label'
    :class="{ label: !!label, showSelector, error, disabled, select: type === 'select' || type === 'fullscreen-select' || type === 'autocomplete'}")
    legend(v-if="label") {{ label }}
        span(v-if="required") &nbsp;*
    .sui-input-wrapper
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
        label(v-if="label" :for="elementId + '_input'") {{ label }}
            span(v-if="required" style="color:var(--alert, 'tomato')") &nbsp;*
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
    },
    data() {
        return {
            msg: null,
            elementId: null
        };
    },
    watch: {
        message(v) {
            if (this.msg)
                this.msg.innerHTML = v;
        },
        error(v) {
            if (this.msg) {
                if (v)
                    this.msg.classList.add('error');
                else if (this.msg.classList.contains('error'))
                    this.msg.classList.remove('error');
            }
        }
    },
    methods: {
        focusInput(e) {
            let elem = document.getElementById(this.elementId + '_input');
            elem.focus();

            if (e === false)
                elem.setSelectionRange(0, 0);
            else {
                elem.setSelectionRange(elem.value.length, elem.value.length);
            }
        }
    },
    mounted() {
        this.elementId = this.$refs.label.id || window.sui_generateId(this.$options.name);
        this.$refs.label.id = this.elementId;

        let el = document.getElementById(this.elementId);
        if (!el)
            return;

        let input = [el.querySelector('textarea'), el.querySelector('input'), el.querySelector('select')];
        for (let i of input)
            if (i) {
                if (i.id)
                    this.elementId = i.id;

                i.id = this.elementId + '_input';
                break;
            }

        let block = document.createElement('div');
        block.classList.add('sui-input');

        let msg = document.createElement('div');
        msg.classList.add('sui-input-message');
        if (this.error)
            msg.classList.add('error');

        msg.innerHTML = this.message;

        el.parentNode.insertBefore(block, el.nextSibling);
        block.append(el);
        block.append(msg);
        el.removeAttribute('id');
        block.id = this.elementId;

        this.msg = msg;

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
                        if (par.classList.contains('sui-textarea') && !par.classList.contains('focus'))
                            par.classList.add('focus');

                    });
                    el.addEventListener('blur', (e) => {
                        let target = e.target;
                        let par = target.parentNode.parentNode.parentNode;
                        if (par.classList.contains('sui-textarea') && par.classList.contains('focus'))
                            par.classList.remove('focus');
                    });
                };

                setup(el);
            }
        };

        if (this.type === 'textarea')
            sui_textarea.init(document.getElementById(this.elementId + '_input'));
    }
};
</script>
<style lang="less">
@import '../assets/viewport.less';

.sui-input {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-bottom: 1rem;
}

.sui-screen {
    .sui-input {
        width: 100%;
    }

    fieldset.sui-label {
        margin: 0;
        border-top-color: transparent !important;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        margin-bottom: calc(100vh - 2.8rem) !important;

        .sui-input-wrapper {
            .option {
                border-color: transparent !important;
                top: calc(2.8rem - 2px) !important;

                & > .menu {
                    font-size: 1rem !important;
                    padding: .75em 0.5em !important;
                    box-shadow: 0 calc(.5em + 1px) 0 -.5em rgba(128, 128, 128, 0.25);
                }
            }
        }
    }
}

fieldset.sui-label {
    margin: 0;
    margin-top: 1rem;

    &.disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    &.label {
        margin-top: 0.6rem;
    }

    & + .sui-input-message {
        font-size: .8em;
        text-align: right;
        line-height: 1rem;
        min-height: 1rem;
        position: absolute;
        right: 0;

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
    border: 2px solid var(--border-color, rgba(128, 128, 128, 0.5));

    padding: 0 .5em;
    //min-width: calc(2.8rem * 3);
    border-radius: var(--border-radius, 3px); /* fallback */
    border-radius: ~"clamp(0px, var(--border-radius, 3px), 1.4rem)";
    vertical-align: middle;

    &.showSelector:focus-within {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    &:focus-within {
        border-color: var(--saturate, #4848db);

        label {
            color: var(--button-nude, #4848db);
        }

        .button-left, .button-right {
            color: var(--button-nude, #4848db);
        }
    }

    legend {
        position: relative;
        text-align: left;
        font-size: 0.8rem;
        height: 1rem;
        font-weight: 500;
        padding: 0 .25rem;
        top: -.25rem;
        word-break: keep-all;
        display: inline;
        line-height: 1rem;
        user-select: none;
        color: var(--content-text_soft, #808080);
        visibility: hidden;
    }

    .sui-input-wrapper {
        margin: 0 -.5em;
        display: flex;
        position: relative;

        .sui-button {
            min-width: 0;
        }

        .dropdown {
            width: 1.5rem;
            align-items: center;
            justify-content: center;
            display: none;
            flex-shrink: 0;

            &::before {
                content: "";
                border-top: .3rem solid var(--content-text, inherit);
                border-left: .25rem solid transparent;
                border-right: .25rem solid transparent;
            }
        }

        &:not(:first-child) {
            min-height: 2rem;

            & > *:not(label) {
                margin: calc(-0.8rem + 6px) 0 0;
            }
        }

        label {
            position: absolute;
            font-size: .8rem;
            padding: 0 .25rem;
            font-weight: 500;
            top: -1.25rem;
            left: .5rem;
            height: 1rem;
            line-height: 1rem;
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
                line-height: calc(2.8rem - 4px);
            }

            & > .prefix {
                justify-content: flex-end;
                flex-shrink: 0;

                &:not(:empty) {
                    padding-left: 0.75rem;

                    & ~ .textarea, & ~ input, & ~ select {
                        padding-left: 0;
                    }
                }
            }

            & > .suffix {
                order: 1;
                color: var(--content-text_placeholder, rgba(128, 128, 128, 0.75));
                align-items: flex-end;

                &:not(:empty) {
                    padding-right: 0.75rem;
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
                top: calc(2rem + 2px);
                margin: 0;
                border: solid 2px var(--content-focus, #4848db);
                border-top: none;
                background-color: var(--content, white);
                display: block;
                width: 100%;
                left: -2px;
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
                        font-size: 1rem;
                        padding: .75em 0.5em;
                        box-shadow: 0 calc(.5em + 1px) 0 -.5em rgba(128, 128, 128, 0.25);
                    }
                }
            }
        }

        input, .textarea, select {
            width: 100%;
            border-radius: var(--border-radius);

            &::placeholder {
                color: rgba(128, 128, 128, 0.75);
            }

            &:not(select):not(.textarea):read-only {
                text-overflow: ellipsis;
                padding-right: 0.15rem;
            }

            color: inherit;
            position: relative;
            flex-grow: 1;
            min-height: calc(2.8rem - 4px);
            //min-width: 2em;
            min-width: 1em;
            box-sizing: border-box;
            vertical-align: middle;
            background-color: transparent;
            font: inherit;
            font-size: 1rem;
            border: none;
            outline: none;
            padding: 0 0.75rem;
            margin: 0;
            display: block;
        }

        .textarea {
            position: relative;
            vertical-align: middle;
            display: inline-grid;
            min-height: calc(2.8em - 4px);
            text-shadow: 1px 1px var(--content-text_shadow, rgba(0, 0, 0, 0.033));

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
                    color: var(--content-text_placeholder, rgba(0, 0, 0, 0.33));
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
                line-height: 1.5rem;

                padding: calc(0.5rem + 1px) 0;
                font-size: 1rem;
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
            padding-right: 1.5rem;
            margin-right: -1.5rem !important;

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
                    box-shadow: -1px 0 rgba(128, 128, 128, 0.5);
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }

            &.button-left > div:not(:empty) {
                &:after {
                    right: -2px;
                }
            }

            &.button-right > div:not(:empty) {
                &:after {
                    left: -2px;
                }
            }

            & > div {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                height: calc(2.8rem - .6rem - 4px);
                padding: 0.3rem;

                & > * {
                    max-height: 100%;
                }

                img {
                    border-radius: var(--border-radius, 3px);
                }

                &:not(:empty) {
                    min-width: calc(2.8rem - .6rem - 4px);
                }
            }

        }
    }
}
</style>