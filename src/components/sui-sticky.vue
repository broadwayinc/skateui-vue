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
            return window.sui_generateId(this.$options.name);
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

                    if (!this.sticky_computedStyle)
                        return;

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

                }).bind(this);

                this.offset = offset;
                this.ignoreNavbar = ignoreNavbar;
                this.element = document.getElementById(elementId);
                this.sticky_computedStyle = window.getComputedStyle(this.element);

                if (this.disableSticky)
                    return;

                this.activate();
            }

            activate() {
                this.element.style.position = 'sticky';
                this.adjust_sticky();

                this.scroll_eventId = window.sui_on.registerEvent.scroll(this.adjust_sticky);
                this.resize_eventId = window.sui_on.registerEvent.resize(this.adjust_sticky);
            }

            disable() {
                this.element.style.position = null;
                this.element.style.top = null;

                window.sui_on.removeEvent.scroll(this.scroll_eventId);
                window.sui_on.removeEvent.resize(this.resize_eventId);
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