<div class="snap-stop">
    <slot />
</div>

<style>
    .snap-stop {
        scroll-snap-stop: always;
        scroll-snap-align: center;

        flex-shrink: 0;
    }
</style>
