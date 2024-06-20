<script lang="ts">
    import { api } from "$lib/stores/api";
    import { Search } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    export let value: string = "";

    const dispatch = createEventDispatcher();

    let inputTimeout: number;

    function handleInput() {
        if (value === "") {
            return;
        }

        dispatch("input", value);

        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(() => searchPeople(), 250);
    }

    async function searchPeople() {
        const searchedPeople = await $api.person.apiPeopleGetCollection({
            name: value,
        });

        dispatch("update", { people: searchedPeople });
    }
</script>

<Search
    size="sm"
    placeholder="Buscar personas..."
    bind:value
    on:input={handleInput}
/>
