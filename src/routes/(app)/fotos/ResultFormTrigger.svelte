<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let disabled: boolean = false;
</script>

<form on:submit|preventDefault={() => dispatch("trigger")}>
    <button {disabled} type="submit">
        <slot />
    </button>
</form>

<style>
    button {
        max-width: 100%;
        padding: 0;

        text-align: inherit;
        font-size: inherit;
        font-family: inherit;

        border: none;
        background-color: transparent;
    }

    button:hover {
        cursor: pointer;
    }
</style>
