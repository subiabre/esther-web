<script lang="ts">
    import Text from "$lib/ui/Content/Text.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import { onMount } from "svelte";
    import { auth } from "../../../stores/auth";

    onMount(() => {
        console.log($auth);
    })
</script>

<Reel id="user">
    <Slide id="info">
        <Text>
            <h1>Hola, {$auth.user?.email}</h1>
        </Text>
    </Slide>
</Reel>
