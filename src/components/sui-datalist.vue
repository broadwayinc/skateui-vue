<template lang='pug'>
.sui-datalist(ref="datalist" :id="id")
    .options
        slot
    transition(name="slide")
        .sui-result(v-if="searchResult.length && isFocus")
            template(v-for="(result, idx) in searchResult")
                div(v-html="result.outerHTML" @click="makeSelection(idx)" @mouseover="selection = idx" :class="{'active': idx === selection}")
</template>

<script>
export default {
    name: 'sui-datalist',
    data() {
        return {
            searchValue: '',
            searchResult: [],
            selection: null,
            isFocus: false,
        }
    },
    props: {
        value: String,
        id: String,
        filter: {
            type: Boolean,
            default: true
        }
    },
    mounted() {
        document.querySelector(`[data-list="${this.id}"]`).append(this.$refs.datalist);
        document.querySelector(`[data-list="${this.id}"]`).addEventListener('input', (e) => {
            this.getSearch(e);
        });
        document.querySelector(`[data-list="${this.id}"]`).addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 13:
                    e.preventDefault();
                    this.makeSelection();
                    break;
                case 38:
                    e.preventDefault();
                    if(this.selection > 0) this.selection -= 1;
                    break;
                case 40:
                    e.preventDefault();
                    if(this.selection === null) this.selection = 0;
                    else if(this.selection < this.searchResult.length - 1) this.selection += 1;
                    break;
            }
            // if(this.searchResult[this.selection]) e.target.value = this.searchResult[this.selection].getAttribute('value');
        });
        document.querySelector(`[data-list="${this.id}"]`).addEventListener('input', (e) => {
            this.getSearch(e);
        });
        document.querySelector(`[data-list="${this.id}"] input`).addEventListener('focus', (e) => {
           this.isFocus = true;
        });
        document.querySelector(`[data-list="${this.id}"] input`).addEventListener('blur', (e) => {
            this.isFocus = false;
        });
        this.observer = new MutationObserver(function(mutations) {
            this.getSearch(null, mutations);
        }.bind(this));

        // Setup the observer
        this.observer.observe(
            this.$refs.datalist.querySelector('.options'),
            { childList: true }
        );
    },
    beforeDestroy() {
        this.observer.disconnect();
    },
    watch: {
        searchValue() {
            if(this.filter) this.getSearch();
        }
    },
    methods: {
        getSearch(e) {
            if(e) this.searchValue = e.target.value
            if(!this.searchValue) {
                this.searchResult = [];
                this.selection = null;
            } else {
                let results = [...this.$refs.datalist.querySelector('.options').childNodes];
                if(this.filter) {
                    let temp = results.filter(word => {
                        let regex = new RegExp(this.searchValue.toLowerCase() + '(.)?', 'g');
                        if (this.searchValue) {
                            if (word.textContent.toLowerCase().match(regex)) {
                                return word;
                            }
                        }
                    });
                    results = temp;
                }
                this.searchResult = results;
            }
        },
        makeSelection() {
            document.querySelector(`[data-list="${this.id}"] input`).value = this.searchResult[this.selection].getAttribute('value');
            // e.target.value = this.searchResult[this.selection].getAttribute('value');
            let event = new Event('input', {
                bubbles: true,
                cancelable: true,
            });
            document.querySelector(`[data-list="${this.id}"] input`).dispatchEvent(event);
            this.searchResult = [];
            this.searchValue = '';
            this.selection = null;
        }
    }
};
</script>
<style lang="less">
.sui-datalist {
    background-color: var(--content, #fff);
    & .options {
        display: none;
    }

    & .sui-result {
        position: absolute;
        left: -2px;
        width: calc(100% + 4px);
        background-color: inherit;
        cursor: pointer;
        z-index: 2;

        & > div {
            padding: calc(var(--padding) / 2);

            &:not(:first-child) {
                margin-top: calc(var(--padding) / 2 * -1);
            }
            
            &.active {
                background-color: var(--content-focus_shade, rgba(0, 0, 0, 0.066));
            }
        }
    }

    .slide-enter-active, .slide-leave-active {
        transform: translateY(0px);
        transition: all .5s;
    }
    .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateY(-10px);
        opacity: 0;
    }
}
</style>