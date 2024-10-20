<script lang="ts">
    import { Button } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let addressUnknown: boolean = false;

    function handleToggle() {
        addressUnknown = !addressUnknown;

        dispatch("change", { known: addressUnknown ? false : undefined });
    }
</script>

<div>
    <form on:submit|preventDefault={handleToggle}>
        <Button
            type="submit"
            kind="ghost"
            title={addressUnknown
                ? "Mostrar todos los lugares"
                : "Excluir lugares conocidos"}
        >
            <h3>
                {#if addressUnknown}
                    🌇
                {:else}
                    🌃
                {/if}
            </h3>
        </Button>
    </form>
</div>

<style>
    div {
        margin-left: auto;
    }
</style>
