<script lang="ts">
    import type { Photo } from "$lib/api";
    import { Modal } from "carbon-components-svelte";
    import ResultImage from "./ResultImage.svelte";
    import ResultPhotoAddressForm from "./ResultPhotoAddressForm.svelte";

    export let photo: Photo;

    let openAddressForm: boolean = false;
</script>

<Modal
    passiveModal
    modalHeading="Dirección de la fotografía"
    bind:open={openAddressForm}
>
    <ResultPhotoAddressForm
        {photo}
        on:update={(e) => {
            photo = e.detail.photo;
            openAddressForm = false;
        }}
    />
</Modal>
{#each photo.images as image}
    <ResultImage
        {photo}
        source={image}
        on:openAddressForm={() => (openAddressForm = true)}
    />
{/each}
