<script lang="ts">
    import type { Photo } from "$lib/api";
    import { api } from "$lib/stores/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";

    export let photo: Photo;

    let label: string = "Después de | Antes de";

    async function updateDateMin(e: Event) {
        $api.photo
            // @ts-ignore
            .apiPhotosIdPatch({
                id: photo.id?.toString() || "",
                requestBody: {
                    date: {
                        // @ts-ignore
                        min: e.target?.value || photo.date.min,
                    },
                    images: photo.images,
                },
            })
            .then(() => {
                label = "Fecha mínima actualizada. Gracias por tu ayuda.";
            });
    }

    async function updateDateMax(e: Event) {
        $api.photo
            // @ts-ignore
            .apiPhotosIdPatch({
                id: photo.id?.toString() || "",
                requestBody: {
                    // @ts-ignore
                    date: {
                        // @ts-ignore
                        max: e.target?.value || photo.date.max,
                    },
                    images: photo.images,
                },
            })
            .then(() => {
                label = "Fecha máxima actualizada. Gracias por tu ayuda.";
            });
    }
</script>

<Text>
    <h3>Cuándo.</h3>
    <Labeled {label}>
        <input
            type="date"
            value={photo.date.min.split("T")[0]}
            max={photo.dateCreated?.split("T")[0]}
            on:change={updateDateMin}
        />
        |
        <input
            type="date"
            value={photo.date.max?.split("T")[0]}
            max={photo.dateCreated?.split("T")[0]}
            min={photo.date.min?.split("T")[0]}
            on:change={updateDateMax}
        />
    </Labeled>
</Text>

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
