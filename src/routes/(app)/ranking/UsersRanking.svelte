<script lang="ts">
    import type { User } from "$lib/api";
    import { ProgressBar } from "carbon-components-svelte";

    export let users: User[];
    $: users = users.sort((a, b) => {
        return (b.logEntries?.length || 0) - (a.logEntries?.length || 0);
    });

    let totalContribs: number = calcTotalContribs(users);

    function calcTotalContribs(users: User[]): number {
        let total = 0;

        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            total = total + (user.logEntries?.length || 0);
        }

        return total;
    }

    function shortEmail(user: User): string {
        return user.email.split("@")[0];
    }

    function rankMedal(user: User, index: number): string {
        if ((user.logEntries?.length || 0) < 1) return "🤷";

        if (index === 0) return "🥇";

        if (index === 1) return "🥈";

        if (index === 2) return "🥉";

        return "😕";
    }
</script>

{#each users as user, index (user.id)}
    <p>
        <span class="medal">{rankMedal(user, index)}</span>
        {shortEmail(user)}
    </p>
    <p>
        {#if (user.logEntries?.length || 0) > 0}
            <ProgressBar
                status="active"
                max={totalContribs}
                value={user.logEntries?.length}
                helperText="{user.logEntries?.length} puntos."
            />
        {:else}
            No ha contribuido nada todavía.
            {#if (user.sessions?.length || 0) > 0}
                Parece que solo viene a chusmear.
            {/if}
        {/if}
    </p>
{/each}

<style>
    .medal {
        font-size: 1.6em;
    }
</style>
