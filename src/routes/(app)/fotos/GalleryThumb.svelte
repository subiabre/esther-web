<script lang="ts">
    import { CancelablePromise, type Image, type Photo } from "$lib/api";
    import { api } from "$lib/stores/api";
    import { soundFxs } from "$lib/stores/fxs";
    import { SkeletonPlaceholder } from "carbon-components-svelte";
    import GalleryCover from "./GalleryCover.svelte";

    export let photo: Photo;

    let cover: CancelablePromise<Image> = $api.request.request({
        method: "GET",
        url: photo.images[0],
    });
</script>

{#await cover}
    <SkeletonPlaceholder style="width: 100%;" />
{:then cover}
    <GalleryCover
        {photo}
        image={cover}
        mode="auto"
        on:teased={() => soundFxs.playClack()}
    />
{/await}
