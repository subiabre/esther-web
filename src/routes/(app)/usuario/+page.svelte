<script lang="ts">
    import { auth } from "$lib/stores/auth";
    import { fxs } from "$lib/stores/fxs";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import Pad from "$lib/ui/Content/Pad.svelte";
    import { Form, FormGroup, Toggle } from "carbon-components-svelte";
    import UserEmailForm from "./UserEmailForm.svelte";
    import UserPasswordForm from "./UserPasswordForm.svelte";
    import SessionsForm from "./SessionsForm.svelte";
    import { onMount } from "svelte";

    let mainSlide: Slide;
    onMount(() => {
        mainSlide.focus();
    });

    $: if ($auth.user) {
        fxs.save($auth.user, $fxs);
    }
</script>

<svelte:head>
    <title>Mi cuenta | Esther</title>
</svelte:head>

<Reel id="usuario">
    <Slide id="configuracion" bind:this={mainSlide}>
        <Text>
            <h1>Configuración.</h1>
        </Text>
        <Text>
            <Form title="Efectos">
                <h2>Efectos.</h2>
                <p>
                    La configuración de efectos es local, tus preferencias no se
                    sincronizan con otras sesiones que tengas abiertas.
                </p>
                <FormGroup>
                    <Toggle
                        labelA="Desactivados"
                        labelB="Activados"
                        labelText="Efectos visuales"
                        bind:toggled={$fxs.visual}
                    />
                </FormGroup>
                <FormGroup>
                    <Toggle
                        labelA="Desactivados"
                        labelB="Activados"
                        labelText="Efectos de sonido"
                        bind:toggled={$fxs.sound}
                    />
                    <p>
                        A veces es posible que no oigas los efectos de sonido
                        hasta que no hayas interactuado con la ventana de la
                        app.
                    </p>
                </FormGroup>
            </Form>
            <Form title="Cuenta">
                <h2>Cuenta.</h2>
                <p>
                    Esther no recolecta datos personales, los datos asociados a
                    tu cuenta son tan solo tu email y contraseña.
                </p>
                <FormGroup>
                    <UserEmailForm />
                </FormGroup>
                <FormGroup>
                    <UserPasswordForm />
                </FormGroup>
            </Form>
        </Text>
    </Slide>
    <Slide id="sesiones">
        <Text>
            <h1>Sesiones.</h1>
        </Text>
        <Pad>
            <SessionsForm />
        </Pad>
    </Slide>
</Reel>
