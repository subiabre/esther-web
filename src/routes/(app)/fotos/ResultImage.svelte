<script lang="ts">
    import type { CancelablePromise, Image, Photo } from "$lib/api";
    import Overlaid from "$lib/ui/Content/Overlaid.svelte";
    import { CodeSnippet, Modal } from "carbon-components-svelte";
    import ResultImageActions from "./ResultImageActions.svelte";
    import ResultImageAltForm from "./ResultImageAltForm.svelte";
    import ResultImageDateRangeForm from "./ResultImageDateRangeForm.svelte";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import FileSize from "$lib/ui/Content/FileSize.svelte";
    import { api } from "$lib/stores/api";

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
            <Labeled label="Archivo">
                {image.src}
            </Labeled>
            <Labeled label="Dimensiones">
                {image.metadata?.width} x {image.metadata?.height}
            </Labeled>
            <Labeled label="Tamaño">
                <FileSize size={image.metadata?.filesize || 0} />
            </Labeled>
            <Labeled label="MIME">
                {image.metadata?.mimeType}
            </Labeled>
            <Labeled label="EXIF" />
            <CodeSnippet
                expanded
                type="multi"
                code={JSON.stringify(image.metadata?.exif, null, 2)}
            />
        </Modal>
        <Overlaid id={image.id || ""}>
            <ResultImageActions {photo} {image} on:metadata={() => open = !open} />
            <ResultImageDateRangeForm {image} />
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
