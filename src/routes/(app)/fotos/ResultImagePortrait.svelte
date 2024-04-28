<script lang="ts">
    import type { Image, Portrait } from "$lib/api";
    import { Popover, Search, SelectableTile } from "carbon-components-svelte";
    import { onMount } from "svelte";

    onMount(() => {
        window.addEventListener("resize", () => {
            const sizes = scalePortraitSizes();
            const offsets = scalePortraitOffsets();

            width = sizes.width;
            height = sizes.height;
            offsetX = offsets.offsetX;
            offsetY = offsets.offsetY;
        });
    });

    export let img: HTMLImageElement;

    export let image: Image;
    export let portrait: Portrait;

    let { width, height } = scalePortraitSizes();
    let { offsetX, offsetY } = scalePortraitOffsets();

    let zIndex: number = 10;

    $: style = `
        --src: url(${portrait.src});
        width: ${width}px;
        height: ${height}px;
        left: ${offsetX}px;
        top: ${offsetY}px;
        z-index: ${zIndex}
        `;

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

    let showPopover: boolean = false;

    function handleMouseEnter() {
        showPopover = true;
        zIndex = 90;
    }

    function handleMouseLeave() {
        showPopover = false;
        zIndex = 10;
    }

    function handleAction(e: Event) {
        e.preventDefault();
    }
</script>

<div
    {style}
    role="searchbox"
    tabindex={20 + (portrait.id ?? 0)}
    on:click={handleAction}
    on:keyup={handleAction}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
>
    <Popover caret align="bottom" bind:open={showPopover}>
        <Search
            size="sm"
            on:keydown={(e) => {
                e.stopPropagation();
                console.log("input");
            }}
        />
        <SelectableTile>Desconocido</SelectableTile>
    </Popover>
</div>

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
