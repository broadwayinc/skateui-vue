<template lang="pug">
.sui_app
    nav
        div
            i.material-icons(style="padding: 8px;margin-right: .5rem;cursor:pointer;" onclick="sui_popup.handler('appmenu', 'left', true)") menu
            //h6 Bunnykit
            img(src="@/assets/bunnykit.gif")
            //img.square.contain(src="@/assets/bunnykit.gif")
            //img.square.contain(src="@/assets/newyork.jpg")
            //img.square(src="@/assets/newyork.jpg")
            //img.square(src="@/assets/brunomars.png")
        div
            i.material-icons notifications
            i.material-icons shopping_cart
            i.material-icons chat
            //a.sui-button.nude Login
            //a.sui-button Sign In
    .view
        router-view
    .action
        //a.sui-button.icon
        //    i.material-icons shopping_cart
        //div
        //    p 제품이 장바구니에 추가되었습니다
        //a.sui-button.icon
        //    i.material-icons chat
        //div
        //    p 바니키트: 고갱님 아직 배송이 시작되지 않았기 때문에 기다려 주세용~
        a.sui-button.nude 더 알아보기
        div.expand
            p 세일 시작합니다 놓치지 마세요~! 바니바니 바니키트~!! 자세한 내용은 아래 클릭 해주세요
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
                        window.requestAnimationFrame(()=>{
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
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        height: calc(3rem + 16px);
        top: 0;

        & + * {
            padding-top: calc(3rem + 16px);
        }

        div:first-child {
            flex-shrink: 0;

            * > {
                display: inline;
                vertical-align: middle;
            }

            img {
                max-height: 2.5rem;
                display: inline;

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

        div:last-child {
            & > * {
                display: inline-block;
                vertical-align: middle;
            }

            & > img {
                height: 2.5rem;
                width: 2.5rem;
                border-radius: 2.5rem;
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

        & > * {
            max-width: 100%;
        }
    }

    & > .action {
        position: fixed;
        bottom: 1rem;
        right: 1rem;

        & > .sui-button {
            z-index: 1;

            &:active + div {
                width: 600px;
                height: 600px;
            }
        }

        & > div {
            &::before {
                content: "";
                background-color: var(--toolbar);
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 96%;

            }

            z-index: -1;
            position: fixed;
            bottom: -300px;
            right: -300px;
            width: 0;
            height: 0;
            transition: width .5s, height .5s;

            &.expand {
                width: 600px;
                height: 600px;
            }

            display: grid;
            grid-template-columns:  1fr 1fr;
            grid-template-rows:  1fr 1fr;
            border: 8px solid var(--toolbar-focus);
            color: var(--toolbar-text);
            border-bottom: none;
            border-right: none;
            border-radius: 600px;
            overflow: hidden;

            & > * {
                font-size: 20px;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                position: absolute;
                margin-top: 125px;
                margin-left: 75px;
                width: calc(300px - 75px - 1rem);
                white-space: pre-wrap;
                box-sizing: border-box;
                text-shadow: 1px 1px var(--toolbar-text_shadow);
            }
        }

    }
}

</style>
