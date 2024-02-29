<script lang="ts">
    import {
        SkeletonText,
        SelectableTile,
        Tile,
    } from "carbon-components-svelte";
    import { api } from "../../../stores/api";
    import type { Session } from "$lib/api";
    import { createEventDispatcher } from "svelte";
    import { auth } from "../../../stores/auth";

    export let url: string;

    const dispatch = createEventDispatcher();
    const session: Promise<Session> = $api.request.request({
        url,
        method: "GET",
    });
</script>

{#await session}
    <Tile>
        <SkeletonText paragraph lines={7} />
    </Tile>
{:then session}
    <SelectableTile
        on:select={() => dispatch("select", { ...session })}
        on:deselect={() => dispatch("deselect", { ...session })}
    >
        <h5>
            {session.id}
            {#if session.id == $auth.session.id}
                (current)
            {/if}
        </h5>
        <p>📅 {session.dateCreated}</p>
        <p>🌐 {session.request?.origin}</p>
        <p>💻 {session.request?.userAgent}</p>
    </SelectableTile>
{:catch}
    <p>Esta sesión no se pudo cargar.</p>
{/await}
