<template lang='pug'>
sui-label(:show-selector='!!((custom || fullscreen) && option.length)' :prefix="prefix" :suffix="suffix" type="select" :label="label" :error="error" :required="required" :message="message || null" :disabled="disabled || null")
    template(v-if="custom || fullscreen")
        input.option-display(:placeholder="placeholder" :value="getText(value)" :readonly="true")
        input(:value="value" type="hidden")
        .option(v-show="custom || fullscreen" :class="{fullscreen}")
            template(v-for="(x, idx) in option")
                .menu(:class="currentSelection === idx ? 'selected' : null" @mousedown="selectChoice(x)" :style="menuStyle ? menuStyle : null" :data-value="x.value") {{ typeof x === 'string' ? x : x.text || x.value }}
    template(v-else)
        select(ref="select" @input="updateValue()")
            option(v-if="placeholder" value="" disabled selected="value === ''") {{ placeholder }}
            option(v-for="x in option" :value="x.value" :selected="x.value === value ? 'selected' : null") {{ x.text ? x.text : x.value }}
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
        type: String,
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
            searching: false,
            currentSelection: -1
        };
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value ? value : this.$refs.select.value);
        },
        getText(value) {
            for(let i = 0; i < this.option.length; i++) {
                if(this.option[i].value === value || this.option[i].text === value) {
                    if(this.option[i].text) return this.option[i].text;
                    return this.option[i].value;
                    break;
                }
            }
        },
        selectChoice(x) {
            this.updateValue(x.value);
            this.output(x);
        },
    }
};
</script>