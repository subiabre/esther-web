<script lang="ts">
    import type { CancelablePromise, Image, Photo } from "$lib/api";
    import Overlaid from "$lib/ui/Content/Overlaid.svelte";
    import { api } from "../../../stores/api";
    import ResultImageActions from "./ResultImageActions.svelte";
    import ResultImageAltForm from "./ResultImageAltForm.svelte";
    import ResultImageDateRangeForm from "./ResultImageDateRangeForm.svelte";

    export let photo: Photo;
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
            <ResultImageActions {photo} {image} />
            <ResultImageDateRangeForm {image} />
            <ResultImageAltForm {image} />
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
