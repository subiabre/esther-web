<script lang="ts">
    import type { Image, Photo } from "$lib/api";
    import { auth } from "$lib/stores/auth";
    import Pad from "$lib/ui/Content/Pad.svelte";
    import { Button, Popover } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;
    export let image: Image;

    let imageIndex: number =
        photo.images.findIndex((value) => value.endsWith(`${image.id}`)) + 1;

    let copyFeedback: boolean = false;
    function copyLink() {
        const link = window.location.host.concat(`/fotos/${photo.id}`);

        if (navigator.clipboard) {
            navigator.clipboard.writeText(link);
        } else {
            const copyHelper = document.createElement("textarea");

            copyHelper.value = link;
            copyHelper.style.width = "0px";
            copyHelper.style.height = "0px";

            document.body.appendChild(copyHelper);

            copyHelper.select();

            document.execCommand("copy");
            document.body.removeChild(copyHelper);
        }

        copyFeedback = true;
        setTimeout(() => (copyFeedback = false), 1300);
    }
</script>

<div>
    <Button
        title="Mostrar detalles de imagen"
        kind="ghost"
        on:click={() => dispatch("imageDetails")}
    >
        📃
    </Button>
    <a href={image.src} download="" target="_blank">
        <Button title="Abrir imagen en una pestaña nueva" kind="ghost"
            >👀</Button
        >
    </a>
    <strong title="Imagen {imageIndex} de {photo.images.length} en esta foto.">
        <Pad>{imageIndex} / {photo.images.length}</Pad>
    </strong>
    <Button
        title="Mostrar detalles de foto"
        kind="ghost"
        on:click={() => dispatch("photoDetails")}>📄</Button
    >
    {#if $auth.user?.roles?.includes("ROLE_ADMIN")}
        <Button
            title="Administrar foto"
            kind="ghost"
            on:click={() => dispatch("openAdmin")}>😎</Button
        >
    {/if}
    <Button title="Copiar enlace de la foto" kind="ghost" on:click={copyLink}>
        🔗
        <Popover align="left" bind:open={copyFeedback}>
            <p>¡Enlace copiado!</p>
        </Popover>
    </Button>
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
