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
    import FilterPhotoAddress from "./FilterPhotoAddress.svelte";
    import FilterPhotoAddressKnown from "./FilterPhotoAddressKnown.svelte";
    import Row from "$lib/ui/Content/Row.svelte";
    import FilterPhotoImagesPeople from "./FilterPhotoImagesPeople.svelte";
    import GalleryMore from "./GalleryMore.svelte";
    import FilterPhotoDateOrder from "./FilterPhotoDateOrder.svelte";

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
    let addressKnown: boolean | undefined;
    let addressComponentsArray: string[] | undefined;
    let imagesPortraitsPersonArray: string[] | undefined;

    let photos: Photo[] = [];
    let photosTotal: number = 0;

    async function load(): Promise<Photo[]> {
        return await $api.photo
            .apiPhotosGetCollection({
                page,
                dateOrder,
                dateRangeMin,
                dateRangeMax,
                addressKnown,
                addressComponentsArray,
                imagesAlt,
                imagesPortraitsPersonArray,
            })
            .finally(() => setTimeout(() => slideShow.track(), 100));
    }

    async function total(): Promise<number> {
        return await $api.request
            .request({
                url: "/v1/photos",
                query: {
                    "date[range.min]": dateRangeMin,
                    "date[range.max]": dateRangeMax,
                    "address[known]": addressKnown,
                    "address[components][]": addressComponentsArray,
                    "images.alt": imagesAlt,
                    "images.portraits.person[]": imagesPortraitsPersonArray,
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
</script>

<svelte:head>
    <title>Explorar | Esther</title>
</svelte:head>

<Reel id="filters">
    <Slide id="filters" bind:this={mainSlide}>
        <Text><h1>Filtros.</h1></Text>
        <Pad>
            <Row>
                <h2>Cuándo.</h2>
                <FilterPhotoDateOrder
                    on:change={(e) => {
                        dateOrder = e.detail.order;
                        update();
                    }}
                />
            </Row>
            <FilterPhotoDateRange
                on:change={(e) => {
                    page = 1;
                    dateRangeMin = e.detail.min;
                    dateRangeMax = e.detail.max;
                    update();
                }}
            />
        </Pad>
        <Pad>
            <Row>
                <h2>Dónde.</h2>
                <FilterPhotoAddressKnown
                    on:change={(e) => {
                        addressKnown = e.detail.known;
                        addressComponentsArray = undefined;
                        update();
                    }}
                />
            </Row>
            <FilterPhotoAddress
                disabled={typeof addressKnown === "undefined" ? false : true}
                on:change={(e) => {
                    page = 1;
                    addressComponentsArray = e.detail.places;
                    update();
                }}
            />
        </Pad>
        <Pad>
            <Row>
                <h2>Quién.</h2>
            </Row>
            <FilterPhotoImagesPeople
                on:change={(e) => {
                    page = 1;
                    imagesPortraitsPersonArray = e.detail.people;
                    update();
                }}
            />
        </Pad>
        <Pad>
            <Row>
                <h2>Qué.</h2>
            </Row>
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
                <GalleryMore
                    {photos}
                    {photosTotal}
                    on:more={() => {
                        page = page + 1;
                        loadmore();
                    }}
                />
            </Gallery>
        </Pad>
    </Slide>
</Reel>
<Reel id="slideshow" bind:this={slideShow}>
    {#each photos as photo (photo.code)}
        <Slide id={photo.code || ""}>
            <Result {photo} />
        </Slide>
    {/each}
</Reel>
