<script lang="ts">
    import type { Image, Photo } from "$lib/api";
    import FileSize from "$lib/ui/Content/FileSize.svelte";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Pad from "$lib/ui/Content/Pad.svelte";
    import { Button, CodeSnippet, Modal } from "carbon-components-svelte";

    export let photo: Photo;
    export let image: Image;

    let imageIndex: number =
        photo.images.findIndex((value) => value.endsWith(`${image.id}`)) + 1;

    let open: boolean = false;
</script>

<div>
    <span class="image-count">
        <Pad>{imageIndex} / {photo.images.length}</Pad>
    </span>
    <Button title="Metadata" kind="ghost" on:click={() => (open = true)}>
        🤖
    </Button>
    <a href={image.src} download="" target="_blank">
        <Button title="Descargar" kind="ghost">💾</Button>
    </a>
    <Modal passiveModal modalHeading="Metadatos de la imagen" bind:open>
        <Labeled label="Dimensiones">
            {image.metadata?.width} x {image.metadata?.height}
        </Labeled>
        <Labeled label="Tamaño">
            <FileSize size={image.metadata?.filesize || 0} />
        </Labeled>
        <Labeled label="EXIF" />
        <CodeSnippet
            expanded
            type="multi"
            code={JSON.stringify(image.metadata?.exif, null, 2)}
        />
    </Modal>
</div>

<style>
    div {
        width: 100%;
        margin-bottom: auto;

        display: flex;
        flex-direction: row;
        justify-content: end;
    }

    .image-count {
        margin-right: auto;
    }
</style>
