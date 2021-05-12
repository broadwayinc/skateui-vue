<template lang='pug'>
sui-label(:show-selector='!!((custom || fullscreen) && option.length)' :prefix="prefix" :suffix="suffix" type="select" :label="label" :error="error" :required="required" :message="message || null" :disabled="disabled || null")
    template(v-if="custom || fullscreen")
        input.option-display(:placeholder="placeholder" v-model="customValue" :readonly="true" @keyup="output(customValue)")
        .option(v-show="custom || fullscreen" :class="{fullscreen}")
            template(v-for="(x, idx) in option")
                .menu(:class="currentSelection === idx ? 'selected' : null" @mousedown="selectChoice(x)" :style="menuStyle ? menuStyle : null" :data-value="x.value") {{ typeof x === 'string' ? x : x.text || x.value }}
    template(v-else)
        select
            option(v-if="placeholder" value="") {{ placeholder }}
            option(v-for="x in option" :value="x.value") {{ x.text ? x.text : x.value }}
    template(#button-left)
        slot(name="button-left")
    template(#button-right)
        slot(name="button-right")
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
        suffix: String,
        prefix: String,
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
        }
    },
    data() {
        return {
            customValue: '',
            searching: false,
            currentSelection: -1
        };
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