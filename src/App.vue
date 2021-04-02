<template lang="pug">
div
    sui-app(:hide-navbar='true')
        template(v-slot:nav)
            .nav
                .nav-info
                    i.material-icons.hamburger(onclick="sui_popup.handler('hamburger-menu', 'left', true)") menu
                    img(v-if='navbarImage' :src="navbarImage")
                    h6(v-else) {{appName}}
                .nav-icon
                    //a
                        i.material-icons settings
                    a
                        .new
                            small 4
                        i.material-icons shopping_cart
                    a
                        i.material-icons chat
                    //a.sui-button.nude Login
                    //a.sui-button Sign In
        //router-view
        template(v-slot:page)
            section.slide
            .app-grid
                #search
                    .sui-input.select.right(style="width: 100%;")
                        input(placeholder="Search Bunnykit")
                        fieldset
                        button.right
                            i.material-icons search
                        .option
                            .menu(style="padding: .5rem .75rem; font-size:.8em;").
                                Suggestion box
                            .menu(style="padding: .5rem .75rem; font-size:.8em;").
                                If the .option is empty, suggestion box will not show
                #hashtag
                    //h4.category {{listmode[0]}}
                    .hashtag
                        a.selected ALL
                        a #hashtag
                        a #hashtag
                        a #hashtag
                        a #hashtag
                #sidenav.hideontablet
                    sui-sticky(:offset="18")
                        // category navigation
                        .menublock(v-for="(nav, name) in navigation" :class="{disabled:nav.disabled, selected:nav.selected}")
                            a {{name}}
                            .new(v-if="nav.new")
                                small {{nav.new}}
                        template(v-for="(nav, name) in customNavigation")
                            template(v-if="name !== 'Baksa Gimm'")
                                br
                                small(style="opacity:.5") {{name}}
                                hr(style="margin-top:.5em")
                                br
                                .menublock(v-for="(sub, name) in nav" :class="{disabled:sub.disabled, selected:sub.selected}")
                                    .left(v-if="sub.icon")
                                        i.material-icons {{sub.icon}}
                                    .new(v-if="sub.new")
                                        small {{sub.new}}
                                    a {{name}}
                #list
                    sui-sticky(:style="{zIndex:8888}")
                        #listmode(v-if='listmode.length > 1' :style="{'--listmode':listmode.map(l=>{return '1fr '}).join(' '),boxShadow:'0 0 0 2px var(--background)'}")
                            .mode(@click='selectedListMode = idx' v-for="(l, idx) in listmode" :class="{create:l === 'New', selected: !selectedListMode || selectedListMode >= listmode.length ? !idx : selectedListMode === idx}")
                                template(v-if="l === 'New'")
                                    i.material-icons add_circle
                                    | &nbsp;&nbsp;
                                p {{l}}
                    #wysiwyg(v-show="selectedListMode === listmode.length - 1")
                        .sui-card
                            .content
                                .sui-accordion(onclick="sui_accordion.handler(event)")
                                    .title Category
                                    hr
                                    .content(onclick="(function(event){event.stopPropagation()})(event)").
                                        &nbsp;
                                br
                                .sui-accordion(onclick="sui_accordion.handler(event)")
                                    .title Items
                                    hr
                                    .content(onclick="(function(event){event.stopPropagation()})(event)").
                                        &nbsp;
                                #editor
                            #toolbar
                                i.material-icons format_bold
                                i.material-icons format_size
                                i.material-icons text_fields
                                i.material-icons format_color_fill
                                i.material-icons format_underline
                                i.material-icons format_strikethrough
                                i.material-icons horizontal_rule
                                i.material-icons format_quote
                                i.material-icons insert_photo
                                i.material-icons code
                            .button_footer
                                sui-button(type='nude') Save As Draft
                                sui-button POST
                    router-view(v-show="selectedListMode !== listmode.length - 1")
    .sui-card#hamburger-menu
        .title
            img(v-if='navbarImage' :src="navbarImage")
            template(v-else) {{appName}}
            .close(onclick="sui_popup.handler('hamburger-menu', 'close')")
        .content
            // category navigation
            .menublock(v-for="(nav, name) in navigation" :class="{disabled:nav.disabled, selected:nav.selected}")
                a {{name}}
                .new(v-if="nav.new")
                    small {{nav.new}}
            template(v-for="(nav, name) in customNavigation")
                br
                small(style="opacity:.5") {{name}}
                hr(style="margin-top:.5em")
                br
                .menublock(v-for="(sub, name) in nav" :class="{disabled:sub.disabled, selected:sub.selected}")
                    .left(v-if="sub.icon")
                        i.material-icons {{sub.icon}}
                    .new(v-if="sub.new")
                        small {{sub.new}}
                    a {{name}}
</template>
<script>
import navbarImgSample from '@/assets/bunnykit.gif';

export default {
    name: "app",
    data() {
        return {
            appName: 'Bunnykit',
            navbarImage: navbarImgSample,
            selectedListMode: 2,
            navigation: {
                'Home': {
                    url: '/'
                },
                'Singapore': {
                    new: '99+',
                    selected: true
                },
                'Fender': {},
                'Epiphone': {
                    new: '1'
                }
            },
            customNavigation: {
                'Baksa Gimm': {
                    'Shopping Cart': {
                        icon: 'shopping_cart',
                        new: '4',
                        selected: true
                    },
                    'Messages': {
                        icon: 'chat',
                        disabled: true
                    },
                    'Account Settings': {
                        icon: 'person',
                        disabled: true
                    },
                    'Payment': {
                        icon: 'payment',
                        disabled: true
                    },
                    'Logout': {
                        icon: 'logout',
                        disabled: true
                    },
                },
                'Bunnykit ADMIN': {
                    'New': {
                        icon: 'add_circle',
                        disabled: true
                    },
                    'Draft Articles': {
                        icon: 'article',
                        disabled: true
                    },
                    'App Settings': {
                        icon: 'settings',
                        disabled: true
                    },
                    'Customer Management': {
                        icon: 'person',
                        disabled: true
                    },
                    'Send Notification': {
                        icon: 'message',
                        disabled: true
                    },
                }
            }
        };
    },
    computed: {
        listmode() {
            return [(() => {
                for (let nav in this.navigation) {
                    if (this.navigation[nav]?.selected)
                        return nav;
                }
            })(), 'Images', 'Shop', 'New'];
        }
    },
    mounted() {
        let editor = new Wysiwyg4All({
            elementId: 'editor',
            placeholder: 'Write new article'
        });
    }
};
</script>
<style lang="less">
@import "./assets/viewport.less";

.menublock {
    padding: .75em .5rem;
    color: var(--toolbar-text_soft);
    cursor: pointer;
    position: relative;
    margin: 0 -.5rem;
    display: flex;

    & > .new:last-child {
        position: static;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: unset;
    }

    & > * {
        vertical-align: middle;
        display: inline-block;
    }

    & > a {
        padding-left: 1em;

        & + .new {
            padding-left: 1em;
        }
    }

    & > .new {
        text-align: right;
        width: 1.25em;
        height: calc(100% - 1.5em);
        position: absolute;
        left: 0.5rem;

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
        }
    }

    & > pre + a {
        padding-left: 0;
    }

    & > .left {
        width: 1.25em;
        height: 1.25em;
        overflow: hidden;
        border-radius: 3px;
        position: relative;
        flex-shrink: 0;

        * {
            font-size: 1.25em;
            line-height: 1;
        }

        img {
            width: 100%;
            display: block;
            height: 100%;
        }

        &:not(:empty) + .new {
            text-align: left;

            small {
                font-size: 0.6rem;
                top: -1.25em;
                position: relative;
                left: -.625em;
            }
        }
    }

    &:hover:not(.disabled):not(.select) {
        color: var(--toolbar-text);
        text-shadow: 1px 1px var(--toolbar-text_shadow);
    }

    &.disabled {
        opacity: .5;
        cursor: default;
    }

    &.selected {
        background-color: var(--toolbar-focus_shadow);
        border-radius: 8px;
        color: var(--toolbar-focus);
        text-shadow: 1px 1px var(--toolbar-text_shadow);
    }
}

#hamburger-menu {
    display: none;
    width: 280px;
    height: 100%;

    & > .title {
        img {
            max-width: 100%;
            max-height: 2rem;
            object-fit: contain;
            object-position: center;
            display: block;
            margin-bottom: 0.5rem;

            &.square {
                width: 2.5rem;
                height: 2.5rem;
                object-fit: cover;
                object-position: 50% 30%;
            }
        }
    }
}

.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    & > .nav-info:first-child {
        display: flex;
        align-items: center;

        & > * {
            display: inline-block;
            vertical-align: middle;
            margin-right: .5rem;
            cursor: pointer;
        }

        .hamburger {
            padding: 8px;
            font-size: 32px;
        }

        p, h1, h2, h3, h4, h5, h6 {
            //align-items: center;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        .hamburger, p, h1, h2, h3, h4, h5, h6 {
            color: var(--toolbar-text_soft);

            &:hover {
                color: var(--toolbar-text);
                text-shadow: 1px 1px var(--toolbar-text_shadow);
            }
        }

        img {
            max-width: calc(100% - 48px - 1rem);
            max-height: 2.5rem;
            object-fit: contain;
            object-position: center;

            &.square {
                width: 2.5rem;
                height: 2.5rem;
                object-fit: cover;
                object-position: 50% 30%;
            }
        }
    }

    & > .nav-icon:last-child {
        flex-shrink: 0;
        display: block;

        & > a:not(.sui-button) {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            margin-left: 1.5rem;
            cursor: pointer;
            width: 32px;
            height: 32px;

            color: var(--toolbar-text_soft);

            &:hover {
                color: var(--toolbar-text);
                text-shadow: 1px 1px var(--toolbar-text_shadow);
            }

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

section.slide {
    position: relative;
    width: 100%;
    height: 56.25vw;
    max-height: 70vh;
    //min-height: 30vh;
    background-color: antiquewhite;
}

div.app-grid {
    display: grid;
    grid-template-columns: auto auto 60% auto;
    grid-template-rows: auto;
    width: 100%;
    grid-template-areas:
                ". . search ."
                ". sidenav hashtag ."
                ". sidenav list .";
    @media @laptop {
        grid-template-columns: auto auto 70% auto;
    }

    @media @tablet {
        grid-template-columns: auto;
        grid-template-areas:
                "search"
                "hashtag"
                "list";
        #search, #hashtag {
            padding-left: 8px !important;
            padding-right: 8px !important;
        }
    }

    & > #search {
        padding: 2rem 0 1rem;
        grid-area: search;
    }


    & > #hashtag {
        padding-bottom: 1rem;
        grid-area: hashtag;
        color: var(--background-text);

        & > .category {
            opacity: .66;
            text-shadow: 1px 1px var(--background-text_shadow);
            padding-bottom: 1rem;
        }

        & > .hashtag {
            & > a {
                font-size: .8rem;
                cursor: pointer;
                color: var(--background-text_soft);
                padding: .25em .5em;
                border-radius: 8px;

                &:not(:last-child) {
                    margin-right: .5em;
                }

                &:hover {
                    color: var(--background-text);
                    background-color: var(--background-text_shadow);
                    text-shadow: 1px 1px var(--background-text_shadow);
                }

                &.selected {
                    color: var(--background-focus-text);
                    background-color: var(--background-focus);
                    text-shadow: 1px 1px var(--background-text_shadow);
                }
            }
        }
    }

    & > #list {
        grid-area: list;

        & > div > div {
            width: 100%;
        }

        #listmode {
            margin-bottom: 8px;
            display: grid;
            gap: 8px;
            grid-template-columns: var(--listmode);
            background-color: var(--background);

            & > .mode {
                position: relative;
                border-bottom: 2px solid var(--background-text_screen);
                color: var(--background-placeholder);
                box-shadow: inset 0 -1px 0 0 var(--background-text_shadow);
                padding-bottom: .5rem;
                padding-top: 1rem;
                text-align: center;
                flex-grow: 1;
                cursor: pointer;

                &:hover, &.selected {
                    border-bottom: 2px solid var(--background-focus);
                    color: var(--background-text);
                    text-shadow: 1px 1px var(--background-text_shadow);
                }

                &.create {
                    & > * {
                        display: inline-block;
                        vertical-align: middle;
                    }
                }
            }
        }

        & > #wysiwyg {
            min-height: calc(100vh - 13rem);
            padding-bottom: 1rem;

            & > .sui-card {
                width: 100%;

                & > .content > #editor {
                    margin: 0 -1.3em;
                    padding: 2em calc(1.3em + 0.5rem);
                    max-width: unset;
                }

                & > #toolbar {
                    //margin: 0 -1.3em;
                    box-shadow: 0 2px var(--content-text_shadow);
                    margin-bottom: 1.5em;
                    display: flex;
                    //padding-left: 1.3em;
                    //justify-content: flex-end;
                    flex-wrap: wrap;

                    & > i {
                        cursor: pointer;
                        border-radius: 8px;
                        color: var(--content-text_soft);

                        &:hover {
                            color: var(--content-text);
                            text-shadow: 1px 1px var(--content-text_shadow);
                        }

                        margin-bottom: 0.75em;

                        &:not(:last-child) {
                            margin-right: .75em;
                        }

                        flex-shrink: 0;
                        font-size: 1.5rem;
                        padding: .25rem;
                    }
                }
            }

        }
    }

    & > #sidenav {
        max-width: 250px;
        margin: 0 1rem;
        grid-area: sidenav;
        position: relative;
    }
}


</style>