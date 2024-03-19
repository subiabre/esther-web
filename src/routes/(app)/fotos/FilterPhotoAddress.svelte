<script lang="ts">
    import Grid from "$lib/ui/Content/Grid.svelte";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Map from "$lib/ui/Content/Map.svelte";
    import {
        Search,
        SelectableTile,
        SkeletonPlaceholder,
    } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let value: any;

    let searchedPlaces: Promise<any[]> = emptyPlaces();
    let selectedPlaces: any[] = [];

    function emptyPlaces(): Promise<any[]> {
        return new Promise((res) => res([]));
    }

    function fetchNominatim() {
        return fetch(
            "https://nominatim.openstreetmap.org/search?" +
                new URLSearchParams({
                    q: value,
                    limit: "6",
                    format: "json",
                    addressdetails: "1",
                    polygon_geojson: "1",
                }),
        );
    }

    function searchPlaces() {
        searchedPlaces = fetchNominatim().then((res) => res.json());
    }

    function clearPlaces() {
        value = "";
        searchedPlaces = emptyPlaces();
    }

    function getSelectedValues(): string[] {
        let selectedValues: string[] = [];

        for (let index = 0; index < selectedPlaces.length; index++) {
            let selectedValue = "";

            const selected = selectedPlaces[index];
            const components = Object.entries(selected.address);

            for (let index = 0; index < components.length; index++) {
                const component = components[index];
                selectedValue = selectedValue.concat(
                    `${component[0]}:${component[1]};`,
                );
            }

            selectedValues = [...selectedValues, selectedValue];
        }

        return selectedValues;
    }

    async function handleSelect(selected: any) {
        searchedPlaces = searchedPlaces.then((searchedPlaces) =>
            searchedPlaces.filter(
                (place) => place.place_id !== selected.place_id,
            ),
        );

        selectedPlaces = [...selectedPlaces, selected];

        dispatch("change", { value: getSelectedValues() });
    }

    async function handleDeselect(deselected: any) {
        searchedPlaces = fetchNominatim().then(async (res) => {
            const data = await res.json();

            return data.filter((place: any) => {
                return !selectedPlaces
                    .map((selected) => selected.place_id)
                    .includes(place.place_id);
            });
        });

        selectedPlaces = selectedPlaces.filter(
            (place) => place.place_id !== deselected.place_id,
        );

        dispatch("change", { value: getSelectedValues() });
    }
</script>

<Search
    placeholder="Buscar fotos por lugar..."
    on:change={searchPlaces}
    on:clear={clearPlaces}
    bind:value
/>
<br />
<Grid>
    {#each selectedPlaces as place (place.place_id)}
        <SelectableTile
            selected={true}
            style="padding: 0 1rem 0 1rem;"
            on:select={() => handleSelect(place)}
            on:deselect={() => handleDeselect(place)}
        >
            <Labeled bottom label={place.display_name}>
                <p>{place.name}</p>
                <Map {place} />
            </Labeled>
        </SelectableTile>
    {/each}
    {#await searchedPlaces}
        <SkeletonPlaceholder style="width: 100%" />
    {:then searchedPlaces}
        {#each searchedPlaces as place (place.place_id)}
            <SelectableTile
                style="padding: 0 1rem 0 1rem;"
                on:select={() => handleSelect(place)}
                on:deselect={handleDeselect}
            >
                <Labeled bottom label={place.display_name}>
                    <p>{place.name}</p>
                    <Map {place} />
                </Labeled>
            </SelectableTile>
        {/each}
    {/await}
</Grid>
