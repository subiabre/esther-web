<script lang="ts">
    import type { Photo } from "$lib/api";
    import { api } from "$lib/stores/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import NominatimSearch from "$lib/ui/Content/NominatimSearch.svelte";
    import NominatimSelect from "$lib/ui/Content/NominatimSelect.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import { Modal } from "carbon-components-svelte";
    import { onMount } from "svelte";

    export let photo: Photo;

    let open: boolean = false;
    let label: string = "Lugar donde se tomó esta fotografía";

    let place: any;
    let searchedPlaces: any[] = [];

    function getNominatimReference(place: any): string {
        let reference = "";
        switch (place.osm_type) {
            case "way":
                reference = `W`;
                break;
            case "node":
                reference = "N";
                break;
            default:
                reference = "R";
        }

        return reference.concat(place.osm_id);
    }

    async function updateAddress(e: CustomEvent) {
        place = e.detail.place;

        photo = await $api.photo.apiPhotosIdPatch({
            id: photo.id?.toString() || "",
            // @ts-ignore
            requestBody: {
                address: {
                    reference: getNominatimReference(place),
                    fullName: place.display_name,
                    shortName: place.name,
                    components: place.address,
                },
            },
        });

        open = false;
        label = "Dirección actualizada. Gracias por tu ayuda.";
    }

    onMount(async () => {
        if (!photo.address?.reference) {
            return;
        }

        place = await fetch(
            "https://nominatim.openstreetmap.org/lookup?" +
                new URLSearchParams({
                    osm_ids: photo.address.reference,
                    format: "json",
                    addressdetails: "1",
                    polygon_geojson: "1",
                }),
        )
            .then((res) => res.json())
            .then((data) => data[0]);
    });
</script>

<Modal passiveModal hasScrollingContent modalHeading="Dirección de la fotografía" bind:open>
    <NominatimSearch
        value={photo.address?.fullName || ""}
        on:change={(e) => (searchedPlaces = e.detail.places)}
        on:clear={() => (searchedPlaces = [])}
    />
    {#if photo.address?.reference}
        <NominatimSelect
            places={searchedPlaces}
            selected={place}
            on:select={updateAddress}
        />
    {:else}
        <NominatimSelect places={searchedPlaces} on:select={updateAddress} />
    {/if}
</Modal>
<Text>
    <h3>Dónde.</h3>
    <Labeled {label}>
        <form on:submit|preventDefault={() => (open = true)}>
            <button type="submit">
                {#if photo.address?.shortName}
                    {photo.address.shortName}
                {:else}
                    Desconocido
                {/if}
            </button>
        </form>
    </Labeled>
</Text>

<style>
    button {
        padding: 0;

        text-align: inherit;
        font-size: inherit;
        font-family: inherit;

        border: none;
        background-color: transparent;
    }

    button:hover {
        cursor: text;
    }
</style>
