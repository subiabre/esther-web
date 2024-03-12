<script lang="ts">
    import type { Photo } from "$lib/api";
    import GalleryThumb from "./GalleryThumb.svelte";

    export let photos: Photo[];
</script>

<div>
    {#each photos as photo (photo.id)}
        <GalleryThumb {photo} />
    {/each}
</div>

<style lang="scss">
    div {
        display: grid;
        gap: 1rem;
        grid-auto-flow: dense;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 90px), 1fr));

        @media only screen and (min-width: 855px) {
            grid-template-columns: repeat(
                auto-fit,
                minmax(min(100%, 180px), 1fr)
            );
        }
    }
</style>
