<script lang="ts">
    import type { Photo } from "$lib/api";
    import { api } from "$lib/stores/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import { Button } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;

    let dateMin = photo.date.min?.split("T")[0];
    let dateMax = photo.date.max?.split("T")[0];

    async function updateDate() {
        photo = await $api.photo.apiPhotosIdPatch({
            id: photo.id?.toString() || "",
            // @ts-ignore
            requestBody: {
                date: {
                    min: dateMin,
                    max: dateMax,
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
            bind:value={dateMin}
        />
    </Labeled>
    <Labeled label="Antes de">
        <input
            type="date"
            max={photo.dateCreated?.split("T")[0]}
            min={dateMin}
            bind:value={dateMax}
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
