
export default {
    name: "sui-list",
    props: {
        sets: {
            type: Number,
            default: 6
        },
        minColumns: {
            type: Number,
            default: 1
        },
        endOfList: {
            type: Function,
            default: () => {
            }
        },
        readmore: {
            type: String,
            default: '"...Read More"'
        }
    },
    data() {
        return {
            list: [],
            endOfList_bool: false,
            url: []
        };
    },
    created() {
        if (this.sets < 2)
            throw 'need at least 2 sets';
    },
    methods: {
        removeList(url) {
            if (url) {
                let del = (u) => {
                    let idx = this.url.indexOf(u);
                    this.list.splice(idx, 1);
                    this.url.splice(idx, 1);
                };

                if (typeof url === 'string')
                    del(url);
                else if (Array.isArray(url)) {
                    for (let u of url)
                        del(u);
                }

            } else {
                this.list = [];
                this.url = [];
            }
        },
        addList(list, url = this.url[this.url.length - 1]) {

            if (!url && !this.url.length)
                url = window.sui_generateId('list');

            this.endOfList_bool = !list.length;

            // return if there is no list
            if (this.endOfList_bool)
                return;

            // sets array will be 2d array.
            let sets = [[]];
            for (let l of list) {
                let {image, price, title, description} = l;
                let article = {};

                if (image)
                    article.image = image;

                if (title || description)
                    article.title = title || description;

                if (title && description)
                    article.description = description;

                if (typeof price === 'number' || typeof price === 'string')
                    article.price = price;


                /**type definition
                 * {
                 *     [keyName]: <boolean | is mandatory>
                 * }
                 */

                let type = {
                    image: {
                        image: true
                    },
                    item: {
                        price: true,
                        title: true,
                        description: false,
                        image: false
                    },
                    text: {
                        title: true,
                        description: false
                    },
                    article: {
                        image: true,
                        title: true,
                        description: false
                    }
                };

                let getType = '';
                for (let name in type) {

                    let articleKeys = Object.keys(article);
                    let typeKeys = Object.keys(type[name]);

                    let passedKeyCheck = true;

                    for (let keyName of articleKeys) {
                        if (!typeKeys.includes(keyName)) {
                            passedKeyCheck = false;
                            break;
                        }
                    }

                    if (passedKeyCheck)
                        for (let keyName of typeKeys) {
                            let mandatory = type[name][keyName];
                            if (mandatory && !articleKeys.includes(keyName)) {
                                passedKeyCheck = false;
                            }
                        }

                    if (passedKeyCheck) {
                        getType = name;
                        break;
                    }
                }

                article.type = getType;

                if (sets[sets.length - 1].length === this.sets)
                    sets.push([]);

                sets[sets.length - 1].push(article);
            }

            if (!this.url.includes(url))
                this.url.push(url);

            let idx = this.url.indexOf(url);

            // this.list array will be 3d array.
            if (!this.list[idx])
                this.list.push([]);

            if (sets.length) {
                for (let s of sets)
                    this.list[idx].push(s);
            }

            if (this.list[idx][this.list[idx].length - 1].length < this.sets) {
                this.endOfList_bool = true;
                this.endOfList(true);
            }
        }
    },
    computed: {
        cssVar() {
            let col = this.minColumns;
            if (col < 1)
                throw 'min-columns should be at least 1';
            let css = '';
            while (col--) {
                css += '1fr ';
            }
            return {
                '--list-col-desktop': css + '1fr 1fr',
                '--list-col-laptop': css + '1fr',
                '--list-col-phone': css,
                '--readmore': this.readmore
            };
        }
    }
};
