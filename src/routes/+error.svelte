<script>
    import { page } from "$app/stores";
    import BigImage from "$lib/ui/Content/BigImage.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import Screen from "$lib/ui/Screen/Screen.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
</script>

<Screen>
    <Reel id="error">
        <Slide id="error">
            <BigImage src="/character/05_error.gif" alt="Esther está sentada con expresión triste" />
            <Text>
                <h1>Error.</h1>
                <h2>🙃</h2>
                <p>{$page.status}</p>
                <p>{$page.error?.message}</p>
            </Text>
        </Slide>
    </Reel>
</Screen>
