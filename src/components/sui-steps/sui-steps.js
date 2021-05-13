
export default {
    name: 'sui-steps',
    props: {
        type: String,
        steps: Array,
        completed: Number
    },
    computed: {
        complete() {
            return this.steps.length < this.completed ? this.steps.length : this.completed;
        }
    }
};
