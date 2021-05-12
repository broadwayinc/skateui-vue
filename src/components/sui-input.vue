<template lang='pug'>
sui-label(:show-selector='!!(searching && option.length)' :type="type" :label="label" :error="isError" :required="required" :message="message || null" :disabled="disabled || null" :prefix="prefix" :suffix="suffix")
    template(#button-left)
        slot(name="button-left")
    template(#button-right)
        slot(name="button-right")
    input(:disabled="disabled" :placeholder="placeholder" :style='{textAlign: type==="number" ? "center" : null}' :type="type" v-model="customValue" @keyup="keypress" @keydown="arrowSelection")
    div(v-show="searching && option.length" class="option")
        template(v-for="(x, idx) in option")
            .menu(:class="currentSelection === idx ? 'selected' : null" @mousedown="selectChoice(x)" :style="menuStyle ? menuStyle : null") {{ x }}
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
        suffix: String,
        prefix: String,
        regex: String,
        type: {
            type: String,
            default: 'text'
        },
        menuStyle: Object,
        value: {
            type: [Number, String],
            default: null
        },
        option: Array,
        required: Boolean,
        disabled: Boolean,
        message: {
            type: String,
            default: null
        },
        output: {
            type: Function,
            default: () => {
            }
        },
        keyOutput: {
            type: Function,
            default: () => {
            }
        }
    },
    data() {
        return {
            regexExpression: Object,
            regexFail: false,
            searching: false,
            currentSelection: -1
        };
    },
    created() {
        this.regexExpression = new RegExp(this.regex, "g");
    },
    computed: {
        customValue: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.output(newValue);
            }
        },
        isError() {
            return this.error || this.regexFail;
        },
    },
    methods: {
        arrowSelection(event) {
            if (this.option?.length) {
                if (event.code === 'ArrowUp' && this.currentSelection > -1) {
                    this.currentSelection -= 1;
                }
                if (event.code === 'ArrowDown' && this.currentSelection < this.option.length - 1) {
                    this.currentSelection += 1;
                }
                if (event.code === 'Enter' && this.currentSelection > -1) {
                    this.searching = false;
                    this.customValue = this.option[this.currentSelection];
                }
            }
        },
        keypress(event) {
            if (this.regex) {
                this.regexFail = !this.value.match(this.regexExpression);
            }
            if (this.type === 'autocomplete') {
                if (event.code !== 'Enter') this.searching = true;
            }
            if (event.code !== 'ArrowUp' && event.code !== 'ArrowDown') {
                this.currentSelection = -1;
            }
            if (event.code !== 'Enter')
                this.output(this.customValue);

            this.keyOutput(event.code);
        },
        selectChoice(x) {
            this.customValue = typeof x === 'string' ? x : x.text ? x.text : x.value;
            this.output(this.customValue);
            // enter always means option has been selected
            this.keyOutput('Enter');
        },
    }
};
</script>