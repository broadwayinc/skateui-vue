<template lang='pug'>
.sui-option(:value="value")
    slot
</template>

<script>
export default {
    name: 'sui-option',
    props: {
        value: String
    }
};
</script>
<style lang="less">
</style>