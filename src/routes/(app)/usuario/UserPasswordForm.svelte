<script lang="ts">
    import { api } from "$lib/stores/api";
    import { auth } from "$lib/stores/auth";
    import {
        Button,
        Form,
        FormGroup,
        PasswordInput,
    } from "carbon-components-svelte";

    let warnText = "Contraseña actualizada.";
    let helperText = "Puedes poner espacios para usar frases como contraseña.";

    // @ts-ignore
    let password: string = "";
    let warn: boolean = false;
    let invalid: boolean = false;
    let invalidText: string =
        "Tu contraseña debe tener al menos 12 caracteres de largo.";

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        $api.user
            // @ts-ignore
            .apiUsersIdPatch({ id: $auth.user.id, requestBody: { password } })
            .then((user) => {
                $auth.user = user;
                invalid = false;
                warn = true;
            })
            .catch((err) => {
                invalid = true;
            });
    }

    function validateLength() {
        if (password.length < 11) {
            invalid = true;
        } else {
            invalid = false;
        }
    }
</script>

<Form on:submit={handleSubmit}>
    <FormGroup>
        <PasswordInput
            labelText="Contraseña"
            on:input={validateLength}
            {warnText}
            {invalidText}
            bind:helperText
            bind:value={password}
            bind:warn
            bind:invalid
        />
    </FormGroup>
    <Button type="submit">Actualizar contraseña</Button>
</Form>
