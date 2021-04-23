<template lang="pug">
div(style="margin: 8px auto;")
    sui-card.head_card
        .image
            .profile_head
                sui-image(src="/img/sealawkward.jpeg")
                .photo_button
                    sui-button(type="icon" icon="photo_camera")
        .content
            div(style="text-align:right")
                small + Add Social Media
                br
                .social(style="font-size: 24px;margin-top:1rem")
                    sui-svg(svg="twitter")
                    sui-svg(svg="instagram")
                    sui-svg(svg="facebook")
                    sui-svg(svg="youtube")
            br
            sui-autosize.text_shadow(:value='name' :max="48" :min="18")
            hr
            sui-autosize(:value='description' :max="24" :min="16" allow-enter)
            //.cart
            //    img(src="/img/penguin.png")
            //    .detail.
            //        Penguin Badge
            //    br
            //    small(style="color:var(--content-focus);font-weight:bold") 53 left
            //    br
            //    .price $ 100
            //    br
            //    br
            //    .quantity
            //        sui-input(style="width:10rem" label="Quantity" type="number" value="0" :button="[{position: 'right', text: '+', action: () => {}}, {position: 'left', text: '−', action: () => {}}]")
            //br
            //.cart
            //    img(src="/img/sealpixel.jpeg")
            //    .detail.
            //        Seal Badge
            //    br
            //    small(style="color:var(--content-focus);font-weight:bold") 53 left
            //    br
            //    .price $ 10
            //    br
            //    br
            //    .quantity
            //        sui-input(style="width:10rem" label="Quantity" type="number" value="0" :button="[{position: 'right', text: '+', action: () => {}}, {position: 'left', text: '−', action: () => {}}]")
            //br
            //.cart
            //    img(src="/img/iceberg.png")
            //    .detail.
            //        Iceberg Badge
            //    br
            //    small(style="color:var(--content-focus);font-weight:bold") Unlimited
            //    br
            //    .price $ 5
            //    br
            //    br
            //    .quantity
            //        sui-input(style="width:10rem" label="Quantity" type="number" value="0" :button="[{position: 'right', text: '+', action: () => {}}, {position: 'left', text: '−', action: () => {}}]")
            //br
            //br
            //div(style="text-align:left;line-height:2;")
            //    .badgepack
            //        | ITEMS:
            //        pre
            //        img(src="/img/sealpixel.jpeg" style="width:32px;height:32px;")
            //        | +3
            //        pre
            //        img(src="/img/iceberg.png" style="width:32px;height:32px;")
            //        | +1
            //    | TAX:
            //    pre
            //    | $40.00
            //    br
            //    hr
            //    h4(style="display:inline-block;") TOTAL:
            //    pre
            //    h4(style="display:inline-block;") $100,000
            //br
            //br
            //div(style="text-align:center;")
            //    sui-button CHECKOUT
            //br
            //div(style="text-align:center")
            //    sui-button Create New Badge
    br
    br
    sui-list(ref="pixel" :min-columns="2")
        template(#pre)
            .createNew
                h3 +
                div(style="padding: 0 1rem")
                    sui-autosize(value='CREATE NEW SPRITE' readonly :min="14" :max="24" text-align='center')
                //small(style="padding: 0 1rem;text-align: left;font-size: 12px;white-space: break-spaces;").
                    Create and sell your own pixel art!
                    Use your pixel art to get support from your followers
    br
    br
    sui-accordion(title="Draft Sprite")
        sui-list(ref="pixel_draft" :min-columns="3")
    br
    sui-card.head_card
        template(#title) Supporters
        template(#content)
            .board
                .face
                    img(src="/img/myface.jpg")
                .board_message
                    sui-autosize(value="I support you Awkward Seal!" allow-enter :max="32" :min="14" :readonly="true")
                    .badgepack(style="text-align:right")
                        img(src="/img/sealpixel.jpeg" style="width:32px;height:32px;")
                        | +3
                        pre
                        img(src="/img/iceberg.png" style="width:32px;height:32px;")
                        | +1
                        pre
                        | Baksa Gimm
    br
    br
    br
</template>

<script>
export default {
    name: "sellbadge",
    data() {
        return {
            name: "Awkward Seal",
            description: "Hi, I'm an Awkward Seal.\nMy home is destroyed and polluted. Please buy my virtual badges below and show your support for saving our planet. Share your purchased badges on your social media. Give us some love thanks.\n-Awkward Seal"
        };
    },
    mounted() {
        this.$refs.pixel_draft.addList([
            {
                image: '/img/sealawkward.jpeg',
            },
            {
                image: '/img/penguin.png'
            },
            {
                image: '/img/iceberg.png'
            }
        ]);
        this.$refs.pixel.addList([
            {
                image: '/img/sealawkward.jpeg',
                title: 'Seal Pixel',
                price: '$99.99'
            },
            {
                image: '/img/penguin.png',
                title: 'Penguin',
                price: '$9.99'
            },
            {
                image: '/img/iceberg.png',
                title: 'Ice Berg',
                price: '$4.99'
            }
        ]);
    }
};
</script>

<style scoped lang="less">
.createNew {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.board {
    display: flex;
    padding: 1rem;
    background-color: var(--content-text_screen);
    border-radius: 8px;

    & > .face {
        width: 20%;
        min-width: 60px;
        flex-shrink: 0;

        img {
            width: 100%;
            border-radius: 100%;
            box-shadow: 0 0 0 .5rem var(--toolbar-text_shadow);
        }
    }

    & > .board_message {
        flex-grow: 1;
        padding: 0 0 0 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
}

.badgepack {

    & > * {
        font-family: monospace;
        vertical-align: middle;
        line-height: 32px;
    }
}

.head_card {
    //max-width: 640px;
    //width: 70%
    width: 100%;
}

.cart {
    img {
        box-shadow: 0 0 0 3px var(--content-text_screen);
    }
}

.text_shadow {
    text-shadow: 1px 1px var(--content-text_shadow);
    opacity: .88;
}

.social {
    & > * {
        vertical-align: middle;
        margin-bottom: .5rem;
    }

    & > *:not(:last-child) {
        margin-right: 1rem;
    }
}

.profile_head {
    width: 60%;
    max-width: 320px;
    min-width: 240px;
    margin: 3rem auto;
    position: relative;

    img {
        width: 100%;
        border-radius: 100%;
        box-shadow: 0 0 0 1rem var(--toolbar-text_shadow);
    }

    .photo_button {
        position: absolute;
        bottom: 0;
        right: 0;
    }
}

div.sui-textarea {
    position: relative;

    &.left {
        & > .textarea {
            & > textarea,
            &::after {
                // make space for icon
                padding-left: calc(2.8rem + .75em);
            }
        }

        & > .left {
            // the icon
            position: absolute;
            width: 2.8rem;
            height: 2.8rem;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;

            &::after {
                // icon separator
                content: "";
                width: 2px;
                height: 1.4rem;
                background-color: var(--content-text_shadow);
                position: absolute;
                right: -1px;
            }
        }
    }

    &.focus {
        & fieldset {
            border-color: var(--content-focus);
        }

        & > .left {
            color: var(--content-focus);
        }

        & > label {
            &::after {
                background-color: var(--content-focus);
            }

            &::before {
                background-color: var(--content-focus);
            }

            color: var(--content-focus);
        }
    }

    &.right {
        & > .textarea {
            & > textarea,
            &::after {
                padding-right: 3.3em;
            }
        }

        & > .right {
            display: inline-flex;
            width: 2.8em;
            height: 2.8em;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 0;
            bottom: 1px;
            cursor: pointer;
            z-index: 1;

            &::before {
                // icon separator
                content: "";
                width: 2px;
                height: 1.4em;
                background-color: var(--content-text_shadow);
                position: absolute;
                left: -1px;
            }

            &:hover {
                color: var(--content-focus);
                background-color: var(--content-focus_screen);
            }
        }
    }

    label {
        width: calc(100% - 4px);
        left: 12px;
        text-align: left;
        box-sizing: border-box;
        line-height: 1em;
        overflow: hidden;
        position: absolute;
        font-size: 0.8rem;
        font-weight: 500;
        white-space: nowrap;
        color: var(--content-text_soft);
        text-shadow: 1px 1px var(--content-text_shadow);

        & ~ fieldset {
            top: -12px;
        }

        &:not(:empty) {
            margin-top: calc(-1em + 3px);
            padding-left: 0.5em;
        }

        &:empty {
            overflow: inherit;

            &::after {
                bottom: -2px;
            }

            &::before {
                background-color: transparent;
                bottom: -2px;
            }
        }
    }

    fieldset {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        text-align: left;
        border: 2px solid var(--content-text_transparent);

        legend {
            position: relative;
            top: -0.4rem;
            font-size: 0.8rem;
            font-weight: 500;
            padding: 0 4px;
            word-break: keep-all;
            visibility: hidden;
        }
    }

    & > .textarea {
        position: relative;
        vertical-align: middle;
        display: inline-grid;
        min-height: 2.8em;
        width: 100%;
        text-shadow: 1px 1px var(--content-text_shadow);

        &::after {
            content: attr(data-replica) " ";
            white-space: pre-wrap;
            visibility: hidden;
        }

        & > textarea {
            resize: none;
            overflow: hidden;
            min-height: 1em;
            z-index: 1;
            border: none;

            &::placeholder {
                color: var(--content-text_placeholder);
            }

            &:read-only {
                text-overflow: ellipsis;
            }
        }

        & > textarea,
        &::after {
            /* Identical styling required!! */
            box-sizing: border-box;
            vertical-align: middle;
            background-color: transparent;
            color: var(--content-text);
            line-height: 1.5em;

            padding: calc(0.515em + 1px) 0.75em;
            font-size: 1rem;
            outline: none;
            border-color: var(--content-text_transparent);
            box-shadow: inset 0 0 0 4px var(--content-focus_screen);
            border-top: none;
            /* Place on top of each other */
            grid-area: 1 e("/") 1 e("/") 2 e("/") 2;
        }
    }
}
</style>