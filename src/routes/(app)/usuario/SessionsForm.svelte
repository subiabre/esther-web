<script lang="ts">
    import type { Session } from "$lib/api";
    import {
        Button,
        ButtonSet,
        Form,
        FormGroup,
    } from "carbon-components-svelte";
    import SessionSelect from "./SessionSelect.svelte";
    import { api } from "../../../stores/api";
    import { auth } from "../../../stores/auth";

    let sessions: string[] = $auth.user?.sessions ?? [];
    let selectedSessions: Session[] = [];

    async function handleSubmit() {
        await Promise.all(
            selectedSessions.map((session) => {
                // @ts-ignore
                return $api.session.apiSessionsIdDelete({ id: session.id });
            }),
        );

        $auth.user = await $api.request.request({
            method: "GET",
            url: $auth.session?.user ?? "",
        });

        sessions = $auth.user?.sessions ?? [];
        selectedSessions = [];
    }
</script>

<Form on:submit={handleSubmit}>
    <FormGroup>
        <ButtonSet stacked>
            <Button
                type="submit"
                kind="danger"
                disabled={selectedSessions.length < 1}
            >
                Borrar {selectedSessions.length > 1 ? "sesiones" : "sesión"}
            </Button>
        </ButtonSet>
        <p>
            Al borrar una sesión será como si hubieras cerrado sesión en el
            agente con el que la iniciaste.
        </p>
    </FormGroup>
    <SessionSelect bind:sessions bind:selectedSessions />
</Form>
