<script lang="ts">
    import NominatimSearch from "$lib/ui/Content/NominatimSearch.svelte";
    import NominatimMultiselect from "$lib/ui/Content/NominatimMultiselect.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let searchedPlaces: any[] = [];

    function getSelectedValues(places: any[]): string[] {
        let selectedValues: string[] = [];

        for (let index = 0; index < places.length; index++) {
            let selectedValue = "";

            const selected = places[index];
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
        dispatch("change", { value: getSelectedValues(e.detail.places) });
    }
</script>

<NominatimSearch
    placeholder="Buscar fotos por lugar"
    on:clear={() => (searchedPlaces = [])}
    on:change={(e) => (searchedPlaces = e.detail.places)}
/>
<br/>
<NominatimMultiselect places={searchedPlaces} on:change={handleChange} />
