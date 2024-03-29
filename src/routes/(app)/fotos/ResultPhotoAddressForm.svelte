<script lang="ts">
    import type { Photo } from "$lib/api";
    import { api } from "$lib/stores/api";
    import NominatimSearch from "$lib/ui/Content/NominatimSearch.svelte";
    import NominatimSelect from "$lib/ui/Content/NominatimSelect.svelte";
    import { createEventDispatcher, afterUpdate } from "svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;
    export let place: any;

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

        dispatch("update", { photo });
    }
</script>

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
