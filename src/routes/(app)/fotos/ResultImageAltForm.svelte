<script lang="ts">
    import type { Image } from "$lib/api";
    import { api } from "$lib/stores/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import { onMount } from "svelte";

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
    <form on:submit|preventDefault={() => textarea.focus()}>
        <button type="submit">
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
        </button>
    </form>
</Text>

<style>
    button {
        padding: 0;

        text-align: inherit;
        font-size: inherit;
        font-family: inherit;

        border: none;
        background-color: transparent;
    }

    button:hover {
        cursor: pointer;
    }

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
