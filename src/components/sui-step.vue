<template lang='pug'>
.step(v-bind:class="[positionClass, {'complete': idx < complete, 'current': idx === complete}]")
    template(v-if="typeof step === 'string'") {{ step.text ? step.text : step }}
    template(v-else-if="typeof step !== 'string'")
        .left
            i.material-icons {{ step.icon }}
        | {{ step.text }}
</template>

<script>
export default {
    name: 'sui-steps',
    props: {
        idx: Number,
        step: [String, Object],
        stepSize: Number,
        complete: Number,
    },
    data() {
        return {
            allowance: 1,
            viewport: window.sui_app.viewport
        }
    },
    mounted() {
        window.sui_on.registerEvent.resize(() => {
            this.viewport = window.sui_app.viewport
        });
    },
    computed: {
        positionClass() {
            this.allowance = this.viewport === 'laptop' || this.viewport === 'desktop' ? 3 : 2;
            if (this.idx === this.complete) {
                return 'active';
            }

            let right = this.stepSize - this.complete;
            let left = this.allowance - right <= 0 ? 1 : this.allowance - right;
            if(left > 0) {
                for(let i = this.complete; i >= this.complete - left; i--) {
                    if(this.idx === i) {
                        return "visible"
                    }
                }
            }
            if(right > 0) {
                let limit = this.complete === 0 ? this.complete + this.allowance : this.complete + this.allowance - 1;
                for(let i = this.complete; i <= limit; i++) {
                    if(this.idx === i) {
                        return "visible"
                    }
                }
            }
        }
    }
};
</script>
