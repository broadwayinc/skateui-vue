(function () {
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
            /**
             * closes popup
             * @param {object} option
             * @param {string} option.id - id of popup element
             * @param {object} [option.event] - mouse event for preventing propagation
             * @param {function} [option.callback] - runs callback after closing popup
             */
            close: (option) => {
                let {event, id, callback} = option;

                id = id[0] === '#' ? id.substring(1) : id;
                let el = document.getElementById(id);
                if (!el)
                    throw 'NEED_ELEMENT_ID';

                let screen = el.closest('.sui-screen');

                let popList = window.sui_popup.classList.pop;
                let directionList = window.sui_popup.classList.direction;

                if (event)
                    event.stopPropagation();

                // center popup closes immediately
                let cl_idx = el.classList.length, immediate = false;
                while (cl_idx--) {
                    if (el.classList[cl_idx].includes('_pop-center'))
                        immediate = true;
                }

                // close popup
                for (let c of directionList)
                    el.classList.remove(c);

                if (screen)
                    screen.style.backgroundColor = 'transparent';

                // prevent user get thrown back to top
                if (document.body.style.position === 'fixed') {
                    let scrollY = document.body.style.top;
                    document.body.style.position = '';
                    document.body.style.top = '';
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);
                }

                // remove click propagation
                if (window.sui_popup.eventListener[id]) {
                    el.removeEventListener('click', window.sui_popup.eventListener[id]);
                    delete window.sui_popup.eventListener[id];
                }

                window.sui_popup.timeout = setTimeout(() => {
                    // cleanup
                    for (let c of popList)
                        el.classList.remove(c);

                    el.classList.remove('sui-popup');

                    let dummy = document.getElementById('_dummy_' + id);
                    if (dummy) {
                        dummy.parentNode.insertBefore(el, dummy);
                        dummy.remove();
                    }
                    if (screen)
                        screen.remove();
                }, immediate ? 0 : 750);

                if (typeof callback === 'function')
                    return callback();
            },
            /**
             * opens popup
             * @param {string | object } option - id string of element to place over the overlay | parameter object
             * @param {string} option.id - id string of element to place over the overlay
             * @param {string} [option.pop='center'] - popup placement 'center' | 'top' | 'bottom' | 'left' | 'right'
             * @param {boolean} [option.closeOnBackgroundClick=false] - popup closes when screen is clicked if true
             * @param {boolean} [option.backgroundScroll=false] - allows overlay to scroll underlying html page
             * @param {string} [option.overlayColor='rgba(0,0,0,0.33)'] - color of the overlay
             */
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

                pop = '_pop-' + pop;
                let direction = directionList[popList.indexOf(pop)];
                if (!popList.includes(pop))
                    throw 'allowed argument for pop:' + JSON.stringify(popList);

                if (!directionList.includes(direction))
                    throw 'allowed argument for pop:' + JSON.stringify(directionList);

                if (window.sui_popup.timeout)
                    clearTimeout(window.sui_popup.timeout);
                window.sui_popup.timeout = null;

                // get overlay element
                let screen = document.getElementsByClassName('sui-screen')[0];

                if (screen)
                    // popup is already up
                    throw 'POPUP_IS_ALREADY_UP';
                else {
                    // create overlay
                    screen = document.createElement('div');
                    screen.classList.add('sui-screen');
                    screen.classList.add(pop);

                    let body = document.getElementsByTagName('BODY')[0];
                    if (!backgroundScroll) {
                        document.body.style.top = `-${window.scrollY}px`;
                        document.body.style.position = 'fixed';
                    }
                    if (closeOnBackgroundClick) {
                        screen.addEventListener('click', function (event) {
                            window.sui_popup.close({event, id});
                        });
                    }

                    body.append(screen);

                    window.sui_popup.eventListener[id] = function (e) {
                        e.stopPropagation();
                    };

                    el.addEventListener('click', window.sui_popup.eventListener[id]);
                    if (!el.classList.contains('sui-popup')) {
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
        // prevents duplicate process
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
        // registers dom events
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
