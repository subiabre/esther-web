<script lang="ts">
    import NominatimSearch from "$lib/ui/Content/NominatimSearch.svelte";
    import NominatimMultiselect from "$lib/ui/Content/NominatimMultiselect.svelte";
    import { createEventDispatcher } from "svelte";
    import { Toggle } from "carbon-components-svelte";

    const dispatch = createEventDispatcher();

    let searchedPlaces: any[] = [];
    let addressUnknown: boolean = false;

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

    function handleToggle() {
        dispatch("change", { known: !addressUnknown });
    }
</script>

<div class="header">
    <h2>Dónde.</h2>
    <div class="right">
        <Toggle
            labelText="Lugares desconocidos"
            bind:toggled={addressUnknown}
            on:toggle={handleToggle}
        />
    </div>
</div>
<NominatimSearch
    disabled={addressUnknown}
    placeholder="Buscar fotos por lugar"
    on:clear={() => (searchedPlaces = [])}
    on:change={(e) => (searchedPlaces = e.detail.places)}
/>
<br />
<NominatimMultiselect places={searchedPlaces} on:change={handleChange} />

<style>
    .header {
        padding: 1em 0;

        display: flex;
        align-items: center;
    }

    .header > .right {
        margin-left: auto;
    }
</style>
