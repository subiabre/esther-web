<script lang="ts">
    import { nominatim } from "$lib/nominatim";
    import { Search } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let value: string = "";
    export let placeholder: string = "Buscar lugares";

    export let disabled: boolean = false;

    async function searchPlaces() {
        const places = await nominatim.search(value);

        dispatch("change", { places });
    }

    function clearPlaces() {
        value = "";

        dispatch("clear", { places: [] });
    }
</script>

<Search
    on:change={searchPlaces}
    on:clear={clearPlaces}
    bind:value
    bind:placeholder
    bind:disabled
/>
