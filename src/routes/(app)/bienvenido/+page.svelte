<script lang="ts">
    import { onMount } from "svelte";
    import { afterNavigate } from "$app/navigation";
    import Text from "$lib/ui/Content/Text.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import BigImage from "$lib/ui/Content/BigImage.svelte";

    let mainSlide: Slide;
    onMount(() => {
        mainSlide.focus();
    });

    afterNavigate(() => {
        mainSlide.focus();
    });
</script>

<svelte:head>
    <title>Hola | Esther</title>
</svelte:head>

<Reel id="bienvenido">
    <Slide id="🙋" bind:this={mainSlide}>
        <BigImage src="/character/01_hello.gif" alt="Esther te saluda" />
        <Text>
            <h1>Hola.</h1>
            <h2>🙋</h2>
            <p>Me llamo <strong>Esther</strong>. Encantada de conocerte.</p>
        </Text>
    </Slide>
    <Slide id="📸">
        <BigImage
            src="/character/02_ilikepics.gif"
            alt="Esther mira una colección de fotos sueltas y desordenadas"
        />
        <Text>
            <h1>Me gustan las fotos.</h1>
            <h2>📸</h2>
            <p>
                Me gusta analizarlas, organizarlas y conservarlas. ¡Soy muy
                buena guardando fotos! Pero sobretodo me gusta
                <strong>saber</strong> sobre ellas.
            </p>
            <p>
                Cúando y dónde fueron tomadas. Quiénes salen en ellas. Qué es lo
                que se muestra en ellas.
            </p>
        </Text>
    </Slide>
    <Slide id="🙇">
        <BigImage
            src="/character/03_ineedhelp.gif"
            alt="Esther está sobrecargada de trabajo"
        />
        <Text>
            <h1>Por eso necesito tu ayuda.</h1>
            <h2>🙇</h2>
            <p>
                Resulta que en saber sobre una foto no soy tan buena como
                analizándola. Puedo leer sus metadatos... ¡Pero Facu me ha dado
                muchas fotos que no tienen metadatos!
            </p>
            <p>
                Son imágenes que vienen de fotos de las de verdad, fotos
                analógicas cuyos metadatos están en la memoria de personas como
                tú.
            </p>
        </Text>
    </Slide>
    <Slide id="💪">
        <BigImage
            src="/character/04_togetherdoit.gif"
            alt="Esther posa con fotos enmarcadas y ordenadas"
        />
        <Text>
            <h1>Juntos seremos más fuertes.</h1>
            <h2>💪</h2>
            <p>
                Tus colaboraciones harán que pueda organizar mejor todas mis
                fotos.
            </p>
            <p>
                Así podré devolverte el favor y ayudarte a ti y a más gente como
                tú a encontrar más fácil los recuerdos que buscas.
            </p>
            <p>
                Tus aportes son necesarios, pero puedes empezar por <a
                    href="/fotos/CHR037"
                    >una foto que ya tengo bien catalogada</a
                > para entender mejor cómo puedes ayudar.
            </p>
        </Text>
    </Slide>
</Reel>
