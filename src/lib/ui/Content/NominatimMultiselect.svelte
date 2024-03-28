<script lang="ts">
    import Grid from "$lib/ui/Content/Grid.svelte";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Map from "$lib/ui/Content/Map.svelte";
    import { SelectableTile } from "carbon-components-svelte";
    import { afterUpdate, createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let places: any[] = [];

    let selection: any[] = [];
    let available: any[] = [];

    function handleSelect(place: any) {
        available = places.filter((p) => p.place_id !== place.place_id);
        selection = [...selection, place];

        dispatch("change", { places: selection });
    }

    function handleDeselect(place: any) {
        available = [place, ...available];
        selection = selection.filter((p) => p.place_id !== place.place_id);

        dispatch("change", { places: selection });
    }

    afterUpdate(() => {
        available = [...places.filter((p) => !selection.includes(p))];
    });
</script>

<Grid>
    {#each selection as place (place.place_id)}
        <SelectableTile
            style="padding: 0 1rem 0 1rem;"
            selected={true}
            on:select={() => handleSelect(place)}
            on:deselect={() => handleDeselect(place)}
        >
            <Labeled bottom label={place.display_name}>
                <p>{place.name}</p>
                <Map {place} />
            </Labeled>
        </SelectableTile>
    {/each}
    {#each available as place (place.place_id)}
        <SelectableTile
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
</Grid>
