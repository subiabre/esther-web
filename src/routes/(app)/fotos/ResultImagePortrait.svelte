<script lang="ts">
    import type { Image, Portrait } from "$lib/api";

    export let img: HTMLImageElement;

    export let image: Image;
    export let portrait: Portrait;

    let { width, height } = scalePortraitSizes();
    let { offsetX, offsetY } = scalePortraitOffsets();

    function scalePortraitSizes() {
        const widthRatio = (image.metadata?.width ?? 0) / img.width;
        const width = (portrait.width ?? 0) / widthRatio;

        const heightRatio = (image.metadata?.height ?? 0) / img.height;
        const height = (portrait.height ?? 0) / heightRatio;

        return { width, height };
    }

    function scalePortraitOffsets() {
        const widthRatio = (image.metadata?.width ?? 0) / img.width;
        const offsetX = (portrait.offsetX ?? 0) / widthRatio;

        const heightRatio = (image.metadata?.height ?? 0) / img.height;
        const offsetY = (portrait.offsetY ?? 0) / heightRatio;

        return { offsetX, offsetY };
    }
</script>

<div
    style="--src: url({portrait.src});width: {width}px; height: {height}px; left: {offsetX}px; top: {offsetY}px"
/>

<style>
    div {
        --border-size: 3px;
        position: absolute;

        border: var(--border-size) solid white;
        border-radius: 100%;
        box-shadow: 0 0 1rem black;

        background-image: var(--src);
        background-size: calc(100% + calc(var(--border-size) * 2))
            calc(100% + calc(var(--border-size) * 2));
        background-position: center;
    }
</style>
