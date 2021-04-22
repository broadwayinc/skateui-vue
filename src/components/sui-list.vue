<template lang="pug">
.sui-list(style="--textclamp: 3;" :style="cssVar")
    .article(v-if="$slots.pre")
        .content
            slot(name="pre")
    template(v-for="url in list")
        template(v-for="set in url")
            template(v-for="article in set")
                .article(v-if="article.type === 'image'")
                    .content
                        img(:src="article.image")
                .article(v-if="article.type === 'item'" style="--textclamp: 2")
                    .content
                        img.square(:src="article.image")
                        .content-wrapper
                            .description
                                .title {{article.price}}
                                .text {{article.title}}
                            button
                                i.material-icons shopping_cart
                .article(v-if="article.type === 'article'")
                    .content
                        img.block(:src="article.image")
                        .title {{article.title}}
                        .text {{article.description}}
                .article(v-if="article.type === 'text'")
                    .content(style="justify-content: center;")
                        div(style='width:100%;box-sizing:border-box;' :style="{padding: article.description ? '0' : '0 6%'}")
                            sui-autosize(v-if='article.title' style='width:100%;font-weight: 500;text-shadow: 1px 1px var(--content-text_shadow);' :text-align='!article.description ? "center" : null' :value="article.title.length > 64 ? article.title.substring(0, 64) + '...' : article.title" readonly :min="16" :max="article.description ? 24 : 48")
                        p.description(v-if='article.description') {{article.description.length > 256 ? article.description.substring(0, 256) + '...' : article.description}}
                        .shade(v-if="article.description || article.title.length > 64")
    .article(v-if="$slots.post")
        .content
            slot(name="post")
</template>

<script>
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
</script>

<style scoped lang="less">
@import "../assets/viewport.less";

div.sui-list {
    --grid: var(--list-col-desktop);
    @media @laptop {
        --grid: var(--list-col-laptop);
    }
    @media @phone {
        --grid: var(--list-col-phone);
    }
    display: grid;
    grid-template-columns: var(--grid);
    gap: 8px;

    .article {
        position: relative;
        width: 100%;
        //box-shadow: 0 0 0 2px var(--content-text_screen);
        //box-shadow: 0 0 8px var(--background-text_screen);
        border-radius: 8px;
        overflow: hidden;
        background-color: var(--content);
        padding-top: 100%;

        &:hover {
            cursor: pointer;

            .overlay {
                display: flex;
            }
        }

        & > .overlay {
            position: absolute;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: var(--shade);
            color: white;
        }

        .content {
            position: absolute;
            display: flex;
            flex-direction: column;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;

            & > img.block {
                display: block;
                width: 100%;
                height: calc(100% - (calc((0.8em * 1.25) * 4) + 1.5rem));
                position: static;
            }

            & > img {
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                overflow: hidden;
                object-position: 50% 30%;
                object-fit: cover;
            }

            & > img.square {
                width: 60%;
                height: 60%;
                border-radius: 4px;
                position: static;
                top: unset;
                left: unset;
                object-position: center;
                margin: auto;
            }

            & > .content-wrapper {
                display: flex;

                .description {
                    max-width: 80%;
                    flex-grow: 1;
                }

                & button {
                    width: 20%;
                    min-width: 50px;
                    color: var(--content-focus);

                    &:hover {
                        color: var(--content-focus_faded);
                    }
                }
            }

            .title:not(:empty) {
                margin: .5rem;
                text-align: left;
                flex-shrink: 0;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                font-weight: 500;
                color: var(--content-text_soft);
                text-shadow: 1px 1px var(--content-text_shadow);
                overflow: hidden;
                font-size: .8rem;
                line-height: 1.25;

                & + .text {
                    padding-top: 0;
                }
            }

            & > p.description {
                padding: 0 .75rem;
                max-height: 60%;
                border: transparent solid 2px;
                font-size: 16px;
                box-sizing: border-box;
                margin-bottom: 1.5em;
            }

            & > .shade {
                font-size: 16px;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 44px, rgba(255, 255, 255, 0.5) 66px, rgba(255, 255, 255, 0) 88px, rgba(0, 0, 0, 0) 100%);

                &::after {
                    content: " " var(--readmore);
                    color: var(--content-text_soft);
                    bottom: 0;
                    position: absolute;
                    font-size: 14px;
                    right: 0;
                    padding: 1em;
                    display: block;
                }
            }

            .text:not(:empty) {
                padding: .5em 0.5rem 0;
                text-align: left;
                flex-shrink: 0;
                display: -webkit-box;
                -webkit-line-clamp: var(--textclamp);
                margin-bottom: .5rem;
                -webkit-box-orient: vertical;
                overflow: hidden;
                font-size: 0.7rem;
                line-height: 1.25;
                height: calc(0.7rem * 1.25 * var(--textclamp));

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>