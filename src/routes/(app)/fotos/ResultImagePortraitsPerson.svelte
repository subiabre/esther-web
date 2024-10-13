<script lang="ts">
    import type { Person, Portrait } from "$lib/api";
    import { api } from "$lib/stores/api";

    export let portrait: Portrait;
    export let index: number = 0;
    export let length: number = 2;

    let person: Promise<Person> = $api.request.request({
        url: portrait.person || "",
        method: "GET",
    });
</script>

{#await person then person}
    <span>
        {person.name}{#if index !== length - 1},&nbsp;{/if}
    </span>
{/await}
