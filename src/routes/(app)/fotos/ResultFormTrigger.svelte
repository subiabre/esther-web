<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let disabled: boolean = false;
    export let width: "full" | "auto" = "auto";

    let widthSize = calcWidthSize();

    function calcWidthSize() {
        switch (width) {
            case "full":
                return "100%";
            case "auto":
                return "auto";
        }
    }
</script>

<form on:submit|preventDefault={() => dispatch("trigger")}>
    <button {disabled} type="submit" style="--width: {widthSize}">
        <slot />
    </button>
</form>

<style>
    button {
        width: var(--width);
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
