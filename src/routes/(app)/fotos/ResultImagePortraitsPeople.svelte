<script lang="ts">
    import type { Portrait } from "$lib/api";
    import ResultImagePortraitsPerson from "./ResultImagePortraitsPerson.svelte";

    export let portraits: Portrait[] | undefined;
    $: portraitsWithPerson =
        portraits
            ?.filter((portrait) => {
                return typeof portrait.person !== "undefined";
            })
            .slice(0, 2) || [];
</script>

{#if typeof portraits !== "undefined"}
    {#if portraitsWithPerson.length > 0}
        {#each portraitsWithPerson as portrait, index}
            <ResultImagePortraitsPerson
                {portrait}
                {index}
                length={portraitsWithPerson.length}
            />
        {/each}
        {#if portraits.length > portraitsWithPerson.length}
            y {portraits.length - portraitsWithPerson.length} personas más
        {/if}
    {:else}
        {portraits.length} personas
    {/if}
{/if}
