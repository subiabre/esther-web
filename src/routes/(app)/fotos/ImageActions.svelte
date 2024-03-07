<script lang="ts">
    import type { Image } from "$lib/api";
    import FileSize from "$lib/ui/Content/FileSize.svelte";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import { Button, CodeSnippet, Modal } from "carbon-components-svelte";

    export let image: Image;

    let open: boolean = false;
</script>

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
<div>
    <Button
        title="Metadata"
        size="field"
        kind="ghost"
        on:click={() => (open = true)}
    >
        🤖
    </Button>
    <a href={image.src} download="" target="_blank">
        <Button title="Descargar" size="field" kind="ghost">💾</Button>
    </a>
</div>

<style>
    div {
        width: 100%;
        margin-bottom: auto;

        display: flex;
        flex-direction: row;
        justify-content: end;
    }
</style>
