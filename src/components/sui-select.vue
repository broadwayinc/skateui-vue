<template lang='pug'>
sui-label(:show-selector='!!((custom || fullscreen) && option.length)' :prefix="prefix" :suffix="suffix" type="select" :label="label" :error="isError" :required="required" :message="helperMessage" :disabled="disabled || null" :small="small")
    template(v-if="custom || fullscreen")
        input.option-display(:placeholder="small && placeholder ? label : placeholder" :value="getText(value || modelValue)" :disabled="disabled" tabindex=-1)
        input(:value="value || modelValue" type="text" :required="required" :disabled="disabled" @invalid.prevent="invalidInput" style="position: absolute; opacity: 0; left: 0;" @focus="focus")
        .option(v-show="custom || fullscreen" :class="{fullscreen}")
            template(v-for="(x, idx) in option")
                .menu(:class="currentSelection === idx ? 'selected' : null" @mousedown="selectChoice(x)" :style="menuStyle ? menuStyle : null" :data-value="x.value") {{ typeof x === 'string' ? x : x.text || x.value }}
    template(v-else)
        select(ref="select" @input="updateValue()" :required="required" @invalid.prevent="invalidInput" :disabled="disabled" @focus="focus")
            option(v-if="placeholder" value="" disabled selected="(value || modelValue) === ''") {{ small && placeholder ? label : placeholder }}
            option(v-for="x in option" :value="x.value" :selected="x.value === (value || modelValue) ? 'selected' : null") {{ x.text ? x.text : x.value }}
    template(#button-left)
        slot(name="button-left")
    template(#button-right)
        slot(name="button-right")
</template>

<script>
export default {
    name: 'sui-select',
    emits: ['update:modelValue', 'input'],
    props: {
        modelValue: String,
        error: Boolean,
        placeholder: {
            type: String,
            default: null
        },
        small: Boolean,
        suffix: String,
        prefix: String,
        label: String,
        type: String,
        fullscreen: Boolean,
        custom: Boolean,
        menuStyle: Object,
        value: String,
        option: Array,
        required: [Boolean, String],
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
        autofocus: Boolean
    },
    data() {
        return {
            searching: false,
            currentSelection: -1,
            isTouched: false,
        };
    },
    mounted() {
        this.$nextTick(()=>{
            if(this.autofocus)
                if(this.custom || this.fullscreen) {
                    this.$refs.input.focus();
                } else {
                    this.$refs.select.focus();
                }
        })
    },
    computed: {
        isError() {
            return this.isInvalid || this.error;
        },
        helperMessage() {
            let helper = this.message || null;
            if (this.requireFail && this.isInvalid) {
                if (typeof this.required === 'string') {
                    helper = this.required;
                }
            } else if (typeof this.error === 'string') {
                helper = this.error;
            }
            return helper;
        },
        isInvalid() {
            return this.isTouched && this.requireFail;
        },
        requireFail() {
            return this.required && (this.value || this.modelValue) === '';
        },
    },
    methods: {
        invalidInput() {
            this.isTouched = true;
        },
        focus(e) {
            this.$emit('focus', e);
        },
        updateValue(value) {
            this.$emit('input', value ? value : this.$refs.select.value);
            this.$emit('update:modelValue', value ? value : this.$refs.select.value);
        },
        getText(value) {
            for (let i = 0; i < this.option.length; i++) {
                if (this.option[i].value === value || this.option[i].text === value) {
                    if (this.option[i].text) return this.option[i].text;
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