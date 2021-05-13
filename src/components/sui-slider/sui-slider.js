
export default {
    name: "ss-slide",
    props: {
        showPagination: {type: Boolean, default: false},
        slideArray: Array,
        outputText: Function,
        outputCurrentIndex: Function,
        ratio: Array,
        showText: Boolean,
        parallax: String | Boolean,
        showArrow: {type: Boolean, default: true},
        onLoad: Function,
        errorImg: String,
        loop: {type: Boolean, default: false}
    },
    data() {
        return {
            eventId: null,
            slider: null,
            currentSlideIndex: 0,
            pageWidth: 0,
            sliderPosition: 0,
            savedSliderPosition: 0,
            clickStart: 0,
            dragDuration: 0,
            isClick: false,
            isEditText: false,
            isAnimate: false,
            isDisabled: false,
            buffer: false,
            slideTextSize: null,
            slideHeight_calculated: '100%',
            thumbnailHeight: null
        };
    },
    mounted() {
        this.setWidth();

        if (window.sui_on)
            this.eventId = window.sui_on.registerEvent.resize(this.setWidth);

        this.slider = document.getElementById(this.elementId);
        this.slider.addEventListener('touchstart', (e) => {
            this.registerTouchEvent(e, 'touch');
        });
        this.slider.addEventListener('mousedown', e => {
            this.registerTouchEvent(e);
        });
        this.slider.addEventListener('touchend', e => {
            this.unregisterTouchEvent(e);
        });
        this.slider.addEventListener('mouseup', e => {
            this.unregisterTouchEvent(e);
        });
        this.slider.addEventListener('touchmove', e => {
            this.moveEvent(e, 'touch');
        });
        this.slider.addEventListener('mousemove', e => {
            this.moveEvent(e);
        });
    },
    destroyed() {
        window.sui_on.removeEvent.resize(this.eventId);
    },
    computed: {
        dragDirection() {
            let direction = 'left';
            if (this.clickStart - this.dragDuration < 0) {
                direction = 'right';
            }
            return direction;
        },
        slideArray_computed() {
            let sl = [];
            const img_to_fetch = [];
            if (Array.isArray(this.slideArray)) {
                for (const s of this.slideArray) {
                    if (typeof s === 'string') {
                        if (s) img_to_fetch.push(s);
                        sl.push({image: s});
                    } else {
                        const obj = {
                            image: s.src || '',
                            text: s.text || '',
                            textAlign: s.textAlign || ['center', 'center'],
                            uniqueId: s.uniqueId
                        };
                        sl.push(obj);
                    }
                }
            } else if (typeof this.slideArray === 'string') {
                if (this.slideArray) img_to_fetch.push(this.slideArray);
                sl.push({image: this.slideArray});
            } else sl.push({
                image: '',
                text: '',
                textAlign: ['center', 'center']
            });

            sl.unshift(sl[sl.length - 1]);
            sl.push(sl[1]);
            return sl;
        },
        elementId() {
            const limit = 5;
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let text = '';
            for (let i = 0; i < limit; i++) text += possible.charAt(Math.floor(Math.random() * (possible.length - 1)));
            return `ss-slide_${text}`;
        },
        swiper_arrows() {
            let color = '#fff';
            return {
                next: `data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23${color.substring(1)}'%2F%3E%3C%2Fsvg%3E`,
                prev: `data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23${color.substring(1)}'%2F%3E%3C%2Fsvg%3E`
            };
        },
    },
    methods: {
        setWidth() {
            this.pageWidth = document.getElementById(this.elementId).getBoundingClientRect().width;
            this.sliderPosition = -this.pageWidth;
            this.savedSliderPosition = -this.pageWidth;
            this.currentSlideIndex = 0;
        },
        registerTouchEvent(e, type = 'mouse') {
            if (!this.isDisabled) {
                if (e.target.nodeName === 'IMG') {
                    e.preventDefault();
                }
                this.isAnimate = false;
                this.clickStart = e.clientX;
                if (type === 'touch') this.clickStart = e.changedTouches[0].clientX;
                this.isClick = true;
            }
        },
        unregisterTouchEvent(e) {
            e.preventDefault();
            this.isClick = false;
            let slideable = true;
            if (!this.loop && this.currentSlideIndex === 0 && this.dragDirection === 'right' || !this.loop && this.currentSlideIndex === this.slideArray.length - 1 && this.dragDirection === 'left') {
                slideable = false;
            }
            if (slideable && Math.abs(this.dragDuration - this.clickStart) > this.pageWidth / 2) {
                if (this.dragDirection === 'left') {
                    this.isAnimate = true;
                    this.next();
                } else {
                    this.isAnimate = true;
                    this.prev();
                }
            } else {
                this.isAnimate = true;
                this.sliderPosition = this.savedSliderPosition;
            }
        },
        moveEvent(e, type = 'mouse') {
            this.dragDuration = e.clientX;
            if (type === 'touch') this.dragDuration = e.changedTouches[0].clientX;
            if (!this.isEditText && this.isClick && Math.abs(this.clickStart - this.dragDuration) > 30) {
                this.sliderPosition = this.savedSliderPosition - (this.clickStart - this.dragDuration);
            }
        },
        goToSlide(slideNumber) {
            this.currentSlideIndex = slideNumber++;
            this.sliderPosition = this.pageWidth * slideNumber * -1;
            this.savedSliderPosition = this.sliderPosition;
            this.currentSlide_index_output();
        },
        currentSlide_index_output(id = null) {
            if (typeof this.outputCurrentIndex === 'function') {
                this.outputCurrentIndex(this.currentSlideIndex);
            }
        },
        async prev() {
            if (!this.isDisabled) {
                this.isDisabled = true;
                setTimeout(() => {
                    this.isDisabled = false;
                }, 600);
                if (this.currentSlideIndex === 0) {
                    this.currentSlideIndex = this.slideArray.length - 1;
                    this.sliderPosition = 0;
                    this.currentSlide_index_output();
                    setTimeout(() => {
                        this.isAnimate = false;
                        this.sliderPosition = this.pageWidth * (this.slideArray.length) * -1;
                        this.savedSliderPosition = this.sliderPosition;
                    }, 500);
                } else {
                    this.currentSlideIndex -= 1;
                    this.sliderPosition = this.pageWidth * (this.currentSlideIndex + 1) * -1;
                    this.savedSliderPosition = this.sliderPosition;
                    this.currentSlide_index_output();
                }
            }
        },
        async next() {
            if (!this.isDisabled) {
                this.isDisabled = true;
                setTimeout(() => {
                    this.isDisabled = false;
                }, 600);

                if (this.slideArray.length - 1 === this.currentSlideIndex) {
                    this.currentSlideIndex = 0;
                    this.sliderPosition = this.pageWidth * (this.slideArray.length + 1) * -1;
                    this.currentSlide_index_output();
                    setTimeout(() => {
                        this.isAnimate = false;
                        this.sliderPosition = this.pageWidth * -1;
                        this.savedSliderPosition = this.sliderPosition;
                    }, 500);
                } else {
                    this.currentSlideIndex += 1;
                    this.sliderPosition = this.pageWidth * (this.currentSlideIndex + 1) * -1;
                    this.savedSliderPosition = this.sliderPosition;
                    this.currentSlide_index_output();
                }
            }
        },
        style_slideText(sl) {
            let textAlign = 'center', color;
            try {
                switch (sl.textAlign[0]) {
                    case 'left':
                        textAlign = 'left';
                        break;
                    case 'right':
                        textAlign = 'right';
                        break;
                }
            } catch (err) {
            }
            if (sl.image) {
                color = sl.image ? 'white' : null;
            }

            return {
                textAlign,
                color,
                textShadow: sl.image ? 'rgba(0, 0, 0, 0.5) 3px 3px 9px' : null
            };
        },
        style_imageWrapper(sl) {
            // vertical alignment if slide text
            let alignItems = 'center';
            try {
                switch (sl.textAlign[1]) {
                    case 'top':
                        alignItems = 'flex-start';
                        break;
                    case 'bottom':
                        alignItems = 'flex-end';
                        break;
                }
            } catch (err) {
            }
            return {
                alignItems
            };
        }
    }

};