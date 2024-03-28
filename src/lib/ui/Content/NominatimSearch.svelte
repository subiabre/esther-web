<script lang="ts">
    import { Search } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let value: string = "";
    export let placeholder: string = "Buscar lugares";

    async function searchPlaces() {
        const places = await fetch(
            "https://nominatim.openstreetmap.org/search?" +
                new URLSearchParams({
                    q: value,
                    limit: "6",
                    format: "json",
                    addressdetails: "1",
                    polygon_geojson: "1",
                }),
        ).then((res) => res.json());

        dispatch("change", { places });
    }
</script>

<Search on:change={searchPlaces} on:clear bind:placeholder bind:value />
