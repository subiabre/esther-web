<script lang="ts">
    import type { Photo } from "$lib/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import { afterUpdate, createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;

    let label: string = "Lugar donde se tomó esta fotografía";
</script>

<Text>
    <h3>Dónde.</h3>
    <Labeled {label}>
        <form on:submit|preventDefault={() => dispatch("submit")}>
            <button type="submit">
                {#if photo.address?.shortName}
                    {photo.address.shortName}
                {:else}
                    Desconocido
                {/if}
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
