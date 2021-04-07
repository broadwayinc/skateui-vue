<template lang='pug'>
    .sui-input(:id="dropdownStyle === 'custom' ? id : null" :class="{ left: buttonLeft, right: buttonRight, error: error, disabled: disabled, select: type === 'select' || type === 'fullscreen-select' || type === 'autocomplete' }")
        template(v-if="type === 'select' || type === 'fullscreen-select' || type === 'autocomplete'")
            template(v-if="dropdownStyle === 'custom' || type === 'fullscreen-select' || type === 'autocomplete'")
                input(autocomplete="off" id="dropdowncustom" :placeholder="placeholder" v-model="customValue" :readonly="type !== 'autocomplete'" @keyup="output(customValue)" @keypress="output('abc');")
                div(:class="selectClass() ? 'option' : 'option-fullscreen'")
                    template(v-for="(x, idx) in option")
                        hr(v-if="!selectClass() && idx !== 0" style="margin: .25rem .5rem")
                        .menu(@mousedown="selectChoice(x)" :style="menuStyle ? menuStyle : null" :data-value="x.value") {{ typeof x === 'string' ? x : x.text ? x.text : x.value }}
            template(v-else)
                select
                    option(v-if="placeholder" value="") {{ placeholder }}
                    option(v-for="x in option" :value="x.value") {{ x.text ? x.text : x.value }}
            label(v-if="label") {{ label }}
                span(v-if="required" style="color:var(--alert)")  *
            fieldset
                legend(v-if="label") {{ label }}
                    span(v-if="required")  *
        template(v-else)
            input(:disabled="disabled" :placeholder="placeholder" :type="type" :value="value" :style="{ textAlign: this.button ? this.button.length === 2 ? 'center' : null : null }")
            label(v-if="label") {{ label }}
                span(v-if="required" style="color:var(--alert)")  *
            fieldset
                legend(v-if="label") {{ label }}
                    span(v-if="required")  *
        template(v-if="buttonLeft &&  this.$listeners.leftClick")
            button.left(:disabled="disabled" :style="buttonLeft.style")
                template(v-if="buttonLeft.text") {{ buttonLeft.text }}
                template(v-else)
                    i.material-icons {{ buttonLeft.icon }}
        template(v-else-if="buttonLeft")
            .left
                i.material-icons {{buttonLeft.icon}}
        template(v-if="buttonRight && this.$listeners.rightClick")
            button.right(:disabled="disabled" :style="buttonRight.style" @click="rightClick")
                template(v-if="buttonRight.text") {{ buttonRight.text }}
                template(v-else)
                    i.material-icons {{ buttonRight.icon }}
        template(v-else-if="buttonRight")
            .right
                i.material-icons {{ buttonRight.icon }}
        .downarrow(v-if="type === 'select' || type === 'fullscreen-select'")
        .message(v-if="message") {{ message }}
</template>

<script>
export default {
    name: 'sui-input',
    props: {
        error: Boolean,
        placeholder: {
            type: String,
            default: null
        },
        label: String,
        type: {
            type: String,
            default: 'text'
        },
        dropdownStyle: String,
        menuStyle: Object,
        value: String,
        option: Array,
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
        output: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            id: String,
            buttonLeft: null,
            buttonRight: null,
            cstyle: {},
            customValue: ''
        }
    },
    created() {
        if(this.dropdownStyle === 'custom' || this.type === 'fullscreen-select') {
            this.id = this.elementId();
            this.customValue = this.placeholder ? this.placeholder : this.option[0].text ? this.option[0].text : this.option[0].value;
        }
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
    methods: {
        selectClass() {
            return this.type === 'select' || this.type === 'autocomplete';
        },
        rightClick() {
            this.$emit('rightClick');
        },
        elementId() {
            function generateId(option) {
                let limit = 12;
                let prefix = '';

                if (typeof option === 'number') limit = option;
                else if (typeof option === 'string') prefix = `${option}_`;

                const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

                let text = '';
                for (let i = 0; i < limit - 6; i++) text += possible.charAt(Math.floor(Math.random() * (possible.length - 1)));

                const numb = new Date()
                    .getTime()
                    .toString()
                    .substring(7, 13); // SECOND, MILLISECOND

                const shuffleArray = (array) => {
                    let currentIndex = array.length;
                    let temporaryValue, randomIndex;
                    while (0 !== currentIndex) {
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }
                    return array;
                };

                const letter_array = shuffleArray((text + numb).split(''));

                let output = '';
                for (let i = 0; i < limit; i++) output += letter_array[i];

                return prefix + output;
            }

            return generateId(this.$options.name);
        },
        selectChoice(x) {
            this.output(x);
            this.customValue = typeof x === 'string' ? x : x.text ? x.text : x.value;
        },
        log(x) {
            console.log(x);
        }
    }
};
</script>
<style scoped lang="less">
div.sui-input {
    position: relative;
    display: inline-block;
    height: 2.8rem;
    width: 18rem;
    max-width: 100%;
    margin-bottom: 1rem;
    box-shadow: inset 0 0 0 4px var(--content-focus_screen);

    &.error {
        & label {
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

        .right {
            background-color: var(--alert-screen);
            color: var(--alert);
        }

        input, select {
            background-color: var(--alert-screen);
            border-color: var(--alert);

            &:focus {
                border-color: var(--alert);
                background-color: var(--alert-screen);

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
                    background-color: var(--alert-screen) !important;
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
            background-color: var(--content-focus_screen);
        }
    }

    &.left,
    &.right {
        user-select: none;

        & > input {
            padding-right: 3.3em;

            &:focus {
                & ~ button.left,
                & ~ button.right {
                    color: var(--content-focus);
                    background-color: var(--content-focus_screen);
                }
            }
        }

        & > .left,
        & > .right {
            display: inline-flex;
            width: 2.8rem;
            height: 2.8rem;
            justify-content: center;
            align-items: center;
            position: absolute;
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

    &:not(.disabled) {
        & > button {
            &:hover {
                color: var(--content-focus);
                background-color: var(--content-focus_screen);
            }
        }
    }

    &.transparent {
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

    & > .message {
        font-size: 12px;
        text-align: right;
        color: var(--alert);
        position: absolute;
        width: calc(100% - 4px);
        white-space: nowrap;
    }

    &.left {

        & > input:focus, & > select:focus {
            & ~ .left,
            & ~ button.left {
                border-color: var(--content-focus);
                color: var(--content-focus);
            }
        }

        &.error > input:focus {
            & ~ .left {
                border-color: var(--alert);
                color: var(--alert);
                background-color: var(--alert-screen);
            }
        }

        & > select, & > input {
            box-shadow: none;
            min-width: calc(100% - 2.8rem);
            width: calc(100% - 2.8rem);
            border-left: none;
        }

        &::before {
            // icon space
            content: "";
            position: relative;
            width: 2.8rem;
            height: 2.8rem;
            box-sizing: border-box;
            border-left: solid 2px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border-color: transparent;
            padding-top: 2px;
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
            background-color: var(--alert-screen);
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

    label {
        width: calc(100% - 4px);
        left: 12px;
        text-align: left;
        box-sizing: border-box;
        line-height: 1em;
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
            margin-top: calc(-1em + 2px);
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

    & > * {
        vertical-align: top;
    }

    & > .downarrow {
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

    & > .uparrow {
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

    & > select {
        border: none;
        border-radius: 0;
        appearance: none;
        white-space: nowrap;
    }

    & > input,
    & > select {
        &::placeholder {
            color: var(--content-placeholder);
        }

        &:read-only {
            text-overflow: ellipsis;
            padding: 2px 1.5em 0 0.75em;
        }

        position: relative;
        z-index: 1;

        text-shadow: 1px 1px var(--content-text_shadow);
        min-height: 100%;
        min-width: 100%;
        width: 100%;

        box-sizing: border-box;
        vertical-align: middle;
        background-color: transparent;
        color: var(--content-text);
        font: inherit;
        line-height: 2.5rem;
        padding: 2px .75em 0;
        font-size: 1rem;
        border: none;
        outline: none;

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

    & > .option, & > .option-fullscreen {
        display: none;
        position: absolute;
    }

    &.select {
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
                        background-color: var(--alert-screen);
                    }

                    box-shadow: inset 0 0 0 .5px var(--alert-transparent);
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
                        background-color: var(--content-focus_screen);
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
                width: 100%;
                box-sizing: border-box;

                z-index: 9999;
                max-height: 50vh;
                overflow-y: auto;

                & > .menu {
                    text-align: left;
                    cursor: pointer;

                    &:hover {
                        background-color: var(--content-focus_screen);
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
}
</style>
