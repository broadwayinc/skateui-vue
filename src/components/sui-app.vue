<template lang="pug">
#sui-app(:class="darkMode ? 'dark-mode' : null")
    nav#sui-app-nav(v-if="$slots.nav")
        slot(name="nav")
    #sui-app-view(v-if="loaded")
        slot
    #sui-app-notification
        slot(name="notification")
    #sui-app-footer(v-if="$slots.footer")
        slot(name="footer")
</template>
<script>
import {ColorMangle} from 'colormangle';

export default {
    name: "sui-app",
    props: {
        darkMode: Boolean,
        colorScheme: String | Object,
        hideNavbar: Boolean
    },
    data() {
        return {
            loaded: false
        };
    },
    watch: {
        colorScheme(n) {
            if (window.sui_app)
                window.sui_app.generateColorScheme(n);
        },
        darkMode(n) {
            if (window.sui_app)
                window.sui_app.generateColorScheme(undefined, n);
        }
    },
    created() {
        if (!window.sui_app) {
            window.sui_app = {
                scrollOffset: 0,
                navbarStyle: null,
                navbarOffset: 0,
                navbarHeight: 0,
                hideNavbar: true,
                navbarHeight_dynamic: 0,
                breakPoint: [442, 768, 1366],
                viewport: 'desktop',
                touchScreen: window.matchMedia('(pointer: coarse)').matches,
                primaryColor: '#4848db',
                darkMode: false,
                throttle: {
                    viewport: window.sui_throttle.set()
                },
                updateViewport(immediate) {
                    let calcViewport = () => {
                        if (window.sui_app.navbarStyle) {
                            let navbarHeight = parseInt(window.sui_app.navbarStyle.height);
                            window.sui_app.navbarHeight = isNaN(navbarHeight) ? 0 : navbarHeight;
                            window.sui_app.navbarHeight_dynamic = window.sui_app.navbarHeight;

                            document.getElementById('sui-app').style.setProperty('--navbar-height', `${navbarHeight}px`);
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
                    };

                    if (immediate === true)
                        calcViewport();
                    else
                        window.sui_throttle.run(calcViewport, window.sui_app.throttle.viewport, 250);

                    return window.sui_app.viewport;
                },
                calcNavbarPosition() {
                    const scrollOffset = window.pageYOffset < 0 ? 0 : window.pageYOffset;
                    const offsetDifference = (window.sui_app.scrollOffset - scrollOffset) / 3;
                    const navbarOffset = window.sui_app.navbarOffset + offsetDifference;

                    window.sui_app.navbarOffset = navbarOffset < -window.sui_app.navbarHeight - 2 ? -window.sui_app.navbarHeight - 2 : navbarOffset > 0 ? 0 : navbarOffset;
                    window.sui_app.scrollOffset = scrollOffset;
                    window.sui_app.navbarHeight_dynamic = window.sui_app.navbarHeight + window.sui_app.navbarOffset;
                    document.getElementById('sui-app').style.setProperty('--navbar-top', `${window.sui_app.navbarOffset}px`);
                },
                colorScheme: null,
                generateColorScheme(colorScheme = window.sui_app.primaryColor, darkMode = window.sui_app.darkMode) {
                    let cs = new ColorMangle(colorScheme || undefined).colorScheme(undefined, darkMode);
                    let body = document.getElementsByTagName('BODY')[0];

                    for (let c in cs)
                        body.style.setProperty(c, cs[c]);

                    window.sui_app.primaryColor = colorScheme;
                    window.sui_app.darkMode = darkMode;
                    window.sui_app.colorScheme = cs;
                },
                init: (option) => {
                    let {colorScheme, hideNavbar = false, darkMode} = option;

                    window.sui_app.generateColorScheme(colorScheme, darkMode);

                    let navBar = document.getElementById('sui-app-nav');

                    if (navBar) {
                        window.sui_app.navbarStyle = window.getComputedStyle(navBar);
                    } else {
                        hideNavbar = false;
                    }

                    window.sui_app.hideNavbar = hideNavbar;
                    if (hideNavbar) {
                        window.sui_app.calcNavbarPosition();
                        window.sui_on.registerEvent.scroll(window.sui_app.calcNavbarPosition);
                    }

                    document.getElementById('sui-app').style.setProperty('--navbar-top', `${0}px`);
                    window.sui_app.updateViewport(true);
                    window.sui_on.registerEvent.resize(window.sui_app.updateViewport);

                    return true;
                }
            };
        }
    },
    mounted() {
        // only one sui-app is allowed
        this.loaded = window.sui_app.init({
            hideNavbar: this.hideNavbar,
            colorScheme: this.colorScheme,
            darkMode: this.darkMode
        });
    },
};

</script>
<style lang="less">
@import '../assets/normalize.css';
@import '../assets/viewport.less';

html {
    --border-radius: 2px;
    --line-height: 1.5;
    --min-body-font: 16px;
    --max-body-font: 21px;
    --font-size: clamp(var(--min-body-font), 2.6vw, var(--max-body-font));

    --space-1: calc(var(--font-size) / 16 * 4);
    --space-2: calc(var(--font-size) / 16 * 8);
    --space-3: calc(var(--font-size) / 16 * 12);
    --space-4: calc(var(--font-size) / 16 * 16);
    --space-5: calc(var(--font-size) / 16 * 20);
    --space-6: calc(var(--font-size) / 16 * 24);
    --space-7: calc(var(--font-size) / 16 * 28);
    --space-8: calc(var(--font-size) / 16 * 32);
    --space-9: calc(var(--font-size) / 16 * 36);
    --space-10: calc(var(--font-size) / 16 * 40);

    --title-font: calc(1em + 4px);
    --subtitle-font: 0.8em;
    --input-height: calc(48 / 21 * 1em);
    --min-input-height: 48px;
    --min-input-width: calc(var(--max-body-font) * 5.5);
    --padding: var(--space-4);

    font-size: var(--font-size);
    line-height: var(--line-height);
}

#sui-app {
    width: 100vw;
    max-width: 100%;
    min-height: 100vh;

    background-color: var(--background);
    color: var(--background-text);
    position: relative;

    display: flex;
    align-items: center;
    flex-direction: column;

    & > #sui-app-nav {
        height: calc(var(--space-7) * 2);
        background-color: var(--navbar-background-color, var(--content, #ffffff));
        color: var(--navbar-color, var(--content-text, rgba(0, 0, 0, 0.88)));
        box-shadow: 0 0 1px rgba(153, 153, 153, 0.5);
        width: 100%;
        top: var(--navbar-top);
        position: fixed;
        //overflow: hidden;
        z-index: 9999;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > * {
            padding: auto var(--padding);
            display: flex;
            align-items: center;

            &:first-child + *:not(:last-child) {
                justify-content: center;
            }

            &:last-child:not(:first-child) {
                justify-content: flex-end;
            }

            &:only-child,
            &:not(:first-child):not(:last-child) {
                flex-grow: 1;
            }

        }

        & + #sui-app-view {
            padding-top: var(--navbar-height);
        }

        & ~ #sui-app-notification {
            top: calc(var(--navbar-height) + var(--navbar-top));
        }
    }

    #sui-app-view {
        width: 100%;
        position: relative;
        flex-grow: 1;
        background: var(--background);
    }

    & > #sui-app-notification {
        font-size: .88rem;

        &:empty {
            opacity: 0;
        }

        opacity: 1;
        transition: opacity 0.25s;

        & > div {
            box-shadow: 0 0 8px 4px rgba(128, 128, 128, 0.05);
            display: inline-block;
        }

        position: fixed;
        top: 0;
        text-align: center;
        max-width: 100%;
        z-index: 1;
    }

    #sui-app-footer {
        width: 100%;
    }

    .hideonphone {
        @media @phone {
            display: none !important;
        }
    }

    .hideontablet {
        @media @tablet {
            display: none !important;
        }
    }

    .hideonlaptop {
        @media @laptop {
            display: none !important;
        }
    }

    .viewonphone {
        @media @notphone {
            display: none !important;
        }
    }

    .viewontablet {
        @media @nottablet {
            display: none !important;
        }
    }

    .viewonlaptop {
        @media @notlaptop {
            display: none !important;
        }
    }
}

div {
    &.sui-dummy {
        display: none;
    }

    &.sui-screen {
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

    &.sui-popup {
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
}
</style>
