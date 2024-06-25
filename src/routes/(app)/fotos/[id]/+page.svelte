<script lang="ts">
    import { onMount } from "svelte";
    import { afterNavigate } from "$app/navigation";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import Result from "../Result.svelte";
    import { api } from "$lib/stores/api";
    import { page } from "$app/stores";

    let mainSlide: Slide;

    let photo = $api.photo.apiPhotosIdGet({ id: $page.params.id || "" });

    onMount(() => {
        mainSlide.focus();
    });

    afterNavigate(() => {
        mainSlide.focus();
    });
</script>

<Reel id="slideshow">
    <Slide id="photo" bind:this={mainSlide}>
        {#await photo then photo}
            <Result {photo} />
        {/await}
    </Slide>
</Reel>
