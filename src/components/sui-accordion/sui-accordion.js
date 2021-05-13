
export default {
    name: 'sui-accordion',
    props: {
        title: String
    },
    mounted() {
        if (!window.sui_accordion) {
            window.sui_accordion = {
                timeout: null,
                handler: (ev) => {
                    let el = ev.target.closest('.sui-accordion');

                    if (!el)
                        return;

                    let bool = !el.classList.contains('minus');

                    if (bool)
                        el.classList.add('minus');
                    else
                        el.classList.remove('minus');

                    if (el)
                        el = el.lastChild;

                    if (window.sui_accordion.timeout)
                        clearTimeout(window.sui_accordion.timeout);
                    window.sui_accordion.timeout = null;

                    if (bool) {
                        el.style.maxHeight = '100vh';
                        window.sui_accordion.timeout = setTimeout(() => {
                            // use this.$nextTick() for vue
                            el.style.maxHeight = 'unset';
                        }, 750);
                    } else {
                        el.style.maxHeight = '100vh';
                        window.sui_accordion.timeout = setTimeout(() => {
                            el.style.maxHeight = '0';
                        }, 100);
                    }
                }
            };
        }
    }
};
