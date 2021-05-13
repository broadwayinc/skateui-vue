
export default {
    name: 'sui-tooltip',
    props: {
        direction: String
    },
    data() {
        return {
            isBottom: false,
            isLeft: false,
            maxWidth: null
        };
    },
    methods: {
        setPosition(e) {
            let y = window.innerHeight / 2 - 24;
            let x = window.innerWidth / 2 + 24;

            this.isBottom = (e.clientY < y || this.direction?.includes('bottom')) && (!this.direction || !this.direction?.includes('top'));
            this.isLeft = (e.clientX > x || this.direction?.includes('left')) && (!this.direction || !this.direction?.includes('right'));
            this.maxWidth = this.isLeft ? `${e.clientX}px` : `calc(${window.innerWidth - e.clientX}px)`;
        }
    }
};
