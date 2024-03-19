<script lang="ts">
    import type { Photo } from "$lib/api";
    import { api } from "$lib/stores/api";
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
    import { ClickableTile } from "carbon-components-svelte";
    import FilterPhotoAddress from "./FilterPhotoAddress.svelte";

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
    let dateOrder: "asc" | "desc" = "asc";
    let dateRangeMin: string | undefined;
    let dateRangeMax: string | undefined;
    let addressComponents: string[] | undefined;

    let photos: Photo[] = [];
    let photosTotal: Number = 0;
    let hasPhotosTotal: boolean = true;

    async function load(): Promise<Photo[]> {
        return await $api.photo
            .apiPhotosGetCollection({
                page,
                dateOrder,
                dateRangeMin,
                dateRangeMax,
                addressComponents,
                imagesAlt,
            })
            .finally(() => setTimeout(() => slideShow.track(), 100));
    }

    async function total(): Promise<Number> {
        return await $api.request
            .request({
                url: "/v1/photos",
                query: {
                    "date[range:min]": dateRangeMin,
                    "date[range:max]": dateRangeMax,
                    "address[components][]": addressComponents,
                    "images.alt": imagesAlt,
                },
                method: "GET",
                headers: { Accept: "application/ld+json" },
            })
            .then((res) => {
                // @ts-ignore
                const data = JSON.parse(res);
                return data["hydra:totalItems"];
            });
    }

    async function update() {
        photos = await load();
        photosTotal = await total();
    }

    async function loadmore() {
        const curPhotos = photos;
        const newPhotos = await load();

        photos = [...curPhotos, ...newPhotos];
    }

    $: hasPhotosTotal = photos.length === photosTotal;
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
            <h2>Dónde.</h2>
            <FilterPhotoAddress
                on:change={(e) => {
                    page = 1;
                    addressComponents = e.detail.value;
                    update();
                }}
            />
            <br />
            <h2>Qué.</h2>
            <FilterPhotoImagesAlt
                on:clear={() => {
                    page = 1;
                    imagesAlt = undefined;
                    update();
                }}
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
            <Gallery {photos}>
                <ClickableTile
                    disabled={hasPhotosTotal}
                    on:click={() => {
                        if (hasPhotosTotal) return;

                        page = page + 1;
                        loadmore();
                    }}
                >
                    <p>{photos.length} elementos.</p>
                    {#if hasPhotosTotal}
                        <p>No hay más resultados disponibles.</p>
                    {:else}
                        <p>Cargar más.</p>
                    {/if}
                </ClickableTile>
            </Gallery>
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
