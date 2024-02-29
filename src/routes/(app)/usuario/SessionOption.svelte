<script lang="ts">
    import {
        SkeletonText,
        SelectableTile,
        Tile,
    } from "carbon-components-svelte";
    import { api } from "../../../stores/api";
    import type { Session } from "$lib/api";
    import { createEventDispatcher } from "svelte";
    import SessionData from "./SessionData.svelte";

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
