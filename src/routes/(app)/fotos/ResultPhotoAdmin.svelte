<script lang="ts">
    import type { Photo, PhotoScope } from "$lib/api";
    import { api } from "$lib/stores/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import { Tag } from "carbon-components-svelte";

    export let photo: Photo;

    let scopes = photo.scopes ?? [];

    let inputElement: HTMLInputElement;

    function handleInput() {
        inputElement.style.width = `${inputElement.value.length}ch`;
    }

    async function handleSubmit() {
        photo = await $api.photo.apiPhotosIdPatch({
            id: photo.id?.toString() || "",
            // @ts-ignore
            requestBody: {
                scopes: [...scopes, { role: inputElement.value }],
            },
        });

        scopes = photo.scopes ?? [];
        inputElement.value = "";
    }

    async function handleRemove(scope: PhotoScope) {
        photo = await $api.photo.apiPhotosIdPatch({
            id: photo.id?.toString() || "",
            // @ts-ignore
            requestBody: {
                scopes: [...scopes.filter((s) => s.role !== scope.role)],
            },
        });

        scopes = photo.scopes ?? [];
    }
</script>

<Labeled label="Visible para los siguientes roles">
    {#each scopes as scope}
        <Tag filter title="Revocar" on:close={() => handleRemove(scope)}>{scope.role}</Tag>
    {/each}
    <Tag>
        <form on:submit|preventDefault={handleSubmit}>
            <input
                type="text"
                placeholder="Añadir rol"
                bind:this={inputElement}
                on:input={handleInput}
            />
        </form>
    </Tag>
</Labeled>

<style>
    input {
        width: 10ch;
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
