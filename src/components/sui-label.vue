<template lang="pug">
    .sui-input(:class="{ left: buttonLeft, right: buttonRight, error: error, disabled: disabled}")
        slot
        label(v-if="label") {{ label }}
            span(v-if="required" style="color:var(--alert)")  *
        fieldset
            legend(v-if="label") {{ label }}
                span(v-if="required")  *
        template(v-if="buttonLeft && buttonLeft.action")
            button.left(:disabled="disabled" :style="buttonLeft.style" @click="buttonLeft.action")
                template(v-if="buttonLeft.text") {{ buttonLeft.text }}
                template(v-else)
                    i.material-icons {{ buttonLeft.icon }}
        template(v-else-if="buttonLeft")
            .left
                i.material-icons {{buttonLeft.icon}}
        template(v-if="buttonRight && buttonRight.action")
            button.right(:disabled="disabled" :style="buttonRight.style" @click="buttonRight.action")
                template(v-if="buttonRight.text") {{ buttonRight.text }}
                template(v-else)
                    i.material-icons {{ buttonRight.icon }}
        template(v-else-if="buttonRight")
            .right
                i.material-icons {{ buttonRight.icon }}
        //.downarrow(v-if="type === 'select' || type === 'fullscreen-select'")
        .message(v-if="message") {{ message }}
</template>

<script>
export default {
    name: 'ss-label',
    props: {
        error: Boolean,
        label: String,
        // type: {
        //     type: String,
        //     default: 'text'
        // },
        // dropdownStyle: String,
        // menuStyle: Object,
        // value: String,
        // option: Array,
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
        // output: {
        //     type: Function,
        //     default: () => {}
        // }
    },
    data() {
        return {
            // id: String,
            buttonLeft: null,
            buttonRight: null,
            // cstyle: {},
            // customValue: '',
            // searching: false,
            // currentSelection: -1
        }
    },
    created() {
    //     if(this.dropdownStyle === 'custom' || this.type === 'fullscreen-select') {
    //         this.id = this.elementId();
    //         this.customValue = this.placeholder ? this.placeholder : this.option[0].text ? this.option[0].text : this.option[0].value;
    //     }
    //
    //     if(this.type === 'autocomplete') {
    //         this.id = this.elementId();
    //     }
        if (this.button !== null) {
            if (Array.isArray(this.button)) {
                this.button.forEach(button => {
                    if (button.position === 'right') {
                        this.buttonRight = {
                            ...button,
                            ...{
                                style: {
                                    paddingBottom: button.text ? '0.4rem' : null,
                                    fontSize: button.text ? '1.8rem' : null
                                }
                            }
                        }
                    } else if (button.position === 'left') {
                        this.buttonLeft = {
                            ...button,
                            style: {
                                paddingBottom: button.text ? '0.4rem' : null,
                                fontSize: button.text ? '1.8rem' : null
                            }
                        }
                    }
                })
            }
        }
    },
};
</script>