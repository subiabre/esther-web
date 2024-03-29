<script lang="ts">
    import type { CancelablePromise, Image, Photo } from "$lib/api";
    import Overlaid from "$lib/ui/Content/Overlaid.svelte";
    import { Modal } from "carbon-components-svelte";
    import ResultImageActions from "./ResultImageActions.svelte";
    import ResultImageAltForm from "./ResultImageAltForm.svelte";
    import ResultPhotoDateForm from "./ResultPhotoDateForm.svelte";
    import { api } from "$lib/stores/api";
    import ResultImageMetadata from "./ResultImageMetadata.svelte";
    import ResultPhotoAddressForm from "./ResultPhotoAddressForm .svelte";

    export let photo: Photo;
    export let source: string;

    let image: CancelablePromise<Image> = $api.request.request({
        method: "GET",
        url: source,
    });

    let open: boolean = false;
</script>

<figure>
    {#await image then image}
        <img src={image.src} alt={image.alt} />
        <Modal passiveModal modalHeading="Metadatos de la imagen" bind:open>
            <ResultImageMetadata {image} />
        </Modal>
        <Overlaid id={image.id || ""}>
            <ResultImageActions {photo} {image} on:metadata={() => open = !open} />
            <ResultPhotoDateForm {photo} />
            <ResultPhotoAddressForm {photo} />
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
