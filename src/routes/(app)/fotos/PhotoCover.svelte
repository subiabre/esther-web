<script lang="ts">
    import type { Image, Photo } from "$lib/api";
    import { SkeletonPlaceholder } from "carbon-components-svelte";
    import { api } from "../../../stores/api";
    import PhotoCoverThumb from "./PhotoCoverThumb.svelte";

    export let photo: Photo;

    let cover: Promise<Image> = $api.request.request({
        method: "GET",
        url: photo.images[0],
    });
</script>

{#await cover}
    <SkeletonPlaceholder style="height: 236px; width: 100%;" />
{:then cover}
    <PhotoCoverThumb {cover} />
{/await}
