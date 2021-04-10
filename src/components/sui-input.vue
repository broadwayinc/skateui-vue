<template lang='pug'>
    sui-label(:type="type" :label="label" :error="error" :button="button" :required="required" :message="message || null" :disabled="disabled || null")
        input(:disabled="disabled" :placeholder="placeholder" :type="type" v-model="customValue" :style="{ textAlign: this.button ? this.button.length === 2 ? 'center' : null : null }"  @keyup="keypress" @keydown="arrowSelection")
        div(v-show="searching" class="option")
            template(v-for="(x, idx) in option")
                //hr(v-if="idx !== 0" style="margin: .25rem .5rem")
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
        type: {
            type: String,
            default: 'text'
        },
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
            customValue: '',
            searching: false,
            currentSelection: -1
        }
    },
    created() {
        this.customValue = this.value;
    },
    methods: {
        arrowSelection(event) {
            if(this.option.length) {
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
        }
    }
};
</script>
