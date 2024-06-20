<script lang="ts">
    import type { Portrait } from "$lib/api";
    import Labeled from "./Labeled.svelte";

    export let portrait: Portrait;

    export let caption: string;
    export let label: string = "";
</script>

<figure>
    <img src={portrait.src} alt={caption} />
    <figcaption>
        <Labeled bottom {label}>
            {caption}
        </Labeled>
    </figcaption>
</figure>

<style>
    figure {
        padding: 0 1rem 0 1rem;

        display: flex;
        align-items: center;
    }

    figure > img {
        width: 3rem;
        height: 3rem;

        border-radius: 100%;

        overflow: hidden;
    }

    figure > figcaption {
        padding: 0 0 0 1rem;
    }
</style>
