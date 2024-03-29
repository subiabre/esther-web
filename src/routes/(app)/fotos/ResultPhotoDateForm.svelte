<script lang="ts">
    import type { Photo } from "$lib/api";
    import { api } from "$lib/stores/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;

    async function updateDateMin(e: Event) {
        photo = await $api.photo.apiPhotosIdPatch({
            id: photo.id?.toString() || "",
            // @ts-ignore
            requestBody: {
                date: {
                    // @ts-ignore
                    min: e.target?.value || photo.date.min,
                },
            },
        });

        dispatch("update", { photo });
    }

    async function updateDateMax(e: Event) {
        photo = await $api.photo.apiPhotosIdPatch({
            id: photo.id?.toString() || "",
            requestBody: {
                // @ts-ignore
                date: {
                    // @ts-ignore
                    max: e.target?.value || photo.date.max,
                },
            },
        });

        dispatch("update", { photo });
    }
</script>

<Labeled label="Después de">
    <input
        type="date"
        value={photo.date.min.split("T")[0]}
        max={photo.dateCreated?.split("T")[0]}
        on:change={updateDateMin}
    />
</Labeled>
<Labeled label="Antes de">
    <input
        type="date"
        value={photo.date.max?.split("T")[0]}
        max={photo.dateCreated?.split("T")[0]}
        min={photo.date.min?.split("T")[0]}
        on:change={updateDateMax}
    />
</Labeled>

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
