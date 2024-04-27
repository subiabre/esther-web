<script lang="ts">
    import type { Image } from "$lib/api";
    import ResultImagePortrait from "./ResultImagePortrait.svelte";

    export let img: HTMLImageElement;
    export let image: Image;

    let portraits = [...(image.portraits ?? [])];

    let style = "";

    let imgIsLoaded: boolean = false;
    $: if (typeof img !== "undefined") {
        img.onload = () => {
            style = `width: ${img.width}px; height: ${img.height}px`;
            imgIsLoaded = true;
        };
    }
</script>

<div class="portraits-container">
    <div {style} class="portraits">
        {#if imgIsLoaded}
            {#each portraits as portrait}
                <ResultImagePortrait {img} {image} {portrait} />
            {/each}
        {/if}
    </div>
</div>

<style>
    .portraits-container {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .portraits {
        position: relative;
    }
</style>
