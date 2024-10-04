<script lang="ts">
    import type { Photo } from "$lib/api";
    import { ClickableTile } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let photos: Photo[] = [];
    export let photosTotal: number;

    $: hasPhotosTotal = photos.length === photosTotal;
    $: face = calcFace(photosTotal, photos.length);

    function calcFace(total: number, current: number) {
        const remaining = total - current;

        if (remaining < 50) {
            return "😟";
        }

        if (remaining < 100) {
            return "😅";
        }

        if (remaining > 400) {
            return "😃";
        }

        return "😌";
    }
</script>

<ClickableTile
    light={!hasPhotosTotal}
    disabled={hasPhotosTotal}
    on:click={() => {
        if (hasPhotosTotal) return;

        dispatch("more");
    }}
>
    <h4>
        {face}&nbsp;
        {#if !hasPhotosTotal}
            Cargar más.
        {:else}
            No hay más.
        {/if}
    </h4>
    <p>{photos.length} elementos cargados.</p>
    <p>{photosTotal} elementos filtrados.</p>
</ClickableTile>
