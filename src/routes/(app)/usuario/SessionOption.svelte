<script lang="ts">
    import type { Session } from "$lib/api";
    import { api } from "$lib/stores/api";
    import SessionData from "./SessionData.svelte";
    import { createEventDispatcher } from "svelte";
    import { Tile, SelectableTile, SkeletonText } from "carbon-components-svelte";

    export let url: string;

    const dispatch = createEventDispatcher();
    const session: Promise<Session> = $api.request.request({
        url,
        method: "GET",
    });
</script>

{#await session}
    <Tile>
        <SkeletonText paragraph lines={8} />
    </Tile>
{:then session}
    <SelectableTile
        on:select={() => dispatch("select", { ...session })}
        on:deselect={() => dispatch("deselect", { ...session })}
    >
        <SessionData {session} />
    </SelectableTile>
{:catch}
    <p>Esta sesión no se pudo cargar.</p>
{/await}
