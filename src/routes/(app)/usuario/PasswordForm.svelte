<script lang="ts">
    import {
        Button,
        Form,
        FormGroup,
        PasswordInput,
    } from "carbon-components-svelte";
    import { auth } from "../../../stores/auth";
    import { api } from "../../../stores/api";

    let warnText = "Contraseña actualizada.";
    let helperText = "Puedes poner espacios para usar frases como contraseña.";

    // @ts-ignore
    let password: string = "";
    let warn: boolean = false;
    let invalid: boolean = false;
    let invalidText: string = "Tu contraseña debe tener al menos 12 caracteres de largo.";

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        $api.user
            // @ts-ignore
            .apiUsersIdPatch($auth.user.id, { password })
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
            bind:helperText={helperText}
            bind:value={password}
            bind:warn={warn}
            bind:invalid={invalid}
        />
    </FormGroup>
    <Button type="submit">Actualizar contraseña</Button>
</Form>
