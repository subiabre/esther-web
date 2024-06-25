<script lang="ts">
    import type { Image, Photo } from "$lib/api";
    import { auth } from "$lib/stores/auth";
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
    <strong title="Imagen {imageIndex} de {photo.images.length} en esta foto.">
        <Pad>{imageIndex} / {photo.images.length}</Pad>
    </strong>
    {#if $auth.user?.roles?.includes("ROLE_ADMIN")}
        <Button
            title="Admin"
            kind="ghost"
            on:click={() => dispatch("openAdmin")}>😎</Button
        >
    {/if}
    <Button title="Metadata" kind="ghost" on:click={() => dispatch("metadata")}>
        🤖
    </Button>
    <a href={image.src} download="" target="_blank">
        <Button title="Descargar" kind="ghost">💾</Button>
    </a>
</div>

<style lang="scss">
    @import "/src/styles/vars.scss";

    div {
        position: absolute;
        right: 0;
        bottom: 0;

        display: flex;
        flex-direction: row;
        justify-content: end;

        text-shadow: 1px 1px 1px black;
    }

    @media only screen and (min-width: $breakpoint-sm) {
        div {
            top: 0;
            bottom: auto;
        }
    }
</style>
