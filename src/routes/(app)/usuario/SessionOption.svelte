<script lang="ts">
    import type { Session } from "$lib/api";
    import { api } from "$lib/stores/api";
    import SessionData from "./SessionData.svelte";
    import { createEventDispatcher } from "svelte";
    import {
        Tile,
        SelectableTile,
        SkeletonText,
    } from "carbon-components-svelte";
    import { auth } from "$lib/stores/auth";

    export let url: string;

    const dispatch = createEventDispatcher();

    const session: Promise<Session> = $api.request.request({
        url,
        method: "GET",
    });

    function isCurrent(session: Session): boolean {
        if (session.id !== $auth.session?.id || 0) {
            return false;
        }

        return true;
    }
</script>

{#await session}
    <Tile>
        <SkeletonText paragraph lines={8} />
    </Tile>
{:then session}
    <SelectableTile
        title="Sesión número {session.id}"
        light={isCurrent(session)}
        iconDescription="Sesión seleccionada"
        on:select={() => dispatch("select", session)}
        on:deselect={() => dispatch("deselect", session)}
    >
        <SessionData {session} current={isCurrent(session)} />
    </SelectableTile>
{:catch}
    <p>Esta sesión no se pudo cargar.</p>
{/await}
