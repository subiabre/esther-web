<script lang="ts">
    import type { Photo } from "$lib/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import { createEventDispatcher } from "svelte";
    import ResultFormTrigger from "./ResultFormTrigger.svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;

    let label: string = "Fechas mínima y máxima de la fotografía.";
</script>

<Text>
    <h3>Cuándo.</h3>
    <ResultFormTrigger on:trigger={() => dispatch("openDateForm")}>
        <Labeled {label}>
            {new Date(photo.date.min).toLocaleDateString()}
            |
            {new Date(
                photo.date.max || photo.dateCreated || "",
            ).toLocaleDateString()}
        </Labeled>
    </ResultFormTrigger>
</Text>
