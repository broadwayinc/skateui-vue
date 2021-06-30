<template lang='pug'>
sui-label(type="textarea" :suffix='suffix' :prefix='prefix' :label="label" :error="isError" :required="required" :message="helperMessage" :disabled="disabled")
    template(#button-left)
        slot(name="button-left")
    template(#button-right)
        slot(name="button-right")
    textarea(ref="input" @input="updateValue()" @invalid.prevent="invalidInput" :placeholder="placeholder" rows="1" @keyup="(e)=>{keyOutput(e.code)}" :disabled="disabled" :required="required")
</template>
<script>
export default {
    name: 'sui-textarea',
    props: {
        error: Boolean,
        placeholder: String,
        prefix: String,
        suffix: String,
        label: String,
        required: [String, Boolean],
        disabled: Boolean,
        message: String,
        value: {
            type: [String, Number],
            default: ''
        },
        keyOutput: {
            type: Function,
            default: () => {
            }
        },
        autofocus: Boolean
    },
    data() {
      return {
          isTouched: false
      }
    },
    mounted() {
        this.$nextTick(()=>{
            if(this.autofocus)
                this.$refs.input.focus();
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
            return this.required && this.value === '';
        },
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value ? value : this.$refs.input.value);
        },
        invalidInput() {
            this.isTouched = true;
            if (this.requireFail) {
                this.$emit('requiredError');
            } else this.$emit('error');
        }
    }
};
</script>