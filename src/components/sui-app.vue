<template lang="pug">
.sui-app
    nav(v-if="$slots.nav")
        slot(name="nav")
    .view(v-if="loaded")
        slot(name="page")
        #sui-app-notification(:class="{show: notification_computed}" v-if="notification_computed")
            sui-card(:style="{backgroundColor:'var(--content-text)',color:'var(--content)', maxWidth: 'unset', borderRadius:'8px'}")
                .notification-head(@click="()=>{console.log('yto')}")
                    i.material-icons.icon(v-if="notification_computed.icon") {{notification_computed.icon}}
                    p {{notification_computed.text}}
</template>
<script>
import {ColorMangle} from 'colormangle';

export default {
    name: "sui-app",
    props: {
        colorScheme: {
            type: String | Object,
            default: 'teal'
        },
        notification: {
            type: String | Object,
            default: function () {
                return '';
            }
        },
        hideNavbar: Boolean
    },
    data() {
        return {
            loaded: false
        };
    },
    created() {
        if (!this.colorScheme)
            throw 'no color scheme';

        if (!window.sui_app)
            window.sui_app = {
                scrollOffset: 0,
                navbarStyle: null,
                navbarOffset: 0,
                navbarHeight: 0,
                hideNavbar: true,
                navbarHeight_dynamic: 0,
                breakPoint: [441, 767, 1365],
                viewport: 'desktop',
                touchScreen: window.matchMedia('(pointer: coarse)').matches,
                updateViewport() {
                    if (window.sui_app.hideNavbar) {
                        let navbarHeight = parseInt(window.sui_app.navbarStyle.height);
                        window.sui_app.navbarHeight = isNaN(navbarHeight) ? 0 : navbarHeight + 16;
                    }

                    window.sui_app.viewport = 'desktop';

                    let viewport = ['phone', 'tablet', 'laptop'];
                    for (let bp of window.sui_app.breakPoint) {
                        let v = viewport.splice(0, 1);
                        if (window.matchMedia(`(max-width: ${bp}px)`).matches) {
                            window.sui_app.viewport = v[0];
                            break;
                        }
                    }

                    return window.sui_app.viewport;
                },
                calcNavbarHeight() {
                    if (window.sui_app.hideNavbar) {
                        const scrollOffset = window.pageYOffset < 0 ? 0 : window.pageYOffset;
                        const offsetDifference = (window.sui_app.scrollOffset - scrollOffset) / 3;
                        const navbarOffset = window.sui_app.navbarOffset + offsetDifference;

                        window.sui_app.navbarOffset = navbarOffset < -window.sui_app.navbarHeight - 2 ? -window.sui_app.navbarHeight - 2 : navbarOffset > 0 ? 0 : navbarOffset;
                        window.sui_app.scrollOffset = scrollOffset;
                        window.sui_app.navbarHeight_dynamic = window.sui_app.navbarHeight + window.sui_app.navbarOffset;
                        document.getElementsByTagName('body')[0].style.setProperty('--navbar-top', `${window.sui_app.navbarOffset}px`);
                    }
                },
                colorScheme: null,
                init: (option) => {
                    let {colorScheme = 'teal', hideNavbar = false} = option;

                    let navBar = document.getElementsByTagName('nav')[0];

                    if (navBar)
                        window.sui_app.navbarStyle = window.getComputedStyle(navBar);
                    else
                        hideNavbar = false;

                    window.sui_app.hideNavbar = hideNavbar;

                    let cs = new ColorMangle(colorScheme).colorScheme();
                    let body = document.getElementsByTagName('BODY')[0];

                    for (let c in cs) {
                        body.style.setProperty(c, cs[c]);
                        if (c === '--toolbar')
                            // set html body background color to match toolbar color
                            body.style.backgroundColor = cs[c];
                    }

                    window.sui_app.colorScheme = cs;

                    window.sui_app.updateViewport();
                    window.sui_app.calcNavbarHeight();
                    window.sui_on.registerEvent.scroll(window.sui_app.calcNavbarHeight);
                    window.sui_on.registerEvent.resize(window.sui_app.updateViewport);

                    return true;
                }
            };
        else
            throw 'only one sui-app allowed';
    },
    mounted() {
        // only one sui-app is allowed
        this.loaded = window.sui_app.init({
            hideNavbar: this.hideNavbar,
            colorScheme: this.colorScheme
        });
    },
    computed: {
        console: () => console,
        notification_computed() {
            if (this.notification) {
                if (typeof this.notification === 'string')
                    return {text: this.notification};
                return this.notification;
            }
            return null;
        }
    }
};

</script>
<style lang="less">
@import '../assets/normalize.css';
@import '../assets/viewport.less';

.sui-app {
    width: 100%;
    min-height: 100vh;
    background-color: var(--background);
    color: var(--background-text);
    position: relative;

    & > nav {
        background-color: var(--toolbar);
        color: var(--toolbar-text);
        box-shadow: 0 2px var(--shadow);
        padding: 8px 1rem;
        width: calc(100% - 2rem);
        height: 3rem;
        top: var(--navbar-top);
        position: fixed;
        overflow: hidden;
        z-index: 9999;

        & + .view {
            padding-top: calc(3rem + 16px);

            & > #sui-app-notification {
                top: calc(3rem + 16px + var(--navbar-top));
            }
        }
    }

    & > .view {
        max-width: 100%;
        position: relative;

        & > * {
            max-width: 100%;
        }

        & > #sui-app-notification {
            position: fixed;
            top: 0;
            right: 0;
            padding: 8px 1rem;
            box-sizing: border-box;

            .notification-head {
                display: flex;
                padding: 8px;

                & > p {
                    padding: 2px 0;
                    font-size: 16px;
                    line-height: 20px;
                }

                i {
                    padding-right: 4px;
                    font-size: 24px;
                }

                * {
                    vertical-align: middle;
                }
            }
        }
    }
}

div.sui-dummy {
    display: none;
}

div.sui-screen {
    &._pop-bottom {
        justify-content: flex-end;
    }

    &._pop-top {
        justify-content: flex-start;
    }

    &._pop-left {
        justify-content: center;
        align-items: flex-start;
    }

    &._pop-right {
        justify-content: center;
        align-items: flex-end;
    }

    z-index: 9999;
    justify-content: center;
    display: flex;
    position: fixed;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    transition: background-color .5s;

    &._pop-center {
        transition: background-color 0s;
    }

    overflow: hidden;
}

div.sui-popup {
    overflow-y: auto;
    overflow-x: hidden;
    @media @tablet {
        margin: 0 !important;
    }

    &._pop-bottom {
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        bottom: -100%;
        margin: 0 auto !important;
    }

    &._pop-top {
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
        bottom: 100%;
        margin: 0 auto !important;
    }

    &._pop-right {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        left: 100%;
        margin: 0 !important;
    }

    &._pop-left {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        left: -100%;
        margin: 0 !important;
    }

    &._pop-center {
        margin: auto !important;
    }

    display: block !important;

    position: relative;

    max-height: 100%;

    &._up, &._down {
        bottom: 0;
    }

    &._left, &._right {
        left: 0;
    }

    transition: bottom .5s, left .5s;
}
</style>
