<script lang="ts">
    import type { Image } from "$lib/api";
    import { api } from "$lib/stores/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import { onMount } from "svelte";
    import ResultFormTrigger from "./ResultFormTrigger.svelte";

    onMount(() => {
        resizeTextarea();
    });

    export let image: Image;
    let imageAlt: string | null | undefined = image.alt;

    let label: string = "Descripción de lo que se ve en esta imagen.";

    let textarea: HTMLTextAreaElement;
    let textareaValue: string = imageAlt || "";

    function resizeTextarea() {
        textarea.style.height = `1ex`;
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    let inputTimeout: number;

    function handleKeyUp() {
        resizeTextarea();

        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(() => updateAlt(), 1500);
    }

    function handleKeyDown() {
        clearTimeout(inputTimeout);
    }

    function updateAlt() {
        if (textareaValue === imageAlt) {
            return;
        }

        $api.image
            .apiImagesIdPatch({
                id: image.id?.toString() || "",
                // @ts-ignore
                requestBody: {
                    alt: textareaValue,
                },
            })
            .then((image: Image) => {
                imageAlt = image.alt;
                label = "Descripción actualizada. Gracias por tu ayuda";
            });
    }
</script>

<Text>
    <h3>Qué.</h3>
    <ResultFormTrigger on:trigger={() => textarea.focus()}>
        <Labeled {label}>
            <textarea
                spellcheck="true"
                placeholder="¿Qué hay en esta imagen?"
                bind:this={textarea}
                bind:value={textareaValue}
                on:keyup={handleKeyUp}
                on:keydown={handleKeyDown}
            />
        </Labeled>
    </ResultFormTrigger>
</Text>

<style>
    textarea {
        min-height: 1ex;
        max-width: 60ch;

        padding: 0;
        resize: none;

        color: white;
        font-size: 1rem;

        border: none;
        outline: none;
        background: transparent;
    }
</style>
