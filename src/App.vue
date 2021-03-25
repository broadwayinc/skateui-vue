<template lang="pug">
.sui_frame
    nav
        img(src="@/assets/bunnykit.gif")
        //img.square.contain(src="@/assets/bunnykit.gif")
        //img.square.contain(src="@/assets/newyork.jpg")
        //img(src="@/assets/newyork.jpg")
        //img.square(src="@/assets/brunomars.png")
        div
            i.material-icons shopping_cart
            div
                button.sui-button.nude Login
                button.sui-button Sign In
    .view
        router-view
</template>
<script>
import {ColorMangle} from 'colormangle';

export default {
    name: "app",
    created() {
        let cs = new ColorMangle('#00807f').colorScheme();
        let body = document.getElementsByTagName('BODY')[0];
        for (let c in cs) {
            body.style.setProperty(c, cs[c]);
            if (c === '--toolbar')
                body.style.backgroundColor = cs[c];
        }
    }
};
</script>
<style lang="less">
@import './assets/normalize.css';

.sui_frame {
    min-height: 100%;
    width: 100%;
    background-color: var(--background);
    color: var(--background-text);

    & > nav {
        background-color: var(--toolbar);
        color: var(--toolbar-text);
        box-shadow: 0 2px var(--shadow);
        display: flex;
        align-items: center;
        padding: 8px;
        justify-content: space-between;

        img:first-child {
            height: 2.5rem;
            display: block;
            margin-right: 1rem;

            &.square {
                width: 2.5rem;
                object-fit: cover;
                object-position: 50% 30%;
            }

            &.contain {
                object-fit: contain;
                object-position: center;
            }
        }
        div:last-child {
            & > * {
                display: inline;
                vertical-align: middle;
            }
        }
    }

    & > .view {
        max-width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap;

        & > * {
            &:first-child {
                margin-top: 0;
            }

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}

</style>
