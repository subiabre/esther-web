<script lang="ts">
    import type { Photo } from "$lib/api";
    import ResultImage from "./ResultImage.svelte";

    export let photo: Photo;
</script>

{#each photo.images as image}
    <ResultImage {photo} source={image} />
{/each}