<template lang="pug">
.sui-app
    nav(v-if="$slots.nav")
        slot(name="nav")
    .view
        slot(name="page")
        .notification(:class="{show: notification_computed}")
            template(v-if="notification_computed")
                i.material-icons.icon(v-if="notification_computed.icon") {{notification_computed.icon}}
                .text {{notification_computed.text}}
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
                return {icon: '', text: ''};
            }
        },
        hideNavbar: Boolean
    },
    created() {
        if (!this.colorScheme)
            throw 'no color scheme';

        window.sui_screen = {
            handler: (id, stickTo, closeWhenBackgroundClick) => {

                let screen = document.getElementsByClassName('sui-screen')[0];

                if (!screen) {
                    // if there is no overlay screen, create one
                    screen = document.createElement('div');
                    screen.classList.add('sui-screen');
                    screen.classList.add(stickTo);

                    // let body = document.getElementsByClassName('sui-frame')[0];
                    let body = document.getElementsByTagName('BODY')[0];
                    document.body.style.top = `-${window.scrollY}px`;
                    document.body.style.position = 'fixed';

                    if (closeWhenBackgroundClick) {
                        screen.addEventListener('click', function () {
                            window.sui_popup.handler(id);
                        });
                    }

                    body.append(screen);
                } else if (id) {
                    const scrollY = document.body.style.top;
                    document.body.style.position = '';
                    document.body.style.top = '';
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);

                    // clean all element but the element with id given by the id argument
                    let child = screen.children;

                    let cid = child.length;
                    while (cid--) {
                        if (child[cid].id !== id) {

                            let classList = window.sui_popup.classList.direction.concat(window.sui_popup.classList.stickTo);

                            for (let c of classList)
                                child[cid].classList.remove(c);

                            let dummy = document.getElementById('_dummy_' + child[cid].id);
                            if (dummy) {
                                dummy.parentNode.insertBefore(child[cid], dummy);
                                dummy.remove();
                            }
                        }
                    }
                }


                return screen;
            }
        };
        window.sui_popup = {
            classList: {
                // DO NOT! change the order of array
                stickTo: [
                    '_stickto-center',
                    '_stickto-top',
                    '_stickto-bottom',
                    '_stickto-right',
                    '_stickto-left'
                ],
                direction: [
                    '_center',
                    '_down',
                    '_up',
                    '_left',
                    '_right'
                ]
            },
            eventListener: {},
            timeout: null,
            handler: (id, stickTo = 'center', closeWhenBackgroundClicked = false, overlayColor = 'rgba(0, 0, 0, 0.33)') => {

                if (!id)
                    // no id
                    return;

                let stickToList = window.sui_popup.classList.stickTo;
                let directionList = window.sui_popup.classList.direction;
                let direction;

                if (stickTo !== 'close') {
                    stickTo = '_stickto-' + stickTo;
                    direction = directionList[stickToList.indexOf(stickTo)];
                    if (!stickToList.includes(stickTo))
                        throw 'allowed argument for stickTo:' + JSON.stringify(stickToList);

                    if (!directionList.includes(direction))
                        throw 'allowed argument for stickTo:' + JSON.stringify(directionList);

                    if (window.sui_popup.timeout)
                        clearTimeout(window.sui_popup.timeout);
                    window.sui_popup.timeout = null;
                }

                id = id[0] === '#' ? id.substring(1) : id;

                let el = document.getElementById(id);
                if (!el)
                    // no matching popup
                    return;

                let isUp = el.closest('.sui-screen');
                if (stickTo === 'close' && !isUp)
                    // nothing to close
                    return;

                let screen = window.sui_screen.handler(id, stickTo, closeWhenBackgroundClicked);

                if (isUp) {
                    // popup is showing
                    for (let c of directionList)
                        el.classList.remove(c);

                    screen.style.backgroundColor = 'transparent';

                    let cl_idx = el.classList.length, immediate = false;

                    while (cl_idx--) {
                        if (el.classList[cl_idx].includes('_stickto-center'))
                            immediate = true;
                    }

                    window.sui_popup.timeout = setTimeout(() => {
                        // cleanup
                        for (let c of stickToList)
                            el.classList.remove(c);

                        el.classList.remove('sui-popup');
                        el.removeEventListener('click', window.sui_popup.eventListener[id]);
                        window.sui_popup.eventListener[id] = null;

                        let dummy = document.getElementById('_dummy_' + id);
                        if (dummy) {
                            dummy.parentNode.insertBefore(el, dummy);
                            dummy.remove();
                        }
                        screen.remove();
                    }, immediate ? 0 : 750);

                } else {
                    let bool = !el.classList.contains('sui-popup');

                    window.sui_popup.eventListener[id] = function (e) {
                        e.stopPropagation();
                    };

                    el.addEventListener('click', window.sui_popup.eventListener[id]);
                    if (bool) {
                        el.classList.add('sui-popup');
                        if (!el.closest('.sui-screen')) {
                            let dummy = document.createElement('div');
                            dummy.classList.add('sui-dummy');
                            dummy.id = '_dummy_' + id;
                            el.parentNode.insertBefore(dummy, el);
                            screen.append(el);
                        }
                    }

                    el.classList.add(stickTo);

                    window.sui_popup.timeout = setTimeout(() => {
                        screen.style.backgroundColor = overlayColor;
                        el.classList.add(direction);
                    }, direction === '_center' ? 0 : 100);

                    return el;
                }
            }
        };
        window.sui_app = {
            scrollOffset: 0,
            navbarOffset: 0,
            navbarHeight: 0,
            navbarHeight_dynamic: 0,
            breakPoint: [441, 767, 1365],
            viewport: 'desktop',
            touchScreen: window.matchMedia('(pointer: coarse)').matches,
            updateViewport() {
                window.sui_app.viewport = 'desktop';

                let viewport = ['phone', 'tablet', 'laptop'];
                for (let bp of window.sui_app.breakPoint) {
                    let v = viewport.splice(0, 1);
                    if (window.matchMedia(`(max-width: ${bp}px)`).matches) {
                        window.sui_app.viewport = v[0];
                        return;
                    }
                }
            },
            colorScheme: null,
            scroll_callback: [],
            resize_callback: [],
            init: () => {
                let cs = new ColorMangle(this.colorScheme).colorScheme();
                let body = document.getElementsByTagName('BODY')[0];

                for (let c in cs) {
                    body.style.setProperty(c, cs[c]);
                    if (c === '--toolbar')
                        // set html body background color to match toolbar color
                        body.style.backgroundColor = cs[c];
                }

                window.sui_app.colorScheme = cs;

                if (this.hideNavbar) {
                    let navbarHeight = parseInt(window.getComputedStyle(document.getElementsByTagName('nav')[0]).height);
                    window.sui_app.navbarHeight = isNaN(navbarHeight) ? 0 : navbarHeight + 16;
                }

                document.addEventListener(
                    'scroll',
                    (event) => {
                        window.requestAnimationFrame(() => {
                            if (this.hideNavbar) {
                                const scrollOffset = window.pageYOffset < 0 ? 0 : window.pageYOffset;
                                const offsetDifference = (window.sui_app.scrollOffset - scrollOffset) / 3;
                                const navbarOffset = window.sui_app.navbarOffset + offsetDifference;

                                window.sui_app.navbarOffset = navbarOffset < -window.sui_app.navbarHeight - 2 ? -window.sui_app.navbarHeight - 2 : navbarOffset > 0 ? 0 : navbarOffset;
                                window.sui_app.scrollOffset = scrollOffset;
                                window.sui_app.navbarHeight_dynamic = window.sui_app.navbarHeight + window.sui_app.navbarOffset;
                                document.getElementsByTagName('body')[0].style.setProperty('--navbar-top', `${window.sui_app.navbarOffset}px`);
                            }

                            if (Array.isArray(window.sui_app.scroll_callback)) {
                                for (let c of window.sui_app.scroll_callback)
                                    if (typeof c === 'function') c(event);
                            }
                        });
                    },
                    {passive: true}
                );

                window.sui_app.updateViewport();

                window.addEventListener(
                    'resize',
                    (event) => {
                        window.requestAnimationFrame(() => {
                            window.sui_app.updateViewport();
                            if (Array.isArray(window.sui_app.resize_callback)) {
                                for (let c of window.sui_app.resize_callback)
                                    if (typeof c === 'function') c(event);
                            }
                        });
                    },
                    {passive: true}
                );
            }
        };
    },
    mounted() {
        window.sui_app.init();
    },
    computed: {
        notification_computed() {
            if (this.notification.text)
                return this.notification;
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
        }
    }

    & > .view {
        max-width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap;
        //overflow-x: hidden;
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
            box-shadow: 0 0 1px 1px var(--content);
            margin: 16px;
            opacity: 0;
            transition: opacity .5s;
            cursor: pointer;
            flex-wrap: wrap;
            user-select: none;

            &:hover {
                a {
                    text-decoration: underline;
                }
            }

            &.show {
                opacity: 1;
            }

            & > * {
                padding: 8px;
            }

            & > .text {
                white-space: pre-wrap;
                font-size: .88rem;
                line-height: 1rem;
                display: flex;
                align-items: center;
                width: calc(100% - 40px - 16px);
            }

            & > a {
                flex-basis: 100%;
                line-height: 1rem;
                font-size: .88rem;
                font-weight: 500;
                text-align: right;
            }
        }
    }
}

div.sui-dummy {
    display: none;
}

div.sui-screen {
    &._stickto-bottom {
        justify-content: flex-end;
    }

    &._stickto-top {
        justify-content: flex-start;
    }

    &._stickto-left {
        justify-content: center;
        align-items: flex-start;
    }

    &._stickto-right {
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

    &._stickto-center {
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

    &._stickto-bottom {
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        bottom: -100%;
        margin: 0 auto !important;
    }

    &._stickto-top {
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
        bottom: 100%;
        margin: 0 auto !important;
    }

    &._stickto-right {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        left: 100%;
        margin: 0 !important;
    }

    &._stickto-left {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        left: -100%;
        margin: 0 !important;
    }

    &._stickto-center {
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
