<script lang="ts">
    import { page } from "$app/stores";

    export let href: string;
    export let isActive: boolean = false;

    export let size: "large" | "small" = "large";

    $: isActive = $page.url.pathname === href;
</script>

<li>
    <a {href} class="{size} {isActive ? 'active' : 'idle'}">
        <span>
            <slot />
        </span>
    </a>
</li>

<style>
    li {
        position: relative;
        display: block;
    }

    a {
        padding: 1em 2ex 1em 4ex;

        font-family: inherit;

        color: inherit;
        text-decoration: none;
    }

    a.large {
        padding: 0.5em 2ex 0.5em 1ex;

        font-size: 2em;
        border-left: 1ex solid white;
    }

    a.large.active {
        color: black;
        background-color: white;
    }
</style>
