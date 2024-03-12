<script lang="ts">
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import { afterUpdate } from "svelte";
    import { api } from "../../../stores/api";
    import Text from "$lib/ui/Content/Text.svelte";
    import Pad from "$lib/ui/Content/Pad.svelte";
    import FilterPhotoDateRange from "./FilterPhotoDateRange.svelte";
    import FilterPhotoImagesAlt from "./FilterPhotoImagesAlt.svelte";
    import Gallery from "./Gallery.svelte";
    import Result from "./Result.svelte";


    let mainSlide: Slide;
    let slideShow: Reel;

    afterUpdate(() => {
        mainSlide.focus();
    });

    let page: number = 1;

    let imagesAlt: string | undefined;
    let dateRangeMin: string | undefined;
    let dateRangeMax: string | undefined;
    let addressComponents: string | undefined;

    $: photos = $api.photo
        .apiPhotosGetCollection({
            page,
            dateOrder: "asc",
            dateRangeMin,
            dateRangeMax,
            addressComponents,
            imagesAlt,
        })
        .then((photos) => {
            setTimeout(() => slideShow.track(), 500);

            return photos;
        });
</script>

<Reel id="filters">
    <Slide id="filters" bind:this={mainSlide}>
        <Text><h1>Filtros.</h1></Text>
        <Pad>
            <h2>Cuándo.</h2>
            <FilterPhotoDateRange
                on:change={(e) => {
                    dateRangeMin = e.detail.min;
                    dateRangeMax = e.detail.max;
                }}
            />
            <br />
            <h2>Qué.</h2>
            <FilterPhotoImagesAlt
                on:clear={() => (imagesAlt = undefined)}
                on:change={(e) => {
                    imagesAlt = e.detail.value;
                }}
            />
        </Pad>
    </Slide>
    <Slide id="results">
        <Text><h1>Resultados.</h1></Text>
        <Pad>
            {#await photos then photos}
                <Gallery {photos} />
            {/await}
        </Pad>
    </Slide>
</Reel>
<Reel id="slideshow" bind:this={slideShow}>
    {#await photos then photos}
        {#each photos as photo}
            <Slide id={`photo${photo.id}`}>
                <Result {photo} />
            </Slide>
        {/each}
    {/await}
</Reel>
