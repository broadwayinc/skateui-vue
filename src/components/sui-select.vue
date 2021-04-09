<template lang='pug'>
    sui-label(type="select" :label="label" :error="error" :button="button" :required="required" :message="message || null" :disabled="disabled || null")
        template(v-if="custom || fullscreen")
            input(id="dropdowncustom" :placeholder="placeholder" v-model="customValue" :readonly="true" @keyup="output(customValue)")
            div(v-show="custom || fullscreen" :class="fullscreen ? 'option-fullscreen' : 'option'")
                template(v-for="(x, idx) in option")
                    hr(v-if="fullscreen && idx !== 0" style="margin: .25rem .5rem")
                    .menu(:class="currentSelection === idx ? 'selected' : null" @mousedown="selectChoice(x)" :style="menuStyle ? menuStyle : null" :data-value="x.value") {{ typeof x === 'string' ? x : x.text ? x.text : x.value }}
        template(v-else)
            select
                option(v-if="placeholder" value="") {{ placeholder }}
                option(v-for="x in option" :value="x.value") {{ x.text ? x.text : x.value }}
</template>

<script>
export default {
    name: 'sui-select',
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
        fullscreen: Boolean,
        custom: Boolean,
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
        this.customValue = this.placeholder ? this.placeholder : this.option[0].text ? this.option[0].text : this.option[0].value;
    },
    methods: {
        selectChoice(x) {
            this.output(x);
            this.customValue = typeof x === 'string' ? x : x.text ? x.text : x.value;
        },
    }
};
</script>