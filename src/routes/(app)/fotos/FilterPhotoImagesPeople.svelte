<script lang="ts">
    import { api } from "$lib/stores/api";
    import PeopleMultiselect from "$lib/ui/Content/PeopleMultiselect.svelte";
    import { Search } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let searchedValue: string = "";
    let searchedPeople: any[] = [];
    let selectedPeople: any[] = [];

    function getSelectedValues(): string[] {
        let selectedValues: string[] = [];

        for (let index = 0; index < selectedPeople.length; index++) {
            const selected = selectedPeople[index];

            selectedValues = [...selectedValues, selected.id];
        }

        return selectedValues;
    }

    function handleChange(e: CustomEvent) {
        selectedPeople = e.detail.people;

        dispatch("change", { people: getSelectedValues() });
    }

    async function handleSearch() {
        searchedPeople = await $api.person.apiPeopleGetCollection({
            name: searchedValue,
        });
    }
</script>

<Search
    size="lg"
    placeholder="Buscar personas"
    on:change={handleSearch}
    on:clear={() => (searchedPeople = [])}
    bind:value={searchedValue}
/>
<br />
<PeopleMultiselect
    people={searchedPeople}
    bind:selection={selectedPeople}
    on:change={handleChange}
/>
