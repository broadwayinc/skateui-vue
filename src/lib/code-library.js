export const cardExample1 = () => {
return `<sui-card style="max-width: 300px" content-center>
    <template #title>Title</template>
    <template #image>
        <img src="..." />
    </template>
    <template #content>
        Content: Create beautiful components in minutes!
    </template>
    <template #buttonFooter>Skates On!</template>
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