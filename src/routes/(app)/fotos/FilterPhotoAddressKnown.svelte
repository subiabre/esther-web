<script lang="ts">
    import { Button } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let known: boolean = true;

    function handleToggle() {
        known = !known;

        dispatch("change", { known: known ? undefined : false });
    }
</script>

<div>
    <form on:submit|preventDefault={handleToggle}>
        <Button
            type="submit"
            kind="ghost"
            size="field"
            title={known
                ? "Cambiar a fotos sin lugar"
                : "Cambiar a fotos de cualquier lugar"}
        >
            <h3>
                {#if known}
                    🌉
                {:else}
                    🌁
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
