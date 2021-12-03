<template lang='pug'>
div
    i.rating.material-icons(v-for="i in parseInt(rating)") star
    i.rating.material-icons(v-if="rating % 1 >= 0.5") star_half
</template>

<script>
export default {
    name: 'sui-ratings',
    props: {
        rating: Number,
    }
};
</script>
<style lang="less" scoped>
@import '../assets/viewport.less';
i {
    &.rating.material-icons {
        font-size: 1rem;
        color: #fed43b;
    }
}
</style>
