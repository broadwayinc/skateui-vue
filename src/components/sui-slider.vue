<template lang="pug">
    .sui-sliderWrapper
        .sui-slider(:id='elementId' :style="computedStyle")
            .slide-wrapper(:style="{transform: 'translateX(' + sliderPosition + 'px)'}" :class="{animating: isAnimate}")
                li.slide-item(v-for='(sl, idx, k) in slideArray_computed' :key='sl.uniqueId ? sl.uniqueId + idx : k' :style="{backgroundColor: sl.color}")
                    .imageWrapper(:style="[style_imageWrapper(sl)]")
                        img(style='position:absolute; width: 100%' src="https://d2068sxih1zpja.cloudfront.net/eyJidWNrZXQiOiJiaW5jc3RvcmFnZSIsImtleSI6InBsYXphL2E4MTVhZjc3LTA5NmUtNDU3Zi04NDc2LTk5NGZiYzhmNWRiOC9pbWFnZS8xMzI5MjdfMnliVHQ4SlMxNjEzNTcwNyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODAwLCJoZWlnaHQiOjgwMCwiZml0IjoiaW5zaWRlIn19fQ==")
                        .slideText
                            sui-autosize(:value="sl.text" style="{width: '100%'}" :style="{... style_slideText(sl), width: '100%'}" readonly)
            .swiper-pagination(v-if='showPagination && slideArray.length > 1' :id='`pagination_${elementId}`' slot="pagination")
                .swiper-pagination-bullet(v-for="(slide, i) in slideArray" :class="{'swiper-pagination-bullet-active': currentSlideIndex === i}" @click="goToSlide(i)")
            .swiper-controls(v-if="showArrow")
                .controls.prev(v-if="loop || currentSlideIndex !== 0" @click="prev()" :style='{backgroundImage:`url("${swiper_arrows.prev}")`}')
                .controls.next(v-if="loop || currentSlideIndex !== slideArray.length - 1" @click="next()" :style='{backgroundImage:`url("${swiper_arrows.next}")`}')
</template>

<script>
export default {
    name: "ss-slide",
    props: {
        height: Number,
        nullIcon: String | Boolean,
        nullColor: String,
        paginationBlurColor: String,
        paginationFocusColor: String,
        showPagination: {type: Boolean, default: false},
        slideArray: Array,
        outputText: Function,
        outputCurrentIndex: Function,
        ratio: Array,
        showText: Boolean,
        parallax: String | Boolean,
        showArrow: {type: Boolean, default: true},
        onLoad: Function,
        loop: {type: Boolean, default: false},
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
        }
    },
    created() {
        if (window.sui_app)
            this.eventId = window.sui_app.registerEvent.resize(() => {
                try {
                    this.pageWidth = document.getElementById(this.elementId).getBoundingClientRect().width;
                } catch (e) {
                    //console.log("Error")
                }
            });
    },
    mounted() {
        this.pageWidth = document.getElementById(this.elementId).getBoundingClientRect().width;
        this.sliderPosition = -this.pageWidth;
        this.savedSliderPosition = -this.pageWidth;
        try {
            this.pageWidth = document.getElementById(this.elementId).getBoundingClientRect().width;
        } catch (e) {
            //console.log("Error")
        }
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
        if (window.sui_app)
            window.sui_app.removeEvent.resize(this.eventId);
    },
    computed: {
        dragDirection() {
            let direction = 'left';
            if (this.clickStart - this.dragDuration < 0) {
                direction = 'right';
            }
            return direction;
        },
        color() {
            let color = {
                '--button': '#ff851b',
                '--content-focus': '#ff851b',
                '--content-text': '#333333'
            };
            return color;
        },
        slideArray_computed() {
            let sl = [];
            const img_to_fetch = []
            if (Array.isArray(this.slideArray)) {
                for (const s of this.slideArray) {
                    if (typeof s === 'string') {
                        if (s) img_to_fetch.push(s);
                        sl.push({image: s});
                    } else {
                        const obj = {
                            image: s.image || '',
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
        computedStyle() {
            let obj = {
                '--slideFocus': this.paginationFocusColor || this.color['--content-focus'],
                '--slideBlur': this.paginationBlurColor || this.color['--content-text'],
                height: this.height + 'px'
            };
            return obj;
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
            if(!this.isDisabled) {
                this.isDisabled = true;
                setTimeout(() => {
                    this.isDisabled = false;
                }, 600);
                if(this.currentSlideIndex === 0) {
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
            if(!this.isDisabled) {
                this.isDisabled = true;
                setTimeout(() => {
                    this.isDisabled = false;
                }, 600);

                if(this.slideArray.length - 1 == this.currentSlideIndex) {
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
            let textAlign = 'center';
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
            const color = sl.image !== '' ? this.textColor || 'white' : this.textColor || null;
            return {
                textAlign,
                color,
                textShadow: 'rgba(0, 0, 0, 0.5) 3px 3px 9px'
            };
        },
        style_imageWrapper(sl) {
            const height = this.showPagination ? 'calc(100% - 16px)' : null;
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
            return {height, alignItems};
        }
    }

};
</script>
<style lang="less">
.sui-sliderWrapper {
    position: relative;
    height: 100%;

    .sui-slider {
        overflow: hidden;

        .swiper-pagination {
            position: absolute;
            bottom: 0;
            text-align: center;
            width: 100%;
        }

        .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            display: inline-block;
            border-radius: 50px;
            background: var(--slideBlur);
            opacity: 0.5;
            margin: auto 4px;
            cursor: pointer;
            transition: width 0.5s;

            &-active {
                background: var(--slideFocus) !important;
                opacity: 1 !important;
                width: 24px;
            }
        }
    }
}

.sui-slider, .slide-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
}

.wrapper {
    width: 800px;
}

ul {
    padding: 0;
    margin: 0;
    display: block;
}

.slide-item {
    position: relative;
    display: inline-block;
    width: 100%;
    flex-shrink: 0;
}

.animating {
    transition: all 0.5s;
}

.swiper-controls {
    position: absolute;
    top: 50%;
    width: 100%;

    .controls {
        position: absolute;
        transform: translateY(-50%);
        display: inline-block;
        cursor: pointer;
        padding: 32px;
        border-radius: 8px;
        opacity: 0.2;
        background-color: #000;
        background-size: 26px 44px;
        background-position: center;
        background-repeat: no-repeat;

        &:hover {
            opacity: 0.4;
        }

        &.prev {
            left: 10px;
        }

        &.next {
            right: 10px;
        }
    }
}

.imageWrapper {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;

    .slideText {
        margin: 4%;
        width: 100%;
    }
}
</style>