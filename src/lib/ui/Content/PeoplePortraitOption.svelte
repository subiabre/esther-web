<script lang="ts">
    import type { Portrait } from "$lib/api";
    import Labeled from "./Labeled.svelte";

    export let portrait: Portrait;

    export let caption: string;
    export let label: string = "";

    export let disabled: boolean = false;
</script>

<figure class={disabled ? "disabled" : "enabled"}>
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

    figure.disabled {
        opacity: 0.5;
    }

    figure > img {
        width: 100%;
        max-width: 3rem;

        height: auto;
        max-height: 3rem;

        border-radius: 100%;

        overflow: hidden;
    }

    figure > figcaption {
        padding: 0 0 0 1rem;
    }
</style>
