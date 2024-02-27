<script lang="ts">
    import Tray from "../Slide/Tray.svelte";
</script>
<main>
    <Tray>
        <slot />
    </Tray>
</main>

<style>
    main {
        background-color: red;
    }
</style>