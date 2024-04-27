<script lang="ts">
    import { Modal } from "carbon-components-svelte";
    import type { CancelablePromise, Image, Photo } from "$lib/api";
    import Overlaid from "$lib/ui/Content/Overlaid.svelte";
    import { api } from "$lib/stores/api";
    import ResultImageActions from "./ResultImageActions.svelte";
    import ResultImageAltForm from "./ResultImageAltForm.svelte";
    import ResultPhotoDate from "./ResultPhotoDate.svelte";
    import ResultImageMetadata from "./ResultImageMetadata.svelte";
    import ResultPhotoAddress from "./ResultPhotoAddress.svelte";
    import ResultImagePortraits from "./ResultImagePortraits.svelte";
    import ResultImagePortraitsForm from "./ResultImagePortraitsForm.svelte";

    export let photo: Photo;
    export let source: string;

    let img: HTMLImageElement;
    let image: CancelablePromise<Image> = $api.request.request({
        method: "GET",
        url: source,
    });

    let openMetadata: boolean = false;

    let showKnowledge: boolean = false;
    let showPortraits: boolean = false;
</script>

<figure>
    {#await image then image}
        <img bind:this={img} src={image.src} alt={image.alt} />
        <Modal
            passiveModal
            modalHeading="Metadatos de la imagen"
            bind:open={openMetadata}
        >
            <ResultImageMetadata {image} />
        </Modal>
        <Overlaid
            id={image.id + "portraits"}
            background="solid"
            bind:show={showPortraits}
        >
            <ResultImagePortraitsForm {img} {image} />
        </Overlaid>
        <Overlaid
            id={image.id + "knowledge"}
            bind:show={showKnowledge}
            on:change={() => {
                if (showPortraits) showPortraits = false;
            }}
        >
            <ResultImageActions
                {photo}
                {image}
                on:openAdmin
                on:metadata={() => (openMetadata = !openMetadata)}
            />
            <ResultPhotoDate {photo} on:openDateForm />
            <ResultPhotoAddress {photo} on:openAddressForm />
            <ResultImagePortraits
                {image}
                on:showPortraits={() => {
                    showPortraits = !showPortraits;
                    showKnowledge = !showKnowledge;
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
