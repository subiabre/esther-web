<script lang="ts">
    import { Toggle } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let addressUnknown: boolean = false;

    function handleToggle() {
        dispatch("change", { known: addressUnknown ? false : undefined });
    }
</script>

<div>
    <Toggle
        size="sm"
        labelA="Todos los lugares"
        labelB="Lugares desconocidos"
        bind:toggled={addressUnknown}
        on:toggle={handleToggle}
    />
</div>

<style>
    div {
        margin-left: 1em;
    }
</style>
