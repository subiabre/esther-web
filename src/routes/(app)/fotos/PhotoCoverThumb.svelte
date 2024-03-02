<script lang="ts">
    import type { Image } from "$lib/api";
    import ImageDisplay from "./ImageDisplay.svelte";

    export let cover: Image;
    export let mode: "auto" | "none" | "landscape" | "portrait" = "auto";

    let ratio = (cover.metadata?.width || 0) / (cover.metadata?.height || 0);
    if (mode === "auto") {
        mode = "none";

        if (ratio < 0.69) {
            mode = "portrait";
        }

        if (ratio > 1.99) {
            mode = "landscape";
        }
    }
</script>

<div class={`mode ${mode}`}>
    <ImageDisplay thumb image={cover} />
</div>

<style>
    .mode.portrait {
        grid-row: span 2;
    }

    .mode.landscape {
        grid-column: span 2;
    }
</style>
