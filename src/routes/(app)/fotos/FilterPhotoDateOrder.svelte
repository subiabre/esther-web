<script lang="ts">
    import { Button } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let order: "asc" | "desc" = "asc";

    function handleToggle() {
        switch (order) {
            case "asc":
                order = "desc";
                break;
            case "desc":
                order = "asc";
                break;
        }

        dispatch("change", { order });
    }
</script>

<div>
    <form on:submit|preventDefault={handleToggle}>
        <Button
            type="submit"
            kind="ghost"
            title={order === "asc"
                ? "Cambiar a orden descendente"
                : "Cambiar a orden ascendente"}
        >
            <h3 class={order}>⌛</h3>
        </Button>
    </form>
</div>

<style>
    div {
        margin-left: auto;
    }

    h3 {
        transition: transform 1s;
    }

    h3.asc {
        transform: rotate(180deg);
    }
</style>
