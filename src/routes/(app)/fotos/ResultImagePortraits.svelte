<script lang="ts">
    import type { Image } from "$lib/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import { createEventDispatcher } from "svelte";
    import ResultFormTrigger from "./ResultFormTrigger.svelte";
    import ResultImagePortraitsPeople from "./ResultImagePortraitsPeople.svelte";

    const dispatch = createEventDispatcher();

    export let image: Image;

    $: hasPortraits = image.portraits && image.portraits?.length > 0;
</script>

<Text>
    <h3>Quién.</h3>
    <ResultFormTrigger
        disabled={!hasPortraits}
        on:trigger={() => dispatch("showPortraits")}
    >
        <Labeled label="Personas que aparecen en esta imagen.">
            {#if hasPortraits}
                <ResultImagePortraitsPeople portraits={image.portraits} />
            {:else}
                Nadie
            {/if}
        </Labeled>
    </ResultFormTrigger>
</Text>
