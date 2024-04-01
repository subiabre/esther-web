<nav class="menu">
    <ul>
        <slot />
    </ul>
</nav>

<style>
    :global(nav > ul > li) {
        margin: 3em 0 3em 0;
    }

    :global(nav > ul > li:last-child) {
        margin: 3em 0 0 0;
    }

    :global(nav > ul > li:first-child) {
        margin: 0 0 3em 0;
    }
</style>
