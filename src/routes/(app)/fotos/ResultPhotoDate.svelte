<script lang="ts">
    import type { Photo } from "$lib/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;

    let label: string = "Después de | Antes de";
</script>

<Text>
    <h3>Cuándo.</h3>
    <Labeled {label}>
        <form on:submit|preventDefault={() => dispatch("openDateForm")}>
            <button type="submit">
                {new Date(photo.date.min).toLocaleDateString()}
                |
                {new Date(
                    photo.date.max || photo.dateCreated || "",
                ).toLocaleDateString()}
            </button>
        </form>
    </Labeled>
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
        cursor: text;
    }
</style>
