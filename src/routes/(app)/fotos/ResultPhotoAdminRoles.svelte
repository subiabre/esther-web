<script lang="ts">
    import type { Photo } from "$lib/api";
    import { api } from "$lib/stores/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import { Tag } from "carbon-components-svelte";

    export let photo: Photo;

    let roles = photo.roles ?? [];

    let inputElement: HTMLInputElement;

    function handleInput() {
        inputElement.style.width = `${inputElement.value.length}ch`;
    }

    async function handleRoleAdd() {
        const role = "ROLE_".concat(
            inputElement.value.toUpperCase().replace(/^ROLE_/, ""),
        );

        photo = await $api.photo.apiPhotosCodePatch({
            code: photo.code || "",
            // @ts-ignore
            requestBody: {
                roles: [...roles, role],
            },
        });

        roles = photo.roles ?? [];
        inputElement.value = "";
    }

    async function handleRoleRemove(role: string) {
        photo = await $api.photo.apiPhotosCodePatch({
            code: photo.code || "",
            // @ts-ignore
            requestBody: {
                roles: [...roles.filter((r) => r !== role)],
            },
        });

        roles = photo.roles ?? [];
    }
</script>

<Labeled label="Visible para los roles">
    {#each roles as role}
        <Tag filter title="Revocar rol" on:close={() => handleRoleRemove(role)}
            >{role}</Tag
        >
    {/each}
    <Tag>
        <form on:submit|preventDefault={handleRoleAdd}>
            <input
                type="text"
                placeholder="Añadir rol"
                bind:this={inputElement}
                on:input={handleInput}
            />
        </form>
    </Tag>
</Labeled>

<style>
    input {
        width: 10ch;
        min-width: 10ch;

        margin: 0;
        padding: 0;

        font-size: inherit;
        font-family: inherit;

        border: none;
        outline: none;
        background: transparent;
    }
</style>
