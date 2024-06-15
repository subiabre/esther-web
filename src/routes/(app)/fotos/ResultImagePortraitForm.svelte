<script lang="ts">
    import type { Person, Portrait } from "$lib/api";
    import { api } from "$lib/stores/api";
    import PeopleSelect from "$lib/ui/Content/PeopleSelect.svelte";
    import { Search } from "carbon-components-svelte";

    export let portrait: Portrait;
    export let alignment: "top" | "bottom" = "top";

    let person: Promise<Person | undefined> = fetchPortraitPerson();

    async function fetchPortraitPerson(): Promise<Person | undefined> {
        if (typeof portrait.person !== "string") {
            return undefined;
        }

        return await $api.request.request({
            method: "GET",
            url: portrait.person,
        });
    }

    let search: string = "";
    let searchedPeople: Person[] = [];

    async function handleSearchPeople() {
        searchedPeople = await $api.person.apiPeopleGetCollection({
            name: search,
        });
    }

    function addPerson(e: CustomEvent) {
        person = $api.person.apiPeopleIdPatch({
            id: e.detail.person.id,
            requestBody: {
                portraits: [
                    ...e.detail.person.portraits,
                    `/v1/portraits/${portrait.id}`,
                ],
            },
        });
    }

    async function removePerson(e: CustomEvent) {
        await $api.person.apiPeopleIdPatch({
            id: e.detail.person.id,
            requestBody: {
                portraits: e.detail.person.portraits.filter((p: string) => {
                    return p !== `/v1/portraits/${portrait.id}`;
                }),
            },
        });

        person = new Promise((res) => res(undefined));
    }
</script>

{#if alignment === "bottom"}
    <Search size="sm" bind:value={search} on:input={handleSearchPeople} />
{/if}

{#await person then person}
    <PeopleSelect
        selected={person}
        people={searchedPeople}
        on:select={addPerson}
        on:deselect={removePerson}
    />
{/await}

{#if alignment === "top"}
    <Search size="sm" bind:value={search} on:input={handleSearchPeople} />
{/if}
