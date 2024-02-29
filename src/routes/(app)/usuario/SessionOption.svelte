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
    import TimeAgo from "$lib/ui/Content/TimeAgo.svelte";
    import Labeled from "$lib/ui/Content/Labeled.svelte";

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
        <Labeled label="👉 Identificador">
            <h5>
                {session.id}
                {#if session.id == $auth.session.id}
                    (current)
                {/if}
            </h5>
        </Labeled>
        <Labeled label="🕑 Creada">
            <TimeAgo timestamp={session.dateCreated ?? ""} />
        </Labeled>
        <Labeled label="🔗 Orígen">
            {session.request?.origin}
        </Labeled>
        <Labeled label="💻 Agente">
            {session.request?.userAgent}
        </Labeled>
    </SelectableTile>
{:catch}
    <p>Esta sesión no se pudo cargar.</p>
{/await}
