<script lang="ts">
    import type { Photo } from "$lib/api";
    import Grid from "$lib/ui/Content/Grid.svelte";
    import GalleryThumb from "./GalleryThumb.svelte";

    export let photos: Photo[];
</script>

<Grid columns={3}>
    {#each photos as photo (photo.id)}
        <GalleryThumb {photo} />
    {/each}
    <slot />
</Grid>
