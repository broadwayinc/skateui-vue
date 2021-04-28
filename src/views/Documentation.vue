<template lang="pug">
    div
        // Introduction
        sui-card
            template(#title)
                h2 Introduction
            template(#content).
                Skate-UI is a responsive component based UI framework for Vue.js that is quick and easy to start with.
        br
        br
        // Card
        sui-card
            template(#title)
                h2 Cards
            template(v-slot:content)
                h4 About
                div.
                    Cards are the building blocks of Skate-UI. Content should wrapped within a sui-card. It includes options for title, image, content, button footer and footer. Cards are inline-blocks by default and have paddings set. You can overwrite the paddings with your own values using the style attribute.
                br
                h4 Example
                div
                    | Cards have no set width by default so they will grow with the size of their content. You can set their width using the style attribute.
                    div.example-wrapper
                        div.example-viewer
                            sui-card(style="max-width: 300px" content-center)
                                template(#title) Title
                                template(#image)
                                    img(style='height: 150px; width: auto' src="/img/skate.jpg")
                                template(#content) Content: Create beautiful components in minutes!
                                template(#buttonFooter)
                                    sui-button Skates On!
                                template(#footer) Footer
                        div.example-code
                            pre
                                code
                                    <span>hello</span>

</template>
<script>
export default {
    name: "documentation"
}
</script>
<style lang="less">
@import '../assets/viewport.less';
.example-wrapper {
    background-color: var(--background);
    border-radius: 8px;
    border: 1px solid var(--content-text_shadow);
    margin: 8px 0;
    overflow: hidden;

    .example-viewer,
    .example-code {
        padding: 8px;
    }

    .example-code {
    }
}
</style>
