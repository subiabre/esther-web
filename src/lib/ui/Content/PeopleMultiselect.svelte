<script lang="ts">
    import Grid from "$lib/ui/Content/Grid.svelte";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import { SelectableTile } from "carbon-components-svelte";
    import { afterUpdate, createEventDispatcher } from "svelte";
    import PeopleSelectOption from "./PeopleSelectOption.svelte";

    const dispatch = createEventDispatcher();

    export let people: any[] = [];

    export let selection: any[] = [];
    let available: any[] = [];

    function handleSelect(person: any) {
        available = people.filter((p) => p.id !== person.id);
        selection = [...selection, person];

        dispatch("change", { people: selection });
    }

    function handleDeselect(person: any) {
        available = [person, ...available];
        selection = selection.filter((p) => p.id !== person.id);

        dispatch("change", { people: selection });
    }

    afterUpdate(() => {
        available = [...people.filter((p) => !selection.includes(p))];
    });
</script>

<Grid>
    {#each selection as person (person.id)}
        <SelectableTile
            style="padding: 0; margin: 0;"
            selected={true}
            on:select={() => handleSelect(person)}
            on:deselect={() => handleDeselect(person)}
        >
            <PeopleSelectOption {person} />
        </SelectableTile>
    {/each}
    {#each available as person (person.id)}
        <SelectableTile
            style="padding: 0; margin: 0;"
            on:select={() => handleSelect(person)}
            on:deselect={() => handleDeselect(person)}
        >
            <PeopleSelectOption {person} />
        </SelectableTile>
    {/each}
</Grid>
