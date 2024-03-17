<script lang="ts">
    import type { Image, Photo } from "$lib/api";
    import Pad from "$lib/ui/Content/Pad.svelte";
    import { Button } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;
    export let image: Image;

    let imageIndex: number =
        photo.images.findIndex((value) => value.endsWith(`${image.id}`)) + 1;
</script>

<div>
    <span class="image-count">
        <Pad>{imageIndex} / {photo.images.length}</Pad>
    </span>
    <Button title="Metadata" kind="ghost" on:click={() => dispatch("metadata")}>
        🤖
    </Button>
    <a href={image.src} download="" target="_blank">
        <Button title="Descargar" kind="ghost">💾</Button>
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

    .image-count {
        margin-right: auto;
    }
</style>
