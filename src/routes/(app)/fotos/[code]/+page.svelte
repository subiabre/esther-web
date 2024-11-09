<script lang="ts">
    import { onMount } from "svelte";
    import { afterNavigate } from "$app/navigation";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import Result from "../Result.svelte";
    import { api } from "$lib/stores/api";
    import { page } from "$app/stores";
    import Error from "$lib/ui/Content/Error.svelte";

    let mainSlide: Slide;

    let photo = $api.photo.apiPhotosCodeGet({ code: $page.params.code || "" });

    onMount(() => {
        mainSlide.focus();
    });

    afterNavigate(() => {
        mainSlide.focus();
    });
</script>

<svelte:head>
    <title>{$page.params.code} | Esther</title>
</svelte:head>

<Reel id="slideshow">
    <Slide id="photo" bind:this={mainSlide}>
        {#await photo then photo}
            <Result {photo} />
        {:catch}
            <Error messages={["La foto que buscas no existe."]} />
        {/await}
    </Slide>
</Reel>
