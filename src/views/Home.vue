<template lang="pug">
    div
        sui-card
            sui-slider(:slideArray="slide" :show-arrow="true" :height=500)
        sui-card
            sui-slider(:slideArray="slide" :show-arrow="false" :show-pagination="true" :height=500)
        sui-card
            template(#title) SVG
            template(#content)
                sui-svg(svg="youtube" color="red")
                pre
                sui-svg(svg="facebook")
                pre
                sui-svg(svg="javascript")
                pre
                sui-svg(color="green" svg-hover="red" :size=15 svg="M 4 8 L 10 1 L 13 0 L 12 3 L 5 9 C 6 10 6 11 7 10 C 7 11 8 12 7 12 A 1.42 1.42 0 0 1 6 13 A 5 5 0 0 0 4 10 Q 3.5 9.9 3.5 10.5 T 2 11.8 T 1.2 11 T 2.5 9.5 T 3 9 A 5 5 90 0 0 0 7 A 1.42 1.42 0 0 1 1 6 C 1 5 2 6 3 6 C 2 7 3 7 4 8 M 10 1 L 10 3 L 12 3 L 10.2 2.8 L 10 1")
        sui-card
            template(#image)
                img(style='width: 20rem' src="@/assets/skate.jpg")
            template(#content)
                h4 SKATE UI
                br
                | All the CSS scripts are available inside this .vue file.
                br
                br
                | The key aspects of Skate UI should be -
                br
                br
                ol
                    li Follows html rules
                    li Focused on providing strict style guides to speed up web development
                    li Minimal javascript as possible
                    li Basic inline-block style layout that works
                    li br, pre tag is used for line breaks and margin
                br
                br
                br
                h3 The CARD
                hr
                br
                p.
                    You are currently reading a card
                    Mostly everything will be contained in a card
                    From registration forms to articles, lists, menus... and so on
                    Content inside the card has an indent/styling depending on what/where you put in stuff
                br
                br
                sui-accordion
                    .title Fonts
                    hr
                    .content(style="padding: 0 .5em;" onclick="(function(event){event.stopPropagation()})(event)")
                        br
                        p OS system fonts should be used.
                        br
                        h1 This is &lt;h1&gt;
                        br
                        h2 This is &lt;h2&gt;
                        br
                        h3 This is &lt;h3&gt;
                        br
                        h4 This is &lt;h4&gt;
                        br
                        h5 This is &lt;h5&gt;
                        br
                        h6 This is &lt;h6&gt;
                        br
                        p This is &lt;p&gt;
                        br
                        small This is &lt;small&gt;
                br
                sui-accordion
                    .title Color Scheme
                    hr
                    .content(style="padding: 0 .5em;" onclick="(function(event){event.stopPropagation()})(event)")
                        br
                        div(v-for="(c, k) in colorScheme" :style="{display:'flex',alignItems:'center'}")
                            p {{k}} : {{c}}&nbsp;
                            div(:style="{width:'1em',height:'1em',backgroundColor:c,border:'1px solid'}")
            template(#buttonFooter)
            template(#footer) I am your footer! The font size here is 0.8rem unless tag is used.
        br
        br
        div
            sui-card EMPTY
            sui-card
                template(#title) TITLE
            sui-card
                template(#content) CONTENT
            sui-card
                template(#buttonFooter) BUTTON
            sui-card
                template(#footer) FOOTER
            sui-card
                template(#title) TITLE
                template(#content) CONTENT
                template(#footer) FOOTER
            sui-card
                template(#title) TITLE
                template(#image)
                    div(style="background-color:var(--content-text);color:var(--content);text-align:center;") IMAGE
                template(#content) CONTENT
                template(#buttonFooter) BUTTON
                template(#footer) FOOTER
            sui-card
                template(#image)
                    div(style="background-color:var(--content-text);color:var(--content);text-align:center;") IMAGE
                template(#content) CONTENT
                template(#buttonFooter) BUTTON
                template(#footer) FOOTER
            sui-card(align="center")
                template(#title) TITLE (.center)
                template(#image)
                    div(style="background-color:var(--content-text);color:var(--content);text-align:center;") IMAGE
                template(#content) CONTENT (.center)
                template(#buttonFooter) BUTTON (.center)
                template(v-slot:footer) FOOTER (.center)
        br
        br
        sui-card
            template(v-slot:title)
                h6 TITLE
            template(v-slot:content).
                Notice the card's title above.

                ".title" div handles the cards title.
                Title can contain plain text or any element (h1, h2, h3... p, div and so on).

                Paddings are handled with CSS.
                The line-height of the title is 2em by default.

                If the ".image" div has an image, (like the one above with the turtle)
                it is not advised to use it with the title. (or vice versa)
        br
        br
        sui-card(title-background title-color)
            template(#title)
                img(style='width:2em;height:2em;display:inline;vertical-align:middle;margin:.5em .5em .5em 0;border-radius:2em;border:solid 1px;' src="https://d2068sxih1zpja.cloudfront.net/eyJidWNrZXQiOiJiaW5jc3RvcmFnZSIsImtleSI6InBsYXphL2U5Yjg5NGM1LWQ1NDgtNGZkYi04YTJlLTdkNTllOTIyNzMyMC9pbWFnZS8yODg4NjcwX2tEVGFDRmUyMDcwNjc2NTQiLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjQ4MCwiaGVpZ2h0Ijo0ODAsImZpdCI6Im91dHNpZGUifX19")
                p(style="vertical-align:middle;display:inline;") The Turtle Has Escaped!

            template(#content).
                I changed up some styles in the title.
                We can highlight the title to alert users, or make use for something else.

                In this example, you may want to remove the default top padding of the title.
                simply add "margin-top: -1em" on the direct child div in the title div.
                (have a look inside this .vue file)
            template(#footer) I am your footer... don't ignore me...
        br
        br
        sui-card(contentCenter)
            template(#title)
                h6 CLASS ".center"
            template(#content)
                h5 If you ain't got much to write,
                p Try ".center" class on content. It will look nicer.
            template(#footer) Footer alignment follows the card alignment
        br
        br
        sui-card
            template(#content).
                In order for card css to work properly,
                all the child element(.title, .image, .content, .button_footer, .footer) should be present
                even if the element is empty.
            template(#footer) It's best to use 50% opacity on footer unless it's an alert message.
        br
        br
        sui-card(content-center sticky-mobile-button-footer)
            template(#title)
                h6 Button
            template(#content)
                h4 Look! A Button!
                br
                p We will use the ".button_footer" div for card buttons.
            template(#buttonFooter)
                //.hideonphone // Jinyoon redo this part
                sui-button HELLO
            //.button_footer.sticky.viewonphone
                sui-button HELLO
        br
        br
        sui-card
            template(#content)
                p.
                    If the card alignment is not set, button will be placed on the right side.

                    Notice the footer is also aligned on the right side.
                    If the ".button_footer" has any children,
                    the footer will automatically aligned right | center depending on the card align mode.

                    The margin between the buttons are managed by css. So just throw them in!
                br
                p Remember!
                ul
                    li Only one button is allowed to be filled! Rest should be nude.
                    li It is advised to not use more than 2 footer buttons.
            template(#buttonFooter)
                sui-button(type="nude") CANCEL
                sui-button COWABUNGA
            template(#footer) I'm your footer.
        br
        br
        sui-card
            template(#content)
                h5 But... I need more than 2 buttons!
                br
                p.
                    It may be best practice not to lay down a lot of buttons in the card,
                    still there might be some situation we might need more than 2 buttons.

                    In that case, simply use footer text as a link or a button.
            template(#buttonFooter)
                sui-button(type="nude") STEAL
                sui-button BUY
            template(#footer)
                a(style='color: var(--content-text);opacity:50%' href="https://www.google.com/search?q=dog&rlz=1C5CHFA_enKR901KR901&oq=dog&aqs=chrome..69i57j46i275j0l3j46j0l4.822j0j4&sourceid=chrome&ie=UTF-8") I lost my dog
        br
        br
        sui-card
            template(#title)
                h6 BUTTON DESIGNS
            template(#content)
                h6 There are only 3 types of buttons:
                br
                br
                sui-button filled
                sui-button(type="nude") nude
                sui-button(type="icon" icon="create")
                br
                br
                br
                p.
                    button.sui-button - Filled
                    button.sui-button.nude - Nude
                    button.sui-button.icon - Icon

                    Filled is a default.
                    Nude style is applied if you add ".nude" class to button.sui-button element.
                    Icon style is applied if you add ".icon" class to button.sui-button element.

                    Other than these two &lt;a&gt; tag can be used as a button as well.
                br
                br
                p JUST FEW THINGS...
                br
                ul
                    li.
                        Any type of icon or image should not be inside filled button.
                        The text on the button is pretty obvious so no need another icon to explain it twice.
                    li Button text are forced to be uppercase by css.
                    li Try not to use words with spaces for the button text.
                    li Only use icon button if the functionality is understandable with just an icon.
                br
                br
                h5 Loading animation (Button)
                hr
                br
                p.
                    There is a loading animation for buttons.
                    When the button is in loading state, only the loading animation should show.
                    You can choose your spinner.
                    It's best not to put spinner inside icon button.
                br
                br
                sui-button(loading)
                sui-button(type="nude" loading)
        br
        br
        sui-card(content-center)
            template(#content)
                h5 What if it's on mobile?
                p.
                    ".button_footer" will take care of it.
                    Try resizing the browser and see what happens.
                br
                p.
                    When in mobile screen,
                    the .button_footer will stack your buttons vertically in reverse order,
                    Will add underline in nude button.
            template(#buttonFooter)
                sui-button(type="nude") STEAL
                sui-button BUY
            template(#footer) This is a footer
        br
        br
        sui-card(content-center)
            template(#title)
                h6 INPUTS
            template(#content)
                sui-input(placeholder="Here's an Input form")
                br
                br
                sui-input(placeholder="Don't worry label is transparent" label="Input with label")
                br
                br
                sui-input(placeholder="Input with button" label="Input with button" :button="[{position: 'right', icon: 'send'}]" :right-click="log('Hello')")
                br
                br
                sui-input(
                    label="Number"
                    type="number"
                    :value="numberInputValue"
                    :button="[{position: 'right', text: '+', action: () => { increase() }}, {position: 'left', text: '−', action: () => { decrease() }}]"
                    )
                br
                br
                sui-input(placeholder="Required form" label="Required" required)
                br
                br
                sui-input(suffix=".com" prefix="https://www." placeholder="Enter your domain name" label="Input with prefix and suffix")
                br
                br
                sui-input(suffix="@email.com" placeholder="Email with suffix" label="Input with a suffix and button" :button="[{position: 'right', icon: 'send', action: () => {}}]" :right-click="log('Hello')")
                br
                br
                sui-input(
                    prefix="$"
                    label="Currency with prefix"
                    type="number"
                    :value="numberInputValue"
                    :button="[{position: 'right', text: '+', action: () => { increase() }}, {position: 'left', text: '−', action: () => { decrease() }}]"
                )
                br
                br
                sui-input(error placeholder="You got an Error" message="You Got Error" label="Error")
                br
                br
                sui-input(placeholder="Input with icon" :button="[{position: 'left', icon: 'email'}]")
                br
                br
                sui-input(error placeholder="Icon & Label & Error & *" label="E-Mail" required :button="[{position: 'left', icon: 'email'}]" message="It's a combo")
                br
                br
                sui-select(label="Selector" placeholder="Input as selector" :option="[{value: 'Singapore'}, {value:'Korea'}, {value:'Russia'}]")
                br
                br
                sui-select(:button="[{position: 'left', icon: 'public'}]" label="Selector" placeholder="Selector & Icon" :option="[{value: 'Singapore'}, {value:'Korea'}, {value:'Russia'}]")
                br
                br
                sui-select(custom :button="[{position: 'left', icon: 'public'}]" label="Custom Selector" placeholder="Input as custom selector" :option="suiInputSelection1" :menu-style="{padding: '.5rem .75rem', fontSize: '.8em'}")
                br
                br
                sui-select(fullscreen :menu-style="{padding: '.5rem .75rem', fontSize: '.8em'}" :option="suiInputSelection2" label="Fullscreen Selector" :button="[{position: 'left', icon: 'public'}]")
                br
                br
                sui-input(type="autocomplete" placeholder="Suggestion box" :output="(v) => { getSearch(v); }" :menu-style="{padding: '.5rem .75rem', fontSize: '.8em'}"  :option="suiInputAutocomplete1")
                sui-button SEARCH
                br
                br
                sui-input(style="width: 23em" label="Search" type="autocomplete" placeholder="Search Me" :button="[{position: 'right', icon: 'search'}]"  @rightClick="" :output="(v) => { getSearch(v); }" :menu-style="{padding: '.5rem .75rem', fontSize: '.8em'}"  :option="suiInputAutocomplete1")
                br
                br
                sui-button(onclick="sui_popup.handler({id: 'searchmobile',pop:'top', closeOnBackgroundClick: false, overlayColor: 'var(--content)'})") SEARCH POP
                sui-input#searchmobile.transparent(:menu-style="{padding: '.5rem .75rem', fontSize: '.8em'}" style="box-shadow: 0 2px var(--content-text_transparent);width: 100%;overflow:visible;display:none;" type="autocomplete" placeholder="Search Me" :button="[{position: 'right', icon: 'search', action: () => {}}]" @rightClick="sui_popup.handler('searchmobile')" :output="(v) => { getSearch(v); }" :option="suiInputAutocomplete1")
                br
                br
                sui-input(type="autocomplete" error message="Full Combo" label="Full Combo" required :button="[{position: 'left', icon: 'search'}, {position: 'right', icon: 'search'}]" @rightClick="" :output="(v) => { getSearch(v); }" :menu-style="{padding: '.5rem .75rem', fontSize: '.8em'}"  :option="suiInputAutocomplete1")
        br
        br
        sui-card(style="display: inline-block;")
            template(#content)
                h4.textshadow Form Example 1
                hr
                br
                br
                div(style="text-align:center")
                    div(style="display:inline-block;text-align: left;")
                        p.
                            Type of form that takes various information.
                            ex) Shipping address, personal information.
                            Use tab space for inline label.
                        br
                        br
                        | E-Mail
                        span(style="color:var(--alert)")  *
                        | &#9;&#9;&#9;
                        sui-input(placeholder="username@email.com")
                        br
                        | Password
                        span(style="color:var(--alert)")  *
                        pre
                        sui-input(placeholder="At least 8 Char..." type="password")
                        br
                        | Name&#9;&#9;&#9;&#9;
                        sui-input(placeholder="At least 8 Char..." type="password")
                        br
                        | Serial&#9;&#9;&#9;&#9;
                        div(style="display: inline-block;")
                            sui-input(style="width: 4rem" placeholder="000" type="password")
                            | &#9;
                            sui-input(style="width:13rem" placeholder="000000" type="password")
            template(#buttonFooter)
                sui-button(type="nude") Login
                sui-button Sign-Up
            template(#footer)
                a(href='https://google.com' style="opacity:0.5;color: var(--content-text)") I forgot my password
        br
        br
        sui-card(style="display: inline-block;")
            template(#content)
                h4.textshadow Form Example 2
                hr
                br
                br
                div(style="text-align:center")
                    div(style="display:inline-block;text-align: left;")
                        | Form that requires simple information.
                        p ex) Login
                        br
                        br
                        sui-input(placeholder="username@email.com" label="E-Mail" required :button="[{position: 'left', icon: 'email'}]")
                        br
                        br
                        sui-input(placeholder="Least 8 char..." label="Password" required :button="[{position: 'left', icon: 'security'}]")
                        br
                        br
                        sui-input(label="Name" :button="[{position: 'left', icon: 'person'}]")
                        br
                        br
                        div(style="display: inline-block;")
                            sui-input(style="width: 4rem" placeholder="000" type="password" label="Code")
                            pre
                            sui-input(style="width:13rem" placeholder="000000" type="password" label="Serial")
            template(#buttonFooter)
                sui-button(type="nude") Login
                sui-button Sign-Up
            template(#footer)
                a(href='https://google.com' style="opacity:0.5;color: var(--content-text)") I forgot my password
        br
        br
        sui-card(style="display: inline-block;")
            template(#title)
                h6 Form Example 3
            template(#content)
                div(style="text-align:center")
                    div(style="display:inline-block;text-align: left;")
                        p.
                            Form that is part of user settings.
                            The title is present on the card.
                        br
                        br
                        | E-Mail
                        span(style="color:var(--alert)")  *
                        | &#9;&#9;&#9;
                        sui-input(placeholder="username@email.com")
                        br
                        | Password
                        span(style="color:var(--alert)")  *
                        | &#9;
                        sui-input(placeholder="At least 8 Char..." type="password")
                        br
                        | Name&nbsp;
                        sui-tooltip What's your name?
                        | &#9;&#9;
                        sui-input(placeholder="At least 8 Char..." type="password")
                        br
                        | Serial&#9;&#9;&#9;&#9;
                        div(style="display: inline-block;")
                            sui-input(style="width: 4rem" placeholder="000" type="password")
                            | &#9;
                            sui-input(style="width:13rem" placeholder="000000" type="password")
            template(#buttonFooter)
                sui-button(type="nude") Login
                sui-button Sign-Up
            template(#footer)
                a(href='https://google.com' style="opacity:0.5;color: var(--content-text)") I forgot my password
        br
        br
        sui-card(content-center)
            template(#image)
                img(style='width: 20rem' src="@/assets/skate.jpg")
            template(#content)
                p Form example 4
                br
                br
                sui-input(style="width: 21rem;" placeholder="username@email.com" label="E-Mail" required :button="[{position: 'left', icon: 'email'}]")
                br
                br
                sui-input(style="width: 21rem;" placeholder="Least 8 char..." label="Password" required :button="[{position: 'left', icon: 'security'}]")
                br
                br
                sui-input(style="width: 21rem;" label="Name" :button="[{position: 'left', icon: 'person'}]")
                br
                br
                div(style="display: inline-block;")
                    sui-input(style="width: 6rem" placeholder="000" type="password" label="Code")
                    pre
                    sui-input(style="width:14rem" placeholder="000000" type="password" label="Serial")
            template(#buttonFooter)
                sui-button(type="nude") Login
                sui-button Sign-Up
            template(#footer)
                a(href='https://google.com' style="opacity:0.5;color: var(--content-text)") I forgot my password
        br
        br
        sui-card
            template(#title)
                h6 Textarea
            template(#content)
                sui-textarea(label="텍스트에리아" placeholder="이름" :button="[{position: 'left', img: '@/assets/myface.jpg'}, {position: 'right', icon: 'send'}]")
                br
                br
                sui-textarea(label="사진 없는 텍스트에리아" placeholder="안녕히가세요" :button="[{position: 'right', icon: 'send'}]")
        br
        br
        sui-card
            template(#title)
                h6 Tooltip
            template(#content)
                p.
                    Here is the tooltip.
                    You can set direction of the text by adding .bottom | .left class.
                    You can determine the element position in the viewport and set the position
                br
                br
                div(style="display: flex;justify-content: space-between;")
                    sui-tooltip(direction="bottom-left").
                        This is a toolbox.
                        Toolbox has break points of line-breaks on tablet viewport. Try to make the description simple. Let's resize the window and see where it breaks.
                    sui-tooltip(direction="bottom").
                        Set width and left by javascript on mobile to make the text box full width.
                    sui-tooltip(direction="left").
                        This is a toolbox
                        This is positioned .left
                    sui-tooltip(direction="bottom").
                        This is a toolbox
                        This is positioned .left.bottom
        br
        br
        sui-card
            template(#title)
                h6 Steps
            template(#content)
                h5.textshadow Steps
                br
                h6 Lined style:
                br
                sui-steps(type="line" :steps="['Skate', 'Learn to code', { text:'Become a computer nerd', icon: 'accessibility_new' }, 'Get a dog']" :completed=2)
                br
                br
                h6 Ringed style (Best on mobile):
                br
                sui-steps(type="ring" :steps="['Skate', 'Learn to code', { text:'Become a computer nerd', icon: 'accessibility_new' }, 'Get a dog']" :completed=3)
                br
                br
                p.
                    Use css var --ring-count to set the number of steps.
                    Use .complete, .current classes to set the step status.
                    Use css var --ring-status to set the current steps on ring mode.
        br
        br
        sui-card
            template(#title)
                h6 Accordion
            template(#content)
                sui-accordion
                    .title Click Me
                    hr
                    .content(onclick="(function(event){event.stopPropagation()})(event)").
                        &nbsp;
                        Look, I was gonna go easy on you
                        Not to hurt your feelings
                        But I'm only going to get this one chance
                        Something's wrong, I can feel it
                        (Six minutes)
                        Just a feeling I've got
                        Like something's about to happen
                        But I don't know what
                        If that means what I think it means
                        We're in trouble, big trouble
                        And if he is as bananas as you say
                        I'm not taking any chances
                        You are just what the doc ordered
                        I'm beginnin' to feel like a Rap God, Rap God
                        All my people from the front to the back nod, back nod
                        Now, who thinks their arms are long enough
                        To slap box, slap box?
                        They said I rap like a robot, so call me Rap-bot
        br
        br
        sui-card(content-center :style="{width: '600px'}")
            template(#title)
                h6 Image
            template(#content)
                sui-image(
                    :src="{source: '/img/dia.png', crop:{x:50,y:50}}"
                    light-box
                    :ratio='[16,9]'
                    parallax
                    null-image="/img/bunnykit_small.gif"
                    :computed-style="(s)=>{/*console.log(s.width);*/}"
                    :on-click="(e)=>{/*console.log(e)*/;}"
                    :on-load="(e)=>{/*console.log(e)*/}"
                    :on-error="(e)=>{/*console.log(e)*/}")
                br
                sui-image(
                    src="/img/dia.png"
                    light-box
                    :ratio='[16,9]'
                    parallax
                    null-image="/img/bunnykit_small.gif"
                    :computed-style="(s)=>{/*console.log(s.width);*/}"
                    :on-click="(e)=>{/*console.log(e);*/}"
                    :on-load="(e)=>{/*console.log(e)*/}"
                    :on-zoom="(e)=>{/*console.log(e);showZoom = !!e*/}"
                    zoom-canvas='zoom'
                    :on-error="(e)=>{/*console.log(e)*/}")
                #zoom(v-show='showZoom' style="width:300px;height:300px;background-color:blue")
                br
                sui-image(
                    :style='{minHeight:"100px"}'
                    src="/img/ia.png"
                    light-box
                    broken-msg="Sorry, The image link is broken :("
                    :computed-style="(s)=>{/*console.log(s.width);*/}"
                    :on-click="(e)=>{/*console.log(e);*/}"
                    :on-load="(e)=>{/*console.log(e)*/}"
                    :on-zoom="(e)=>{/*console.log(e);showZoom = !!e*/}"
                    zoom-canvas='zoom'
                    :on-error="(e)=>{/*console.log(e)*/}")
                sui-image(
                    src="/img/ia.png"
                    light-box
                    :ratio='[16,9]'
                    parallax
                    null-image="/img/bunnykit_small.gif"
                    broken-msg='/img/sealpixel.jpeg'
                    :computed-style="(s)=>{/*console.log(s.width);*/}"
                    :on-click="(e)=>{/*console.log(e);*/}"
                    :on-load="(e)=>{/*console.log(e)*/}"
                    :on-zoom="(e)=>{/*console.log(e);showZoom = !!e*/}"
                    zoom-canvas='zoom'
                    :on-error="(e)=>{/*console.log(e)*/}")
        br
        br
        sui-card(content-center)
            template(#title)
                h6 POP UP
            template(#content) Push A Button
            template(#buttonFooter)
                sui-button(onclick="sui_popup.handler('myModal')") Default
                br
                br
                sui-button(onclick="sui_popup.handler({id:'myModal',pop:'top'})") Top
                br
                br
                sui-button(onclick="sui_popup.handler({id:'myModal',pop:'left'})") Left
                br
                br
                sui-button(onclick="sui_popup.handler({id:'myModal',pop:'bottom'})") Bottom
                br
                br
                sui-button(onclick="sui_popup.handler({id:'myModal',pop:'right'})") Right
                br
                br
                sui-button(onclick="sui_popup.handler('somerandomstuff')") SPAM
        sui-card#myModal(content-center style="display:none;")
            template(#title)
                h6 POP UP
            template(#image)
                img(style='width: 20rem' src="@/assets/skate.jpg")
            template(#content)
                h3 Yes Master?
                br
                p.
                    Nothing special here,
                    Modal is basically same old card :)
                    Just give it an ID and hide it somewhere.
                    The JS function will take care of it.
            template(#buttonFooter)
                sui-button(onclick="sui_popup.handler('myModal')") OK
        #somerandomstuff(style="display:none;background-color:red;color:white;padding: 2em;text-align:right;")
            | I'm A SPAMMER
            pre
            sui-button(onclick="sui_popup.handler('somerandomstuff')") OK
        br
        br
        sui-card
            template(#title)
                h6 Toggles
            template(#content)
                sui-option(type="toggle" label="Toggle" value="Checkbox1" name="checkbox1")
                br
                sui-option(type="toggle" label="Toggle" value="Checkbox2" name="checkbox2" disabled)
                br
                sui-option(type="radio" name="radio" value="1" label="Radio 1" checked)
                br
                sui-option(type="radio" label="Radio 2" value="2" name="radio" disabled)
                br
                sui-option(type="radio" label="Radio 3" value="3" name="radio")
                br
                br
                sui-option(type="toggle" label="Big Toggle" value="checkbox3" name="checkbox3" checked large)
                br
                sui-option(type="toggle" label="Big Toggle" value="checkbox4" name="checkbox4" large disabled)
                br
                sui-option(type="radio" name="bigradio" value="1" label="Radio 1" checked large)
                br
                sui-option(type="radio" label="Radio 2" value="2" name="bigradio" large disabled)
        br
        br
        sui-card(close-button)
            template(#title)
                h6 Image Editor
            template(#image)
                img(src="@/assets/myface.jpg")
            template(#content)
            template(#buttonFooter)
                sui-button(type="nude") Change Image
                sui-button UPLOAD
        br
        br
        br
        hr
        br
        br
        sui-card
            template(#content)
                h4 Guide for the shopping cart design
                hr
                br
                p.
                    Each shopping cart items will be displayed in the cards.
                    Notice some manual tweaks in the card design.
                    Other than cart items, things will be placed on background (messages, purchase button... etc).
                    by using a card for shop items, we can distinguish item type, or alert user on some situations.
                    From some research I have found out making shopping cart a modal seemed a terrible idea.
                    It should always be separate page.
        br
        br
        sui-card(close-button)
            template(#title)
                | Expected Delivery: 1985 / Aug / 20
            template(#content)
                .cart
                    img(src="@/assets/skate.jpg")
                    .detail.
                        TCL 65-inch 5-Series 4K UHD Dolby Vision HDR QLED Roku Smart TV - 65S535, 2021 Model
                    br
                    small(style="color:var(--content-focus);font-weight:bold") 53 left
                    br
                    .price $ 1,000,000
                    br
                    br
                    .quantity
                        sui-input(style="width:10rem" label="Quantity" type="number" value="1" :button="[{position: 'right', text: '+', action: () => {}}, {position: 'left', text: '−', action: () => {}}]")
        br
        br
        sui-card(close-button)
            template(#title)
                | Digital Coupon
            template(#content)
                .cart
                    img(src="@/assets/skate.jpg")
                    .detail.
                        TCL 65-inch 5-Series 4K UHD Dolby Vision HDR QLED Roku Smart TV - 65S535, 2021 Model
                    br
                    small(style="color:var(--alert);font-weight:bold") Hurry up! Last one left!
                    br
                    .price $ 1,000,000
                    br
                    br
                    .quantity
                        sui-input(style="width:10rem" label="Quantity" type="number" value="1" :button="[{position: 'right', text: '+', action: () => {}}, {position: 'left', text: '−', action: () => {}}]")
        br
        br
        sui-card(title-background="yellow" close-button)
            template(#title)
                | NFT - Digital assets (click for more info)
            template(#content)
                .cart
                    img(src="@/assets/skate.jpg")
                    .detail.
                        TCL 65-inch 5-Series 4K UHD Dolby Vision HDR QLED Roku Smart TV - 65S535, 2021 Model
                    br
                    br
                    .price $ 1,000,000
                    //br
                    //br
                    //.quantity
                        sui-input(style="width:10rem" label="Quantity" type="number" value="1" :button="[{position: 'right', text: '+', action: () => {}}, {position: 'left', text: '−', action: () => {}}]")
        br
        br
        sui-card(disabled title-background="var(--alert)" title-color="white")
            template(#title)
                | This item no longer exists
                .close
            template(#content)
                .cart
                    img(src="@/assets/skate.jpg")
                    .detail.
                        TCL 65-inch 5-Series 4K UHD Dolby Vision HDR QLED Roku Smart TV - 65S535, 2021 Model
                    br
                    br
                    .price $ 1,000,000
                    br
                    br
                    .quantity
                        sui-input(disabled style="width:10rem" label="Quantity" type="number" value="1" :button="[{position: 'right', text: '+', action: () => {}}, {position: 'left', text: '−', action: () => {}}]")
        br
        br
        sui-card(title-background="var(--background-focus_transparent" color="var(--background-text")
            template(#title)
                div(style="line-height: 2.8;") Hey you have a coupon!
        br
        br
        div(style="text-align:left;line-height:2;")
            | ITEMS:
            pre
            pre
            pre
            | 3
            br
            | SHIPPING:
            pre
            | $40.00
            br
            hr
            h4(style="display:inline-block;") TOTAL:
            pre
            h4(style="display:inline-block;") $100,000
        br
        br
        sui-button CHECKOUT
        br
        br
        br
        br
        .sui-list(style="--textclamp: 3;")
            .article
                .content
                    img(src="@/assets/nike1.jpg")
            .article(style="--textclamp: 2")
                .content
                    img.square(src="@/assets/nike2.jpg")
                    .content-wrapper
                        .description
                            .title $599.99
                            .text TCL 65-inch 5-Series 4K UHD Dolby Vision HDR QLED Roku Smart TV - 65S535, 2021 Model
                        button
                            i.material-icons shopping_cart
            .article(style="--textclamp: 2")
                .content
                    img.square(src="@/assets/nike1.jpg")
                    .content-wrapper
                        .description
                            .title $199.99
                            .text Nike shoes, 2021 Model
                        button
                            i.material-icons shopping_cart
            .article(style="--textclamp: 2")
                .content
                    img.square(src="@/assets/newyork.jpg")
                    .content-wrapper
                        .description
                            .title $399.99
                            .text Full New york zombie tour
                        button
                            i.material-icons shopping_cart
                .overlay HI
            .article(style="--textclamp: 2")
                .content
                    img.square(src="@/assets/bunnykit.jpg")
                    .content-wrapper
                        .description
                            .title $99.99
                            .text Peach blouse
                        button
                            i.material-icons shopping_cart
            .article
                .content
                    img.block(src="@/assets/newyork.jpg")
                    .title New York
                    .text.
                        Grew up in a town that was famous as a place of movie scenes
                        Noise is always loud, there are sirens all around and the streets are mean
                        If I can make it here, I can make it anywhere that's what they say
                        Seeing my face in lights or my name in marquees found down on Broadway
            .article
                .content
                    img.block(src="@/assets/myface.jpg")
                    .title Crime escapes prison
                    .text.
                        Please call the police if you see this person.
                        Highly advised to not engage.
            .article
                .content
                    img.block(src="@/assets/brunomars.png")
                    .title Bruno Mars is really short
                    .text.
                        Grew up in a town that was famous as a place of movie scenes
                        Noise is always loud, there are sirens all around and the streets are mean
                        If I can make it here, I can make it anywhere that's what they say
                        Seeing my face in lights or my name in marquees found down on Broadway
            .article
                .content
                    img.block(src="@/assets/brunomars.png")
                    .title ...I mean really short
            .article
                .content
                    img.block(src="/img/dia.png")
                    .title DIA is called sing-ger in AU
                    .text.
                        AU is well known for it's mystic land of exotic nature.
                        Scientists predicts their reason of their exotic accents.
            .article
                .content
                    img.block(src="@/assets/howtall.jpeg")
                    .title WHO'S THE TALLEST?
                    .text.
                        Grew up in a town that was famous as a place of movie scenes
                        Noise is always loud, there are sirens all around and the streets are mean
                        If I can make it here, I can make it anywhere that's what they say
                        Seeing my face in lights or my name in marquees found down on Broadway
            .article
                .content
                    img.block(src="@/assets/howtall.jpeg")
                    .title WHO'S THE TALLEST?
                    .text.
                        Grew up in a town that was famous as a place of movie scenes
            .article
                .content
                    img(src="@/assets/skate.jpg")
            .article
                .content
                    img(src="/img/dia.png")
            .article
                .content
                    img(src="@/assets/brunomars.png")
</template>
<script>
import {ColorMangle} from 'colormangle';
import SuiButton from "../components/sui-button";

export default {
    name: "home",
    components: {SuiButton},
    data() {
        return {
            showZoom: false,
            slide: [{
                "text": "Welcome",
                "textAlign": ['left', 'top'],
                "uniqueId": "xe290IF52xy3",
                'src': 'https://d2068sxih1zpja.cloudfront.net/eyJidWNrZXQiOiJiaW5jc3RvcmFnZSIsImtleSI6InBsYXphL2E4MTVhZjc3LTA5NmUtNDU3Zi04NDc2LTk5NGZiYzhmNWRiOC9pbWFnZS8xMzI5MjdfMnliVHQ4SlMxNjEzNTcwNyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODAwLCJoZWlnaHQiOjgwMCwiZml0IjoiaW5zaWRlIn19fQ=='
            }, {"text": "Hello Dog", "textAlign": ['right', 'bottom'], "uniqueId": "xe290IF52xy3"}],
            colorScheme: new ColorMangle('#00807f').colorScheme(),
            suiInputSelection1: [
                {value: 'manual', text: 'Style your menu manually!'},
                {
                    value: 'menuclass',
                    text: 'class .menu provides faint line separator, pointer cursor and the hovering color.'
                },
                {value: 'mousedown', text: 'Attach mousedown event to each menu to change the input value.'}
            ],
            suiInputSelection2: [
                {value: 'style', text: 'Style your menu manually!'},
                {value: 'fullscreen', text: 'Full screen option is useful in mobile.'},
                {
                    value: 'class',
                    text: 'class .menu provides pointer cursor and the hovering color. Note in full screen option, line separator is not provided. (Because it looks better width hr)'
                },
                {value: 'mousedown', text: 'Attach mousedown event to each menu to change the input value.'},
                {value: 'Singapore'},
                {value: 'Russia'}
            ],
            suiDatabase: [
                'How old is the king of Japan?',
                'How old is the king of Singapore?',
                'How old is America?',
                'How big is Korea?',
                'How to eat Kimchi?'
            ],
            suiInputAutocomplete1 : [],
            numberInputValue: 1
        };
    },
    computed: {
        console: () => console
    },
    methods: {
        log(button) {
            console.log("Home log", button);
        },
        increase() {
            this.numberInputValue += 1;
        },
        decrease() {
            this.numberInputValue -= 1;
        },
        getSearch(text) {
            console.log("This is the text", text);
            text = text.toLowerCase();
            this.suiInputAutocomplete1 = this.suiDatabase.filter(word => {
                let regex = new RegExp(text + '(.)?', 'g');
                if (text) {
                    if (word.toLowerCase().match(regex)) {
                        return word;
                    }
                }
            });
        }
    }
};
</script>
<style lang="less">
@import '../assets/viewport.less';

div.sui-list {
    --grid: 1fr 1fr 1fr;
    @media @laptop {
        --grid: 1fr 1fr;
    }
    @media @phone {
        --grid: 1fr;
    }
    display: grid;
    grid-template-columns: var(--grid);
    gap: 8px;

    .article {
        position: relative;
        width: 100%;
        //box-shadow: 0 0 0 2px var(--content-text_screen);
        //box-shadow: 0 0 8px var(--background-text_screen);
        border-radius: 8px;
        overflow: hidden;
        background-color: var(--content);
        padding-top: 100%;

        &:hover {
            cursor: pointer;

            .overlay {
                display: flex;
            }
        }

        & > .overlay {
            position: absolute;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: var(--shade);
            color: white;
        }

        .content {
            position: absolute;
            display: flex;
            flex-direction: column;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;

            & > img.block {
                display: block;
                width: 100%;
                height: calc(100% - (calc((0.8em * 1.25) * 4) + 1.5rem));
                position: static;
            }

            & > img {
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                overflow: hidden;
                object-position: 50% 30%;
                object-fit: cover;
            }

            & > img.square {
                width: 60%;
                height: 60%;
                border-radius: 4px;
                position: static;
                top: unset;
                left: unset;
                object-position: center;
                margin: auto;
            }

            & > .content-wrapper {
                display: flex;

                .description {
                    max-width: 80%;
                    flex-grow: 1;
                }

                & button {
                    width: 20%;
                    min-width: 50px;
                    color: var(--content-focus);

                    &:hover {
                        color: var(--content-focus_faded);
                    }
                }
            }

            & .title:not(:empty) {
                margin: .5rem;
                text-align: left;
                flex-shrink: 0;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                font-weight: 500;
                color: var(--content-text_soft);
                text-shadow: 1px 1px var(--content-text_shadow);
                overflow: hidden;
                font-size: .8rem;
                line-height: 1.25;

                & + .text {
                    padding-top: 0;
                }
            }

            & .text:not(:empty) {
                &::after {
                    content: " " var(--readmore);
                    opacity: 0.5;
                }

                padding: .5em 0.5rem 0;
                text-align: left;
                flex-shrink: 0;
                display: -webkit-box;
                -webkit-line-clamp: var(--textclamp);
                margin-bottom: .5rem;
                -webkit-box-orient: vertical;
                overflow: hidden;
                font-size: 0.7rem;
                line-height: 1.25;
                height: calc(0.7rem * 1.25 * 2);

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}

div.sui-textarea {
    position: relative;

    &.left {
        & > .textarea {
            & > textarea,
            &::after {
                // make space for icon
                padding-left: calc(2.8rem + .75em);
            }
        }

        & > .left {
            // the icon
            position: absolute;
            width: 2.8rem;
            height: 2.8rem;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;

            &::after {
                // icon separator
                content: "";
                width: 2px;
                height: 1.4rem;
                background-color: var(--content-text_shadow);
                position: absolute;
                right: -1px;
            }
        }
    }

    &.focus {
        & fieldset {
            border-color: var(--content-focus);
        }

        & > .left {
            color: var(--content-focus);
        }

        & > label {
            &::after {
                background-color: var(--content-focus);
            }

            &::before {
                background-color: var(--content-focus);
            }

            color: var(--content-focus);
        }
    }

    &.right {
        & > .textarea {
            & > textarea,
            &::after {
                padding-right: 3.3em;
            }
        }

        & > .right {
            display: inline-flex;
            width: 2.8em;
            height: 2.8em;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 0;
            bottom: 1px;
            cursor: pointer;
            z-index: 1;

            &::before {
                // icon separator
                content: "";
                width: 2px;
                height: 1.4em;
                background-color: var(--content-text_shadow);
                position: absolute;
                left: -1px;
            }

            &:hover {
                color: var(--content-focus);
                background-color: var(--content-focus_screen);
            }
        }
    }

    label {
        width: calc(100% - 4px);
        left: 12px;
        text-align: left;
        box-sizing: border-box;
        line-height: 1em;
        overflow: hidden;
        position: absolute;
        font-size: 0.8rem;
        font-weight: 500;
        white-space: nowrap;
        color: var(--content-text_soft);
        text-shadow: 1px 1px var(--content-text_shadow);

        & ~ fieldset {
            top: -12px;
        }

        &:not(:empty) {
            margin-top: calc(-1em + 3px);
            padding-left: 0.5em;
        }

        &:empty {
            overflow: inherit;

            &::after {
                bottom: -2px;
            }

            &::before {
                background-color: transparent;
                bottom: -2px;
            }
        }
    }

    fieldset {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        text-align: left;
        border: 2px solid var(--content-text_transparent);

        legend {
            position: relative;
            top: -0.4rem;
            font-size: 0.8rem;
            font-weight: 500;
            padding: 0 4px;
            word-break: keep-all;
            visibility: hidden;
        }
    }

    & > .textarea {
        position: relative;
        vertical-align: middle;
        display: inline-grid;
        min-height: 2.8em;
        width: 100%;
        text-shadow: 1px 1px var(--content-text_shadow);

        &::after {
            content: attr(data-replica) " ";
            white-space: pre-wrap;
            visibility: hidden;
        }

        & > textarea {
            resize: none;
            overflow: hidden;
            min-height: 1em;
            z-index: 1;
            border: none;

            &::placeholder {
                color: var(--content-placeholder);
            }

            &:read-only {
                text-overflow: ellipsis;
            }
        }

        & > textarea,
        &::after {
            /* Identical styling required!! */
            box-sizing: border-box;
            vertical-align: middle;
            background-color: transparent;
            color: var(--content-text);
            line-height: 1.5em;

            padding: calc(0.515em + 1px) 0.75em;
            font-size: 1rem;
            outline: none;
            border-color: var(--content-text_transparent);
            box-shadow: inset 0 0 0 4px var(--content-focus_screen);
            border-top: none;
            /* Place on top of each other */
            grid-area: 1 e("/") 1 e("/") 2 e("/") 2;
        }
    }
}

/*
div.sui-steps {
    display: flex;
    justify-content: space-between;

    &.line {
        overflow-x: scroll;

        svg {
            display: none;
        }

        .step {
            display: inline-flex;
        }
    }

    div.step {
        display: none;
        width: 100%;
        cursor: default;
        padding-right: 1em;
        padding-top: .25em;
        border-top: 3px solid var(--content-placeholder);
        color: var(--content-placeholder);
        flex-grow: 1;
        margin-right: 3px;
        font-weight: 500;

        & > .left {
            padding-right: .5em;

            i {
                vertical-align: middle;
            }
        }

        &.complete {
            border-top: 3px solid var(--content-focus_soft);
            color: var(--content-focus_soft);
        }

        &.current {
            border-top: 3px solid var(--content-focus);
            color: var(--content-focus);
            text-shadow: 1px 1px var(--content-text_transparent);
        }
    }

    &.ring {
        counter-reset: --ring-status var(--ring-status);
        position: relative;

        &::before {
            content: counter(--ring-status);
            position: absolute;
            display: flex;
            height: calc(3em + .5em);
            width: calc(3em + .5em);
            text-align: center;
            justify-content: center;
            align-items: center;
            font-weight: 500;
            text-shadow: 1px 1px var(--content-text_transparent);
        }

        padding-bottom: 0;

        & > svg {
            flex-shrink: 0;

            --PI: 3.14159265358979;
            --circum: calc(3 * var(--PI));

            margin-right: 1em;
            height: calc(3em + .5em);
            width: calc(3em + .5em);
            --offset: calc(var(--circum) - ((100 / var(--ring-count)) * var(--ring-status)) / 100 * var(--circum));

            circle {
                stroke-width: .5em;
                fill: transparent;
            }

            &:first-child {
                display: inline-block;
                position: absolute;

                circle {
                    stroke: var(--content-text_shadow);
                }

                & + svg {
                    display: block;
                    transform: rotate(-90deg);
                    transform-origin: 50% 50%;

                    circle {
                        stroke: var(--content-focus);
                        stroke-dasharray: calc(var(--circum) * 1em);
                        stroke-dashoffset: calc(var(--offset) * 1em);
                        transition: stroke-dashoffset .25s;
                    }
                }
            }
        }

        div.step.current {
            width: unset;
            display: inline-flex;
        }
    }
}
*/
</style>
