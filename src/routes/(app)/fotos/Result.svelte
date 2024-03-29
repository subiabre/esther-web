<script lang="ts">
    import type { Photo } from "$lib/api";
    import { Modal } from "carbon-components-svelte";
    import ResultImage from "./ResultImage.svelte";
    import ResultPhotoDateForm from "./ResultPhotoDateForm.svelte";
    import ResultPhotoAddressForm from "./ResultPhotoAddressForm.svelte";

    export let photo: Photo;

    let openDateForm: boolean = false;
    let openAddressForm: boolean = false;

    async function fetchPlace(photo: Photo) {
        return await fetch(
            "https://nominatim.openstreetmap.org/lookup?" +
                new URLSearchParams({
                    osm_ids: photo.address?.reference || "",
                    format: "json",
                    addressdetails: "1",
                    polygon_geojson: "1",
                }),
        )
            .then((res) => res.json())
            .then((data) => data[0]);
    }
</script>

<Modal
    passiveModal
    modalHeading="Fecha de la fotografía"
    bind:open={openDateForm}
>
    <ResultPhotoDateForm
        {photo}
        on:update={(e) => {
            photo = e.detail.photo;
            openDateForm = false;
        }}
    />
</Modal>
<Modal
    passiveModal
    modalHeading="Dirección de la fotografía"
    bind:open={openAddressForm}
>
    {#if openAddressForm}
        {#await fetchPlace(photo) then place}
            <ResultPhotoAddressForm
                {photo}
                {place}
                on:update={(e) => {
                    photo = e.detail.photo;
                    openAddressForm = false;
                }}
            />
        {/await}
    {/if}
</Modal>
{#each photo.images as image}
    <ResultImage
        {photo}
        source={image}
        on:openDateForm={() => (openDateForm = true)}
        on:openAddressForm={() => (openAddressForm = true)}
    />
{/each}
