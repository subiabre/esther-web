<script lang="ts">
    import type { Image } from "$lib/api";

    export let image: Image;
    export let thumb: boolean = false;

    let src = thumb ? image.thumb?.src : image.src;
</script>

<figure class={thumb ? "thumb" : "full"} style="--bg-img: url({src});">
    <img {src} alt={image.alt} />
</figure>

<style>
    figure {
        width: 100%;
        height: 100%;

        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        overflow: hidden;
    }

    img {
        max-width: 100%;
        max-height: 100%;

        z-index: 1;
        object-fit: fill;
    }

    .thumb::before {
        width: 125%;
        height: 125%;

        z-index: 0;
        content: "";
        position: absolute;

        background-image: var(--bg-img);
        background-position: center;
        background-size: 100% auto;
        filter: blur(10rem);
    }
</style>
