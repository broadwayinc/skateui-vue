<template lang='pug'>
sui-label(type="textarea" :suffix='suffix' :prefix='prefix' :label="label" :error="error" :required="required" :message="message" :disabled="disabled")
    template(#button-left)
        slot(name="button-left")
    template(#button-right)
        slot(name="button-right")
    textarea(:placeholder="placeholder" rows="1" @keyup="(e)=>{keyOutput(e.code)}" )
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
        required: Boolean,
        disabled: Boolean,
        message: String,
        keyOutput: {
            type: Function,
            default: () => {
            }
        }
    }
};
</script>