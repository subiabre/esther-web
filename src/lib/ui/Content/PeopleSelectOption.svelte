<script lang="ts">
    import type { Person, Portrait } from "$lib/api";
    import { api } from "$lib/stores/api";
    import PeoplePortraitOption from "./PeoplePortraitOption.svelte";

    export let person: Person;

    let portrait: Promise<Portrait> = getRandomPortrait();

    async function getRandomPortrait(): Promise<Portrait> {
        if (
            typeof person.portraits === "undefined" ||
            person.portraits.length < 1
        ) {
            return {};
        }

        const items = person.portraits;
        const randP = items[Math.floor(Math.random() * items.length)];

        return await $api.request.request({
            method: "GET",
            url: randP,
        });
    }
</script>

{#await portrait then portrait}
    <PeoplePortraitOption
        {portrait}
        caption={person.name || ""}
        label="Aparece en {person.portraits?.length} fotos."
    />
{/await}
