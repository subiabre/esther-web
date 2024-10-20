<script lang="ts">
    import type { Image } from "$lib/api";
    import { onMount } from "svelte";
    import ResultImagePortrait from "./ResultImagePortrait.svelte";

    onMount(() => {
        window.addEventListener("resize", scalePortraitsSize);
    });

    export let img: HTMLImageElement;
    export let image: Image;

    let portraits = [...(image.portraits ?? [])];

    let style = "";

    let imgIsLoaded: boolean = false;

    function scalePortraitsSize() {
        style = `width: ${img.width}px; height: ${img.height}px`;
    }

    function handleImgLoad() {
        scalePortraitsSize();
        imgIsLoaded = true;
    }

    $: if (typeof img !== "undefined") {
        img.addEventListener("load", handleImgLoad);
    }
</script>

<div class="portraits-container">
    <div {style} class="portraits">
        {#if imgIsLoaded}
            {#each portraits as portrait (portrait.id)}
                <ResultImagePortrait {img} {image} {portrait} on:updated />
            {/each}
        {/if}
    </div>
</div>

<style>
    .portraits-container {
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .portraits {
        position: relative;
    }
</style>
