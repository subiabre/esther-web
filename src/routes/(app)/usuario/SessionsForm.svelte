<script lang="ts">
    import type { Session, User } from "$lib/api";
    import {
        Button,
        ButtonSet,
        Form,
        FormGroup,
    } from "carbon-components-svelte";
    import { api } from "$lib/stores/api";
    import { auth } from "$lib/stores/auth";
    import SessionSelect from "./SessionSelect.svelte";
    import { goto } from "$app/navigation";

    let sessions: string[] = $auth.user?.sessions ?? [];
    let selectedSessions: Session[] = [];

    async function handleSubmit() {
        await Promise.all(
            selectedSessions.map((session) => {
                // @ts-ignore
                return $api.session.apiSessionsIdDelete({ id: session.id });
            }),
        );

        $api.request
            .request({
                method: "GET",
                url: $auth.session?.user ?? "",
            })
            .then((value) => {
                $auth.user = value as User;

                sessions = $auth.user?.sessions ?? [];
                selectedSessions = [];
            })
            .catch(() => {
                $auth.session = null;
                goto("/hola");
            });
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
