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
            template(#content)
                h4 About
                div.
                    Cards are the building blocks of Skate-UI. Content should wrapped within a sui-card. It includes options for title, image, content, button footer and footer. Cards are inline-blocks by default and have paddings set. You can overwrite the paddings with your own values using the style attribute.
                br
                div.
                    &lt;<span style="font-weight: bold;">sui-card</span>>
                        &lt;template <span style="font-weight: bold;">#title</span>>&lt;/template>
                        &lt;template <span style="font-weight: bold;">#image</span>>&lt;/template>
                        &lt;template <span style="font-weight: bold;">#content</span>>&lt;/template>
                        &lt;template <span style="font-weight: bold;">#footerButton</span>>&lt;/template>
                        &lt;template <span style="font-weight: bold;">#footer</span>>&lt;/template>
                    &lt;/<span style="font-weight: bold;">sui-card</span>>
                br
                h4 Props
                h5 contentCenter boolean
                div An optional boolean that centers the alignment of <code>content</code>, <code>footerButton</code>, and <code>footer</code>. The default position of <code>content</code> is left aligned and the default position of <code>footerButton</code> and <code>footer</code> is right aligned.
                br
                div.example-wrapper
                    div.example-viewer
                        sui-card(style="max-width: 300px" content-center)
                            template(#title) Title is not centered
                            template(#image)
                                img(style='width: 100%;' src="/img/skateui.jpg")
                            template(#content) Content is centered
                            template(#buttonFooter)
                                sui-button Button is Centered
                            template(#footer) Footer is centered
                    div.example-code
                        Prism(inline language="html" :code="cardPropContentCenter")
                br
                h5 stickyMobileButtonFooter boolean
                div An optional boolean that sticks the contents of <code>buttonFooter</code> to the bottom of the screen on mobile devices.
                br
                div.example-wrapper
                    div.example-viewer
                        sui-card(style="max-width: 300px" sticky-mobile-button-footer)
                            template(#content) The button below will be stickied on mobile devices.
                            template(#buttonFooter)
                                sui-button Sticky Button
                    div.example-code
                        Prism(inline language="html" :code="cardPropStickyMobileButtonFooter")
                br
                h5 closeButton Function
                div An optional prop that accepts a function that will be executed on left click.
                br
                h5 disabled boolean
                div An optional boolean will put all the contents except for <code>title</code> in a blurred state.
                br
                div.example-wrapper
                    div.example-viewer
                        sui-card(style="max-width: 300px" disabled)
                            template(#title) Title will not been disabled
                            template(#image)
                                img(style='height: 150px; width: auto' src="/img/skateui.jpg")
                            template(#content) Content has been disabled
                            template(#buttonFooter)
                                sui-button Button Disabled
                            template(#footer) Footer Disabled
                    div.example-code
                        Prism(inline language="html" :code="cardPropDisabled")
                br
                h5 stickyTitle boolean
                div An optional boolean that turns <code>title</code> into a scrolling content.
                br
                div.example-wrapper
                    div.example-viewer
                        sui-card(style="max-width: 300px" sticky-title)
                            template(#title) Title is Sticky
                            template(#image)
                                img(style='height: 150px; width: auto' src="/img/skateui.jpg")
                            template(#content) This is some random content to create length to show the scrolling of the title.
                    div.example-code
                        Prism(inline language="html" :code="cardPropStickyTitle")
                br
                h4 Example
                div Cards have no set width by default so they will expand according to the size of their content. You can set their width using the style attribute.
                div.example-wrapper
                    div.example-viewer
                        sui-card(style="max-width: 300px" content-center)
                            template(#title) Title
                            template(#image)
                                img(style='height: 150px; width: auto' src="/img/skate.jpg")
                            template(#content) Content: Create beautiful components in minutes!
                                img(style="width: 80px;" src="/img/swimdog.gif")
                            template(#buttonFooter)
                                sui-button Click Me
                            template(#footer) Footer
                    div.example-code
                        Prism(inline language="html" :code="cardExample1")
                br
                h4 Optional Content
                div All content in cards are optional, making it a very flexible component. For example, we could build a card that only contains <code>content</code> or a card that contains only <code>image</code> and <code>content</code>.
                div.example-wrapper
                    div.example-viewer
                        sui-card(style="max-width: 250px; margin-right: 8px;" content-center)
                            template(#content) I have nothing but content!
                        sui-card(style="max-width: 250px")
                            template(#image)
                                img(style='width: 100%' src="/img/skateui.jpg")
                            template(#content) Some Description
                    div.example-code
                        Prism(inline language="html" :code="cardExample2")


</template>
<script>
import Prism from 'vue-prism-component'
import {cardPropContentCenter, cardPropStickyMobileButtonFooter, cardPropDisabled, cardPropStickyTitle, cardExample1, cardExample2} from '../lib/code-library'

export default {
    name: "documentation",
    components: {Prism},
    data() {
        return {
            cardPropContentCenter: cardPropContentCenter(),
            cardPropStickyMobileButtonFooter: cardPropStickyMobileButtonFooter(),
            cardPropDisabled: cardPropDisabled(),
            cardPropStickyTitle: cardPropStickyTitle(),
            cardExample1: cardExample1(),
            cardExample2: cardExample2(),
        }
    },
    methods: {
        alert(msg) {
            alert(msg);
        }
    }
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

    .example-viewer {
        padding: 8px;
    }
}
:not(pre) > code[class*="language-"] {
    white-space: pre-wrap;
    display: block;
    border-radius: 0;
    padding: 8px;
}
code {
    color: var(--complementary-text);
    background-color: var(--complementary);
    padding: 1px 5px;
    border-radius: 2px
}
</style>
