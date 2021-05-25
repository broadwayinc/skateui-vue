<template lang="pug">
img(ref="SuiImage" loading="lazy" :alt="alt")
</template>

<script>
export default {
    name: "sui-image",
    props: {
        ratio: Array,
        lightBox: Boolean,
        parallax: Boolean,
        zoomCanvas: Node | String,
        onLoad: Function,
        onError: Function,
        errorImg: String,
        alt: {type: String, default: ''},
        onClick: Function,
        onZoom: Function,
        src: Object | String,
        computedStyle: Function
    },
    data() {
        return {
            sui_image: null
        };
    },
    created() {
        if (window.sui_image)
            return;

        class SuiImage {
            constructor(option) {
                let {
                    element,
                    ratio,
                    parallax = false,
                    lightBox = false,
                    zoomCanvas,
                    src = '',
                    computedStyle,
                    errorImg,
                    alt,
                    onLoad = () => {
                    },
                    onError = () => {
                    },
                    onClick = () => {
                    },
                    onZoom = () => {
                    }
                } = option;

                element = typeof element === 'string' ? document.getElementById(element[0] === '#' ? element.substring(1) : element) : element;

                if (!(element instanceof Node))
                    throw 'no element';

                this.img = element;

                let grandParent = document.createElement('div');
                grandParent.classList.add('sui-image-parent');
                this.grandParent = grandParent;

                let parent = document.createElement('div');
                parent.classList.add('sui-image');
                this.parent = parent;

                let inlineStyle = [];
                for (let i = 0, l = this.img.style.length; i < l; i++)
                    inlineStyle.push(this.img.style[i]);

                for (let s of inlineStyle) {
                    this.grandParent.style.setProperty(s, this.img.style.getPropertyValue(s));
                    this.img.style.removeProperty(s);
                }

                let imgClassList = [];
                let imgClassListLength = this.img.classList.length;

                for (let i = 0; i < imgClassListLength; i++) {
                    imgClassList.push(this.img.classList[i]);
                }

                for (let c of imgClassList) {
                    this.parent.classList.add(c);
                    this.img.classList.remove(c);
                }

                if (errorImg && typeof errorImg === 'string') {
                    this.errorImg = errorImg;
                    let url = `url('${errorImg}')`;
                    this.img.style.setProperty('--error-img', url);
                }

                this.grandParent.append(this.parent);
                this.img.parentNode.insertBefore(this.grandParent, this.img);
                this.parent.append(this.img);

                this.setSrc(src, lightBox);
                this.setRatio(ratio);
                this.alt = alt;

                this.parallax = parallax;
                this.zoomCanvas = zoomCanvas;

                this.loaded = false;
                this.onLoad = (function (e) {
                    this.loaded = true;
                    this.failed = false;

                    this.parentComputedStyle = window.getComputedStyle(this.grandParent);

                    if (typeof computedStyle === 'function') {
                        let ret = computedStyle(this.parentComputedStyle) || {};
                        ratio = ret.ratio || ratio;
                        parallax = ret.parallax || parallax;
                        lightBox = ret.lightBox || lightBox;
                        zoomCanvas = ret.zoomCanvas || zoomCanvas;
                        src = ret.src || src;
                        onLoad = ret.onLoad || onLoad;
                        onError = ret.onError || onError;
                        onClick = ret.onClick || onClick;
                        onZoom = ret.onZoom || onZoom;
                    }

                    this.onZoom = onZoom;
                    this.src.naturalHeight = this.img.naturalHeight;
                    this.src.naturalWidth = this.img.naturalWidth;
                    if (this.parallax) {
                        this.getOffset();
                        this.parallaxEvent = {
                            scroll: window.sui_on.registerEvent.scroll(this.calcParallax.bind(this)),
                            resize: window.sui_on.registerEvent.resize(this.calcParallax.bind(this))
                        };
                        this.calcParallax();
                    } else
                        this.setObjectPosition();

                    this.setZoomCanvas();

                    onLoad(e);
                }).bind(this);

                this.failed = false;
                this.onError = (function (e) {
                    this.failed = e || true;
                    this.setSrc(errorImg);
                    this.parent.classList.add('error');
                    this.parent.dataset.alt = this.alt;
                    onError(e);
                }).bind(this);

                this.onClick = (function (e) {
                    if (this.lightBox && !this.failed && this.loaded) {
                        this.lightBox.img.src = this.lightBox.src;
                        window.sui_popup.handler({
                            id: this.lightBox.wrapper.id,
                            closeOnBackgroundClick: true,
                            overlayColor: 'rgba(0,0,0,0.66)'
                        });
                    }
                    onClick(e);
                }).bind(this);

                this.img.onerror = this.onError;
                this.img.onload = this.onLoad;
                this.img.onclick = this.onClick;
            }

            setLightBox(url) {
                let {
                    wrapper = (() => {
                        let w = document.createElement('div');
                        w.id = window.sui_generateId('lb');
                        w.classList.add('sui-image-lightBox');
                        return w;
                    })(),
                    loader = (() => {
                        let l = document.createElement('div');
                        l.classList.add('_loader');
                        return l;
                    })(),
                    img = document.createElement('img')
                } = (typeof this.lightBox === 'object' && Object.keys(this.lightBox) ? this.lightBox : {});

                let src = typeof url === 'string' ? url : this.img.src;

                if (!wrapper.childNodes[0]) {
                    wrapper.append(loader);
                    img.onload = () => {
                        loader.classList.add('_hideLoader');
                    };

                    img.onerror = () => {
                        loader.classList.add('_hideLoader');
                    };

                    wrapper.append(img);

                    this.parent.append(wrapper);
                    wrapper.onclick = () => {
                        if (loader.classList.contains('_hideLoader'))
                            loader.classList.remove('_hideLoader');

                        window.sui_popup.handler({id: wrapper.id, pop: 'close'});
                    };
                }

                this.lightBox = {wrapper, img, src};
            }

            getOffset(element = this.img) {
                let top = 0;
                let left = 0;

                if (element) {
                    do {
                        top += element.offsetTop || 0;
                        left += element.offsetLeft || 0;
                        element = element.offsetParent;
                    } while (element);
                }

                this.offset = {
                    top,
                    left
                };
            }

            zoomTracker(e) {
                e.stopPropagation();

                if (typeof this.onZoom === 'function')
                    this.onZoom(e);

                let x = e.offsetX > 0 ? e.offsetX : 0;
                let y = e.offsetY > 0 ? e.offsetY : 0;
                try {
                    //zoom area
                    let division = 0.33;
                    let divide = {
                        width: this.zoomCanvasSize.width * division,
                        height: this.zoomCanvasSize.height * division
                    };

                    let imageHeight = parseFloat(this.parentComputedStyle.height);
                    let imageWidth = parseFloat(this.parentComputedStyle.width);

                    if (divide.height > imageHeight) {
                        division = imageHeight / this.zoomCanvasSize.height;
                        divide = {
                            height: imageHeight,
                            width: this.zoomCanvasSize.width * division
                        };
                    } else if (divide.width > imageWidth) {
                        division = imageWidth / this.zoomCanvasSize.width;
                        divide = {
                            height: this.zoomCanvasSize.height * division,
                            width: imageWidth
                        };
                    }
                    //zoom mouseover coordinate on slide
                    let focus = {
                        left: parseInt(x - divide.width / 2),
                        top: parseInt(y - divide.height / 2)
                    };

                    //leftover to calculate zoom area to be intact in slide
                    let leftover = {
                        w: imageWidth - divide.width,
                        h: imageHeight - divide.height
                    };
                    let mzp = {
                        left: focus.left > 0
                            ? focus.left > leftover.w
                                ? leftover.w
                                : focus.left : 0,
                        top: focus.top > 0
                            ? focus.top > leftover.h
                                ? leftover.h
                                : focus.top : 0
                    };

                    this.zoomPosition = {
                        left: mzp.left + 'px',
                        top: mzp.top + 'px',
                        width: divide.width + 'px',
                        height: divide.height + 'px'
                    };

                    for (let st in this.zoomPosition)
                        this.zoomer.style[st] = this.zoomPosition[st];

                    let w = e.target.naturalWidth;
                    let h = e.target.naturalHeight;
                    let hh, ww, calib;
                    if (w !== h) {
                        if (w / h > imageWidth / imageHeight) {
                            calib = h / imageHeight;
                            ww = Math.abs(imageHeight / h * w - imageWidth) / 100 * this.src.crop.x * calib;
                            hh = 0;
                        } else if (w / h < imageWidth / imageHeight) {
                            calib = w / imageWidth;
                            ww = 0;
                            hh = Math.abs(imageWidth / w * h - imageHeight) / 100 * this.src.crop.y * calib;
                        }
                    } else {
                        ww = 0;
                        hh = 0;
                        calib = w / imageWidth;
                    }

                    const canvas = this.zoomCanvas.getElementsByTagName('CANVAS')[0].getContext('2d');
                    canvas.drawImage(
                        e.target,
                        mzp.left * calib + ww,
                        mzp.top * calib + hh,
                        divide.width * calib,
                        divide.height * calib,
                        0,
                        0,
                        300, 150
                    );
                } catch (err) {
                    console.log(err);
                }
            }

            getZoomCanvasSize() {
                let canvas = this.zoomCanvas.getElementsByTagName('CANVAS');

                if (canvas.length === 0) {
                    let new_canvas = document.createElement('CANVAS');
                    this.zoomCanvas.appendChild(new_canvas);
                }

                canvas = canvas[0];

                const {width, height} = this.zoomCanvasComputedStyle;
                canvas.style.width = width;
                canvas.style.height = height;
                this.zoomCanvasSize = {width: parseFloat(width), height: parseFloat(height)};
                return canvas;
            }

            setZoomCanvas() {
                if (this.zoomCanvas) {
                    let canvasPack, canvas;

                    if (typeof this.zoomCanvas === 'string')
                        canvasPack = document.getElementById(this.zoomCanvas[0] === '#' ? this.zoomCanvas.substring(1) : this.zoomCanvas);
                    else if (this.zoomCanvas instanceof Node)
                        canvasPack = this.zoomCanvas;

                    this.zoomCanvas = canvasPack;

                    const process = () => {
                        canvas = this.getZoomCanvasSize();
                        let zoomer = document.createElement('div');
                        zoomer.classList.add('_zoomer');

                        let zoomerIcon = document.createElement('i');
                        zoomerIcon.classList.add('material-icons');
                        zoomerIcon.innerHTML = 'search';

                        zoomer.append(zoomerIcon);

                        zoomer.style.display = 'none';

                        this.zoomer = zoomer;

                        this.parent.append(zoomer);

                        this.img.onmouseover = ((e) => {
                            this.zoomer.style.display = 'flex';
                        }).bind(this);

                        this.img.onmouseout = (() => {
                            this.zoomer.style.display = 'none';
                            if (typeof this.onZoom === 'function')
                                this.onZoom(false);
                        }).bind(this);

                        this.img.onmousemove = this.zoomTracker.bind(this);
                    };

                    try {
                        process();
                    } catch (err) {
                        this.zoomCanvasComputedStyle = window.getComputedStyle(canvasPack);
                        process();
                    } finally {
                        if (!this.zoomEvent)
                            this.zoomEvent = {resize: window.sui_on.registerEvent.resize(this.getZoomCanvasSize.bind(this))};
                    }
                }
            }

            disable() {
                if (this.parallax) {
                    window.sui_on.removeEvent.resize(this.parallaxEvent.resize);
                    window.sui_on.removeEvent.scroll(this.parallaxEvent.scroll);
                }
                if (this.zoomCanvas)
                    window.sui_on.removeEvent.resize(this.zoomEvent.resize);
            }

            setRatio(ratio) {
                if (Array.isArray(ratio)) {
                    if (!this.img.classList.contains('ratio'))
                        this.img.classList.add('ratio');
                    let paddingTop = ratio[1] / (ratio[0] / 100);
                    this.parent.style.paddingTop = paddingTop + '%';
                    this.parent.style.overflow = 'hidden';
                    this.ratio = ratio;
                } else if (this.img.classList.contains('ratio')) {
                    this.img.classList.remove('ratio');
                    this.parent.style.overflow = 'unset';
                    this.parent.style.paddingTop = null;
                }
            }

            setSrc(src, lightBox = this.lightBox) {
                let {
                    dominantColor = null,
                    colorScheme = null,
                    source = this.img.src,
                    dimension = null,
                    fileType = '',
                    crop = {x: 50, y: 30}
                } = typeof src === 'string' ?
                    {source: src} :
                    typeof src === 'object' && Object.keys(src) ?
                        src : {};

                this.src = {
                    dominantColor,
                    colorScheme,
                    source,
                    dimension,
                    fileType,
                    crop
                };

                if (this.img.src !== this.src.source) {
                    this.img.src = this.src.source;

                    if (lightBox)
                        this.setLightBox(lightBox);
                }
            }

            calcParallax() {
                if (this.parallax && this.loaded) {
                    let imgHeight = parseFloat(this.parentComputedStyle.height);

                    if (this.offset.top + imgHeight - window.scrollY < 0 || window.scrollY + window.innerHeight - this.offset.top < 0)
                        return;

                    let imgHalfHeight = imgHeight / 2;
                    let viewHalfHeight = window.innerHeight / 2;

                    let imgPivot = this.offset.top + imgHalfHeight > viewHalfHeight ?
                        this.offset.top + imgHalfHeight - viewHalfHeight : this.offset.top;

                    let scroll_y = window.scrollY + (window.sui_app?.navbarHeight_dynamic || 0);

                    let distance = (imgPivot - scroll_y) / window.innerHeight;

                    this.setObjectPosition(Math.abs(distance) > 1 ? Math.sign(distance) : distance);
                }
            }

            setObjectPosition(parallax_y) {
                this.img.style.objectPosition = (() => {
                    try {
                        const s = this.src.crop;
                        if (this.parallax) {
                            let summer = parallax_y < 0 ? s.y : 100 - s.y;
                            return s.x + '% ' + (s.y + summer * parallax_y) + '%';
                        } else
                            return s.x + '% ' + s.y + '%';
                    } catch (err) {
                        return '50% 30%';
                    }
                })();
            }
        }

        window.sui_image = SuiImage;
    },
    mounted() {
        this.sui_image = new window.sui_image({
            element: this.$refs.SuiImage,
            ratio: this.ratio,
            lightBox: this.lightBox,
            parallax: this.parallax,
            zoomCanvas: this.zoomCanvas,
            computedStyle: this.computedStyle,
            errorImg: this.errorImg,
            onLoad: this.onLoad,
            onError: this.onError,
            onClick: this.onClick,
            onZoom: this.onZoom,
            src: this.src,
            alt: this.alt
        });
    },
    beforeDestroy() {
        this.sui_image.disable();
    },
    watch: {
        src(n, o) {
            if (this.sui_image)
                this.sui_image.setSrc(n, this.lightBox);
        }
    }
};
</script>

<style lang="less">
@import "../assets/viewport";

.sui-image-lightBox {
    display: none;
    max-width: 100%;

    padding: 8px;
    @media @phone {
        padding: 0;
    }

    & > img {
        box-shadow: rgba(0, 0, 0, 0.05) 0 0 48px;
        display: block;
        margin: auto;
        max-height: 100%;
        max-width: 100%;
        min-width: 240px;
        min-height: 240px;
    }

    & > ._loader {
        display: block;

        &._hideLoader {
            display: none;
        }
        border: .15em solid rgba(128, 128, 128, 0.5);
        border-top: .15em solid white;

        border-radius: 50%;
        vertical-align: middle;

        position: absolute;
        top: 50%;
        left: 50%;
        margin: -.5rem -.5rem;

        width: 1rem;
        height: 1rem;
        animation: spin 2s linear infinite;
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
}

.sui-image-parent {
    width: 100%;
    display: flex;

    .sui-image {
        width: 100%;
        position: relative;
        box-sizing: border-box;
        flex-grow: 1;
        &.error {
            &:after {
                content: attr(data-alt);
                position: absolute;
                top: 0;
                padding: 8px;
            }
        }

        & > img {
            display: block;
            width: 100%;
            top: 0;
            color: transparent;

            &.ratio {
                position: absolute;
                height: 100%;
                object-fit: cover;
            }
        }

        & > ._zoomer {
            i {
                font-size: 2rem;
                color: rgba(0, 0, 0, 0.5);
            }

            background-color: rgba(255, 255, 255, 0.5);
            border: 2px solid rgba(0, 0, 0, 0.25);
            position: absolute;
            z-index: 1;
            pointer-events: none;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;

            * {
                pointer-events: none;
            }
        }
    }
}
</style>