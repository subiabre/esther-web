<script lang="ts">
    import type { CancelablePromise, Image, Photo } from "$lib/api";
    import { api } from "$lib/stores/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";

    export let image: Image;

    let label: string = "Después de | Antes de";

    let photo: CancelablePromise<Photo> = $api.request.request({
        method: "GET",
        url: image.photo || "",
    });

    async function updateDateMin(e: Event) {
        let data = await photo;

        $api.photo
            // @ts-ignore
            .apiPhotosIdPatch({
                id: data.id?.toString() || "",
                requestBody: {
                    date: {
                        // @ts-ignore
                        min: e.target?.value || data.date.min,
                    },
                    images: data.images,
                },
            })
            .then(() => {
                label = "Fecha mínima actualizada. Gracias por tu ayuda.";
            });
    }

    async function updateDateMax(e: Event) {
        let data = await photo;

        $api.photo
            // @ts-ignore
            .apiPhotosIdPatch({
                id: data.id?.toString() || "",
                requestBody: {
                    // @ts-ignore
                    date: {
                        // @ts-ignore
                        max: e.target?.value || data.date.max,
                    },
                    images: data.images,
                },
            })
            .then(() => {
                label = "Fecha máxima actualizada. Gracias por tu ayuda.";
            });
    }
</script>

<Text>
    <h3>Cuándo.</h3>
    {#await photo then photo}
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
    {/await}
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
