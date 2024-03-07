<script lang="ts">
    import type { CancelablePromise, Image } from "$lib/api";
    import Overlaid from "$lib/ui/Content/Overlaid.svelte";
    import { api } from "../../../stores/api";
    import ImageAltForm from "./ImageAltForm.svelte";

    export let source: string;

    let image: CancelablePromise<Image> = $api.request.request({
        method: "GET",
        url: source,
    });
</script>

<figure>
    {#await image then image}
        <img src={image.src} alt={image.alt} />
        <Overlaid id={image.id || ""}>
            <ImageAltForm {image} />
        </Overlaid>
    {/await}
</figure>

<style>
    figure {
        width: 100%;
        height: 100%;

        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }
</style>
