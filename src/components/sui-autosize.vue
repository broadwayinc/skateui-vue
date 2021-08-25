<template lang="pug">
.sui-autosize(ref="wrapper" :class="{readonly}")
    .data-replica
        textarea(
            v-if='typeof readonly === "boolean"'
            :readonly='readonly'
            ref="textarea"
            :placeholder="placeholder"
            rows="1"
            :value="value_normalized"
            :maxlength="maxlength"
            @input="updateValue()"
            @focus="focus")
        p(ref="textarea" v-else-if="readonly.toLowerCase() === 'p'") {{value_normalized.substring(0, maxlength && typeof maxlength === 'number' ? maxlength : value_normalized.length)}}
        h1(ref="textarea" v-else-if="readonly.toLowerCase() === 'h1'") {{value_normalized.substring(0, maxlength && typeof maxlength === 'number' ? maxlength : value_normalized.length)}}
        h2(ref="textarea" v-else-if="readonly.toLowerCase() === 'h2'") {{value_normalized.substring(0, maxlength && typeof maxlength === 'number' ? maxlength : value_normalized.length)}}
        h3(ref="textarea" v-else-if="readonly.toLowerCase() === 'h3'") {{value_normalized.substring(0, maxlength && typeof maxlength === 'number' ? maxlength : value_normalized.length)}}
        h4(ref="textarea" v-else-if="readonly.toLowerCase() === 'h4'") {{value_normalized.substring(0, maxlength && typeof maxlength === 'number' ? maxlength : value_normalized.length)}}
        h5(ref="textarea" v-else-if="readonly.toLowerCase() === 'h5'") {{value_normalized.substring(0, maxlength && typeof maxlength === 'number' ? maxlength : value_normalized.length)}}
        h6(ref="textarea" v-else-if="readonly.toLowerCase() === 'h6'") {{value_normalized.substring(0, maxlength && typeof maxlength === 'number' ? maxlength : value_normalized.length)}}
</template>

<script>
export default {
    name: "sui-autosize",
    emits: ['update:modelValue', 'input', 'focus'],
    props: {
        placeholder: String,
        minFontSize: Number | String,
        maxFontSize: Number | String,
        value: String,
        modelValue: String,
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
                console.log({el});
                this.init(el);
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
                } else this.placeholdersize = this.maxFontSize;

                await this.updateValue(setValue);
            }

            init(el) {
                if (!el) {
                    throw 'no argument';
                }

                // remove event
                if (this.catchWindowResizeEvent) {
                    this.destroy();
                }
                this.catchWindowResizeEvent = null;

                this.allowEnter = false;
                this.readonly = false;

                this.maxFontSize = 72;
                this.minFontSize = 16;

                this.value = '';
                let setValue = '';

                this.id = '';

                // this.element is the wrapper
                if (typeof el === 'string' && el[0] === '#') {
                    this.id = el.substring(1);
                    this.element = document.getElementById(this.id);
                } else if (typeof el === 'object' && Object.keys(el).length) {
                    let {element, maxFontSize = 72, minFontSize = 16, value, allowEnter, readonly} = el;
                    if (typeof element === 'string' && element[0] === '#') {
                        this.id = element.substring(1);
                        this.element = document.getElementById(this.id);
                    } else if (element instanceof Node) {
                        this.element = element;
                        this.id = element.id || window.sui_generateId('sui_autosize');
                    }

                    maxFontSize = maxFontSize && typeof maxFontSize === 'string' ? Number(maxFontSize) : maxFontSize;
                    minFontSize = minFontSize && typeof minFontSize === 'string' ? Number(minFontSize) : minFontSize;

                    if (isNaN(maxFontSize))
                        throw 'MAX_NOT_NUMBER';
                    if (isNaN(minFontSize))
                        throw 'MIN_NOT_NUMBER';

                    if (minFontSize > maxFontSize) {
                        let big = minFontSize;
                        minFontSize = maxFontSize;
                        maxFontSize = big;
                    }

                    setValue = value;
                    if (allowEnter)
                        this.allowEnter = allowEnter;

                    if (readonly)
                        this.readonly = readonly;

                    this.maxFontSize = maxFontSize || 72;
                    this.minFontSize = minFontSize || 16;
                } else {
                    throw 'invalid parameters';
                }

                if (!this.element) {
                    throw 'no element';
                }

                this.element.id = this.id;
                this.textarea = this.element.childNodes[0];
                if (this.textarea.classList.contains('data-replica')) {
                    console.log({l: this.textarea.childNodes[0]});
                    this.textarea = this.textarea.childNodes[0];
                }

                // set textarea id
                this.textarea.id = this.id + '_textarea';
                this.value = setValue || this.textarea.value || "";

                // if (typeof this.readonly === 'boolean') {
                //     this.textarea.readOnly = this.readonly;
                // }

                this.elementStyle = window.getComputedStyle(this.textarea);

                // adjust for attribute for labels
                let getLabels = document.getElementsByTagName('Label');
                for (let l of getLabels) {
                    if (l.getAttribute('for') === this.id)
                        l.setAttribute('for', this.id + '_textarea');
                }

                let textarea = this.textarea;
                textarea.setAttribute('rows', '1');

                // let parent = this.element;
                // if ((el.readOnly || this.readonly) && !parent.classList.contains('readonly'))
                //     parent.classList.add('readonly');

                // let replica = document.createElement('div');
                // replica.classList.add('textarea');
                // parent.insertBefore(replica, textarea);
                // replica.append(textarea);

                this.initTextareaSize();

                this.catchWindowResizeEvent = window.sui_on.registerEvent.resize(this.initTextareaSize.bind(this));

                if (!this.readonly) {
                    this.placeholder = textarea.getAttribute('placeholder');

                    textarea.addEventListener('keydown', (e) => {
                        if (!this.allowEnter && e.key === 'Enter')
                            e.preventDefault();
                    });

                    textarea.addEventListener('input', (e) => {
                        this.updateValue(e.target.value);
                    });

                    textarea.addEventListener('focus', (e) => {
                        let target = e.target;
                        let parent = target.parentNode.parentNode;
                        if (parent.classList.contains('sui-autosize') && !parent.classList.contains('focus'))
                            parent.classList.add('focus');
                    });

                    textarea.addEventListener('blur', (e) => {
                        let target = e.target;
                        let parent = target.parentNode.parentNode;
                        if (parent.classList.contains('sui-autosize') && parent.classList.contains('focus'))
                            parent.classList.remove('focus');
                    });
                }
            }

            adjustSize() {
                if (!this.fontsize) {
                    let width = parseFloat(this.elementStyle.width);
                    let charLength = this.textarea.value.length || 1;
                    let division = Math.floor(width / charLength * 1.33);

                    if (this.maxFontSize < division) {
                        this.fontsize = this.maxFontSize;
                    } else if (this.minFontSize > division) {
                        this.fontsize = this.minFontSize;
                    } else {
                        this.fontsize = division;
                    }
                }

                let runDown = () => {
                    let doIt = () => {
                        this.element.style.setProperty('--auto-size', `${this.fontsize}px`);
                        let height = parseFloat(this.elementStyle.height);
                        let howmanylines = height / (this.fontsize * 1.5);
                        if (howmanylines > 2 && this.fontsize > this.minFontSize) {
                            let minus = this.fontsize - 1;
                            this.fontsize = minus > this.minFontSize ? minus : this.minFontSize;
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
                        if (howmanylines < 2 && this.fontsize < this.maxFontSize) {
                            let plus = this.fontsize + 1;
                            this.fontsize = plus < this.maxFontSize ? plus : this.maxFontSize;
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

                if (this.value) {
                    if (this.textarea.parentNode.classList.contains('empty')) {
                        this.textarea.parentNode.classList.remove('empty');
                    }

                    return runUp();
                }

                this.fontsize = this.placeholdersize;
                if (!this.textarea.parentNode.classList.contains('empty')) {
                    this.textarea.parentNode.classList.add('empty');
                }
                this.element.style.setProperty('--auto-size', `${this.fontsize}px`);
            }

            destroy() {
                window.sui_on.removeEvent.resize(this.catchWindowResizeEvent);
            }
        }

        if (!window.sui_autosize) {
            window.sui_autosize = SuiAutosize;
        }
    },
    mounted() {
        this.init();
        this.$nextTick(() => {
            if (!this.readonly && this.autofocus) {
                this.$refs.textarea.focus();
            }
        });
    },
    beforeDestroy() {
        this.autosize.destroy();
    },
    computed: {
        value_normalized() {
            let value = this.modelValue || this.value;
            return typeof value === 'string' ? value : "";
        }
    },
    watch: {
        readonly(n) {
            this.$nextTick(() => {
                this.autosize.init({
                    element: this.$refs.wrapper,
                    minFontSize: this.minFontSize,
                    maxFontSize: this.maxFontSize,
                    value: this.value,
                    allowEnter: this.allowEnter,
                    readonly: n
                });
            });
        },
        allowEnter(n) {
            this.$nextTick(() => {
                this.autosize.init({
                    element: this.$refs.wrapper,
                    minFontSize: this.minFontSize,
                    maxFontSize: this.maxFontSize,
                    value: this.value,
                    allowEnter: n,
                    readonly: this.readonly
                });
            });
        }
    },
    methods: {
        init() {
            this.autosize = new window.sui_autosize({
                element: this.$refs.wrapper,
                minFontSize: this.minFontSize,
                maxFontSize: this.maxFontSize,
                value: this.value,
                allowEnter: this.allowEnter,
                readonly: this.readonly
            });
        },
        focus(e) {
            this.$emit('focus', e);
        },
        updateValue(value) {
            this.$emit('input', value ? value : this.$refs.textarea.value);
            this.$emit('update:modelValue', value ? value : this.$refs.textarea.value);
        }
    }
};
</script>

<style lang="less">
.sui-autosize {
    position: relative;
    border: .05em dashed transparent;
    font-size: var(--auto-size);
    display: inline-block;
    box-sizing: border-box;
    max-width: 100%;
    border-radius: 3px /* fallback */;
    border-radius: ~"clamp(0px, calc(var(--border-radius, 3px) * 2), .5em)";
    line-height: 1;

    &.readonly {
        cursor: default;

        * {
            cursor: default;
        }
    }

    &:not(.readonly) {
        border-color: rgba(153, 153, 153, 0.5);

        &:hover {
            border-color: #999999;
        }
    }

    & > .data-replica {
        position: relative;
        vertical-align: middle;
        display: inline-grid;
        min-height: 1.5em;
        width: 100%;
        word-break: break-word;

        &::after {
            content: attr(data-replica) " ";
            white-space: pre-wrap;
            opacity: 0;
            line-height: 1.5em;
        }

        &.data-replica.empty {
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
                color: #999999;
                font-weight: inherit !important;
            }

            &:read-only {
                text-overflow: ellipsis;
            }
        }

        & > textarea, & > p, & > h1, & > h2, & > h3, & > h4, & > h5, & > h6 {
            color: inherit;
            caret-color: inherit;
            margin: 0;
            white-space: pre-wrap;
        }

        & > textarea, & > p, & > h1, & > h2, & > h3, & > h4, & > h5, & > h6,
        &::after {
            //color: inherit;
            /* Identical styling required!! */
            box-sizing: border-box;
            text-align: inherit;
            background-color: transparent;
            line-height: 1.5em;
            font-size: 1em;
            padding: 1px 0.75rem; /* fallback */
            padding: 1px ~"clamp(8px, 0.25em, 0.75rem)";
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