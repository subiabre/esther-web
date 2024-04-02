<script lang="ts">
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Map from "$lib/ui/Content/Map.svelte";
    import { RadioTile, TileGroup } from "carbon-components-svelte";
    import { createEventDispatcher, onMount } from "svelte";

    const dispatch = createEventDispatcher();

    export let places: any[] = [];
    export let selected: any | undefined = undefined;

    function handleSelect(place: any) {
        selected = place;

        dispatch("select", { place: selected });
    }

    onMount(() => {
        if (typeof selected !== "undefined") {
            places = [selected, ...places];
        }
    })
</script>

<TileGroup
    selected={selected ? selected.osm_id : undefined}
    on:select={({ detail }) => handleSelect(detail)}
>
    {#each places as place (place.osm_id)}
        <RadioTile
            value={place}
            checked={selected ? selected.osm_id === place.osm_id : false}
            style="padding: 0 1rem 0 1rem;"
        >
            <Labeled bottom label={place.display_name}>
                <p>{place.name}</p>
                <Map {place} />
            </Labeled>
        </RadioTile>
    {/each}
</TileGroup>
