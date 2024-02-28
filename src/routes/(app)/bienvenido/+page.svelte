<script lang="ts">
    import Text from "$lib/ui/Content/Text.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import { onMount } from "svelte";

    let mainSlide: Slide;

    onMount(() => {
        mainSlide.focus();
    })
</script>

<Reel id="bienvenido">
    <Slide id="🙋" bind:this={mainSlide}>
        <Text>
            <h1>Hola.</h1>
            <h2>🙋</h2>
            <p>Me llamo <strong>Esther</strong>. Encantada de conocerte.</p>
        </Text>
    </Slide>
    <Slide id="📸">
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
            <p>Muchas gracias por tu colaboración.</p>
        </Text>
    </Slide>
</Reel>
