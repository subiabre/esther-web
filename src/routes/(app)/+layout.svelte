<script lang="ts">
    import MainNav from "$lib/ui/Content/Nav/MainNav.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
</script>

<Reel id="nav">
    <Slide id="nav">
        <Text>
            <MainNav />
        </Text>
    </Slide>
</Reel>
<slot />
