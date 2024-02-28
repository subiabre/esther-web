<script lang="ts">
    import Text from "$lib/ui/Content/Text.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import { onMount } from "svelte";

    let mainSlide: Slide;
    onMount(() => {
        mainSlide.focus();
    });
</script>

<Reel id="user">
    <Slide id="filtros" bind:this={mainSlide}>
        <Text>
            <h1>Filtros.</h1>
            <h2>Cuándo.</h2>
            <h2>Dónde.</h2>
            <h2>Quiénes.</h2>
            <h2>Qué.</h2>
        </Text>
    </Slide>
    <Slide id="galeria">
        <Text>
            <h1>Galería.</h1>
        </Text>
    </Slide>
</Reel>
