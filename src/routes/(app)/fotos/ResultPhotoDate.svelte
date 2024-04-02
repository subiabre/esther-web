<script lang="ts">
    import type { Photo } from "$lib/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;

    let label: string = "Fotografía tomada entre las dos fechas.";
</script>

<Text>
    <h3>Cuándo.</h3>
    <form on:submit|preventDefault={() => dispatch("openDateForm")}>
        <button type="submit">
            <Labeled {label}>
                {new Date(photo.date.min).toLocaleDateString()}
                |
                {new Date(
                    photo.date.max || photo.dateCreated || "",
                ).toLocaleDateString()}
            </Labeled>
        </button>
    </form>
</Text>

<style>
    button {
        padding: 0;

        text-align: inherit;
        font-size: inherit;
        font-family: inherit;

        border: none;
        background-color: transparent;
    }

    button:hover {
        cursor: pointer;
    }
</style>
