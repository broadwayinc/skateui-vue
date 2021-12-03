<template lang='pug'>
sui-sticky.sui-title(:class="{grid: src}" v-if="sticky")
    div.image(v-if="src" :style="{backgroundImage: `url(${src})`}")
    div.title(v-if="title") {{ title }}
    div.subtitle {{ subtitle }}
        slot
.sui-title(:class="{grid: src}" v-else)
    div.image(v-if="src" :style="{backgroundImage: `url(${src})`}")
    div.title(v-if="title") {{ title }}
    div.subtitle {{ subtitle }}
        slot
</template>

<script>
export default {
    name: 'sui-title',
    props: {
        title: String,
        subtitle: String,
        src: String,
        sticky: Boolean
    },
};
</script>
<style lang="less">
@import '../assets/viewport.less';

.sui-title {
    padding: var(--padding);
    padding-top: 0;
    padding-bottom: 0;
    margin-top: var(--padding);
    margin-bottom: var(--padding);
    font-size: inherit;

    &.sui-sticky {
        background-color: var(--content, #ffffff);
        z-index: 2;
        margin-top: 0;
        padding-bottom: var(--padding);
        padding-top: var(--padding);

        &:first-child {
            margin-top: calc(var(--padding) * -1);
        }
    }

    &.grid {
        display: grid;
        grid-template-areas: "image title" "image subtitle";
        grid-template-columns: fit-content(50px) 1fr;
        grid-template-rows: 1fr auto;
        align-items: center;
        column-gap: calc(var(--padding) / 1.5);
    }

    & > .image {
        grid-area: image;
        height: calc(1.8rem + var(--space-1));
        width: calc(1.8rem + var(--space-1));
        background-size: cover;
        border-radius: var(--card-border-radius);
    }

    & > .title {
        grid-area: title;
        font-size: var(--title-font);
        font-weight: bold;
        line-height: 1em;
    }

    & > .subtitle {
        grid-area: subtitle;
        font-size: var(--subtitle-font);
        margin-top: var(--space-1);
        line-height: 1rem;

        & > * {
            margin-right: calc(var(--padding) / 2);
        }
    }
}
</style>
