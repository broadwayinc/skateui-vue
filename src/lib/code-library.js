export const cardPropContentCenter = () => {
return `<sui-card style="max-width: 300px" content-center>
    <template #title>Title is not centered</template>
    <template #image>
        <img src="..." />
    </template>
    <template #content>
        Content is centered
    </template>
    <template #buttonFooter>
        <sui-button>Button is Centered</sui-button>
    </template>
    <template #footer>Footer is centered</template>
</sui-card>`
}

export const cardPropStickyMobileButtonFooter = () => {
    return `<sui-card style="max-width: 300px" sticky-mobile-button-footer>
    <template #content>
        The button below will be stickied on mobile devices.
    </template>
    <template #buttonFooter>
        <sui-button>Sticky Button</sui-button>    
    </template>
</sui-card>`
}

export const cardPropDisabled = () => {
return `<sui-card style="max-width: 300px" disabled>
    <template #title>Title has not been disabled</template>
    <template #image>
        <img src="..." />
    </template>
    <template #content>
        Content has been disabled
    </template>
    <template #buttonFooter>
        <sui-button>Button Disabled</sui-button>
    </template>
    <template #footer>Footer Disabled</template>
</sui-card>`
}

export const cardPropStickyTitle = () => {
    return `<sui-card style="max-width: 300px" sticky-title>
    <template #title>Title is Sticky</template>
    <template #image>
        <img src="..." />
    </template>
    <template #content>
        This is some random content to create length to show the scrolling of the title.
    </template>
</sui-card>`
}

export const cardExample1 = () => {
return `<sui-card style="max-width: 300px" content-center>
    <template #title>Title</template>
    <template #image>
        <img src="..." />
    </template>
    <template #content>
        Content: Create beautiful components in minutes!
        <img src="..." />g
    </template>
    <template #buttonFooter>
        <sui-button>Click Me</sui-button>
    </template>
    <template #footer>Footer</template>
</sui-card>`
}

export const cardExample2 = () => {
return `<!--Content only-->
<sui-card style="max-width: 250px; margin-right: 8px;" content-center>
    <template #content>
        I have nothing but content!
    </template>
</sui-card>

<!--Content and image-->
<sui-card style="max-width: 250px;">
    <template #image>
        <img src="..." />
    </template>
    <template #content>
        Some Description
    </template>
</sui-card>`
}

export const buttonPropType = () => {
    return `<sui-button>BUTTON</sui-button>
<sui-button type="nude">NUDE</sui-button>
<sui-button type="icon" icon="translate"></sui-button>`
}

export const buttonPropLoading = () => {
    return `<sui-button loading>BUTTON</sui-button>
<sui-button type="nude" loading>NUDE</sui-button>`
}

export const buttonPropCustomStyle = () => {
    return `<sui-button :customStyle="{color: '#ff00ff', backgroundColor: 'pink'}">BUTTON</sui-button>
<sui-button type="nude" :customStyle="{color: '#ff00ff'}">NUDE</sui-button>`
}

export const buttonEventClick = () => {
    return `<sui-button @click="sayHi()">Say Hi!</sui-button>`
}

export const accordionPropTitle = () => {
    return `<sui-accordion title="Skate-UI Poem">
    Roses are red
    Violets are blue
    Skate UI is easy
    Just like ABC
</sui-accordion>`
}

export const accordionExample1 = () => {
    return `<sui-accordion title="List #1">
    Please go to the market whenever you are free.
</sui-accordion>
<sui-accordion title="List #2">
    Please go to bed before 10pm.
</sui-accordion>
<sui-accordion title="List #3">
    Please go school before 9am.
</sui-accordion>`
}