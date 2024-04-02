<script lang="ts">
    import type { Photo } from "$lib/api";
    import { api } from "$lib/stores/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import { Button } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;

    let inputMin: HTMLInputElement;
    let dateMin = photo.date.min?.split("T")[0];

    let inputMax: HTMLInputElement;
    let dateMax = photo.date.max?.split("T")[0];

    async function updateDate() {
        photo = await $api.photo.apiPhotosIdPatch({
            id: photo.id?.toString() || "",
            // @ts-ignore
            requestBody: {
                date: {
                    min: inputMin.value,
                    max: inputMax.value,
                },
            },
        });

        dispatch("update", { photo });
    }
</script>

<form on:submit|preventDefault={updateDate}>
    <Labeled label="Después de">
        <input
            type="date"
            max={dateMax}
            value={dateMin}
            bind:this={inputMin}
        />
    </Labeled>
    <Labeled label="Antes de">
        <input
            type="date"
            max={photo.dateCreated?.split("T")[0]}
            min={dateMin}
            value={dateMax}
            bind:this={inputMax}
        />
    </Labeled>
    <Button type="submit">Actualizar</Button>
</form>

<style>
    input {
        padding: 0;

        color: white;
        font-size: inherit;
        font-family: inherit;

        border: none;
        outline: none;
        background-color: transparent;
    }
</style>
