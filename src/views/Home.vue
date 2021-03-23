<template lang="pug">
._styling_example
    .sui_card
        .image
            img(style='width: 20rem' src="@/assets/skate.jpg")
        .content
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
            .sui_accordion(onclick="sui_accordion.handler(event)")
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
            .sui_accordion(onclick="sui_accordion.handler(event)")
                .title Color Scheme
                hr
                .content(style="padding: 0 .5em;" onclick="(function(event){event.stopPropagation()})(event)")
                    br
                    div(v-for="(c, k) in colorScheme" :style="{display:'flex',alignItems:'center'}")
                        p {{k}} : {{c}}&nbsp;
                        div(:style="{width:'1em',height:'1em',backgroundColor:c,border:'1px solid'}")
        .button_footer
        .footer.
            I am your footer! The font size here is 0.8rem unless tag is used.
    .sui_card EMPTY
    .sui_card
        .title TITLE
    .sui_card
        .content CONTENT
    .sui_card
        .button_footer BUTTON
    .sui_card
        .footer FOOTER
    .sui_card
        .title TITLE
        .content CONTENT
        .footer FOOTER
    .sui_card
        .title TITLE
        .image(style="background-color:var(--content-text);color:var(--content);text-align:center;") IMAGE
        .content CONTENT
        .button_footer BUTTON
        .footer FOOTER
    .sui_card
        .image(style="background-color:var(--content-text);color:var(--content);text-align:center;") IMAGE
        .content CONTENT
        .button_footer BUTTON
        .footer FOOTER
    .sui_card.center
        .title TITLE (.center)
        .image(style="background-color:var(--content-text);color:var(--content);text-align:center;") IMAGE
        .content CONTENT (.center)
        .button_footer BUTTON (.center)
        .footer FOOTER (.center)
    .sui_card
        .title
            h6 TITLE
        .image
        .content.
            Notice the card's title above.

            ".title" div handles the cards title.
            Title can contain plain text or any element (h1, h2, h3... p, div and so on).

            Paddings are handled with CSS.
            The line-height of the title is 2em by default.

            If the ".image" div has an image, (like the one above with the turtle)
            it is not advised to use it with the title. (or vice versa)
        .button_footer
        .footer
    .sui_card
        .title(style="background-color:var(--content-focus);color:var(--content-focus-text)")
            div
                img(style='width:2em;height:2em;display:inline;vertical-align:middle;margin:.5em .5em .5em 0;border-radius:2em;border:solid 1px;' src="https://d2068sxih1zpja.cloudfront.net/eyJidWNrZXQiOiJiaW5jc3RvcmFnZSIsImtleSI6InBsYXphL2U5Yjg5NGM1LWQ1NDgtNGZkYi04YTJlLTdkNTllOTIyNzMyMC9pbWFnZS8yODg4NjcwX2tEVGFDRmUyMDcwNjc2NTQiLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjQ4MCwiaGVpZ2h0Ijo0ODAsImZpdCI6Im91dHNpZGUifX19")
                p(style="vertical-align:middle;display:inline;") The Turtle Has Escaped!
        .image
        .content.
            I changed up some styles in the title.
            We can highlight the title to alert users, or make use for something else.

            In this example, you may want to remove the default top padding of the title.
            simply add "margin-top: -1em" on the direct child div in the title div.
            (have a look inside this .vue file)
        .button_footer
        .footer.
            I am your footer... don't ignore me...
    .sui_card
        .title
            h6 CLASS ".center"
        .image
        .content.center
            h5 If you ain't got much to write,
            p Try ".center" class on content. It will look nicer.
        .button_footer
        .footer Footer alignment follows the card alignment
    .sui_card
        .title
        .image
        .content.
            In order for card css to work properly,
            all the child element(.title, .image, .content, .button_footer, .footer) should be present
            even if the element is empty.
        .button_footer
        .footer(style="opacity:0.5") It's best to use 50% opacity on footer unless it's an alert message.
    .sui_card
        .title
            h6 Button
        .image
        .content.center
            h4 Look! A Button!
            br
            p We will use the ".button_footer" div for card buttons.
        .button_footer.hideonphone
            button.sui_button HELLO
        .button_footer.sticky.viewonphone
            button.sui_button HELLO
        .footer
    .sui_card
        .title
        .image
        .content
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
        .button_footer
            button.sui_button.nude CANCEL
            button.sui_button COWABUNGA
        .footer(style="opacity:0.5") I'm your footer.
    .sui_card
        .title
        .image
        .content
            h5 But... I need more than 2 buttons!
            br
            p.
                It may be best practice not to lay down a lot of buttons in the card,
                still there might be some situation we might need more than 2 buttons.

                In that case, simply use footer text as a link or a button.
        .button_footer
            button.sui_button.nude STEAL
            button.sui_button BUY
        .footer
            a(style='color: var(--content-text);opacity:50%' href="https://www.google.com/search?q=dog&rlz=1C5CHFA_enKR901KR901&oq=dog&aqs=chrome..69i57j46i275j0l3j46j0l4.822j0j4&sourceid=chrome&ie=UTF-8") I lost my dog
    .sui_card
        .title
            h6 BUTTON DESIGNS
        .image
        .content
            h6 There are only 3 types of buttons:
            br
            br
            button.sui_button filled
            button.sui_button.nude nude
            button.sui_button.icon
                i.material-icons create
            br
            br
            br
            p.
                button.sui_button - Filled
                button.sui_button.nude - Nude
                button.sui_button.icon - Icon

                Filled is a default.
                Nude style is applied if you add ".nude" class to button.sui_button element.
                Icon style is applied if you add ".icon" class to button.sui_button element.

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
            button.sui_button
                ._loader.button
            button.sui_button.nude
                ._loader
        .button_footer
        .footer
    .sui_card
        .title
        .image
        .content.center
            h5 What if it's on mobile?
            p.
                ".button_footer" will take care of it.
                Try resizing the browser and see what happens.
            br
            p.
                When in mobile screen,
                the .button_footer will stack your buttons vertically in reverse order,
                Will add underline in nude button.
        .button_footer
            button.sui_button.nude STEAL
            button.sui_button BUY
        .footer(style="opacity:0.5") This is a footer
    .sui_card
        .title
            h6 INPUTS
        .image
        .content.center
            .sui_input
                input(placeholder="Here's an Input form")
                label
            br
            br
            .sui_input
                input(placeholder="Don't worry label is transparent")
                label.
                    &nbsp;
                    Input with label
                    &nbsp;
            br
            br
            .sui_input.button
                input(placeholder="Input with button")
                label.
                    &nbsp;
                    Input with button
                    &nbsp;
                .button
                    i.material-icons send
            br
            br
            .sui_input.button.icon
                input(type="number" value="1" style="text-align:center;")
                label.
                    &nbsp;
                    Number
                    &nbsp;
                .icon.hover(style="font-size: 1.8rem") -
                .button(style="font-size: 1.8rem") +
            br
            br
            .sui_input
                input(placeholder="Required form")
                label
                    | &nbsp;
                    | Required&nbsp;
                    span(style="color:var(--alert)") *
                    | &nbsp;
            br
            br
            .sui_input.error
                input(placeholder="You got an Error")
                label.
                    &nbsp;
                    Error
                    &nbsp;
                .message You Got Error
            br
            br
            .sui_input.icon
                input(placeholder="Input with icon")
                label
                .icon
                    i.material-icons email
            br
            br
            .sui_input.icon.error
                input(placeholder="Icon & Label & Error & *")
                label
                    | &nbsp;
                    | E-Mail&nbsp;
                    span(style="color:var(--alert)") *
                    | &nbsp;
                .icon
                    i.material-icons email
                .message It's a combo
            br
            br
            .sui_input.select
                select
                    option(value="China") Input as selector
                    option(value="Singapore") Singapore
                    option(value="Korea") Korea
                    option(value="Russia") Russia
                label.
                    &nbsp;
                    Selector
                    &nbsp;
                .downarrow
            br
            br
            .sui_input.select.icon
                select
                    option(value="China") Selector & Icon
                    option(value="Singapore") Singapore
                    option(value="Korea") Korea
                    option(value="Russia") Russia
                label.
                    &nbsp;
                    Selector
                    &nbsp;
                .icon
                    i.material-icons public
                .downarrow
            br
            br
            .sui_input.select.icon
                input(id="dropdowncustom" value="Input as custom selector" readonly)
                label(for="dropdowncustom")
                    | &nbsp;
                    | Custom Selector
                    | &nbsp;
                .icon
                    i.material-icons public
                .option
                    .menu(style="padding: .5rem .75rem; font-size:.8em;").
                        Style your menu manually!
                    .menu(style="padding: .5rem .75rem; font-size:.8em;").
                        class .menu provides faint line separator,
                        pointer cursor and the hovering color.
                    .menu(style="padding: .5rem .75rem; font-size:.8em;").
                        Attach mousedown event to each menu to change the input value.
                    .menu This is how it looks without manual styling.
                    div This is what happens if you ignore to use the .menu class
                .downarrow
            br
            br
            .sui_input.select.icon
                input(id="dropdownfullscreen" value="Fullscreen custom selector" readonly)
                label(for="dropdownfullscreen")
                    | &nbsp;
                    | Fullscreen Selector
                    | &nbsp;
                .icon
                    i.material-icons public
                .option-fullscreen
                    .menu(style="padding: .5rem .75rem; font-size:.8em;").
                        Style your menu manually!
                        Full screen option is useful in mobile.
                    hr(style="margin: .25rem .5rem")
                    .menu(style="padding: .5rem .75rem; font-size:.8em;").
                        class .menu provides pointer cursor and the hovering color.
                        Note in full screen option, line separator is not provided.
                        (Because it looks better width hr)
                    hr(style="margin: .25rem .5rem")
                    .menu(style="padding: .5rem .75rem; font-size:.8em;").
                        Attach mousedown event to each menu to change the input value.
                    hr(style="margin: .25rem .5rem")
                    .menu(style="padding: .5rem .75rem; font-size:.8em;").
                        Singapore
                    hr(style="margin: .25rem .5rem")
                    .menu(style="padding: .5rem .75rem; font-size:.8em;").
                        Russia
                .downarrow
            br
            br
            .sui_input.select
                input(placeholder="Suggestion box" style="width: 15rem;")
                label
                .option
                    .menu(style="padding: .5rem .75rem; font-size:.8em;").
                        Same setting as custom option.
                        Just don't use "readonly" on the input attribute.
                    .menu(style="padding: .5rem .75rem; font-size:.8em;").
                        You would also want to listen to keyboard event to select through suggestion box.
            button.sui_button SEARCH
            br
            br
            .sui_input.select.button(style="width: 23em")
                input(placeholder="Search Me")
                label.
                    &nbsp;
                    Search
                    &nbsp;
                .button
                    i.material-icons search
                .option
                    .menu(style="padding: .5rem .75rem; font-size:.8em;").
                        Suggestion box
                    .menu(style="padding: .5rem .75rem; font-size:.8em;").
                        If the .option is empty, suggestion box will not show
            br
            br
            button.sui_button(onclick="sui_popup.handler('searchmobile','top', false, 'var(--content)')") SEARCH POP
            .sui_input.select.transparent.button#searchmobile(style="box-shadow: 0 2px var(--content-text_transparent);width: 100%;overflow:visible;display:none;")
                input(placeholder="Search Me")
                label
                .button(onclick="sui_popup.handler('searchmobile')")
                    i.material-icons search
                .option(style="max-height: calc(100vh - 2.8rem);")
                    .menu(style="padding: 1rem .5rem; font-size:.8em;").
                        Suggestion box
                    .menu(style="padding: 1rem .5rem; font-size:.8em;").
                        If the .option is empty, suggestion box will not show
            br
            br
            .sui_input.select.error.icon.button(style="width: 23em")
                input(placeholder="Full Combo")
                label
                    | &nbsp;
                    | Full Combo&nbsp;
                    span(style="color:var(--alert)") *
                    | &nbsp;
                .icon
                    i.material-icons search
                .button
                    i.material-icons search
                .option
                    .menu(style="padding: .5rem .75rem; font-size:.8em;").
                        Suggestion box
                    .menu(style="padding: .5rem .75rem; font-size:.8em;").
                        If the .option is empty, suggestion box will not show
                .message Full Combo
        .button_footer
        .footer
    .sui_card(style="display: inline-block;")
        .title
        .image
        .content
            h4.textshadow Form Example 1
            hr
            br
            br
            p.
                Type of form that takes various information.
                ex) Shipping address, personal information.
                Use tab space for inline label.
            br
            br
            | E-Mail&nbsp;
            span(style="color:var(--alert)") *
            | &#9;&#9;&#9;
            .sui_input
                input(placeholder="username@email.com")
                label
            br
            | Password&nbsp;
            span(style="color:var(--alert)") *
            pre
            .sui_input
                input(placeholder="At least 8 Char..." type="password")
                label
            br
            | Name&#9;&#9;&#9;&#9;
            .sui_input
                input(placeholder="At least 8 Char..." type="password")
                label
            br
            | Serial&#9;&#9;&#9;&#9;
            div(style="display: inline-block;")
                .sui_input(style="width: 4rem")
                    input(placeholder="000" type="password")
                    label
                | &#9;
                .sui_input(style="width:13rem")
                    input(placeholder="000000" type="password")
                    label
        .button_footer
            button.sui_button.nude Sign-Up
            button.sui_button Login
        .footer
            a(href='https://google.com' style="opacity:0.5;color: var(--content-text)") I forgot my password
    .sui_card(style="display: inline-block;")
        .title
        .image
        .content
            h5.textshadow Form Example 2
            hr
            br
            br
            | Form that requires simple information.
            p ex) Login
            br
            br
            .sui_input.icon
                input(placeholder="username@email.com")
                label
                    | &nbsp;
                    | E-Mail&nbsp;
                    span(style="color:var(--alert)") *
                    | &nbsp;
                .icon
                    i.material-icons email
            br
            br
            .sui_input.icon
                input(placeholder="Least 8 char...")
                label
                    | &nbsp;
                    | Password&nbsp;
                    span(style="color:var(--alert)") *
                    | &nbsp;
                .icon
                    i.material-icons security
            br
            br
            .sui_input.icon
                input(placeholder="")
                label.
                    &nbsp;
                    Name
                    &nbsp;
                .icon
                    i.material-icons person
            br
            br
            div(style="display: inline-block;")
                .sui_input(style="width: 4rem")
                    input(placeholder="000" type="password")
                    label.
                        &nbsp;
                        Code
                        &nbsp;
                pre
                .sui_input(style="width:13rem")
                    input(placeholder="000000" type="password")
                    label.
                        &nbsp;
                        Serial
                        &nbsp;
        .button_footer
            button.sui_button.nude Sign-Up
            button.sui_button Login
        .footer
            a(href='https://google.com' style="opacity:0.5;color: var(--content-text)") I forgot my password
    .sui_card(style="display: inline-block;")
        .title
            h6 Form Example 3
        .image
        .content
            p.
                Form that is part of user settings.
                The title is present on the card.
            br
            br
            | E-Mail&nbsp;
            span(style="color:var(--alert)") *
            | &#9;&#9;&#9;
            .sui_input
                input(placeholder="username@email.com")
                label
            br
            | Password&nbsp;
            span(style="color:var(--alert)") *
            | &#9;
            .sui_input
                input(placeholder="At least 8 Char..." type="password")
                label
            br
            | Name&nbsp;
            .sui_tooltip
                .content
                    small What's your name?
                i.material-icons.icon help
            | &#9;&#9;
            .sui_input
                input(placeholder="At least 8 Char..." type="password")
                label
            br
            | Serial&#9;&#9;&#9;&#9;
            div(style="display: inline-block;")
                .sui_input(style="width: 4rem")
                    input(placeholder="000" type="password")
                    label
                | &#9;
                .sui_input(style="width:13rem")
                    input(placeholder="000000" type="password")
                    label
        .button_footer
            button.sui_button.nude Sign-Up
            button.sui_button Login
        .footer
            a(href='https://google.com' style="opacity:0.5;color: var(--content-text)") I forgot my password
    .sui_card
        .title
        .image
            img(style='width: 20rem' src="@/assets/skate.jpg")
        .content
            p Form example 4
            br
            br
            .sui_input.icon(style="width: 21rem;")
                input(placeholder="username@email.com")
                label
                    | &nbsp;
                    | E-Mail&nbsp;
                    span(style="color:var(--alert)") *
                    | &nbsp;
                .icon
                    i.material-icons email
            br
            br
            .sui_input.icon(style="width: 21rem;")
                input(placeholder="Least 8 char...")
                label
                    | &nbsp;
                    | Password&nbsp;
                    span(style="color:var(--alert)") *
                    | &nbsp;
                .icon
                    i.material-icons security
            br
            br
            .sui_input.icon(style="width: 21rem;")
                input(placeholder="")
                label.
                    &nbsp;
                    Name
                    &nbsp;
                .icon
                    i.material-icons person
            br
            br
            div(style="display: inline-block;")
                .sui_input(style="width: 6rem")
                    input(placeholder="000" type="password")
                    label.
                        &nbsp;
                        Code
                        &nbsp;
                pre
                .sui_input(style="width:14rem")
                    input(placeholder="000000" type="password")
                    label.
                        &nbsp;
                        Serial
                        &nbsp;
        .button_footer
            button.sui_button.nude Sign-Up
            button.sui_button Login
        .footer
            a(href='https://google.com' style="opacity:0.5;color: var(--content-text)") I forgot my password
    .sui_card
        .title
            h6 Tooltip
        .image
        .content
            p.
                Here is the tooltip.
                You can set direction of the text by adding .bottom | .left class.
                You can determine the element position in the viewport and set the position
            br
            br
            div(style="display: flex;justify-content: space-between;")
                .sui_tooltip
                    .content
                        small.
                            This is a toolbox.
                            Toolbox has break points of line-breaks on tablet viewport. Try to make the description simple. Let's resize the window and see where it breaks.
                    i.material-icons.icon help
                .sui_tooltip.bottom
                    .content
                        small.
                            Set width and left by javascript on mobile to make the text box full width.
                    i.material-icons.icon help
                .sui_tooltip.left
                    .content
                        small.
                            This is a toolbox
                            This is positioned .left
                    i.material-icons.icon help
                .sui_tooltip.left.bottom
                    .content
                        small.
                            This is a toolbox
                            This is positioned .left.bottom
                    i.material-icons.icon help
        .button_footer
        .footer
    .sui_card
        .title
            h6 Steps
        .content
            h5.textshadow Steps
            br
            h6 Lined style:
            br
            .sui_steps.line(style="--ring-count: 2;--ring-status: 2")
                svg
                    circle.step(r="1.5em" cx="50%" cy="50%")
                svg
                    circle.step(r="1.5em" cx="50%" cy="50%")
                .step.complete Skate
                .step.complete Learn to code
                .step.current
                    .icon
                        i.material-icons accessibility_new
                    | Become a computer nerd
                .step
                    .icon
                        i.material-icons pets
                    | Get a dog
            br
            br
            h6 Ringed style (Best on mobile):
            br
            .sui_steps.ring(style="--ring-count: 4;--ring-status: 3")
                svg
                    circle.step(r="1.5em" cx="50%" cy="50%")
                svg
                    circle.step(r="1.5em" cx="50%" cy="50%")
                .step.complete Skate
                .step.complete Learn to code
                .step.current
                    .icon
                        i.material-icons accessibility_new
                    | Become a computer nerd
                .step
                    .icon
                        i.material-icons pets
                    | Get a dog
            br
            br
            p.
                Use css var --ring-count to set the number of steps.
                Use .complete, .current classes to set the step status.
                Use css var --ring-status to set the current steps on ring mode.
        .button_footer
        .footer
    .sui_card(style="width: 50%")
        .title
            h6 Accordion
        .content
            .sui_accordion(onclick="sui_accordion.handler(event)")
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
    .sui_card(style="width: 50%")
        .title
            h6 POP UP
        .content.center Push A Button
        .button_footer
            button.sui_button(onclick="sui_popup.handler('myModal')") Default
            br
            br
            button.sui_button(onclick="sui_popup.handler('myModal','top')") Top
            br
            br
            button.sui_button(onclick="sui_popup.handler('myModal','left')") Left
            br
            br
            button.sui_button(onclick="sui_popup.handler('myModal','bottom')") Bottom
            br
            br
            button.sui_button(onclick="sui_popup.handler('myModal','right')") Right
            br
            br
            button.sui_button.nude(onclick="sui_popup.handler('somerandomstuff', 'right')") Random
            br
            br
            button.sui_button.nude(onclick="sui_popup.handler('menu', 'left', true)") MENU1
            br
            br
            button.sui_button.nude(onclick="sui_popup.handler('menuhash', 'left', true)") MENU2
    .sui_card#myModal(style="display:none;")
        .title
            h6 POP UP
        .image
            img(style='width: 20rem' src="@/assets/skate.jpg")
        .content.center
            h3 Yes Master?
            br
            p.
                Nothing special here,
                Modal is basically same old card :)
                Just give it an ID and hide it somewhere.
                The JS function will take care of it.
        .button_footer
            button.sui_button(onclick="sui_popup.handler('myModal')") OK
    #somerandomstuff(style="display:none;background-color:red;color:white;padding: 2em;text-align:right;")
        | I'm A SPAMMER
        pre
        button.sui_button(onclick="sui_popup.handler('somerandomstuff')") OK
    br
    .sui_card#menu(style="width: 280px;")
        .title
            | Baksa Gimm
            .close(onclick="sui_popup.handler('menu', 'close')")
        .image
            img(src="@/assets/skate.jpg")
        .content
            small(style="opacity:.5") Baksa Gimm
            hr(style="margin-top:.5em")
            br
            .menublock
                p Home
            .menublock.select
                p Gibson
                .new
                    small 99+
            .menublock
                p Fender
            .menublock
                p Epiphone
                .new
                    small 1
            br
            small(style="opacity:.5") Account Settings
            hr(style="margin-top:.5em")
            br
            .menublock
                .icon
                    i.material-icons person
                p Profile
            .menublock
                .icon
                    i.material-icons settings
                p App settings
            .menublock
                .icon
                    i.material-icons chat
                .new
                    small 9
                p Messages
            .menublock
                .icon
                    i.material-icons shopping_cart
                .new
                    small 4
                p Shopping Cart
            .menublock.disabled
                .icon
                    i.material-icons payment
                p Payment
    br
    .sui_card#menuhash(style="width: 280px;")
        .title
            | Baksa Gimm
            .close(onclick="sui_popup.handler('menuhash', 'close')")
        .image
            img(src="@/assets/skate.jpg")
        .content
            .menublock
                .icon
                    i.material-icons home
                .new
                    small 99+
                p Home
            small(style="display: block;") &nbsp;
            small(style="opacity:.5") Gibson
            hr(style="margin-top:.5em")
            br
            .menublock
                p All
            .menublock
                p Set Necks
            .menublock
                p Les Paul
                .new
                    small 4
            .menublock
                p SG
            br
            small(style="opacity:.5") Fender
            hr(style="margin-top:.5em")
            br
            .menublock
                p All
            .menublock.select
                p Set Necks
            .menublock
                p Stratocaster
            .menublock
                p Services
            br
            small(style="opacity:.5") Epiphone
            hr(style="margin-top:.5em")
            br
            .menublock
                p All
            .menublock
                p Explorers
            .menublock
                p Used Market
                .new
                    small Updates!
            .menublock
                p Services
            br
            small(style="opacity:.5") Account Settings
            hr(style="margin-top:.5em")
            br
            .menublock
                .icon
                    i.material-icons person
                p Profile
            .menublock
                .icon
                    i.material-icons settings
                p App settings
            .menublock
                .icon
                    i.material-icons chat
                .new
                    small 9
                p Messages
            .menublock
                .icon
                    i.material-icons shopping_cart
                .new
                    small 4
                p Shopping Cart
            .menublock.disabled
                .icon
                    i.material-icons payment
                p Payment
    br
    .sui_card(style="width: 400px")
        .title
            h6 Toggles
        .content
            label.sui_toggle
                p Toggle
                pre
                input(type="checkbox" value="check1")
                .toggle
            br
            label.sui_toggle.disabled
                p Toggle
                pre
                input(type="checkbox" disabled value="check2")
                .toggle
            br
            label.sui_radio
                p Radio 1
                pre
                input(type="radio" name="radio" value="1")
                .radio
            br
            label.sui_radio.disabled
                p Radio 2
                pre
                input(type="radio" name="radio" disabled value="2")
                .radio
            br
            label.sui_radio
                p Radio 3
                pre
                input(type="radio" name="radio" value="3")
                .radio
            br
            br
            label.sui_toggle(style="font-size:1.5em;")
                p Big toggle
                pre
                input(type="checkbox" value="bigcheck")
                .toggle
            br
            label.sui_radio(style="font-size:1.5em;")
                p Big radio 1
                pre
                input(type="radio" name="bigradio" value='big1')
                .radio
            br
            label.sui_radio(style="font-size:1.5em;")
                p Big radio 2
                pre
                input(type="radio" name="bigradio" value='big2')
                .radio
    br
    .sui_card
        .title
            h6 Textarea
        .content
            .sui_textarea.icon.button
                textarea(placeholder='Hello')
                label.
                    &nbsp;
                    텍스트에리아
                    &nbsp;
                .icon
                    img(src="@/assets/myface.jpg" style="width: calc(100% - 12px);height: calc(100% - 12px);border-radius: 100%;display: block;")
                .button
                    i.material-icons send
    .sui_card
        .title
            h6 Image Editor
            .close
        .image
            img(src="@/assets/myface.jpg")
        .content
        .button_footer
            button.sui_button.nude Change Image
            button.sui_button UPLOAD
    br
    br
    hr
    br
    .sui_card(style="width: 600px;")
        .content
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
    .sui_card(style="width: 600px;")
        .title(style="padding-right: 2.3em;")
            | Expected Delivery: 1985 / Aug / 20
            .close
        .content
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
                    .sui_input.button.icon(style="width:10rem")
                        input(type="number" value="1" style="text-align:center;")
                        label.
                            &nbsp;
                            Quantity
                            &nbsp;
                        .icon.hover(style="font-size: 1.8rem") -
                        .button(style="font-size: 1.8rem") +
    .sui_card(style="width: 600px;")
        .title(style="padding-right: 2.3em;")
            | Digital Coupon
            .close
        .content
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
                    .sui_input.button.icon(style="width:10rem")
                        input(type="number" value="1" style="text-align:center;")
                        label.
                            &nbsp;
                            Quantity
                            &nbsp;
                        .icon.hover(style="font-size: 1.8rem") -
                        .button(style="font-size: 1.8rem") +
    .sui_card(style="width: 600px;")
        .title(style="padding-right: 2.3em;background-color:yellow")
            | NFT - Digital assets (click for more info)
            .close
        .content
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
                    .sui_input.button.icon(style="width:10rem")
                        input(type="number" value="1" style="text-align:center;")
                        label.
                            &nbsp;
                            Quantity
                            &nbsp;
                        .icon.hover(style="font-size: 1.8rem") -
                        .button(style="font-size: 1.8rem") +
    .sui_card(style="width: 600px;")
        .title(style="padding-right: 2.3em;background-color:var(--alert);color:white;")
            | This item no longer exists
            .close
        .content(style="opacity:0.5")
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
                    .sui_input.button.icon(style="width:10rem")
                        input(type="number" value="1" style="text-align:center;")
                        label.
                            &nbsp;
                            Quantity
                            &nbsp;
                        .icon.hover(style="font-size: 1.8rem") -
                        .button(style="font-size: 1.8rem") +
    br
    br
    .sui_card(style="width: 600px;background-color:var(--background);color:var(--background-text);overflow: hidden;")
        .title(style="background-color:var(--background-focus_transparent);")
            div(style="line-height: 2.8;") Hey you have a coupon!
    div(style="width:600px;max-width:100%;margin: 8px auto;text-align:center;padding: 1rem;box-sizing: border-box;")
        div(style="text-align:left;")
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

        button.sui_button CHECKOUT
    br
    br
    br
    br
    .sui_list(style="--textclamp: 3;--grid:1fr 1fr 1fr;")
        .article
            .content
                img(src="@/assets/nike1.jpg")
        .article(style="--textclamp: 2")
            .content
                img.square(src="@/assets/nike2.jpg")
                .title(style="font-size:.8em") $599.99
                .text(style="font-size:.7em") TCL 65-inch 5-Series 4K UHD Dolby Vision HDR QLED Roku Smart TV - 65S535, 2021 Model
        .article(style="--textclamp: 2")
            .content
                img.square(src="@/assets/nike1.jpg")
                .title(style="font-size:.8em") $199.99
                .text(style="font-size:.7em") Nike shoes, 2021 Model
        .article(style="--textclamp: 2")
            .content
                img.square(src="@/assets/newyork.jpg")
                .title(style="font-size:.8em") $399.99
                .text(style="font-size:.7em") Full New york zombie tour
            .overlay HI
        .article(style="--textclamp: 2")
            .content
                img.square(src="@/assets/bunnykit.jpg")
                .title(style="font-size:.8em") $99.99
                .text(style="font-size:.7em") Peach blouse
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
                img.block(src="@/assets/dia.png")
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
                img(src="@/assets/dia.png")
        .article
            .content
                img(src="@/assets/brunomars.png")
    br
    br
</template>
<script>
import {ColorMangle} from 'colormangle';

export default {
    name: "home",
    data() {
        return {
            colorScheme: new ColorMangle('#00807f').colorScheme()
        };
    },
    mounted() {
        // pure javascript handlers
        window.sui_textarea = {
            init: (el) => {
                let setup = (el) => {
                    el.setAttribute('rows', '1');
                    let parent = el.parentElement;
                    let replica = document.createElement('div');
                    replica.classList.add('textarea');
                    parent.insertBefore(replica, el);
                    replica.append(el);
                    el.addEventListener('input', (e) => {
                        let target = e.target;
                        target.parentNode.dataset.replica = target.value;
                    });
                    el.addEventListener('focus', (e) => {
                        let target = e.target;
                        let par = target.parentNode.parentNode;
                        if (par.classList.contains('sui_textarea') && !par.classList.contains('focus'))
                            par.classList.add('focus');

                    });
                    el.addEventListener('blur', (e) => {
                        let target = e.target;
                        let par = target.parentNode.parentNode;
                        if (par.classList.contains('sui_textarea') && par.classList.contains('focus'))
                            par.classList.remove('focus');
                    });
                };

                if (el) setup(el);
                else {
                    el = document.getElementsByTagName('textarea');
                    for (let i = 0; i < el.length; i++) {
                        if (el[i].parentNode.classList.contains('sui_textarea'))
                            setup(el[i]);
                    }
                }
            }
        };

        window.sui_textarea.init();
        window.sui_accordion = {
            timeout: null,
            handler: (ev) => {
                let el = ev.target.closest('.sui_accordion');

                if (!el)
                    return;

                let bool = !el.classList.contains('minus');

                if (bool)
                    el.classList.add('minus');
                else
                    el.classList.remove('minus');

                if (el)
                    el = el.lastChild;

                if (window.sui_accordion.timeout)
                    clearTimeout(window.sui_accordion.timeout);
                window.sui_accordion.timeout = null;

                if (bool) {
                    el.style.maxHeight = '100vh';
                    window.sui_accordion.timeout = setTimeout(() => {
                        // use this.$nextTick() for vue
                        el.style.maxHeight = 'unset';
                    }, 750);
                } else {
                    el.style.maxHeight = '100vh';
                    window.sui_accordion.timeout = setTimeout(() => {
                        el.style.maxHeight = '0';
                    }, 100);
                }
            }
        };
        window.sui_screen = {
            handler: (id, stickTo, closeWhenBackgroundClick) => {

                let screen = document.getElementsByClassName('sui_screen')[0];

                if (!screen) {
                    // if there is no overlay screen, create one
                    screen = document.createElement('div');
                    screen.classList.add('sui_screen');
                    screen.classList.add(stickTo);

                    // let body = document.getElementsByClassName('sui_frame')[0];
                    let body = document.getElementsByTagName('BODY')[0];
                    document.body.style.top = `-${window.scrollY}px`;
                    document.body.style.position = 'fixed';

                    if (closeWhenBackgroundClick) {
                        screen.addEventListener('click', function () {
                            window.sui_popup.handler(id);
                        });
                    }

                    body.append(screen);
                } else if (id) {
                    const scrollY = document.body.style.top;
                    document.body.style.position = '';
                    document.body.style.top = '';
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);

                    // clean all element but the element with id given by the id argument
                    let child = screen.children;

                    let cid = child.length;
                    while (cid--) {
                        if (child[cid].id !== id) {

                            let classList = window.sui_popup.classList.direction.concat(window.sui_popup.classList.stickTo);

                            for (let c of classList)
                                child[cid].classList.remove(c);

                            let dummy = document.getElementById('_dummy_' + child[cid].id);
                            if (dummy) {
                                dummy.parentNode.insertBefore(child[cid], dummy);
                                dummy.remove();
                            }
                        }
                    }
                }


                return screen;
            }
        };
        window.sui_popup = {
            classList: {
                // DO NOT! change the order of array
                stickTo: [
                    '_stickto-center',
                    '_stickto-top',
                    '_stickto-bottom',
                    '_stickto-right',
                    '_stickto-left'
                ],
                direction: [
                    '_center',
                    '_down',
                    '_up',
                    '_left',
                    '_right'
                ]
            },
            eventListener: {},
            timeout: null,
            handler: (id, stickTo = 'center', closeWhenBackgroundClicked = false, overlayColor = 'rgba(0, 0, 0, 0.33)') => {

                if (!id)
                    // no id
                    return;

                let stickToList = window.sui_popup.classList.stickTo;
                let directionList = window.sui_popup.classList.direction;
                let direction;

                if (stickTo !== 'close') {
                    stickTo = '_stickto-' + stickTo;
                    direction = directionList[stickToList.indexOf(stickTo)];
                    if (!stickToList.includes(stickTo))
                        throw 'allowed argument for stickTo:' + JSON.stringify(stickToList);

                    if (!directionList.includes(direction))
                        throw 'allowed argument for stickTo:' + JSON.stringify(directionList);

                    if (window.sui_popup.timeout)
                        clearTimeout(window.sui_popup.timeout);
                    window.sui_popup.timeout = null;
                }

                id = id[0] === '#' ? id.substring(1) : id;

                let el = document.getElementById(id);
                if (!el)
                    // no matching popup
                    return;

                let isUp = el.closest('.sui_screen');
                if (stickTo === 'close' && !isUp)
                    // nothing to close
                    return;

                let screen = window.sui_screen.handler(id, stickTo, closeWhenBackgroundClicked);

                if (isUp) {
                    // popup is showing
                    for (let c of directionList)
                        el.classList.remove(c);

                    screen.style.backgroundColor = 'transparent';

                    let cl_idx = el.classList.length, immediate = false;

                    while (cl_idx--) {
                        if (el.classList[cl_idx].includes('_stickto-center'))
                            immediate = true;
                    }

                    window.sui_popup.timeout = setTimeout(() => {
                        // cleanup
                        for (let c of stickToList)
                            el.classList.remove(c);

                        el.classList.remove('sui_popup');
                        el.removeEventListener('click', window.sui_popup.eventListener[id]);
                        window.sui_popup.eventListener[id] = null;

                        let dummy = document.getElementById('_dummy_' + id);
                        if (dummy) {
                            dummy.parentNode.insertBefore(el, dummy);
                            dummy.remove();
                        }
                        screen.remove();
                    }, immediate ? 0 : 750);

                } else {
                    let bool = !el.classList.contains('sui_popup');

                    window.sui_popup.eventListener[id] = function (e) {
                        e.stopPropagation();
                    };

                    el.addEventListener('click', window.sui_popup.eventListener[id]);
                    if (bool) {
                        el.classList.add('sui_popup');
                        if (!el.closest('.sui_screen')) {
                            let dummy = document.createElement('div');
                            dummy.classList.add('sui_dummy');
                            dummy.id = '_dummy_' + id;
                            el.parentNode.insertBefore(dummy, el);
                            screen.append(el);
                        }
                    }

                    el.classList.add(stickTo);

                    window.sui_popup.timeout = setTimeout(() => {
                        screen.style.backgroundColor = overlayColor;
                        el.classList.add(direction);
                    }, direction === '_center' ? 0 : 100);

                    return el;
                }
            }
        };
    }

};
</script>
<style lang="less">
@mouse: ~'(pointer: fine)';
@touch: ~'(pointer: coarse)';
@phone: ~'only screen and (max-width: 441px)';
@tablet: ~'only screen and (max-width: 768px)';
@laptop: ~'only screen and (max-width: 1366px)';
@notphone: ~'not screen and (max-width: 441px)';
@nottablet: ~'not screen and (max-width: 768px)';
@notlaptop: ~'not screen and (max-width: 1366px)';
.hideonphone {
    @media @phone {
        display: none !important;
    }
}

.hideontablet {
    @media @tablet {
        display: none !important;
    }
}

.hideonlaptop {
    @media @laptop {
        display: none !important;
    }
}

.viewonphone {
    @media @notphone {
        display: none !important;
    }
}

.viewontablet {
    @media @nottablet {
        display: none !important;
    }
}

.viewonlaptop {
    @media @notlaptop {
        display: none !important;
    }
}

._styling_example {
    // This is not part of the style guide
    width: 768px;
    min-width: 768px;
    text-align: center;
    @media @tablet {
        width: 100%;
        min-width: unset;
    }
}

div.sui_list {
    display: grid;
    grid-template-columns: var(--grid);
    gap: 8px;

    .article {
        position: relative;
        width: 100%;
        box-shadow: 0 0 0 2px var(--content-text_screen);
        border-radius: 8px;
        overflow: hidden;
        background-color: var(--content);
        padding-top: 100%;

        &:hover {
            cursor: pointer;

            .text {
                text-decoration: underline;
            }

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
                height: 70%;
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
                object-position: 0 30%;
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

            & > .title:not(:empty) {
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
                font-size: .8em;
                line-height: 1.25;

                & + .text {
                    padding-top: 0;
                }
            }

            & > .text:not(:empty) {
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
                font-size: 0.8em;
                line-height: 1.25;
            }
        }
    }
}


div.sui_dummy {
    display: none;
}

div.sui_textarea {
    position: relative;

    &.icon {
        & > .textarea {
            & > textarea,
            &::after {
                // make space for icon
                padding-left: calc(2.8rem + .75em);
            }
        }

        & > .icon {
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
        & > .icon {
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

    &.button {
        & > .textarea {
            & > textarea,
            &::after {
                padding-right: 3.3em;
            }
        }

        & > .button {
            display: inline-flex;
            width: 2.8em;
            height: 2.8em;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 0;
            bottom: 1px;
            cursor: pointer;

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
        left: 2px;
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

        &::after {
            content: "";
            background-color: var(--content-text_transparent);
            height: 2px;
            width: 100%;
            position: absolute;
            bottom: 0;
        }

        &::before {
            content: "";
            background-color: var(--content-text_transparent);
            height: 2px;
            width: 0.5em;
            position: absolute;
            left: 0;
            bottom: 0;
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

            &::placeholder {
                color: var(--content-placeholder);
            }

            &:read-only {
                text-overflow: ellipsis;
            }

            &:focus {
                border-color: var(--content-focus);
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
            border: solid 2px;
            outline: none;
            border-color: var(--content-text_transparent);
            box-shadow: inset 0 0 0 4px var(--content-focus_screen);
            border-top: none;
            /* Place on top of each other */
            grid-area: 1 e("/") 1 e("/") 2 e("/") 2;
        }
    }
}

label.sui_toggle {
    display: inline-block;
    position: relative;
    cursor: pointer;
    user-select: none;

    &.disabled {
        opacity: 0.5;
        user-select: none;
        cursor: default;
    }

    *:not(pre) {
        font-size: 1em;
        display: inline-block;
    }

    * {
        vertical-align: middle;
        line-height: 2;
    }

    & > input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked + .toggle {
            &:after {
                right: 2px;
                background-color: var(--button-text);
            }

            background-color: var(--button-focus_faded);
        }
    }

    &:active:not(.disabled) {
        .toggle {
            background-color: var(--button-focus);
        }
    }

    .toggle {
        &:after {
            content: "";
            box-sizing: border-box;
            width: calc(1em - 8px);
            height: calc(1em - 8px);
            border-radius: 1em;
            position: absolute;
            top: 2px;
            right: calc(1.75em - 1em + 8px - 2px);
            background-color: var(--content);
            transition: right 0.066s;
            border: .1em solid var(--content-text_shadow);
        }

        display: inline-block;
        position: relative;
        height: calc(1em - 4px);
        width: 1.75em;
        font-size: 1.25em;
        left: -4px;
        border: 2px solid var(--content-text_screen);
        background-color: var(--content-text_soft);
        border-radius: 1em;
    }
}

label.sui_radio {
    display: inline-block;
    position: relative;
    cursor: pointer;
    user-select: none;

    &.disabled {
        opacity: 0.5;
        user-select: none;
        cursor: default;
    }

    * {
        line-height: 2;
        vertical-align: middle;
    }

    *:not(pre) {
        font-size: 1em;
        display: inline-block;
    }

    & > input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked + .radio {
            border: 0.2em solid var(--content);
            box-sizing: border-box;
            background-color: var(--content-text_soft);
        }
    }

    &:active:not(.disabled) {
        & > .radio {
            border-color: var(--content-text_soft);
        }
    }

    .radio {
        font-size: 1.25em;
        display: inline-block;
        position: relative;
        width: calc(1em - 4px);
        height: calc(1em - 4px);
        box-sizing: border-box;
        left: -2px;
        border: 0.2em solid var(--content-text_transparent);
        box-shadow: 0 0 0 2px var(--content-text_soft);
        border-radius: 1em;
        vertical-align: middle;
    }
}

div.sui_screen {
    &._stickto-bottom {
        justify-content: flex-end;
    }

    &._stickto-top {
        justify-content: flex-start;
    }

    &._stickto-left {
        justify-content: center;
        align-items: flex-start;
    }

    &._stickto-right {
        justify-content: center;
        align-items: flex-end;
    }

    z-index: 9999;
    justify-content: center;
    display: flex;
    position: fixed;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    transition: background-color .5s;

    &._stickto-center {
        transition: background-color 0s;
    }

    overflow: hidden;
}

div.sui_popup {
    overflow-y: auto;
    overflow-x: hidden;
    @media @tablet {
        margin: 0 !important;
    }

    &._stickto-bottom {
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        bottom: -100%;
        margin: 0 auto !important;
    }

    &._stickto-top {
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
        bottom: 100%;
        margin: 0 auto !important;
    }

    &._stickto-right {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        left: 100%;
        margin: 0 !important;
    }

    &._stickto-left {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        left: -100%;
        margin: 0 !important;
    }

    &._stickto-center {
        margin: auto !important;
    }

    display: block !important;

    position: relative;

    max-height: 100%;

    &._up, &._down {
        bottom: 0;
    }

    &._left, &._right {
        left: 0;
    }

    transition: bottom .5s, left .5s;
}

div.sui_accordion {
    position: relative;

    & > .title {
        & + hr {
            margin-top: 0;
            border-left: 0;
            border-right: 0;
            max-width: unset;
            width: 100%;
        }

        &::after {
            content: "+";
            font-size: 1.5em;
            line-height: 2rem;
            position: absolute;
            right: 0.25rem;
            font-weight: 300;
        }

        padding-right: 1.5em;
        padding-left: .25rem;
        box-sizing: border-box;
        width: 100%;
        cursor: pointer;
        position: relative;
        line-height: 2rem;

        color: var(--content-text_soft);

        &:hover {
            text-shadow: 1px 1px var(--content-text_shadow);
            color: var(--content-text);

            &::after {
                text-shadow: 1px 1px var(--content-text_shadow);
            }
        }
    }

    &.minus > .title {
        &::after {
            content: "-";
        }
    }

    & > .content {
        overflow: hidden;
        max-height: 0;
        transition: max-height .5s;
    }
}

div.sui_steps {
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

        & > .icon {
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

div.sui_tooltip {
    height: 1.25em;
    display: inline-block;
    position: relative;
    text-align: left;
    vertical-align: middle;

    &.bottom {
        & > .content {
            top: calc(0px + 2em);
            bottom: unset;

            &::before {
                content: "";
                width: 0;
                height: 0;
                position: absolute;
                top: calc(0px - .75em);
                left: calc(1em - 3px);
                border-top: none;
                border-bottom: .75em solid var(--content-text);
                border-left: .5em solid transparent;
                border-right: .5em solid transparent;
            }
        }
    }

    &.left {
        & > .content {
            left: unset;
            right: calc(-100% + 0.5em);
            text-align: right;

            &::before {
                right: calc(1em - 3px);
                left: unset;
            }
        }
    }

    & > .content {
        &::before {
            content: "";
            width: 0;
            height: 0;
            position: absolute;
            bottom: calc(0px - .75em);
            left: calc(1em - 3px);
            border-top: .75em solid var(--content-text);
            border-left: .5em solid transparent;
            border-right: .5em solid transparent;
        }

        small {
            text-align: left;
            background-color: var(--content-text);
            color: var(--content);
            padding: .5em 1em;
            box-shadow: 0 0 0 3px var(--content-text_transparent);
        }

        width: 50vw;
        @media @tablet {
            width: 240px;
        }

        display: none;
        z-index: 9999;
        position: absolute;
        bottom: calc(0px + 2em);
        left: calc(-100% + 0.5em);
    }

    &:hover > .content {
        display: block;
    }

    @media @touch {
        &:active > .content {
            display: block;
        }
    }

    & > .icon {
        cursor: pointer;
        font-size: 1.25em;
        line-height: 1em;
    }
}

button.sui_button {
    max-width: calc(100vw - 3.6rem);
    min-width: 8rem;
    min-height: 2.8rem;
    padding: .25rem 1rem;
    margin: 0.25rem;

    line-height: 1rem;
    font-size: 0.88rem;
    vertical-align: middle;

    border: solid 0.25rem var(--button-focus);
    box-shadow: 0 0 0 0.125rem var(--shadow);
    font-weight: 500;
    text-shadow: 0 0 8px var(--button-focus);
    background-color: var(--button-focus_faded);
    color: var(--button-text);
    text-transform: uppercase;

    ._loader {
        display: inline-block;
        border: .15em solid var(--content-text_transparent);
        border-radius: 50%;
        border-top: .15em solid var(--content-text);
        vertical-align: middle;
        margin: -0.22rem 0;

        &.button {
            border: .15em solid var(--button-text_transparent);
            border-top: .15em solid var(--button-text);
        }

        width: 1rem;
        height: 1rem;
        animation: spin 2s linear infinite;
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }

    &:hover {
        background-color: var(--button-focus);
    }

    &:active {
        box-shadow: none;
        border: solid 0.25rem var(--shade);
    }

    &.nude {
        background-color: unset;
        color: var(--button);
        box-shadow: none;
        border: solid 0.25rem transparent;
        text-shadow: none;
        font-weight: 600;

        &:hover {
            text-shadow: 1px 1px var(--content-text_shadow);
        }

        &:active {
            text-shadow: none;
            box-shadow: none;
        }
    }

    &.icon {
        min-width: 2.8rem;
        border-radius: 2.8rem;
        width: 2.8rem;
        height: 2.8rem;
        padding: 0;
        font-size: 1.15rem;

        & > * {
            width: 1.15rem;
            height: 1.15rem;
            font-size: 1.15rem;
            vertical-align: middle;
        }

    }
}

div.sui_card {
    tab-size: 1em;
    background-color: var(--content);
    color: var(--content-text);
    margin-bottom: 8px;
    border-radius: 8px;
    padding: 0 1.3em;

    box-shadow: 0 0 0 2px var(--content-text_screen);
    text-align: left;
    max-width: calc(100% - 2.6em);
    @media @phone {
        padding: 0 .7em;
        max-width: calc(100% - 1.4em);
    }
    display: inline-block;
    vertical-align: top;

    * {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-word;
    }

    & > .title, & > .image {
        overflow: hidden;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    & > .title:not(:empty) {
        position: relative;
        padding-top: 0.5rem;
        padding-left: 1.3em;
        padding-right: 1.3em;
        margin: 0 -1.3em;
        min-height: 2rem;
        line-height: 2rem;
        border-bottom: 1px solid var(--content-text_transparent);

        & > p, & > h1, & > h2, & > h3, & > h4, & > h5, & > h6, & > small {
            min-height: 2em;
            line-height: 2em;
            padding-top: 0.5em;
            margin-top: -0.5rem;
        }

        & > div:not(.close) {
            margin-top: -.5em;
        }

        & + .image {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }

        & > .close {
            &::after {
                content: '\00D7';
                vertical-align: middle;
            }

            cursor: pointer;
            width: 1em;
            height: 1em;
            font-size: 1.3em;
            line-height: 1rem;
            overflow: hidden;
            text-align: center;
            display: block;
            position: absolute;
            right: .5em;
            top: .5em;
        }
    }


    & > .image:not(:empty) {
        margin: 0 -1.3em;

        * {
            width: 100%;
            display: block;
        }

        user-select: none;

        img {
            -webkit-user-drag: none;
            margin: 0 auto;
            max-width: 100%;
        }

        & + .content {
            padding-top: 0.8rem;
        }
    }

    & > .content:not(:empty) {
        & > * {
            max-width: 100%;
        }

        h1, h2, h3, h4, h5 {
            text-shadow: 1px 1px rgba(0, 0, 0, 0.11);
        }

        padding: 2em 0.5rem 2.5em;
        line-height: 1.5em;

        & > .cart {
            margin: 0px -.5em;
            width: calc(100% + 1em);
            max-width: unset;

            * {
                vertical-align: top;
            }

            & > img {
                margin-bottom: 1.3em;
                width: 24vw;
                height: 24vw;
                max-width: 160px;
                max-height: 160px;
                border-radius: 4px;
                object-fit: contain;
                display: inline;
                float: left;
                margin-right: 1rem;
            }

            .detail {
                font-weight: 500;
                display: inline;
                cursor: pointer;

                &:hover {
                    text-shadow: 1px 1px var(--content-text_shadow);
                    text-decoration: underline;
                }
            }

            .price {
                font-size: 1.953em;
                color: var(--content-text_soft);
                text-shadow: 1px 1px var(--content-text_shadow);
                text-align: right;
                cursor: default;
                user-select: none;
            }

            .quantity {
                text-align: right;
            }
        }

        & > hr {
            margin-top: 1em;
            border-left: 0;
            border-right: 0;
            margin-left: -.5em;
            margin-right: -.5em;
            max-width: unset;
            width: calc(100% + 1em);
        }

        &.center {
            text-align: center;
            padding-left: 0;
            padding-right: 0;

            h1, h2, h3, h4, h5, h6, p, small {
                text-align: center;
            }

            & + .button_footer {
                text-align: center;

                & + .footer {
                    text-align: center;
                }
            }
        }
    }

    & > .button_footer:not(.sticky) {
        text-align: right;

        &:not(:empty) {
            padding-bottom: 1.5em;

            @media @phone {
                display: flex;
                flex-direction: column-reverse;

                .sui_button {
                    display: block;
                    margin: 8px auto;

                    &.nude {
                        text-decoration: underline;
                    }

                    &:first-child {
                        margin-bottom: 0;
                    }
                }
            }

            & + .footer {
                text-align: right;
            }
        }
    }

    & > .button_footer.sticky {
        text-align: right;
        position: fixed;
        overflow-y: hidden;
        overflow-x: scroll;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        background-color: var(--content);
        padding: 8px;
        border-top: 2px solid var(--content-text_transparent);
    }

    & > .footer {
        font-size: 0.8rem;

        &:not(:empty) {
            padding-bottom: 1.5em;
            line-height: 1.5em;
        }
    }
}

div.sui_input {
    position: relative;
    display: inline-block;
    height: 2.8rem;
    width: 18rem;
    max-width: 100%;
    margin-bottom: 1rem;
    box-shadow: inset 0 0 0 4px var(--content-focus_screen);

    &.error {

        & > label {
            color: var(--alert);

            &::after {
                background-color: var(--alert);
            }

            &::before {
                background-color: var(--alert);
            }
        }

        .button {
            background-color: var(--alert-screen);
            color: var(--alert);
        }

        input, select {
            background-color: var(--alert-screen);
            border-color: var(--alert);

            &:focus {
                border-color: var(--alert);
                background-color: var(--alert-screen);

                & ~ label {
                    color: var(--alert);

                    &::after {
                        background-color: var(--alert);
                    }

                    &::before {
                        background-color: var(--alert);
                    }
                }

                & ~ .button {
                    background-color: var(--alert-screen) !important;
                    color: var(--alert) !important;
                }
            }
        }
    }

    .hover {
        user-select: none;

        &:hover {
            cursor: pointer;
            color: var(--content-focus);
            background-color: var(--content-focus_screen);
        }
    }

    &.button {
        user-select: none;

        & > input {
            padding-right: 3.3em;

            &:focus {
                & ~ .button {
                    color: var(--content-focus);
                    background-color: var(--content-focus_screen);
                }
            }
        }

        & > .button {
            display: inline-flex;
            width: 2.8rem;
            height: 2.8rem;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 0;
            cursor: pointer;
            box-sizing: border-box;
            border-bottom: solid 2px transparent;
            border-right: solid 2px transparent;

            &::before {
                // icon separator
                content: "";
                width: 2px;
                height: 50%;
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

    &.transparent {
        *:not(.button):not(.menu) {
            border-color: transparent !important;
            background-color: transparent !important;

            &::after {
                background-color: transparent !important;
            }

            &::before {
                background-color: transparent !important;
            }
        }
    }

    & > .message {
        font-size: 12px;
        text-align: right;
        color: var(--alert);
        position: absolute;
        width: calc(100% - 4px);
        white-space: nowrap;
    }

    &.icon {

        & > input:focus, & > select:focus {
            & ~ .icon {
                border-color: var(--content-focus);
                color: var(--content-focus);
            }
        }

        &.error > input:focus {
            & ~ .icon {
                border-color: var(--alert);
                color: var(--alert);
                background-color: var(--alert-screen);
            }
        }

        & > select, & > input {
            box-shadow: none;
            min-width: calc(100% - 2.8rem);
            width: calc(100% - 2.8rem);
            border-left: none;
        }

        &::before {
            // icon space
            content: "";
            position: relative;
            width: 2.8rem;
            height: 2.8rem;
            box-sizing: border-box;
            border-left: solid 2px;
            border-bottom: solid 2px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border-color: transparent;
            padding-top: 2px;
        }

        & > .icon {
            // the icon
            position: absolute;
            width: 2.8rem;
            height: 2.8rem;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            border-left: solid 2px;
            border-bottom: solid 2px;
            border-color: var(--content-text_transparent);

            &::after {
                // icon separator
                content: "";
                width: 2px;
                height: 50%;
                background-color: var(--content-text_shadow);
                position: absolute;
                right: -1px;
            }
        }

        &.error > .icon {
            border-color: var(--alert);
            background-color: var(--alert-screen);
        }
    }

    label {
        width: calc(100% - 4px);
        left: 2px;
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

        &::after {
            content: "";
            background-color: var(--content-text_transparent);
            height: 2px;
            width: 100%;
            position: absolute;
            bottom: 0;
        }

        &::before {
            content: "";
            background-color: var(--content-text_transparent);
            height: 2px;
            width: 0.5em;
            position: absolute;
            left: 0;
            bottom: 0;
        }

        &:not(:empty) {
            margin-top: calc(-1em + 2px);
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

    & > * {
        vertical-align: top;
    }

    & > .downarrow {
        &::before {
            content: "";
            border-top: .3em solid var(--content-text);
            border-left: .25em solid transparent;
            border-right: .25em solid transparent;
        }

        justify-content: center;
        align-items: center;
        display: none;
    }

    & > .uparrow {
        &::before {
            content: "";
            border-bottom: .3em solid var(--content-text);
            border-left: .25em solid transparent;
            border-right: .25em solid transparent;
        }

        justify-content: center;
        align-items: center;
        display: none;
    }

    & > select {
        border: none;
        border-radius: 0;
        appearance: none;
        white-space: nowrap;
    }

    & > input,
    & > select {
        &::placeholder {
            color: var(--content-placeholder);
        }

        &:read-only {
            text-overflow: ellipsis;
            padding: 2px 1.5em 0 0.75em;
        }

        text-shadow: 1px 1px var(--content-text_shadow);
        min-height: 100%;
        min-width: 100%;
        width: 100%;

        box-sizing: border-box;
        vertical-align: middle;
        background-color: transparent;
        color: var(--content-text);
        font: inherit;
        line-height: 2.5rem;
        padding: 2px .75em 0;
        font-size: 1rem;
        border: solid 2px;
        border-top: none;
        outline: none;
        border-color: var(--content-text_transparent);

        &:focus {
            border-color: var(--content-focus);

            & ~ label {
                color: var(--content-focus);

                &::after {
                    background-color: var(--content-focus);
                }

                &::before {
                    background-color: var(--content-focus);
                }
            }
        }
    }

    & > .option, & > .option-fullscreen {
        display: none;
        position: absolute;
    }

    &.select {
        & > input {
            display: none;
        }

        & > select:not(:empty) {
            display: inline-block;
            padding-right: 1.5em;

            &:focus ~ .downarrow {
                &::before {
                    border-top: 0.3em solid var(--content-focus);
                }
            }
        }

        &.error {
            & > input:focus ~ .option:not(:empty) {
                border: solid 2px var(--alert);
                background-color: var(--content);
                border-top: none;

                & > .menu {
                    &:hover {
                        background-color: var(--alert-screen);
                    }

                    box-shadow: inset 0 0 0 .5px var(--alert-transparent);
                }
            }
        }

        & > input {
            display: inline-block;

            &:read-only {
                cursor: default;
            }

            & ~ .option, & ~ .option-fullscreen {
                text-align: left;
            }

            & ~ .option {
                & > .menu > .text {
                    font-size: .8em;
                    text-shadow: 1px 1px var(--content-text_shadow);
                    padding: .75em .75em .75em 1.25em
                }
            }

            &:focus ~ .downarrow {
                &::before {
                    border-top: 0.3em solid var(--content-focus);
                }
            }

            &:focus ~ .option-fullscreen:not(:empty) {
                display: block;
                position: fixed;
                box-sizing: border-box;
                background-color: var(--content);
                z-index: 9999;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                overflow-y: auto;

                & > .menu {
                    cursor: pointer;

                    &:hover {
                        background-color: var(--content-focus_screen);
                    }

                    & > * {
                        display: inline;
                    }
                }
            }

            &:focus ~ .option:not(:empty) {
                border: solid 2px var(--content-focus);
                border-top: none;
                top: calc(100% - 1px);
                background-color: var(--content);
                display: block;
                width: 100%;
                box-sizing: border-box;

                z-index: 9999;
                max-height: 50vh;
                overflow-y: auto;

                & > .menu {
                    text-align: left;
                    cursor: pointer;

                    &:hover {
                        background-color: var(--content-focus_screen);
                    }

                    box-shadow: 0 1px 0 var(--content-text_transparent);
                }
            }

            & ~ select {
                display: none;
            }
        }

        .downarrow {
            display: flex;
            position: absolute;
            right: 0;
            top: 0;
            height: 2.8rem;
            font-size: 1.2rem;
            align-items: center;
            width: 1.75rem;
            cursor: default;
        }
    }
}

div.menublock {
    padding: .75em .5rem;
    color: var(--toolbar-text_soft);
    cursor: pointer;
    position: relative;
    margin: 0 -.5rem;


    & > .new:last-child {
        position: static;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: unset;
    }

    & > * {
        vertical-align: middle;
        display: inline-block;
    }

    & > p {
        padding-left: 1em;

        & + .new {
            padding-left: 1em;
        }
    }

    & > .new {
        text-align: right;
        width: 1.25em;
        height: calc(100% - 1.5em);
        position: absolute;
        left: 0.5rem;

        small {
            font-size: 0.65em;
            font-family: monospace;
            font-weight: bold;
            color: white;
            background: var(--alert);
            white-space: nowrap;
            padding: 0 0.25em;
            border-radius: 3px;
            vertical-align: middle;
        }
    }

    & > pre + p {
        padding-left: 0;
    }

    & > .icon {
        width: 1.25em;
        height: 1.25em;
        overflow: hidden;
        border-radius: 3px;
        position: relative;

        * {
            font-size: 1.25em;
            line-height: 1;
        }

        img {
            width: 100%;
            display: block;
            height: 100%;
        }

        &:not(:empty) + .new {
            text-align: left;

            small {
                font-size: 0.6rem;
                top: -1.25em;
                position: relative;
                left: -.625em;
            }
        }
    }

    &:hover:not(.disabled):not(.select) {
        color: var(--toolbar-text);
        text-shadow: 1px 1px var(--toolbar-text_shadow);
    }

    &.disabled {
        opacity: .5;
        cursor: default;
    }

    &.select {
        background-color: var(--toolbar-focus_shadow);
        border-radius: 8px;
        color: var(--toolbar-focus);
        text-shadow: 1px 1px var(--toolbar-text_shadow);
    }
}

</style>
