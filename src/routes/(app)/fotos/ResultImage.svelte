<script lang="ts">
    import { Modal } from "carbon-components-svelte";
    import type { CancelablePromise, Image, Photo } from "$lib/api";
    import Overlaid from "$lib/ui/Content/Overlaid.svelte";
    import { api } from "$lib/stores/api";
    import ResultImageActions from "./ResultImageActions.svelte";
    import ResultImageAltForm from "./ResultImageAltForm.svelte";
    import ResultPhotoDate from "./ResultPhotoDate.svelte";
    import ResultImageDetails from "./ResultImageDetails.svelte";
    import ResultPhotoAddress from "./ResultPhotoAddress.svelte";
    import ResultImagePortraits from "./ResultImagePortraits.svelte";
    import ResultImagePortraitsForm from "./ResultImagePortraitsForm.svelte";
    import ResultPhotoDetails from "./ResultPhotoDetails.svelte";

    export let photo: Photo;
    export let source: string;

    let figure: HTMLElement;
    let img: HTMLImageElement;

    let image: CancelablePromise<Image> = $api.request.request({
        method: "GET",
        url: source,
    });

    let photoDetails: boolean = false;
    let imageDetails: boolean = false;

    let showKnowledge: boolean = false;
    let zKnowledge: number = 100;

    let showPortraits: boolean = false;
    let zPortraits: number = 99;

    let portraits: ResultImagePortraits;
</script>

<figure bind:this={figure}>
    {#await image then image}
        <img
            loading="lazy"
            src={image.src}
            alt={image.alt}
            bind:this={img}
        />
        <Modal
            passiveModal
            modalHeading="Detalles de la fotografía"
            bind:open={photoDetails}
        >
            <ResultPhotoDetails {photo} />
        </Modal>
        <Modal
            passiveModal
            modalHeading="Detalles de la imagen"
            bind:open={imageDetails}
        >
            <ResultImageDetails {image} />
        </Modal>
        <Overlaid
            id={image.id + "portraits"}
            background="solid"
            bind:show={showPortraits}
            bind:zIndex={zPortraits}
            on:change={() => {
                zKnowledge = 99;
                zPortraits = 98;
            }}
        >
            <ResultImagePortraitsForm
                {img}
                {image}
                on:updated={() => portraits.reloadPortraits()}
            />
        </Overlaid>
        <Overlaid
            id={image.id + "knowledge"}
            bind:show={showKnowledge}
            bind:zIndex={zKnowledge}
            on:change={() => {
                if (showPortraits) showPortraits = false;
            }}
        >
            <ResultImageActions
                {photo}
                {image}
                on:openAdmin
                on:photoDetails={() => (photoDetails = !photoDetails)}
                on:imageDetails={() => (imageDetails = !imageDetails)}
            />
            <ResultPhotoDate {photo} on:openDateForm />
            <ResultPhotoAddress {photo} on:openAddressForm />
            <ResultImagePortraits
                {image}
                bind:this={portraits}
                on:showPortraits={() => {
                    showKnowledge = !showKnowledge;
                    showPortraits = !showPortraits;

                    zKnowledge = 98;
                    zPortraits = 99;
                }}
            />
            <ResultImageAltForm {image} />
        </Overlaid>
    {/await}
</figure>

<style>
    figure {
        width: 100%;
        height: 100%;

        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }
</style>
