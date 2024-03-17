<script lang="ts">
    import type { Photo } from "$lib/api";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import Pad from "$lib/ui/Content/Pad.svelte";
    import { afterNavigate } from "$app/navigation";
    import { onMount } from "svelte";
    import FilterPhotoDateRange from "./FilterPhotoDateRange.svelte";
    import FilterPhotoImagesAlt from "./FilterPhotoImagesAlt.svelte";
    import Gallery from "./Gallery.svelte";
    import Result from "./Result.svelte";
    import { api } from "../../../stores/api";

    let mainSlide: Slide;
    let slideShow: Reel;

    onMount(() => {
        update();
        mainSlide.focus();
    });

    afterNavigate(() => {
        mainSlide.focus();
    });

    let page: number = 1;

    let imagesAlt: string | undefined;
    let dateRangeMin: string | undefined;
    let dateRangeMax: string | undefined;
    let addressComponents: string | undefined;

    let photos: Photo[] = [];

    async function load(): Promise<Photo[]> {
        return await $api.photo
            .apiPhotosGetCollection({
                page,
                dateOrder: "asc",
                dateRangeMin,
                dateRangeMax,
                addressComponents,
                imagesAlt,
            })
            .finally(() => setTimeout(() => slideShow.track(), 100));
    }

    async function update() {
        photos = await load();
    }

    async function loadmore() {
        const curPhotos = photos;
        const newPhotos = await load();

        photos = [...curPhotos, ...newPhotos];
    }
</script>

<Reel id="filters">
    <Slide id="filters" bind:this={mainSlide}>
        <Text><h1>Filtros.</h1></Text>
        <Pad>
            <h2>Cuándo.</h2>
            <FilterPhotoDateRange
                on:change={(e) => {
                    page = 1;
                    dateRangeMin = e.detail.min;
                    dateRangeMax = e.detail.max;
                    update();
                }}
            />
            <br />
            <h2>Qué.</h2>
            <FilterPhotoImagesAlt
                on:clear={() => (imagesAlt = undefined)}
                on:change={(e) => {
                    page = 1;
                    imagesAlt = e.detail.value;
                    update();
                }}
            />
        </Pad>
    </Slide>
    <Slide id="results">
        <Text><h1>Resultados.</h1></Text>
        <Pad>
            <Gallery
                {page}
                {photos}
                on:loadmore={() => {
                    page = page + 1;
                    loadmore();
                }}
            />
        </Pad>
    </Slide>
</Reel>
<Reel id="slideshow" bind:this={slideShow}>
    {#each photos as photo (photo.id)}
        <Slide id={`photo${photo.id}`}>
            <Result {photo} />
        </Slide>
    {/each}
</Reel>
