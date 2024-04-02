<script lang="ts">
    import type { Photo } from "$lib/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;

    let label: string = "Lugar donde se tomó esta fotografía.";
</script>

<Text>
    <h3>Dónde.</h3>
    <form on:submit|preventDefault={() => dispatch("openAddressForm")}>
        <button type="submit">
            <Labeled {label}>
                {#if photo.address?.shortName}
                    {photo.address.shortName}
                {:else}
                    Desconocido
                {/if}
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
