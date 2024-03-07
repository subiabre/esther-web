<script lang="ts">
    import Pad from "$lib/ui/Content/Pad.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import { afterUpdate } from "svelte";
    import { api } from "../../../stores/api";
    import DateRangeFilter from "./DateRangeFilter.svelte";
    import PhotoGallery from "./PhotoGallery.svelte";
    import PhotoSlide from "./PhotoSlide.svelte";

    let mainSlide: Slide;
    let slideShow: Reel;

    afterUpdate(() => {
        mainSlide.focus();
    });

    let page: number = 1;

    let dateRangeMin: string | undefined;
    let dateRangeMax: string | undefined;

    $: photos = $api.photo.apiPhotosGetCollection(
        page,
        dateRangeMin,
        dateRangeMax,
        "asc",
    ).then((photos) => {
        setTimeout(() => slideShow.track(), 500);

        return photos;
    });
</script>

<Reel id="filters">
    <Slide id="filters" bind:this={mainSlide}>
        <Text><h1>Filtros.</h1></Text>
        <Pad>
            <h2>Cuándo.</h2>
            <DateRangeFilter
                on:change={(e) => {
                    dateRangeMin = e.detail.min;
                    dateRangeMax = e.detail.max;
                }}
            />
        </Pad>
    </Slide>
    <Slide id="results">
        <Text><h1>Resultados.</h1></Text>
        <Pad>
            {#await photos then photos}
                <PhotoGallery {photos} />
            {/await}
        </Pad>
    </Slide>
</Reel>
<Reel id="slideshow" bind:this={slideShow}>
    {#await photos then photos}
        {#each photos as photo}
            <Slide id={`photo_${photo.id}`}>
                <PhotoSlide {photo} />
            </Slide>
        {/each}
    {/await}
</Reel>
