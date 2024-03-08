<script lang="ts">
    import { CancelablePromise, type Image, type Photo } from "$lib/api";
    import { SkeletonPlaceholder } from "carbon-components-svelte";
    import { api } from "../../../stores/api";
    import { onMount } from "svelte";
    import Pad from "$lib/ui/Content/Pad.svelte";
    import { soundFxs } from "../../../stores/fxs";

    export let photo: Photo;
    export let mode: "auto" | "none" | "portrait" | "landscape" = "auto";

    let background: string = "";

    let cover: CancelablePromise<Image> = $api.request.request({
        method: "GET",
        url: photo.images[0],
    });

    onMount(async () => {
        const image = await cover;

        background = `--bg-img: url(${image.thumb?.src})`;

        if (mode === "auto") {
            mode = "none";

            const ratio =
                (image.metadata?.width || 0) / (image.metadata?.height || 0);

            if (ratio < 0.7) {
                mode = "portrait";
            }

            if (ratio > 1.4) {
                mode = "landscape";
            }
        }
    });
</script>

<figure class="gallery-thumb {mode}" style={background} on:mouseenter={(e) => soundFxs.playClack()}>
    {#await cover}
        <SkeletonPlaceholder style="width: 100%;" />
    {:then cover}
        <div class="background-fill" />
        <img src={cover.thumb?.src} alt={cover.alt} />
    {/await}
</figure>

<style>
    figure {
        width: 100%;
        height: 100%;

        overflow: hidden;
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        opacity: 0.75;
    }

    figure:hover {
        opacity: 1;

        cursor: pointer;
    }

    figure.portrait {
        grid-row: span 2;
    }

    .background-fill {
        width: 105%;
        height: 110%;

        z-index: 0;
        position: absolute;

        background-size: cover;
        background-position: center;
        background-image: var(--bg-img);
    }

    img {
        max-width: 100%;
        max-height: 100%;

        opacity: 0;

        z-index: 1;
    }
</style>
