<template lang="pug">
img(ref="SuiImage" loading="lazy")
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
        nullImage: String,
        brokenMsg: {type: String, default: ''},
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
    mounted() {
        this.sui_image = new window.sui_image({
            element: this.$refs.SuiImage,
            ratio: this.ratio,
            lightBox: this.lightBox,
            parallax: this.parallax,
            brokenMsg: this.brokenMsg,
            zoomCanvas: this.zoomCanvas,
            computedStyle: this.computedStyle,
            nullImage: this.nullImage,
            onLoad: this.onLoad,
            onError: this.onError,
            onClick: this.onClick,
            onZoom: this.onZoom,
            src: this.src
        });
    },
    beforeDestroy() {
        this.sui_image.disable();
    },
    watch: {
        src(n, o) {
            console.log('image src watch...', n);
            if (this.sui_image)
                this.sui_image.setSrc(n, this.lightBox);
        }
    }
};
</script>

<style lang="less">
@import "../assets/viewport";

.sui-image-parent {
    width: 100%;

    .sui-image {
        width: 100%;
        position: relative;
        box-sizing: border-box;
        display: inline-block;

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

            &:after {
                text-align: center;
                content: attr(alt);
                font-size: 0.66rem;
                color: var(--content-text_placeholder);
                margin: auto;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                z-index: 1;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: var(--null-image);
                border: dashed 4px;
                box-sizing: border-box;
                border-color: var(--content-text_shadow);
                background-color: var(--content);
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

            border: .15em solid var(--content-text_transparent);
            border-radius: 50%;
            border-top: .15em solid var(--button-text);
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
}
</style>