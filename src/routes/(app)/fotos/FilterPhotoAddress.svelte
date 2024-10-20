<script lang="ts">
    import NominatimSearch from "$lib/ui/Content/NominatimSearch.svelte";
    import NominatimMultiselect from "$lib/ui/Content/NominatimMultiselect.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let disabled: boolean = false;

    let searchedValue: string = "";
    let searchedPlaces: any[] = [];
    let selectedPlaces: any[] = [];

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

    function handleChange(e: CustomEvent) {
        selectedPlaces = e.detail.places;

        dispatch("change", { places: getSelectedValues() });
    }

    $: if (disabled) {
        searchedValue = "";
        searchedPlaces = [];
        selectedPlaces = [];
    }
</script>

<NominatimSearch
    {disabled}
    bind:value={searchedValue}
    placeholder={disabled ? "Filtradas fotos sin lugar conocido" : "Buscar fotos por lugar"}
    on:clear={() => (searchedPlaces = [])}
    on:change={(e) => (searchedPlaces = e.detail.places)}
/>
<br />
<NominatimMultiselect
    places={searchedPlaces}
    bind:selection={selectedPlaces}
    on:change={handleChange}
/>
