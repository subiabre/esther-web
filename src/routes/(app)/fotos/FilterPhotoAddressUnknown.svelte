<script lang="ts">
    import { Toggle } from "carbon-components-svelte";

    let addressUnknown: boolean = false;
</script>

<div>
    <Toggle
        size="sm"
        labelA="Todos los lugares"
        labelB="Lugares desconocidos"
        bind:toggled={addressUnknown}
        on:toggle
    />
</div>

<style>
    div {
        margin-left: 1em;
    }
</style>
