<template lang='pug'>
    sui-label(type="textarea" :label="label" :error="error" :button="button" :required="required" :message="message || null" :disabled="disabled || null")
        .textarea
            textarea(:placeholder="placeholder" rows="1")
</template>
<script>
export default {
    name: 'sui-textarea',
    props: {
        error: Boolean,
        placeholder: {
            type: String,
            default: null
        },
        label: String,
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
    },
    data() {
      return {
          buttonLeft: null,
          buttonRight: null,
      }
    }
};
</script>