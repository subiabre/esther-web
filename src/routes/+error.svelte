<script>
    import { page } from "$app/stores";
    import Text from "$lib/ui/Content/Text.svelte";
    import Screen from "$lib/ui/Screen/Screen.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
</script>

<Screen>
    <Reel id="error">
        <Slide id="error">
            <Text>
                <h1>Error.</h1>
                <h2>🙃</h2>
                <p>{$page.status}</p>
                <p>{$page.error?.message}</p>
            </Text>
        </Slide>
    </Reel>
</Screen>
