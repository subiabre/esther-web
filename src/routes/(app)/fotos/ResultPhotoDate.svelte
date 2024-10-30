<script lang="ts">
    import type { Photo } from "$lib/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import { createEventDispatcher } from "svelte";
    import ResultFormTrigger from "./ResultFormTrigger.svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;

    function displayDate(date: string): string {
        return new Date(date.split("T")[0]).toLocaleDateString();
    }
</script>

<Text>
    <h3>Cuándo.</h3>
    <ResultFormTrigger on:trigger={() => dispatch("openDateForm")}>
        <Labeled label="Fechas entre las que se tomó la fotografía.">
            {displayDate(photo.date.min)}
            -
            {displayDate(photo.date.max || "")}
        </Labeled>
    </ResultFormTrigger>
</Text>
