<template lang='pug'>
.step(v-bind:class="[positionClass, {'complete': idx < complete, 'current': idx === complete}]")
    div.step-name
        i.material-icons(v-if="steps[idx].icon") {{ steps[idx].icon }}
        span {{ typeof steps[idx] !== 'string' ? steps[idx].text : steps[idx] }}
    div.next-step(v-if="type === 'ring' && steps[idx + 1]") NEXT: {{ typeof steps[idx + 1] !== 'string' ? steps[idx + 1].text : steps[idx + 1] }}
</template>

<script>
export default {
    name: 'sui-steps',
    props: {
        idx: Number,
        steps: Array,
        stepSize: Number,
        complete: Number,
        type: String
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
<style lang="less">
.ring .step {
    flex-direction: column;
    justify-content: center;

    & .step-name {
        margin-top: -0.5em;
    }
    & .next-step {
        position: absolute;
        font-size: 0.8rem;
        top: calc(1.333rem + 1em);
    }
}
.step {
    & .step-name {
        display: flex;
        align-items: center;

        & i {
            margin-right: calc(var(--padding) / 4);
        }
    }
}


</style>