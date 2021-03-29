<template lang="pug">
.sui-sticky(:id='elementId')
    slot
</template>

<script>
export default {
    name: 'sui-sticky',
    props: {
        offset: {type: Number, default: 0},
        ignoreNavbar: {type: Boolean, default: false}
    },
    data() {
        return {
            sticky: null
        };
    },
    computed: {
        elementId() {
            function generateId(option) {
                let limit = 12;
                let prefix = '';

                if (typeof option === 'number') limit = option;
                else if (typeof option === 'string') prefix = `${option}_`;

                const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

                let text = '';
                for (let i = 0; i < limit - 6; i++) text += possible.charAt(Math.floor(Math.random() * (possible.length - 1)));

                const numb = new Date()
                    .getTime()
                    .toString()
                    .substring(7, 13); // SECOND, MILLISECOND

                const shuffleArray = (array) => {
                    let currentIndex = array.length;
                    let temporaryValue, randomIndex;
                    while (0 !== currentIndex) {
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }
                    return array;
                };

                const letter_array = shuffleArray((text + numb).split(''));

                let output = '';
                for (let i = 0; i < limit; i++) output += letter_array[i];

                return prefix + output;
            }

            return generateId(this.$options.name);
        }
    },
    created() {
        class SuiSticky {
            constructor(option) {
                this.elementId = null;
                this.element = null;
                this.scroll_eventIdx = null;
                this.resize_eventIdx = null;
                this.previousScroll = 0;
                this.stickyHeight = 0;
                this.ignoreNavbar = false;
                this.dynamicOffset = 0;
                this.sticky_computedStyle = null;
                this.offset = 0;
                this.adjust_sticky = (function () {
                    let doIt = () => {
                        this.stickyHeight = parseFloat(this.sticky_computedStyle.height);
                        let screenOverload = this.stickyHeight - document.documentElement.clientHeight;
                        screenOverload = screenOverload > 0 ? screenOverload : 0;
                        const currentPageScrollPosition = window.pageYOffset;

                        const offsetHeight = this.ignoreNavbar ? 0 : window?.sui_app?.navbarHeight_dynamic || 0;
                        if (screenOverload) {
                            screenOverload = screenOverload * -1;
                            const scrollSum = this.previousScroll - currentPageScrollPosition;
                            let sum = scrollSum + this.dynamicOffset;
                            sum = offsetHeight < sum ? offsetHeight : screenOverload > sum ? screenOverload : sum;
                            this.dynamicOffset = sum;
                        } else {
                            this.dynamicOffset = offsetHeight + this.offset;
                        }
                        this.previousScroll = currentPageScrollPosition;
                        this.element.style.top = this.dynamicOffset + 'px';
                    };
                    if (window?.sui_app) doIt();
                    else
                        window.requestAnimationFrame(() => {
                            doIt();
                        });
                }).bind(this);
                this.init(option);
            }

            destroy() {
                this.elementId = null;
                this.element = null;
                this.scroll_eventIdx = null;
                this.resize_eventIdx = null;
                this.previousScroll = 0;
                this.stickyHeight = 0;
                this.dynamicOffset = 0;
                this.sticky_computedStyle = null;

                if (window.sui_app) {
                    window.sui_app.scroll_callback.splice(this.scroll_eventIdx, 1);
                    window.sui_app.resize_callback.splice(this.scroll_eventIdx, 1);
                    return;
                }

                document.removeEventListener('scroll',
                    this.adjust_sticky,
                    {passive: true});
                document.removeEventListener('resize',
                    this.adjust_sticky,
                    {passive: true});
            }

            init(option) {
                let {id, offset = 0, ignoreNavbar} = option;
                this.offset = offset;
                this.ignoreNavbar = ignoreNavbar;
                this.elementId = id;
                this.element = document.getElementById(id);
                this.element.style.position = 'sticky';
                this.element.style.top = '0';
                this.sticky_computedStyle = window.getComputedStyle(this.element);

                if (window.sui_app) {
                    window.sui_app.scroll_callback.push(this.adjust_sticky);
                    window.sui_app.resize_callback.push(this.adjust_sticky);
                    this.scroll_eventIdx = window.sui_app.scroll_callback.length - 1;
                    this.resize_eventIdx = window.sui_app.resize_callback.length - 1;
                    return;
                }

                document.addEventListener(
                    'scroll',
                    this.adjust_sticky,
                    {passive: true}
                );
                document.addEventListener(
                    'resize',
                    this.adjust_sticky,
                    {passive: true}
                );
            }
        }

        window.sui_sticky = SuiSticky;
    },
    mounted() {
        this.sticky = new window.sui_sticky({id: this.elementId, offset: this.offset, ignoreNavbar: this.ignoreNavbar});
    },
    beforeDestroy() {
        this.sticky.destroy();
    }
};
</script>
