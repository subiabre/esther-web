<script lang="ts">
    import type { CancelablePromise, Image } from "$lib/api";
    import { api } from "../../../stores/api";

    export let source: string;

    let image: CancelablePromise<Image> = $api.request.request({
        method: "GET",
        url: source,
    });
</script>

<figure>
    {#await image then image}
        <img src={image.src} alt={image.alt} />
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
