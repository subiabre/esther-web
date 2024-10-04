<script lang="ts">
    import BigImage from "./BigImage.svelte";
    import Text from "./Text.svelte";

    export let messages: Array<string | number>;
</script>

<BigImage
    src="/character/05_error.gif"
    alt="Esther está sentada con expresión triste"
/>
<Text>
    <h1>Error.</h1>
    <h2>🙃</h2>
    {#each messages as message}
        <p>{message}</p>
    {/each}
</Text>
