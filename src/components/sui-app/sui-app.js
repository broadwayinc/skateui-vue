
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
    created() {
        if (!window.sui_app)
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
                throttle: {
                    viewport: window.sui_throttle.set()
                },
                updateViewport() {
                    window.sui_throttle.run(() => {
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
                    }, window.sui_app.throttle.viewport, 250);

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
                generateColorScheme(colorScheme, darkMode) {
                    let cs = new ColorMangle(colorScheme || undefined).colorScheme(undefined, darkMode);
                    let body = document.getElementsByTagName('BODY')[0];

                    for (let c in cs)
                        body.style.setProperty(c, cs[c]);

                    window.sui_app.colorScheme = cs;
                },
                init: (option) => {
                    let {colorScheme, hideNavbar = false, darkMode} = option;

                    window.sui_app.generateColorScheme(colorScheme, darkMode);

                    let navBar = document.getElementsByTagName('nav')[0];
                    if (navBar)
                        window.sui_app.navbarStyle = window.getComputedStyle(navBar);
                    else
                        hideNavbar = false;

                    window.sui_app.hideNavbar = hideNavbar;
                    if (hideNavbar) {
                        window.sui_app.calcNavbarPosition();
                        window.sui_on.registerEvent.scroll(window.sui_app.calcNavbarPosition);
                    }

                    document.getElementById('sui-app').style.setProperty('--navbar-top', `${0}px`);
                    window.sui_app.updateViewport();
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
            colorScheme: this.colorScheme,
            darkMode: this.darkMode
        });
    },
};

