<script lang="ts">
    import type { Photo } from "$lib/api";
    import { nominatim } from "$lib/nominatim";
    import { api } from "$lib/stores/api";
    import NominatimSearch from "$lib/ui/Content/NominatimSearch.svelte";
    import NominatimSelect from "$lib/ui/Content/NominatimSelect.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let photo: Photo;
    export let place: any;

    let searchedPlaces: any[] = [];

    async function updateAddress(e: CustomEvent) {
        place = e.detail.place;

        photo = await $api.photo.apiPhotosIdPatch({
            id: photo.id?.toString() || "",
            // @ts-ignore
            requestBody: {
                address: {
                    reference: nominatim.normalizeOsmId(place),
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
<NominatimSelect
    places={searchedPlaces}
    selected={place}
    on:select={updateAddress}
/>
