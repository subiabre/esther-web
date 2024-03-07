<script lang="ts">
    import type { Image } from "$lib/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import { api } from "../../../stores/api";

    export let image: Image;

    let label: string = "Añade una descripción de lo que se ve en esta foto.";

    let inputTimeout: number;
    function startTimeout() {
        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(() => updateAlt(), 1500);
    }

    function resetTimeout() {
        clearTimeout(inputTimeout);
    }

    function updateAlt() {
        $api.image
            .apiImagesIdPatch(image.id?.toString() || "", {
                alt: image.alt,
            })
            .then(() => {
                let originalLabel = label;

                label = "Descripción actualizada.";
                setTimeout(() => {
                    label = originalLabel;
                }, 3000);
            });
    }
</script>

<Text>
    <h3>Qué.</h3>
    <Labeled {label}>
        <textarea
            spellcheck="true"
            placeholder="¿Qué hay en esta imagen?"
            bind:value={image.alt}
            on:keyup={startTimeout}
            on:keydown={resetTimeout}
        />
    </Labeled>
</Text>

<style>
    textarea {
        width: 100%;
        max-height: 7.5lh;
        min-height: 1.5lh;
        padding: 0;
        resize: vertical;

        color: white;
        font-size: 1rem;

        border: none;
        outline: none;
        background: linear-gradient(
                to top left,
                grey 0.65rem,
                transparent 0.65rem
            )
            100% 100%;
        background-repeat: no-repeat;
        background-size: 1rem 1rem;
        background-blend-mode: difference;
    }
</style>
