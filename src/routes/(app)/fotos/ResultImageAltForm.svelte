<script lang="ts">
    import type { Image } from "$lib/api";
    import { api } from "$lib/stores/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import { onMount } from "svelte";

    export let image: Image;

    let label: string = "Describe qué es lo que se ve";

    let inputTimeout: number;
    function handleKeyUp() {
        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(() => updateAlt(), 1500);
    }

    let textarea: HTMLTextAreaElement;
    function handleKeyDown() {
        clearTimeout(inputTimeout);

        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    function updateAlt() {
        $api.image
            .apiImagesIdPatch({
                id: image.id?.toString() || "",
                requestBody: {
                    alt: image.alt,
                },
            })
            .then(() => {
                label = "Descripción actualizada. Gracias por tu ayuda";
            });
    }

    onMount(() => {
        textarea.style.height = `${textarea.scrollHeight}px`;
    });
</script>

<Text>
    <h3>Qué.</h3>
    <Labeled {label}>
        <textarea
            spellcheck="true"
            placeholder="¿Qué hay en esta imagen?"
            bind:this={textarea}
            bind:value={image.alt}
            on:keyup={handleKeyUp}
            on:keydown={handleKeyDown}
        />
    </Labeled>
</Text>

<style>
    textarea {
        width: 100%;
        height: fit-content;

        padding: 0;
        resize: none;

        color: white;
        font-size: 1rem;

        border: none;
        outline: none;
        background: transparent;
    }
</style>
