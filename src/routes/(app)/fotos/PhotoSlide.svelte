<script>
    import Text from "$lib/ui/Content/Text.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";

    /**
     * @type {{ id: any; }}
     */
    export let photo;

    /**
     * @type {{ track: () => void; }}
     */
    export let slideShow;

    onMount(() => {
        slideShow.track();
    });
</script>

<Slide id="photo_{photo.id}">
    <Text>
        <pre>{JSON.stringify(photo, null, 2)}</pre>
    </Text>
</Slide>
