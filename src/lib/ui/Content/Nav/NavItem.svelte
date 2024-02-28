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
