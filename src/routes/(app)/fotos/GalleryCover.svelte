<script lang="ts">
    import { type Image, type Photo } from "$lib/api";
    import { createEventDispatcher, onMount } from "svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;
    export let image: Image;

    export let mode: "auto" | "none" | "portrait" | "landscape" = "auto";

    onMount(() => {
        if (mode === "auto") {
            mode = calcMode(image);
        }
    });

    function calcMode(image: Image): "none" | "portrait" | "landscape" {
        const width = image.metadata?.width || 0;
        const height = image.metadata?.height || 0;
        const ratio = width / height;

        if (ratio < 0.8) {
            return "portrait";
        }

        if (ratio > 1.4) {
            return "landscape";
        }

        return "none";
    }
</script>

<a
    href="#P{photo.code}"
    title="Foto {photo.code}"
    class="gallery-thumb {mode}"
>
    <figure on:mouseenter={() => dispatch("teased")}>
        <div class="cover-fill" style="--bg-img: url({image.thumb?.src})" />
        <img src={image.thumb?.src} alt={image.alt} />
    </figure>
</a>

<style>
    a.portrait {
        grid-row: span 2;
    }

    figure {
        width: 100%;
        height: 100%;

        overflow: hidden;
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        opacity: 0.75;
    }

    figure:hover {
        opacity: 1;

        cursor: pointer;
    }

    .cover-fill {
        width: 100%;
        height: 100%;

        position: absolute;

        background-size: cover;
        background-position: center;
        background-image: var(--bg-img);
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }
</style>
