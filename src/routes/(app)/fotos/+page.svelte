<script lang="ts">
    import { afterNavigate } from "$app/navigation";
    import Text from "$lib/ui/Content/Text.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import { onMount } from "svelte";
    import PhotoDateRangeFilter from "./PhotoDateRangeFilter.svelte";
    import Pad from "$lib/ui/Content/Pad.svelte";
    import Grid from "$lib/ui/Content/Grid/Grid.svelte";
    import { api } from "../../../stores/api";
    import { SkeletonPlaceholder, Tile } from "carbon-components-svelte";
    import PhotoSlide from "./PhotoSlide.svelte";

    let slideShow: Reel;
    let mainSlide: Slide;

    onMount(() => {
        mainSlide.focus();
    });

    afterNavigate(() => {
        mainSlide.focus();
    });

    let photos = $api.photo.apiPhotosGetCollection(1);

    function updateDateRange(e: CustomEvent) {
        photos = $api.photo.apiPhotosGetCollection(
            1,
            new Date(e.detail.min, 0, 2).toISOString().split("T")[0],
            new Date(e.detail.max, 11, 32).toISOString().split("T")[0],
        );
    }
</script>

<Reel id="filtros">
    <Slide id="filtros" bind:this={mainSlide}>
        <Text>
            <h1>Filtros.</h1>
        </Text>
        <Text>
            <h2>Cuándo.</h2>
        </Text>
        <Pad>
            <PhotoDateRangeFilter on:change={updateDateRange} />
        </Pad>
        <Text>
            <h2>Dónde.</h2>
            <h2>Quiénes.</h2>
            <h2>Qué.</h2>
        </Text>
    </Slide>
    <Slide id="galeria">
        <Text>
            <h1>Galería.</h1>
        </Text>
        <Pad>
            <Grid>
                {#await photos}
                    <SkeletonPlaceholder />
                {:then photos}
                    {#each photos as photo}
                        <Tile>
                            <pre>{JSON.stringify(photo, null, 2)}</pre>
                        </Tile>
                    {/each}
                {/await}
            </Grid>
        </Pad>
    </Slide>
</Reel>
<Reel id="slideshow" bind:this={slideShow}>
    {#await photos then photos}
        {#each photos as photo}
            <PhotoSlide {photo} {slideShow} />
        {/each}
    {/await}
    <Slide id="end" />
</Reel>
