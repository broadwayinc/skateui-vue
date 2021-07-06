(function () {
    if (!window.sui_screen)
        window.sui_screen = {
            handler: (id, pop, closeOnBackgroundClick) => {
                let screen = document.getElementsByClassName('sui-screen')[0];
                if (!screen) {
                    // if there is no overlay screen, create one
                    screen = document.createElement('div');
                    screen.classList.add('sui-screen');
                    screen.classList.add(pop);

                    // let body = document.getElementsByClassName('sui-frame')[0];
                    let body = document.getElementsByTagName('BODY')[0];
                    document.body.style.top = `-${window.scrollY}px`;
                    if(!backgroundScroll) document.body.style.position = 'fixed';
                    if (closeOnBackgroundClick) {
                        screen.addEventListener('click', function () {
                            window.sui_popup.handler({id: id, backgroundScroll: backgroundScroll});
                        });
                    }

                    body.append(screen);
                } else if (id && !backgroundScroll) {
                    const scrollY = document.body.style.top;
                    document.body.style.position = '';
                    document.body.style.top = '';
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);

                    // clean all element but the element with id given by the id argument
                    let child = screen.children;

                    let cid = child.length;
                    while (cid--) {
                        if (child[cid].id !== id) {

                            let classList = window.sui_popup.classList.direction.concat(window.sui_popup.classList.pop);

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
    if (!window.sui_popup)
        window.sui_popup = {
            classList: {
                // DO NOT! change the order of array
                pop: [
                    '_pop-center',
                    '_pop-top',
                    '_pop-bottom',
                    '_pop-right',
                    '_pop-left'
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
            handler: (option) => {
                let {
                    id,
                    pop = 'center',
                    closeOnBackgroundClick = false,
                    backgroundScroll = false,
                    overlayColor = 'rgba(0, 0, 0, 0.33)'
                } = typeof option === 'string' ? {id: option} : option;


                let el;
                if (id) {
                    id = id[0] === '#' ? id.substring(1) : id;

                    el = document.getElementById(id);
                    if (!el)
                        // no matching popup
                        return;
                } else
                    return;

                let popList = window.sui_popup.classList.pop;
                let directionList = window.sui_popup.classList.direction;
                let direction;

                if (pop !== 'close') {
                    pop = '_pop-' + pop;
                    direction = directionList[popList.indexOf(pop)];
                    if (!popList.includes(pop))
                        throw 'allowed argument for pop:' + JSON.stringify(popList);

                    if (!directionList.includes(direction))
                        throw 'allowed argument for pop:' + JSON.stringify(directionList);

                    if (window.sui_popup.timeout)
                        clearTimeout(window.sui_popup.timeout);
                    window.sui_popup.timeout = null;
                }

                let isUp = el.closest('.sui-screen');
                if (pop === 'close' && !isUp)
                    // nothing to close
                    return;

                let screen = window.sui_screen.handler(id, pop, closeOnBackgroundClick, backgroundScroll);

                if (isUp) {
                    // popup is showing
                    for (let c of directionList)
                        el.classList.remove(c);

                    screen.style.backgroundColor = 'transparent';

                    let cl_idx = el.classList.length, immediate = false;

                    while (cl_idx--) {
                        if (el.classList[cl_idx].includes('_pop-center'))
                            immediate = true;
                    }

                    window.sui_popup.timeout = setTimeout(() => {
                        // cleanup
                        for (let c of popList)
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

                    el.classList.add(pop);

                    window.sui_popup.timeout = setTimeout(() => {
                        screen.style.backgroundColor = overlayColor;
                        el.classList.add(direction);
                    }, direction === '_center' ? 0 : 100);

                    return el;
                }
            }
        };
    if (!window.sui_generateId)
        window.sui_generateId = (option) => {
            let limit = 12;
            let prefix = '';

            if (typeof option === 'number') limit = option;
            else if (typeof option === 'string') prefix = `${option}_`;

            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

            let text = '';
            for (let i = 0; i < limit - 6; i++) text += possible.charAt(Math.floor(Math.random() * (possible.length - 1)));

            const numb = new Date()
                .getTime()
                .toString()
                .substring(7, 13); // SECOND, MILLISECOND

            const shuffleArray = (array) => {
                let currentIndex = array.length;
                let temporaryValue, randomIndex;
                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            };

            const letter_array = shuffleArray((text + numb).split(''));

            let output = '';
            for (let i = 0; i < limit; i++) output += letter_array[i];

            return prefix + output;
        };
    if (!window.sui_throttle)
        window.sui_throttle = {
            set: () => {
                return {data: null};
            },
            run: (exec, throttle, option) => {
                let latency, breakOff, errorHandler;
                if (typeof option === 'number')
                    latency = option;
                else if (option && typeof option === 'object') {
                    latency = typeof option.latency === 'number' ? option.latency : 1000;
                    breakOff = option.breakOff;
                    errorHandler = option.errorHandler || typeof option.errorHandler === 'boolean' ? option.errorHandler : true;
                }

                latency = typeof latency === 'number' ? latency : 1000;

                const execute = async (f) => {
                    if (f) {
                        const exec = f();
                        if (exec instanceof Promise) await exec;
                    }
                };

                if (throttle.data)
                    clearTimeout(throttle.data);

                throttle.data = setTimeout(async () => {
                    let breakOffError = false;
                    try {
                        await execute(exec);
                        breakOffError = true;
                        await execute(breakOff);
                    } catch (err) {
                        if (errorHandler) {
                            if (typeof errorHandler === 'function')
                                errorHandler(err, breakOffError);
                            else throw err;
                        }
                    }
                }, latency);
            }
        };
    if (!window.sui_on) {
        window.sui_on = {
            scroll_callback: {},
            resize_callback: {},
            registerEvent: {
                scroll: (f) => {
                    let id = window.sui_generateId('scroll');
                    window.sui_on.scroll_callback[id] = f;
                    return id;
                },
                resize: (f) => {
                    let id = window.sui_generateId('resize');
                    window.sui_on.resize_callback[id] = f;
                    return id;
                }
            },
            removeEvent: {
                scroll: (id) => {
                    if (id)
                        delete window.sui_on.scroll_callback[id];
                },
                resize: (id) => {
                    if (id)
                        delete window.sui_on.resize_callback[id];
                }
            },
            init: () => {
                document.addEventListener(
                    'scroll',
                    (event) => {
                        window.requestAnimationFrame(() => {
                            for (let c in window.sui_on.scroll_callback)
                                if (typeof window.sui_on.scroll_callback[c] === 'function') {
                                    try {
                                        window.sui_on.scroll_callback[c](event);
                                    } catch (err) {
                                        console.error(err);
                                        delete window.sui_on.scroll_callback[c];
                                    }
                                }
                        });
                    },
                    {passive: true}
                );

                window.addEventListener(
                    'resize',
                    (event) => {
                        window.requestAnimationFrame(() => {
                            for (let c in window.sui_on.resize_callback)
                                if (typeof window.sui_on.resize_callback[c] === 'function') {
                                    try {
                                        window.sui_on.resize_callback[c](event);
                                    } catch (err) {
                                        console.error(err);
                                        delete window.sui_on.resize_callback[c];
                                    }
                                }
                        });
                    },
                    {passive: true}
                );
            }
        };
        window.sui_on.init();
    }
})();
