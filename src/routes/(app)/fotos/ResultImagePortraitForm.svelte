<script lang="ts">
    import type { Person, Portrait } from "$lib/api";
    import { api } from "$lib/stores/api";
    import PeoplePortraitOption from "$lib/ui/Content/PeoplePortraitOption.svelte";
    import PeopleSearch from "$lib/ui/Content/PeopleSearch.svelte";
    import PeopleSelect from "$lib/ui/Content/PeopleSelect.svelte";
    import { ClickableTile } from "carbon-components-svelte";

    export let portrait: Portrait;
    export let alignment: "top" | "bottom" = "top";

    let person: Promise<Person | undefined> = fetchPortraitPerson();

    let search: string = "";
    let searchedPeople: Person[];

    async function fetchPortraitPerson(): Promise<Person | undefined> {
        if (typeof portrait.person !== "string") {
            return undefined;
        }

        return await $api.request.request({
            method: "GET",
            url: portrait.person,
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

    let newPersonAdded: boolean = false;

    async function newPerson() {
        if (search === "") {
            return;
        }

        person = $api.person.apiPeoplePost({
            requestBody: {
                name: search,
                portraits: [`/v1/portraits/${portrait.id}`],
            },
        });

        newPersonAdded = true;
    }
</script>

{#if alignment === "top"}
    {#if !newPersonAdded}
        <ClickableTile
            style="padding: 0; margin: 0;"
            disabled={search === ""}
            on:click={newPerson}
        >
            <PeoplePortraitOption
                {portrait}
                caption={search ? search : "Desconocido"}
                label="Añadir nueva persona"
            />
        </ClickableTile>
    {/if}
    {#await person then person}
        <PeopleSelect
            selected={person}
            people={searchedPeople}
            on:select={addPerson}
            on:deselect={removePerson}
        />
    {/await}
    <PeopleSearch
        bind:value={search}
        on:input={() => (searchedPeople = [])}
        on:update={(e) => (searchedPeople = e.detail.people)}
    />
{/if}

{#if alignment === "bottom"}
    <PeopleSearch
        bind:value={search}
        on:input={() => (searchedPeople = [])}
        on:update={(e) => (searchedPeople = e.detail.people)}
    />
    {#await person then person}
        <PeopleSelect
            selected={person}
            people={searchedPeople}
            on:select={addPerson}
            on:deselect={removePerson}
        />
    {/await}
    {#if !newPersonAdded}
        <ClickableTile
            style="padding: 0; margin: 0;"
            disabled={search === ""}
            on:click={newPerson}
        >
            <PeoplePortraitOption
                {portrait}
                caption={search ? search : "Desconocido"}
                label="Añadir nueva persona"
            />
        </ClickableTile>
    {/if}
{/if}
