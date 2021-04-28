<template lang="pug">
    div
        sui-card Documentation
        Prism(language="html")
            | &lt;div id="app"&gt;

</template>
<script>
import Prism from 'vue-prism-component'

export default {
    name: "documentation",
    components: {Prism}
}
</script>
<style lang="less">
@import '../assets/viewport.less';
</style>
