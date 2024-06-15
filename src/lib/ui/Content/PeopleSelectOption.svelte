<script lang="ts">
    import type { Person, Portrait } from "$lib/api";
    import { api } from "$lib/stores/api";
    import Labeled from "./Labeled.svelte";

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

<figure>
    {#await portrait then portrait}
        <img src={portrait.src} alt={person.name} />
    {/await}
    <figcaption>
        <Labeled bottom label="Aparece en {person.portraits?.length} imágenes.">
            {person.name}
        </Labeled>
    </figcaption>
</figure>

<style>
    figure {
        display: flex;
        align-items: center;
    }

    figure > img {
        width: 3rem;
        height: 3rem;

        border-radius: 100%;
    }

    figure > figcaption {
        padding: 0 0 0 1rem;
    }
</style>
