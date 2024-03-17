<script lang="ts">
    import type { Photo } from "$lib/api";
    import { ClickableTile } from "carbon-components-svelte";
    import GalleryThumb from "./GalleryThumb.svelte";
    import { createEventDispatcher, onMount } from "svelte";
    import { api } from "$lib/stores/api";

    export let page: number;
    export let photos: Photo[];

    const dispatch = createEventDispatcher();

    let lastPage: number = 0;
    onMount(() => {
        $api.request
            .request({
                url: "/v1/photos",
                method: "GET",
                headers: { Accept: "application/ld+json" },
            })
            .then((res) => {
                // @ts-ignore
                const data = JSON.parse(res);

                lastPage = Number(
                    data["hydra:view"]["hydra:last"].split("=").pop(),
                );
            });
    });

    $: isLastPage = page === lastPage;
</script>

<div>
    {#each photos as photo (photo.id)}
        <GalleryThumb {photo} />
    {/each}
    <ClickableTile disabled={isLastPage} on:click={() => dispatch("loadmore")}>
        <p>{photos.length} elementos.</p>
        {#if isLastPage}
            <p>No hay más resultados disponibles.</p>
        {:else}
            <p>Cargar más.</p>
        {/if}
    </ClickableTile>
</div>

<style lang="scss">
    div {
        display: grid;

        gap: 1rem;
        grid-auto-flow: dense;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 90px), 1fr));

        @media only screen and (min-width: 855px) {
            gap: 1.375rem;
            grid-template-columns: repeat(
                auto-fit,
                minmax(min(100%, 200px), 1fr)
            );
        }
    }
</style>
