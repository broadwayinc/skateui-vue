
export default {
    name: 'ss-label',
    props: {
        showSelector: Boolean,
        error: Boolean,
        label: String,
        type: {
            type: String,
            default: 'text'
        },
        prefix: String,
        suffix: String,
        required: Boolean,
        disabled: Boolean,
        message: {
            type: String,
            default: null
        },
    },
    data() {
        return {
            msg: null,
            elementId: null
        };
    },
    watch: {
        message(v) {
            if (this.msg)
                this.msg.innerHTML = v;
        },
        error(v) {
            if (this.msg) {
                if (v)
                    this.msg.classList.add('error');
                else if (this.msg.classList.contains('error'))
                    this.msg.classList.remove('error');
            }
        }
    },
    methods: {
        focusInput(e) {
            let elem = document.getElementById(this.elementId + '_input');
            elem.focus();

            if (e === false)
                elem.setSelectionRange(0, 0);
            else {
                elem.setSelectionRange(elem.value.length, elem.value.length);
            }
        }
    },
    mounted() {
        this.elementId = this.$refs.label.id || window.sui_generateId(this.$options.name);
        this.$refs.label.id = this.elementId;

        let el = document.getElementById(this.elementId);
        if (!el)
            return;

        let input = [el.querySelector('textarea'), el.querySelector('input'), el.querySelector('select')];
        for (let i of input)
            if (i) {
                if (i.id)
                    this.elementId = i.id;

                i.id = this.elementId + '_input';
                break;
            }

        let block = document.createElement('div');
        block.classList.add('sui-input');

        let msg = document.createElement('div');
        msg.classList.add('sui-input-message');
        if (this.error)
            msg.classList.add('error');

        msg.innerHTML = this.message;

        el.parentNode.insertBefore(block, el.nextSibling);
        block.append(el);
        block.append(msg);
        el.removeAttribute('id');
        block.id = this.elementId;

        this.msg = msg;

        let sui_textarea = {
            init: (el) => {
                let setup = (el) => {
                    el.setAttribute('rows', '1');
                    let parent = el.parentElement;
                    let replica = document.createElement('div');
                    replica.classList.add('textarea');
                    parent.insertBefore(replica, el);
                    replica.append(el);
                    el.addEventListener('input', (e) => {
                        let target = e.target;
                        target.parentNode.dataset.replica = target.value;
                    });
                    el.addEventListener('focus', (e) => {
                        let target = e.target;
                        let par = target.parentNode.parentNode.parentNode;
                        if (par.classList.contains('sui-textarea') && !par.classList.contains('focus'))
                            par.classList.add('focus');

                    });
                    el.addEventListener('blur', (e) => {
                        let target = e.target;
                        let par = target.parentNode.parentNode.parentNode;
                        if (par.classList.contains('sui-textarea') && par.classList.contains('focus'))
                            par.classList.remove('focus');
                    });
                };

                setup(el);
            }
        };

        if (this.type === 'textarea')
            sui_textarea.init(document.getElementById(this.elementId + '_input'));
    }
};
