<template lang="pug">
.sui_app
    nav
        div
            i.material-icons.hamburger(onclick="sui_popup.handler('appmenu', 'left', true)") menu
            h6 Bunnykit
            //h6 United Kingdom Airlines
            //img(src="@/assets/bunnykit.gif")
            //img(src="@/assets/long.png")
            //img.square.contain(src="@/assets/bunnykit.gif")
            //img.square.contain(src="@/assets/newyork.jpg")
            //img.square(src="@/assets/newyork.jpg")
            //img.square(src="@/assets/brunomars.png")
        div
            //a
                i.material-icons settings
            a
                .new
                    small 99+
                i.material-icons shopping_cart
            a
                .new
                    small 1
                i.material-icons chat
            //a.sui-button.nude Login
            //a.sui-button Sign In
    .view
        router-view
        .notification
            //i.material-icons shopping_cart
            .text.
                Your Cart has Been Added!
    .sui-card#appmenu(style="display:none;width: 280px;height:100%;")
        .title
            | Bunnykit
            .close(onclick="sui_popup.handler('appmenu', 'close')")
        .content
            //small(style="opacity:.5") Bunnykit
            //hr(style="margin-top:.5em")
            //br
            .menublock
                p Home
            .menublock.select
                p Gibson
                .new
                    small 99+
            .menublock
                p Fender
            .menublock
                p Epiphone
                .new
                    small 1
            br
            hr(style="margin-top:.5em")
            br
            .menublock.disabled
                .left
                    i.material-icons chat
                //.new
                //    small 9
                p Messages
            .menublock
                .left
                    i.material-icons shopping_cart
                .new
                    small 4
                p Shopping Cart
            .menublock
                .left
                    i.material-icons notifications
                //.new
                //    small 9
                p Notifications
            .menublock
                .left
                    i.material-icons login
                p Login
            br
            br
            small(style="opacity:.5") Baksa Gimm
            hr(style="margin-top:.5em")
            br
            .menublock
                .left
                    i.material-icons person
                p Account Settings
            .menublock.disabled
                .left
                    i.material-icons settings
                p App settings
            .menublock.disabled
                .left
                    i.material-icons payment
                p Payment
            .menublock.disabled
                .left
                    i.material-icons logout
                p Logout
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

        window.sui_app = {
            init() {
                document.addEventListener(
                    'scroll',
                    (event) => {
                        window.requestAnimationFrame(() => {
                            console.log('ani');
                        });
                    },
                    {passive: true}
                );
            }
        };

        window.sui_app.init();

    }
};

</script>
<style lang="less">
@import './assets/normalize.css';

.sui_app {
    min-height: 100%;
    width: 100%;
    background-color: var(--background);
    color: var(--background-text);
    position: relative;

    & > nav {
        background-color: var(--toolbar);
        color: var(--toolbar-text);
        box-shadow: 0 2px var(--shadow);
        display: flex;
        align-items: center;
        padding: 8px 1rem;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        height: calc(3rem + 16px);
        top: 0;
        position: fixed;
        z-index: 9999;

        & + * {
            padding-top: calc(3rem + 16px);
        }

        & > div:first-child {
            display: flex;
            align-items: center;

            position: relative;

            * > {
                display: inline-block;
                vertical-align: middle;
            }

            .hamburger {
                padding: 8px;
                margin-right: .5rem;
                cursor: pointer;
                font-size: 32px;
            }

            p, h1, h2, h3, h4, h5, h6 {
                align-items: center;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }

            img {
                max-width: calc(100% - 40px - .5rem);
                max-height: 2.5rem;

                &.square {
                    width: 2.5rem;
                    height: 2.5rem;
                    object-fit: cover;
                    object-position: 50% 30%;
                }

                &.contain {
                    object-fit: contain;
                    object-position: center;
                }
            }
        }

        & > div:last-child {
            flex-shrink: 0;
            display: block;

            & > a {
                position: relative;
                display: inline-block;
                vertical-align: middle;
                margin-left: 1.5rem;
                cursor: pointer;
                width: 32px;
                height: 32px;

                .new {
                    position: absolute;

                    small {
                        font-size: 0.65em;
                        font-family: monospace;
                        font-weight: bold;
                        color: white;
                        background: var(--alert);
                        white-space: nowrap;
                        padding: 0 0.25em;
                        border-radius: 3px;
                        vertical-align: middle;
                        position: relative;
                        left: calc(-100% + 8px);
                        top: -8px;
                    }
                }

                *:not(.new) {
                    font-size: 32px;
                }
            }
        }
    }

    & > .view {
        max-width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap;
        overflow-x: hidden;
        position: relative;

        & > * {
            max-width: 100%;
        }

        & > .notification {
            border-radius: 8px;
            position: fixed;
            display: flex;
            top: calc(3rem + 16px);
            padding: 8px;
            background-color: var(--content-text);
            color: var(--content);
            border: 2px solid var(--content);
            margin: 16px;

            & > * {
                padding: 8px;
            }

            & > .text {
                font-weight: 500;
                white-space: pre-wrap;
                font-size: .88rem;
                line-height: 1rem;
                display: flex;
                align-items: center;
            }
        }
    }
}

</style>
