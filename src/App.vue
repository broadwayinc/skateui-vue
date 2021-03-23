<template lang="pug">
.sui_frame
    .view
        router-view
</template>
<script>
import {ColorMangle} from 'colormangle';

export default {
    name: "app",
    created() {
        let cs = new ColorMangle('#00807f').colorScheme();
        let body = document.getElementsByTagName('BODY')[0];
        for (let c in cs)
            body.style.setProperty(c, cs[c]);
    }
};
</script>
<style lang="less">
@import './assets/normalize.css';

.sui_frame {
    min-height: 100%;
    width: 100%;
    background-color: var(--background);
    color: var(--background-text);

    .view {
        max-width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap;

        & > * {
            &:first-child {
                margin-top: 0;
            }

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}

</style>
