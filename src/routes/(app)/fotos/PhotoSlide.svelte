<script lang="ts">
    import type { Photo } from "$lib/api";
    import Text from "$lib/ui/Content/Text.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import { onMount } from "svelte";
    import PhotoSlideImage from "./PhotoSlideImage.svelte";

    export let photo: Photo;

    export let slideShow: Reel;

    onMount(() => {
        slideShow.track();
    });
</script>

<Slide id="photo_{photo.id}">
    {#each photo.images as image}
        <PhotoSlideImage url={image} />
    {/each}
    <Text>
        <pre>{JSON.stringify(photo, null, 2)}</pre>
    </Text>
</Slide>
