<template lang="pug">
.sui-sticky(:id='elementId')
    slot
</template>

<script>
export default {
    name: 'sui-sticky',
    props: {
        offset: {type: Number, default: 0},
        disableSticky: false,
        ignoreNavbar: {type: Boolean, default: false}
    },
    data() {
        return {
            sticky: null,
            resizeEventIdx: null
        };
    },
    watch: {
        disableSticky(n) {
            if (n)
                this.sticky.disable();
            else
                this.sticky.activate();
        }
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
        if (window.sui_sticky)
            return;

        class SuiSticky {
            constructor(option) {
                let {elementId, offset = 0, ignoreNavbar = false, disableSticky = false} = option;
                if (!elementId) throw 'no id';

                this.disableSticky = disableSticky;
                this.elementId = null;
                this.element = null;
                this.scroll_eventId = null;
                this.resize_eventId = null;
                this.previousScroll = 0;
                this.stickyHeight = 0;
                this.ignoreNavbar = false;
                this.dynamicOffset = 0;
                this.sticky_computedStyle = null;
                this.offset = 0;
                this.adjust_sticky = (function () {

                    let doIt = () => {
                        if (!this.sticky_computedStyle) return;

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
                        } else
                            this.dynamicOffset = offsetHeight + this.offset;

                        this.previousScroll = currentPageScrollPosition;
                        this.element.style.top = this.dynamicOffset + 'px';
                    };
                    if (window?.sui_app) doIt();
                    else
                        window.requestAnimationFrame(() => {
                            doIt();
                        });
                }).bind(this);

                this.offset = offset;
                this.ignoreNavbar = ignoreNavbar;
                this.elementId = elementId;
                this.element = document.getElementById(elementId);
                this.sticky_computedStyle = window.getComputedStyle(this.element);

                if (this.disableSticky)
                    return;

                this.activate();
            }

            activate() {
                this.element.style.position = 'sticky';
                this.adjust_sticky();

                if (window.sui_app) {
                    this.scroll_eventId = window.sui_app.registerEvent.scroll(this.adjust_sticky);
                    this.resize_eventId = window.sui_app.registerEvent.resize(this.adjust_sticky);
                    return;
                }

                document.addEventListener(
                    'scroll',
                    this.adjust_sticky,
                    {passive: true}
                );
                window.addEventListener(
                    'resize',
                    this.adjust_sticky,
                    {passive: true}
                );
            }

            disable() {
                this.element.style.position = null;
                this.element.style.top = null;

                if (window.sui_app) {
                    window.sui_app.removeEvent.scroll(this.scroll_eventId);
                    window.sui_app.removeEvent.resize(this.resize_eventId);
                    return;
                }

                document.removeEventListener('scroll',
                    this.adjust_sticky,
                    {passive: true});
                window.removeEventListener('resize',
                    this.adjust_sticky,
                    {passive: true});
            }
        }

        window.sui_sticky = SuiSticky;
    },
    mounted() {
        this.sticky = new window.sui_sticky({
            elementId: this.elementId,
            offset: this.offset,
            ignoreNavbar: this.ignoreNavbar,
            disableSticky: this.disableSticky
        });
    },
    beforeDestroy() {
        this.sticky.disable();
    }
};
</script>
