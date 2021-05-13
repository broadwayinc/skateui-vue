
export default {
    name: "sui-autosize",
    props: {
        placeholder: String,
        min: Number,
        max: Number,
        value: String,
        output: Function,
        allowEnter: Boolean,
        maxlength: Number,
        readonly: Boolean,
    },
    data() {
        return {
            autosize: null
        };
    },
    created() {
        class SuiAutosize {
            constructor(el) {
                if (!el)
                    throw 'no argument';
                this.eventId = null;
                this.max = 72;
                this.min = 16;
                this.value = '';
                this.allowEnter = false;
                this.readonly = false;
                let setValue = "";

                if (typeof el === 'string')
                    this.element = document.getElementById(el[0] === '#' ? el.substring(1) : el);
                else if (typeof el === 'object' && Object.keys(el).length) {
                    let {element, elementId, max, min, value, allowEnter, readonly} = el;

                    setValue = value;
                    if (allowEnter)
                        this.allowEnter = allowEnter;

                    if (readonly)
                        this.readonly = readonly;

                    if (typeof elementId === 'string')
                        this.element = document.getElementById(elementId[0] === '#' ? elementId.substring(1) : elementId);

                    else if (element && element instanceof Node) this.element = element;

                    else
                        throw 'no element';

                    this.max = max || 72;
                    this.min = min || 16;
                }

                if (!this.element)
                    throw 'no element';


                this.textarea = this.element.childNodes[0];
                this.value = setValue || this.textarea.value || "";
                this.textarea.readOnly = this.readonly;
                this.elementStyle = window.getComputedStyle(this.textarea);
                this.init();
            }

            updateValue(v) {
                let value = v || this.textarea.value;
                this.textarea.parentNode.dataset.replica = value;
                if (this.textarea.value !== value)
                    this.textarea.value = value + (value ? ' ' : '');
                this.value = value;
                return this.adjustSize();
            }

            async initTextareaSize() {
                this.placeholder = this.textarea.getAttribute('placeholder');

                let setValue = this.value;

                if (this.placeholder) {
                    await this.updateValue(this.placeholder);
                    this.element.style.minWidth = this.elementStyle.width;
                    this.placeholdersize = this.fontsize;
                    this.element.style.setProperty('--placeholder-size', `${this.placeholdersize}px`);
                    this.element.style.setProperty('--placeholder-height', this.elementStyle.height);
                } else this.placeholdersize = this.max;

                this.textarea.value = setValue + (setValue ? ' ' : '');
                this.textarea.parentNode.dataset.replica = setValue;
                this.value = setValue;

                await this.adjustSize();
            }

            init() {
                let el = this.textarea;
                let parent = this.element;

                el.setAttribute('rows', '1');

                if (el.readOnly && !parent.classList.contains('readonly'))
                    parent.classList.add('readonly');

                let replica = document.createElement('div');
                replica.classList.add('textarea');
                parent.insertBefore(replica, el);
                replica.append(el);

                this.placeholder = el.getAttribute('placeholder');

                this.initTextareaSize();

                this.eventId = window.sui_on.registerEvent.resize(this.initTextareaSize.bind(this));

                el.addEventListener('keydown', (e) => {
                    if (!this.allowEnter && e.key === 'Enter')
                        e.preventDefault();
                });

                el.addEventListener('input', (e) => {
                    this.updateValue();
                });

                el.addEventListener('focus', (e) => {
                    let target = e.target;
                    let par = target.parentNode.parentNode;
                    if (!target.readOnly && par.classList.contains('sui-autosize') && !par.classList.contains('focus'))
                        par.classList.add('focus');
                });

                el.addEventListener('blur', (e) => {
                    let target = e.target;
                    let par = target.parentNode.parentNode;
                    if (!target.readOnly && par.classList.contains('sui-autosize') && par.classList.contains('focus'))
                        par.classList.remove('focus');
                });
            }

            adjustSize() {

                if (!this.fontsize) {
                    let width = parseFloat(this.elementStyle.width);
                    let charLength = this.textarea.value.length;
                    let div = width / charLength;

                    div = div * 1.33;

                    if (this.max < div)
                        this.fontsize = this.max;

                    else if (this.min > div)
                        this.fontsize = this.min;

                    else
                        this.fontsize = div;
                }

                let runDown = () => {
                    this.element.style.setProperty('--auto-size', `${this.fontsize}px`);
                    let doIt = async () => {
                        let height = parseFloat(this.elementStyle.height);
                        let howmanylines = height / (this.fontsize * 1.5);
                        if (howmanylines > 2 && this.fontsize > this.min) {
                            let minus = this.fontsize - 1;
                            this.fontsize = minus > this.min ? minus : this.min;
                            await runDown();
                        }
                    };

                    return new Promise(res => {
                        doIt();
                        res(true);
                    });
                };

                let runUp = () => {
                    this.element.style.setProperty('--auto-size', `${this.fontsize}px`);

                    let doIt = async () => {
                        let height = parseFloat(this.elementStyle.height);
                        let howmanylines = height / (this.fontsize * 1.5);
                        if (howmanylines < 2 && this.fontsize < this.max) {
                            let plus = this.fontsize + 1;
                            this.fontsize = plus < this.max ? plus : this.max;
                            await runUp();
                        } else {
                            await runDown();
                        }
                    };

                    return new Promise(res => {
                        doIt();
                        res(true);
                    });
                };

                if (!this.value) {
                    this.fontsize = this.placeholdersize;
                    if (!this.textarea.parentNode.classList.contains('empty'))
                        this.textarea.parentNode.classList.add('empty');

                    this.element.style.setProperty('--auto-size', `${this.fontsize}px`);
                    return;
                }

                if (this.textarea.parentNode.classList.contains('empty'))
                    this.textarea.parentNode.classList.remove('empty');

                return runUp();
            }

            destroy() {
                window.sui_on.removeEvent.resize(this.eventId);
            }
        }

        if (!window.sui_autosize)
            window.sui_autosize = SuiAutosize;
    },
    mounted() {
        this.autosize = new window.sui_autosize({
            elementId: this.elementId,
            min: this.min,
            max: this.max,
            value: this.value,
            allowEnter: this.allowEnter,
            readonly: this.readonly
        });
    },
    beforeDestroy() {
        this.autosize.destroy();
    },
    computed: {
        elementId() {
            return window.sui_generateId(this.$options.name);
        },
        inputValue: {
            get: function () {
                return this.value;
            },
            set: function (v) {
                if (typeof this.output === 'function')
                    this.output(v);
            }
        }
    }
};