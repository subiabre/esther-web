<script lang="ts">
    import Text from "$lib/ui/Content/Text.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
</script>

<Reel id="hola">
    <Slide id="🙋">
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
                Me gusta observarlas, analizarlas y conservarlas. Soy muy buena
                haciendo esto.
            </p>
            <p>
                Pero sobretodo me gusta <strong>saber</strong> sobre ellas. Cúando
                y dónde fueron tomadas. Quiénes salen en ellas. Qué es lo que se
                muestra en ellas.
            </p>
        </Text>
    </Slide>
    <Slide id="🙇">
        <Text>
            <h1>Por eso necesito tu ayuda.</h1>
            <h2>🙇</h2>
            <p>
                Resulta que en saber sobre una foto no soy tan buena como
                analizándola. Y es que... ¡Facu me ha dado muchas fotos que no
                tienen metadatos!
            </p>
            <p>
                Son fotos de las de verdad, fotos analógicas cuyos metadatos
                están en la memoria de personas como tú.
            </p>
        </Text>
    </Slide>
    <Slide id="💪">
        <Text>
            <h1>Gracias.</h1>
            <h2>💪</h2>
            <p>
                Tus colaboraciones harán que pueda organizar mejor todas las
                fotos que tengo. Así podré devolverte el favor y ayudarte a ti y
                a más gente como tú a encontrar más fácil los recuerdos que
                buscas.
            </p>
            <p>Prometo no olvidar lo que me cuentes.</p>
        </Text>
    </Slide>
</Reel>
