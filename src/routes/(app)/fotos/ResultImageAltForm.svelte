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

    let label: string = "Descripción de lo que se ve en esta imagen.";

    let textarea: HTMLTextAreaElement;

    function resizeTextarea() {
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    let inputTimeout: number;

    function handleKeyUp() {
        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(() => updateAlt(), 1500);
    }

    function handleKeyDown() {
        clearTimeout(inputTimeout);
        resizeTextarea();
    }

    function updateAlt() {
        $api.image
            .apiImagesIdPatch({
                id: image.id?.toString() || "",
                // @ts-ignore
                requestBody: {
                    alt: image.alt,
                },
            })
            .then(() => {
                label = "Descripción actualizada. Gracias por tu ayuda";
            });
    }
</script>

<Text>
    <h3>Qué.</h3>
    <ResultFormTrigger on:trigger={() => textarea.focus()}>
        <Labeled {label} />
    </ResultFormTrigger>
    <textarea
        spellcheck="true"
        placeholder="¿Qué hay en esta imagen?"
        bind:this={textarea}
        bind:value={image.alt}
        on:keyup={handleKeyUp}
        on:keydown={handleKeyDown}
    />
</Text>

<style>
    textarea {
        min-width: 100%;
        height: fit-content;

        padding: 0;
        margin-top: -1rem;
        resize: none;

        color: white;
        font-size: 1rem;

        border: none;
        outline: none;
        background: transparent;
    }
</style>
