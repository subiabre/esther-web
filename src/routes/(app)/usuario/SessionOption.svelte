<script lang="ts">
    import type { Session } from "$lib/api";
    import { api } from "$lib/stores/api";
    import SessionData from "./SessionData.svelte";
    import { Tile, SkeletonText } from "carbon-components-svelte";

    export let url: string;

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
    <SessionData {session} on:select on:deselect />
{:catch}
    <p>Esta sesión no se pudo cargar.</p>
{/await}
