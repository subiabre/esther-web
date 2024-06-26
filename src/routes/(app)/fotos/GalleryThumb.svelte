<script lang="ts">
    import { CancelablePromise, type Image, type Photo } from "$lib/api";
    import { api } from "$lib/stores/api";
    import { soundFxs } from "$lib/stores/fxs";
    import { SkeletonPlaceholder } from "carbon-components-svelte";
    import { onMount } from "svelte";

    export let photo: Photo;
    export let mode: "auto" | "none" | "portrait" | "landscape" = "auto";

    let bgImg: string = "";

    let cover: CancelablePromise<Image> = $api.request.request({
        method: "GET",
        url: photo.images[0],
    });

    onMount(async () => {
        const image = await cover;

        bgImg = `--bg-img: url(${image.thumb?.src})`;

        if (mode === "auto") {
            mode = "none";

            const ratio =
                (image.metadata?.width || 0) / (image.metadata?.height || 0);

            if (ratio < 0.8) {
                mode = "portrait";
            }

            if (ratio > 1.4) {
                mode = "landscape";
            }
        }
    });
</script>

<a href="#photo{photo.id}" class="gallery-thumb {mode}">
    <figure style={bgImg} on:mouseenter={(e) => soundFxs.playClack()}>
        {#await cover}
            <SkeletonPlaceholder style="width: 100%;" />
        {:then cover}
            <div class="cover-fill" />
            <img src={cover.thumb?.src} alt={cover.alt} />
        {/await}
    </figure>
</a>

<style>
    a.portrait {
        grid-row: span 2;
    }

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

    .cover-fill {
        width: 100%;
        height: 100%;

        position: absolute;

        background-size: cover;
        background-position: center;
        background-image: var(--bg-img);
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }
</style>
