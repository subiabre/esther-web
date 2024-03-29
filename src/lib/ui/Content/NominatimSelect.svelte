<script lang="ts">
    import Grid from "$lib/ui/Content/Grid.svelte";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Map from "$lib/ui/Content/Map.svelte";
    import { SelectableTile } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let places: any[] = [];
    export let selected: any = {};

    function handleSelect(place: any) {
        selected = place;
        places = places.filter((p) => p.osm_id !== place.osm_id);

        dispatch("select", { place: selected });
    }

    function handleDeselect() {
        dispatch("deselect");
    }

    $: if (typeof selected.geojson !== "undefined") {
        places = [
            selected,
            ...places.filter((p) => p.osm_id !== selected.osm_id),
        ];
    }
</script>

<Grid>
    {#each places as place (place.osm_id)}
        <SelectableTile
            style="padding: 0 1rem 0 1rem;"
            selected={selected?.osm_id === place.osm_id}
            on:select={() => handleSelect(place)}
            on:deselect={handleDeselect}
        >
            <Labeled bottom label={place.display_name}>
                <p>{place.name}</p>
                <Map {place} />
            </Labeled>
        </SelectableTile>
    {/each}
</Grid>
