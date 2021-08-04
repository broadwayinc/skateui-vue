<template lang="pug">
.sui-autosize(ref="wrapper")
    textarea(v-if='typeof readonly === "boolean"' ref="textarea" :placeholder='placeholder' rows="1" :value="inputValue" :maxlength="maxlength" @input="updateValue()" @focus="focus")
    p(ref="textarea" v-else-if="readonly.toLowerCase() === 'p'") {{inputValue.substring(0, typeof maxlength === 'number' ? maxlength : inputValue.length)}}
    h1(ref="textarea" v-else-if="readonly.toLowerCase() === 'h1'") {{inputValue.substring(0, typeof maxlength === 'number' ? maxlength : inputValue.length)}}
    h2(ref="textarea" v-else-if="readonly.toLowerCase() === 'h2'") {{inputValue.substring(0, typeof maxlength === 'number' ? maxlength : inputValue.length)}}
    h3(ref="textarea" v-else-if="readonly.toLowerCase() === 'h3'") {{inputValue.substring(0, typeof maxlength === 'number' ? maxlength : inputValue.length)}}
    h4(ref="textarea" v-else-if="readonly.toLowerCase() === 'h4'") {{inputValue.substring(0, typeof maxlength === 'number' ? maxlength : inputValue.length)}}
    h5(ref="textarea" v-else-if="readonly.toLowerCase() === 'h5'") {{inputValue.substring(0, typeof maxlength === 'number' ? maxlength : inputValue.length)}}
    h6(ref="textarea" v-else-if="readonly.toLowerCase() === 'h6'") {{inputValue.substring(0, typeof maxlength === 'number' ? maxlength : inputValue.length)}}
</template>

<script>
export default {
    name: "sui-autosize",
    emits: ['focus'],
    props: {
        placeholder: String,
        min: Number | String,
        max: Number | String,
        value: String,
        output: Function,
        allowEnter: Boolean,
        maxlength: Number,
        readonly: [Boolean, String],
        autofocus: Boolean
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
                this.id = '';
                // this.element is the wrapper
                if (typeof el === 'string' && el[0] === '#') {
                    this.id = el.substring(1);
                    this.element = document.getElementById(this.id);
                } else if (typeof el === 'object' && Object.keys(el).length) {
                    let {element, max = 72, min = 16, value, allowEnter, readonly} = el;
                    if (typeof element === 'string' && element[0] === '#') {
                        this.id = element.substring(1);
                        this.element = document.getElementById(this.id);
                    } else if (element instanceof Node) {
                        this.element = element;
                        this.id = element.id || window.sui_generateId('sui_autosize');
                    }

                    max = max && typeof max === 'string' ? Number(max) : max;
                    min = min && typeof min === 'string' ? Number(min) : min;

                    if (isNaN(max))
                        throw 'MAX_NOT_NUMBER';
                    if (isNaN(min))
                        throw 'MIN_NOT_NUMBER';

                    if (min > max) {
                        let big = min;
                        min = max;
                        max = big;
                    }

                    setValue = value;
                    if (allowEnter)
                        this.allowEnter = allowEnter;

                    if (readonly)
                        this.readonly = readonly;

                    this.max = max || 72;
                    this.min = min || 16;
                } else {
                    throw 'invalid parameters';
                }

                if (!this.element) {
                    throw 'no element';
                }

                this.element.id = this.id;
                this.textarea = this.element.childNodes[0];

                // set textarea id
                this.textarea.id = this.id + '_textarea';
                this.value = setValue || this.textarea.value || "";

                if (typeof this.readonly === 'boolean') {
                    this.textarea.readOnly = this.readonly;
                }

                this.elementStyle = window.getComputedStyle(this.textarea);

                // adjust for attribute for labels
                let getLabels = document.getElementsByTagName('Label');
                for (let l of getLabels) {
                    if (l.getAttribute('for') === this.id)
                        l.setAttribute('for', this.id + '_textarea');
                }

                this.init();
            }

            updateValue(v) {
                let value = typeof v === 'string' ? v : this.textarea.value;
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

                await this.updateValue(setValue);
            }

            init() {
                let el = this.textarea;
                let parent = this.element;

                el.setAttribute('rows', '1');

                if ((el.readOnly || this.readonly) && !parent.classList.contains('readonly'))
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
                    let charLength = this.textarea.value.length || 1;
                    let div = width / charLength;
                    div = Math.floor(div * 1.33);

                    if (this.max < div)
                        this.fontsize = this.max;

                    else if (this.min > div)
                        this.fontsize = this.min;

                    else
                        this.fontsize = div;

                }

                let runDown = () => {
                    let doIt = () => {
                        this.element.style.setProperty('--auto-size', `${this.fontsize}px`);
                        let height = parseFloat(this.elementStyle.height);
                        let howmanylines = height / (this.fontsize * 1.5);
                        if (howmanylines > 2 && this.fontsize > this.min) {
                            let minus = this.fontsize - 1;
                            this.fontsize = minus > this.min ? minus : this.min;
                            doIt();
                        }
                    };

                    return new Promise(res => {
                        doIt();
                        res(true);
                    });
                };

                let runUp = () => {

                    let doIt = () => {
                        this.element.style.setProperty('--auto-size', `${this.fontsize}px`);
                        let height = parseFloat(this.elementStyle.height);
                        let howmanylines = height / (this.fontsize * 1.5);
                        if (howmanylines < 2 && this.fontsize < this.max) {
                            let plus = this.fontsize + 1;
                            this.fontsize = plus < this.max ? plus : this.max;
                            doIt();
                        } else {
                            return runDown();
                        }
                    };

                    return new Promise(async res => {
                        await doIt();
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
            element: this.$refs.wrapper,
            min: this.min,
            max: this.max,
            value: this.value,
            allowEnter: this.allowEnter,
            readonly: this.readonly
        });
        this.$nextTick(() => {
            if (this.autofocus)
                this.$refs.textarea.focus();
        });
    },
    beforeDestroy() {
        this.autosize.destroy();
    },
    methods: {
        focus(e) {
            this.$emit('focus', e);
        },
        updateValue(value) {
            this.$emit('input', value ? value : this.$refs.textarea.value);
        },
    },
    computed: {
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
</script>

<style lang="less">
.sui-autosize {
    position: relative;
    border: 2px dashed transparent;
    font-size: var(--auto-size);
    display: inline-block;
    box-sizing: border-box;
    max-width: 100%;
    //max-width: calc(100% - 4px);
    border-radius: 3px /* fallback */;
    border-radius: ~"clamp(0px, calc(var(--border-radius, 3px) * 2), .5em)";

    &.readonly {
        cursor: default;

        * {
            cursor: default;
        }
    }

    &:not(.readonly) {
        border-color: rgba(128, 128, 128, 0.5);

        &:hover {
            border-color: rgba(128, 128, 128, 1);
        }
    }

    & > .textarea {
        position: relative;
        vertical-align: middle;
        display: inline-grid;
        min-height: 2rem;
        width: 100%;
        word-break: break-word;

        &::after {
            content: attr(data-replica) " ";
            white-space: pre-wrap;
            color: transparent;
        }

        &.textarea.empty {
            & > textarea:placeholder-shown, &::after {
                height: var(--placeholder-height);
            }
        }

        & > textarea, & > p, & > h1, & > h2, & > h3, & > h4, & > h5, & > h6 {
            position: absolute;
            top: 0;
            resize: none;
            overflow: hidden;
            min-height: 1.5em;
            z-index: 1;
            border: none;
            height: 100%;
            width: 100%;

            &::placeholder {
                font-size: var(--placeholder-size);
                white-space: nowrap;
                color: rgba(128, 128, 128, 0.75);
                font-weight: inherit !important;
            }

            &:read-only {
                text-overflow: ellipsis;
            }
        }

        & > textarea, & > p, & > h1, & > h2, & > h3, & > h4, & > h5, & > h6 {
            color: inherit;
            caret-color: inherit;
        }

        &::after {
            color: transparent;
        }

        & > textarea, & > p, & > h1, & > h2, & > h3, & > h4, & > h5, & > h6,
        &::after {
            //color: inherit;
            /* Identical styling required!! */
            box-sizing: border-box;
            background-color: transparent;
            line-height: 1.5em;
            font-size: 1em;
            padding: .5rem 0.75rem; /* fallback */
            padding: .5rem ~"clamp(4px, 0.5em, 1rem)";
            font-weight: inherit !important;
            outline: none;
            border: none;
            max-width: 100%;
            /* Place on top of each other */
            grid-area: 1 e("/") 1 e("/") 2 e("/") 2;
        }
    }
}
</style>