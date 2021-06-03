<template lang='pug'>
    .step(v-bind:class="[positionClass, {'complete': idx < complete, 'current': idx === complete}]")
        template(v-if="typeof step === 'string'") {{ step.text ? step.text : step }} : {{ complete }}
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
    updated() {
      console.log("UIpdating")
    },
    computed: {
        positionClass() {
            this.allowance = this.viewport === 'laptop' || this.viewport === 'desktop' ? 3 : 2;
            if (this.idx === this.complete) {
                return 'active';
            }
            // let left = this.complete - this.allowance;
            //I was in the midst of calculating right
            // let right = this.stepSize - this.complete;
            // console.log({right})
            // if (left < 0) {
            //     right += (-1 * left);
            //     left = this.allowance - left * -1;
            // }
            // if(left >= 0 && this.idx < this.complete) {
            //     for(let i = this.complete; i >= this.complete - this.allowance; i--) {
            //         if(this.idx === i) {
            //             return "visible"
            //         }
            //     }
            // }
            //
            // if(left >= 0 && this.idx < this.complete) {
            //     for(let i = this.complete; i >= this.complete - this.allowance; i--) {
            //         if(this.idx === i) {
            //             return "visible"
            //         }
            //     }
            // }
            let right = this.stepSize - this.complete;
            let left = this.allowance - right;
            console.log(this.complete, this.allowance, left, right)
            if(left > 0) {
                for(let i = this.complete; i > left; i--) {
                    if(this.idx === i) {
                        return "visible"
                    }
                }
            }
            if(right > 0) {
                for(let i = this.complete; i <= this.complete + this.allowance; i++) {
                    if(this.idx === i) {
                        return "visible"
                    }
                }
            }
        }
    }
};
</script>
