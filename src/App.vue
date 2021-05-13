<template lang="pug">
div
    sui-app(:hide-navbar='true')
        template(#nav)
            div(style="display:flex;align-items:center;justify-content: space-between;")
                h2 Skate UI
                sui-button(@click="()=>{notification = !notification}") Notification
        router-view
        template(#notification v-if="notification")
            sui-card(style="margin: 8px" :close="()=>{notification = !notification}")
                template(#title) Welcome
                template(#content) Hello Sui Hello Sui Hello Sui
</template>
<script>

export default {
    name: "app",
    data() {
        return {
            notification: false
        };
    }
};
</script>
<style lang="less">
</style>