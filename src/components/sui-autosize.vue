<template lang="pug">
.sui-autosize(:id="elementId")
    textarea(:placeholder='placeholder' rows="1" v-model="inputValue" :maxlength="maxlength")
</template>

<script>
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

                    max = max && typeof max === 'string' ? Number(max) : max;
                    min = min && typeof min === 'string' ? Number(min) : min;

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

        & > textarea {
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
            }

            &:read-only {
                text-overflow: ellipsis;
            }
        }

        & > textarea {
            color: inherit;
            caret-color: inherit;
        }

        &::after {
            color: transparent;
        }

        & > textarea,
        &::after {
            /* Identical styling required!! */
            box-sizing: border-box;
            background-color: transparent;
            line-height: 1.5em;
            font-size: 1em;
            padding: .5rem 0.75rem; /* fallback */
            padding: .5rem ~"clamp(4px, 0.5em, 1rem)";
            outline: none;
            border: none;
            max-width: 100%;
            /* Place on top of each other */
            grid-area: 1 e("/") 1 e("/") 2 e("/") 2;
        }
    }
}
</style>