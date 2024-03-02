<script lang="ts">
    import type { Image } from "$lib/api";
    import { SkeletonPlaceholder } from "carbon-components-svelte";
    import { api } from "../../../stores/api";
    import ImageDisplay from "./ImageDisplay.svelte";

    export let url: string;

    let image: Promise<Image> = $api.request.request({
        method: 'GET',
        url
    });
</script>

{#await image}
    <SkeletonPlaceholder />
{:then image} 
    <ImageDisplay {image} />
{/await}
