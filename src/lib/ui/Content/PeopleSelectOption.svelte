<script lang="ts">
    import type { Person, Portrait } from "$lib/api";
    import { api } from "$lib/stores/api";
    import { SkeletonPlaceholder } from "carbon-components-svelte";
    import PeoplePortraitOption from "./PeoplePortraitOption.svelte";

    export let person: Person;

    $: portrait = getRandomPortrait(person);

    async function getRandomPortrait(person: Person): Promise<Portrait> {
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

{#await portrait}
    <SkeletonPlaceholder style="width: 100%; height: 4rem;" />
{:then portrait}
    <PeoplePortraitOption
        {portrait}
        caption={person.name || ""}
        label="Aparece en {person.portraits?.length} fotos."
    />
{/await}
