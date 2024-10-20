<script lang="ts">
    import type { Session } from "$lib/api";
    import Grid from "$lib/ui/Content/Grid.svelte";
    import SessionOption from "./SessionOption.svelte";

    export let sessions: string[] = [];

    export let selectedSessions: Session[] = [];
    function handleSelect(event: CustomEvent) {
        selectedSessions = [...selectedSessions, event.detail];
    }

    function handleDeselect(event: CustomEvent) {
        selectedSessions = selectedSessions.filter(
            (session) => session.id !== event.detail.id,
        );
    }
</script>

<Grid>
    {#each sessions as session}
        <SessionOption
            url={session}
            on:select={handleSelect}
            on:deselect={handleDeselect}
        />
    {/each}
</Grid>
