<script lang="ts">
    import type { Person } from "$lib/api";
    import { SelectableTile } from "carbon-components-svelte";
    import { createEventDispatcher, onMount } from "svelte";
    import PeopleSelectOption from "./PeopleSelectOption.svelte";

    const dispatch = createEventDispatcher();

    export let people: Person[] = [];
    export let selected: Person | undefined = undefined;

    function handleSelect(person: Person) {
        selected = person;

        dispatch("select", { person: selected });
    }

    function handleDeselect(person: Person) {
        selected = undefined;

        dispatch("deselect", { person });
    }

    onMount(() => {
        if (typeof selected !== "undefined") {
            people = [
                selected,
                ...people.filter((p: Person) => p.id !== selected?.id),
            ];
        }
    });
</script>

<div>
    {#each people as person (person.id)}
        <SelectableTile
            style="padding: 0;"
            selected={selected ? selected.id === person.id : false}
            on:select={() => handleSelect(person)}
            on:deselect={() => handleDeselect(person)}
        >
            <PeopleSelectOption {person} />
        </SelectableTile>
    {/each}
</div>

<style>
    div {
        max-height: 12.5rem;

        overflow-y: scroll;
    }
</style>
