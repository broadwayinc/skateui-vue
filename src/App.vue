<template lang="pug">
._cc_frame(:style="colorScheme")
    .view
        router-view
</template>
<script>
import {ColorMangle} from 'colormangle';
export default {
    name: "app",
    data() {
        return {
            // colorScheme: new ColorMangle('#c6c089').colorScheme()
            colorScheme: new ColorMangle('#00807f').colorScheme()
        };
    }
};
</script>
<style lang="less">
@import './assets/normalize.css';

._cc_frame {
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
