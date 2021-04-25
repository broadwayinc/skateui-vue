<template lang="pug">
    div(:id="id" :class="{ 'sui-input': type !== 'textarea', 'sui-textarea': type === 'textarea', left: buttonLeft, right: buttonRight, error: error, disabled: disabled, select: type === 'select' || type === 'fullscreen-select' || type === 'autocomplete'}")
        div.sui-input-wrapper
            slot
            label(v-if="label") {{ label }}
                span(v-if="required" style="color:var(--alert)")  *
            fieldset
                legend(v-if="label") {{ label }}
                    span(v-if="required")  *
            .prefix(v-if="prefix") {{ prefix }}
            .left-wrapper(v-if="buttonLeft")
                template(v-if="buttonLeft && buttonLeft.action")
                    button.left(:disabled="disabled" :style="buttonLeft.style" @click="buttonLeft.action")
                        template(v-if="buttonLeft.text") {{ buttonLeft.text }}
                        template(v-else)
                            i.material-icons {{ buttonLeft.icon }}
                template(v-else-if="buttonLeft")
                    .left
                        template(v-if="buttonLeft.img")
                            img(src="/img/myface.jpg" style="width: calc(100% - 12px);height: calc(100% - 12px);border-radius: 100%;display: block;")
                        template(v-else)
                            i.material-icons {{buttonLeft.icon}}
            .suffix(v-if="suffix") {{ suffix }}
            .right-wrapper(v-if="buttonRight")
                template(v-if="buttonRight && buttonRight.action")
                    button.right(:disabled="disabled" :style="buttonRight.style" @click="buttonRight.action")
                        template(v-if="buttonRight.text") {{ buttonRight.text }}
                        template(v-else)
                            i.material-icons {{ buttonRight.icon }}
                template(v-else-if="buttonRight")
                    .right
                        i.material-icons {{ buttonRight.icon }}
            .downarrow(v-if="type === 'select' || type === 'fullscreen-select'")
            .message(v-if="message && error") {{ message }}
</template>

<script>
export default {
    name: 'ss-label',
    props: {
        error: Boolean,
        label: String,
        type: {
            type: String,
            default: 'text'
        },
        prefix: String,
        suffix: String,
        button: {
            type: [Array, Object],
            default: null
        },
        required: Boolean,
        disabled: Boolean,
        message: {
            type: String,
            default: null
        },
        // output: {
        //     type: Function,
        //     default: () => {}
        // }
    },
    data() {
        return {
            id: String,
            buttonLeft: null,
            buttonRight: null,
            // cstyle: {},
        }
    },
    created() {
        this.id = this.elementId();
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
        let sui_textarea = {
            init: (el) => {
                let setup = (el) => {
                    //el.setAttribute('rows', '1');
                    // let parent = el.parentElement;
                    // let replica = document.createElement('div');
                    // replica.classList.add('textarea');
                    // parent.insertBefore(replica, el);
                    // replica.append(el);
                    let textarea = el.querySelector('textarea');
                    textarea.addEventListener('input', (e) => {
                        let target = e.target;
                        target.parentNode.dataset.replica = target.value;
                    });
                    textarea.addEventListener('focus', (e) => {
                        let target = e.target;
                        let par = target.parentNode.parentNode.parentNode;
                        if (par.classList.contains('sui-textarea') && !par.classList.contains('focus'))
                            par.classList.add('focus');

                    });
                    textarea.addEventListener('blur', (e) => {
                        let target = e.target;
                        let par = target.parentNode.parentNode.parentNode;
                        if (par.classList.contains('sui-textarea') && par.classList.contains('focus'))
                            par.classList.remove('focus');
                    });
                };

                setup(el);
            }
        };
        if(this.type === 'textarea') sui_textarea.init(document.getElementById(this.id));
    },
    methods: {
        elementId() {
            return window.sui_generateId(this.$options.name);
        },
    }
};
</script>
<style lang="less">
@import '../assets/viewport.less';
div.sui-input {
    position: relative;
    display: inline-block;
    height: 2.8rem;
    width: 18rem;
    max-width: 100%;
    margin-bottom: 1rem;
    box-shadow: inset 0 0 0 4px var(--content-focus_shadow);

    &.error .sui-input-wrapper {
        & > label {
            color: var(--alert);
        }

        & > fieldset {
            border-color: var(--alert);

            &::after {
                background-color: var(--alert);
            }

            &::before {
                background-color: var(--alert);
            }
        }

        .left,
        .right {
            background-color: var(--alert_shadow);
            color: var(--alert);
        }

        input, select {
            background-color: var(--alert_shadow);
            border-color: var(--alert);

            &:focus {
                border-color: var(--alert);
                background-color: var(--alert_shadow);

                & ~ fieldset {
                    border-color: var(--alert);
                }

                & ~ label {
                    color: var(--alert);

                    &::after {
                        background-color: var(--alert);
                    }

                    &::before {
                        background-color: var(--alert);
                    }
                }

                & ~ .right {
                    background-color: var(--alert_shadow) !important;
                    color: var(--alert) !important;
                }
            }
        }
    }

    .hover {
        user-select: none;

        &:hover {
            cursor: pointer;
            color: var(--content-focus);
            background-color: var(--content-focus_shadow);
        }
    }

    &.left .sui-input-wrapper,
    &.right .sui-input-wrapper {
        user-select: none;

        & > input {

            &:focus {
                & ~ .right-wrapper button.left,
                & ~ .right-wrapper button.right {
                    color: var(--content-focus);
                    background-color: var(--content-focus_shadow);
                }
            }
        }

        & .left-wrapper {
            order: -3;
        }

        & .left-wrapper,
        & .right-wrapper {
            position: relative;

            & > .left,
            & > .right {
                display: inline-flex;
                width: 2.8rem;
                height: 2.8rem;
                justify-content: center;
                align-items: center;
                z-index: 1;
                right: 0;
                cursor: pointer;
                box-sizing: border-box;

                &.left {
                    right: unset;
                    left: 0;

                    &::before {
                        content: none;
                    }
                }

                &::before,
                &.left::after {
                    // icon separator
                    content: "";
                    width: 2px;
                    height: 50%;
                    background-color: var(--content-text_shadow);
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: -1px;
                }

                &.left::after {
                    left: unset;
                    right: 1px;
                }
            }

        }
    }

    &:not(.disabled) .sui-input-wrapper {
        & button {
            &:hover {
                color: var(--content-focus);
                background-color: var(--content-focus_shadow);
            }
        }
    }

    &.transparent .sui-input-wrapper {
        *:not(.right):not(.menu) {
            border-color: transparent !important;
            background-color: transparent !important;

            &::after {
                background-color: transparent !important;
            }

            &::before {
                background-color: transparent !important;
            }
        }
    }

    & .sui-input-wrapper > .message {
        font-size: 12px;
        text-align: right;
        color: var(--alert);
        position: absolute;
        width: calc(100% - 4px);
        white-space: nowrap;
        bottom: calc(-1.5em - 0.75em);
    }

    &.left {
        &.error input:focus {
            & ~ .left-wrapper > .left {
                border-color: var(--alert);
                color: var(--alert);
                background-color: var(--alert_shadow);
                & > i {
                    color: var(--alert);
                }
            }
        }
    }
    &.left .sui-input-wrapper {
        & > input:focus, & > select:focus {
            & ~ .left-wrapper .left,
            & ~ .left-wrapper button.left {
                border-color: var(--content-focus);
                color: var(--content-focus);
            }
        }

        & > select, & > input {
            box-shadow: none;
            border-left: none;
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
                height: 50%;
                background-color: var(--content-text_shadow);
                position: absolute;
                right: -1px;
            }
        }

        &.error > .left {
            border-color: var(--alert);
            background-color: var(--alert_shadow);
        }
    }

    fieldset {
        position: absolute;
        top: 0;
        right: -2px;
        left: -2px;
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

    label {
        width: calc(100% - 4px);
        left: 14px;
        text-align: left;
        box-sizing: border-box;
        line-height: unset;
        overflow: hidden;
        position: absolute;
        z-index: 1;
        font-size: 0.8rem;
        font-weight: 500;
        white-space: nowrap;
        color: var(--content-text_soft);
        text-shadow: 1px 1px var(--content-text_shadow);
        user-select: none;

        & ~ fieldset {
            top: -12px;
        }

        &:not(:empty) {
            margin-top: calc(-1em - 2px);
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

    & .sui-input-wrapper > * {
        vertical-align: top;
    }

    & .sui-input-wrapper > .downarrow {
        &::before {
            content: "";
            border-top: .3em solid var(--content-text);
            border-left: .25em solid transparent;
            border-right: .25em solid transparent;
        }

        justify-content: center;
        align-items: center;
        display: none;
    }

    & .sui-input-wrapper > .uparrow {
        &::before {
            content: "";
            border-bottom: .3em solid var(--content-text);
            border-left: .25em solid transparent;
            border-right: .25em solid transparent;
        }

        justify-content: center;
        align-items: center;
        display: none;
    }

    & .sui-input-wrapper > select {
        border: none;
        border-radius: 0;
        appearance: none;
        white-space: nowrap;
    }

    & .sui-input-wrapper > input,
    & .sui-input-wrapper > select {
        &::placeholder {
            color: var(--content-text_placeholder);
        }

        &:read-only {
            text-overflow: ellipsis;
            padding: 2px 1.5em 0 0.75em;
        }

        position: relative;
        z-index: 1;
        flex-grow: 1;

        text-shadow: 1px 1px var(--content-text_shadow);
        min-height: 100%;
        min-width: 30px;

        box-sizing: border-box;
        vertical-align: middle;
        background-color: transparent;
        color: var(--content-text);
        font: inherit;
        line-height: calc(2.8rem - 2px);
        padding: 0 0.75em 0 0.75em;
        font-size: 1rem;
        border: none;
        outline: none;
        order: -1;

        &:focus {
            & ~ fieldset {
                border-color: var(--content-focus);
            }

            & ~ label {
                color: var(--content-focus);

                &::after {
                    background-color: var(--content-focus);
                }

                &::before {
                    background-color: var(--content-focus);
                }
            }
        }
    }

    & .sui-input-wrapper > .option, & .sui-input-wrapper > .option-fullscreen {
        display: none;
        position: absolute;
    }

    &.select .sui-input-wrapper {
        & > input {
            display: none;
        }

        & > select:not(:empty) {
            display: inline-block;
            padding-right: 1.5em;

            &:focus ~ .downarrow {
                &::before {
                    border-top: 0.3em solid var(--content-focus);
                }
            }
        }

        &.error {
            & > input:focus ~ .option:not(:empty) {
                border: solid 2px var(--alert);
                background-color: var(--content);
                border-top: none;

                & > .menu {
                    &:hover {
                        background-color: var(--alert_shadow);
                    }

                    box-shadow: inset 0 0 0 .5px var(--alert_transparent);
                }
            }
        }

        & > input {
            display: inline-block;

            &:read-only {
                cursor: default;
            }

            & ~ .option, & ~ .option-fullscreen {
                text-align: left;
            }

            & ~ .option {
                & > .menu > .text {
                    font-size: .8em;
                    text-shadow: 1px 1px var(--content-text_shadow);
                    padding: .75em .75em .75em 1.25em
                }
            }

            &:focus ~ .downarrow {
                &::before {
                    border-top: 0.3em solid var(--content-focus);
                }
            }

            &:focus ~ .option-fullscreen:not(:empty) {
                display: block;
                position: fixed;
                box-sizing: border-box;
                background-color: var(--content);
                z-index: 9999;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                overflow-y: auto;

                & > .menu {
                    cursor: pointer;

                    &:hover {
                        background-color: var(--content-focus_shadow);
                    }

                    & > * {
                        display: inline;
                    }
                }
            }

            &:focus ~ .option:not(:empty) {
                border: solid 2px var(--content-focus);
                border-top: none;
                top: calc(100% - 1px);
                background-color: var(--content);
                display: block;
                width: calc(100% - 4px);
                left: 2px;
                box-sizing: border-box;

                z-index: 9999;
                max-height: 50vh;
                overflow-y: auto;

                & > .menu {
                    text-align: left;
                    cursor: pointer;

                    &.selected,
                    &:hover {
                        background-color: var(--content-focus_shadow);
                    }

                    box-shadow: 0 1px 0 var(--content-text_transparent);
                }
            }

            & ~ select {
                display: none;
            }
        }

        .downarrow {
            display: flex;
            position: absolute;
            right: 0;
            top: 0;
            height: 2.8rem;
            font-size: 1.2rem;
            align-items: center;
            width: 1.75rem;
            cursor: default;
        }
    }
    .sui-input-wrapper {
        display: flex;

        .prefix,
        .suffix {
            word-break: normal;
            display: flex;
            align-items: center;
            font-weight: 600;
            flex-basis: auto;
            padding: 0;
            min-width: calc(2.8rem - 1.5em);
            flex-shrink: 0;
            height: calc(2.8rem - 2px);
            justify-content: center;
        }

        .prefix {
            padding-left: 0.75em;
            order: -2;
            
            & ~ input {
                padding-left: 0.1rem
            }
        }

        .suffix {
            padding-right: 0.75em;

            & ~ input {
                padding-right: 0.1rem
            }
        }
    }
}

div.sui-textarea {
    position: relative;

    &.left {
        & .textarea {
            & > textarea,
            &::after {
                // make space for icon
                padding-left: calc(2.8rem + .75em);
            }
        }

        & .left {
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

        & .left {
            color: var(--content-focus);
        }

        & label {
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
        & .textarea {
            & > textarea,
            &::after {
                padding-right: 3.3em;
            }
        }

        & .right {
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
                background-color: var(--content-focus_shadow);
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

    & .textarea {
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
                color: var(--content-text_placeholder);
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
            box-shadow: inset 0 0 0 4px var(--content-focus_shadow);
            border-top: none;
            /* Place on top of each other */
            grid-area: 1 e("/") 1 e("/") 2 e("/") 2;
        }
    }
}
</style>