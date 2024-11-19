<script lang="ts">
    import type { Photo } from "$lib/api";
    import { api } from "$lib/stores/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import { Tag } from "carbon-components-svelte";

    export let photo: Photo;

    let reel = photo.reel;

    let inputElement: HTMLInputElement;

    function handleInput() {
        inputElement.style.width = `${inputElement.value.length}ch`;
    }

    async function updateReel(reel: string) {
        return await $api.photo.apiPhotosCodePatch({
            code: photo.code || "",
            // @ts-ignore
            requestBody: {
                reel: reel,
            },
        });
    }

    async function handleSubmit() {
        photo = await updateReel(inputElement.value);

        reel = photo.reel;
    }

    async function handleRemove() {
        photo = await updateReel("");

        reel = photo.reel;
    }
</script>

<Labeled label="Perteneciente al grupo">
    {#if reel}
        <Tag filter title="Quitar del grupo" on:close={handleRemove}>
            {reel}
        </Tag>
    {:else}
        <Tag>
            <form on:submit|preventDefault={handleSubmit}>
                <input
                    type="text"
                    placeholder="Grupo"
                    bind:this={inputElement}
                    on:input={handleInput}
                />
            </form>
        </Tag>
    {/if}
</Labeled>

<style>
    input {
        width: 15ch;
        min-width: 10ch;

        margin: 0;
        padding: 0;

        font-size: inherit;
        font-family: inherit;

        border: none;
        outline: none;
        background: transparent;
    }
</style>
