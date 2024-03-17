<script lang="ts">
    import { api } from "$lib/stores/api";
    import { auth } from "$lib/stores/auth";
    import { Button, Form, FormGroup, TextInput } from "carbon-components-svelte";


    let warnText = "Correo electrónico actualizado.";
    let helperText =
        "Esther nunca te enviará correo. Sólo se usa para identificarte.";

    // @ts-ignore
    let email: string = $auth.user.email;
    let warn: boolean = false;
    let invalid: boolean = false;
    let invalidText: string = "Este correo no es válido.";

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        $api.user
            // @ts-ignore
            .apiUsersIdPatch({ id: $auth.user.id, requestBody: { email } })
            .then((user) => {
                $auth.user = user;
                invalid = false;
                warn = true;
            })
            .catch((err) => {
                invalid = true;
            });
    }
</script>

<Form on:submit={handleSubmit}>
    <FormGroup>
        <TextInput
            type="email"
            labelText="Correo electrónico"
            placeholder="ejemplo@correo.com"
            {warnText}
            {invalidText}
            bind:helperText
            bind:value={email}
            bind:warn
            bind:invalid
        />
    </FormGroup>
    <Button type="submit">Actualizar correo electrónico</Button>
</Form>
