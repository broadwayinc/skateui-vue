
export default {
    name: 'sui-card',
    props: {
        contentCenter: Boolean,
        stickyMobileButton: Boolean,
        disabled: Boolean,
        stickyTitle: Boolean,
        close: Function
    },
    data() {
        return {
            resizeEventId: null
        };
    },
    destroyed() {
        window.sui_on.removeEvent.resize(this.resizeEventId);
    },
    methods: {
        hasTitleSlot() {
            return !!this.$slots.title;
        },
        hasImageSlot() {
            return !!this.$slots.image;
        },
        hasContentSlot() {
            return !!this.$slots.content;
        },
        hasButtonFooterSlot() {
            return !!this.$slots.buttonFooter;
        },
        hasFooterSlot() {
            return !!this.$slots.footer;
        }
    }
};
