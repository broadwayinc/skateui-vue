
export default {
    name: 'sui-button',
    props: {
        type: {
            type: String
        },
        disabled: Boolean,
        href: String,
        target: String,
        icon: String,
        loading: {
            type: Boolean || Function,
            default: false
        },
    },
    data() {
        return {
            loading_onclick: false
        };
    },
    computed: {
        showLoading() {
            return this.loading_onclick || this.loading === true;
        },
        typeAttribute() {
            for (let t of ['button', 'submit', 'reset']) {
                if (this.type === t) return t;
            }
            return null;
        }
    },
    mounted() {
        let bk = this.$el.style.backgroundColor || this.$el.style.background;
        if (bk)
            this.$el.style.setProperty('--button-background-color', bk);
    },
    methods: {
        async click(e) {
            if (typeof this.loading === 'function') {
                this.loading_onclick = true;

                let p = this.loading(e);

                if (p instanceof Promise)
                    await p;

                this.loading_onclick = false;
            } else
                this.$emit('click', e);
        },
    }
};
