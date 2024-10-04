<script>
    import { page } from "$app/stores";
    import Error from "$lib/ui/Content/Error.svelte";
    import Screen from "$lib/ui/Screen/Screen.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
</script>

<Screen>
    <Reel id="error">
        <Slide id="error">
            <Error
                messages={[
                    "Hubo un problema con tu petición.",
                    "Error: " + $page.status,
                ]}
            />
        </Slide>
    </Reel>
</Screen>
