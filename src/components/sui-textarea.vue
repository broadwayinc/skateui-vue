<template lang='pug'>
sui-fieldset.sui-textarea(type="textarea" :suffix='suffix' :prefix='prefix' :label="label" :error="isError" :required="required" :message="helperMessage" :disabled="disabled")
    template(#slot-left)
        slot(name="slot-left")
    template(#slot-right)
        slot(name="slot-right")
    textarea(
        ref="textarea"
        @input="updateValue()"
        @invalid.prevent="invalidInput"
        :placeholder="placeholder"
        rows="1"
        @keyup="(e)=>{keyOutput(e.code)}"
        :disabled="disabled"
        :required="required"
        :readonly='readonly'
        @focus="focus")
</template>
<script>
export default {
    name: 'sui-textarea',
    emits: ['update:modelValue', 'input', 'focus', 'requiredError', 'lengthError', 'error'],
    props: {
        error: Boolean,
        placeholder: String,
        prefix: String,
        suffix: String,
        lengthError: String,
        label: String,
        required: [String, Boolean],
        disabled: Boolean,
        message: String,
        readonly: Boolean,
        maxlength: {
            type: Number | String
        },
        value: {
            type: [String, Number],
            default: ''
        },
        modelValue: {
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
        };
    },
    mounted() {
        // setup textbox replica
        let el = this.$refs.textarea;
        let lineHeight = parseInt(document.defaultView.getComputedStyle(el, null).getPropertyValue('line-height'));
        let parent = el.parentElement;
        let replica = document.createElement('div');
        replica.classList.add('sui-textarea-replica');
        parent.insertBefore(replica, el);
        replica.append(el);

        let marginSpace = ((el.parentNode.parentNode.offsetHeight - lineHeight) / 2) - 4 + 'px';
        el.parentNode.style.marginTop = marginSpace;
        el.parentNode.style.marginBottom = marginSpace;

        let field = el.closest('fieldset.sui-fieldset');
        this.inputId = field ? field.id + '_interface' : window.sui_generateId('option');
        el.id = this.inputId;

        el.addEventListener('input', (e) => {
            let target = e.target;
            target.parentNode.dataset.replica = target.value;
        });
        el.addEventListener('focus', (e) => {
            let target = e.target;
            let par = target.parentNode.parentNode.parentNode;
            if (par.classList.contains('sui-textarea') && !par.classList.contains('focus')) {
                par.classList.add('focus');
            }
        });
        el.addEventListener('blur', (e) => {
            let target = e.target;
            let par = target.parentNode.parentNode.parentNode;
            if (par.classList.contains('sui-textarea') && par.classList.contains('focus')) {
                par.classList.remove('focus');
            }
        });

        this.$nextTick(() => {
            if (this.autofocus)
                this.$refs.textarea.focus();
        });
    },
    computed: {
        lengthFail() {
            let value = this.value || this.modelValue;

            if (!this.required && value === '') {
                return false;
            }

            if (this.isTouched) {
                let max = parseInt(this.maxlength || 0);
                if (max && value.length > max) return true;
            }

            return false;
        },
        isError() {
            return this.isInvalid || this.error;
        },
        helperMessage() {
            let helper = this.message || null;
            if (this.isInvalid) {
                if (this.requireFail && typeof this.required === 'string') {
                    helper = this.required;
                } else if (this.lengthFail) {
                    helper = this.lengthError;
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
        }
    },
    methods: {
        focus(e) {
            this.$emit('focus', e);
        },
        updateValue(v) {
            this.$emit('input', v ? v : this.$refs.textarea.value);
            this.$emit('update:modelValue', v ? v : this.$refs.textarea.value);
        },
        invalidInput() {
            this.isTouched = true;
            if (this.requireFail) {
                this.$emit('requiredError');
            } else if (this.lengthError) {
                this.$emit('lengthError');
            } else {
                this.$emit('error');
            }
        }
    }
};
</script>