<script lang="ts">
    import type { Photo } from "$lib/api";
    import { Modal } from "carbon-components-svelte";
    import ResultImage from "./ResultImage.svelte";
    import ResultPhotoDateForm from "./ResultPhotoDateForm.svelte";
    import ResultPhotoAddressForm from "./ResultPhotoAddressForm.svelte";
    import { nominatim } from "$lib/nominatim";
    import ResultPhotoAdminReel from "./ResultPhotoAdminReel.svelte";
    import ResultPhotoAdminRoles from "./ResultPhotoAdminRoles.svelte";

    export let photo: Photo;

    let openAdmin: boolean = false;
    let openDateForm: boolean = false;
    let openAddressForm: boolean = false;
</script>

<Modal passiveModal modalHeading="Administrar fotografía" bind:open={openAdmin}>
    <ResultPhotoAdminReel {photo} />
    <ResultPhotoAdminRoles {photo} />
</Modal>
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
        {#await nominatim.getPhotoPlace(photo) then place}
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
{#each photo.images as image (image)}
    <ResultImage
        {photo}
        source={image}
        on:openAdmin={() => (openAdmin = true)}
        on:openDateForm={() => (openDateForm = true)}
        on:openAddressForm={() => (openAddressForm = true)}
    />
{/each}

<style>
    :global(.bx--modal-content) {
        margin-bottom: 0;
        padding-bottom: 3rem;
    }
</style>
