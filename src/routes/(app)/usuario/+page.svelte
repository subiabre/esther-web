<script lang="ts">
    import { onMount } from "svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import { Form, FormGroup, Toggle } from "carbon-components-svelte";
    import { fxs } from "../../../stores/fxs";
    import { auth } from "../../../stores/auth";
    import EmailForm from "./EmailForm.svelte";
    import PasswordForm from "./PasswordForm.svelte";
    import SessionSelect from "./SessionSelect.svelte";
    import Pad from "$lib/ui/Content/Pad.svelte";
    import SessionsForm from "./SessionsForm.svelte";

    let mainSlide: Slide;
    onMount(() => {
        mainSlide.focus();
    });

    $: if ($auth.user) {
        fxs.save($auth.user, $fxs);
    }
</script>

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
                </FormGroup>
            </Form>
        </Text>
        <Text>
            <Form title="Cuenta">
                <h2>Cuenta.</h2>
                <p>
                    Esther no recolecta datos personales, los datos asociados a
                    tu cuenta son tan solo tu email y contraseña.
                </p>
                <FormGroup>
                    <EmailForm />
                </FormGroup>
                <FormGroup>
                    <PasswordForm />
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
