<script lang="ts">
    import Text from "$lib/ui/Content/Text.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import {
        Button,
        ButtonSet,
        Form,
        FormGroup,
        Modal,
        PasswordInput,
        TextInput,
    } from "carbon-components-svelte";
    import Screen from "$lib/ui/Screen/Screen.svelte";
    import { api } from "$lib/stores/api";
    import { auth } from "$lib/stores/auth";
    import { goto } from "$app/navigation";

    let email: string = "";
    let password: string = "";

    let invalid: boolean = false;

    let openPasswordForgot = false;

    function handleSubmit() {
        $api.session
            .apiSessionsPost({ requestBody: { email, password } })
            .then(async (session) => {
                $auth.session = session;
                $auth.user = await $api.request.request({
                    method: "GET",
                    url: session.user ?? "",
                });

                localStorage.setItem("auth", JSON.stringify({ session }));

                goto("/fotos");
            })
            .catch(() => (invalid = true));
    }
</script>

<Screen>
    <Reel id="puerta">
        <Slide id="login">
            <Text>
                <h1>
                    Hola, <br />{email ? email.split("@")[0] : "desconocido"}.
                </h1>
            </Text>
            <Text>
                <Form on:submit={handleSubmit}>
                    <FormGroup>
                        <TextInput
                            type="email"
                            labelText="Correo electrónico"
                            required
                            {invalid}
                            bind:value={email}
                        />
                        <PasswordInput
                            type="password"
                            tooltipPosition="bottom"
                            tooltipAlignment="end"
                            labelText="Contraseña"
                            showPasswordLabel="Mostrar constraseña"
                            hidePasswordLabel="Ocultar constraseña"
                            required
                            {invalid}
                            bind:value={password}
                        />
                    </FormGroup>
                    <ButtonSet stacked>
                        <Button type="submit">Entrar</Button>
                        <Button
                            kind="ghost"
                            on:click={() => (openPasswordForgot = true)}
                        >
                            He olvidado mi contraseña
                        </Button>
                    </ButtonSet>
                </Form>
            </Text>
            <Modal
                passiveModal
                modalHeading="¿Has olvidado tu contraseña?"
                bind:open={openPasswordForgot}
            >
                <p>Pues muy mal.</p>
                <p>
                    En fín, ponte en contacto conmigo para que actualice tu
                    contraseña.
                </p>
            </Modal>
        </Slide>
    </Reel>
</Screen>
