<template lang='pug'>
sui-fieldset.sui-select(
    :class="{'sui-fieldset-disabled': $attrs['disabled'], 'required': $attrs['required'], 'validation-error': isError}"
    :prefix="prefix"
    :suffix="suffix"
    type="select"
    :label="label"
    :error="isError"
    :message="requiredErrorMessage || message")
    div.sui-select.sui-select-wrapper
        div.sui-select-display(v-html="selection ? getTextContent(selection) : getTextContent()")
        select(ref="select" style="opacity: 0;" @input="e=>{updatevalue(e.target.value)}" v-bind="$attrs" :value="value")
            option(v-for="option in options" :value="option.value" data-content="option.html" :selected="value === option.value") {{ option.selected ? 'true' : 'false' }} {{ option.text }}
        div.non-mobile-select(ref="input" tabindex="-1")
            input(style="opacity: 0;" :value="value" @input="e=>{updateValue(e.target.value)}" readonly v-bind="$attrs" @blur="blur")
            div.options(tabindex="-1")
                div(v-for="(option, idx) in options" :value="option.value" v-html="option.html" @mousedown="makeSelection"
                    :class="{active: idx === selection}" @mouseover="selection = idx")
        div.sui-dropdown-button(tabindex="-1")
            i.material-icons.more expand_more
            i.material-icons.less expand_less
    div(style="display: none")
        slot
    template(#slot-left)
        slot(name="slot-left")
    template(#slot-right)
        slot(name="slot-right")
</template>

<script>
export default {
    name: 'sui-select',
    emits: ['update:modelValue', 'input', 'focus', 'blur'],
    props: {
        modelValue: String,
        error: Boolean,
        requiredErrorMessage: String,
        placeholder: {
            type: String,
            default: null
        },
        suffix: String,
        prefix: String,
        label: String,
        value: String,
        message: {
            type: String,
            default: null
        },
        output: {
            type: Function,
            default: () => {
            }
        },
        autofocus: Boolean,
        selected: Boolean
    },
    data() {
        return {
            currentSelection: -1,
            isTouched: false,
            parent: null,
            blockFocus: null,
            options: [],
            selection: null,
            searchIdx: -1,
            errorMessage: '',
            isError: false
        };
    },
    mounted() {
        if(this.$slots.default) {
            this.$slots.default.forEach(vnode => {
                this.options.push({value: vnode.componentInstance.$options.propsData.value, text: vnode.componentInstance.$el.textContent, html: vnode.elm.innerHTML, selected: vnode.data.attrs.selected === undefined ? false : true});
                if(vnode.data.attrs.selected !== undefined) this.updateValue(vnode.componentInstance.$options.propsData.value);
            });
        }
        if(window.getComputedStyle(this.$refs.input).display !== 'none') {
            // insert some listener to handle the the movement by arrows
            this.$refs.input.querySelector('input').addEventListener('keydown', (e) => {
                switch (e.keyCode) {
                    case 13:
                        // enter key
                        e.preventDefault();
                        this.makeSelection();
                        this.$refs.input.querySelector('input').blur();
                        break;
                    case 38:
                        // up arrow
                        e.preventDefault();
                        if(this.selection > 0) {
                            this.selection -= 1;
                            this.updateValue(this.options[this.selection].value);
                        }
                        break;
                    case 40:
                        // down arrow
                        e.preventDefault();
                        if(this.selection === null) {
                            this.selection = 0;
                        }
                        else if(this.selection < this.options.length - 1) {
                            this.selection += 1;
                        }
                        this.updateValue(this.options[this.selection].value);
                        break;
                        case 9:
                            break;
                    default:
                        if(e.returnValue) {
                            e.preventDefault();
                            if(e.key !== undefined) {
                                this.searchIdx = this.options.findIndex((option, index) => {
                                    if(this.searchIdx) {
                                        return option.text[0].toLowerCase() === e.key && index > this.searchIdx
                                    } else {
                                        return option.text[0].toLowerCase() === e.key
                                    }
                                });
                                if(this.searchIdx > -1) {
                                    this.selection = this.searchIdx;
                                    this.updateValue(this.options[this.selection].value);
                                }
                                else this.searchIdx = null;
                            }
                        }
                }
            });
        }
        this.$refs.select.addEventListener('invalid', (event) => {
            event.preventDefault();
            this.isError = true;
        });
    },
    computed: {
        helperMessage() {
            let helper = this.message || null;
            return helper;
        },
    },
    methods: {
        blur() {
            this.selection = null;
            this.searchIdx = null;
        },
        updateValue(value) {
            this.isError = false;
            this.$emit('input', value);
            this.$emit('update:modelValue', value);
        },
        getTextContent(selection) {
            if(this.options.length !== 0) {
                let html;
                if(selection) {
                    html = this.options[selection];
                } else {
                    html = this.options.find(option => option.value === this.value);
                }
                return html?.text;
            }
        },
        makeSelection() {
            this.updateValue(this.options[this.selection].value);
        },
    }
};
</script>
<style lang="less" scoped>
input {
    cursor: pointer;
}

select {
    display: block;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-right: 1.5em !important;
}

input, select {
    height: 100%;
    &:focus {
        & ~ .sui-dropdown-button {
            opacity: 1;
        }

        & ~ .options {
            display: block;
        }
    }
}
select {
    display: none;
}
.sui-select-wrapper {
    display: flex;

    & .sui-select-display {
        position: absolute;
        padding: calc(var(--padding) / 2);
        height: 100%;
        width: 100%;
        display: flex;
        box-sizing: border-box;
        align-items: center;
    }

    & .sui-dropdown-button {
        .less {
            display: none;
        }
    }

    @media (pointer:fine) {
        &:focus-within {
            & .sui-dropdown-button {
                .more {
                    display: none;
                }

                .less {
                    display: block;
                }
            }
        }
    }
}
.non-mobile-select {
    height: 100%;
    cursor: pointer;
    & .options {
        display: none;
        position: absolute;
        z-index: 2;
        background-color: var(--content, #fff);
        width: 100%;
        box-sizing: border-box;

        & .active {
            background-color: var(--content-focus_shade, rgba(0, 0, 0, 0.066));
        }

        & > * {
            padding: calc(var(--padding) / 2);

            &:hover {
                background-color: var(--content-focus_shade, rgba(0, 0, 0, 0.066));
            }
        }
    }

    //&:focus-within {
    //    & .options {
    //        display: block;
    //    }
    //}

}
@media (pointer:coarse) {
    .non-mobile-select {
        display: none;
    }
    select {
        display: block;
    }
}
.sui-dropdown-button {
    width: 1.5em;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-shrink: 0;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    pointer-events: none;
    opacity: 0.5;

    & i {
        font-size: 1em;
    }

    //&::before {
    //    content: "";
    //    border-top: .3em solid var(--content-text_soft);
    //    border-left: .25em solid transparent;
    //    border-right: .25em solid transparent;
    //}
}
</style>