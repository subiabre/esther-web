<script lang="ts">
    import { Search } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    let value: any;

    const dispatch = createEventDispatcher();

    function handleChange() {
        if (value === "") {
            value = undefined;
        }

        dispatch("change", { value });
    }
</script>

<Search
    size="lg"
    placeholder="Buscar en la descripción de imágenes"
    on:change={handleChange}
    on:clear
    bind:value
/>
