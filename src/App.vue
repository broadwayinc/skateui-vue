<template lang="pug">
div
    sui-app(:hide-navbar='true')
        template(v-slot:nav)
            .nav
                .nav-info
                    i.material-icons.hamburger(onclick="sui_popup.handler({id:'hamburger-menu', pop:'left', closeOnBackgroundClick:true})") menu
                    //img(src="/img/pixelheart.png")
                    h6 JEMPACK
                .nav-icon
                    sui-button(type="nude") Login
                    sui-button(@click="(e)=>{console.log(e);notification=true}") Sign In
        .app-grid
            #sidenav
                sui-sticky(style="padding-left: 1rem;padding-top: 1rem;")
                    .menublock(v-for="(sub, name) in navigation" :class="{disabled:sub.disabled, selected:sub.selected}")
                        .left(v-if="sub.icon")
                            i.material-icons {{sub.icon}}
                        .new(v-if="sub.new")
                            small {{sub.new}}
                        a {{name}}
                    template(v-for="(nav, name) in customNavigation")
                        template(v-if="name !== '%%null%%'")
                            .menublock(v-for="(sub, name) in nav" :class="{disabled:sub.disabled, selected:sub.selected}")
                                .left(v-if="sub.icon")
                                    i.material-icons {{sub.icon}}
                                .new(v-if="sub.new")
                                    small {{sub.new}}
                                a {{name}}
            #view
                router-view
        template(v-slot:notification)
            sui-card(v-if='notification' :close='(e)=>{console.log(e);notification=false}' style="margin: 8px;border: solid 1px var(--alert, #4848db);font-size:.8rem;")
                template(#title)
                    div(style="background-color:var(--alert);color:var(--alert-text);")
                        i.material-icons(style="font-size:1.5em;margin: .5em") warning
                        span Alert
                div(style="padding:1em 0;line-height:2em;") Your E-Mail has not been verified
    sui-card#hamburger-menu
        template(#title)
            | Welcome Baksa Gimm!
            .close(onclick="sui_popup.handler({id: 'hamburger-menu', pop: 'close'})")
        template(#image)
            .profile
                img(src="/img/myface.jpg")
        template(#content)
            // category navigation
            .menublock(v-for="(nav, name) in navigation" :class="{disabled:nav.disabled, selected:nav.selected}")
                .left(v-if="nav.icon")
                    i.material-icons {{nav.icon}}
                .new(v-if="nav.new")
                    small {{nav.new}}
                a {{name}}
            template(v-for="(nav, name) in customNavigation")
                template(v-if="name && !name.includes('%%null%%')")
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

export default {
    name: "app",
    data() {
        return {
            notification: false,
            navigation: {
                'Account Settings': {
                    icon: 'person',
                    disabled: true
                },
                'My Badges': {
                    icon: 'privacy_tip',
                    disabled: true
                },
                'Payment': {
                    icon: 'payment',
                    disabled: true
                },
                'Share This Page': {
                    icon: 'share'
                }
            },
            customNavigation: {
                'ADMIN': {
                    'New Badge': {
                        icon: 'add_moderator',
                        disabled: true
                    },
                    'Draft Badge': {
                        icon: 'shield',
                        disabled: true
                    },
                    'Page Settings': {
                        icon: 'settings',
                        disabled: true
                    }
                },
                '%%null%%': {
                    'Logout': {
                        icon: 'logout',
                        disabled: true
                    }
                }
            }
        };
    },
    computed: {
        console: () => console
    }
};
</script>
<style lang="less">
@import "./assets/viewport.less";

.profile {
    padding: 1rem;
    box-sizing: border-box;
    position: relative;

    img {
        width: 70%;
        display: block;
        margin: 1rem auto;
        border-radius: 60%;
        box-shadow: 0 0 0 8px var(--toolbar-text_shadow);
    }
}

.menublock {
    padding: .75em .5rem;
    color: var(--toolbar-text_soft);
    cursor: pointer;
    position: relative;
    margin: 0 -.5rem;
    display: flex;
    align-items: center;

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
    max-width: 300px;
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
    padding: .25rem .5rem;

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
    width: 1000px;
    max-width: 100%;
    margin: auto;
    display: grid;
    grid-template-areas:
                "sidenav view";

    // adjust the desktop / laptop grid size from here
    grid-template-columns: auto minmax(auto, 75%);

    @media @tablet {
        width: 100%;
        grid-template-columns: minmax(0, 100%);
        grid-template-areas:
                "view";

        #sidenav {
            display: none;
        }
    }

    & > #view {
        grid-area: view;
        padding: 0 1rem;
    }

    & > #sidenav {
        padding-right: 1rem;
        grid-area: sidenav;
        position: relative;
    }
}


</style>