<div class="grid">
    <slot />
</div>

<style lang="scss">
    div {
        display: grid;
        gap: 1rem;
        grid-auto-flow: dense;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
    }
</style>
