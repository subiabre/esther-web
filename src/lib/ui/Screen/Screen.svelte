<script>
    import ScrollY from "./ScrollY.svelte";

</script>
<main>
    <ScrollY>
        <slot />
    </ScrollY>
</main>

<style>
    main {
        background-color: red;
    }
</style>