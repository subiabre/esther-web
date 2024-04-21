<script lang="ts">
    import type { Photo } from "$lib/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import { createEventDispatcher } from "svelte";
    import ResultFormTrigger from "./ResultFormTrigger.svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;

    let label: string = "Lugar donde se tomó esta fotografía.";
</script>

<Text>
    <h3>Dónde.</h3>
    <ResultFormTrigger on:trigger={() => dispatch("openAddressForm")}>
        <Labeled {label}>
            {#if photo.address?.shortName}
                {photo.address.shortName}
            {:else}
                Desconocido
            {/if}
        </Labeled>
    </ResultFormTrigger>
</Text>
