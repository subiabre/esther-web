<script lang="ts">
    import Text from "$lib/ui/Content/Text.svelte";
</script>

<nav class="menu">
    <ul>
        <slot />
    </ul>
</nav>

<style lang="scss">
    nav {
        margin: 1rem 1.375rem;
    }

    ul {
        margin: 1rem 0;
    }
</style>
