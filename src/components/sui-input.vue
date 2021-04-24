<template lang='pug'>
    sui-label(:type="type" :label="label" :error="isError" :button="button" :required="required" :message="message || null" :disabled="disabled || null" :prefix="prefix" :suffix="suffix")
        input(:disabled="disabled" :placeholder="placeholder" :type="type" v-model="customValue" :style="{ textAlign: has2Buttons() ? 'center' : null }"  @keyup="keypress" @keydown="arrowSelection")
        div(v-show="searching" class="option")
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
            regexExpression: Object,
            regexFail: false,
            searching: false,
            currentSelection: -1
        }
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
            if(this.option?.length) {
                if(event.code === 'ArrowUp' && this.currentSelection > -1) {
                    this.currentSelection -= 1;
                }
                if(event.code === 'ArrowDown' && this.currentSelection < this.option.length - 1) {
                    this.currentSelection += 1;
                }
                if(event.code === 'Enter') {
                    this.searching = false;
                    this.customValue = this.option[this.currentSelection];
                }
            }
        },
        keypress(event) {
            if(this.regex) {
                if(!this.value.match(this.regexExpression)) {
                    this.regexFail = true;
                } else {
                    this.regexFail = false;
                }
            }
            if(this.type === 'autocomplete') {
                if(event.code !== 'Enter') this.searching = true;
            }
            if(event.code !== 'ArrowUp' && event.code !== 'ArrowDown') {
                this.currentSelection = -1;
            }
            this.output(this.customValue);
        },
        selectChoice(x) {
            this.output(x);
            this.customValue = typeof x === 'string' ? x : x.text ? x.text : x.value;
        },
        has2Buttons() {
            if(this.button?.length === 2){
                return this.button[0].action && this.button[1].action;
            }
            return false;
        }
    }
};
</script>
