<script lang="ts">
    import { Link } from "carbon-components-svelte";

    export let href: string;
</script>

<li>
    <Link size="lg" {href}>
        <span>
            <slot />
        </span>
    </Link>
</li>

<style lang="scss">
    li {
        margin: 1rem 0 0 0;
    }
</style>
