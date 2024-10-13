<script lang="ts">
    import type { Image } from "$lib/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import { createEventDispatcher } from "svelte";
    import ResultFormTrigger from "./ResultFormTrigger.svelte";
    import ResultImagePortraitsPeople from "./ResultImagePortraitsPeople.svelte";
    import { api } from "$lib/stores/api";

    const dispatch = createEventDispatcher();

    export let image: Image;

    $: portraits = image.portraits;
    $: hasPortraits = portraits && portraits?.length > 0;

    export async function reloadPortraits() {
        const data = await $api.image.apiImagesIdGet({
            id: image?.id?.toString() ?? "",
        });

        portraits = data.portraits;
    }
</script>

<Text>
    <h3>Quién.</h3>
    <ResultFormTrigger
        disabled={!hasPortraits}
        on:trigger={() => dispatch("showPortraits")}
    >
        <Labeled label="Personas que aparecen en esta imagen.">
            {#if hasPortraits}
                <ResultImagePortraitsPeople {portraits} />
            {:else}
                Nadie
            {/if}
        </Labeled>
    </ResultFormTrigger>
</Text>
