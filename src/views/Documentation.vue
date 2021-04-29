<template lang="pug">
    div.documentation
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
        br
        br
        sui-card
            template(#title)
                h2 Buttons
            template(#content)
                h4 About
                div.
                    Buttons provide the option to display your buttons in 3 different button styles. For greater control, you can customize buttons using the <code>customStyle</code> prop. SUI-Button accepts standard html attributes <code>href</code> and <code>target</code>.
                br
                div.
                    &lt;<span style="font-weight: bold;">sui-button</span>>Button Text&lt;/<span style="font-weight: bold;">sui-button</span>>
                br
                h4 Props
                h5 type String
                div An optional string that accepts <code>nude</code> or <code>icon</code> as a value. When using <code>icon</code>, you must include the prop <code>icon</code> to provide the content of the button.
                br
                div.example-wrapper
                    div.example-viewer
                        sui-button Button
                        sui-button(type="nude") Nude
                        sui-button(type="icon" icon="translate")
                    div.example-code
                        Prism(inline language="html" :code="buttonPropType")
                br
                h5 icon String
                div A required string that is used together with <code>type</code> of <code>icon</code>. Skate-UI uses the material icons library as it's default icon package. For a full list of usable icons, <a href="https://fonts.google.com/icons?selected=Material+Icons" target="_blank">click here</a>.
                br
                h5 loading boolean
                div An optional boolean that is used to place the button in a loading state. Note: The <code>icon</code> buttons do not have a loading state.
                br
                div.example-wrapper
                    div.example-viewer
                        sui-button(loading) Button
                        sui-button(type="nude" loading) Nude
                    div.example-code
                        Prism(inline language="html" :code="buttonPropLoading")
                br
                h5 customStyle Object
                div An optional object that contains CSS for the button. You must pass in the css in camel case only.
                br
                div.example-wrapper
                    div.example-viewer
                        sui-button(:customStyle="{color: '#ff00ff', backgroundColor: 'pink'}") Button
                        sui-button(type="nude" :customStyle="{color: '#ff00ff'}") Nude
                        sui-button(type="icon" icon="translate" :customStyle="{color: '#ff00ff', backgroundColor: 'pink'}")
                    div.example-code
                        Prism(inline language="html" :code="buttonPropCustomStyle")
                br
                h4 Events
                h5 click Function
                div An optional event that can accept a function that runs when the button is clicked. The button emits a <code>click</code> event on click.
                br
                div.example-wrapper
                    div.example-viewer
                        sui-button(@click="sayHi()") Say Hi!
                    div.example-code
                        Prism(inline language="html" :code="buttonEventClick")
                br


</template>
<script>
import Prism from 'vue-prism-component'
import {cardPropContentCenter, cardPropStickyMobileButtonFooter, cardPropDisabled, cardPropStickyTitle, cardExample1, cardExample2, buttonPropType, buttonPropLoading, buttonPropCustomStyle, buttonEventClick} from '../lib/code-library'

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
            buttonPropType: buttonPropType(),
            buttonPropLoading: buttonPropLoading(),
            buttonPropCustomStyle: buttonPropCustomStyle(),
            buttonEventClick: buttonEventClick(),
        }
    },
    methods: {
        alert(msg) {
            alert(msg);
        },
        sayHi() {
            alert('Hello!');
        }
    }
}
</script>
<style lang="less">
@import '../assets/viewport.less';
.documentation {
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
    code:not([class*="language-"]) {
        color: var(--complementary-text);
        background-color: var(--complementary);
        padding: 1px 5px;
        border-radius: 2px
    }
    a {
        color: var(--complementary);
    }
}
</style>
