<script lang="ts">
    import type { Photo } from "$lib/api";
    import { ClickableTile } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let photos: Photo[] = [];
    export let photosTotal: number;

    $: hasPhotosTotal = photos.length === photosTotal;
    $: face = calcFace(photosTotal, photos.length);

    function calcRemaining(total: number, current: number) {
        return total - current;
    }

    function calcFace(total: number, current: number) {
        const remaining = calcRemaining(total, current);

        if (remaining === 0) {
            return "😵";
        }

        if (remaining < 30) {
            return "😓";
        }

        if (remaining < 60) {
            return "😅";
        }

        if (remaining > 120) {
            return "😧";
        }

        return "😌";
    }
</script>

<ClickableTile
    title="Cargar más"
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
            {calcRemaining(photosTotal, photos.length)} fotos más.
        {:else}
            No hay más.
        {/if}
    </h4>
    <p>{photosTotal} fotos filtradas.</p>
    <p>{photos.length} fotos cargadas.</p>
</ClickableTile>
