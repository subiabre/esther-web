<script lang="ts">
    import type { Photo } from "$lib/api";
    import PhotoSlideImage from "./PhotoSlideImage.svelte";

    export let photo: Photo;
</script>

{#each photo.images as image}
    <PhotoSlideImage source={image} />
{/each}